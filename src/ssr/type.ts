import {
  type AreaProps,
  type BarProps,
  type ColumnProps,
  type DualAxesProps,
  type FishboneDiagramProps,
  type FlowDiagramProps,
  type HistogramProps,
  type LineProps,
  type MindMapProps,
  type NetworkGraphProps,
  type PieProps,
  type RadarProps,
  type ScatterProps,
  type TreemapProps,
  type WordCloudProps,
} from '../export';

type ChartConfigMap = {
  line: LineProps;
  column: ColumnProps;
  pie: PieProps;
  area: AreaProps;
  bar: BarProps;
  histogram: HistogramProps;
  scatter: ScatterProps;
  treemap: TreemapProps;
  radar: RadarProps;
  'dual-axes': DualAxesProps;
  'word-cloud': WordCloudProps;
  'mind-map': MindMapProps;
  'network-graph': NetworkGraphProps;
  'flow-diagram': FlowDiagramProps;
  'fishbone-diagram': FishboneDiagramProps;
};

export type ChartType = keyof ChartConfigMap;

export interface BaseChartConfig {
  type: ChartType;
  width: number;
  height: number;
}

export type Options = {
  [K in ChartType]: BaseChartConfig & { type: K } & ChartConfigMap[K];
}[ChartType];

export type LineOptions = BaseChartConfig & { type: 'line' } & LineProps;
export type ColumnOptions = BaseChartConfig & { type: 'column' } & ColumnProps;
export type PieOptions = BaseChartConfig & { type: 'pie' } & PieProps;
export type AreaOptions = BaseChartConfig & { type: 'area' } & AreaProps;
export type BarOptions = BaseChartConfig & { type: 'bar' } & BarProps;
export type HistogramOptions = BaseChartConfig & { type: 'histogram' } & HistogramProps;
export type ScatterOptions = BaseChartConfig & { type: 'scatter' } & ScatterProps;
export type TreemapOptions = BaseChartConfig & { type: 'treemap' } & TreemapProps;
export type RadarOptions = BaseChartConfig & { type: 'radar' } & RadarProps;
export type DualAxespOptions = BaseChartConfig & { type: 'dual-axes' } & DualAxesProps;
export type WordCloudOptions = BaseChartConfig & { type: 'word-cloud' } & WordCloudProps;
export type MindMapOptions = BaseChartConfig & { type: 'mind-map' } & MindMapProps;
export type NetworkGraphOptions = BaseChartConfig & { type: 'network-graph' } & NetworkGraphProps;
export type FlowDiagramOptions = BaseChartConfig & { type: 'flow-diagram' } & FlowDiagramProps;
export type FishboneDiagramOptions = BaseChartConfig & {
  type: 'fishbone-diagram';
} & FishboneDiagramProps;
