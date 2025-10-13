import type { LarkMapProps } from '@antv/larkmap';
import type { CSSProperties, ReactNode } from 'react';
import type { Map } from './map';

export type { LarkMapProps };

export enum ChartType {
  Area = 'area',
  Bar = 'bar',
  Boxplot = 'boxplot',
  Column = 'column',
  DualAxes = 'dual-axes',
  FishboneDiagram = 'fishbone-diagram',
  FlowDiagram = 'flow-diagram',
  Funnel = 'funnel',
  HeatMap = 'heat-map',
  Histogram = 'histogram',
  IndentedTree = 'indented-tree',
  Line = 'line',
  Liquid = 'liquid',
  MindMap = 'mind-map',
  NetworkGraph = 'network-graph',
  OrganizationChart = 'organization-chart',
  PathMap = 'path-map',
  Pie = 'pie',
  PinMap = 'pin-map',
  Radar = 'radar',
  Sankey = 'sankey',
  Scatter = 'scatter',
  Treemap = 'treemap',
  Venn = 'venn',
  Violin = 'violin',
  Table = 'table',
  VisText = 'vis-text',
  WordCloud = 'word-cloud',
}

export type Charts = keyof typeof ChartType;

export interface BaseChartProps {
  containerStyle?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

export interface BasePlotProps<T> extends BaseChartProps {
  data: T[];
  axisXTitle?: string;
  axisYTitle?: string;
  title?: string;
}

export interface BaseMapProps<T> extends BaseChartProps, Map {
  style?: CSSProperties;
  data: T[];
  // 高德地图密钥
  token?: string;
}

export interface BaseGraphProps<T> extends BaseChartProps {
  data: T;
}

interface GraphNode {
  name: string;
}

interface GraphEdge {
  source: string;
  target: string;
  name?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface TreeGraphData {
  name: string;
  children?: TreeGraphData[];
  [key: string]: any;
}

export interface GraphProps extends BaseGraphProps<GraphData> {}

export interface TreeGraphProps extends BaseGraphProps<TreeGraphData> {}

export interface Theme {
  theme?: 'default' | 'academy' | 'dark';
}

export interface Style {
  style?: {
    lineWidth?: number;
    backgroundColor?: string;
    palette?: string[];
  };
}
