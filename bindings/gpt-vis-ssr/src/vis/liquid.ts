import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { CommonOptions } from './types';

export type LiquidOptions = CommonOptions & {
  /**
   * Title of the liquid chart.
   */
  title?: string;
  /**
   * The percentage value to display in the liquid chart.
   * This should be a number between 0 and 1, where 1 represents 100%.
   * For example, 0.75 represents 75%.
   */
  percent: number;
  /**
   * Shape of the liquid chart.
   * Options are 'rect', 'circle', 'pin', or 'triangle'.
   */
  shape?: 'rect' | 'circle' | 'pin' | 'triangle';
};

export async function Liquid(options: LiquidOptions) {
  const {
    percent,
    title,
    width = 600,
    height = 400,
    theme = 'default',
    shape = 'circle',
  } = options;

  const inferFontSize = Math.min(width, height) / 10;
  const fontSize = Math.min(Math.max(inferFontSize, 24), 64); // Ensure font size is between 16 and 64

  return await createChart({
    devicePixelRatio: 3,
    type: 'liquid',
    theme: THEME_MAP[theme],
    title,
    width,
    height,
    data: percent,
    style: {
      shape,
      contentFontSize: fontSize,
      contentFill: '#000',
      contentStroke: '#fff',
      contentLineWidth: 2,
      outlineBorder: 4,
      outlineDistance: 4,
      waveLength: 128,
    },
    animate: false,
  });
}
