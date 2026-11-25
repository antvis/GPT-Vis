import { describe, expect, it } from 'vitest';
import { quantile } from '../../../src/annotation/components/quantile';
import { getAnnotationStyle } from '../../../src/theme/annotation';
import { getThemeObject } from '../../../src/theme/g2';

const defaults = getAnnotationStyle(getThemeObject('line'));
describe('quantile', () => {
  it('selects candidates before calculating the quantile of the requested axis', () => {
    const data = [
      { time: 4, revenue: 10, group: 'A' },
      { time: 0, revenue: 30, group: 'A' },
      { time: 100, revenue: 100, group: 'B' },
    ];
    expect(
      quantile.g2([{ type: 'quantile', p: 0.9, axis: 'x', data: { group: 'A' } }], {
        chartType: 'line',
        mapping: { x: 'time', y: 'revenue', data },
        defaults,
      }),
    ).toMatchObject([{ data: { time: 3.6 } }]);
    expect(data.map(({ time }) => time)).toEqual([4, 0, 100]);
  });

  it('validates probability even when there are no observations', () => {
    const context = {
      chartType: 'line' as const,
      mapping: {
        x: 'time' as const,
        y: 'revenue' as const,
        data: [] as { time: number; revenue: number }[],
      },
      defaults,
    };
    expect(quantile.g2([{ type: 'quantile', p: 0.5 }], context)).toEqual([]);
    expect(() => quantile.g2([{ type: 'quantile', p: NaN }], context)).toThrow('quantile p');
  });
});
