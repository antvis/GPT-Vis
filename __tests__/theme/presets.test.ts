import { describe, expect, it } from 'vitest';
import { getThemeObject as g2 } from '../../src/theme/g2';
import { getThemeObject as g6 } from '../../src/theme/g6';
import { THEME_PRESETS } from '../../src/theme/presets';
import { resolveTheme } from '../../src/theme/resolve';
import { getThemeObject as summary } from '../../src/theme/summary';
import { getThemeObject as table } from '../../src/theme/table';
import type { VisualizationTheme } from '../../src/types';

describe('built-in gallery themes', () => {
  it.each(THEME_PRESETS)('$id matches its full configuration in each renderer', (preset) => {
    const actual = g2('line', preset.id);
    const expected = g2('line', preset);
    expect(actual.mark).toEqual(expected.mark);
    expect(actual.theme.category10).toEqual(expected.theme.category10);
    expect(actual.theme.view).toEqual(expected.theme.view);
    expect(g6('network-graph', preset.id)).toEqual(g6('network-graph', preset));
    expect(table('table', preset.id)).toEqual(table('table', preset));
    expect(summary('summary', preset.id)).toEqual(summary('summary', preset));
  });

  it('preserves built-in base themes and the light alias', () => {
    expect(resolveTheme('line').baseTheme).toBe('light');
    expect(resolveTheme('line', 'light')).toEqual(resolveTheme('line', 'default'));
    expect(resolveTheme('line', 'dark').baseTheme).toBe('dark');
    expect(resolveTheme('line', 'academy')).toMatchObject({ baseTheme: 'academy', tokens: {} });
  });

  it('applies local overrides without leaking changes into later renders', () => {
    const before = structuredClone(THEME_PRESETS);
    const baseline = g2('line', 'pop');
    const actual = g2('line', 'pop', { palette: ['#123456'], mark: { line: { lineWidth: 0 } } });
    expect(actual.theme.category10).toEqual(['#123456']);
    expect(actual.mark.line.lineWidth).toBe(0);
    (actual.theme.category10 as string[]).push('#ffffff');
    const next = g2('line', 'pop');
    expect(next.mark).toEqual(baseline.mark);
    expect(next.theme.category10).toEqual(baseline.theme.category10);
    expect(THEME_PRESETS).toEqual(before);
  });

  it('keeps custom objects with built-in IDs independent from the registry', () => {
    const custom = { id: 'pop', label: 'Custom', tokens: { colorDefault: '#123456' } };
    expect(resolveTheme('line', custom)).toMatchObject({
      tokens: { colorDefault: '#123456' },
    });
    expect(resolveTheme('line', custom)).toEqual(resolveTheme('line', { ...custom, id: 'custom' }));
  });

  it.each(['unknown', 'constructor'])('falls back to the default theme for %s', (name) => {
    expect(resolveTheme('line', name as VisualizationTheme)).toEqual(resolveTheme('line'));
  });
});
