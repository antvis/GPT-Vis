import type { ChartType, ThemeStyle, VisualizationTheme } from '../types';
import { CHART_FONT_FAMILY, CHART_STYLE_DEFAULTS, getChartVisualTokens } from '../util/tokens';
import type { getThemeObject } from './g2';
import { mergeTheme } from './merge';
import { resolveTheme } from './resolve';
import { normalizePalette } from './shared';

/** Graph and DOM annotations follow their chart's theme and local styles. */
export function getAnnotationDefaults(
  type: ChartType,
  theme?: VisualizationTheme,
  localStyle?: ThemeStyle,
) {
  const { baseTheme, tokens, styles } = resolveTheme(type, theme, localStyle);
  const style = mergeTheme({}, ...styles) as ThemeStyle;
  const visual = getChartVisualTokens(baseTheme);
  return {
    stroke: normalizePalette(style.palette, baseTheme)[0],
    lineWidth: {
      line: Number(style.mark?.line?.lineWidth ?? tokens.lineWidth ?? 1.5),
      range: Number(style.mark?.interval?.lineWidth ?? tokens.lineWidth ?? 1.5),
      connector: Number(style.mark?.connector?.lineWidth ?? tokens.lineWidth ?? 1.5),
      point: Number(style.mark?.point?.lineWidth ?? tokens.lineWidth ?? 1.5),
    },
    fillOpacity: 0.12,
    size: Number(style.mark?.point?.size ?? CHART_STYLE_DEFAULTS.scatterPointSize),
    shape: String(style.mark?.point?.shape ?? 'point'),
    labelFill: String(style.label?.fill ?? tokens.colorText ?? visual.textPrimary),
    fontFamily: String(style.label?.fontFamily ?? tokens.fontFamily ?? CHART_FONT_FAMILY),
    labelFontSize: Number(style.label?.fontSize ?? tokens.fontSize ?? 12),
    fontWeight: (style.label?.fontWeight ?? tokens.fontWeight ?? 400) as number | 'normal' | 'bold',
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
    labelFill: theme.label?.fill as string,
    fontFamily: String(theme.label?.fontFamily ?? theme.axis?.labelFontFamily ?? CHART_FONT_FAMILY),
    labelFontSize: Number(theme.label?.fontSize ?? theme.axis?.labelFontSize ?? 12),
    fontWeight: (theme.label?.fontWeight ?? 400) as number | 'normal' | 'bold',
  };
}
