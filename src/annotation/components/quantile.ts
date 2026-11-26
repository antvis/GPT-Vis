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

export const quantile: AnnotationComponent<'quantile'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const field = annotationField(mapping, annotation.axis);
      const values = numericRows(selectRows(mapping.data, annotation.data), field).map(
        ({ value }) => value,
      );
      const value = quantileValue(
        values.sort((a, b) => a - b),
        annotation.p,
      );
      if (!values.length) return [];
      return path.create({
        data: axisPosition(field, value),
        label: annotation.label ?? `P${formatNumber(annotation.p * 100)}: ${formatNumber(value)}`,
        style: { lineDash: [4, 4], ...annotation.style },
      });
    }),
};
