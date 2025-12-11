import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type DualAxesStyle = {
  backgroundColor?: string;
  palette?: string[];
  texture?: 'rough' | 'default';
  startAtZero?: boolean;
};

type DualAxesSeriesItem = {
  type: string;
  data: number[];
  axisYTitle?: string;
};

export type DualAxesOptions = CommonOptions & {
  title?: string;
  categories: string[];
  series: DualAxesSeriesItem[];
  axisXTitle?: string;
  legendTypeList?: string[];
  style?: DualAxesStyle;
};

export async function DualAxes(options: DualAxesOptions) {
  const {
    series,
    categories,
    title,
    width = 600,
    height = 400,
    theme = 'default',
    renderPlugins,
    style = {},
    axisXTitle = '',
  } = options;
  enum ChartType {
    Column = 'column',
    Line = 'line',
  }
  const { backgroundColor, palette, texture = 'default', startAtZero = false } = style;
  const hasPalette = !!palette?.[0];
  const paletteConfig = {
    color: {
      range: palette,
    },
  };
  let radiusStyle = {};

  if (theme === 'default') {
    radiusStyle = { radiusTopLeft: 4, radiusTopRight: 4 };
  }

  if (texture === 'rough') {
    radiusStyle = {
      lineWidth: 1,
      ...radiusStyle,
    };
  }

  function getTitleFontStyle(texture: DualAxesOptions['texture']) {
    return texture === 'rough'
      ? { titleFontFamily: FontFamily.ROUGH, labelFontFamily: FontFamily.ROUGH }
      : {};
  }

  function transform(
    series: DualAxesSeriesItem[],
    categories: string[],
    startAtZero: boolean = false,
  ) {
    const newChildren = series
      .sort((a, b) => {
        const ORDER = ['column', 'line'];
        return ORDER.indexOf(a.type) - ORDER.indexOf(b.type);
      })
      .map((item: any) => {
        const { type, axisYTitle, data, ...others } = item;

        const baseConfig = {
          ...others,
          axis: {
            y: {
              title: axisYTitle,
              ...getTitleFontStyle(texture),
            },
            x: {
              ...getTitleFontStyle(texture),
            },
          },
          encode: { x: 'category', y: axisYTitle, color: () => axisYTitle },
          scale: {
            y: { nice: true, zero: startAtZero },
          },
          legend: {
            color: {
              itemMarker: (v: any) => {
                if (v === axisYTitle) return 'smooth';
                return 'rect';
              },
              ...(texture === 'rough' ? { itemLabelFontFamily: FontFamily.ROUGH } : {}),
            },
          },
        };

        if (type === ChartType.Column) {
          return {
            ...baseConfig,
            type: 'interval',
            style: { columnWidthRatio: 0.8, ...radiusStyle },
            ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
            scale: {
              y: { nice: true, zero: startAtZero },
              ...(hasPalette ? paletteConfig : {}),
            },
          };
        }

        if (type === ChartType.Line) {
          return {
            ...baseConfig,
            type,
            axis: {
              y: {
                position: 'right',
                title: axisYTitle,
                ...getTitleFontStyle(texture),
              },
            },
            encode: { x: 'category', y: axisYTitle, shape: 'smooth', color: () => axisYTitle },
            style: { lineWidth: 2 },
            scale: {
              y: { independent: true, zero: startAtZero },
              ...(hasPalette ? paletteConfig : {}),
            },
          };
        }

        return baseConfig;
      });

    const newData = categories.map((item: string, index: number) => {
      const temp = {
        category: item,
      } as {
        category: string;
        [key: string]: any;
      };
      series.forEach((s: DualAxesSeriesItem, i: number) => {
        const defaultYField = s.axisYTitle || `value_${i + 1}`;
        temp[defaultYField] = s.data[index];
      });
      return temp;
    });

    // todo: GPT-Vis 的 legendTypeList 是必选，不合理
    const legendTypeList = series.map((item: any) => {
      return item.type === ChartType.Line ? 'smooth' : 'rect';
    });

    return {
      children: newChildren,
      data: newData,
      legendTypeList,
    };
  }

  const config = transform(series, categories, startAtZero);

  return await createChart({
    devicePixelRatio: 3,
    type: 'view',
    theme: THEME_MAP[theme],
    autoFit: true,
    title: getTitle(title, texture),
    width,
    height,
    ...config,
    ...(axisXTitle
      ? {
          axis: {
            x: {
              title: axisXTitle,
              ...getTitleFontStyle(texture),
            },
          },
        }
      : {}),
    scale: {
      y: {
        nice: true,
      },
    },
    renderPlugins,
  });
}
