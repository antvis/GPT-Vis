import type { AnnotationComponent } from '../registry';
import { annotationField, axisPosition, finiteValue, formatNumber } from '../utils';
import { path } from './path';

export const target: AnnotationComponent<'target'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const field = annotationField(mapping, annotation.axis);
      if (annotation.target !== undefined && annotation.data !== undefined)
        throw new Error('Invalid annotation: target needs either a fixed target or a path.');
      if (annotation.target === undefined) {
        if (!Array.isArray(annotation.data) || annotation.data.length < 2)
          throw new Error('Invalid annotation: target path needs at least two positions.');
        for (const position of annotation.data) {
          axisPosition(mapping.x, position[mapping.x]);
          finiteValue(position[mapping.y], mapping.y);
        }
      } else finiteValue(annotation.target, 'target');
      return path.create({
        data:
          annotation.target === undefined
            ? annotation.data!
            : axisPosition(field, annotation.target),
        label:
          annotation.label ??
          (annotation.target === undefined
            ? 'Target'
            : `Target: ${formatNumber(annotation.target)}`),
        style: { lineDash: [4, 4], ...annotation.style },
      });
    }),
};
