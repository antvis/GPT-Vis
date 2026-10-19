import type { ChartStyle, ThemeSeedTokens, TitleStyle } from '../../types';
import { definedObject, resolvePalette, TITLE_FONT_SIZE_OFFSET } from './helpers';

type SharedTokenStyle = Pick<ChartStyle, 'backgroundColor' | 'palette' | 'title'>;

const resolveTitle = (tokens: ThemeSeedTokens): TitleStyle | undefined =>
  definedObject({
    spacing: tokens.padding2,
    titleFill: tokens.colorText,
    titleFontFamily: tokens.fontFamily,
    titleFontSize:
      tokens.fontSize === undefined ? undefined : tokens.fontSize + TITLE_FONT_SIZE_OFFSET,
    titleFontWeight: tokens.fontWeight,
    subtitleFill: tokens.colorTextSecondary,
    subtitleFontFamily: tokens.fontFamily,
    subtitleFontSize: tokens.fontSize,
    subtitleFontWeight: tokens.fontWeight,
  });

/** Tokens shared by every renderer family. */
export const expandSharedTokens = (tokens: ThemeSeedTokens): SharedTokenStyle => ({
  backgroundColor: tokens.colorBackground,
  palette: resolvePalette(tokens),
  title: resolveTitle(tokens),
});
