import { createChart } from '@antv/g2-ssr';
import { type LineProps } from '@antv/gpt-vis/dist/esm/Line';
import { BACKGROUND_STYLE } from '../constant';
import { CommonOptions } from './types';

export type LineOptions = CommonOptions & LineProps;

export async function Line(options: LineOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    axisYTitle,
    axisXTitle,
    theme = 'classic',
  } = options;

  const curTheme = theme === 'default' ? 'classic' : theme;
  const hasGroupField = (data || [])[0]?.group !== undefined;

  let encode = {};
  if (hasGroupField) {
    encode = { x: 'time', y: 'value', color: 'group' };
  } else {
    encode = { x: 'time', y: 'value' };
  }

  return await createChart({
    type: 'view',
    title,
    data,
    width,
    height,
    encode: encode,
    theme: curTheme,
    style: { minHeight: 1, ...BACKGROUND_STYLE },
    axis: {
      y: {
        title: axisYTitle || false,
      },
      x: {
        title: axisXTitle || false,
      },
    },
    children: [
      {
        type: 'line',
        encode: { shape: 'line' },
        style: {
          lineWidth: 2,
        },
        ...(!hasGroupField ? { labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] } : {}),
      },
      {
        type: 'point',
        encode: { shape: 'point' },
        style: { fill: 'white', lineWidth: 1 },
      },
    ],
  });
}
