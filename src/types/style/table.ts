import type { TextStyle } from './common';
import type { TitleStyle } from './components';

export interface CellStyle {
  backgroundColor?: string;
  padding?: number | [number, number];
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

export interface BorderStyle {
  color?: string;
  width?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  radius?: number;
}

export interface TableComponentStyle {
  header?: TextStyle & CellStyle;
  cell?: TextStyle & CellStyle;
  border?: BorderStyle;
}

export interface TableStyle {
  backgroundColor?: string;
  title?: TitleStyle;
  table?: TableComponentStyle;
}
