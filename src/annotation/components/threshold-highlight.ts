import type { AnnotationData } from '../../types/annotation';
import type { Point } from '../layout';
import type { AnnotationComponent, AnnotationDraw, RendererAnnotation } from '../registry';
import type { G2AnnotationContext, MarkElement } from '../runtime/g2';
import { selectRows, selectThreshold } from '../utils';
import { highlight } from './highlight';
import { path } from './path';

/** A reference line owns the explanation; native geometry owns the threshold color split. */
export const thresholdHighlight: AnnotationComponent<'thresholdHighlight', 'g2' | 'table'> = {
  g2: (annotations, context) => {
    const { mapping, chartType } = context;
    const selections = annotations.map((annotation) => ({
      annotation,
      rows: selectThreshold(selectRows(mapping.data, annotation.data), mapping.y, annotation),
      color: getColor(annotation, context),
    }));
    const references = selections.flatMap(({ annotation, color }) =>
      path.create({
        data: { [mapping.y]: annotation.threshold } as AnnotationData<
          (typeof mapping.data)[number]
        >,
        label: annotation.label ?? `Threshold: ${annotation.threshold}`,
        style: {
          stroke: color,
          lineDash: [4, 4],
          lineWidth: annotation.style?.lineWidth,
          labelFill: annotation.style?.labelFill,
          labelFontSize: annotation.style?.labelFontSize,
        },
      }),
    );
    switch (chartType) {
      case 'scatter':
        return [
          ...references,
          ...selections.flatMap(({ annotation, rows, color }) =>
            highlight.create({
              data: rows,
              style: { ...annotation.style, fill: color, stroke: color },
            }),
          ),
        ];
      default:
        return [drawG2, ...references];
    }
  },
  table: (annotations, { data, defaults }) =>
    annotations.flatMap((annotation) => {
      const rows = selectThreshold(
        selectRows(data, annotation.data.row),
        annotation.data.field,
        annotation,
      );
      const color = annotation.style?.fill ?? annotation.style?.stroke ?? defaults.highlight.color;
      return highlight.create({
        data: rows.map((row) => ({ row, column: annotation.data.column })),
        label: annotation.label ?? `Threshold: ${annotation.threshold}`,
        style: { fill: color, stroke: color, ...annotation.style },
      });
    }),
};

/** Paint original native elements after G2 resolves scales, stacking and coordinate transforms. */
const drawG2: AnnotationDraw<'thresholdHighlight', 'g2'> = (annotations, context) => {
  const selections = annotations.map((annotation) => ({
    annotation,
    rows: selectRows(context.mapping.data, annotation.data),
    color: getColor(annotation, context),
  }));
  if (!annotations.length) return {};
  if (context.chartType === 'line' || context.chartType === 'area') {
    for (const { rows } of selections) {
      const selected = new Set(rows);
      const groups = new Set(
        [...selected].map((row) =>
          context.mapping.series ? row[context.mapping.series] : undefined,
        ),
      );
      if (
        context.mapping.data.some(
          (row) =>
            groups.has(context.mapping.series ? row[context.mapping.series] : undefined) &&
            !selected.has(row),
        )
      )
        throw new Error('Invalid annotation: line thresholds must select complete series.');
    }
  }
  const original = new Map<MarkElement, { key: string; paint: string }>();
  const reset = () => {
    for (const [element, { key, paint }] of original) element.setAttribute(key, paint);
  };
  return {
    update: () => {
      const elements = (context.getScene().querySelectorAll('.element') as MarkElement[]).filter(
        (element) => !element.__removed__ && !element.getAttribute('annotationKind'),
      );
      const live = new Set(elements);
      for (const element of original.keys()) if (!live.has(element)) original.delete(element);
      reset();
      const coordinate = context.getCoordinate();
      const pointAt = (value: number) =>
        coordinate.map([0.5, context.axisValue('y', value)]) as Point;
      for (const element of elements) {
        if (
          element.markType !== 'area' &&
          element.markType !== 'line' &&
          element.markType !== 'interval' &&
          element.markType !== 'point'
        )
          continue;
        const rows = context.getSourceData(element);
        const active = selections.filter((selection) =>
          rows.every((row) => selection.rows.includes(row)),
        );
        if (!active.length) continue;
        const first = active[0].annotation;
        const a = pointAt(first.threshold);
        const b = pointAt(first.threshold + Math.max(1, Math.abs(first.threshold)) * 1e-6);
        const horizontal = Math.abs(b[0] - a[0]) > Math.abs(b[1] - a[1]);
        const dimension = horizontal ? 0 : 1;
        const increasing = b[dimension] > a[dimension];
        const regions = active.map(({ annotation, color }) => ({
          position: pointAt(annotation.threshold)[dimension],
          inclusive: annotation.inclusive,
          greater: (annotation.direction ?? 'above') === 'above' ? increasing : !increasing,
          color,
        }));
        const key = element.markType === 'line' ? 'stroke' : 'fill';
        if (!original.has(element))
          original.set(element, { key, paint: element.getAttribute(key) as string });
        const base = original.get(element)!.paint;
        const { min, max } = element.getLocalBounds();
        const center = (min[dimension] + max[dimension]) / 2;
        let paint = thresholdPaint(
          element.markType === 'area' ? 'transparent' : base,
          element.markType === 'point' ? center : min[dimension],
          element.markType === 'point' ? center : max[dimension],
          regions,
          horizontal,
        );
        if (element.markType === 'area') {
          if (paint === 'transparent') continue;
          const background = base.includes('gradient(')
            ? base
            : `linear-gradient(0deg, ${base} 0%, ${base} 100%)`;
          const region = paint.includes('gradient(')
            ? paint
            : `linear-gradient(0deg, ${paint} 0%, ${paint} 100%)`;
          // Native layered fills retain the theme gradient beneath a transparent region mask.
          paint = `${background}, ${region}`;
        }
        element.setAttribute(key, paint);
      }
    },
    cleanup: () => {
      reset();
      original.clear();
    },
  };
};

function getColor<T extends object>(
  annotation: Extract<RendererAnnotation<T, 'g2'>, { type: 'thresholdHighlight' }>,
  { mapping, defaults }: Pick<G2AnnotationContext<T>, 'mapping' | 'defaults'>,
) {
  const seriesCount = mapping.series
    ? new Set(mapping.data.map((row) => row[mapping.series!])).size
    : 1;
  const used = new Set(defaults.palette.slice(0, seriesCount));
  const accent =
    defaults.palette.find((color) => !used.has(color)) ?? defaults.labels.highlight.fill;
  return annotation.style?.fill ?? annotation.style?.stroke ?? accent;
}

/** Hard stops preserve the native path, including curves, gaps and stacked interval geometry. */
function thresholdPaint(
  base: string,
  min: number,
  max: number,
  regions: { position: number; greater: boolean; color: string; inclusive?: boolean }[],
  horizontal: boolean,
) {
  const colorAt = (position: number) =>
    regions.findLast((region) => {
      const delta = position - region.position;
      if (Math.abs(delta) < 1e-7) return region.inclusive;
      return region.greater ? delta > 0 : delta < 0;
    })?.color ?? base;
  if (max <= min) return colorAt(min);
  const stops = [
    ...new Set([
      min,
      ...regions.map(({ position }) => position).filter((p) => p > min + 1e-7 && p < max - 1e-7),
      max,
    ]),
  ].sort((a, b) => a - b);
  const colors = stops.slice(1).map((end, i) => colorAt((stops[i] + end) / 2));
  if (colors.every((color) => color === colors[0])) return colors[0];
  // AntV's gradient parser does not accept scientific notation at near-zero stops.
  const percent = (position: number) => (((position - min) / (max - min)) * 100).toFixed(6);
  const gradient = colors.flatMap((color, i) => [
    `${color} ${percent(stops[i])}%`,
    `${color} ${percent(stops[i + 1])}%`,
  ]);
  return `linear-gradient(${horizontal ? 0 : 90}deg, ${gradient.join(', ')})`;
}
