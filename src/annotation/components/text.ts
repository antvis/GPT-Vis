import type { Annotation } from '../../types/annotation';
import type { AnnotationComponent, AnnotationDraw } from '../registry';

/** Standalone text stays at the supplied anchor and participates as a fixed layout obstacle. */
export const text = {
  create: createText,
  g2: () => drawG2,
  g6: () => drawG6,
} satisfies AnnotationComponent<'text', 'g2' | 'g6'> & {
  create: typeof createText;
};

function createText<T extends object>(
  options: Omit<Extract<Annotation<T>, { type: 'text' }>, 'type'>,
): Extract<Annotation<T>, { type: 'text' }>[] {
  return [{ ...options, type: 'text' }];
}

const drawG2: AnnotationDraw<'text', 'g2'> = (annotations, context) => {
  return {
    marks: annotations.map((annotation) =>
      context.createMark(annotation, {
        nativeType: 'text',
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
          const point = context.position(annotation.data, coordinate);
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
