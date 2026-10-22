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

/** Merge chart style objects without mutating the inputs. */
export const mergeChartStyles = <T extends object>(
  ...sources: readonly (T | object | undefined)[]
): T => mergeThemeObjects<T>(...sources);
