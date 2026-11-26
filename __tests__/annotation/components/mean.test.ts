import { describe, expect, it } from 'vitest';
import { mean } from '../../../src/annotation/components/mean';
import { getAnnotationStyle } from '../../../src/theme/annotation';
import { getThemeObject } from '../../../src/theme/g2';
import type { Annotation } from '../../../src/types/annotation';

type Row = { time: number; revenue: number | null; group?: string };
const defaults = getAnnotationStyle(getThemeObject('line'));
function calculate(
  data: Row[],
  options: Omit<Extract<Annotation<Row>, { type: 'mean' }>, 'type'> = {},
) {
  return mean.g2([{ type: 'mean', ...options }], {
    chartType: 'line',
    mapping: { x: 'time', y: 'revenue', data },
    defaults,
  });
}

describe('mean', () => {
  it('calculates the selected logical axis without reordering the source', () => {
    const rows = [
      { time: 4, revenue: 10, group: 'A' },
      { time: 2, revenue: 30, group: 'B' },
    ];
    const before = structuredClone(rows);
    expect(calculate(rows)).toMatchObject([{ data: { revenue: 20 } }]);
    expect(calculate(rows, { axis: 'x' })).toMatchObject([{ data: { time: 3 } }]);
    expect(calculate(rows, { data: { group: 'B' } })).toMatchObject([{ data: { revenue: 30 } }]);
    expect(rows).toEqual(before);
  });

  it('ignores missing and nonfinite observations and skips an empty selection', () => {
    const rows = [10, null, NaN, Infinity, 30].map((revenue, time) => ({ time, revenue }));
    expect(calculate(rows)).toMatchObject([{ data: { revenue: 20 } }]);
    expect(calculate([])).toEqual([]);
    expect(calculate([{ time: 0, revenue: null }])).toEqual([]);
  });

  it.each([
    [[1e308, 1e308], 1e308],
    [[-1e308, 1e308], 0],
    [[0, 0], 0],
  ] as const)('keeps the mean finite for %j', (values, expected) => {
    expect(calculate(values.map((revenue, time) => ({ time, revenue })))).toMatchObject([
      { data: { revenue: expected } },
    ]);
  });
});
