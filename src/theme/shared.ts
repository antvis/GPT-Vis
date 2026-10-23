import type {
  ChartStyle,
  ChartStyleMap,
  ChartType,
  ThemeSeedTokens,
  TitleStyle,
  VisualizationTheme,
} from '../types';

/** Shared resolved input for renderer adapters. */
export interface ThemeContext<T extends ChartType = ChartType> {
  type: T;
  baseTheme: VisualizationTheme;
  style: ChartStyleMap[T];
  tokens: Readonly<ThemeSeedTokens>;
  colors: string[];
  backgroundColor: string;
  values: BuiltInThemeValues;
}

export const CHART_FONT_FAMILY =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const CHART_STYLE_DEFAULTS = {
  animationDuration: 260,
  interactionDelay: 40,
  lineWidth: 2.5,
  areaOpacity: 0.24,
  lineOpacity: 0.92,
  inactiveOpacity: 0.24,
  pointSize: 3.5,
  scatterPointSize: 5,
  pointLineWidth: 1.5,
  pointActiveLineWidth: 5,
  intervalWidthRatio: 0.64,
} as const;

export type BuiltInThemeValues = {
  background: string;
  textPrimary: string;
  textInverse: string;
  textSecondary: string;
  grid: string;
  axisGrid: string;
  axisLine: string;
  axisTick: string;
  separator: string;
  tooltipBackground: string;
  tooltipBorder: string;
  tooltipDivider: string;
  tooltipMarkerShadow: string;
  tooltipShadow: string;
};

const LIGHT_THEME_VALUES: BuiltInThemeValues = {
  background: '#FFFFFF',
  textPrimary: '#1F2937',
  textInverse: '#FFFFFF',
  textSecondary: '#667085',
  grid: '#E7EAF0',
  axisGrid: '#D0D5DD',
  axisLine: '#98A2B3',
  axisTick: '#98A2B3',
  separator: '#FFFFFF',
  tooltipBackground: 'rgba(255, 255, 255, 0.96)',
  tooltipBorder: 'rgba(15, 23, 42, 0.09)',
  tooltipDivider: 'rgba(15, 23, 42, 0.08)',
  tooltipMarkerShadow: '0 0 0 2px #FFFFFF, 0 1px 3px rgba(15, 23, 42, 0.20)',
  tooltipShadow:
    '0 12px 32px rgba(15, 23, 42, 0.12), 0 3px 8px rgba(15, 23, 42, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.82)',
};

const DARK_THEME_VALUES: BuiltInThemeValues = {
  background: '#141414',
  textPrimary: '#F3F4F6',
  textInverse: '#111827',
  textSecondary: '#A7AFBE',
  grid: '#343841',
  axisGrid: '#475467',
  axisLine: '#667085',
  axisTick: '#596170',
  separator: '#141414',
  tooltipBackground: 'rgba(26, 27, 31, 0.96)',
  tooltipBorder: 'rgba(255, 255, 255, 0.12)',
  tooltipDivider: 'rgba(255, 255, 255, 0.10)',
  tooltipMarkerShadow: '0 0 0 2px #1A1B1F, 0 1px 3px rgba(0, 0, 0, 0.42)',
  tooltipShadow:
    '0 14px 36px rgba(0, 0, 0, 0.34), 0 3px 10px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
};

const ACADEMY_THEME_VALUES: BuiltInThemeValues = {
  background: '#FFFFFF',
  textPrimary: '#23262D',
  textInverse: '#FFFFFF',
  textSecondary: '#626975',
  grid: '#DDDDDD',
  axisGrid: '#DDDDDD',
  axisLine: '#888888',
  axisTick: '#000000',
  separator: '#FFFFFF',
  tooltipBackground: 'rgba(255, 253, 249, 0.98)',
  tooltipBorder: 'rgba(83, 72, 60, 0.14)',
  tooltipDivider: 'rgba(83, 72, 60, 0.12)',
  tooltipMarkerShadow: '0 0 0 2px #FFFDF9, 0 1px 3px rgba(63, 49, 38, 0.20)',
  tooltipShadow:
    '0 12px 30px rgba(63, 49, 38, 0.11), 0 3px 8px rgba(63, 49, 38, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.88)',
};

export const getBuiltInThemeValues = (theme: VisualizationTheme): BuiltInThemeValues => {
  if (theme === 'dark') return DARK_THEME_VALUES;
  if (theme === 'academy') return ACADEMY_THEME_VALUES;
  return LIGHT_THEME_VALUES;
};

export const DEFAULT_COLOR_PALETTE = [
  '#5B6CFF',
  '#2DAF9E',
  '#F2B84B',
  '#EF6A6A',
  '#55A6D9',
  '#3AA76D',
  '#F58A57',
  '#8B6FD6',
  '#D96C9B',
] as const;

export const ACADEMY_COLOR_PALETTE = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
] as const;

const getThemeColors = (theme: VisualizationTheme): readonly string[] =>
  theme === 'academy' ? ACADEMY_COLOR_PALETTE : DEFAULT_COLOR_PALETTE;

export const normalizePalette = (
  palette: string | string[] | undefined,
  theme: VisualizationTheme,
): string[] => {
  if (!palette || (Array.isArray(palette) && palette.length === 0)) {
    return [...getThemeColors(theme)];
  }
  return Array.isArray(palette) ? [...palette] : [palette];
};

const TITLE_FONT_SIZE_OFFSET = 4;

export const definedObject = <T extends Record<string, unknown>>(value: T): T | undefined =>
  Object.values(value).some((item) => item !== undefined) ? value : undefined;

const resolvePalette = ({
  category10,
  category20,
  colorDefault,
}: ThemeSeedTokens): string[] | undefined => {
  if (category10 !== undefined) return [...category10];
  if (category20 !== undefined) return [...category20];
  return colorDefault === undefined ? undefined : [colorDefault];
};

export const resolveTextStyle = (tokens: ThemeSeedTokens) => ({
  fontFamily: tokens.fontFamily,
  fontSize: tokens.fontSize,
  fontWeight: tokens.fontWeight,
});

type SharedTokenStyle = Pick<ChartStyle, 'backgroundColor' | 'palette' | 'title'>;

const resolveTitle = (tokens: ThemeSeedTokens): TitleStyle | undefined =>
  definedObject({
    spacing: tokens.padding2,
    titleFill: tokens.colorText,
    titleFontFamily: tokens.fontFamily,
    titleFontSize:
      tokens.fontSize === undefined ? undefined : tokens.fontSize + TITLE_FONT_SIZE_OFFSET,
    titleFontWeight: tokens.fontWeight,
    subtitleFill: tokens.colorTextSecondary,
    subtitleFontFamily: tokens.fontFamily,
    subtitleFontSize: tokens.fontSize,
    subtitleFontWeight: tokens.fontWeight,
  });

/** Tokens shared by every renderer family. */
export const expandSharedTokens = (tokens: ThemeSeedTokens): SharedTokenStyle => ({
  backgroundColor: tokens.colorBackground,
  palette: resolvePalette(tokens),
  title: resolveTitle(tokens),
});
