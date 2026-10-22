import type {
  AxisStyle,
  G2ChartType,
  LabelStyle,
  LegendStyle,
  ThemeChartConfig,
  ThemeInput,
  ThemeSeedTokens,
  TitleStyle,
} from '../../types';
import type { ResolvedChartTheme } from '../../types/theme';
import { getBuiltInThemeValues, getG2Theme } from '../builtins';
import { resolveChartTheme, resolveTheme } from '../resolve';

export type G2ChartTheme<T extends G2ChartType> = ResolvedChartTheme<T> & {
  labelTokens: Required<Pick<ThemeSeedTokens, 'colorText' | 'colorTextInverse'>>;
  rendererTheme: ReturnType<typeof getG2Theme>;
};

export type G2MarkKind =
  'line' | 'area' | 'point' | 'interval' | 'box' | 'path' | 'density' | 'link' | 'connector';

export type G2CompositeStyleKind = 'liquid' | 'treemap' | 'wordCloud' | 'sankey';

export type G2CartesianAxisOptions = {
  axisXTitle?: string | false;
  axisYTitle?: string | false;
  defaults?: Partial<Record<'x' | 'y', Record<string, unknown>>>;
  style?: AxisStyle;
};

export type G2DataLabelOptions = {
  style?: LabelStyle;
  visible?: boolean;
  defaultVisible?: boolean;
  text: unknown;
  position?: string;
  contrast?: 'inside' | 'outside';
  tokens?: Pick<ThemeSeedTokens, 'colorText' | 'colorTextInverse'>;
  dx?: number;
  dy?: number;
  transform?: Record<string, unknown>[];
  formatter?: string;
};

const COMMON_MARK_STYLE_KEYS = [
  'fillOpacity',
  'strokeOpacity',
  'lineWidth',
  'lineDash',
  'opacity',
  'shadowColor',
  'shadowBlur',
  'shadowOffsetX',
  'shadowOffsetY',
] as const;

const G2_MARK_STYLE_KEYS: Record<G2MarkKind, readonly string[]> = {
  line: [...COMMON_MARK_STYLE_KEYS, 'shape', 'lineCap', 'lineJoin'],
  area: [...COMMON_MARK_STYLE_KEYS, 'shape'],
  point: [...COMMON_MARK_STYLE_KEYS, 'shape', 'size', 'stroke'],
  interval: [
    ...COMMON_MARK_STYLE_KEYS,
    'shape',
    'stroke',
    'radius',
    'radiusTopLeft',
    'radiusTopRight',
    'radiusBottomLeft',
    'radiusBottomRight',
  ],
  box: [...COMMON_MARK_STYLE_KEYS, 'shape', 'stroke'],
  path: [...COMMON_MARK_STYLE_KEYS, 'shape', 'stroke'],
  density: [...COMMON_MARK_STYLE_KEYS, 'stroke'],
  link: [...COMMON_MARK_STYLE_KEYS, 'shape', 'stroke'],
  connector: [
    ...COMMON_MARK_STYLE_KEYS,
    'stroke',
    'endMarker',
    'endMarkerSize',
    'endMarkerFill',
    'endMarkerFillOpacity',
  ],
};

const G2_COMPOSITE_STYLE_KEYS: Record<G2CompositeStyleKind, readonly string[]> = {
  liquid: [
    ...COMMON_MARK_STYLE_KEYS,
    'shape',
    'contentFill',
    'contentStroke',
    'contentStrokeOpacity',
    'contentLineWidth',
    'contentFontFamily',
    'contentFontSize',
    'contentFontWeight',
    'backgroundFill',
    'backgroundFillOpacity',
    'backgroundStroke',
    'backgroundStrokeOpacity',
    'backgroundLineWidth',
    'outlineBorder',
    'outlineStroke',
    'outlineStrokeOpacity',
  ],
  treemap: [...COMMON_MARK_STYLE_KEYS, 'stroke', 'radius'],
  wordCloud: ['fontFamily', 'opacity', 'fillOpacity', 'strokeOpacity'],
  sankey: [
    'nodeFillOpacity',
    'nodeStroke',
    'nodeStrokeOpacity',
    'nodeLineWidth',
    'linkFillOpacity',
    'linkStroke',
    'linkStrokeOpacity',
    'linkLineWidth',
    'labelFill',
    'labelFillOpacity',
    'labelFontFamily',
    'labelFontSize',
    'labelFontWeight',
  ],
};

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

const AXIS_STYLE_KEYS = [
  'line',
  'lineStroke',
  'lineStrokeOpacity',
  'lineLineWidth',
  'lineLineDash',
  'tick',
  'tickStroke',
  'tickStrokeOpacity',
  'tickOpacity',
  'tickLineWidth',
  'tickLength',
  'grid',
  'gridStroke',
  'gridStrokeOpacity',
  'gridLineWidth',
  'gridLineDash',
  'labelFill',
  'labelFillOpacity',
  'labelOpacity',
  'labelFontFamily',
  'labelFontSize',
  'labelFontWeight',
  'labelSpacing',
  'titleFill',
  'titleFillOpacity',
  'titleOpacity',
  'titleFontFamily',
  'titleFontSize',
  'titleFontWeight',
  'titleSpacing',
] as const;

const LEGEND_STYLE_KEYS = [
  'titleFill',
  'titleFillOpacity',
  'titleFontFamily',
  'titleFontSize',
  'titleFontWeight',
  'titleSpacing',
  'itemLabelFill',
  'itemLabelFillOpacity',
  'itemLabelFontFamily',
  'itemLabelFontSize',
  'itemLabelFontWeight',
  'itemLabelLineHeight',
  'itemLabelLetterSpacing',
  'itemSpacing',
  'itemMarkerSize',
  'itemMarkerFillOpacity',
  'itemMarkerStroke',
  'itemMarkerStrokeOpacity',
  'itemMarkerLineWidth',
  'rowPadding',
  'colPadding',
] as const;

const LABEL_STYLE_KEYS = [
  'fill',
  'fillOpacity',
  'stroke',
  'strokeOpacity',
  'lineWidth',
  'opacity',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'lineHeight',
] as const;

const compact = (value: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined));

const pickStyle = (value: object | undefined, keys: readonly string[]): Record<string, any> => {
  if (!value) return {};
  const source = value as Record<string, unknown>;
  return Object.fromEntries(
    keys.flatMap((key) => (source[key] === undefined ? [] : [[key, source[key]]])),
  );
};

/** Resolve GPT-Vis theme input and attach the G2 theme consumed by the renderer. */
export const resolveG2ChartTheme = <T extends G2ChartType>(
  type: T,
  theme: ThemeInput | undefined,
  override?: ThemeChartConfig<T>,
): G2ChartTheme<T> => {
  const resolved = resolveChartTheme(resolveTheme(theme), type, override);
  const builtInValues = getBuiltInThemeValues(resolved.baseTheme);
  return {
    ...resolved,
    labelTokens: {
      colorText: resolved.tokens.colorText ?? builtInValues.textPrimary,
      colorTextInverse: resolved.tokens.colorTextInverse ?? builtInValues.textInverse,
    },
    rendererTheme: getG2Theme(resolved.baseTheme),
  };
};

/** Filter public mark styles and move G2 encode channels out of the style object. */
export const adaptG2MarkStyle = (
  kind: G2MarkKind,
  defaults: Record<string, any> = {},
  style?: object,
) => {
  const merged = { ...defaults, ...pickStyle(style, G2_MARK_STYLE_KEYS[kind]) };
  const { shape, size, ...markStyle } = merged;
  return {
    encode: compact({ shape, size }),
    style: markStyle,
  };
};

/** Filter styles for G2 composite marks whose public options remain in `style`. */
export const adaptG2CompositeStyle = (
  kind: G2CompositeStyleKind,
  defaults: Record<string, any> = {},
  style?: object,
): Record<string, any> => ({
  ...defaults,
  ...pickStyle(style, G2_COMPOSITE_STYLE_KEYS[kind]),
});

/** Attach title text to the supported GPT-Vis title appearance properties. */
export const adaptG2Title = (
  title: string | undefined,
  subtitle: string | undefined,
  style?: TitleStyle,
): string | Record<string, unknown> => {
  if (!title) return '';
  const titleStyle = pickStyle(style, TITLE_STYLE_KEYS);
  if (!subtitle && Object.keys(titleStyle).length === 0) return title;
  return compact({ title, subtitle, ...titleStyle });
};

/** Apply one shared visual axis style to both Cartesian axes. */
export const adaptG2CartesianAxis = ({
  axisXTitle,
  axisYTitle,
  defaults,
  style,
}: G2CartesianAxisOptions): Record<'x' | 'y', Record<string, unknown>> => {
  const axisStyle = pickStyle(style, AXIS_STYLE_KEYS);
  return {
    x: { ...defaults?.x, title: axisXTitle || false, ...axisStyle },
    y: { ...defaults?.y, title: axisYTitle || false, ...axisStyle },
  };
};

/** Convert the shared legend contract into G2's color legend namespace. */
export const adaptG2ColorLegend = (
  visible: boolean,
  style?: LegendStyle,
  title?: string,
): false | { color: Record<string, unknown> } => {
  if (!visible) return false;
  return {
    color: compact({
      ...pickStyle(style, LEGEND_STYLE_KEYS),
      title,
    }),
  };
};

/** Build a fixed-position G2 label while filtering unsupported generated fields. */
export const adaptG2DataLabels = ({
  style,
  visible,
  defaultVisible = false,
  text,
  position,
  contrast,
  tokens,
  dx,
  dy,
  transform,
  formatter,
}: G2DataLabelOptions): Record<string, unknown>[] | undefined => {
  if (visible === false) return [];
  if (visible !== true && !defaultVisible) return undefined;

  const labelStyle = pickStyle(style, LABEL_STYLE_KEYS);
  const hasExplicitFill = labelStyle.fill !== undefined;
  const automaticFill =
    contrast === 'inside'
      ? (tokens?.colorTextInverse ?? tokens?.colorText)
      : contrast === 'outside'
        ? tokens?.colorText
        : undefined;
  const automaticContrast =
    contrast === 'inside' &&
    !hasExplicitFill &&
    tokens?.colorText !== undefined &&
    tokens.colorTextInverse !== undefined
      ? [
          {
            type: 'contrastReverse',
            palette: [tokens.colorText, tokens.colorTextInverse],
          },
        ]
      : [];
  const transforms = [...automaticContrast, ...(transform ?? [])];

  return [
    compact({
      text,
      position,
      dx,
      dy,
      transform: transforms.length > 0 ? transforms : undefined,
      formatter,
      ...(!hasExplicitFill && automaticFill !== undefined ? { fill: automaticFill } : {}),
      ...labelStyle,
    }),
  ];
};
