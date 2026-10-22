import type { BaseChartStyle, CartesianChartStyle, LabelStyle, LegendStyle } from './components';
import type {
  AreaLineMarkStyle,
  AreaMarkStyle,
  BoxMarkStyle,
  BoxplotBoxMarkStyle,
  BoxplotPointMarkStyle,
  ConnectorMarkStyle,
  DensityMarkStyle,
  FunnelIntervalMarkStyle,
  IntervalMarkStyle,
  LineMarkStyle,
  LinkMarkStyle,
  LiquidMarkStyle,
  PathMarkStyle,
  PointMarkStyle,
  RectIntervalMarkStyle,
  SankeyMarkStyle,
  TreemapMarkStyle,
  ViolinBoxMarkStyle,
  WordCloudMarkStyle,
} from './g2-marks';
import type { G6EdgeStyle, G6EdgeVisualStyle, G6NodeStyle, G6NodeVisualStyle } from './g6-elements';
import type { SummaryComponentStyle, SummaryStyle } from './summary';
import type { TableComponentStyle, TableStyle } from './table';

export interface LineChartStyle extends CartesianChartStyle {
  /** @deprecated Use `mark.line.lineWidth` instead. */
  lineWidth?: number;
  mark?: {
    line?: LineMarkStyle;
    point?: PointMarkStyle;
  };
}

export interface AreaChartStyle extends CartesianChartStyle {
  /** @deprecated Use `mark.line.lineWidth` instead. */
  lineWidth?: number;
  mark?: {
    area?: AreaMarkStyle;
    line?: AreaLineMarkStyle;
    point?: PointMarkStyle;
  };
}

export interface IntervalChartStyle extends CartesianChartStyle {
  label?: LabelStyle;
  mark?: {
    interval?: RectIntervalMarkStyle;
  };
}

/** Histogram has axes but intentionally renders no legend. */
export interface HistogramChartStyle extends Omit<CartesianChartStyle, 'legend'> {
  mark?: {
    interval?: RectIntervalMarkStyle;
  };
}

export interface ScatterChartStyle extends CartesianChartStyle {
  mark?: {
    point?: PointMarkStyle;
  };
}

export interface PieChartStyle extends BaseChartStyle {
  legend?: LegendStyle;
  label?: LabelStyle;
  mark?: {
    interval?: RectIntervalMarkStyle;
  };
}

export interface RadarChartStyle extends CartesianChartStyle {
  /** @deprecated Use `mark.line.lineWidth` instead. */
  lineWidth?: number;
  mark?: {
    line?: LineMarkStyle;
  };
}

export interface DualAxesChartStyle extends CartesianChartStyle {
  mark?: {
    interval?: RectIntervalMarkStyle;
    line?: LineMarkStyle;
  };
}

export interface BoxplotChartStyle extends CartesianChartStyle {
  mark?: {
    box?: BoxplotBoxMarkStyle;
    point?: BoxplotPointMarkStyle;
  };
}

/** Violin renders a density mark plus a box mark with `shape: 'violin'`. */
export interface ViolinChartStyle extends CartesianChartStyle {
  mark?: {
    density?: DensityMarkStyle;
    box?: ViolinBoxMarkStyle;
  };
}

export interface FunnelChartStyle extends BaseChartStyle {
  label?: LabelStyle;
  mark?: {
    interval?: FunnelIntervalMarkStyle;
    connector?: ConnectorMarkStyle;
  };
}

export interface WaterfallChartStyle extends Omit<CartesianChartStyle, 'legend'> {
  label?: LabelStyle;
  mark?: {
    interval?: RectIntervalMarkStyle;
    link?: LinkMarkStyle;
  };
}

export interface LiquidChartStyle extends BaseChartStyle {
  mark?: {
    liquid?: LiquidMarkStyle;
  };
}

export interface TreemapChartStyle extends BaseChartStyle {
  mark?: {
    treemap?: TreemapMarkStyle;
  };
}

/** Venn renders a G2 path mark and labels. */
export interface VennChartStyle extends BaseChartStyle {
  label?: LabelStyle;
  mark?: {
    path?: PathMarkStyle;
  };
}

/** Sankey is one G2 composite mark, not a G6 node/edge graph. */
export interface SankeyChartStyle extends BaseChartStyle {
  mark?: {
    sankey?: SankeyMarkStyle;
  };
}

export interface WordCloudChartStyle extends BaseChartStyle {
  mark?: {
    wordCloud?: WordCloudMarkStyle;
  };
}

export interface GraphChartStyle extends BaseChartStyle {
  node?: G6NodeVisualStyle;
  edge?: G6EdgeVisualStyle;
}

/** Network graph uses G6 built-in elements and can safely vary their shape. */
export interface NetworkGraphChartStyle extends BaseChartStyle {
  node?: G6NodeStyle;
  edge?: G6EdgeStyle;
}

/** Fishbone adds a GPT-Vis rendering texture on top of fixed G6 elements. */
export interface FishboneDiagramChartStyle extends GraphChartStyle {
  texture?: 'rough' | 'default';
}

/** Flow uses a required HTML node and a required polyline edge internally. */
export interface FlowDiagramChartStyle extends BaseChartStyle {
  edge?: G6EdgeVisualStyle;
}

/** IndentedTree uses GPT-Vis custom node and edge implementations. */
export interface IndentedTreeChartStyle extends BaseChartStyle {
  node?: G6NodeVisualStyle;
  edge?: G6EdgeVisualStyle;
}

/** Global style namespace. Chart-specific overrides narrow this capability set. */
export interface ChartStyle extends BaseChartStyle {
  axis?: CartesianChartStyle['axis'];
  legend?: LegendStyle;
  label?: LabelStyle;
  mark?: {
    line?: AreaLineMarkStyle;
    area?: AreaMarkStyle;
    point?: PointMarkStyle;
    interval?: Omit<IntervalMarkStyle, 'shape'>;
    box?: Omit<BoxMarkStyle, 'shape'>;
    connector?: ConnectorMarkStyle;
    path?: PathMarkStyle;
    density?: DensityMarkStyle;
    link?: LinkMarkStyle;
    liquid?: LiquidMarkStyle;
    treemap?: TreemapMarkStyle;
    sankey?: SankeyMarkStyle;
    wordCloud?: WordCloudMarkStyle;
  };
  /** G6 element styles stay separate from G2 marks and cannot disable required elements. */
  node?: G6NodeVisualStyle;
  edge?: G6EdgeVisualStyle;
  table?: TableComponentStyle;
  summary?: SummaryComponentStyle;
}

export type { SummaryStyle, TableStyle };
