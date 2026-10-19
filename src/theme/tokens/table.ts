import type { ChartStyle, ThemeSeedTokens } from '../../types';
import { definedObject, resolveTextStyle } from './helpers';

type TableTokenStyle = Pick<ChartStyle, 'table'>;

/** Expand seed tokens into the DOM table style contract. */
export const expandTableTokens = (tokens: ThemeSeedTokens): TableTokenStyle => {
  const textStyle = resolveTextStyle(tokens);

  return {
    table: definedObject({
      header: definedObject({
        ...textStyle,
        fill: tokens.colorText,
        backgroundColor: tokens.colorSurface,
        padding: tokens.padding2,
      }),
      cell: definedObject({
        ...textStyle,
        fill: tokens.colorText,
        backgroundColor: tokens.colorSurface,
        padding: tokens.padding2,
      }),
      border: definedObject({
        color: tokens.colorStroke,
        width: tokens.lineWidth,
        radius: tokens.radius,
      }),
    }),
  };
};
