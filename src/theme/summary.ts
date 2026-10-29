import type { ThemeStyle, VisualizationTheme } from '../types';
import { getChartVisualTokens } from '../util/tokens';
import { mergeTheme } from './merge';
import { resolveTheme } from './resolve';
import { pickStyle } from './shared';

export function getThemeObject(
  type: 'summary',
  theme?: VisualizationTheme,
  localStyle?: ThemeStyle,
) {
  const { baseTheme, tokens: t, styles } = resolveTheme(type, theme, localStyle);
  const summary = {
    fontFamily: t.fontFamily,
    fontSize: t.fontSize,
    lineHeight: t.lineHeight,
    borderColor: t.colorStroke,
    colorBase: t.colorText,
    colorEntityBase: t.colorText,
    colorHeadingBase: t.colorText,
    colorPositive: t.colorPositive,
    colorNegative: t.colorNegative,
    colorConclusion: t.colorText,
    colorDimensionValue: t.colorText,
    colorMetricName: t.colorText,
    colorMetricValue: t.colorDefault,
    colorOtherValue: t.colorNeutral,
    colorLink: t.colorDefault,
  };
  const style = mergeTheme({ summary }, ...styles) as ThemeStyle;
  return {
    theme: baseTheme === 'dark' ? ('dark' as const) : ('light' as const),
    backgrounds: {
      light: style.backgroundColor ?? '',
      dark: style.backgroundColor ?? getChartVisualTokens('dark').background,
    },
    summary: pickStyle(style.summary, Object.keys(summary)),
  };
}
