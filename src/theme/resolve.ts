import type { ChartType, ThemeInput, ThemeSpec, ThemeStyle, VisualizationTheme } from '../types';
import type { G2AppearanceDefaults } from './adapters/g2';
import { createG2Appearance, expandG2Tokens } from './adapters/g2';
import { createG6Appearance, expandG6Tokens } from './adapters/g6';
import { createSummaryAppearance, expandSummaryTokens } from './adapters/summary';
import { createTableAppearance, expandTableTokens } from './adapters/table';
import { selectThemeStyleForChart } from './capabilities';
import { G6_CHART_TYPES, type G2ChartType, type G6ChartType } from './chart-types';
import { mergeChartStyles, mergeThemeObjects } from './merge';
import { expandSharedTokens, getBuiltInThemeValues, normalizePalette } from './shared';

type ThemeOptions = {
  style?: ThemeStyle;
  title?: string;
  subtitle?: string;
  defaults?: G2AppearanceDefaults;
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
  options?: ThemeOptions,
): Appearance<T>;
export function getThemeObject(type: ChartType, theme?: ThemeInput, options: ThemeOptions = {}) {
  const resolved = resolveChartTheme(resolveTheme(theme), type, { style: options.style });
  const values = getBuiltInThemeValues(resolved.baseTheme);
  const context = {
    ...resolved,
    values,
    colors: normalizePalette(resolved.style.palette, resolved.baseTheme),
    backgroundColor: resolved.style.backgroundColor || values.background,
  };
  if (type === 'table') return createTableAppearance(context);
  if (type === 'summary') return createSummaryAppearance(context);
  if (G6_CHART_TYPES.some((chartType) => chartType === type)) {
    return createG6Appearance(context, options.title, options.subtitle);
  }
  return createG2Appearance(context, options.defaults, options.title, options.subtitle);
}

const BUILT_IN_THEME_LABELS: Record<VisualizationTheme, string> = {
  default: 'GPT-Vis Default',
  light: 'GPT-Vis Light',
  dark: 'GPT-Vis Dark',
  academy: 'GPT-Vis Academy',
};

/** Normalize the deprecated shorthand before merging each priority layer. */
const normalizeLegacyLineWidth = (
  type: ChartType,
  style: ThemeStyle | undefined,
): ThemeStyle | undefined => {
  if (!style || (type !== 'line' && type !== 'area' && type !== 'radar')) return style;
  if (style.lineWidth === undefined) return style;
  return {
    ...style,
    mark: {
      ...style.mark,
      line: {
        ...style.mark?.line,
        lineWidth: style.mark?.line?.lineWidth ?? style.lineWidth,
      },
    },
  };
};

const toThemeSpec = (theme: ThemeInput | undefined): ThemeSpec => {
  if (theme && typeof theme === 'object') return theme;
  const baseTheme = theme ?? 'default';
  return {
    id: baseTheme,
    label: BUILT_IN_THEME_LABELS[baseTheme],
    baseTheme,
  };
};

/** Normalize a built-in theme or custom ThemeSpec into one resolver input. */
export const resolveTheme = (theme?: ThemeInput) => {
  const spec = toThemeSpec(theme);
  const tokens = mergeThemeObjects(spec.tokens);
  const style = mergeChartStyles<ThemeStyle>(
    {
      ...expandSharedTokens(tokens),
      ...expandG2Tokens(tokens),
      ...expandG6Tokens(tokens),
      ...expandTableTokens(tokens),
      ...expandSummaryTokens(tokens),
    },
    spec.style,
  );
  const charts = mergeThemeObjects<NonNullable<ThemeSpec['charts']>>(spec.charts);

  return {
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
export const resolveChartTheme = (
  theme: ReturnType<typeof resolveTheme>,
  type: ChartType,
  override?: { style?: ThemeStyle },
) => {
  const chartTheme = theme.charts[type];
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
  };
};
