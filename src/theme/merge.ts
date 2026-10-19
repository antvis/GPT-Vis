import type { AxisStyle, ChartAxisStyle, ChartStyle } from '../types';

type UnknownRecord = Record<string, unknown>;

// `__proto__` can invoke Object.prototype's legacy setter, while
// `constructor.prototype` is the other common prototype-pollution path.
// ThemeSpec may originate from generated JSON, so neither path is mergeable.
const UNSAFE_MERGE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

const isPlainObject = (value: unknown): value is UnknownRecord => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const mergeValue = (target: unknown, source: unknown): unknown => {
  if (source === undefined) return cloneValue(target);
  if (Array.isArray(source)) return source.map(cloneValue);
  if (!isPlainObject(source)) return source;

  const result: UnknownRecord = isPlainObject(target) ? (cloneValue(target) as UnknownRecord) : {};

  for (const [key, value] of Object.entries(source)) {
    if (UNSAFE_MERGE_KEYS.has(key) || value === undefined) continue;
    result[key] = mergeValue(result[key], value);
  }

  return result;
};

const cloneValue = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(cloneValue);
  if (!isPlainObject(value)) return value;
  return mergeValue(undefined, value);
};

/** Merge JSON-like theme values without mutating the inputs. Arrays are replaced. */
export const mergeThemeObjects = <T extends object>(
  ...sources: readonly (T | Partial<T> | undefined)[]
): T => sources.reduce<T>((result, source) => mergeValue(result, source) as T, {} as T);

const isAxisChannels = (
  value: Exclude<ChartAxisStyle, false>,
): value is { x?: false | AxisStyle; y?: false | AxisStyle } =>
  Object.hasOwn(value, 'x') || Object.hasOwn(value, 'y');

const mergeAxisChannel = (
  base: false | AxisStyle | undefined,
  override: false | AxisStyle | undefined,
): false | AxisStyle | undefined => {
  if (override === undefined) return cloneValue(base) as false | AxisStyle | undefined;
  if (override === false) return false;
  if (!base) return cloneValue(override) as AxisStyle;
  return mergeThemeObjects<AxisStyle>(base, override);
};

const mergeAxisStyles = (
  base: ChartAxisStyle | undefined,
  override: ChartAxisStyle | undefined,
): ChartAxisStyle | undefined => {
  if (override === undefined) return cloneValue(base) as ChartAxisStyle | undefined;
  if (override === false) return false;
  if (!base) return cloneValue(override) as ChartAxisStyle;

  const baseIsChannels = isAxisChannels(base);
  const overrideIsChannels = isAxisChannels(override);
  if (!baseIsChannels && !overrideIsChannels) return mergeThemeObjects<AxisStyle>(base, override);

  const baseX = baseIsChannels ? base.x : base;
  const baseY = baseIsChannels ? base.y : base;
  const overrideX = overrideIsChannels ? override.x : override;
  const overrideY = overrideIsChannels ? override.y : override;

  return {
    x: mergeAxisChannel(baseX, overrideX),
    y: mergeAxisChannel(baseY, overrideY),
  };
};

/** Merge chart styles with semantic handling for shared and per-axis styles. */
export const mergeChartStyles = <T extends object>(
  ...sources: readonly (T | object | undefined)[]
): T => {
  let result = {} as ChartStyle;

  for (const source of sources) {
    if (!source) continue;
    const { axis, ...rest } = source as ChartStyle;
    const currentAxis = result.axis;
    result = mergeThemeObjects<ChartStyle>(result, rest);
    result.axis = mergeAxisStyles(currentAxis, axis);
    if (result.axis === undefined) delete result.axis;
  }

  return result as T;
};
