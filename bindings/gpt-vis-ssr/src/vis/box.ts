import type { BoxConfig } from '@ant-design/plots';
import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { BasePlotProps, CommonOptions } from './types';

type BoxDataItem = {
  category: string;
  value: any;
  [key: string]: string | number;
};

export type BoxProps = BasePlotProps<BoxDataItem> & Partial<BoxConfig>;
export type BoxOptions = CommonOptions & BoxProps;

export async function Box(options: BoxOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    axisYTitle,
    axisXTitle,
    theme = 'default',
  } = options;

  const hasGroupField = (data || [])[0]?.group !== undefined;
  let encode = {};

  if (hasGroupField) {
    encode = {
      x: 'category',
      y: 'value',
      color: 'group',
      series: 'group',
    };
  } else {
    encode = {
      x: 'category',
      y: 'value',
      color: 'category',
    };
  }

  return await createChart({
    type: 'boxplot',
    theme: THEME_MAP[theme],
    width,
    height,
    title,
    autoFit: true,
    data,
    axis: {
      y: {
        title: axisYTitle || false,
      },
      x: {
        title: axisXTitle || false,
      },
    },
    encode: encode,
    scale: {
      x: { paddingInner: 0.6, paddingOuter: 0.3 },
      // y: { zero: true },
      series: { paddingInner: 0.3, paddingOuter: 0.1 },
    },
    style: { stroke: 'black' },
    legend: true,
  });
}
