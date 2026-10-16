import type { MarkStyleValue } from './common';
import type { BaseChartStyle, CartesianChartStyle, LabelStyle, LegendStyle } from './components';
import type {
  AreaLineMarkStyle,
  AreaMarkStyle,
  BoxMarkStyle,
  BoxplotBoxMarkStyle,
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
    point?: MarkStyleValue<PointMarkStyle>;
  };
}

export interface AreaChartStyle extends CartesianChartStyle {
  /** @deprecated Use `mark.line.lineWidth` instead. */
  lineWidth?: number;
  mark?: {
    area?: AreaMarkStyle;
    line?: MarkStyleValue<AreaLineMarkStyle>;
    point?: MarkStyleValue<PointMarkStyle>;
  };
}

export interface IntervalChartStyle extends CartesianChartStyle {
  mark?: {
    interval?: RectIntervalMarkStyle;
  };
}

/** Histogram has axes but intentionally renders no legend. */
export interface HistogramChartStyle extends Omit<CartesianChartStyle, 'legend' | 'label'> {
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
  legend?: false | LegendStyle;
  label?: false | LabelStyle;
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
    interval?: MarkStyleValue<RectIntervalMarkStyle>;
    line?: MarkStyleValue<LineMarkStyle>;
  };
}

export interface BoxplotChartStyle extends CartesianChartStyle {
  mark?: {
    box?: BoxplotBoxMarkStyle;
    point?: MarkStyleValue<PointMarkStyle>;
  };
}

/** Violin renders a density mark plus a box mark with `shape: 'violin'`. */
export interface ViolinChartStyle extends CartesianChartStyle {
  mark?: {
    density?: DensityMarkStyle;
    box?: MarkStyleValue<ViolinBoxMarkStyle>;
  };
}

export interface FunnelChartStyle extends BaseChartStyle {
  label?: false | LabelStyle;
  mark?: {
    interval?: FunnelIntervalMarkStyle;
    connector?: MarkStyleValue<ConnectorMarkStyle>;
  };
}

export interface WaterfallChartStyle extends Omit<CartesianChartStyle, 'legend'> {
  mark?: {
    interval?: RectIntervalMarkStyle;
    link?: MarkStyleValue<LinkMarkStyle>;
  };
}

export interface LiquidChartStyle extends BaseChartStyle {
  label?: false | LabelStyle;
  mark?: {
    liquid?: LiquidMarkStyle;
  };
}

export interface TreemapChartStyle extends BaseChartStyle {
  label?: false | LabelStyle;
  mark?: {
    treemap?: TreemapMarkStyle;
  };
}

/** Venn renders a G2 path mark and labels. */
export interface VennChartStyle extends BaseChartStyle {
  label?: false | LabelStyle;
  mark?: {
    path?: PathMarkStyle;
  };
}

/** Sankey is one G2 composite mark, not a G6 node/edge graph. */
export interface SankeyChartStyle extends BaseChartStyle {
  label?: false | LabelStyle;
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
  label?: false | LabelStyle;
  mark?: {
    node?: G6NodeVisualStyle;
    edge?: G6EdgeVisualStyle;
  };
}

/** Network graph uses G6 built-in elements and can safely vary their shape. */
export interface NetworkGraphChartStyle extends BaseChartStyle {
  label?: false | LabelStyle;
  mark?: {
    node?: G6NodeStyle;
    edge?: G6EdgeStyle;
  };
}

/** Fishbone adds a GPT-Vis rendering texture on top of fixed G6 elements. */
export interface FishboneDiagramChartStyle extends GraphChartStyle {
  texture?: 'rough' | 'default';
}

/** Flow uses a required HTML node and a required polyline edge internally. */
export interface FlowDiagramChartStyle extends BaseChartStyle {
  label?: false | LabelStyle;
  mark?: {
    edge?: G6EdgeVisualStyle;
  };
}

/** IndentedTree uses GPT-Vis custom node and edge implementations. */
export interface IndentedTreeChartStyle extends BaseChartStyle {
  label?: false | LabelStyle;
  mark?: {
    node?: G6NodeVisualStyle;
    edge?: G6EdgeVisualStyle;
  };
}

/** Global style namespace. Chart-specific overrides narrow this capability set. */
export interface ChartStyle extends BaseChartStyle {
  axis?: CartesianChartStyle['axis'];
  legend?: false | LegendStyle;
  label?: false | LabelStyle;
  mark?: {
    line?: MarkStyleValue<AreaLineMarkStyle>;
    area?: MarkStyleValue<AreaMarkStyle>;
    point?: MarkStyleValue<PointMarkStyle>;
    interval?: MarkStyleValue<Omit<IntervalMarkStyle, 'shape'>>;
    box?: MarkStyleValue<Omit<BoxMarkStyle, 'shape'>>;
    connector?: MarkStyleValue<ConnectorMarkStyle>;
    path?: MarkStyleValue<PathMarkStyle>;
    density?: MarkStyleValue<DensityMarkStyle>;
    link?: MarkStyleValue<LinkMarkStyle>;
    liquid?: MarkStyleValue<LiquidMarkStyle>;
    treemap?: MarkStyleValue<TreemapMarkStyle>;
    sankey?: MarkStyleValue<SankeyMarkStyle>;
    wordCloud?: MarkStyleValue<WordCloudMarkStyle>;
    node?: MarkStyleValue<G6NodeVisualStyle>;
    edge?: MarkStyleValue<G6EdgeVisualStyle>;
  };
  table?: TableComponentStyle;
  summary?: SummaryComponentStyle;
}

export type { SummaryStyle, TableStyle };
