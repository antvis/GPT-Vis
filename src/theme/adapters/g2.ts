import type { Theme } from '@antv/g2';
import type { ThemeSeedTokens, ThemeStyle, VisualizationTheme } from '../../types';
import type { ThemeContext, TitleStyle } from '../shared';
import {
  ACADEMY_COLOR_PALETTE,
  CHART_FONT_FAMILY,
  CHART_STYLE_DEFAULTS,
  DEFAULT_COLOR_PALETTE,
  definedObject,
  getBuiltInThemeValues,
  normalizePalette,
} from '../shared';

/** Chart-owned defaults and content; theme styles are applied after these. */
export interface G2AppearanceDefaults {
  axis?: Omit<G2CartesianAxisOptions, 'style'>;
  legend?: { visible: boolean; title?: string };
  labels?: Omit<G2DataLabelOptions, 'tokens'>;
}

export const createG2Appearance = (
  context: ThemeContext,
  defaults: G2AppearanceDefaults = {},
  title?: string,
  subtitle?: string,
) => {
  const { baseTheme, tokens, values } = context;
  const chartDefaults = getMarkDefaults(context, defaults);
  const style = context.style;
  let colors = context.colors;
  if (context.type === 'waterfall') {
    colors = [
      style.palette?.[0] || '#FF4D4F',
      style.palette?.[1] || '#2EBB59',
      style.palette?.[2] || '#1783FF',
    ];
  } else if (context.type === 'dual-axes' && style.palette) {
    colors = [
      ...colors,
      ...normalizePalette(undefined, baseTheme).filter((color) => !colors.includes(color)),
    ];
  }
  const labelTokens = {
    colorText: tokens.colorText ?? values.textPrimary,
    colorTextInverse: tokens.colorTextInverse ?? values.textInverse,
  };
  const mark = {} as Record<
    G2MarkKind | G2CompositeStyleKind,
    { encode: Record<string, unknown>; style: Record<string, any> }
  >;
  for (const kind of Object.keys(G2_MARK_STYLE_KEYS) as G2MarkKind[]) {
    mark[kind] = adaptG2MarkStyle(kind, chartDefaults[kind], style.mark?.[kind]);
  }
  for (const kind of Object.keys(G2_COMPOSITE_STYLE_KEYS) as G2CompositeStyleKind[]) {
    mark[kind] = {
      encode: {},
      style: adaptG2CompositeStyle(kind, {}, style.mark?.[kind]),
    };
  }
  return {
    baseTheme,
    backgroundColor: context.backgroundColor,
    colors,
    values,
    labelTokens,
    rendererTheme: getG2Theme(baseTheme),
    mark,
    title: adaptG2Title(title, subtitle, style.title),
    axis: adaptG2CartesianAxis({ ...defaults.axis, style: style.axis }),
    legend: adaptG2ColorLegend(
      defaults.legend?.visible ?? false,
      style.legend,
      defaults.legend?.title,
    ),
    labels: defaults.labels
      ? adaptG2DataLabels({
          ...defaults.labels,
          style: { ...defaults.labels.style, ...style.label },
          tokens: labelTokens,
        })
      : undefined,
    axisStyle: pickStyle(style.axis, AXIS_STYLE_KEYS),
    viewStyle: style.backgroundColor ? { viewFill: style.backgroundColor } : undefined,
  };
};

type G2ThemeType = 'light' | 'dark' | 'academy';

type G2ThemeConfig = Theme & {
  enter?: { duration?: number; easing?: string };
  elementHighlightByColor?: Record<string, unknown>;
  elementHoverScale?: Record<string, unknown>;
};

const filterBaselineGrid = (_: unknown, index: number): boolean => index !== 0;

const createG2Theme = (type: G2ThemeType): G2ThemeConfig => {
  const tokens = getBuiltInThemeValues(type);
  const isDark = type === 'dark';
  const isAcademy = type === 'academy';
  const colors = [...(isAcademy ? ACADEMY_COLOR_PALETTE : DEFAULT_COLOR_PALETTE)];

  return {
    type,
    color: colors[0],
    category10: colors,
    category20: colors,
    view: {
      viewFill: tokens.background,
      plotFill: 'transparent',
      mainFill: 'transparent',
      contentFill: 'transparent',
    },
    interval: {
      rect: {
        fillOpacity: 0.96,
      },
    },
    line: {
      line: {
        lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
      },
    },
    area: {
      area: {
        fillOpacity: CHART_STYLE_DEFAULTS.areaOpacity,
      },
    },
    point: {
      point: {
        lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
        fillOpacity: 0.82,
      },
      hollow: {
        lineWidth: 2,
        strokeOpacity: 1,
      },
    },
    enter: {
      duration: CHART_STYLE_DEFAULTS.animationDuration,
      easing: 'ease-out',
    },
    axis: {
      labelAutoHide: { keepHeader: true, keepTail: true },
      titleOpacity: 1,
      titleFillOpacity: 1,
      labelOpacity: 1,
      labelFillOpacity: 1,
      line: true,
      lineLineWidth: 1,
      lineStroke: tokens.axisLine,
      lineStrokeOpacity: 1,
      tick: true,
      tickLineWidth: 1,
      tickStroke: tokens.axisTick,
      tickStrokeOpacity: 1,
      ...(isAcademy
        ? {
            titleFill: '#000000',
            titleStrokeOpacity: 1,
            titleFontSize: 11,
            titleFontWeight: 'bold',
            titleSpacing: 12,
            labelFill: '#000000',
            labelStrokeOpacity: 1,
            labelFontSize: 10,
            labelFontWeight: 'normal',
            labelSpacing: 4,
            tickLength: 5,
          }
        : {
            titleFill: tokens.textSecondary,
            titleFontFamily: CHART_FONT_FAMILY,
            titleFontSize: 12,
            titleFontWeight: 500,
            titleLineWidth: 0,
            titleSpacing: 16,
            labelFill: tokens.textSecondary,
            labelFontFamily: CHART_FONT_FAMILY,
            labelFontSize: 12,
            labelFontWeight: 400,
            labelLineWidth: 0,
            labelSpacing: 6,
            tickLength: 3,
            tickOpacity: 1,
          }),
    },
    axisX: {
      grid: isAcademy,
      labelAutoRotate: {
        optionalAngles: [0, 45, 90],
        recoverWhenFailed: true,
      },
      ...(isAcademy
        ? {
            gridStroke: tokens.axisGrid,
            gridStrokeOpacity: 1,
            gridLineWidth: 1,
            gridLineDash: [0, 0],
          }
        : {}),
    },
    axisY: {
      lineLineWidth: 1,
      grid: true,
      gridStroke: tokens.axisGrid,
      gridStrokeOpacity: 1,
      gridLineWidth: isAcademy ? 1 : 0.75,
      gridLineDash: isAcademy ? [0, 0] : [3, 3],
      gridFilter: filterBaselineGrid,
    },
    axisRadar: {
      zIndex: 1,
      titleFill: isAcademy ? tokens.textPrimary : tokens.textSecondary,
      titleFontFamily: CHART_FONT_FAMILY,
      titleFontSize: isAcademy ? 10 : 12,
      titleFontWeight: isAcademy ? 600 : 500,
      titleSpacing: 10,
      labelFill: tokens.textSecondary,
      labelOpacity: 1,
      labelFontFamily: CHART_FONT_FAMILY,
      labelFontSize: isAcademy ? 10 : 11,
      line: true,
      lineStroke: tokens.axisLine,
      lineStrokeOpacity: isAcademy ? 1 : 0.64,
      lineLineWidth: isAcademy ? 1 : 0.75,
      tick: true,
      tickLength: isAcademy ? 4 : 2,
      tickStroke: tokens.axisTick,
      tickStrokeOpacity: isAcademy ? 1 : 0.68,
      tickCount: 4,
      gridStroke: tokens.axisGrid,
      gridStrokeOpacity: isAcademy ? 1 : 0.9,
      gridLineWidth: isAcademy ? 1 : 0.75,
      gridLineDash: [0, 0],
    },
    title: {
      spacing: 6,
      titleFill: tokens.textPrimary,
      titleFontSize: 16,
      titleFontWeight: 600,
      subtitleFill: tokens.textSecondary,
      subtitleFontSize: 12,
      subtitleFontWeight: 400,
    },
    legendCategory: {
      backgroundFill: 'transparent',
      padding: [5, 0, 10, 0],
      itemMarkerSize: 10,
      itemMarkerFillOpacity: 0.92,
      itemMarkerStrokeOpacity: 0.92,
      itemLabelFill: tokens.textPrimary,
      itemLabelFillOpacity: 0.78,
      itemLabelFontFamily: CHART_FONT_FAMILY,
      itemLabelFontSize: 12,
      itemLabelFontWeight: 400,
      itemLabelLineHeight: 16,
      itemLabelLetterSpacing: 0.1,
      itemLabelTextBaseline: 'middle',
      itemSpacing: [8, 0, 0],
      itemCursor: 'pointer',
      rowPadding: 8,
      colPadding: 22,
      navButtonFill: tokens.textSecondary,
      navButtonFillOpacity: 0.72,
      navButtonSize: 9,
      navPageNumFill: tokens.textSecondary,
      navPageNumFillOpacity: 0.72,
      navPageNumFontFamily: CHART_FONT_FAMILY,
      navPageNumFontSize: 11,
      navPageNumFontWeight: 400,
      navControllerPadding: 4,
      navControllerSpacing: 14,
    },
    tooltip: {
      shared: false,
      series: false,
      crosshairs: false,
      marker: true,
      markerR: 4,
      markerLineWidth: 2,
      markerStroke: tokens.background,
      crosshairsStroke: tokens.textSecondary,
      crosshairsStrokeOpacity: 0.18,
      crosshairsLineWidth: 1,
      crosshairsLineDash: [0, 0],
      css: {
        '.g2-tooltip': {
          'background-color': tokens.tooltipBackground,
          border: `1px solid ${tokens.tooltipBorder}`,
          'border-radius': '10px',
          'box-shadow': tokens.tooltipShadow,
          color: tokens.textSecondary,
          padding: '10px 12px',
          'min-width': '164px',
          'max-width': '300px',
          overflow: 'hidden',
          'box-sizing': 'border-box',
          'backdrop-filter': 'blur(10px) saturate(1.08)',
          '-webkit-backdrop-filter': 'blur(10px) saturate(1.08)',
          'font-family': CHART_FONT_FAMILY,
          'font-size': '12px',
          'line-height': '18px',
          'font-variant-numeric': 'tabular-nums',
          'font-feature-settings': '"tnum" 1, "zero" 1',
          '-webkit-font-smoothing': 'antialiased',
          contain: 'layout paint style',
        },
        '.g2-tooltip-title': {
          color: tokens.textSecondary,
          'font-size': '11px',
          'font-weight': '500',
          'line-height': '16px',
          'letter-spacing': '0.01em',
          'margin-bottom': '6px',
          'padding-bottom': '7px',
          'border-bottom': `1px solid ${tokens.tooltipDivider}`,
          'max-width': '276px',
        },
        '.g2-tooltip-list': {
          display: 'grid',
          gap: '4px',
        },
        '.g2-tooltip-list-item': {
          display: 'grid',
          'grid-template-columns': 'minmax(0, 1fr) auto',
          'align-items': 'center',
          'column-gap': '18px',
          'min-height': '22px',
          'line-height': '22px',
        },
        '.g2-tooltip-list-item-name': {
          gap: '8px',
          'min-width': '0',
          'max-width': '208px',
          overflow: 'hidden',
          color: tokens.textSecondary,
        },
        '.g2-tooltip-list-item-name-label': {
          color: tokens.textSecondary,
          'font-weight': '400',
        },
        '.g2-tooltip-list-item-value': {
          color: tokens.textPrimary,
          'font-weight': '600',
          flex: '0 0 auto',
          'min-width': '40px',
          'margin-left': '0',
          'text-align': 'right',
          'letter-spacing': '-0.01em',
          'font-variant-numeric': 'tabular-nums',
          'font-feature-settings': '"tnum" 1, "zero" 1',
        },
        '.g2-tooltip-list-item-marker': {
          width: '7px',
          height: '7px',
          flex: '0 0 auto',
          'margin-right': '0',
          'border-radius': '999px',
          'box-shadow': tokens.tooltipMarkerShadow,
        },
        '.g2-tooltip-crosshair-x': {
          'background-color': isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(71, 84, 103, 0.16)',
        },
        '.g2-tooltip-crosshair-y': {
          'background-color': isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(71, 84, 103, 0.16)',
        },
      },
    },
    elementHighlight: {
      delay: CHART_STYLE_DEFAULTS.interactionDelay,
    },
    elementHighlightByColor: {
      delay: CHART_STYLE_DEFAULTS.interactionDelay,
    },
    elementHoverScale: {
      delay: CHART_STYLE_DEFAULTS.interactionDelay,
      scale: 1.04,
      shadow: true,
      shadowBlur: isDark ? 7 : isAcademy ? 5 : 6,
      shadowColor: isDark
        ? 'rgba(226, 232, 240, 0.38)'
        : isAcademy
          ? 'rgba(63, 49, 38, 0.44)'
          : 'rgba(15, 23, 42, 0.46)',
      shadowOffsetX: 0,
      shadowOffsetY: isDark ? 0 : 3,
      zIndex: 10,
    },
  };
};

const LIGHT_THEME = createG2Theme('light');
const ACADEMY_THEME = createG2Theme('academy');
const DARK_THEME = createG2Theme('dark');

const THEME_MAP: Record<VisualizationTheme, G2ThemeConfig> = {
  default: LIGHT_THEME,
  light: LIGHT_THEME,
  academy: ACADEMY_THEME,
  dark: DARK_THEME,
};

const getG2Theme = (theme: VisualizationTheme): G2ThemeConfig =>
  THEME_MAP[theme] || THEME_MAP.default;

type G2TokenStyle = Pick<ThemeStyle, 'axis' | 'legend' | 'label' | 'mark'>;

const resolveAxis = (tokens: ThemeSeedTokens): Record<string, unknown> | undefined =>
  definedObject({
    lineStroke: tokens.colorStroke,
    lineLineWidth: tokens.lineWidth,
    tickStroke: tokens.colorStroke,
    tickLineWidth: tokens.lineWidth,
    gridStroke: tokens.colorStroke,
    gridLineWidth: tokens.lineWidth,
    labelFill: tokens.colorTextSecondary,
    labelFontFamily: tokens.fontFamily,
    labelFontSize: tokens.fontSize,
    labelFontWeight: tokens.fontWeight,
    labelSpacing: tokens.spacingSmall,
    titleFill: tokens.colorTextSecondary,
    titleFontFamily: tokens.fontFamily,
    titleFontSize: tokens.fontSize,
    titleFontWeight: tokens.fontWeight,
    titleSpacing: tokens.spacingMedium,
  });

const resolveLegend = (tokens: ThemeSeedTokens): Record<string, unknown> | undefined =>
  definedObject({
    titleFill: tokens.colorText,
    titleFontFamily: tokens.fontFamily,
    titleFontSize: tokens.fontSize,
    titleFontWeight: tokens.fontWeight,
    titleSpacing: tokens.spacingSmall,
    itemLabelFill: tokens.colorText,
    itemLabelFontFamily: tokens.fontFamily,
    itemLabelFontSize: tokens.fontSize,
    itemLabelFontWeight: tokens.fontWeight,
    itemLabelLineHeight: tokens.lineHeight,
    itemSpacing: tokens.spacingSmall,
    rowPadding: tokens.spacingSmall,
    colPadding: tokens.spacingMedium,
  });

const resolveLabel = (tokens: ThemeSeedTokens): Record<string, unknown> | undefined =>
  definedObject({
    fontFamily: tokens.fontFamily,
    fontSize: tokens.fontSize,
    fontWeight: tokens.fontWeight,
    lineHeight: tokens.lineHeight,
  });

/** Expand seed tokens into G2 components and marks only. */
export const expandG2Tokens = (tokens: ThemeSeedTokens): G2TokenStyle => {
  const lineStyle = definedObject({ lineWidth: tokens.lineWidth });
  const sankeyStyle = definedObject({
    nodeStroke: tokens.colorStroke,
    nodeLineWidth: tokens.lineWidth,
    linkStroke: tokens.colorStroke,
    linkLineWidth: tokens.lineWidth,
    labelFill: tokens.colorText,
    labelFontFamily: tokens.fontFamily,
    labelFontSize: tokens.fontSize,
    labelFontWeight: tokens.fontWeight,
  });

  return {
    axis: resolveAxis(tokens),
    legend: resolveLegend(tokens),
    label: resolveLabel(tokens),
    mark: definedObject({
      line: lineStyle,
      point: lineStyle,
      interval: definedObject({ lineWidth: tokens.lineWidth, radius: tokens.radius }),
      box: lineStyle,
      connector: lineStyle,
      path: lineStyle,
      density: lineStyle,
      link: lineStyle,
      treemap: definedObject({ lineWidth: tokens.lineWidth, radius: tokens.radius }),
      liquid: definedObject({
        contentFill: tokens.colorText,
        contentFontFamily: tokens.fontFamily,
        contentFontWeight: tokens.fontWeight,
        backgroundFill: tokens.colorSurface,
        backgroundStroke: tokens.colorStroke,
        outlineStroke: tokens.colorDefault,
      }),
      sankey: sankeyStyle,
      wordCloud: definedObject({ fontFamily: tokens.fontFamily }),
    }),
  };
};

type G2MarkKind =
  'line' | 'area' | 'point' | 'interval' | 'box' | 'path' | 'density' | 'link' | 'connector';

type G2CompositeStyleKind = 'liquid' | 'treemap' | 'wordCloud' | 'sankey';

type G2CartesianAxisOptions = {
  axisXTitle?: string | false;
  axisYTitle?: string | false;
  defaults?: Partial<Record<'x' | 'y', Record<string, unknown>>>;
  style?: Record<string, unknown>;
};

type G2DataLabelOptions = {
  style?: Record<string, unknown>;
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

/** Filter public mark styles and move G2 encode channels out of the style object. */
const adaptG2MarkStyle = (kind: G2MarkKind, defaults: Record<string, any> = {}, style?: object) => {
  const overrides = pickStyle(style, G2_MARK_STYLE_KEYS[kind]);
  const merged = { ...defaults, ...overrides };
  // G2's individual corners take precedence over radius. An authored radius
  // must replace chart-owned corner defaults, while explicit corners still win.
  if (kind === 'interval' && overrides.radius !== undefined) {
    for (const corner of [
      'radiusTopLeft',
      'radiusTopRight',
      'radiusBottomLeft',
      'radiusBottomRight',
    ]) {
      if (overrides[corner] === undefined) delete merged[corner];
    }
  }
  const { shape, size, ...markStyle } = merged;
  return {
    encode: compact({ shape, size }),
    style: markStyle,
  };
};

/** Filter styles for G2 composite marks whose public options remain in `style`. */
const adaptG2CompositeStyle = (
  kind: G2CompositeStyleKind,
  defaults: Record<string, any> = {},
  style?: object,
): Record<string, any> => ({
  ...defaults,
  ...pickStyle(style, G2_COMPOSITE_STYLE_KEYS[kind]),
});

/** Attach title text to the supported GPT-Vis title appearance properties. */
const adaptG2Title = (
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
const adaptG2CartesianAxis = ({
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
const adaptG2ColorLegend = (
  visible: boolean,
  style?: Record<string, unknown>,
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
const adaptG2DataLabels = ({
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

/** Renderer defaults are kept with the G2 mapping, rather than repeated by charts. */
const getMarkDefaults = (
  context: ThemeContext,
  defaults: G2AppearanceDefaults,
): Partial<Record<G2MarkKind, Record<string, any>>> => {
  const { baseTheme, colors, backgroundColor, values: tokens } = context;
  const style = context.style;
  switch (context.type) {
    case 'area':
      return {
        area: { fillOpacity: CHART_STYLE_DEFAULTS.areaOpacity },
        line: {
          lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
          strokeOpacity: CHART_STYLE_DEFAULTS.lineOpacity,
          shape: style.mark?.area?.shape,
        },
        point: {
          shape: 'point',
          size: CHART_STYLE_DEFAULTS.pointSize,
          lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
          stroke: backgroundColor,
        },
      };
    case 'bar':
      return {
        interval: {
          ...(baseTheme !== 'academy' ? { radius: 4 } : {}),
          columnWidthRatio: CHART_STYLE_DEFAULTS.intervalWidthRatio,
          ...(!defaults.legend?.visible ? { fill: colors[0] } : {}),
        },
      };
    case 'column':
      return {
        interval: {
          ...(baseTheme !== 'academy' ? { radiusTopLeft: 4, radiusTopRight: 4 } : {}),
          columnWidthRatio: CHART_STYLE_DEFAULTS.intervalWidthRatio,
          ...(!defaults.legend?.visible ? { fill: colors[0] } : {}),
        },
      };
    case 'dual-axes':
      return {
        interval: {
          fillOpacity: 0.86,
          columnWidthRatio: CHART_STYLE_DEFAULTS.intervalWidthRatio,
          ...(baseTheme !== 'academy' ? { radiusTopLeft: 4, radiusTopRight: 4 } : {}),
        },
        line: {
          shape: 'smooth',
          lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
          lineCap: 'round',
          lineJoin: 'round',
        },
      };
    case 'funnel':
      return {
        interval: {
          shape: 'funnel',
          fillOpacity: 0.94,
          stroke: tokens.separator,
          lineWidth: 2,
          ...(baseTheme === 'academy' ? {} : { radius: 4 }),
        },
        connector: {
          stroke: tokens.axisLine,
          strokeOpacity: baseTheme === 'academy' ? 1 : 0.82,
          lineWidth: baseTheme === 'academy' ? 1 : 0.75,
          endMarker: false,
          connectLength1: -12,
        },
      };
    case 'histogram':
      return { interval: { minHeight: 1, columnWidthRatio: 1, inset: 0.5 } };
    case 'line':
      return {
        line: {
          lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
          lineCap: 'round',
          lineJoin: 'round',
        },
        point: {
          shape: 'point',
          size: CHART_STYLE_DEFAULTS.pointSize,
          lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
          stroke: backgroundColor,
        },
      };
    case 'pie':
      return { interval: { fillOpacity: 1, stroke: tokens.separator, lineWidth: 2 } };
    case 'radar':
      return {
        line: {
          lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
          lineCap: 'round',
          lineJoin: 'round',
          strokeOpacity: CHART_STYLE_DEFAULTS.lineOpacity,
        },
      };
    case 'scatter':
      return {
        point: {
          shape: 'point',
          size: CHART_STYLE_DEFAULTS.scatterPointSize,
          lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
          fillOpacity: 0.88,
          stroke: backgroundColor,
        },
      };
    case 'violin':
      return { box: { shape: 'violin', opacity: 0.5, strokeOpacity: 0.5 } };
    case 'waterfall':
      return {
        interval: {
          maxWidth: 60,
          stroke: '#666',
          ...(baseTheme !== 'academy' ? { radius: 4 } : {}),
        },
        link: { stroke: '#ccc', lineDash: [4, 2], lineWidth: 1 },
      };
    default:
      return {};
  }
};

/** Native shape catalog used by internal compatibility checks. */
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
