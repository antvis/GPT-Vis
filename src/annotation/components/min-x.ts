import type { AnnotationComponent } from '../registry';
import { selectExtreme, selectRows } from '../utils';
import { highlight } from './highlight';

export const minX: AnnotationComponent<'minX', 'g2'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) =>
      selectExtreme(selectRows(mapping.data, annotation.data), mapping.x, false, true).flatMap(
        (row) =>
          highlight.create({
            data: [row],
            label: annotation.label ?? `Min X: ${row[mapping.x]}`,
            style: annotation.style,
          }),
      ),
    ),
};
