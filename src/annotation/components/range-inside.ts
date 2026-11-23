import type { Annotation } from '../../types/annotation';
import type { AnnotationComponent } from '../registry';
import { selectRange, selectRows } from '../utils';
import { highlight } from './highlight';
import { range } from './range';

export const rangeInside: AnnotationComponent<'rangeInside', 'g2' | 'table'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const rows = selectRows(mapping.data, annotation.data);
      const field = mapping.y;
      const selected = selectRange(rows, field, annotation.range, false);
      return [
        ...range.create({
          data: { [field]: annotation.range } as Extract<
            Annotation<(typeof rows)[number]>,
            { type: 'range' }
          >['data'],
          style: {
            fill: annotation.style?.fill ?? annotation.style?.stroke,
          },
        }),
        ...selected.flatMap((row) =>
          highlight.create({
            data: [row],
            label: annotation.label ?? `Inside range: ${row[field]}`,
            style: annotation.style,
          }),
        ),
      ];
    }),
  table: (annotations, { data }) =>
    annotations.flatMap((annotation) => {
      const rows = selectRows(data, annotation.data.row);
      const field = annotation.data.field;
      return selectRange(rows, field, annotation.range, false).flatMap((row) =>
        highlight.create({
          data: [{ row, column: annotation.data.column }],
          label: annotation.label ?? `Inside range: ${row[field]}`,
          style: annotation.style,
        }),
      );
    }),
};
