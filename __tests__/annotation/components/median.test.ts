import { describe, expect, it } from 'vitest';
import { median } from '../../../src/annotation/components/median';
import { getAnnotationStyle } from '../../../src/theme/annotation';
import { getThemeObject } from '../../../src/theme/g2';

const defaults = getAnnotationStyle(getThemeObject('line'));
describe('median', () => {
  it.each([
    [[30, 10, 20], 20],
    [[30, null, NaN, 10], 20],
    [[1e308, 1e308], 1e308],
  ] satisfies [(number | null)[], number][])(
    'sorts valid observations from %j without changing source order',
    (values, expected) => {
      const data = values.map((revenue, time) => ({ time, revenue }));
      const before = structuredClone(data);
      expect(
        median.g2([{ type: 'median' }], {
          chartType: 'line',
          mapping: { x: 'time', y: 'revenue', data },
          defaults,
        }),
      ).toMatchObject([{ data: { revenue: expected } }]);
      expect(data).toEqual(before);
    },
  );
});
