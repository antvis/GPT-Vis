import type { ChartType, ThemeStyle, VisualizationTheme } from '../types';
import { getChartVisualTokens } from '../util/tokens';
import { mergeTheme } from './merge';
import { resolveTheme } from './resolve';
import { normalizePalette, pickStyle } from './shared';

const ELEMENT_KEYS = [
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
];
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

export function getThemeObject(
  type: ChartType,
  theme?: VisualizationTheme,
  localStyle?: ThemeStyle,
) {
  const { baseTheme, tokens: t, styles } = resolveTheme(type, theme, localStyle);
  const text = {
    labelFontFamily: t.fontFamily,
    labelFontSize: t.fontSize,
    labelFontWeight: t.fontWeight,
  };
  const paint = { stroke: t.colorStroke, lineWidth: t.lineWidth, radius: t.radius };
  const style = mergeTheme(
    {
      node: { ...paint, ...text, labelFill: t.colorText },
      edge: {
        stroke: t.colorStroke,
        lineWidth: t.lineWidth,
        ...text,
        labelFill: t.colorTextSecondary,
      },
    },
    ...styles,
  ) as ThemeStyle;
  // Keep branch/category fills and hierarchy contrast unless explicitly overridden.
  const nodeStyle = pickStyle(style.node, [...ELEMENT_KEYS, 'fill', 'fillOpacity']);
  const edgeStyle = pickStyle(style.edge, ELEMENT_KEYS);
  const nodeType = style.node?.type;
  const edgeType = style.edge?.type;
  const values = getChartVisualTokens(baseTheme);
  const colors = normalizePalette(style.palette, baseTheme);
  const backgroundColor = style.backgroundColor || values.background;
  return {
    baseTheme,
    theme: baseTheme === 'dark' ? ('dark' as const) : ('light' as const),
    colors,
    backgroundColor,
    annotation: {
      accent: colors[0],
      node: {
        halo: true,
        haloLineWidth: 12,
        haloStrokeOpacity: 0.18,
        haloFillOpacity: 0,
        lineWidth: t.lineWidth ?? 3.5,
      },
      edge: {
        halo: true,
        haloLineWidth: 7,
        haloStrokeOpacity: 0.1,
        haloFillOpacity: 0,
        lineWidth: t.lineWidth ?? 2.5,
      },
      label: {
        fill: nodeStyle.labelFill ?? (baseTheme === 'dark' ? '#e0e0e0' : '#333'),
        fontFamily: nodeStyle.labelFontFamily,
        fontSize: nodeStyle.labelFontSize ?? 12,
        fontWeight: nodeStyle.labelFontWeight ?? 500,
        lineHeight: t.lineHeight,
        padding: [t.spacingSmall ?? 7, t.spacingMedium ?? 10],
        wordWrap: true,
        wordWrapWidth: 156,
        maxLines: 8,
        background: true,
        backgroundFill: t.colorSurface ?? backgroundColor,
        backgroundStroke: t.colorStroke,
        backgroundLineWidth: t.lineWidth ?? 1,
        backgroundOpacity: 1,
        backgroundRadius: t.radius ?? 5,
      },
      leader: { lineWidth: t.lineWidth ?? 1, strokeOpacity: 0.65, fill: 'none' },
    },
    node: {
      type:
        type === 'network-graph' &&
        ['circle', 'diamond', 'ellipse', 'hexagon', 'rect', 'star', 'triangle'].includes(
          String(nodeType),
        )
          ? String(nodeType)
          : undefined,
      style: nodeStyle,
    },
    edge: {
      type:
        type === 'network-graph' &&
        ['line', 'polyline', 'quadratic', 'cubic'].includes(String(edgeType))
          ? String(edgeType)
          : undefined,
      style: edgeStyle,
    },
    titleStyle: {
      titleFill: baseTheme === 'dark' ? '#e0e6ed' : '#000',
      titleFontFamily: 'sans-serif',
      subtitleFill: values.textSecondary,
      ...pickStyle(style.title, TITLE_KEYS),
    },
    tooltipStyle: pickStyle({
      background: t.colorSurface,
      color: t.colorText,
      borderColor: t.colorStroke,
      borderWidth: t.lineWidth === undefined ? undefined : `${t.lineWidth}px`,
      borderRadius: t.radius === undefined ? undefined : `${t.radius}px`,
      fontFamily: t.fontFamily,
      fontSize: t.fontSize === undefined ? undefined : `${t.fontSize}px`,
      fontWeight: t.fontWeight,
      lineHeight: t.lineHeight === undefined ? undefined : `${t.lineHeight}px`,
      padding:
        t.spacingSmall === undefined && t.spacingMedium === undefined
          ? undefined
          : `${t.spacingSmall ?? 8}px ${t.spacingMedium ?? 10}px`,
    }),
    texture: style.texture,
  };
}
