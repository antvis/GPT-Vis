import { describe, expect, it } from 'vitest';
import { CHART_THEME_CAPABILITIES } from '../../src/theme/capabilities';
import { CHART_TYPES } from '../../src/theme/chart-types';

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
});
