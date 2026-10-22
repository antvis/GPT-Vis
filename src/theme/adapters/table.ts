import type {
  BorderStyle,
  CellStyle,
  TableTextStyle,
  ThemeChartConfig,
  ThemeInput,
  TitleStyle,
} from '../../types';
import type { ResolvedChartTheme } from '../../types/theme';
import { resolveChartTheme, resolveTheme } from '../resolve';

export type TableRendererTheme = 'light' | 'dark';
export type ResolvedTableTheme = ResolvedChartTheme<'table'> & {
  rendererTheme: TableRendererTheme;
};

export type TableDomStyle = Record<string, string>;

const toPixels = (value: number): string => `${value}px`;

const toPadding = (value: CellStyle['padding']): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return toPixels(value);
  return value.map(toPixels).join(' ');
};

const compactStyle = (style: Record<string, string | undefined>): TableDomStyle =>
  Object.fromEntries(
    Object.entries(style).filter((entry): entry is [string, string] => !!entry[1]),
  );

/** Translate the shared title contract to safe DOM style declarations. */
export const adaptTableTitleStyle = (style?: TitleStyle): TableDomStyle =>
  compactStyle({
    color: style?.titleFill,
    opacity: style?.titleFillOpacity?.toString(),
    fontFamily: style?.titleFontFamily,
    fontSize: style?.titleFontSize === undefined ? undefined : toPixels(style.titleFontSize),
    fontWeight: style?.titleFontWeight?.toString(),
    textAlign: style?.align,
  });

/** Translate shared subtitle styles to safe DOM declarations. */
export const adaptTableSubtitleStyle = (style?: TitleStyle): TableDomStyle =>
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
export const adaptTableCellStyle = (style?: TableTextStyle & CellStyle): TableDomStyle =>
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
export const adaptTableBorderStyle = (style?: BorderStyle) => {
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

/** Resolve Table theme input into the DOM renderer's light or dark base. */
export const resolveTableTheme = (
  theme: ThemeInput | undefined,
  override?: ThemeChartConfig<'table'>,
): ResolvedTableTheme => {
  const resolved = resolveChartTheme(resolveTheme(theme), 'table', override);
  return {
    ...resolved,
    rendererTheme: resolved.baseTheme === 'dark' ? 'dark' : 'light',
  };
};
