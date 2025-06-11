import type { LiquidConfig } from '@ant-design/plots';
import { createChart } from '@antv/g2-ssr';
import type { CSSProperties, ReactNode } from 'react';
import { THEME_MAP } from '../constant';
import { CommonOptions } from './types';

export interface BaseChartProps {
  containerStyle?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

export interface BasePlotProps<T> extends BaseChartProps {
  data: T[];
  axisXTitle?: string;
  axisYTitle?: string;
}

type LiquidItem = {
  data: number;
  [key: string]: string | number;
};

export type LiquidProps = BasePlotProps<LiquidItem> & Partial<LiquidConfig>;

export type LiquidOptions = CommonOptions & LiquidProps;

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
