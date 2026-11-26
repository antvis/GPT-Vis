import { contributionLabels, nativePercentageLabels } from '../label';
import type { AnnotationComponent } from '../registry';
import { numericRows, selectedRows } from '../utils';
import { highlight } from './highlight';

/** Compute selected observations' contribution to the full input total. */
export const contribution: AnnotationComponent<'contribution', 'g2' | 'table'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const rows = selectedRows(mapping.data, annotation.data);
      const share = contributionShare(mapping.data, rows, mapping.y);
      if (share === undefined) return [];
      const highlights = highlight.create({
        data: rows,
        label: getLabel(annotation.label, share, rows.length),
        style: annotation.style,
      });
      highlights.forEach((highlight) => contributionLabels.add(highlight));
      if (rows.length === 1 && annotation.label === undefined)
        highlights.forEach((highlight) => nativePercentageLabels.add(highlight));
      return highlights;
    }),
  table: (annotations, { data }) =>
    annotations.flatMap((annotation) => {
      const rows = selectedRows(data, annotation.data.row);
      const share = contributionShare(data, rows, annotation.data.field);
      if (share === undefined) return [];
      const highlights = highlight.create({
        data: rows.map((row) => ({ row, column: annotation.data.column })),
        label: getLabel(annotation.label, share, rows.length),
        style: annotation.style,
      });
      highlights.forEach((highlight) => contributionLabels.add(highlight));
      return highlights;
    }),
};

function getLabel(label: string | undefined, share: number, count: number) {
  if (label !== undefined) return label;
  const percentage = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(share);
  return `${count > 1 ? `Selected ${count} items` : 'Contribution'}: ${percentage}`;
}

function contributionShare<T extends object>(data: T[], rows: T[], field: keyof T & string) {
  const values = numericRows(data, field);
  if (values.some(({ value }) => value < 0))
    throw new Error('Invalid annotation: contribution requires nonnegative values.');
  const total = values.reduce((sum, { value }) => sum + value, 0);
  if (total === 0) return undefined;
  if (!Number.isFinite(total))
    throw new Error('Invalid annotation: contribution requires a finite total.');
  const selected = new Set(rows);
  return (
    values.filter(({ row }) => selected.has(row)).reduce((sum, { value }) => sum + value, 0) / total
  );
}
