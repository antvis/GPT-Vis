import type { AnnotationComponent } from '../registry';
import { annotationField, axisPosition, formatNumber, numericRows, selectRows } from '../utils';
import { path } from './path';

export const mean: AnnotationComponent<'mean'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const field = annotationField(mapping, annotation.axis);
      const values = numericRows(selectRows(mapping.data, annotation.data), field).map(
        ({ value }) => value,
      );
      if (!values.length) return [];
      const value = meanValue(values);
      return path.create({
        data: axisPosition(field, value),
        label: annotation.label ?? `Mean: ${formatNumber(value)}`,
        style: { lineDash: [4, 4], ...annotation.style },
      });
    }),
};

/** Scale before summation to avoid overflowing finite means. */
function meanValue(values: number[]) {
  const scale = values.reduce((max, value) => Math.max(max, Math.abs(value)), 0);
  return scale === 0
    ? 0
    : values.reduce((sum, value) => sum + value / scale / values.length, 0) * scale;
}
