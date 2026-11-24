import type { Annotation } from '../../types/annotation';
import type { AnnotationComponent, AnnotationDraw } from '../registry';

/** Axis bounds, including the full band at either end; omitted axes span the plot. */
export const range = {
  create: createRange,
  g2: () => drawG2,
} satisfies AnnotationComponent<'range', 'g2'> & {
  create: typeof createRange;
};

function createRange<T extends object>(
  options: Omit<Extract<Annotation<T>, { type: 'range' }>, 'type'>,
): Extract<Annotation<T>, { type: 'range' }>[] {
  return [{ ...options, type: 'range' }];
}

const drawG2: AnnotationDraw<'range', 'g2'> = (annotations, context) => {
  const { mapping, defaults } = context;
  return {
    marks: annotations.map((annotation) => {
      const x = annotation.data[mapping.x];
      const y = annotation.data[mapping.y];
      return context.createMark(annotation, {
        nativeType: x && y ? 'range' : x !== undefined ? 'rangeX' : 'rangeY',
        zIndex: -1,
        clip: true,
        decorate: (element) => element.setAttribute('annotationIgnoreObstacle', true),
        style: {
          stroke: annotation.style?.stroke ?? 'none',
          lineWidth: annotation.style?.lineWidth ?? defaults.lineWidth.range,
          lineDash: annotation.style?.lineDash,
          fill: annotation.style?.fill ?? annotation.style?.stroke ?? defaults.stroke,
          fillOpacity: annotation.style?.fillOpacity ?? defaults.fillOpacity,
        },
        geometry: (native) => (_index, scale, value, coordinate) => {
          if (!context.onlyAxisFields(annotation.data))
            throw new Error('Invalid annotation: range only accepts axis fields.');
          const bounds = (values: unknown[] | undefined, axis: 'x' | 'y') => {
            if (!values) return [0, 1];
            const a = context.axisValue(axis, values[0], false);
            const b = context.axisValue(axis, values[1], false);
            const end = context.bandWidth(axis, values[a < b ? 1 : 0]);
            return [Math.min(a, b), Math.max(a, b) + end];
          };
          const [x0, x1] = bounds(x, 'x');
          const [y0, y1] = bounds(y, 'y');
          return native([0], scale, { ...value, x: [x0], x1: [x1], y: [y0], y1: [y1] }, coordinate);
        },
      });
    }),
  };
};
