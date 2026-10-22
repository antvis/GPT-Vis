import type { SummaryComponentStyle, ThemeChartConfig, ThemeInput } from '../../types';
import type { ResolvedChartTheme } from '../../types/theme';
import { resolveChartTheme, resolveTheme } from '../resolve';

export type SummaryRendererTheme = 'light' | 'dark';
export type ResolvedSummaryTheme = ResolvedChartTheme<'summary'> & {
  rendererTheme: SummaryRendererTheme;
};

const SUMMARY_STYLE_KEYS = [
  'fontFamily',
  'fontSize',
  'lineHeight',
  'borderColor',
  'colorBase',
  'colorEntityBase',
  'colorHeadingBase',
  'colorPositive',
  'colorNegative',
  'colorConclusion',
  'colorDimensionValue',
  'colorMetricName',
  'colorMetricValue',
  'colorOtherValue',
  'colorLink',
] as const;

/** Filter generated Summary options to the GPT-Vis visual subset. */
export const adaptSummaryStyle = (
  style?: SummaryComponentStyle,
): SummaryComponentStyle | undefined => {
  if (!style) return undefined;
  return Object.fromEntries(
    SUMMARY_STYLE_KEYS.flatMap((key) => (style[key] === undefined ? [] : [[key, style[key]]])),
  ) as SummaryComponentStyle;
};

/** Resolve Summary theme input into the T8 renderer's light or dark base. */
export const resolveSummaryTheme = (
  theme: ThemeInput | undefined,
  override?: ThemeChartConfig<'summary'>,
): ResolvedSummaryTheme => {
  const resolved = resolveChartTheme(resolveTheme(theme), 'summary', override);
  return {
    ...resolved,
    rendererTheme: resolved.baseTheme === 'dark' ? 'dark' : 'light',
  };
};
