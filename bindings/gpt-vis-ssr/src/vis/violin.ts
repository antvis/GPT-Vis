import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type ViolinDatum = {
  category: string;
  value: number;
  group?: string;
};

type ViolinStyle = {
  backgroundColor?: string;
  texture?: 'rough' | 'default';
  palette?: string[];
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
  /**
   * The custom style for the violin chart.
   */
  style?: ViolinStyle;
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
    renderPlugins,
    style = {},
  } = options;

  const { backgroundColor, palette, texture = 'default' } = style;
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
        scale: {
          y: {
            nice: true,
          },
          ...(palette?.[0]
            ? {
                color: {
                  range: palette,
                },
              }
            : {}),
        },
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
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
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
        scale: {
          y: {
            nice: true,
          },
          ...(palette?.[0]
            ? {
                color: {
                  range: palette,
                },
              }
            : {}),
        },
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
        scale: {
          y: {
            nice: true,
          },
        },
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
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
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
        scale: {
          y: {
            nice: true,
          },
          ...(palette?.[0]
            ? {
                color: {
                  range: palette,
                },
              }
            : {}),
        },
      },
    ];
  }

  return await createChart({
    devicePixelRatio: 3,
    type: 'view',
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
    children: children,
    scale: {
      y: {
        nice: true,
      },
    },
    renderPlugins,
    legend: {
      color: {
        ...(texture === 'rough' ? { itemLabelFontFamily: FontFamily.ROUGH } : {}),
      },
    },
    style: {
      ...(texture === 'rough' ? { lineWidth: 1 } : {}),
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
  });
}
