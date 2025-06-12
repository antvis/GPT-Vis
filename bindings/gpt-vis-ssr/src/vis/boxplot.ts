import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { CommonOptions } from './types';

type BoxplotDatum = {
  category: string;
  value: number;
  group?: string;
};

export type BoxplotOptions = CommonOptions & {
  /**
   * Title of the boxplot chart.
   */
  title?: string;
  /**
   * Data for the boxplot chart.
   */
  data: BoxplotDatum[];
  /**
   * axisYTitle of the boxplot chart.
   */
  axisYTitle?: string;
  /**
   * axisXTitle of the boxplot chart.
   */
  axisXTitle?: string;
};

export async function Boxplot(options: BoxplotOptions) {
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
      series: { paddingInner: 0.3, paddingOuter: 0.1 },
    },
    style: { stroke: 'black' },
  });
}
