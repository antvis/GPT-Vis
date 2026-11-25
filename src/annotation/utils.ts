import type { ShapeComponent } from '@antv/g2';
import type { getAnnotationDefaults } from '../theme/annotation';
import type { Annotation, AnnotationData } from '../types/annotation';
import type { Point } from './layout';
import type { G2AnnotationContext } from './runtime/g2';

/** Resolve original-field selectors without reordering or modifying business data. */
export function selectRows<T extends object>(
  data: T[],
  selectors?: AnnotationData<T> | AnnotationData<T>[],
) {
  if (selectors === undefined) return data;
  const targets = Array.isArray(selectors) ? selectors : [selectors];
  if (!targets.length) throw new Error('Invalid annotation: selection needs target data.');
  const selected = new Set<T>();
  for (const target of targets) {
    if (
      !target ||
      typeof target !== 'object' ||
      Array.isArray(target) ||
      !Object.keys(target).length
    )
      throw new Error('Invalid annotation: selection needs a nonempty original-field selector.');
    const entries = Object.entries(target);
    if (data.length && entries.some(([key]) => !data.some((row) => Object.hasOwn(row, key))))
      throw new Error('Invalid annotation: selection contains an unknown field.');
    const matches = data.filter((row) =>
      entries.every(([key, value]) => row[key as keyof T] === value),
    );
    if (data.length && !matches.length)
      throw new Error('Invalid annotation: selection matches no data.');
    matches.forEach((row) => selected.add(row));
  }
  return data.filter((row) => selected.has(row));
}

/** Missing and nonfinite values do not participate. Numeric strings are never coerced. */
export function numericRows<T extends object>(
  data: T[],
  field: keyof T & string,
  temporal = false,
) {
  if (!field || (data.length && !data.some((row) => Object.hasOwn(row, field))))
    throw new Error(`Invalid annotation: unknown numeric field ${field}.`);
  return data.flatMap((row) => {
    const raw = row[field];
    if (raw === null || raw === undefined || (typeof raw === 'number' && !Number.isFinite(raw)))
      return [];
    const value =
      temporal && typeof raw === 'string' && /^\d{4}-\d{2}-\d{2}(?:T|$)/.test(raw)
        ? Date.parse(raw)
        : raw;
    if (typeof value !== 'number' || !Number.isFinite(value))
      throw new Error(
        `Invalid annotation: ${field} requires finite numeric${temporal ? ' or ISO date' : ''} values.`,
      );
    return [{ row, value }];
  });
}

export function selectExtreme<T extends object>(
  data: T[],
  field: keyof T & string,
  maximum: boolean,
  temporal = false,
) {
  const values = numericRows(data, field, temporal);
  const extreme = values.reduce(
    (result, { value }) => (maximum ? Math.max(result, value) : Math.min(result, value)),
    maximum ? -Infinity : Infinity,
  );
  return values.filter(({ value }) => value === extreme).map(({ row }) => row);
}

export function selectRank<T extends object>(
  data: T[],
  field: keyof T & string,
  n: number,
  descending: boolean,
) {
  if (!Number.isSafeInteger(n) || n < 1)
    throw new Error('Invalid annotation: n must be a positive integer.');
  return numericRows(data, field)
    .sort((a, b) => (descending ? b.value - a.value : a.value - b.value))
    .slice(0, n)
    .map(({ row }) => row);
}

export function selectRange<T extends object>(
  data: T[],
  field: keyof T & string,
  range: [number, number],
  outside: boolean,
) {
  if (
    !Array.isArray(range) ||
    range.length !== 2 ||
    !range.every(Number.isFinite) ||
    range[0] > range[1]
  )
    throw new Error('Invalid annotation: range needs two finite, ordered bounds.');
  return numericRows(data, field)
    .filter(({ value }) =>
      outside ? value < range[0] || value > range[1] : value >= range[0] && value <= range[1],
    )
    .map(({ row }) => row);
}

export function selectedRows<T extends object>(
  data: T[],
  selectors: AnnotationData<T> | AnnotationData<T>[],
) {
  if (selectors === undefined) throw new Error('Invalid annotation: selection needs target data.');
  return selectRows(data, selectors);
}

/** Compare neighbours within each series in business order. Missing values break sequences. */
export function selectLocalExtrema<T extends object>(
  data: T[],
  field: keyof T & string,
  maximum: boolean,
  series?: keyof T & string,
  { minProminence = 0, minDistance = 1 }: { minProminence?: number; minDistance?: number } = {},
) {
  if (!Number.isFinite(minProminence) || minProminence < 0)
    throw new Error('Invalid annotation: minProminence must be nonnegative and finite.');
  if (!Number.isSafeInteger(minDistance) || minDistance < 1)
    throw new Error('Invalid annotation: minDistance must be a positive integer in observations.');
  const sign = maximum ? 1 : -1;
  const values = new Map(numericRows(data, field).map(({ row, value }) => [row, value]));
  const groups = new Map<unknown, T[]>();
  for (const row of data) {
    const key = series ? row[series] : undefined;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(row);
  }
  const selected = new Set<T>();
  for (const rows of groups.values()) {
    const candidates: { index: number; height: number; prominence: number }[] = [];
    for (let start = 1; start < rows.length - 1;) {
      const value = values.get(rows[start]);
      if (value === undefined) {
        start++;
        continue;
      }
      let end = start;
      while (end + 1 < rows.length && values.get(rows[end + 1]) === value) end++;
      const left = values.get(rows[start - 1]);
      const right = values.get(rows[end + 1]);
      if (
        left !== undefined &&
        right !== undefined &&
        (maximum ? value > left && value > right : value < left && value < right)
      ) {
        const height = sign * value;
        const base = (from: number, step: number) => {
          let minimum = height;
          for (let i = from; i >= 0 && i < rows.length; i += step) {
            const current = values.get(rows[i]);
            if (current === undefined || sign * current > height) break;
            minimum = Math.min(minimum, sign * current);
          }
          return minimum;
        };
        candidates.push({
          index: Math.floor((start + end) / 2),
          height,
          prominence:
            minProminence === 0 ? 0 : height - Math.max(base(start - 1, -1), base(end + 1, 1)),
        });
      }
      start = end + 1;
    }
    // Resolve spacing by height first, as in find_peaks; equal heights retain input order.
    const spaced: typeof candidates = minDistance === 1 ? candidates : [];
    if (minDistance > 1) {
      for (const candidate of candidates.sort((a, b) => b.height - a.height || a.index - b.index)) {
        if (spaced.every(({ index }) => Math.abs(index - candidate.index) >= minDistance))
          spaced.push(candidate);
      }
    }
    for (const candidate of spaced)
      if (candidate.prominence >= minProminence) selected.add(rows[candidate.index]);
  }
  return data.filter((row) => selected.has(row));
}

/** All renderers share the same dimming rule and reject invalid opacity before painting. */
export function getDimOpacity(
  annotations: Pick<Extract<Annotation, { type: 'highlight' }>, 'style'>[],
  fallback: number,
) {
  let dim = 1;
  for (const { style } of annotations) {
    const opacity = style?.dimOpacity ?? fallback;
    if (!Number.isFinite(opacity) || opacity < 0 || opacity > 1)
      throw new Error('Invalid annotation: dimOpacity must be between 0 and 1.');
    dim = Math.min(dim, opacity);
  }
  return dim;
}

/** R-7 quantile of an ascending array; callers decide how to handle empty observations. */
export function quantileValue(values: number[], p: number) {
  if (!Number.isFinite(p) || p < 0 || p > 1)
    throw new Error('Invalid annotation: quantile p must be between 0 and 1.');
  const index = (values.length - 1) * p;
  const a = values[Math.floor(index)];
  const b = values[Math.ceil(index)];
  const t = index - Math.floor(index);
  return Number.isFinite(b - a) ? a + (b - a) * t : a * (1 - t) + b * t;
}

export function finiteValue(value: unknown, name: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new Error(`Invalid annotation: ${name} must be finite.`);
  return value;
}

export function annotationField<T extends object>(
  mapping: G2AnnotationContext<T>['mapping'],
  axis: 'x' | 'y' = 'y',
) {
  if (axis !== 'x' && axis !== 'y') throw new Error('Invalid annotation: axis must be x or y.');
  return mapping[axis];
}

/** Construct mapped coordinates; field names stay business-facing throughout composition. */
export function axisPosition<T extends object>(field: keyof T & string, value: unknown) {
  if (typeof value === 'number') finiteValue(value, field);
  else if (typeof value !== 'string' || !value.length)
    throw new Error('Invalid annotation: axis positions need a number or nonempty string.');
  return { [field]: value } as AnnotationData<T>;
}

/** Map a single-axis interval without imposing a business meaning on its bounds. */
export function axisRange<T extends object>(field: keyof T & string, bounds: unknown) {
  if (!Array.isArray(bounds) || bounds.length !== 2)
    throw new Error('Invalid annotation: range needs two boundary values.');
  for (const value of bounds) axisPosition(field, value);
  if (typeof bounds[0] !== typeof bounds[1])
    throw new Error('Invalid annotation: range boundaries must have the same type.');
  if (typeof bounds[0] === 'number' && bounds[0] > bounds[1])
    throw new Error('Invalid annotation: numeric range bounds must be ordered.');
  return { [field]: bounds } as Extract<Annotation<T>, { type: 'range' }>['data'];
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(value);
}

/** G2 and G6 share the native AntV scene and animation API. */
export function createPointPulse(
  scene: NonNullable<Parameters<ShapeComponent>[1]>['document'],
  defaults: ReturnType<typeof getAnnotationDefaults>['pulse'],
  redraw: () => void,
) {
  type Shape = ReturnType<ReturnType<ShapeComponent>>;
  const rings = new Set<Shape>();
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clear = () => {
    for (const ring of rings) ring.destroy();
    rings.clear();
  };
  // Rebuild halos: cancellation can still flush the old native animation frame.
  motion.addEventListener('change', redraw);
  return {
    add(
      parent: Pick<Shape, 'appendChild'>,
      [x, y]: Point,
      size: number,
      color: string,
      animated = true,
    ) {
      const ring = scene.createElement('circle', {
        className: 'annotation-pulse',
        style: {
          cx: x,
          cy: y,
          r: size * defaults.staticScale,
          stroke: color,
          fill: 'none',
          lineWidth: defaults.lineWidth,
          opacity: defaults.opacity,
          pointerEvents: 'none',
          zIndex: -1,
        },
      });
      parent.appendChild(ring);
      rings.add(ring);
      if (!animated || motion.matches) return;
      const animation = ring.animate(
        [
          { r: size * defaults.startScale, opacity: defaults.opacity },
          { r: size * defaults.endScale, opacity: 0 },
        ],
        { duration: defaults.duration, iterations: Infinity, easing: 'ease-out' },
      );
      // Keep batches and subsequent redraws on the same pulse phase.
      if (animation) animation.currentTime = performance.now() % defaults.duration;
    },
    clear,
    destroy() {
      motion.removeEventListener('change', redraw);
      clear();
    },
  };
}
