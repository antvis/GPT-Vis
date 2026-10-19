import type { ChartStyle, ThemeSeedTokens } from '../../types';
import { definedObject } from './helpers';

type G6TokenStyle = Pick<ChartStyle, 'node' | 'edge'>;

/** Expand seed tokens into G6 node and edge element styles. */
export const expandG6Tokens = (tokens: ThemeSeedTokens): G6TokenStyle => ({
  node: definedObject({
    stroke: tokens.colorStroke,
    lineWidth: tokens.lineWidth,
    radius: tokens.radius,
    labelFill: tokens.colorText,
    labelFontFamily: tokens.fontFamily,
    labelFontSize: tokens.fontSize,
    labelFontWeight: tokens.fontWeight,
  }),
  edge: definedObject({
    stroke: tokens.colorStroke,
    lineWidth: tokens.lineWidth,
    labelFill: tokens.colorTextSecondary,
    labelFontFamily: tokens.fontFamily,
    labelFontSize: tokens.fontSize,
    labelFontWeight: tokens.fontWeight,
  }),
});
