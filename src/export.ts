import { ChartType } from './types';

/********** plot chart **********/
import { default as Area, type AreaProps } from './Area';
import { default as Bar, type BarProps } from './Bar';
import { default as Column, type ColumnProps } from './Column';
import { default as DualAxes, type DualAxesProps } from './DualAxes';
import { default as HeatMap, type HeatMapProps } from './HeatMap';
import { default as Histogram, type HistogramProps } from './Histogram';
import { default as Line, type LineProps } from './Line';
import { default as Pie, type PieProps } from './Pie';
import { default as Radar, type RadarProps } from './Radar';
import { default as Scatter, type ScatterProps } from './Scatter';
import { default as Treemap, type TreemapProps } from './Treemap';
import { default as WordCloud, type WordCloudProps } from './WordCloud';

/********** graph chart **********/
import { default as FishboneDiagram, type FishboneDiagramProps } from './FishboneDiagram';
import { default as FlowDiagram, type FlowDiagramProps } from './FlowDiagram';
import { default as MindMap, type MindMapProps } from './MindMap';
import { default as NetworkGraph, type NetworkGraphProps } from './NetworkGraph';
export { default as IndentedTree, type IndentedTreeProps } from './IndentedTree';
export { default as Map, type MapProps } from './Map';
export { default as OrganizationChart, type OrganizationChartProps } from './OrganizationChart';

/********** map chart **********/
import { default as PathMap, type PathMapProps } from './PathMap';
import { default as PinMap, type PinMapProps } from './PinMap';

/********** NTV **********/
export { VisText, type VisTextProps } from './Text';

export {
  Area,
  Bar,
  Column,
  DualAxes,
  FishboneDiagram,
  FlowDiagram,
  HeatMap,
  Histogram,
  Line,
  MindMap,
  NetworkGraph,
  PathMap,
  Pie,
  PinMap,
  Radar,
  Scatter,
  Treemap,
  WordCloud,
  type AreaProps,
  type BarProps,
  type ColumnProps,
  type DualAxesProps,
  type FishboneDiagramProps,
  type FlowDiagramProps,
  type HeatMapProps,
  type HistogramProps,
  type LineProps,
  type MindMapProps,
  type NetworkGraphProps,
  type PathMapProps,
  type PieProps,
  type PinMapProps,
  type RadarProps,
  type ScatterProps,
  type TreemapProps,
  type WordCloudProps,
};

export const DEFAULT_CHART_COMPONENTS: Record<string, React.FC<any>> = {
  [ChartType.Line]: Line,
  [ChartType.Column]: Column,
  [ChartType.Pie]: Pie,
  [ChartType.Bar]: Bar,
  [ChartType.Area]: Area,
  [ChartType.Scatter]: Scatter,
  [ChartType.PinMap]: PinMap,
  [ChartType.PathMap]: PathMap,
  [ChartType.HeatMap]: HeatMap,
  [ChartType.MindMap]: MindMap,
  [ChartType.FlowDiagram]: FlowDiagram,
  [ChartType.NetworkGraph]: NetworkGraph,
  [ChartType.FishboneDiagram]: FishboneDiagram,
};
