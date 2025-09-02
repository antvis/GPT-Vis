import { createChart } from '@antv/g2-ssr';
import { type HistogramProps } from '@antv/gpt-vis/dist/esm/Histogram';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type HistogramStyle = {
  backgroundColor?: string;
  texture?: 'rough' | 'default';
  palette?: string[];
};

export type HistogramOptions = CommonOptions &
  HistogramProps & {
    style?: HistogramStyle;
  };

export async function Histogram(options: HistogramOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    axisYTitle,
    axisXTitle,
    binNumber,
    theme = 'default',
    renderPlugins,
    style = {},
  } = options;
  const { backgroundColor, palette, texture = 'default' } = style;

  return await createChart({
    devicePixelRatio: 3,
    type: 'interval',
    theme: THEME_MAP[theme],
    width,
    height,
    data,
    title: getTitle(title, texture),
    encode: {
      x: (d: any) => d,
      y: 'count',
      color: () => 'all',
    },
    transform: [{ type: 'binX', y: 'count', thresholds: binNumber }],
    style: {
      minHeight: 1,
      columnWidthRatio: 1,
      inset: 0.5,
      ...(texture === 'rough' ? { lineWidth: 1 } : {}),
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
    axis: {
      x: {
        title: axisXTitle,
        ...(texture === 'rough'
          ? { titleFontFamily: FontFamily.ROUGH, labelFontFamily: FontFamily.ROUGH }
          : {}),
      },
      y: {
        title: axisYTitle,
        ...(texture === 'rough'
          ? { titleFontFamily: FontFamily.ROUGH, labelFontFamily: FontFamily.ROUGH }
          : {}),
      },
    },
    legend: {
      size: false,
      color: {
        ...(texture === 'rough' ? { itemLabelFontFamily: FontFamily.ROUGH } : {}),
      },
    },
    animate: false,
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
    renderPlugins,
  });
}
