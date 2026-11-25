import type { Annotation } from '../../types/annotation';
import type { Point } from '../layout';
import type { AnnotationComponent, AnnotationDraw } from '../registry';
import type { G2AnnotationContext } from '../runtime';

/** Standalone text stays at the supplied anchor and participates as a fixed layout obstacle. */
export const text: AnnotationComponent<'text', 'g2' | 'g6'> & {
  create: typeof createText;
} = {
  create: createText,
  g2: () => drawG2,
  g6: () => drawG6,
};

type Position = (
  context: Pick<G2AnnotationContext<object>, 'axisValue'>,
  coordinate: Parameters<G2AnnotationContext<object>['position']>[1],
) => Point | undefined;
const positions = new WeakMap<object, Position>();

function createText<T extends object>(
  options: Omit<Extract<Annotation<T>, { type: 'text' }>, 'type'>,
  position?: Position,
): Extract<Annotation<T>, { type: 'text' }>[] {
  const annotation = { ...options, type: 'text' as const };
  if (position) positions.set(annotation, position);
  return [annotation];
}

const drawG2: AnnotationDraw<'text', 'g2'> = (annotations, context) => {
  return {
    marks: annotations.map((annotation) =>
      context.createMark(annotation, {
        nativeType: 'text',
        zIndex: 1,
        encode: { text: () => annotation.label },
        label: false,
        style: {
          ...context.getTextStyle(annotation),
          textAlign: 'center',
          textBaseline: 'middle',
          stroke: 'none',
          lineWidth: 0,
        },
        geometry: (native) => (_index, scale, value, coordinate) => {
          const position = positions.get(annotation);
          const point = position
            ? position(context, coordinate)
            : context.position(annotation.data, coordinate);
          if (!point) return [[], []];
          return native([0], scale, { ...value, x: [point[0]], y: [point[1]] }, coordinate);
        },
      }),
    ),
  };
};

const drawG6: AnnotationDraw<'text', 'g6'> = (annotations, context) => {
  for (const annotation of annotations) {
    const point = context.position(annotation.data);
    if (point) context.label(annotation, point, { standalone: true });
  }
  return {};
};
