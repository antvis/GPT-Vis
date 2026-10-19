import type { ChartStyle, ThemeSeedTokens } from '../../types';
import { definedObject } from './helpers';

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
