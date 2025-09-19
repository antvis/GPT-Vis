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
import { default as WordCloud, type WordCloudProps } from './WordCloud';

/********** graph chart **********/
import { default as FishboneDiagram, type FishboneDiagramProps } from './FishboneDiagram';
import { default as FlowDiagram, type FlowDiagramProps } from './FlowDiagram';
import { default as MindMap, type MindMapProps } from './MindMap';
import { default as NetworkGraph, type NetworkGraphProps } from './NetworkGraph';
export { default as IndentedTree, type IndentedTreeProps } from './IndentedTree';
export { default as OrganizationChart, type OrganizationChartProps } from './OrganizationChart';

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
  Line,
  Liquid,
  MindMap,
  NetworkGraph,
  PathMap,
  Pie,
  PinMap,
  Radar,
  Sankey,
  Scatter,
  Treemap,
  Venn,
  Violin,
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
  type LineProps,
  type LiquidProps,
  type MindMapProps,
  type NetworkGraphProps,
  type PathMapProps,
  type PieProps,
  type PinMapProps,
  type RadarProps,
  type SankeyProps,
  type ScatterProps,
  type TreemapProps,
  type VennProps,
  type ViolinProps,
  type WordCloudProps,
};

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
  [ChartType.WordCloud]: WordCloud,
};
