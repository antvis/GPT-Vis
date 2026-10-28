/** Theme objects merge recursively; arrays replace and undefined keeps the previous value. */
export function mergeTheme(...sources: (Record<string, any> | undefined)[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (const source of sources) {
    for (const [key, value] of Object.entries(source ?? {})) {
      if (
        value === undefined ||
        key === '__proto__' ||
        key === 'constructor' ||
        key === 'prototype'
      )
        continue;
      if (Array.isArray(value)) {
        result[key] = [...value];
      } else if (value && typeof value === 'object') {
        const previous = result[key];
        result[key] = mergeTheme(
          previous && typeof previous === 'object' && !Array.isArray(previous)
            ? previous
            : undefined,
          value,
        );
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}
