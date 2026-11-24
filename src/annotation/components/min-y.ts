import type { AnnotationComponent } from '../registry';
import { selectExtreme, selectRows } from '../utils';
import { highlight } from './highlight';

export const minY: AnnotationComponent<'minY', 'g2'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) =>
      selectExtreme(selectRows(mapping.data, annotation.data), mapping.y, false, false).flatMap(
        (row) =>
          highlight.create({
            data: [row],
            label: annotation.label ?? `Min Y: ${row[mapping.y]}`,
            style: annotation.style,
          }),
      ),
    ),
};
