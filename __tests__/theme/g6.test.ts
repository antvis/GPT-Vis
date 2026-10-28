import { describe, expect, it } from 'vitest';
import { getThemeObject } from '../../src/theme/g6';
import { getGraphTitle } from '../../src/util/components';

const base = { id: 'test', label: 'Test' } as const;

describe('G6 theme mapping', () => {
  it('separates native element types from paint and protects chart-owned fields', () => {
    const appearance = getThemeObject('network-graph', base, {
      node: {
        type: 'diamond',
        fill: '#6d8cff',
        lineWidth: 3,
        cursor: 'crosshair',
        labelText: 'ignored',
        size: 100,
      },
    });
    expect(appearance.node).toEqual({ type: 'diamond', style: { fill: '#6d8cff', lineWidth: 3 } });
    expect(
      getThemeObject('network-graph', base, { node: { type: 'html' } }).node.type,
    ).toBeUndefined();
    expect(
      getThemeObject('mindmap', base, { node: { type: 'diamond' } }).node.type,
    ).toBeUndefined();
    expect(
      getThemeObject('network-graph', base, { edge: { type: 'cubic-horizontal' } }).edge.type,
    ).toBeUndefined();
  });

  it('reserves both title canvas and graph space for large typography', () => {
    const { titleStyle } = getThemeObject('network-graph', base, {
      title: { align: 'center', titleFontSize: 40, subtitleFontSize: 20, spacing: 20 },
    });
    const { plugins, padding } = getGraphTitle('Revenue', 'FY 2026', titleStyle);
    const plugin = (plugins as Record<string, any>[])[0];
    expect(plugin).toMatchObject({ title: 'Revenue', subtitle: 'FY 2026', align: 'center' });
    expect(plugin.size).toBeGreaterThanOrEqual(80);
    expect((padding as number[])[0]).toBeGreaterThanOrEqual(plugin.size + 16);
    expect(getGraphTitle().plugins).toEqual([]);
    expect(getGraphTitle().padding).toBe(20);
    expect(getGraphTitle('Revenue').padding).toEqual([46, 20, 20, 20]);
  });
});
