import { describe, expect, it } from 'vitest';
import { getThemeObject as g2 } from '../../src/theme/g2';
import { getThemeObject as g6 } from '../../src/theme/g6';
import { THEME_PRESETS } from '../../src/theme/presets';
import { resolveTheme } from '../../src/theme/resolve';
import { getThemeObject as summary } from '../../src/theme/summary';
import { getThemeObject as table } from '../../src/theme/table';
import type { ChartType, VisualizationTheme } from '../../src/types';

const chartTypes: ChartType[] = [
  'fishbone-diagram',
  'flow-diagram',
  'indented-tree',
  'mindmap',
  'network-graph',
  'organization-chart',
  'area',
  'bar',
  'boxplot',
  'column',
  'dual-axes',
  'funnel',
  'histogram',
  'line',
  'liquid',
  'pie',
  'radar',
  'sankey',
  'scatter',
  'summary',
  'table',
  'treemap',
  'venn',
  'violin',
  'waterfall',
  'word-cloud',
];

describe('built-in gallery themes', () => {
  it.each(THEME_PRESETS)('$id matches its full configuration across all chart types', (preset) => {
    expect(chartTypes).toHaveLength(26);
    for (const type of chartTypes) {
      expect(resolveTheme(type, preset.id), `${preset.id}: ${type}`).toEqual(
        resolveTheme(type, preset),
      );
    }
    const actual = g2('line', preset.id);
    const expected = g2('line', preset);
    expect(actual.mark).toEqual(expected.mark);
    expect(actual.theme.category10).toEqual(expected.theme.category10);
    expect(actual.theme.view).toEqual(expected.theme.view);
    expect(g6('network-graph', preset.id)).toEqual(g6('network-graph', preset));
    expect(table('table', preset.id)).toEqual(table('table', preset));
    expect(summary('summary', preset.id)).toEqual(summary('summary', preset));
  });

  it('preserves legacy bases and keeps Paper and GPT-Vis separate from them', () => {
    expect(resolveTheme('line').baseTheme).toBe('light');
    expect(resolveTheme('line', 'light')).toEqual(resolveTheme('line', 'default'));
    expect(resolveTheme('line', 'dark').baseTheme).toBe('dark');
    expect(resolveTheme('line', 'academy')).toMatchObject({ baseTheme: 'academy', tokens: {} });
    expect(resolveTheme('line', 'paper')).toMatchObject({
      baseTheme: 'academy',
      tokens: { colorBackground: '#fcfbf8' },
    });
    expect(g2('line', 'paper').theme.category10).not.toEqual(
      g2('line', 'academy').theme.category10,
    );
    expect(g2('line', 'gpt-vis').theme.category10).not.toEqual(
      g2('line', 'default').theme.category10,
    );
    expect(THEME_PRESETS.map((preset) => preset.id)).not.toContain('academy');
  });

  it('applies local overrides without leaking changes into later renders', () => {
    const before = structuredClone(THEME_PRESETS);
    const actual = g2('line', 'pop', { palette: ['#123456'], mark: { line: { lineWidth: 0 } } });
    expect(actual.theme.category10).toEqual(['#123456']);
    expect(actual.mark.line.lineWidth).toBe(0);
    (actual.theme.category10 as string[]).push('#ffffff');
    expect(g2('line', 'pop').mark.line.lineWidth).toBe(6);
    expect(g2('line', 'pop').theme.category10).toEqual(
      before.find((p) => p.id === 'pop')!.tokens!.category10,
    );
    expect(THEME_PRESETS).toEqual(before);
  });

  it('keeps custom objects with built-in IDs independent from the registry', () => {
    expect(
      resolveTheme('line', { id: 'pop', label: 'Custom', tokens: { colorDefault: '#123456' } }),
    ).toMatchObject({
      tokens: { colorDefault: '#123456' },
    });
    expect(g2('line', { id: 'pop', label: 'Custom' }).mark.line.lineWidth).not.toBe(6);
    expect(resolveTheme('line', 'unknown' as VisualizationTheme).tokens).toEqual({});
    expect(resolveTheme('line', 'constructor' as VisualizationTheme).tokens).toEqual({});
  });
});
