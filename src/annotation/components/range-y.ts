import type { AnnotationComponent } from '../registry';
import { axisRange } from '../utils';
import { range } from './range';

export const rangeY: AnnotationComponent<'rangeY'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) =>
      range.create({
        data: axisRange(mapping.y, annotation.range),
        label: annotation.label ?? `Y range: ${annotation.range.join('–')}`,
        style: annotation.style,
      }),
    ),
};
