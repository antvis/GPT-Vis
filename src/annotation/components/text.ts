import type { AnnotationComponent } from '../registry';

/** Standalone text stays at the supplied anchor and participates as a fixed layout obstacle. */
export const text: AnnotationComponent<'text', 'g2' | 'g6'> = {
  g2: (annotations, context) => {
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
  },
  g6: (annotations, context) => {
    for (const annotation of annotations) {
      const point = context.position(annotation.data);
      if (point) context.label(annotation, point, { standalone: true });
    }
    return {};
  },
};
