import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../constant';
import { CommonOptions } from './types';

export type LiquidOptions = CommonOptions & {
  data: number;
  shape: 'rect' | 'circle' | 'pin' | 'triangle';
  fontSize?: number;
  title?: string;
};

export async function Liquid(options: LiquidOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    theme = 'default',
    shape = 'circle',
    fontSize = 32,
  } = options;

  return await createChart({
    type: 'liquid',
    theme: THEME_MAP[theme],
    title,
    width,
    height,
    data,
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
