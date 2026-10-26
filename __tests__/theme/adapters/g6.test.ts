import { ExtensionCategory, getExtensions } from '@antv/g6';
import { describe, expect, it } from 'vitest';
import { getThemeObject } from '../../../src/theme';
import {
  G6_BUILT_IN_EDGE_TYPES,
  G6_BUILT_IN_NODE_TYPES,
  GPT_VIS_G6_EDGE_TYPES,
  GPT_VIS_G6_NODE_TYPES,
} from '../../../src/theme/adapters/g6';

const base = { version: '1', id: 'test', label: 'Test' } as const;
const sorted = (values: readonly string[]) => [...values].sort();

describe('G6 theme adapter', () => {
  it('separates G6 element type from renderer visual style', () => {
    expect(
      getThemeObject('network-graph', base, {
        style: {
          node: { type: 'diamond', fill: '#6d8cff', lineWidth: 3, cursor: 'crosshair' } as any,
        },
      }).node,
    ).toEqual({ type: 'diamond', style: { fill: '#6d8cff', lineWidth: 3 } });
  });

  it('adapts shared title styles to the G6 title plugin', () => {
    expect(
      getThemeObject('network-graph', base, {
        title: 'Revenue',
        subtitle: 'FY 2026',
        style: { title: { align: 'center', titleFontSize: 20, titleFill: '#111827' } },
      }).plugins,
    ).toMatchObject([
      {
        key: 'title',
        type: 'title',
        title: 'Revenue',
        subtitle: 'FY 2026',
        titleFill: '#111827',
        align: 'center',
        titleFontSize: 20,
      },
    ]);
    expect(getThemeObject('network-graph', base).plugins).toEqual([]);
  });

  it('reserves title canvas and graph space for large G6 typography', () => {
    const appearance = getThemeObject('network-graph', base, {
      title: 'Revenue',
      subtitle: 'FY 2026',
      style: { title: { titleFontSize: 40, subtitleFontSize: 20, spacing: 20 } },
    });
    const size = (appearance.plugins as Record<string, any>[])[0].size;
    expect(size).toBeGreaterThanOrEqual(80);
    expect((appearance.padding as number[])[0]).toBeGreaterThanOrEqual(size + 16);
    expect(getThemeObject('network-graph', base).padding).toBe(20);
    expect(getThemeObject('network-graph', base, { title: 'Revenue' }).padding).toEqual([
      46, 20, 20, 20,
    ]);
  });

  it('matches the built-in G6 node and edge registries', () => {
    expect(sorted(G6_BUILT_IN_NODE_TYPES)).toEqual(
      sorted(Object.keys(getExtensions(ExtensionCategory.NODE))),
    );
    expect(sorted(G6_BUILT_IN_EDGE_TYPES)).toEqual(
      sorted(Object.keys(getExtensions(ExtensionCategory.EDGE))),
    );
  });

  it('keeps theme-selectable G6 nodes data-independent', () => {
    expect(G6_BUILT_IN_NODE_TYPES).toEqual(expect.arrayContaining([...GPT_VIS_G6_NODE_TYPES]));
    expect(GPT_VIS_G6_NODE_TYPES).not.toContain('html');
    expect(GPT_VIS_G6_NODE_TYPES).not.toContain('image');
    expect(GPT_VIS_G6_NODE_TYPES).not.toContain('donut');
  });

  it('keeps theme-selectable G6 edges layout-independent', () => {
    expect(G6_BUILT_IN_EDGE_TYPES).toEqual(expect.arrayContaining([...GPT_VIS_G6_EDGE_TYPES]));
    expect(GPT_VIS_G6_EDGE_TYPES).not.toContain('cubic-horizontal');
    expect(GPT_VIS_G6_EDGE_TYPES).not.toContain('cubic-vertical');
    expect(GPT_VIS_G6_EDGE_TYPES).not.toContain('cubic-radial');
  });
});
