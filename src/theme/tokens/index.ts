import type { ChartStyle, ThemeSeedTokens } from '../../types';
import { expandG2Tokens } from './g2';
import { expandG6Tokens } from './g6';
import { expandSharedTokens } from './shared';
import { expandSummaryTokens } from './summary';
import { expandTableTokens } from './table';

/** Expand seed tokens into renderer-specific sections of the shared style contract. */
export const expandThemeTokens = (tokens: ThemeSeedTokens = {}): ChartStyle => ({
  ...expandSharedTokens(tokens),
  ...expandG2Tokens(tokens),
  ...expandG6Tokens(tokens),
  ...expandTableTokens(tokens),
  ...expandSummaryTokens(tokens),
});
