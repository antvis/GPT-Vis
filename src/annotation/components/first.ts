import type { AnnotationComponent } from '../registry';
import { selectRows } from '../utils';
import { highlight } from './highlight';

export const first: AnnotationComponent<'first', 'g2'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const rows = selectRows(mapping.data, annotation.data);
      return rows.slice(0, 1).flatMap((row) =>
        highlight.create({
          data: [row],
          label: annotation.label ?? `First: ${row[mapping.y]}`,
          style: annotation.style,
        }),
      );
    }),
};
