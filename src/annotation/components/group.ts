import { groupLabels } from '../label';
import type { AnnotationComponent } from '../registry';
import { highlight } from './highlight';

/** Emphasize selected series with their native colors; no clustering is inferred. */
export const group: AnnotationComponent<'group', 'g2'> = {
  g2: (annotations, { mapping, chartType, sourceMarks }) =>
    annotations.flatMap((annotation) => {
      switch (chartType) {
        case 'column':
        case 'bar':
          if (
            !sourceMarks?.some((mark) =>
              mark.transform?.some(
                (transform: { type?: string }) =>
                  transform.type === 'dodgeX' || transform.type === 'stackY',
              ),
            )
          )
            throw new Error('Invalid annotation: group requires grouped or stacked bars.');
          break;
      }
      const field = mapping.series;
      if (!field) throw new Error('Invalid annotation: group requires a series mapping.');
      const targets = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
      if (
        !targets.length ||
        targets.some(
          (target) =>
            !target ||
            Object.keys(target).length !== 1 ||
            Object.keys(target)[0] !== 'group' ||
            typeof target.group !== 'string',
        )
      )
        throw new Error('Invalid annotation: group selects complete series with data.group.');
      const names = new Set<unknown>(targets.map((target) => target.group));
      const available = new Set<unknown>(mapping.data.map((row) => row[field]));
      if (mapping.data.length && targets.some((target) => !available.has(target.group)))
        throw new Error('Invalid annotation: group matches no series.');
      const highlights = highlight.create({
        data: mapping.data.filter((row) => names.has(row[field])),
        label: annotation.label,
        style: annotation.style,
      });
      highlights.forEach((highlight) => groupLabels.add(highlight));
      return highlights;
    }),
};
