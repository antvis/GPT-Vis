import type { AnnotationComponent } from '../registry';
import { selectLocalExtrema, selectRows } from '../utils';
import { highlight } from './highlight';

export const valley: AnnotationComponent<'valley', 'g2'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const selected = new Set(selectRows(mapping.data, annotation.data));
      return selectLocalExtrema(mapping.data, mapping.y, false, mapping.series, annotation)
        .filter((row) => selected.has(row))
        .flatMap((row) =>
          highlight.create({
            data: [row],
            label: annotation.label ?? `Valley: ${row[mapping.y]}`,
            style: annotation.style,
          }),
        );
    }),
};
