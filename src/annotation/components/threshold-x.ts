import type { AnnotationComponent } from '../registry';
import { axisPosition } from '../utils';
import { path } from './path';

export const thresholdX: AnnotationComponent<'thresholdX'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      return path.create({
        data: axisPosition(mapping.x, annotation.threshold),
        label: annotation.label ?? `Threshold: ${annotation.threshold}`,
        style: { lineDash: [4, 4], ...annotation.style },
      });
    }),
};
