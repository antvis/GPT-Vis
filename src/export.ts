// organize-imports-ignore
import { ChartType } from './types';

/********** plot chart **********/
import { default as Area, type AreaProps } from './Area';
import { default as Bar, type BarProps } from './Bar';
import { default as Boxplot, type BoxplotProps } from './Boxplot';
import { default as Column, type ColumnProps } from './Column';
import { default as DualAxes, type DualAxesProps } from './DualAxes';
import { default as Funnel, type FunnelProps } from './Funnel';
import { default as Histogram, type HistogramProps } from './Histogram';
import { default as Line, type LineProps } from './Line';
import { default as Liquid, type LiquidProps } from './Liquid';
import { default as Pie, type PieProps } from './Pie';
import { default as Radar, type RadarProps } from './Radar';
import { default as Sankey, type SankeyProps } from './Sankey';
import { default as Scatter, type ScatterProps } from './Scatter';
import { default as Treemap, type TreemapProps } from './Treemap';
import { default as Venn, type VennProps } from './Venn';
import { default as Violin, type ViolinProps } from './Violin';
import { default as Waterfall, type WaterfallProps } from './Waterfall';
import { default as WordCloud, type WordCloudProps } from './WordCloud';

/********** graph chart **********/
import { default as FishboneDiagram, type FishboneDiagramProps } from './FishboneDiagram';
import { default as FlowDiagram, type FlowDiagramProps } from './FlowDiagram';
import { default as MindMap, type MindMapProps } from './MindMap';
import { default as NetworkGraph, type NetworkGraphProps } from './NetworkGraph';
import { default as OrganizationChart, type OrganizationChartProps } from './OrganizationChart';
import { default as IndentedTree, type IndentedTreeProps } from './IndentedTree';

/********** map chart **********/
export { Map, type MapProps } from './export-map';
import {
  PinMap,
  type PinMapProps,
  HeatMap,
  type HeatMapProps,
  PathMap,
  type PathMapProps,
} from './export-map';

/********** NTV **********/
import { default as Table, type TableProps } from './Table';
import { default as Spreadsheet, type SpreadsheetProps } from './Spreadsheet';
export { VisText, type VisTextProps } from './Text';

export {
  Area,
  Bar,
  Boxplot,
  Column,
  DualAxes,
  FishboneDiagram,
  FlowDiagram,
  Funnel,
  HeatMap,
  Histogram,
  IndentedTree,
  Line,
  Liquid,
  MindMap,
  NetworkGraph,
  OrganizationChart,
  PathMap,
  Pie,
  PinMap,
  Radar,
  Sankey,
  Scatter,
  Treemap,
  Venn,
  Violin,
  Waterfall,
  Table,
  Spreadsheet,
  WordCloud,
  type AreaProps,
  type BarProps,
  type BoxplotProps,
  type ColumnProps,
  type DualAxesProps,
  type FishboneDiagramProps,
  type FlowDiagramProps,
  type FunnelProps,
  type HeatMapProps,
  type HistogramProps,
  type IndentedTreeProps,
  type LineProps,
  type LiquidProps,
  type MindMapProps,
  type NetworkGraphProps,
  type OrganizationChartProps,
  type PathMapProps,
  type PieProps,
  type PinMapProps,
  type RadarProps,
  type SankeyProps,
  type ScatterProps,
  type TreemapProps,
  type VennProps,
  type ViolinProps,
  type WaterfallProps,
  type TableProps,
  type SpreadsheetProps,
  type WordCloudProps,
};

export type VisOptionMap = {
  [ChartType.Area]: AreaProps;
  [ChartType.Bar]: BarProps;
  [ChartType.Boxplot]: BoxplotProps;
  [ChartType.Column]: ColumnProps;
  [ChartType.DualAxes]: DualAxesProps;
  [ChartType.FishboneDiagram]: FishboneDiagramProps;
  [ChartType.FlowDiagram]: FlowDiagramProps;
  [ChartType.Funnel]: FunnelProps;
  [ChartType.HeatMap]: HeatMapProps;
  [ChartType.Histogram]: HistogramProps;
  [ChartType.IndentedTree]: IndentedTreeProps;
  [ChartType.Line]: LineProps;
  [ChartType.Liquid]: LiquidProps;
  [ChartType.MindMap]: MindMapProps;
  [ChartType.NetworkGraph]: NetworkGraphProps;
  [ChartType.OrganizationChart]: OrganizationChartProps;
  [ChartType.PathMap]: PathMapProps;
  [ChartType.Pie]: PieProps;
  [ChartType.PinMap]: PinMapProps;
  [ChartType.Radar]: RadarProps;
  [ChartType.Sankey]: SankeyProps;
  [ChartType.Scatter]: ScatterProps;
  [ChartType.Table]: TableProps;
  [ChartType.Spreadsheet]: SpreadsheetProps;
  [ChartType.Treemap]: TreemapProps;
  [ChartType.Venn]: VennProps;
  [ChartType.Violin]: ViolinProps;
  [ChartType.Waterfall]: WaterfallProps;
  [ChartType.WordCloud]: WordCloudProps;
};

/**
 * 所有的 Vis 类型的类型定义
 */
export type Spec = {
  [K in keyof VisOptionMap]: { type: K } & VisOptionMap[K];
}[keyof VisOptionMap];

export const DEFAULT_CHART_COMPONENTS: Record<string, React.FC<any>> = {
  [ChartType.Area]: Area,
  [ChartType.Bar]: Bar,
  [ChartType.Boxplot]: Boxplot,
  [ChartType.Column]: Column,
  [ChartType.DualAxes]: DualAxes,
  [ChartType.FishboneDiagram]: FishboneDiagram,
  [ChartType.FlowDiagram]: FlowDiagram,
  [ChartType.Funnel]: Funnel,
  [ChartType.HeatMap]: HeatMap,
  [ChartType.Histogram]: Histogram,
  [ChartType.IndentedTree]: IndentedTree,
  [ChartType.Line]: Line,
  [ChartType.Liquid]: Liquid,
  [ChartType.MindMap]: MindMap,
  [ChartType.NetworkGraph]: NetworkGraph,
  [ChartType.Pie]: Pie,
  [ChartType.PinMap]: PinMap,
  [ChartType.Radar]: Radar,
  [ChartType.Sankey]: Sankey,
  [ChartType.Scatter]: Scatter,
  [ChartType.Treemap]: Treemap,
  [ChartType.Venn]: Venn,
  [ChartType.Violin]: Violin,
  [ChartType.Waterfall]: Waterfall,
  [ChartType.Table]: Table,
  [ChartType.WordCloud]: WordCloud,
  [ChartType.OrganizationChart]: OrganizationChart,
};
