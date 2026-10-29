import type { ThemeStyle, VisualizationTheme } from '../types';
import { mergeTheme } from './merge';
import { resolveTheme } from './resolve';

export function getThemeObject(type: 'table', theme?: VisualizationTheme, localStyle?: ThemeStyle) {
  const { baseTheme, tokens: t, styles } = resolveTheme(type, theme, localStyle);
  const cell = {
    fontFamily: t.fontFamily,
    fontSize: t.fontSize,
    fontWeight: t.fontWeight,
    fill: t.colorText,
    backgroundColor: t.colorSurface,
    padding: t.spacingMedium,
  };
  const style = mergeTheme(
    {
      table: {
        header: cell,
        cell,
        border: { color: t.colorStroke, width: t.lineWidth, radius: t.radius },
      },
    },
    ...styles,
  ) as ThemeStyle;
  const title: Record<string, any> = style.title ?? {};
  return {
    theme: baseTheme === 'dark' ? ('dark' as const) : ('light' as const),
    backgroundColor: style.backgroundColor,
    title: compactStyle({
      color: title.titleFill,
      opacity: title.titleFillOpacity?.toString(),
      fontFamily: title.titleFontFamily,
      fontSize: toPixels(title.titleFontSize),
      fontWeight: title.titleFontWeight?.toString(),
      textAlign: title.align,
    }),
    subtitle: compactStyle({
      color: title.subtitleFill,
      opacity: title.subtitleFillOpacity?.toString(),
      fontFamily: title.subtitleFontFamily,
      fontSize: toPixels(title.subtitleFontSize),
      fontWeight: title.subtitleFontWeight?.toString(),
      marginTop: toPixels(title.spacing),
      textAlign: title.align,
    }),
    header: adaptTableCellStyle(style.table?.header),
    cell: adaptTableCellStyle(style.table?.cell),
    border: adaptTableBorderStyle(style.table?.border),
  };
}

const toPixels = (value?: number): string | undefined =>
  value === undefined ? undefined : `${value}px`;

const toPadding = (value?: number | number[]): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return toPixels(value);
  return value.map(toPixels).join(' ');
};

const compactStyle = (style: Record<string, string | undefined>): Record<string, string> =>
  Object.fromEntries(
    Object.entries(style).filter((entry): entry is [string, string] => !!entry[1]),
  );

/** Translate table header/cell text and box styles to safe DOM declarations. */
const adaptTableCellStyle = (style?: Record<string, any>): Record<string, string> =>
  compactStyle({
    color: style?.fill,
    backgroundColor: style?.backgroundColor,
    padding: toPadding(style?.padding),
    fontFamily: style?.fontFamily,
    fontSize: toPixels(style?.fontSize),
    fontWeight: style?.fontWeight?.toString(),
    fontStyle: style?.fontStyle,
    lineHeight: toPixels(style?.lineHeight),
  });

/** Translate one table border contract to outer and row-separator DOM styles. */
const adaptTableBorderStyle = (style?: Record<string, any>) => {
  if (!style) return { table: {}, cell: {} };

  const width = toPixels(style.width ?? 1);
  const lineStyle = style.style ?? 'solid';
  const color = style.color ?? 'currentColor';

  return {
    table: compactStyle({
      borderColor: color,
      borderWidth: width,
      borderStyle: lineStyle,
      borderRadius: toPixels(style.radius),
    }),
    cell: compactStyle({
      borderBottomColor: color,
      borderBottomWidth: width,
      borderBottomStyle: lineStyle,
    }),
  };
};
