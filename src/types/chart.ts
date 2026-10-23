import type {
  AreaChartStyle,
  BoxplotChartStyle,
  DualAxesChartStyle,
  FishboneDiagramChartStyle,
  FlowDiagramChartStyle,
  FunnelChartStyle,
  GraphChartStyle,
  HistogramChartStyle,
  IndentedTreeChartStyle,
  IntervalChartStyle,
  LineChartStyle,
  LiquidChartStyle,
  NetworkGraphChartStyle,
  PieChartStyle,
  RadarChartStyle,
  SankeyChartStyle,
  ScatterChartStyle,
  SummaryStyle,
  TableStyle,
  TreemapChartStyle,
  VennChartStyle,
  ViolinChartStyle,
  WaterfallChartStyle,
  WordCloudChartStyle,
} from './style';

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
export type ChartType = (typeof CHART_TYPES)[number];

/** Final chart-specific style boundary used by ThemeSpec and renderer adapters. */
export interface ChartStyleMap {
  area: AreaChartStyle;
  bar: IntervalChartStyle;
  boxplot: BoxplotChartStyle;
  column: IntervalChartStyle;
  'dual-axes': DualAxesChartStyle;
  'flow-diagram': FlowDiagramChartStyle;
  funnel: FunnelChartStyle;
  histogram: HistogramChartStyle;
  'indented-tree': IndentedTreeChartStyle;
  line: LineChartStyle;
  liquid: LiquidChartStyle;
  mindmap: GraphChartStyle;
  'network-graph': NetworkGraphChartStyle;
  'organization-chart': GraphChartStyle;
  pie: PieChartStyle;
  radar: RadarChartStyle;
  sankey: SankeyChartStyle;
  scatter: ScatterChartStyle;
  summary: SummaryStyle;
  table: TableStyle;
  treemap: TreemapChartStyle;
  venn: VennChartStyle;
  violin: ViolinChartStyle;
  waterfall: WaterfallChartStyle;
  'word-cloud': WordCloudChartStyle;
  'fishbone-diagram': FishboneDiagramChartStyle;
}
