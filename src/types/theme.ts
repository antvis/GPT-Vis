import type { ChartStyleMap, ChartType } from './chart';
import type { VisualizationTheme } from './common';
import type { ChartStyle } from './style';
import type { ThemeSeedTokens } from './tokens';

/** Visual chart options that live outside the shared `style` namespace. */
export interface ThemeChartExtraConfigMap {
  pie: {
    innerRadius?: number;
  };
  treemap: {
    layout?: {
      paddingInner?: number;
    };
  };
  'word-cloud': {
    layout?: {
      padding?: number;
      rotate?: number | number[];
    };
  };
}

export type ThemeChartExtraConfig<T extends ChartType> = T extends keyof ThemeChartExtraConfigMap
  ? ThemeChartExtraConfigMap[T]
  : unknown;

/** Visual-only override for one chart type. Data and semantic encodings are excluded. */
export type ThemeChartConfig<T extends ChartType> = ThemeChartExtraConfig<T> & {
  style?: ChartStyleMap[T];
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
  charts?: {
    [T in ChartType]?: ThemeChartConfig<T>;
  };
}

/** Merged visual result passed to a renderer-family adapter. */
export type ResolvedChartStyle<T extends ChartType = ChartType> = T extends ChartType
  ? Readonly<
      ThemeChartExtraConfig<T> & {
        type: T;
        baseTheme: VisualizationTheme;
        style: ChartStyleMap[T];
      }
    >
  : never;
