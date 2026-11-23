import type { Annotation } from '../../types/annotation';
import type { Point } from '../layout';
import type { AnnotationComponent, AnnotationDraw } from '../registry';

/** One axis value spans a chart; multiple anchors form an ordered path. */
export const path = {
  create: createPath,
  g2: () => drawG2,
  g6: () => drawG6,
} satisfies AnnotationComponent<'path', 'g2' | 'g6'> & {
  create: typeof createPath;
};

function createPath<T extends object>(
  options: Omit<Extract<Annotation<T>, { type: 'path' }>, 'type'>,
): Extract<Annotation<T>, { type: 'path' }>[] {
  return [{ ...options, type: 'path' }];
}

const drawG2: AnnotationDraw<'path', 'g2'> = (annotations, context) => {
  const { defaults, mapping } = context;
  return {
    marks: annotations.map((annotation) => {
      const connected = Array.isArray(annotation.data);
      const axis = !Array.isArray(annotation.data) && annotation.data[mapping.x] !== undefined;
      return context.createMark(annotation, {
        nativeType: connected ? 'line' : axis ? 'lineX' : 'lineY',
        style: getStyle(annotation.style, defaults),
        label: connected ? { selector: 'last' } : {},
        decorate: (element, points) => {
          element.setAttribute(
            'annotationSegments',
            points.slice(1).map((point, i) => [points[i], point]),
          );
        },
        geometry: (native) => (_index, scale, value, coordinate) => {
          if (!Array.isArray(annotation.data)) {
            const x = annotation.data[mapping.x];
            const y = annotation.data[mapping.y];
            return native(
              [0],
              scale,
              {
                ...value,
                x: [x === undefined ? 0 : context.axisValue('x', x)],
                y: [y === undefined ? 0 : context.axisValue('y', y)],
              },
              coordinate,
            );
          }
          const positions = annotation.data.map((datum) => context.position(datum, coordinate));
          if (positions.some((point) => !point)) return [[], []];
          const points = positions as Point[];
          return native(
            points.map((_, i) => i),
            scale,
            {
              ...value,
              x: points.map((p) => p[0]),
              y: points.map((p) => p[1]),
            },
            coordinate,
          );
        },
      });
    }),
  };
};

const drawG6: AnnotationDraw<'path', 'g6'> = (annotations, context) => {
  for (const annotation of annotations) {
    if (!Array.isArray(annotation.data))
      throw new Error('Invalid annotation: graph path needs an array of anchors.');
    const positions = annotation.data.map((datum) => context.position(datum));
    if (positions.some((point) => !point)) continue;
    const points = positions as Point[];
    points.slice(1).forEach((point, index) => context.segments.push([points[index], point]));
    context.add('path', {
      ...getStyle(annotation.style, context.defaults),
      d: points.map(([x, y], i) => [i ? 'L' : 'M', x, y]),
    });
    context.label({ ...annotation, data: annotation.data }, points[points.length - 1]);
  }
  return {};
};

type Path = Extract<Annotation, { type: 'path' }>;

function getStyle(style: Path['style'], defaults: { stroke: string; lineWidth: { path: number } }) {
  return {
    stroke: style?.stroke ?? defaults.stroke,
    lineWidth: style?.lineWidth ?? defaults.lineWidth.path,
    lineDash: style?.lineDash,
    fill: 'none',
  };
}
