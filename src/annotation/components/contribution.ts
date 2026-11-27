import type { ChartType } from '../../types';
import { labelConnectors, nativePercentageLabels, type LabelConnector } from '../label';
import type { Point } from '../layout';
import type { AnnotationComponent } from '../registry';
import { numericRows, selectedRows } from '../utils';
import { connector } from './connector';
import { highlight } from './highlight';

/** Compute selected observations' contribution to the full input total. */
export const contribution: AnnotationComponent<'contribution', 'g2' | 'table'> = {
  g2: (annotations, { mapping, chartType }) =>
    annotations.flatMap((annotation) => {
      const rows = selectedRows(mapping.data, annotation.data);
      const share = contributionShare(mapping.data, rows, mapping.y);
      if (share === undefined) return [];
      const highlights = highlight.create({
        data: rows,
        label: getLabel(annotation.label, share, rows.length),
        style: annotation.style,
      });
      highlights.forEach((highlight) =>
        labelConnectors.set(highlight, contributionConnector(chartType)),
      );
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
      highlights.forEach((highlight) =>
        labelConnectors.set(highlight, contributionConnector('bar')),
      );
      return highlights;
    }),
};

/** Select the aggregate span and compose primitive connectors around the measured observations. */
function contributionConnector(chartType: ChartType): LabelConnector {
  return (anchors, geometry, coordinate, index, count) => {
    if (!anchors.length) return undefined;
    if (chartType !== 'pie' || !coordinate) {
      const horizontal = chartType !== 'bar';
      const axis = horizontal ? 0 : 1;
      const measured = (
        ['bar', 'column'].includes(chartType) ? geometry.flatMap(({ points }) => points) : []
      ).filter((point) => point?.every(Number.isFinite));
      const points = measured.length ? measured : anchors;
      const start = Math.min(...points.map((point) => point[axis]));
      const end = Math.max(...points.map((point) => point[axis]));
      const edge = horizontal
        ? Math.min(...points.map((point) => point[1])) - 12 - index * 14
        : Math.max(...points.map((point) => point[0])) + 12 + index * 14;
      return connector.brace(
        horizontal ? [start, edge] : [edge, start],
        horizontal ? [end, edge] : [edge, end],
        horizontal ? 'top' : 'right',
      );
    }
    // Merge selected sectors only; gaps must continue to exclude unselected observations.
    const intervals = geometry
      .flatMap(({ y, y1 }): Point[] =>
        Number.isFinite(y) && Number.isFinite(y1) && y !== y1
          ? [[Math.min(y!, y1!), Math.max(y!, y1!)]]
          : [],
      )
      .sort((a, b) => a[0] - b[0]);
    const runs: Point[] = [];
    for (const [start, end] of intervals) {
      const last = runs.at(-1);
      if (last && start <= last[1] + 1e-6) last[1] = Math.max(last[1], end);
      else runs.push([start, end]);
    }
    if (runs.length > 1 && runs[0][0] < 1e-6 && runs.at(-1)![1] > 1 - 1e-6) {
      const first = runs.shift()!;
      runs.at(-1)![1] = first[1] + 1;
    }
    if (!runs.length) return undefined;
    const center = coordinate.getCenter() as Point;
    const shapes = runs.map((run) =>
      connector.arc(center, (angle) => coordinate.map([0, angle]) as Point, run, 10 + index * 12),
    );
    const primary = runs.reduce((best, run) => (run[1] - run[0] > best[1] - best[0] ? run : best));
    const inner = coordinate.map([1, 0]) as Point;
    const innerRadius = Math.hypot(inner[0] - center[0], inner[1] - center[1]);
    return {
      ...shapes[runs.indexOf(primary)],
      paths: shapes.flatMap(({ paths }) => paths),
      labelAnchor:
        innerRadius >= 50 ? [center[0], center[1] + (index - (count - 1) / 2) * 34] : undefined,
    };
  };
}

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
