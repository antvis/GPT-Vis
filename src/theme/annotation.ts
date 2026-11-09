import type { ChartType, ThemeStyle, VisualizationTheme } from '../types';
import { CHART_FONT_FAMILY, CHART_STYLE_DEFAULTS, getChartVisualTokens } from '../util/tokens';
import type { getThemeObject } from './g2';
import { mergeTheme } from './merge';
import { resolveTheme } from './resolve';
import { normalizePalette } from './shared';

/** Internal label appearances; public annotation options stay flat. */
function getLabelStyles({
  surface,
  border,
  accent,
  text,
  inverse,
  fontWeight,
  radius,
}: {
  surface: string;
  border: string;
  accent: string;
  text: string;
  inverse: string;
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
    line: { ...base, padding: [2, 4], backgroundOpacity: 0.94 },
    range: { ...base, border: accent, borderOpacity: 0.3, backgroundOpacity: 0.94 },
    connector: { ...base, fill: inverse, background: accent, padding: [4, 7], fontWeight: 600 },
    point: { ...base, border, padding: [8, 10], radius, maxWidth: 220, gap: 12, fontWeight: 500 },
    text: { ...base, background: 'none', padding: [0, 0], maxWidth: 260, gap: 0 },
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
  const stroke = normalizePalette(style.palette, baseTheme)[0];
  const labelFill = String(style.label?.fill ?? tokens.colorText ?? visual.textPrimary);
  const fontWeight = (style.label?.fontWeight ?? tokens.fontWeight ?? 400) as
    number | 'normal' | 'bold';
  return {
    stroke,
    lineWidth: {
      line: Number(style.mark?.line?.lineWidth ?? tokens.lineWidth ?? 1.5),
      connector: Number(style.mark?.connector?.lineWidth ?? tokens.lineWidth ?? 1.5),
      point: Number(style.mark?.point?.lineWidth ?? tokens.lineWidth ?? 1.5),
    },
    size: Number(style.mark?.point?.size ?? CHART_STYLE_DEFAULTS.scatterPointSize),
    shape: String(style.mark?.point?.shape ?? 'point'),
    labelFill,
    fontFamily: String(style.label?.fontFamily ?? tokens.fontFamily ?? CHART_FONT_FAMILY),
    labelFontSize: Number(style.label?.fontSize ?? tokens.fontSize ?? 12),
    fontWeight,
    labels: getLabelStyles({
      surface: String(tokens.colorSurface ?? style.backgroundColor ?? visual.tooltipBackground),
      border: String(tokens.colorStroke ?? visual.tooltipBorder),
      accent: stroke,
      text: labelFill,
      inverse: String(tokens.colorTextInverse ?? visual.textInverse),
      fontWeight,
      radius: Number(tokens.radius ?? 6),
    }),
    highlight: {
      fillOpacity: 0.16,
      dimOpacity: 1,
      background: String(style.backgroundColor ?? visual.background),
      labelBackground: visual.tooltipBackground,
      labelBorder: visual.tooltipBorder,
      labelPadding: 12,
      labelGap: 16,
      labelWidth: 240,
    },
  };
}

/** Annotation defaults follow the resolved chart theme. */
export function getAnnotationStyle({ theme, mark }: ReturnType<typeof getThemeObject>) {
  const shape = String(mark.point.shape ?? 'point');
  const visual = getChartVisualTokens(theme.type);
  const tooltip = (theme.tooltip?.css as Record<string, Record<string, unknown>>)['.g2-tooltip'];
  return {
    stroke: (theme.category10 as string[])[0],
    lineWidth: {
      line: Number(
        mark.line.lineWidth ?? theme.line?.line?.lineWidth ?? CHART_STYLE_DEFAULTS.lineWidth,
      ),
      range: Number(mark.interval.lineWidth ?? theme.interval?.rect?.lineWidth ?? 1.5),
      connector: Number(mark.connector.lineWidth ?? theme.connector?.connector?.lineWidth ?? 1.5),
      point: Number(
        mark.point.lineWidth ??
          theme.point?.[shape]?.lineWidth ??
          theme.point?.point?.lineWidth ??
          CHART_STYLE_DEFAULTS.pointLineWidth,
      ),
    },
    fillOpacity: 0.12,
    size: Number(mark.point.size ?? CHART_STYLE_DEFAULTS.scatterPointSize),
    shape,
    fontFamily: String(theme.label?.fontFamily ?? theme.axis?.labelFontFamily ?? CHART_FONT_FAMILY),
    labelFontSize: Number(theme.label?.fontSize ?? theme.axis?.labelFontSize ?? 12),
    labels: getLabelStyles({
      surface: String(tooltip['background-color'] ?? visual.tooltipBackground),
      border: String(theme.axis?.lineStroke ?? visual.tooltipBorder),
      accent: (theme.category10 as string[])[0],
      text: theme.label?.fill as string,
      inverse: String(theme.innerLabel?.fill ?? visual.textInverse),
      fontWeight: (theme.label?.fontWeight ?? 400) as number | 'normal' | 'bold',
      radius: Number.parseFloat(String(tooltip['border-radius'] ?? 6)),
    }),
  };
}
