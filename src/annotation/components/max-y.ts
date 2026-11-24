import type { AnnotationComponent } from '../registry';
import { selectExtreme, selectRows } from '../utils';
import { highlight } from './highlight';

export const maxY: AnnotationComponent<'maxY', 'g2'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) =>
      selectExtreme(selectRows(mapping.data, annotation.data), mapping.y, true, false).flatMap(
        (row) =>
          highlight.create({
            data: [row],
            label: annotation.label ?? `Max Y: ${row[mapping.y]}`,
            style: annotation.style,
          }),
      ),
    ),
};
