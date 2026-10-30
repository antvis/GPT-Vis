import type { Theme } from '@antv/g2';
import type { ChartType, ThemeStyle, ThemeTokens, VisualizationTheme } from '../types';
import { CHART_FONT_FAMILY, CHART_STYLE_DEFAULTS, getChartVisualTokens } from '../util/tokens';
import { mergeTheme } from './merge';
import { resolveTheme } from './resolve';
import {
  ACADEMY_COLOR_PALETTE,
  DEFAULT_COLOR_PALETTE,
  normalizePalette,
  pickStyle,
} from './shared';

const createTheme = (type: 'light' | 'dark' | 'academy'): Theme => {
  const tokens = getChartVisualTokens(type);
  const isDark = type === 'dark';
  const isAcademy = type === 'academy';
  const colors = isAcademy ? ACADEMY_COLOR_PALETTE : DEFAULT_COLOR_PALETTE;

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
      labelAutoRotate: { optionalAngles: [0, 45, 90], recoverWhenFailed: true },
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
      gridFilter: (_: unknown, index: number) => index !== 0,
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
  };
};

const TITLE_KEYS = [
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
];
const AXIS_KEYS = [
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
];
const LEGEND_KEYS = [
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
];
const LABEL_KEYS = [
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
];
const MARK_PAINT_KEYS = [
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

const MARK_KEYS = {
  line: [...MARK_PAINT_KEYS, 'shape', 'lineCap', 'lineJoin'],
  area: [...MARK_PAINT_KEYS, 'shape'],
  point: [...MARK_PAINT_KEYS, 'shape', 'size', 'stroke'],
  interval: [
    ...MARK_PAINT_KEYS,
    'shape',
    'stroke',
    'radius',
    'radiusTopLeft',
    'radiusTopRight',
    'radiusBottomLeft',
    'radiusBottomRight',
  ],
  box: [...MARK_PAINT_KEYS, 'shape', 'stroke'],
  path: [...MARK_PAINT_KEYS, 'shape', 'stroke'],
  density: [...MARK_PAINT_KEYS, 'stroke'],
  link: [...MARK_PAINT_KEYS, 'shape', 'stroke'],
  connector: [
    ...MARK_PAINT_KEYS,
    'stroke',
    'endMarker',
    'endMarkerSize',
    'endMarkerFill',
    'endMarkerFillOpacity',
  ],
};

const COMPOSITE_KEYS = {
  liquid: [
    ...MARK_PAINT_KEYS,
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
  treemap: [...MARK_PAINT_KEYS, 'stroke', 'radius'],
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

const expandTokens = (t: ThemeTokens): ThemeStyle => ({
  axis: {
    lineStroke: t.colorStroke,
    tickStroke: t.colorStroke,
    gridStroke: t.colorStroke,
    lineLineWidth: t.lineWidth,
    tickLineWidth: t.lineWidth,
    gridLineWidth: t.lineWidth,
    labelFill: t.colorTextSecondary,
    titleFill: t.colorTextSecondary,
    labelFontFamily: t.fontFamily,
    titleFontFamily: t.fontFamily,
    labelFontSize: t.fontSize,
    titleFontSize: t.fontSize,
    labelFontWeight: t.fontWeight,
    titleFontWeight: t.fontWeight,
    labelSpacing: t.spacingSmall,
    titleSpacing: t.spacingMedium,
  },
  legend: {
    titleFill: t.colorText,
    itemLabelFill: t.colorText,
    titleFontFamily: t.fontFamily,
    itemLabelFontFamily: t.fontFamily,
    titleFontSize: t.fontSize,
    itemLabelFontSize: t.fontSize,
    titleFontWeight: t.fontWeight,
    itemLabelFontWeight: t.fontWeight,
    itemLabelLineHeight: t.lineHeight,
    titleSpacing: t.spacingSmall,
    itemSpacing: t.spacingSmall,
    rowPadding: t.spacingSmall,
    colPadding: t.spacingMedium,
  },
  label: {
    fontFamily: t.fontFamily,
    fontSize: t.fontSize,
    fontWeight: t.fontWeight,
    lineHeight: t.lineHeight,
  },
  mark: {
    line: { lineWidth: t.lineWidth },
    point: { lineWidth: t.lineWidth },
    interval: { lineWidth: t.lineWidth, radius: t.radius },
    box: { lineWidth: t.lineWidth },
    connector: { lineWidth: t.lineWidth },
    path: { lineWidth: t.lineWidth },
    density: { lineWidth: t.lineWidth },
    link: { lineWidth: t.lineWidth },
    treemap: { lineWidth: t.lineWidth, radius: t.radius },
    liquid: {
      contentFill: t.colorText,
      contentFontFamily: t.fontFamily,
      contentFontWeight: t.fontWeight,
      backgroundFill: t.colorSurface,
      backgroundStroke: t.colorStroke,
      outlineStroke: t.colorDefault,
    },
    sankey: {
      nodeStroke: t.colorStroke,
      nodeLineWidth: t.lineWidth,
      linkStroke: t.colorStroke,
      linkLineWidth: t.lineWidth,
      labelFill: t.colorText,
      labelFontFamily: t.fontFamily,
      labelFontSize: t.fontSize,
      labelFontWeight: t.fontWeight,
    },
    wordCloud: { fontFamily: t.fontFamily },
  },
});

/** Resolve appearance once. Data, label content, visibility and layout stay in the chart. */
export function getThemeObject(
  type: ChartType,
  theme?: VisualizationTheme,
  localStyle?: ThemeStyle,
): {
  theme: Theme & { type: 'light' | 'dark' | 'academy' };
  mark: Record<keyof NonNullable<ThemeStyle['mark']>, Record<string, any>>;
  tokens: ThemeTokens;
} {
  const { baseTheme, tokens, styles } = resolveTheme(type, theme, localStyle);
  // Existing Line/Area/Radar shorthand is normalized before higher-priority styles merge.
  const layers = styles.map((layer) =>
    ['line', 'area', 'radar'].includes(type) && layer?.lineWidth !== undefined
      ? mergeTheme(layer, {
          mark: { line: { lineWidth: layer.mark?.line?.lineWidth ?? layer.lineWidth } },
        })
      : layer,
  );
  const style = mergeTheme(expandTokens(tokens), ...layers) as ThemeStyle;
  const values = getChartVisualTokens(baseTheme);
  const colors = normalizePalette(
    style.palette?.length
      ? style.palette
      : type === 'waterfall'
        ? ['#FF4D4F', '#2EBB59', '#1783FF']
        : undefined,
    baseTheme,
  );
  if (type === 'dual-axes' && style.palette) {
    colors.push(
      ...normalizePalette(undefined, baseTheme).filter((color) => !colors.includes(color)),
    );
  }
  const backgroundColor = style.backgroundColor || values.background;
  const mark = {} as Record<
    keyof typeof MARK_KEYS | keyof typeof COMPOSITE_KEYS,
    Record<string, any>
  >;
  for (const [name, keys] of Object.entries({ ...MARK_KEYS, ...COMPOSITE_KEYS })) {
    const kind = name as keyof typeof MARK_KEYS | keyof typeof COMPOSITE_KEYS;
    mark[kind] = pickStyle(style.mark?.[kind], keys);
  }
  const axisStyle = pickStyle(style.axis, AXIS_KEYS);
  const titleStyle = pickStyle(style.title, TITLE_KEYS);
  const legendStyle = pickStyle(style.legend, LEGEND_KEYS);
  const labelStyle = pickStyle(style.label, LABEL_KEYS);
  const { axis: axisDefaults, ...builtInTheme } = createTheme(baseTheme);
  const rendererTheme: Theme = mergeTheme(builtInTheme, {
    color: colors[0],
    category10: colors,
    category20: colors,
    view: { viewFill: backgroundColor },
    tooltip: {
      markerStroke: backgroundColor,
      crosshairsStroke: tokens.colorTextSecondary ?? values.textSecondary,
    },
    title: titleStyle,
    axis: axisStyle,
    axisX: { ...axisDefaults, ...builtInTheme.axisX, ...axisStyle },
    axisY: { ...axisDefaults, ...builtInTheme.axisY, ...axisStyle },
    axisRadar: axisStyle,
    legendCategory: legendStyle,
    label: { fill: tokens.colorText ?? values.textPrimary, ...labelStyle },
    innerLabel: { fill: tokens.colorTextInverse ?? values.textInverse, ...labelStyle },
  });
  // Tooltips are existing renderer components; token expansion does not add interactions.
  const css = rendererTheme.tooltip!.css as Record<string, Record<string, string>>;
  css['.g2-tooltip'] = mergeTheme(css['.g2-tooltip'], {
    'background-color': tokens.colorSurface,
    color: tokens.colorTextSecondary ?? tokens.colorText,
    border:
      tokens.colorStroke === undefined && tokens.lineWidth === undefined
        ? undefined
        : `${tokens.lineWidth ?? 1}px solid ${tokens.colorStroke ?? values.tooltipBorder}`,
    'border-radius': tokens.radius === undefined ? undefined : `${tokens.radius}px`,
    'font-family': tokens.fontFamily,
    'font-size': tokens.fontSize === undefined ? undefined : `${tokens.fontSize}px`,
    'font-weight': tokens.fontWeight === undefined ? undefined : String(tokens.fontWeight),
    'line-height': tokens.lineHeight === undefined ? undefined : `${tokens.lineHeight}px`,
    padding:
      tokens.spacingSmall === undefined && tokens.spacingMedium === undefined
        ? undefined
        : `${tokens.spacingSmall ?? 10}px ${tokens.spacingMedium ?? 12}px`,
  });
  for (const name of [
    '.g2-tooltip-title',
    '.g2-tooltip-list-item-name',
    '.g2-tooltip-list-item-name-label',
  ]) {
    if (tokens.fontSize !== undefined && name === '.g2-tooltip-title')
      css[name]['font-size'] = `${tokens.fontSize}px`;
    if (tokens.lineHeight !== undefined && name === '.g2-tooltip-title')
      css[name]['line-height'] = `${tokens.lineHeight}px`;
    if (tokens.colorTextSecondary ?? tokens.colorText)
      css[name].color = tokens.colorTextSecondary ?? tokens.colorText!;
  }
  if (tokens.colorText !== undefined) css['.g2-tooltip-list-item-value'].color = tokens.colorText;
  if (tokens.colorStroke !== undefined || tokens.lineWidth !== undefined)
    css['.g2-tooltip-title']['border-bottom'] =
      `${tokens.lineWidth ?? 1}px solid ${tokens.colorStroke ?? values.tooltipDivider}`;
  if (tokens.lineHeight !== undefined)
    css['.g2-tooltip-list-item']['line-height'] = `${tokens.lineHeight}px`;
  if (tokens.colorSurface !== undefined)
    css['.g2-tooltip-list-item-marker']['box-shadow'] = `0 0 0 2px ${tokens.colorSurface}`;
  return { theme: { ...rendererTheme, type: baseTheme }, mark, tokens };
}
