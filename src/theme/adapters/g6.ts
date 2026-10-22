import type { PluginOptions } from '@antv/g6';
import type { G6ChartType, ThemeChartConfig, ThemeInput, TitleStyle } from '../../types';
import type { ResolvedChartTheme } from '../../types/theme';
import { getBuiltInThemeValues, getG6Theme } from '../builtins';
import { resolveChartTheme, resolveTheme } from '../resolve';

export type G6ChartTheme<T extends G6ChartType> = ResolvedChartTheme<T> & {
  rendererTheme: ReturnType<typeof getG6Theme>;
};

export type G6ElementKind = 'node' | 'edge';

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
export const adaptG6ElementStyle = (
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
export const adaptG6Title = (
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
export const getG6TitlePadding = (
  title: string | undefined,
  subtitle: string | undefined,
  style?: TitleStyle,
): number | [number, number, number, number] => {
  if (!title) return 20;
  const contentHeight = getG6TitleContentHeight(subtitle, style);
  // Match the plugin's 16px top padding and leave 8px before the graph.
  return [Math.max(46, Math.ceil(contentHeight + 24)), 20, 20, 20];
};

/** Resolve GPT-Vis theme input and attach the G6 theme consumed by the renderer. */
export const resolveG6ChartTheme = <T extends G6ChartType>(
  type: T,
  theme: ThemeInput | undefined,
  override?: ThemeChartConfig<T>,
): G6ChartTheme<T> => {
  const resolved = resolveChartTheme(resolveTheme(theme), type, override);
  resolved.style.title = {
    subtitleFill: getBuiltInThemeValues(resolved.baseTheme).textSecondary,
    ...resolved.style.title,
  };
  return {
    ...resolved,
    rendererTheme: getG6Theme(resolved.baseTheme),
  };
};
