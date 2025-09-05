import type { LarkMapProps } from '@antv/larkmap';
import type { CSSProperties, ReactNode } from 'react';
import type { Map } from './map';

export type { LarkMapProps };

export enum ChartType {
  Pie = 'pie',
  Column = 'column',
  Line = 'line',
  Area = 'area',
  Scatter = 'scatter',
  Histogram = 'histogram',
  Treemap = 'treemap',
  Bar = 'bar',
  WordCloud = 'word-cloud',
  DualAxes = 'dual-axes',
  Radar = 'radar',
  PinMap = 'pin-map',
  PathMap = 'path-map',
  HeatMap = 'heat-map',
  MindMap = 'mind-map',
  FishboneDiagram = 'fishbone-diagram',
  FlowDiagram = 'flow-diagram',
  IndentedTree = 'indented-tree',
  NetworkGraph = 'network-graph',
  OrganizationChart = 'organization-chart',
  VisText = 'vis-text',
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
