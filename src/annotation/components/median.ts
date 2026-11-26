import type { AnnotationComponent } from '../registry';
import {
  annotationField,
  axisPosition,
  formatNumber,
  numericRows,
  quantileValue,
  selectRows,
} from '../utils';
import { path } from './path';

export const median: AnnotationComponent<'median'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const field = annotationField(mapping, annotation.axis);
      const values = numericRows(selectRows(mapping.data, annotation.data), field).map(
        ({ value }) => value,
      );
      if (!values.length) return [];
      const value = quantileValue(
        values.sort((a, b) => a - b),
        0.5,
      );
      return path.create({
        data: axisPosition(field, value),
        label: annotation.label ?? `Median: ${formatNumber(value)}`,
        style: { lineDash: [4, 4], ...annotation.style },
      });
    }),
};
