import type { ThemeSeedTokens, ThemeStyle } from '../../types';
import type { ThemeContext, TitleStyle } from '../shared';
import { definedObject, resolveTextStyle } from '../shared';

export const createTableAppearance = (context: ThemeContext) => ({
  rendererTheme: context.baseTheme === 'dark' ? ('dark' as const) : ('light' as const),
  backgroundColor: context.style.backgroundColor,
  title: adaptTableTitleStyle(context.style.title),
  subtitle: adaptTableSubtitleStyle(context.style.title),
  header: adaptTableCellStyle(context.style.table?.header),
  cell: adaptTableCellStyle(context.style.table?.cell),
  border: adaptTableBorderStyle(context.style.table?.border),
});

type TableTokenStyle = Pick<ThemeStyle, 'table'>;

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

type TableDomStyle = Record<string, string>;

const toPixels = (value: number): string => `${value}px`;

const toPadding = (value: TableCellStyle['padding']): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return toPixels(value);
  return value.map(toPixels).join(' ');
};

const compactStyle = (style: Record<string, string | undefined>): TableDomStyle =>
  Object.fromEntries(
    Object.entries(style).filter((entry): entry is [string, string] => !!entry[1]),
  );

/** Translate the shared title contract to safe DOM style declarations. */
const adaptTableTitleStyle = (style?: TitleStyle): TableDomStyle =>
  compactStyle({
    color: style?.titleFill,
    opacity: style?.titleFillOpacity?.toString(),
    fontFamily: style?.titleFontFamily,
    fontSize: style?.titleFontSize === undefined ? undefined : toPixels(style.titleFontSize),
    fontWeight: style?.titleFontWeight?.toString(),
    textAlign: style?.align,
  });

/** Translate shared subtitle styles to safe DOM declarations. */
const adaptTableSubtitleStyle = (style?: TitleStyle): TableDomStyle =>
  compactStyle({
    color: style?.subtitleFill,
    opacity: style?.subtitleFillOpacity?.toString(),
    fontFamily: style?.subtitleFontFamily,
    fontSize: style?.subtitleFontSize === undefined ? undefined : toPixels(style.subtitleFontSize),
    fontWeight: style?.subtitleFontWeight?.toString(),
    marginTop: style?.spacing === undefined ? undefined : toPixels(style.spacing),
    textAlign: style?.align,
  });

/** Translate table header/cell text and box styles to safe DOM declarations. */
const adaptTableCellStyle = (style?: TableCellStyle): TableDomStyle =>
  compactStyle({
    color: style?.fill,
    backgroundColor: style?.backgroundColor,
    padding: toPadding(style?.padding),
    fontFamily: style?.fontFamily,
    fontSize: style?.fontSize === undefined ? undefined : toPixels(style.fontSize),
    fontWeight: style?.fontWeight?.toString(),
    fontStyle: style?.fontStyle,
    lineHeight: style?.lineHeight === undefined ? undefined : toPixels(style.lineHeight),
  });

/** Translate one table border contract to outer and row-separator DOM styles. */
const adaptTableBorderStyle = (style?: TableBorderStyle) => {
  if (!style) return { table: {}, cell: {} };

  const width = toPixels(style.width ?? 1);
  const lineStyle = style.style ?? 'solid';
  const color = style.color ?? 'currentColor';

  return {
    table: compactStyle({
      borderColor: color,
      borderWidth: width,
      borderStyle: lineStyle,
      borderRadius: style.radius === undefined ? undefined : toPixels(style.radius),
    }),
    cell: compactStyle({
      borderBottomColor: color,
      borderBottomWidth: width,
      borderBottomStyle: lineStyle,
    }),
  };
};

/** Native DOM conversion inputs; these are implementation details. */
interface TableCellStyle {
  fill?: string;
  backgroundColor?: string;
  padding?: number | [number, number];
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  lineHeight?: number;
}

interface TableBorderStyle {
  color?: string;
  width?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  radius?: number;
}
