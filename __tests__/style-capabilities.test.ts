import { stdlib } from '@antv/g2';
import { ExtensionCategory, getExtensions } from '@antv/g6';
import { describe, expect, it } from 'vitest';

import { CHART_THEME_CAPABILITIES } from '../src/theme/capabilities';
import { CHART_TYPES } from '../src/types/chart';
import { G2_BUILT_IN_MARK_SHAPES } from '../src/types/style/g2-marks';
import {
  G6_BUILT_IN_EDGE_TYPES,
  G6_BUILT_IN_NODE_TYPES,
  GPT_VIS_G6_EDGE_TYPES,
  GPT_VIS_G6_NODE_TYPES,
} from '../src/types/style/g6-elements';

const sorted = (values: readonly string[]) => [...values].sort();

describe('style capabilities', () => {
  it('covers every registered chart type with immutable runtime metadata', () => {
    expect(Object.keys(CHART_THEME_CAPABILITIES).sort()).toEqual([...CHART_TYPES].sort());
    expect(Object.isFrozen(CHART_THEME_CAPABILITIES)).toBe(true);
    expect(Object.isFrozen(CHART_THEME_CAPABILITIES.line)).toBe(true);
    expect(Object.isFrozen(CHART_THEME_CAPABILITIES.line.marks)).toBe(true);
  });

  it('keeps G2 marks and G6 elements in separate capability namespaces', () => {
    expect(CHART_THEME_CAPABILITIES.line.properties).toEqual(['backgroundColor', 'palette']);
    expect(CHART_THEME_CAPABILITIES.line.components).toEqual(['title', 'axis', 'legend']);
    expect(CHART_THEME_CAPABILITIES.line.elements).toEqual([]);
    expect(CHART_THEME_CAPABILITIES.line.marks).toEqual(['line', 'point']);
    expect(CHART_THEME_CAPABILITIES['network-graph'].marks).toEqual([]);
    expect(CHART_THEME_CAPABILITIES['network-graph'].elements).toEqual(['node', 'edge']);
  });

  it('includes chart-specific visual style capabilities only', () => {
    expect(CHART_THEME_CAPABILITIES['fishbone-diagram'].properties).toContain('texture');
    expect(CHART_THEME_CAPABILITIES.pie).not.toHaveProperty('config');
    expect(CHART_THEME_CAPABILITIES.treemap).not.toHaveProperty('config');
    expect(CHART_THEME_CAPABILITIES['word-cloud']).not.toHaveProperty('config');
  });

  it('only exposes shared data-label styles for charts that consume them', () => {
    const chartsWithDataLabels = ['bar', 'column', 'pie', 'funnel', 'venn', 'waterfall'];

    for (const type of CHART_TYPES) {
      expect(CHART_THEME_CAPABILITIES[type].components.includes('label')).toBe(
        chartsWithDataLabels.includes(type),
      );
    }
  });

  it('matches the registered G2 shapes exposed by stdlib', () => {
    const library = stdlib();

    for (const mark of [
      'line',
      'area',
      'point',
      'interval',
      'box',
      'text',
      'path',
      'density',
      'link',
      'connector',
    ] as const) {
      expect(sorted(G2_BUILT_IN_MARK_SHAPES[mark])).toEqual(
        sorted(Object.keys(library[`mark.${mark}`].props!.shape!)),
      );
    }
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
