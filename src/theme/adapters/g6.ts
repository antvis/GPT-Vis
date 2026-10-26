import type { PluginOptions } from '@antv/g6';
import type { ThemeSeedTokens, ThemeStyle, VisualizationTheme } from '../../types';
import type { ThemeContext, TitleStyle } from '../shared';
import { definedObject } from '../shared';

export const createG6Appearance = (context: ThemeContext, title?: string, subtitle?: string) => {
  const style = context.style;
  const titleStyle = { subtitleFill: context.values.textSecondary, ...style.title };
  return {
    baseTheme: context.baseTheme,
    colors: context.colors,
    backgroundColor: context.backgroundColor,
    rendererTheme: getG6Theme(context.baseTheme),
    node: adaptG6ElementStyle('node', {}, style.node),
    edge: adaptG6ElementStyle('edge', {}, style.edge),
    padding: getG6TitlePadding(title, subtitle, titleStyle),
    plugins: adaptG6Title(title, subtitle, titleStyle, {
      titleFill: context.baseTheme === 'dark' ? '#e0e6ed' : '#000',
      titleFontFamily: 'sans-serif',
    }),
    texture: 'texture' in context.style ? context.style.texture : undefined,
  };
};

type G6BuiltInTheme = 'light' | 'dark';

/** Map GPT-Vis themes to the built-in themes that G6 actually registers. */
const getG6Theme = (theme: VisualizationTheme): G6BuiltInTheme =>
  theme === 'dark' ? 'dark' : 'light';

type G6TokenStyle = Pick<ThemeStyle, 'node' | 'edge'>;

/** Expand seed tokens into G6 node and edge element styles. */
export const expandG6Tokens = (tokens: ThemeSeedTokens): G6TokenStyle => ({
  node: definedObject({
    stroke: tokens.colorStroke,
    lineWidth: tokens.lineWidth,
    radius: tokens.radius,
    labelFill: tokens.colorText,
    labelFontFamily: tokens.fontFamily,
    labelFontSize: tokens.fontSize,
    labelFontWeight: tokens.fontWeight,
  }),
  edge: definedObject({
    stroke: tokens.colorStroke,
    lineWidth: tokens.lineWidth,
    labelFill: tokens.colorTextSecondary,
    labelFontFamily: tokens.fontFamily,
    labelFontSize: tokens.fontSize,
    labelFontWeight: tokens.fontWeight,
  }),
});

type G6ElementKind = 'node' | 'edge';

const TITLE_STYLE_KEYS = [
  'align',
  'spacing',
  'titleFill',
  'titleFillOpacity',
  'titleFontFamily',
  'titleFontSize',
  'titleFontWeight',
  'subtitleFill',
  'subtitleFillOpacity',
  'subtitleFontFamily',
  'subtitleFontSize',
  'subtitleFontWeight',
] as const;

const ELEMENT_STYLE_KEYS: Record<G6ElementKind, readonly string[]> = {
  node: [
    'type',
    'fill',
    'fillOpacity',
    'stroke',
    'strokeOpacity',
    'lineWidth',
    'lineDash',
    'opacity',
    'shadowColor',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'radius',
    'labelFill',
    'labelFontFamily',
    'labelFontSize',
    'labelFontWeight',
  ],
  edge: [
    'type',
    'stroke',
    'strokeOpacity',
    'lineWidth',
    'lineDash',
    'opacity',
    'shadowColor',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'radius',
    'labelFill',
    'labelFontFamily',
    'labelFontSize',
    'labelFontWeight',
  ],
};

const pickStyle = (value: object | undefined, keys: readonly string[]): Record<string, any> => {
  if (!value) return {};
  const source = value as Record<string, unknown>;
  return Object.fromEntries(
    keys.flatMap((key) => (source[key] === undefined ? [] : [[key, source[key]]])),
  );
};

/** Separate G6's element type from a field-level filtered visual style. */
const adaptG6ElementStyle = (
  kind: G6ElementKind,
  defaults: Record<string, any> = {},
  style?: object,
): { type: string | undefined; style: Record<string, any> } => {
  const { type, ...visualStyle }: Record<string, unknown> = {
    ...defaults,
    ...pickStyle(style, ELEMENT_STYLE_KEYS[kind]),
  };
  return { type: type as string | undefined, style: visualStyle };
};

const getG6TitleContentHeight = (subtitle: string | undefined, style?: TitleStyle): number => {
  // Reserve font leading as well as glyph height. G6's title plugin defaults
  // to 16px/12px text and an 8px gap between the two lines.
  const titleHeight = Math.ceil((style?.titleFontSize ?? 16) * 1.2);
  const subtitleHeight = subtitle
    ? (style?.spacing ?? 8) + Math.ceil((style?.subtitleFontSize ?? 12) * 1.2)
    : 0;
  return titleHeight + subtitleHeight;
};

/** Build the G6 title plugin list from supported ThemeSpec title fields. */
const adaptG6Title = (
  title: string | undefined,
  subtitle: string | undefined,
  style?: TitleStyle,
  defaults: Record<string, unknown> = {},
): PluginOptions => {
  if (!title) return [];
  const titleStyle = { ...defaults, ...pickStyle(style, TITLE_STYLE_KEYS) };
  return [
    {
      key: 'title',
      type: 'title',
      title,
      subtitle,
      ...titleStyle,
      // G6 uses a separate canvas for this plugin; graph padding alone does
      // not resize it. Retain the engine's 44px minimum content area.
      size: Math.max(44, getG6TitleContentHeight(subtitle, titleStyle)),
    },
  ];
};

/** Reserve graph space for the resolved title typography without exposing layout controls. */
const getG6TitlePadding = (
  title: string | undefined,
  subtitle: string | undefined,
  style?: TitleStyle,
): number | [number, number, number, number] => {
  if (!title) return 20;
  const contentHeight = getG6TitleContentHeight(subtitle, style);
  // Match the plugin's 16px top padding and leave 8px before the graph.
  return [Math.max(46, Math.ceil(contentHeight + 24)), 20, 20, 20];
};

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
