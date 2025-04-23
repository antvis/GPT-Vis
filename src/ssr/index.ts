import { Area, type AreaOptions } from './area';
import { Bar, type BarOptions } from './bar';
import { Column, type ColumnOptions } from './column';
import { DualAxes, type DualAxespOptions } from './dual-axes';
import { FishboneDiagram, type FishboneDiagramOptions } from './fishbone-diagram';
import { FlowDiagram, type FlowDiagramOptions } from './flow-diagram';
import { Histogram, type HistogramOptions } from './histogram';
import { Line, type LineOptions } from './line';
import { MindMap, type MindMapOptions } from './mind-map';
import { NetworkGraph, type NetworkGraphOptions } from './network-graph';
import { Pie, type PieOptions } from './pie';
import { Radar, type RadarOptions } from './radar';
import { Scatter, type ScatterOptions } from './scatter';
import { Treemap, type TreemapOptions } from './treemap';
import type { Options } from './type';
import { WordCloud, type WordCloudOptions } from './word-cloud';

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
