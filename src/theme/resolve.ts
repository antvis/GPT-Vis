import type {
  ChartStyle,
  ChartStyleMap,
  ChartType,
  LineChartStyle,
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

/** Normalize the deprecated shorthand before merging each priority layer. */
const normalizeLegacyLineWidth = <T extends ChartType>(
  type: T,
  style: ChartStyleMap[T] | undefined,
): ChartStyleMap[T] | undefined => {
  if (!style || (type !== 'line' && type !== 'area' && type !== 'radar')) return style;
  const lineStyle = style as LineChartStyle;
  if (lineStyle.lineWidth === undefined) return style;

  return {
    ...style,
    mark: {
      ...lineStyle.mark,
      line: {
        ...lineStyle.mark?.line,
        lineWidth: lineStyle.mark?.line?.lineWidth ?? lineStyle.lineWidth,
      },
    },
  } as ChartStyleMap[T];
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

/** Resolve one chart using: tokens < global style < chart style < local override. */
export const resolveChartTheme = <T extends ChartType>(
  theme: ResolvedTheme,
  type: T,
  override?: ThemeChartConfig<T>,
): ResolvedChartTheme<T> => {
  const chartTheme = theme.charts[type] as ThemeChartConfig<T> | undefined;
  const globalStyle = selectThemeStyleForChart(type, theme.style);
  const style = mergeChartStyles(
    globalStyle,
    normalizeLegacyLineWidth(type, chartTheme?.style),
    normalizeLegacyLineWidth(type, override?.style),
  );

  return {
    type,
    baseTheme: theme.baseTheme,
    tokens: theme.tokens,
    style,
  } as ResolvedChartTheme<T>;
};
