import { describe, expect, it } from 'vitest';

import { resolveChartTheme, resolveTheme } from '../src/theme';
import type { ThemeSpec } from '../src/types';
import { CHART_TYPES } from '../src/types/chart';

const theme: ThemeSpec = {
  version: '1',
  id: 'product-report',
  label: 'Product report',
  baseTheme: 'academy',
  tokens: {
    colorDefault: '#315ee7',
    colorBackground: '#f8faff',
    colorSurface: '#ffffff',
    colorText: '#172033',
    colorTextSecondary: '#64748b',
    colorTextInverse: '#ffffff',
    colorStroke: '#dbe3f0',
    colorPositive: '#16a34a',
    colorNegative: '#dc2626',
    colorNeutral: '#64748b',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 20,
    padding1: 8,
    padding2: 12,
    padding3: 20,
    lineWidth: 2,
    radius: 8,
  },
  style: {
    title: { titleFontWeight: 700 },
    axis: { gridLineDash: [3, 3] },
    mark: {
      line: { shape: 'smooth', lineWidth: 3 },
    },
    node: { fillOpacity: 0.9 },
  },
  charts: {
    line: {
      style: {
        axis: { x: { labelFill: '#475569' } },
        mark: { point: { shape: 'circle', size: 6 } },
      },
    },
    pie: {
      innerRadius: 0.64,
      style: { mark: { interval: { radius: 6 } } },
    },
  },
};

describe('theme resolver', () => {
  it('expands tokens before applying precise global style overrides', () => {
    const resolved = resolveTheme(theme);

    expect(resolved.baseTheme).toBe('academy');
    expect(resolved.style).toMatchObject({
      backgroundColor: '#f8faff',
      palette: ['#315ee7'],
      title: {
        titleFill: '#172033',
        titleFontFamily: 'Inter, sans-serif',
        titleFontSize: 16,
        titleFontWeight: 700,
      },
      axis: {
        lineStroke: '#dbe3f0',
        labelFill: '#64748b',
        gridLineDash: [3, 3],
      },
      mark: {
        line: { shape: 'smooth', lineWidth: 3 },
        interval: { lineWidth: 2, radius: 8 },
      },
      node: {
        stroke: '#dbe3f0',
        lineWidth: 2,
        radius: 8,
        fillOpacity: 0.9,
      },
      edge: {
        stroke: '#dbe3f0',
        lineWidth: 2,
        labelFill: '#64748b',
      },
      summary: {
        colorPositive: '#16a34a',
        colorNegative: '#dc2626',
        colorMetricValue: '#315ee7',
      },
    });
  });

  it('applies global, chart and local overrides in order', () => {
    const resolved = resolveChartTheme(resolveTheme(theme), 'line', {
      style: {
        axis: { y: false },
        mark: {
          line: { lineWidth: 5 },
          point: false,
        },
      },
    });

    expect(resolved).toMatchObject({
      type: 'line',
      baseTheme: 'academy',
      tokens: {
        colorTextInverse: '#ffffff',
        padding3: 20,
      },
      style: {
        axis: {
          x: {
            lineStroke: '#dbe3f0',
            labelFill: '#475569',
            gridLineDash: [3, 3],
          },
          y: false,
        },
        mark: {
          line: { shape: 'smooth', lineWidth: 5 },
          point: false,
        },
      },
    });
  });

  it('keeps chart-specific extra config and lets local values win', () => {
    const resolved = resolveChartTheme(resolveTheme(theme), 'pie', { innerRadius: 0.72 });

    expect(resolved.innerRadius).toBe(0.72);
    expect(resolved.style.mark?.interval).toMatchObject({ lineWidth: 2, radius: 6 });
  });

  it('removes global capabilities that the target chart cannot consume', () => {
    const resolved = resolveChartTheme(resolveTheme(theme), 'pie');

    expect(resolved.style).not.toHaveProperty('axis');
    expect(resolved.style.mark).toEqual({ interval: { lineWidth: 2, radius: 6 } });
  });

  it('keeps G2 marks and G6 elements in separate style namespaces', () => {
    const resolved = resolveTheme(theme);
    const line = resolveChartTheme(resolved, 'line');
    const graph = resolveChartTheme(resolved, 'network-graph');

    expect(line.style).not.toHaveProperty('node');
    expect(line.style).not.toHaveProperty('edge');
    expect(line.style.mark).toMatchObject({
      line: { shape: 'smooth', lineWidth: 3 },
      point: { lineWidth: 2 },
    });

    expect(graph.style).not.toHaveProperty('mark');
    expect(graph.style.node).toMatchObject({
      stroke: '#dbe3f0',
      radius: 8,
      fillOpacity: 0.9,
    });
    expect(graph.style.edge).toMatchObject({
      stroke: '#dbe3f0',
      lineWidth: 2,
    });
  });

  it('resolves every registered chart type', () => {
    const resolved = resolveTheme(theme);

    for (const type of CHART_TYPES) {
      expect(resolveChartTheme(resolved, type)).toMatchObject({
        type,
        baseTheme: 'academy',
      });
    }
  });

  it('does not mutate source objects and replaces arrays instead of merging them', () => {
    const source = structuredClone(theme);
    const resolved = resolveTheme({
      ...theme,
      style: { axis: { gridLineDash: [8, 2] } },
    });

    expect(theme).toEqual(source);
    expect(resolved.style.axis).toMatchObject({ gridLineDash: [8, 2] });
  });

  it('normalizes built-in theme names without duplicating renderer defaults', () => {
    expect(resolveTheme('dark')).toEqual({
      version: '1',
      id: 'dark',
      label: 'GPT-Vis Dark',
      description: undefined,
      baseTheme: 'dark',
      tokens: {},
      style: {},
      charts: {},
    });
  });
});
