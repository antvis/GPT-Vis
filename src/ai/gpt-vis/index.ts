import type { VisualizationOptions } from '../types';
import { createVisWrapper, type WrapperInstance } from '../vis-wrapper';
import type { AreaConfig, AreaInstance } from '../vis/area';
import { Area } from '../vis/area';
import type { BarConfig, BarInstance } from '../vis/bar';
import { Bar } from '../vis/bar';
import type { BoxplotConfig, BoxplotInstance } from '../vis/boxplot';
import { Boxplot } from '../vis/boxplot';
import type { ColumnConfig, ColumnInstance } from '../vis/column';
import { Column } from '../vis/column';
import type { DualAxesConfig, DualAxesInstance } from '../vis/dual-axes';
import { DualAxes } from '../vis/dual-axes';
import type { FishboneDiagramConfig, FishboneDiagramInstance } from '../vis/fishbone-diagram';
import { FishboneDiagram } from '../vis/fishbone-diagram';
import type { FlowDiagramConfig, FlowDiagramInstance } from '../vis/flow-diagram';
import { FlowDiagram } from '../vis/flow-diagram';
import type { FunnelConfig, FunnelInstance } from '../vis/funnel';
import { Funnel } from '../vis/funnel';
import type { HistogramConfig, HistogramInstance } from '../vis/histogram';
import { Histogram } from '../vis/histogram';
import type { IndentedTreeConfig, IndentedTreeInstance } from '../vis/indented-tree';
import { IndentedTree } from '../vis/indented-tree';
import type { LineConfig, LineInstance } from '../vis/line';
import { Line } from '../vis/line';
import type { LiquidConfig, LiquidInstance } from '../vis/liquid';
import { Liquid } from '../vis/liquid';
import type { MindMapConfig, MindMapInstance } from '../vis/mind-map';
import { MindMap } from '../vis/mind-map';
import type { NetworkGraphConfig, NetworkGraphInstance } from '../vis/network-graph';
import { NetworkGraph } from '../vis/network-graph';
import type { OrganizationChartConfig, OrganizationChartInstance } from '../vis/organization-chart';
import { OrganizationChart } from '../vis/organization-chart';
import type { PieConfig, PieInstance } from '../vis/pie';
import { Pie } from '../vis/pie';
import type { RadarConfig, RadarInstance } from '../vis/radar';
import { Radar } from '../vis/radar';
import type { SankeyConfig, SankeyInstance } from '../vis/sankey';
import { Sankey } from '../vis/sankey';
import type { ScatterConfig, ScatterInstance } from '../vis/scatter';
import { Scatter } from '../vis/scatter';
import type { TableConfig, TableInstance } from '../vis/table';
import { Table } from '../vis/table';
import type { TreemapConfig, TreemapInstance } from '../vis/treemap';
import { Treemap } from '../vis/treemap';
import type { VennConfig, VennInstance } from '../vis/venn';
import { Venn } from '../vis/venn';
import type { ViolinConfig, ViolinInstance } from '../vis/violin';
import { Violin } from '../vis/violin';
import type { WaterfallConfig, WaterfallInstance } from '../vis/waterfall';
import { Waterfall } from '../vis/waterfall';
import type { WordCloudConfig, WordCloudInstance } from '../vis/word-cloud';
import { WordCloud } from '../vis/word-cloud';

/**
 * Union type for all supported chart configurations
 */
export type GPTVisConfig =
  | AreaConfig
  | BarConfig
  | BoxplotConfig
  | ColumnConfig
  | DualAxesConfig
  | FishboneDiagramConfig
  | FlowDiagramConfig
  | FunnelConfig
  | HistogramConfig
  | IndentedTreeConfig
  | LineConfig
  | LiquidConfig
  | MindMapConfig
  | NetworkGraphConfig
  | OrganizationChartConfig
  | PieConfig
  | RadarConfig
  | SankeyConfig
  | ScatterConfig
  | TableConfig
  | TreemapConfig
  | VennConfig
  | ViolinConfig
  | WaterfallConfig
  | WordCloudConfig;

/**
 * Union type for all chart instances
 */
type ChartInstance =
  | AreaInstance
  | BarInstance
  | BoxplotInstance
  | ColumnInstance
  | DualAxesInstance
  | FishboneDiagramInstance
  | FlowDiagramInstance
  | FunnelInstance
  | HistogramInstance
  | IndentedTreeInstance
  | LineInstance
  | LiquidInstance
  | MindMapInstance
  | NetworkGraphInstance
  | OrganizationChartInstance
  | PieInstance
  | RadarInstance
  | SankeyInstance
  | ScatterInstance
  | TableInstance
  | TreemapInstance
  | VennInstance
  | ViolinInstance
  | WaterfallInstance
  | WordCloudInstance;

/**
 * GPTVis is the unified API for all chart types.
 * It provides a simple interface to render different types of visualizations.
 *
 * @example
 * ```ts
 * import { GPTVis } from '@antv/gpt-vis';
 *
 * const g = new GPTVis({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 *   wrapper: true, // Enable wrapper with tabs and controls (default: false)
 * });
 *
 * g.render({
 *   type: 'pie',
 *   data: [
 *     { category: '分类一', value: 27 },
 *     { category: '分类二', value: 25 },
 *   ],
 *   innerRadius: 0.6,
 *   theme: 'academy'
 * });
 *
 * g.destroy();
 * ```
 */
export class GPTVis {
  private options: VisualizationOptions;
  private currentChart: ChartInstance | null = null;
  private wrapperInstance: WrapperInstance | null = null;

  /**
   * Chart type registry mapping type strings to factory functions
   */
  private static readonly chartRegistry: Record<
    string,
    (options: VisualizationOptions) => ChartInstance
  > = {
    area: Area,
    bar: Bar,
    boxplot: Boxplot,
    column: Column,
    'dual-axes': DualAxes,
    'fishbone-diagram': FishboneDiagram,
    'flow-diagram': FlowDiagram,
    funnel: Funnel,
    histogram: Histogram,
    'indented-tree': IndentedTree,
    line: Line,
    liquid: Liquid,
    'mind-map': MindMap,
    'network-graph': NetworkGraph,
    'organization-chart': OrganizationChart,
    pie: Pie,
    radar: Radar,
    sankey: Sankey,
    scatter: Scatter,
    table: Table,
    treemap: Treemap,
    venn: Venn,
    violin: Violin,
    waterfall: Waterfall,
    'word-cloud': WordCloud,
  };

  /**
   * Constructor
   * @param options - Visualization options containing container and dimensions
   */
  constructor(options: VisualizationOptions) {
    this.options = options;
  }

  /**
   * Render a chart based on the provided configuration
   * @param config - Chart configuration with type field to determine which chart to render
   */
  render(config: GPTVisConfig): void {
    const type = config.type;

    if (!type) {
      throw new Error('Chart type is required in config');
    }

    const chartFactory = GPTVis.chartRegistry[type];

    if (!chartFactory) {
      const availableTypes = Object.keys(GPTVis.chartRegistry).join(', ');
      throw new Error(`Unsupported chart type: "${type}". Available types: ${availableTypes}`);
    }

    // Destroy previous chart if exists
    if (this.currentChart) {
      this.currentChart.destroy();
    }

    // Destroy previous wrapper if exists
    if (this.wrapperInstance) {
      this.wrapperInstance.destroy();
      this.wrapperInstance = null;
    }

    // Create wrapper if enabled
    let chartContainer = this.options.container;
    if (this.options.wrapper) {
      this.wrapperInstance = createVisWrapper(this.options.container, {
        chartType: type,
        config,
        locale: 'zh-CN',
      });
      chartContainer = this.wrapperInstance.chartContainer;
    }

    // Create chart options with the appropriate container
    const chartOptions: VisualizationOptions = {
      ...this.options,
      container: chartContainer,
    };

    // Create new chart instance and render
    this.currentChart = chartFactory(chartOptions);
    (this.currentChart as any).render(config);

    // Set chart reference in wrapper if wrapper is enabled
    if (this.wrapperInstance) {
      this.wrapperInstance.setChartRef(this.currentChart);
    }
  }

  /**
   * Destroy the current chart instance and clean up resources
   */
  destroy(): void {
    if (this.currentChart) {
      this.currentChart.destroy();
      this.currentChart = null;
    }
    if (this.wrapperInstance) {
      this.wrapperInstance.destroy();
      this.wrapperInstance = null;
    }
  }
}
