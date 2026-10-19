import type { ThemeSeedTokens } from '../../types';

export const TITLE_FONT_SIZE_OFFSET = 4;

export const definedObject = <T extends Record<string, unknown>>(value: T): T | undefined =>
  Object.values(value).some((item) => item !== undefined) ? value : undefined;

export const resolvePalette = ({
  category10,
  category20,
  colorDefault,
}: ThemeSeedTokens): string[] | undefined => {
  if (category10 !== undefined) return [...category10];
  if (category20 !== undefined) return [...category20];
  return colorDefault === undefined ? undefined : [colorDefault];
};

export const resolveTextStyle = (tokens: ThemeSeedTokens) => ({
  fontFamily: tokens.fontFamily,
  fontSize: tokens.fontSize,
  fontWeight: tokens.fontWeight,
});
