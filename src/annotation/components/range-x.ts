import type { AnnotationComponent } from '../registry';
import { axisRange } from '../utils';
import { range } from './range';

export const rangeX: AnnotationComponent<'rangeX'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) =>
      range.create({
        data: axisRange(mapping.x, annotation.range),
        label: annotation.label ?? `X range: ${annotation.range.join('–')}`,
        style: annotation.style,
      }),
    ),
};
