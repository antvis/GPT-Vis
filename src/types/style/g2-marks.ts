import type { FontWeight, ShapeStyle } from './common';

/**
 * Shapes registered by the installed G2 runtime. Chart-specific style types
 * narrow this registry to the shapes that are safe for that composition.
 */
export const G2_BUILT_IN_MARK_SHAPES = {
  line: ['line', 'smooth', 'hv', 'vh', 'hvh', 'trail'],
  area: ['area', 'smooth', 'hv', 'vh', 'hvh'],
  point: [
    'point',
    'hollow',
    'circle',
    'hollowCircle',
    'square',
    'hollowSquare',
    'diamond',
    'hollowDiamond',
    'triangle',
    'hollowTriangle',
    'triangleDown',
    'hollowTriangleDown',
    'hexagon',
    'hollowHexagon',
    'bowtie',
    'hollowBowtie',
    'cross',
    'plus',
    'hyphen',
    'line',
    'tick',
  ],
  interval: ['rect', 'hollow', 'funnel', 'pyramid'],
  box: ['box', 'violin'],
  text: ['text', 'badge', 'tag'],
  path: ['path', 'hollow'],
  density: ['density'],
  link: ['link', 'smooth', 'arc', 'vhv'],
  connector: ['connector'],
} as const;

export const GPT_VIS_LIQUID_SHAPES = ['circle', 'rect', 'pin', 'triangle'] as const;

export type G2MarkShape<T extends keyof typeof G2_BUILT_IN_MARK_SHAPES> =
  (typeof G2_BUILT_IN_MARK_SHAPES)[T][number];
export type LiquidShape = (typeof GPT_VIS_LIQUID_SHAPES)[number];

/** High-frequency visual effects shared by GPT-Vis G2 marks. */
export type G2MarkStyle = Pick<
  ShapeStyle,
  | 'fillOpacity'
  | 'strokeOpacity'
  | 'lineWidth'
  | 'lineDash'
  | 'opacity'
  | 'shadowColor'
  | 'shadowBlur'
  | 'shadowOffsetX'
  | 'shadowOffsetY'
>;

type StrokedMarkStyle = G2MarkStyle & Pick<ShapeStyle, 'stroke'>;

export interface LineMarkStyle extends G2MarkStyle {
  shape?: G2MarkShape<'line'>;
  lineCap?: 'butt' | 'round' | 'square';
  lineJoin?: 'bevel' | 'round' | 'miter';
}

/** Area boundaries support the same curve shapes as the area mark itself. */
export interface AreaLineMarkStyle extends Omit<LineMarkStyle, 'shape'> {
  shape?: G2MarkShape<'area'>;
}

export interface AreaMarkStyle extends G2MarkStyle {
  shape?: G2MarkShape<'area'>;
}

export interface PointMarkStyle extends StrokedMarkStyle {
  /** Forwarded to G2's constant `encode.shape` channel by the chart adapter. */
  shape?: G2MarkShape<'point'>;
  /** Forwarded to G2's constant `encode.size` channel by the chart adapter. */
  size?: number;
}

export interface IntervalMarkStyle extends StrokedMarkStyle {
  shape?: G2MarkShape<'interval'>;
  radius?: number;
  radiusTopLeft?: number;
  radiusTopRight?: number;
  radiusBottomLeft?: number;
  radiusBottomRight?: number;
}

export interface RectIntervalMarkStyle extends Omit<IntervalMarkStyle, 'shape'> {
  shape?: 'rect' | 'hollow';
}

export interface FunnelIntervalMarkStyle extends Omit<IntervalMarkStyle, 'shape'> {
  shape?: 'funnel';
}

export interface BoxMarkStyle extends StrokedMarkStyle {
  shape?: G2MarkShape<'box'>;
}

export interface BoxplotBoxMarkStyle extends Omit<BoxMarkStyle, 'shape'> {
  shape?: 'box';
}

/**
 * Boxplot outliers are emitted by G2's composite mark. The composite forwards
 * visual point styles, but does not expose independent shape or size encodes.
 */
export type BoxplotPointMarkStyle = StrokedMarkStyle;

export interface ViolinBoxMarkStyle extends Omit<BoxMarkStyle, 'shape'> {
  shape?: 'violin';
}

export interface PathMarkStyle extends StrokedMarkStyle {
  shape?: G2MarkShape<'path'>;
}

export interface DensityMarkStyle extends StrokedMarkStyle {}

export interface LinkMarkStyle extends StrokedMarkStyle {
  shape?: G2MarkShape<'link'>;
}

export interface ConnectorMarkStyle extends StrokedMarkStyle {
  endMarker?: boolean;
  endMarkerSize?: number;
  endMarkerFill?: string;
  endMarkerFillOpacity?: number;
}

export interface LiquidMarkStyle extends G2MarkStyle {
  shape?: LiquidShape;
  contentFill?: string;
  contentStroke?: string;
  contentStrokeOpacity?: number;
  contentLineWidth?: number;
  contentFontFamily?: string;
  contentFontSize?: number;
  contentFontWeight?: FontWeight;
  backgroundFill?: string;
  backgroundFillOpacity?: number;
  backgroundStroke?: string;
  backgroundStrokeOpacity?: number;
  backgroundLineWidth?: number;
  outlineBorder?: number;
  outlineStroke?: string;
  outlineStrokeOpacity?: number;
}

/** Style forwarded to the rect mark produced by G2's Treemap composition. */
export interface TreemapMarkStyle extends StrokedMarkStyle {
  radius?: number;
}

/** Typography that can be shared by WordCloud layout and rendering safely. */
export interface WordCloudMarkStyle {
  fontFamily?: string;
  opacity?: number;
  fillOpacity?: number;
  strokeOpacity?: number;
}

/**
 * G2 Sankey is a composite mark. Its public style names are prefixed because
 * G2 expands them into node polygon, link ribbon and label child marks.
 */
export interface SankeyMarkStyle {
  nodeFillOpacity?: number;
  nodeStroke?: string;
  nodeStrokeOpacity?: number;
  nodeLineWidth?: number;
  linkFillOpacity?: number;
  linkStroke?: string;
  linkStrokeOpacity?: number;
  linkLineWidth?: number;
  labelFill?: string;
  labelFillOpacity?: number;
  labelFontFamily?: string;
  labelFontSize?: number;
  labelFontWeight?: FontWeight;
}
