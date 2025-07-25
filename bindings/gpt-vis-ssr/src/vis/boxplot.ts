import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type BoxplotStyle = {
  texture?: 'rough' | 'default';
};

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
  /**
   * The custom style for the boxplot chart.
   */
  style?: BoxplotStyle;
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
    renderPlugins,
    style = {},
  } = options;

  const { texture = 'default' } = style;

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
    devicePixelRatio: 3,
    type: 'boxplot',
    theme: THEME_MAP[theme],
    width,
    height,
    title: getTitle(title, texture),
    autoFit: true,
    data,
    axis: {
      y: {
        title: axisYTitle || false,
        ...(texture === 'rough'
          ? { titleFontFamily: FontFamily.ROUGH, labelFontFamily: FontFamily.ROUGH }
          : {}),
      },
      x: {
        title: axisXTitle || false,
        ...(texture === 'rough'
          ? { titleFontFamily: FontFamily.ROUGH, labelFontFamily: FontFamily.ROUGH }
          : {}),
      },
    },
    encode: encode,
    scale: {
      x: { paddingInner: 0.6, paddingOuter: 0.3 },
      series: { paddingInner: 0.3, paddingOuter: 0.1 },
      y: { nice: true },
    },
    style: { stroke: 'black', ...(texture === 'rough' ? { lineWidth: 1 } : {}) },
    legend: {
      color: {
        ...(texture === 'rough' ? { itemLabelFontFamily: FontFamily.ROUGH } : {}),
      },
    },
    renderPlugins,
  });
}
