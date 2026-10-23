import type { FontWeight, TextStyle } from './common';

/** Visual overrides for the chart title block. Title content remains in chart config. */
export interface TitleStyle {
  align?: 'left' | 'center' | 'right';
  spacing?: number;
  titleFill?: string;
  titleFillOpacity?: number;
  titleFontFamily?: string;
  titleFontSize?: number;
  titleFontWeight?: FontWeight;
  subtitleFill?: string;
  subtitleFillOpacity?: number;
  subtitleFontFamily?: string;
  subtitleFontSize?: number;
  subtitleFontWeight?: FontWeight;
}

/** High-frequency G2 axis component styles. */
export interface AxisStyle {
  line?: boolean;
  lineStroke?: string;
  lineStrokeOpacity?: number;
  lineLineWidth?: number;
  lineLineDash?: number[];
  tick?: boolean;
  tickStroke?: string;
  tickStrokeOpacity?: number;
  tickOpacity?: number;
  tickLineWidth?: number;
  tickLength?: number;
  grid?: boolean;
  gridStroke?: string;
  gridStrokeOpacity?: number;
  gridLineWidth?: number;
  gridLineDash?: number[];
  labelFill?: string;
  labelFillOpacity?: number;
  labelOpacity?: number;
  labelFontFamily?: string;
  labelFontSize?: number;
  labelFontWeight?: FontWeight;
  labelSpacing?: number;
  titleFill?: string;
  titleFillOpacity?: number;
  titleOpacity?: number;
  titleFontFamily?: string;
  titleFontSize?: number;
  titleFontWeight?: FontWeight;
  titleSpacing?: number;
}

export interface LegendStyle {
  titleFill?: string;
  titleFillOpacity?: number;
  titleFontFamily?: string;
  titleFontSize?: number;
  titleFontWeight?: FontWeight;
  titleSpacing?: number;
  itemLabelFill?: string;
  itemLabelFillOpacity?: number;
  itemLabelFontFamily?: string;
  itemLabelFontSize?: number;
  itemLabelFontWeight?: FontWeight;
  itemLabelLineHeight?: number;
  itemLabelLetterSpacing?: number;
  itemSpacing?: number | number[];
  itemMarkerSize?: number;
  itemMarkerFillOpacity?: number;
  itemMarkerStroke?: string;
  itemMarkerStrokeOpacity?: number;
  itemMarkerLineWidth?: number;
  rowPadding?: number;
  colPadding?: number;
}

/**
 * Visual label overrides only. Label placement belongs to each chart's stable
 * composition and is intentionally not part of the theme surface.
 */
export type LabelStyle = Pick<
  TextStyle,
  | 'fill'
  | 'fillOpacity'
  | 'stroke'
  | 'strokeOpacity'
  | 'lineWidth'
  | 'opacity'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'fontStyle'
  | 'lineHeight'
>;

/** Common chart-level style overrides shared by G2 and G6 visualizations. */
export interface BaseChartStyle {
  backgroundColor?: string;
  palette?: string[];
  title?: TitleStyle;
}

export interface CartesianChartStyle extends BaseChartStyle {
  axis?: AxisStyle;
  legend?: LegendStyle;
}
