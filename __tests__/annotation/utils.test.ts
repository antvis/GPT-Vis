import { describe, expect, it } from 'vitest';
import { axisRange, quantileValue } from '../../src/annotation/utils';

describe('quantileValue', () => {
  it.each([
    [[10, 20, 30], 0, 10],
    [[10, 20, 30], 1, 30],
    [[10, 20, 30], 0.9, 28],
    [[10, 20, 30, 40], 0.5, 25],
    [[7], 0.95, 7],
  ] as const)('interpolates %j at %s', (values, p, expected) => {
    expect(quantileValue([...values], p)).toBe(expected);
  });

  it('interpolates finite extremes without overflowing', () => {
    expect(quantileValue([-1e308, 1e308], 0.5)).toBe(0);
    expect(quantileValue([1e308, 1e308], 0.5)).toBe(1e308);
  });

  it.each([-0.1, 1.1, NaN, Infinity])('rejects invalid probability %s', (p) => {
    expect(() => quantileValue([10, 20], p)).toThrow('quantile p');
  });
});

describe('axisRange', () => {
  it('preserves numeric, category and time boundaries in the original field', () => {
    expect(axisRange('revenue', [10, 25])).toEqual({ revenue: [10, 25] });
    expect(axisRange('category', ['B', 'D'])).toEqual({ category: ['B', 'D'] });
    expect(axisRange('date', ['2026-01-02', '2026-01-04'])).toEqual({
      date: ['2026-01-02', '2026-01-04'],
    });
  });

  it.each(
    [[], [0], [0, 1, 2], [0, Infinity], ['', 'D'], [0, 'D'], [null, 1], [30, 10]].map((bounds) => [
      bounds,
    ]),
  )('rejects invalid boundaries %j', (bounds) => {
    expect(() => axisRange('value', bounds)).toThrow('Invalid annotation:');
  });
});
