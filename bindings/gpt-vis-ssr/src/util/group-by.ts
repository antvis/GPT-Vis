/**
 * Same with lodash's `groupBy` function.
 * Groups the elements of an array based on a key function.
 * @param data
 * @param keyFunc
 * @returns
 */
export function groupBy(data: any[], keyFunc: (d: any) => string) {
  return data.reduce(
    (acc, item) => {
      const key = keyFunc(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, any[]>,
  );
}
