import { Plugin as RoughCanvasPlugin } from '@antv/g-plugin-rough-canvas-renderer';
import { SSRResult, type Options } from './types';
import { Area } from './vis/area';
import { Bar } from './vis/bar';
import { Boxplot } from './vis/boxplot';
import { Column } from './vis/column';
import { DualAxes } from './vis/dual-axes';
import { FishboneDiagram } from './vis/fishbone-diagram';
import { FlowDiagram } from './vis/flow-diagram';
import { Funnel } from './vis/funnel';
import { Histogram } from './vis/histogram';
import { Line } from './vis/line';
import { Liquid } from './vis/liquid';
import { MindMap } from './vis/mind-map';
import { NetworkGraph } from './vis/network-graph';
import { OrganizationChart } from './vis/organization-chart';
import { Pie } from './vis/pie';
import { Radar } from './vis/radar';
import { Sankey } from './vis/sankey';
import { Scatter } from './vis/scatter';
import { Treemap } from './vis/treemap';
import { Venn } from './vis/venn';
import { Violin } from './vis/violin';
import { WordCloud } from './vis/word-cloud';

/**
 * 所有的 Vis 类型
 * @type {Record<VisType, (options: Options) => Promise<Buffer>>}
 */
const VIS = {
  area: Area,
  bar: Bar,
  boxplot: Boxplot,
  column: Column,
  'dual-axes': DualAxes,
  'fishbone-diagram': FishboneDiagram,
  'flow-diagram': FlowDiagram,
  funnel: Funnel,
  histogram: Histogram,
  line: Line,
  liquid: Liquid,
  'mind-map': MindMap,
  'network-graph': NetworkGraph,
  'organization-chart': OrganizationChart,
  pie: Pie,
  radar: Radar,
  sankey: Sankey,
  scatter: Scatter,
  treemap: Treemap,
  violin: Violin,
  venn: Venn,
  'word-cloud': WordCloud,
};

/**
 *
 * @param options
 * @returns Image Buffer
 */
export async function render(options: Options): Promise<SSRResult> {
  const { type, ...rest } = options;

  // if theme is rough, use rough canvas plugin, and set theme to default
  if (rest.texture === 'rough') {
    rest.renderPlugins = [
      new RoughCanvasPlugin({
        roughRendering: (element) => {
          return element.attributes.class !== 'area';
        },
      }),
    ];
  }

  // @ts-ignore
  const renderVis = VIS[type];

  if (!renderVis) {
    throw new Error(`Unknown chart type: ${type}`);
  }
  // @ts-ignore
  return await renderVis(rest);
}

export { FontFamily } from './types';
