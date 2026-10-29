import type { ChartType, ThemeStyle, VisualizationTheme } from '../types';

/** Keep the override layers in order; each renderer expands only its own tokens. */
export function resolveTheme(type: ChartType, theme?: VisualizationTheme, localStyle?: ThemeStyle) {
  const spec = typeof theme === 'object' ? theme : undefined;
  const tokens = spec?.tokens ?? {};
  const name = spec?.baseTheme ?? (typeof theme === 'string' ? theme : 'default');
  const baseTheme: 'light' | 'dark' | 'academy' =
    name === 'dark' || name === 'academy' ? name : 'light';
  return {
    baseTheme,
    tokens,
    styles: [
      {
        backgroundColor: tokens.colorBackground,
        palette:
          tokens.category10 ??
          tokens.category20 ??
          (tokens.colorDefault ? [tokens.colorDefault] : undefined),
        title: {
          titleFill: tokens.colorText,
          subtitleFill: tokens.colorTextSecondary,
          titleFontFamily: tokens.fontFamily,
          subtitleFontFamily: tokens.fontFamily,
          titleFontSize: tokens.fontSize === undefined ? undefined : tokens.fontSize + 4,
          subtitleFontSize: tokens.fontSize,
          titleFontWeight: tokens.fontWeight,
          spacing: tokens.spacingMedium,
        },
      },
      spec?.style,
      spec?.charts?.[type]?.style,
      localStyle,
    ],
  };
}
