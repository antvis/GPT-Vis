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
