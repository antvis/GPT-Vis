import type { TextStyle } from './common';
import type { TitleStyle } from './components';

/** Text properties that have a direct, portable DOM table mapping. */
export type TableTextStyle = Pick<
  TextStyle,
  'fill' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'fontStyle' | 'lineHeight'
>;

export interface CellStyle {
  backgroundColor?: string;
  padding?: number | [number, number];
}

export interface BorderStyle {
  color?: string;
  width?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  radius?: number;
}

export interface TableComponentStyle {
  header?: TableTextStyle & CellStyle;
  cell?: TableTextStyle & CellStyle;
  border?: BorderStyle;
}

export interface TableStyle {
  backgroundColor?: string;
  title?: TitleStyle;
  table?: TableComponentStyle;
}
