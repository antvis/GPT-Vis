import { createChart } from '@antv/g2-ssr';
import { type AreaProps } from '../export';
import { type BaseChartConfig } from './type';

export type AreaOptions = BaseChartConfig & { type: 'area' } & AreaProps;
export async function Area(options: AreaOptions) {
  const { data, title, width, height, stack, axisYTitle, axisXTitle } = options;

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
    title,
    data,
    width,
    height,
    encode,
    transform,
    style: { minHeight: 1 },
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
        style: { opacity: 0.7 },
      },
    ],
  });
}
