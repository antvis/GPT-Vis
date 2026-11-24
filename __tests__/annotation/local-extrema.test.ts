import { describe, expect, it } from 'vitest';
import { prepareAnnotations } from '../../src/annotation/registry';
import { selectLocalExtrema } from '../../src/annotation/utils';
import { getAnnotationStyle } from '../../src/theme/annotation';
import { getThemeObject } from '../../src/theme/g2';

const rows = (values: (number | null)[]) => values.map((value, time) => ({ time, value }));
const indices = (values: (number | null)[], maximum: boolean, options = {}) =>
  selectLocalExtrema(rows(values), 'value', maximum, undefined, options).map(({ time }) => time);

describe('ordered-series peak and valley detection', () => {
  it.each([
    [[1, 4, 2, 5, 1], [1, 3], [2]],
    [[1, 4, 4, 4, 1], [2], []],
    [[1, 4, 4, 1], [1], []],
    [[5, 2, 2, 2, 5], [], [2]],
    [[1, 2, 3], [], []],
    [[3, 3, 3], [], []],
    [[4, 1, null, 3, 2], [], []],
    [[4, NaN, 1, Infinity, 5], [], []],
    [[], [], []],
  ])('finds interior peaks and valleys in %j', (values, peaks, valleys) => {
    const data = rows(values);
    expect(selectLocalExtrema(data, 'value', true).map(({ time }) => time)).toEqual(peaks);
    expect(selectLocalExtrema(data, 'value', false).map(({ time }) => time)).toEqual(valleys);
  });

  it('measures prominence against the surrounding baseline rather than adjacent differences', () => {
    expect(indices([0, 5, 4, 6, 0], true, { minProminence: 2 })).toEqual([3]);
    expect(indices([8, 3, 4, 2, 8], false, { minProminence: 2 })).toEqual([3]);
    expect(indices([0, 5, 5, 5, 0], true, { minProminence: 5 })).toEqual([2]);
    expect(indices([0, 5, 0], true, { minProminence: 6 })).toEqual([]);
  });

  it('keeps taller peaks and deeper valleys at the requested observation spacing', () => {
    expect(indices([0, 5, 0, 4, 0, 7, 0], true, { minDistance: 4 })).toEqual([1, 5]);
    expect(indices([8, 3, 8, 4, 8, 1, 8], false, { minDistance: 4 })).toEqual([1, 5]);
    expect(indices([0, 4, 0, 4, 0], true, { minDistance: 3 })).toEqual([1]);
  });

  it('ends prominence searches at gaps and computes each series independently', () => {
    expect(indices([0, 5, 4, null, 0], true, { minProminence: 2 })).toEqual([]);
    const data = [0, 0, 5, 8, 0, 0].map((value, i) => ({ value, time: i, group: i % 2 }));
    expect(
      selectLocalExtrema(data, 'value', true, 'group', { minDistance: 9 }).map(({ time }) => time),
    ).toEqual([2, 3]);
  });

  it.each([
    { minProminence: -1 },
    { minProminence: Infinity },
    { minDistance: 0 },
    { minDistance: 1.5 },
  ])('rejects invalid detection controls %j', (options) => {
    expect(() => indices([0, 5, 0], true, options)).toThrow('Invalid annotation:');
  });

  it('filters detected observations without connecting previously nonadjacent data', () => {
    const data = rows([0, 5, 10, 0]);

    expect(
      prepareAnnotations<ReturnType<typeof rows>[number], 'g2'>(
        'g2',
        [{ type: 'peak', data: [{ time: 0 }, { time: 1 }, { time: 3 }] }],
        {
          chartType: 'line',
          mapping: { x: 'time', y: 'value', data },
          defaults: getAnnotationStyle(getThemeObject('line')),
        },
      ),
    ).toEqual([]);
  });

  it.each(['column', 'bar', 'scatter'] as const)('rejects peak and valley on %s', (chartType) => {
    for (const type of ['peak', 'valley'] as const)
      expect(() =>
        prepareAnnotations<ReturnType<typeof rows>[number], 'g2'>('g2', [{ type }], {
          chartType,
          mapping: { x: 'time', y: 'value', data: rows([0, 5, 0]) },
          defaults: getAnnotationStyle(getThemeObject('line')),
        }),
      ).toThrow(`Unsupported ${chartType}`);
  });
});
