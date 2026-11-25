import type { AnnotationComponent } from '../registry';
import { axisPosition, finiteValue } from '../utils';
import { path } from './path';

export const thresholdY: AnnotationComponent<'thresholdY'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      finiteValue(annotation.threshold, 'threshold');
      return path.create({
        data: axisPosition(mapping.y, annotation.threshold),
        label: annotation.label ?? `Threshold: ${annotation.threshold}`,
        style: { lineDash: [4, 4], ...annotation.style },
      });
    }),
};
