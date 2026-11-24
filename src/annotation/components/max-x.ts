import type { AnnotationComponent } from '../registry';
import { selectExtreme, selectRows } from '../utils';
import { highlight } from './highlight';

export const maxX: AnnotationComponent<'maxX', 'g2'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) =>
      selectExtreme(selectRows(mapping.data, annotation.data), mapping.x, true, true).flatMap(
        (row) =>
          highlight.create({
            data: [row],
            label: annotation.label ?? `Max X: ${row[mapping.x]}`,
            style: annotation.style,
          }),
      ),
    ),
};
