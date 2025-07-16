import { createChart } from '@antv/g2-ssr';
import { type ScatterProps } from '@antv/gpt-vis/dist/esm/Scatter';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

export type ScatterOptions = CommonOptions & ScatterProps;

export async function Scatter(options: ScatterOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    axisYTitle,
    axisXTitle,
    theme = 'default',
    renderPlugins,
    texture = 'default',
  } = options;

  return await createChart({
    devicePixelRatio: 3,
    type: 'point',
    theme: THEME_MAP[theme],
    data,
    width,
    height,
    title: getTitle(title, texture),
    encode: {
      x: 'x',
      y: 'y',
      // shape: 'point',
    },
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
    style: { lineWidth: 1 },
    legend: { size: false },
    animate: false,
    tooltip: false,
    scale: {
      y: {
        nice: true,
      },
    },
    renderPlugins,
  });
}
