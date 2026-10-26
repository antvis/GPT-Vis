export const G2_CHART_TYPES = [
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
  'treemap',
  'venn',
  'violin',
  'waterfall',
  'word-cloud',
] as const;

export const G6_CHART_TYPES = [
  'fishbone-diagram',
  'flow-diagram',
  'indented-tree',
  'mindmap',
  'network-graph',
  'organization-chart',
] as const;

export const CHART_TYPES = [...G2_CHART_TYPES, ...G6_CHART_TYPES, 'summary', 'table'] as const;

export type G2ChartType = (typeof G2_CHART_TYPES)[number];
export type G6ChartType = (typeof G6_CHART_TYPES)[number];
