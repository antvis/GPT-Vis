import { describe, expect, it } from 'vitest';

import { mergeChartStyles, mergeThemeObjects } from '../src/theme/merge';

describe('theme merge', () => {
  it('merges a shared axis style into channel overrides and preserves false', () => {
    const result = mergeChartStyles(
      {
        axis: {
          labelFill: '#64748b',
          gridLineDash: [3, 3],
        },
      },
      {
        axis: {
          x: { labelFontSize: 11 },
          y: false,
        },
      },
    );

    expect(result.axis).toEqual({
      x: {
        labelFill: '#64748b',
        labelFontSize: 11,
        gridLineDash: [3, 3],
      },
      y: false,
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

    const result = mergeChartStyles(base, override);

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

    const result = mergeThemeObjects<Record<string, unknown>>(
      { color: '#111111', preserved: true },
      unsafe,
      { color: undefined },
    );

    expect(result).toEqual({ color: '#315ee7', preserved: true, nested: { value: 2 } });
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
    expect(({} as { nestedPolluted?: boolean }).nestedPolluted).toBeUndefined();
  });
});
