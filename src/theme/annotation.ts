import type { ChartType, ThemeStyle, VisualizationTheme } from '../types';
import { CHART_FONT_FAMILY, CHART_STYLE_DEFAULTS, getChartVisualTokens } from '../util/tokens';
import type { getThemeObject } from './g2';
import { mergeTheme } from './merge';
import { resolveTheme } from './resolve';
import { normalizePalette } from './shared';

const pointPulse = {
  duration: 1800,
  startScale: 1.5,
  endScale: 3,
  staticScale: 2.2,
  opacity: 0.32,
  lineWidth: 1,
};

const connector = {
  offset: 24,
  extension: 4,
  curveRatio: 0.12,
  maxCurveHeight: 40,
  arrowSize: 9,
};

const highlight = { dimOpacity: 0.5, lineWidth: 2 };

/** Internal label appearances; public overrides live in each annotation's style. */
function getLabelStyles({
  surface,
  border,
  accent,
  text,
  fontWeight,
  radius,
}: {
  surface: string;
  border: string;
  accent: string;
  text: string;
  fontWeight: number | 'normal' | 'bold';
  radius: number;
}) {
  const base = {
    fill: text,
    background: surface,
    backgroundOpacity: 1,
    border: 'none',
    borderOpacity: 1,
    padding: [3, 6],
    radius: Math.min(radius, 4),
    maxWidth: 200,
    gap: 8,
    fontWeight,
  };
  return {
    path: { ...base, padding: [2, 4], backgroundOpacity: 0.94 },
    range: { ...base, border: accent, borderOpacity: 0.3, backgroundOpacity: 0.94 },
    connector: { ...base, padding: [3, 6], fontWeight: 500 },
    point: { ...base, border, padding: [8, 10], radius, maxWidth: 220, gap: 12, fontWeight: 500 },
    text: { ...base, background: 'none', padding: [0, 0], maxWidth: 260, gap: 0 },
    highlight: { ...base, border, padding: [4, 7], gap: 10 },
  };
}

/** Graph and DOM annotations follow their chart's theme and local styles. */
export function getAnnotationDefaults(
  type: ChartType,
  theme?: VisualizationTheme,
  localStyle?: ThemeStyle,
) {
  const { baseTheme, tokens, styles } = resolveTheme(type, theme, localStyle);
  const style = mergeTheme({}, ...styles) as ThemeStyle;
  const visual = getChartVisualTokens(baseTheme);
  const palette = normalizePalette(style.palette, baseTheme);
  const stroke = palette[0];
  const labelFill = (style.label?.fill ?? tokens.colorText ?? visual.textPrimary) as string;
  const fontWeight = (style.label?.fontWeight ?? tokens.fontWeight ?? 400) as
    number | 'normal' | 'bold';
  return {
    stroke,
    pointStroke: (style.mark?.point?.stroke ??
      style.backgroundColor ??
      visual.background) as string,
    lineWidth: {
      path: (style.mark?.line?.lineWidth ?? tokens.lineWidth ?? 1.5) as number,
      connector: (style.mark?.connector?.lineWidth ?? tokens.lineWidth ?? 2) as number,
      point: (style.mark?.point?.lineWidth ?? tokens.lineWidth ?? 1.5) as number,
    },
    size: (style.mark?.point?.size ?? CHART_STYLE_DEFAULTS.scatterPointSize) as number,
    shape: (style.mark?.point?.shape ?? 'point') as string,
    pulse: pointPulse,
    connector,
    labelFill,
    fontFamily: (style.label?.fontFamily ?? tokens.fontFamily ?? CHART_FONT_FAMILY) as string,
    labelFontSize: (style.label?.fontSize ?? tokens.fontSize ?? 12) as number,
    fontWeight,
    labels: getLabelStyles({
      surface: tokens.colorSurface ?? style.backgroundColor ?? visual.tooltipBackground,
      border: tokens.colorStroke ?? visual.tooltipBorder,
      accent: stroke,
      text: labelFill,
      fontWeight,
      radius: tokens.radius ?? 6,
    }),
    highlight: {
      ...highlight,
      color: palette[1] ?? stroke,
      fillOpacity: 0.16,
      dimOpacity: type === 'table' || type === 'summary' ? 1 : highlight.dimOpacity,
      background: style.backgroundColor ?? visual.background,
      labelBackground: visual.tooltipBackground,
      labelBorder: visual.tooltipBorder,
      labelGap: 16,
    },
  };
}

/** Annotation defaults follow the resolved chart theme. */
export function getAnnotationStyle({ theme, mark }: ReturnType<typeof getThemeObject>) {
  const shape = (mark.point.shape ?? 'point') as string;
  const palette = theme.category10 as string[];
  const visual = getChartVisualTokens(theme.type);
  const tooltip = (theme.tooltip?.css as Record<string, Record<string, unknown>>)['.g2-tooltip'];
  return {
    palette,
    directions: {
      up: theme.type === 'dark' ? '#4ade80' : '#16a34a',
      down: theme.type === 'dark' ? '#f87171' : '#dc2626',
    },
    stroke: palette[0],
    pointStroke: (mark.point.stroke ?? theme.view!.viewFill) as string,
    lineWidth: {
      path: (mark.line.lineWidth ??
        theme.line?.line?.lineWidth ??
        CHART_STYLE_DEFAULTS.lineWidth) as number,
      range: (mark.interval.lineWidth ?? theme.interval?.rect?.lineWidth ?? 1.5) as number,
      connector: (mark.connector.lineWidth ?? theme.connector?.connector?.lineWidth ?? 2) as number,
      point: (mark.point.lineWidth ??
        theme.point?.[shape]?.lineWidth ??
        theme.point?.point?.lineWidth ??
        CHART_STYLE_DEFAULTS.pointLineWidth) as number,
    },
    fillOpacity: 0.12,
    size: (mark.point.size ?? CHART_STYLE_DEFAULTS.scatterPointSize) as number,
    shape,
    pulse: pointPulse,
    connector,
    highlight: { ...highlight, color: palette[1] ?? palette[0] },
    fontFamily: (theme.label?.fontFamily ??
      theme.axis?.labelFontFamily ??
      CHART_FONT_FAMILY) as string,
    labelFontSize: (theme.label?.fontSize ?? theme.axis?.labelFontSize ?? 12) as number,
    labels: getLabelStyles({
      surface: (tooltip['background-color'] ?? visual.tooltipBackground) as string,
      border: (theme.axis?.lineStroke ?? visual.tooltipBorder) as string,
      accent: palette[0],
      text: theme.label?.fill as string,
      fontWeight: (theme.label?.fontWeight ?? 400) as number | 'normal' | 'bold',
      radius: Number.parseFloat(String(tooltip['border-radius'] ?? 6)),
    }),
  };
}
