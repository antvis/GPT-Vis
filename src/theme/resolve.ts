import type {
  ChartStyle,
  ChartType,
  ThemeChartConfig,
  ThemeSpec,
  VisualizationTheme,
} from '../types';
import type {
  ResolvedChartTheme,
  ResolvedTheme,
  ThemeChartConfigMap,
  ThemeInput,
} from '../types/theme';
import { selectThemeStyleForChart } from './capabilities';
import { mergeChartStyles, mergeThemeObjects } from './merge';
import { expandThemeTokens } from './tokens';

const BUILT_IN_THEME_LABELS: Record<VisualizationTheme, string> = {
  default: 'GPT-Vis Default',
  light: 'GPT-Vis Light',
  dark: 'GPT-Vis Dark',
  academy: 'GPT-Vis Academy',
};

const toThemeSpec = (theme: ThemeInput | undefined): ThemeSpec => {
  if (theme && typeof theme === 'object') return theme;
  const baseTheme = theme ?? 'default';
  return {
    version: '1',
    id: baseTheme,
    label: BUILT_IN_THEME_LABELS[baseTheme],
    baseTheme,
  };
};

/** Normalize a built-in theme or custom ThemeSpec into one resolver input. */
export const resolveTheme = (theme?: ThemeInput): ResolvedTheme => {
  const spec = toThemeSpec(theme);
  const tokens = mergeThemeObjects(spec.tokens);
  const style = mergeChartStyles<ChartStyle>(expandThemeTokens(tokens), spec.style);
  const charts = mergeThemeObjects<ThemeChartConfigMap>(spec.charts);

  return {
    version: '1',
    id: spec.id,
    label: spec.label,
    description: spec.description,
    baseTheme: spec.baseTheme ?? 'default',
    tokens,
    style,
    charts,
  };
};

const withoutStyle = <T extends ChartType>(
  config: ThemeChartConfig<T> | undefined,
): Record<string, unknown> => {
  if (!config) return {};
  const extra = { ...config } as Record<string, unknown>;
  delete extra.style;
  return extra;
};

/** Resolve one chart using: tokens < global style < chart style < local override. */
export const resolveChartTheme = <T extends ChartType>(
  theme: ResolvedTheme,
  type: T,
  override?: ThemeChartConfig<T>,
): ResolvedChartTheme<T> => {
  const chartTheme = theme.charts[type] as ThemeChartConfig<T> | undefined;
  const globalStyle = selectThemeStyleForChart(type, theme.style);
  const style = mergeChartStyles(globalStyle, chartTheme?.style, override?.style);
  const extra = mergeThemeObjects(withoutStyle(chartTheme), withoutStyle(override));

  return {
    type,
    baseTheme: theme.baseTheme,
    tokens: theme.tokens,
    ...extra,
    style,
  } as ResolvedChartTheme<T>;
};
