export type FontWeight = number | 'normal' | 'bold';

/** Optional enhancement marks can be disabled with `false`. */
export type MarkStyleValue<T> = false | T;

/** Renderer-neutral paint properties shared by G2 marks and G6 elements. */
export interface ShapeStyle {
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeOpacity?: number;
  lineWidth?: number;
  lineDash?: number[];
  lineDashOffset?: number;
  opacity?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  cursor?: string;
}

/** High-frequency text properties shared by components and text marks. */
export interface TextStyle extends ShapeStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: 'normal' | 'italic';
  lineHeight?: number;
  textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
  textBaseline?: 'top' | 'middle' | 'bottom';
}
