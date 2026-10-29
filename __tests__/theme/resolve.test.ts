import { describe, expect, it } from 'vitest';
import { getThemeObject as g2 } from '../../src/theme/g2';
import { getThemeObject as g6 } from '../../src/theme/g6';
import { getThemeObject as summary } from '../../src/theme/summary';
import { getThemeObject as table } from '../../src/theme/table';
import type { ThemeSpec } from '../../src/types';

const spec: ThemeSpec = {
  id: 'test',
  label: 'Test',
  baseTheme: 'dark',
  tokens: {
    lineWidth: 1,
    radius: 8,
    colorText: '#eee',
    colorTextInverse: '#111',
    colorDefault: '#f0f',
    spacingMedium: 12,
  },
  style: {
    mark: { line: { lineWidth: 2, lineDash: [2, 3] } },
    node: { lineWidth: 2 },
  },
  charts: {
    area: { style: { mark: { line: { lineWidth: 3 } } } },
    'network-graph': { style: { node: { lineWidth: 3 } } },
  },
};

describe('theme priority and isolation', () => {
  it('applies token, shared, chart and local appearance over built-in defaults', () => {
    expect(g2('area', 'dark').theme.type).toBe('dark');
    expect(g2('area', spec).mark.line).toEqual({ lineWidth: 3, lineDash: [2, 3] });
    const actual = g2('area', spec, { mark: { line: { lineWidth: 0, lineDash: [5] } } });
    expect(actual.mark.line).toEqual({ lineWidth: 0, lineDash: [5] });
    expect(actual.theme.category10 as string[]).toEqual(['#f0f']);
    expect(actual.theme.title).toMatchObject({ titleFill: '#eee', spacing: 12 });
    expect(actual.theme.label).toMatchObject({ fill: '#eee' });
    const local = g2('area', spec, {
      palette: ['#123456'],
      label: { fill: '#654321', fontSize: 18 },
    });
    expect(local.theme).toMatchObject({
      color: '#123456',
      category10: ['#123456'],
      category20: ['#123456'],
      label: { fill: '#654321', fontSize: 18 },
    });
    expect(g6('network-graph', spec, { node: { lineWidth: 0 } }).node.style).toMatchObject({
      lineWidth: 0,
      radius: 8,
    });
    expect(g6('network-graph', spec).node.style.labelFill).toBe('#eee');
    expect(g6('network-graph', spec, { node: { labelFill: '#123456' } }).node.style.labelFill).toBe(
      '#123456',
    );
  });
  it('keeps legacy chart-local shorthand at its own priority', () => {
    expect(g2('area', spec, { lineWidth: 7 }).mark.line.lineWidth).toBe(7);
    expect(
      g2('area', spec, { lineWidth: 7, mark: { line: { lineWidth: 0 } } }).mark.line.lineWidth,
    ).toBe(0);
  });
  it('uses the same priority for DOM tables and T8 summaries', () => {
    const shared = {
      ...spec,
      tokens: { fontSize: 12, colorText: '#111' },
      style: { table: { cell: { fontSize: 14 } }, summary: { fontSize: 14 } },
      charts: {
        table: { style: { table: { cell: { fontSize: 16 } } } },
        summary: { style: { summary: { fontSize: 16 } } },
      },
    };
    expect(table('table', shared).cell.fontSize).toBe('16px');
    expect(summary('summary', shared).summary.fontSize).toBe(16);
    expect(table('table', shared, { table: { cell: { fontSize: 18 } } }).cell.fontSize).toBe(
      '18px',
    );
    expect(summary('summary', shared, { summary: { fontSize: 18 } }).summary.fontSize).toBe(18);
  });
  it('does not mutate reusable specs', () => {
    const before = structuredClone(spec);
    const actual = g2('area', spec);
    (actual.theme.category10 as string[]).push('#aaa');
    actual.mark.line.lineDash.push(9);
    expect(spec).toEqual(before);
  });
});
