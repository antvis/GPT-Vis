import { describe, expect, it } from 'vitest';

import { mergeTheme } from '../../src/theme/merge';

describe('theme merge', () => {
  it('deep-merges styles while preserving false and zero overrides', () => {
    const result = mergeTheme(
      {
        axis: {
          grid: true,
          lineWidth: 1,
          labelFill: '#64748b',
          gridLineDash: [3, 3],
        },
      },
      {
        axis: {
          grid: false,
          lineWidth: 0,
          labelFontSize: 11,
        },
      },
    );

    expect(result.axis).toEqual({
      grid: false,
      lineWidth: 0,
      labelFill: '#64748b',
      labelFontSize: 11,
      gridLineDash: [3, 3],
    });
  });

  it('replaces arrays without mutating source objects', () => {
    const base = {
      palette: ['#111111', '#222222'],
      axis: { gridLineDash: [3, 3] },
    };
    const override = {
      palette: ['#315ee7'],
      axis: { gridLineDash: [8, 2] },
    };

    const result = mergeTheme(base, override);

    expect(result).toEqual(override);
    expect(result.palette).not.toBe(override.palette);
    expect(result.axis).not.toBe(override.axis);
    expect(base).toEqual({
      palette: ['#111111', '#222222'],
      axis: { gridLineDash: [3, 3] },
    });
  });

  it('ignores undefined values and prototype-polluting keys', () => {
    const unsafe = JSON.parse(`{
      "color": "#315ee7",
      "nested": {
        "value": 2,
        "__proto__": { "nestedPolluted": true }
      },
      "__proto__": { "polluted": true },
      "constructor": { "prototype": { "polluted": true } }
    }`) as Record<string, unknown>;

    const result = mergeTheme({ color: '#111111', preserved: true }, unsafe, { color: undefined });

    expect(result).toEqual({ color: '#315ee7', preserved: true, nested: { value: 2 } });
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
    expect(({} as { nestedPolluted?: boolean }).nestedPolluted).toBeUndefined();
  });
});
