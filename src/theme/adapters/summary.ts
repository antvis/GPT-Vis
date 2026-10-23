import type { ChartStyle, SummaryComponentStyle, ThemeSeedTokens } from '../../types';
import type { ThemeContext } from '../shared';
import { definedObject, getBuiltInThemeValues } from '../shared';

export const createSummaryAppearance = (context: ThemeContext<'summary'>) => ({
  rendererTheme: context.baseTheme === 'dark' ? ('dark' as const) : ('light' as const),
  backgrounds: {
    light: context.style.backgroundColor ?? '',
    dark: context.style.backgroundColor ?? getBuiltInThemeValues('dark').background,
  },
  summary: adaptSummaryStyle(context.style.summary),
});

type SummaryTokenStyle = Pick<ChartStyle, 'summary'>;

/** Expand seed tokens into T8 Summary seed options. */
export const expandSummaryTokens = (tokens: ThemeSeedTokens): SummaryTokenStyle => ({
  summary: definedObject({
    fontFamily: tokens.fontFamily,
    fontSize: tokens.fontSize,
    lineHeight: tokens.lineHeight,
    borderColor: tokens.colorStroke,
    colorBase: tokens.colorText,
    colorEntityBase: tokens.colorText,
    colorHeadingBase: tokens.colorText,
    colorPositive: tokens.colorPositive,
    colorNegative: tokens.colorNegative,
    colorConclusion: tokens.colorText,
    colorDimensionValue: tokens.colorText,
    colorMetricName: tokens.colorText,
    colorMetricValue: tokens.colorDefault,
    colorOtherValue: tokens.colorNeutral,
    colorLink: tokens.colorDefault,
  }),
});

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
const adaptSummaryStyle = (style?: SummaryComponentStyle): SummaryComponentStyle | undefined => {
  if (!style) return undefined;
  return Object.fromEntries(
    SUMMARY_STYLE_KEYS.flatMap((key) => (style[key] === undefined ? [] : [[key, style[key]]])),
  ) as SummaryComponentStyle;
};
