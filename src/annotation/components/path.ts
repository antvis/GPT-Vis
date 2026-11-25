import type { Annotation } from '../../types/annotation';
import type { Point } from '../layout';
import type { AnnotationComponent, AnnotationDraw } from '../registry';
import type { G2AnnotationContext } from '../runtime';

/** One axis value spans a chart; multiple anchors form an ordered path. */
export const path: AnnotationComponent<'path', 'g2' | 'g6'> & {
  create: typeof createPath;
} = {
  create: createPath,
  g2: () => drawG2,
  g6: () => drawG6,
};

type Region = {
  fill: string;
  fillOpacity: number;
  visible?: () => boolean;
  positions?: (
    context: Pick<G2AnnotationContext<object>, 'library' | 'axisValue' | 'getScene'>,
    coordinate: Parameters<G2AnnotationContext<object>['position']>[1],
  ) => Point[][];
};

const regions = new WeakMap<object, Region>();

function createPath<T extends object>(
  options: Omit<Extract<Annotation<T>, { type: 'path' }>, 'type'>,
  region?: Region,
): Extract<Annotation<T>, { type: 'path' }>[] {
  const annotation = { ...options, type: 'path' as const };
  if (region) regions.set(annotation, region);
  return [annotation];
}

const drawG2: AnnotationDraw<'path', 'g2'> = (annotations, context) => {
  const { defaults, mapping } = context;
  return {
    marks: annotations.map((annotation) => {
      const region = regions.get(annotation);
      const connected = Array.isArray(annotation.data);
      const axis = !Array.isArray(annotation.data) && annotation.data[mapping.x] !== undefined;
      const style = getStyle(
        annotation.style,
        defaults,
        connected ? defaults.stroke : defaults.labels.path.fill,
      );
      let labelPoints: Point[] = [];
      let resolved: Point[][] = [];
      return context.createMark(annotation, {
        nativeType: connected ? 'line' : axis ? 'lineX' : 'lineY',
        style: {
          ...style,
          ...(region ? { fill: region.fill, fillOpacity: region.fillOpacity, lineWidth: 0 } : {}),
        },
        data: region?.positions
          ? (coordinate) => {
              resolved = region.visible?.() === false ? [] : region.positions!(context, coordinate);
              return resolved.map((positions) => ({ positions }));
            }
          : undefined,
        zIndex: region ? -1 : 1,
        clip: !!region,
        label: {
          ...(connected ? { selector: 'last' } : {}),
          annotationPath: () => (connected ? labelPoints.slice(-1) : labelPoints),
        },
        decorate: (element, points) => {
          labelPoints = points as Point[];
          if (region) element.setAttribute('annotationIgnoreObstacle', true);
          element.setAttribute(
            'annotationSegments',
            points.slice(1).map((point, i) => [points[i], point]),
          );
        },
        geometry: (native) => (_index, scale, value, coordinate) => {
          if (region?.visible?.() === false) return [[], []];
          if (region?.positions)
            return [
              resolved.map((_, i) => i),
              resolved.map((points) => points.map((position) => coordinate.map(position) as Point)),
            ];
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

function getStyle(
  style: Path['style'],
  defaults: { stroke: string; lineWidth: { path: number } },
  stroke = defaults.stroke,
) {
  return {
    stroke: style?.stroke ?? stroke,
    lineWidth: style?.lineWidth ?? defaults.lineWidth.path,
    lineDash: style?.lineDash,
    fill: 'none',
  };
}
