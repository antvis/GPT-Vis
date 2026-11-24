import { rankedLabels } from '../label';
import type { AnnotationComponent } from '../registry';
import { selectRank, selectRows } from '../utils';
import { highlight } from './highlight';

export const topN: AnnotationComponent<'topN', 'g2' | 'table'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const rows = selectRows(mapping.data, annotation.data);
      const field = mapping.y;
      return selectRank(rows, field, annotation.n, true).flatMap((row, index) => {
        const highlights = highlight.create({
          data: [row],
          label: annotation.label ?? `Top ${index + 1}`,
          style: annotation.style,
        });
        highlights.forEach((highlight) => rankedLabels.set(highlight, annotation));
        return highlights;
      });
    }),
  table: (annotations, { data }) =>
    annotations.flatMap((annotation) => {
      const rows = selectRows(data, annotation.data.row);
      const field = annotation.data.field;
      return selectRank(rows, field, annotation.n, true).flatMap((row, index) =>
        highlight.create({
          data: [{ row, column: annotation.data.column }],
          label: annotation.label ?? `Top ${index + 1}`,
          style: annotation.style,
        }),
      );
    }),
};
