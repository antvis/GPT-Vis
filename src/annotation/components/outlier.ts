import type { AnnotationComponent } from '../registry';
import { numericRows, selectRows } from '../utils';
import { highlight } from './highlight';

/** Tukey's IQR fences, matching G2 boxplots; each series is analyzed independently. */
export const outlier: AnnotationComponent<'outlier', 'g2' | 'table'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) =>
      selectOutliers(
        selectRows(mapping.data, annotation.data),
        mapping.y,
        annotation.factor,
        mapping.series,
      ).flatMap((row) =>
        highlight.create({
          data: [row],
          label: annotation.label ?? `Outlier: ${row[mapping.y]}`,
          style: annotation.style,
        }),
      ),
    ),
  table: (annotations, { data }) =>
    annotations.flatMap((annotation) =>
      selectOutliers(
        selectRows(data, annotation.data.row),
        annotation.data.field,
        annotation.factor,
      ).flatMap((row) =>
        highlight.create({
          data: [{ row, column: annotation.data.column }],
          label: annotation.label ?? `Outlier: ${row[annotation.data.field]}`,
          style: annotation.style,
        }),
      ),
    ),
};

function selectOutliers<T extends object>(
  data: T[],
  field: keyof T & string,
  factor = 1.5,
  series?: keyof T & string,
) {
  if (!Number.isFinite(factor) || factor <= 0)
    throw new Error('Invalid annotation: outlier factor must be positive and finite.');
  const groups = new Map<unknown, ReturnType<typeof numericRows<T>>>();
  for (const item of numericRows(data, field)) {
    const key = series ? item.row[series] : undefined;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  const selected = new Set<T>();
  for (const items of groups.values()) {
    // Quartile-based detection is uninformative for fewer than four finite observations.
    if (items.length < 4) continue;
    const values = items.map(({ value }) => value).sort((a, b) => a - b);
    const q1 = quantile(values, 0.25);
    const q3 = quantile(values, 0.75);
    const spread = factor * (q3 - q1);
    for (const { row, value } of items)
      if (value < q1 - spread || value > q3 + spread) selected.add(row);
  }
  return data.filter((row) => selected.has(row));
}

/** Linear interpolation (R-7), as used by G2's d3-array quantiles. */
function quantile(values: number[], p: number) {
  const index = (values.length - 1) * p;
  const lower = values[Math.floor(index)];
  const upper = values[Math.ceil(index)];
  const fraction = index - Math.floor(index);
  const difference = upper - lower;
  return Number.isFinite(difference)
    ? lower + difference * fraction
    : lower * (1 - fraction) + upper * fraction;
}
