import type {
  ChartStyle,
  ChartStyleMap,
  ChartType,
  G2ChartType,
  G6ChartType,
  LineChartStyle,
  ThemeChartConfig,
  ThemeSpec,
  VisualizationTheme,
} from '../types';
import { G6_CHART_TYPES } from '../types/chart';
import type {
  ResolvedChartTheme,
  ResolvedTheme,
  ThemeChartConfigMap,
  ThemeInput,
} from '../types/theme';
import type { G2AppearanceDefaults } from './adapters/g2';
import { createG2Appearance, expandG2Tokens } from './adapters/g2';
import { createG6Appearance, expandG6Tokens } from './adapters/g6';
import { createSummaryAppearance, expandSummaryTokens } from './adapters/summary';
import { createTableAppearance, expandTableTokens } from './adapters/table';
import { selectThemeStyleForChart } from './capabilities';
import { mergeChartStyles, mergeThemeObjects } from './merge';
import type { ThemeContext } from './shared';
import { expandSharedTokens, getBuiltInThemeValues, normalizePalette } from './shared';

type ThemeDefaults<T extends ChartType> = T extends G2ChartType
  ? G2AppearanceDefaults
  : Record<string, never>;

type ThemeOptions<T extends ChartType> = ThemeChartConfig<T> & {
  title?: string;
  subtitle?: string;
  defaults?: ThemeDefaults<T>;
};

type Appearance<T extends ChartType> = T extends G2ChartType
  ? ReturnType<typeof createG2Appearance>
  : T extends G6ChartType
    ? ReturnType<typeof createG6Appearance>
    : T extends 'table'
      ? ReturnType<typeof createTableAppearance>
      : ReturnType<typeof createSummaryAppearance>;

/** The only chart-facing theme entry: resolve, merge, filter and adapt once. */
export function getThemeObject<T extends ChartType>(
  type: T,
  theme?: ThemeInput,
  options?: ThemeOptions<T>,
): Appearance<T>;
export function getThemeObject<T extends ChartType>(
  type: T,
  theme?: ThemeInput,
  options: ThemeOptions<T> = {},
) {
  const resolved = resolveChartTheme(resolveTheme(theme), type, { style: options.style });
  const values = getBuiltInThemeValues(resolved.baseTheme);
  const context = {
    ...resolved,
    values,
    colors: normalizePalette((resolved.style as ChartStyle).palette, resolved.baseTheme),
    backgroundColor: resolved.style.backgroundColor || values.background,
  } as ThemeContext<T>;
  if (type === 'table') return createTableAppearance(context as ThemeContext<'table'>);
  if (type === 'summary') return createSummaryAppearance(context as ThemeContext<'summary'>);
  if (G6_CHART_TYPES.some((chartType) => chartType === type)) {
    return createG6Appearance(
      context as ThemeContext<G6ChartType>,
      options.title,
      options.subtitle,
    );
  }
  return createG2Appearance(
    context as ThemeContext<G2ChartType>,
    options.defaults as G2AppearanceDefaults,
    options.title,
    options.subtitle,
  );
}

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
  const style = mergeChartStyles<ChartStyle>(
    {
      ...expandSharedTokens(tokens),
      ...expandG2Tokens(tokens),
      ...expandG6Tokens(tokens),
      ...expandTableTokens(tokens),
      ...expandSummaryTokens(tokens),
    },
    spec.style,
  );
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
