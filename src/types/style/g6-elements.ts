import type { FontWeight, ShapeStyle } from './common';

/** Node types registered by the installed G6 runtime. */
export const G6_BUILT_IN_NODE_TYPES = [
  'circle',
  'diamond',
  'donut',
  'ellipse',
  'hexagon',
  'html',
  'image',
  'rect',
  'star',
  'triangle',
] as const;

/** Edge types registered by the installed G6 runtime. */
export const G6_BUILT_IN_EDGE_TYPES = [
  'line',
  'polyline',
  'quadratic',
  'cubic',
  'cubic-horizontal',
  'cubic-vertical',
  'cubic-radial',
] as const;

/**
 * Data-independent node shapes that GPT-Vis can safely apply to a network
 * graph. HTML, image and donut nodes require content or data not present in a
 * theme, so they remain in the runtime registry but not in the theme API.
 */
export const GPT_VIS_G6_NODE_TYPES = [
  'circle',
  'diamond',
  'ellipse',
  'hexagon',
  'rect',
  'star',
  'triangle',
] as const;

/** Layout-independent edge shapes suitable for GPT-Vis network themes. */
export const GPT_VIS_G6_EDGE_TYPES = ['line', 'polyline', 'quadratic', 'cubic'] as const;

export type G6NodeType = (typeof GPT_VIS_G6_NODE_TYPES)[number];
export type G6EdgeType = (typeof GPT_VIS_G6_EDGE_TYPES)[number];

/** High-frequency G6 node options, using G6's `type` terminology. */
export interface G6NodeStyle extends ShapeStyle {
  type?: G6NodeType;
  radius?: number;
  labelFill?: string;
  labelFontFamily?: string;
  labelFontSize?: number;
  labelFontWeight?: FontWeight;
}

/** High-frequency G6 edge options, using G6's `type` terminology. */
export interface G6EdgeStyle extends ShapeStyle {
  type?: G6EdgeType;
  radius?: number;
  labelFill?: string;
  labelFontFamily?: string;
  labelFontSize?: number;
  labelFontWeight?: FontWeight;
}

export type G6NodeVisualStyle = Omit<G6NodeStyle, 'type'>;
export type G6EdgeVisualStyle = Omit<G6EdgeStyle, 'type'>;
