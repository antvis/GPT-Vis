import type { ChartStyleMap, ChartType } from './chart';
import type { VisualizationTheme } from './common';
import type { ChartStyle } from './style';
import type { ThemeSeedTokens } from './tokens';

/** Visual-only override for one chart type. Data and semantic encodings are excluded. */
export type ThemeChartConfig<T extends ChartType> = {
  style?: ChartStyleMap[T];
};

export type ThemeChartConfigMap = {
  [T in ChartType]?: ThemeChartConfig<T>;
};

export interface ThemeSpec {
  version: '1';
  id: string;
  label: string;
  description?: string;
  baseTheme?: VisualizationTheme;
  /** Seed tokens expanded into renderer-specific styles by the theme resolver. */
  tokens?: ThemeSeedTokens;
  /** Precise global style overrides applied after token expansion. */
  style?: ChartStyle;
  charts?: ThemeChartConfigMap;
}

export type ThemeInput = VisualizationTheme | ThemeSpec;

/** Normalized theme consumed by chart-specific style resolution. */
export interface ResolvedTheme {
  readonly version: '1';
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly baseTheme: VisualizationTheme;
  readonly tokens: Readonly<ThemeSeedTokens>;
  readonly style: Readonly<ChartStyle>;
  readonly charts: Readonly<ThemeChartConfigMap>;
}

/** Merged chart theme passed to a renderer-family adapter. */
export type ResolvedChartTheme<T extends ChartType = ChartType> = T extends ChartType
  ? Readonly<{
      type: T;
      baseTheme: VisualizationTheme;
      tokens: Readonly<ThemeSeedTokens>;
      style: ChartStyleMap[T];
    }>
  : never;
