import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { CommonOptions } from './types';

type ViolinDatum = {
  category: string;
  value: number;
  group?: string;
};

export type ViolinOptions = CommonOptions & {
  /**
   * Title of the violin chart.
   */
  title?: string;
  /**
   * Data for the violin chart.
   */
  data: ViolinDatum[];
  /**
   * axisYTitle of the violin chart.
   */
  axisYTitle?: string;
  /**
   * axisXTitle of the violin chart.
   */
  axisXTitle?: string;
};

export async function Violin(options: ViolinOptions) {
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
  let children = [];

  if (hasGroupField) {
    encode = {
      x: 'category',
      y: 'y',
      color: 'group',
      series: 'group',
      size: 'size',
    };
    children = [
      {
        type: 'density',
        data: {
          transform: [{ type: 'kde', field: 'value', groupBy: ['category', 'group'] }],
        },
        encode: encode,
      },
      {
        type: 'boxplot',
        encode: {
          x: 'category',
          y: 'value',
          series: 'group',
          color: 'group',
          shape: 'violin',
        },
        style: { opacity: 0.5, strokeOpacity: 0.5, point: false },
      },
    ];
  } else {
    encode = {
      x: 'category',
      y: 'y',
      color: 'category',
      size: 'size',
    };
    children = [
      {
        type: 'density',
        data: {
          transform: [{ type: 'kde', field: 'value', groupBy: ['category'], size: 20 }],
        },
        encode: encode,
      },
      {
        type: 'boxplot',
        encode: {
          x: 'category',
          y: 'value',
          color: 'category',
          shape: 'violin',
        },
        style: { opacity: 0.5, strokeOpacity: 0.5, point: false },
      },
    ];
  }

  return await createChart({
    devicePixelRatio: 3,
    type: 'view',
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
    children: children,
  });
}
