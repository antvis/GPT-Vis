import { createChart } from '@antv/g2-ssr';
import { type AreaProps } from '@antv/gpt-vis/dist/esm/Area';
import { BACKGROUND_STYLE } from '../constant';
import { CommonOptions } from './types';
export type AreaOptions = CommonOptions & AreaProps;

export async function Area(options: AreaOptions) {
  const { data, title, width, height, stack, axisYTitle, axisXTitle, theme = 'light' } = options;

  let encode = {};
  let transform: any = [];
  if (stack) {
    encode = { x: 'time', y: 'value', color: 'group' };
    transform = [{ type: 'stackY' }];
  } else {
    encode = { x: 'time', y: 'value' };
  }

  return await createChart({
    type: 'view',
    theme,
    title,
    data,
    width,
    height,
    encode,
    transform,
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
        type: 'area',
        style: { fillOpacity: 0.6 },
        encode: { shape: 'smooth' },
      },
      {
        type: 'line',
        style: { lineWidth: 1, strokeOpacity: 0.6 },
        encode: { shape: 'smooth' },
      },
    ],
  });
}
