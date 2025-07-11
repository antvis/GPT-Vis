import { type AreaOptions } from './vis/area';
import { type BarOptions } from './vis/bar';
import { type BoxplotOptions } from './vis/boxplot';
import { type ColumnOptions } from './vis/column';
import { type DualAxesOptions } from './vis/dual-axes';
import { type FishboneDiagramOptions } from './vis/fishbone-diagram';
import { type FlowDiagramOptions } from './vis/flow-diagram';
import { type FunnelOptions } from './vis/funnel';
import { type HistogramOptions } from './vis/histogram';
import { type LineOptions } from './vis/line';
import { type LiquidOptions } from './vis/liquid';
import { type MindMapOptions } from './vis/mind-map';
import { type NetworkGraphOptions } from './vis/network-graph';
import { type OrganizationChartOptions } from './vis/organization-chart';
import { type PieOptions } from './vis/pie';
import { type RadarOptions } from './vis/radar';
import { type SankeyOptions } from './vis/sankey';
import { type ScatterOptions } from './vis/scatter';
import { type TreemapOptions } from './vis/treemap';
import { type VennOptions } from './vis/venn';
import { type ViolinOptions } from './vis/violin';
import { type WordCloudOptions } from './vis/word-cloud';

export type VisOptionMap = {
  area: AreaOptions;
  bar: BarOptions;
  boxplot: BoxplotOptions;
  column: ColumnOptions;
  'dual-axes': DualAxesOptions;
  'fishbone-diagram': FishboneDiagramOptions;
  'flow-diagram': FlowDiagramOptions;
  funnel: FunnelOptions;
  histogram: HistogramOptions;
  line: LineOptions;
  liquid: LiquidOptions;
  'mind-map': MindMapOptions;
  'network-graph': NetworkGraphOptions;
  'organization-chart': OrganizationChartOptions;
  pie: PieOptions;
  radar: RadarOptions;
  sankey: SankeyOptions;
  scatter: ScatterOptions;
  treemap: TreemapOptions;
  venn: VennOptions;
  violin: ViolinOptions;
  'word-cloud': WordCloudOptions;
};

/**
 * 所有的 Vis 类型的类型定义
 */
export type Options = {
  [K in keyof VisOptionMap]: { type: K } & VisOptionMap[K];
}[keyof VisOptionMap];

/**
 * 返回结果
 * todo: G2-SSR 目前不支持 toDataURL
 */
export type SSRResult = {
  exportToFile: (file: string, meta?: any) => void;
  toBuffer: (meta?: any) => Buffer;
  toDataURL: () => string;
};

/**
 * 字体枚举
 */
export enum FontFamily {
  ROUGH = 'rough',
}
