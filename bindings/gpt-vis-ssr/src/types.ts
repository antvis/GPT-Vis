interface BaseChartConfig {
  type:
    | 'line'
    | 'column'
    | 'pie'
    | 'area'
    | 'bar'
    | 'histogram'
    | 'scatter'
    | 'word-cloud'
    | 'treemap'
    | 'dual-axes'
    | 'radar';
  data?: Array<{ time: string | number; value: number; [key: string]: any }> | any;
  axisXTitle?: string; // 可选字段（根据需求）
  axisYTitle?: string; // 可选字段
  title?: string;
  width: number;
  height: number;
  devicePixelRatio?: number;
}

interface LineChartConfig extends BaseChartConfig {
  type: 'line';
  group?: never;
  stack?: never;
  innerRadius?: never;
}

interface ColumnChartConfig extends BaseChartConfig {
  type: 'column';
  group?: boolean;
  stack?: boolean;
  innerRadius?: never;
}

interface PieChartConfig extends BaseChartConfig {
  type: 'pie';
  group?: never; // 禁止使用
  stack?: never; // 禁止使用
  innerRadius?: number; // 可选字段（环形图半径）
}

// 面积图
interface AreaChartConfig extends BaseChartConfig {
  type: 'area';
  group?: never;
  stack?: boolean; // 是否开启堆叠，开启堆叠条形图需数据中含有 stack 字段
}

// 条形图
interface BarChartConfig extends BaseChartConfig {
  type: 'bar';
  group?: boolean; // 是否开启分组，开启分组条形图需数据中含有 group 字段
  stack?: boolean; // 是否开启堆叠，开启堆叠条形图需数据中含有 stack 字段
}

// 直方图 验证失败
interface HistogramChartConfig extends BaseChartConfig {
  type: 'histogram';
  binNumber?: number;
}

// 散点图
interface ScatterChartConfig extends BaseChartConfig {
  type: 'scatter';
}

// 词云图 验证失败
interface WordCloudChartConfig extends BaseChartConfig {
  type: 'word-cloud';
}

// 矩阵树图 验证失败
interface TreemapConfig extends BaseChartConfig {
  type: 'treemap';
}

// 双轴图 验证失败
interface DualAxesChartConfig extends BaseChartConfig {
  type: 'dual-axes';
  categories: string[];
  series: {
    type: string;
    data: number[];
    axisYTitle: string;
  }[];
}

// 雷达图 验证失败
interface RadarChartConfig extends BaseChartConfig {
  type: 'radar';
  data: Array<{ name: string | number; value: number; [key: string]: any }> | string;
}

type Options =
  | BaseChartConfig
  | LineChartConfig
  | ColumnChartConfig
  | PieChartConfig
  | AreaChartConfig
  | BarChartConfig
  | HistogramChartConfig
  | ScatterChartConfig
  | WordCloudChartConfig
  | TreemapConfig
  | DualAxesChartConfig
  | RadarChartConfig;

export { Options };

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
