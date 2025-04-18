import { Area } from './Area';
import { Bar } from './Bar';
import { Column } from './Column';
import { DualAxes } from './DualAxes';
import { FishboneDiagram } from './FishboneDiagram';
import { FlowDiagram } from './FlowDiagram';
import { Histogram } from './Histogram';
import { Line } from './Line';
import { MindMap } from './MindMap';
import { NetworkGraph } from './NetworkGraph';
import { Pie } from './Pie';
import { Radar } from './Radar';
import { Scatter } from './Scatter';
import { Treemap } from './Treemap';
import type {
  AreaOptions,
  BarOptions,
  ColumnOptions,
  DualAxespOptions,
  FishboneDiagramOptions,
  FlowDiagramOptions,
  HistogramOptions,
  LineOptions,
  MindMapOptions,
  NetworkGraphOptions,
  Options,
  PieOptions,
  RadarOptions,
  ScatterOptions,
  TreemapOptions,
  WordCloudOptions,
} from './type';
import { WordCloud } from './WordCloud';

export async function render(options: Options) {
  switch (options.type) {
    case 'line':
      return Line(options as LineOptions);
    case 'column':
      return Column(options as ColumnOptions);
    case 'pie':
      return Pie(options as PieOptions);
    case 'area':
      return Area(options as AreaOptions);
    case 'bar':
      return Bar(options as BarOptions);
    case 'histogram':
      return Histogram(options as HistogramOptions);
    case 'scatter':
      return Scatter(options as ScatterOptions);
    case 'word-cloud':
      return WordCloud(options as WordCloudOptions);
    case 'treemap':
      return Treemap(options as TreemapOptions);
    case 'dual-axes':
      return DualAxes(options as DualAxespOptions);
    case 'radar':
      return Radar(options as RadarOptions);
    case 'mind-map':
      return MindMap(options as MindMapOptions);
    case 'network-graph':
      return NetworkGraph(options as NetworkGraphOptions);
    case 'flow-diagram':
      return FlowDiagram(options as FlowDiagramOptions);
    case 'fishbone-diagram':
      return FishboneDiagram(options as FishboneDiagramOptions);
    default:
      throw new Error(`Unknown chart type: ${options.type}`);
  }
}
