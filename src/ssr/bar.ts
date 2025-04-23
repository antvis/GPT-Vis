import { createChart } from '@antv/g2-ssr';
import { type BarProps } from '../export';
import { type BaseChartConfig } from './type';

export type BarOptions = BaseChartConfig & { type: 'bar' } & BarProps;
export async function Bar(options: BarOptions) {
  const { data, title, width, height, stack, group, axisYTitle, axisXTitle } = options;
  const hasGroupField = (data || [])[0]?.group !== undefined;

  let transforms: any = [];

  if (group) {
    transforms = [
      {
        type: 'dodgeX',
      },
    ];
  }

  if (stack) {
    transforms = [
      {
        type: 'stackY',
      },
    ];
  }

  return await createChart({
    width,
    height,
    title,
    type: 'interval',
    data,
    encode: hasGroupField
      ? {
          x: 'category',
          y: 'value',
          color: 'group',
        }
      : {
          x: 'category',
          y: 'value',
        },
    transform: transforms,
    coordinate: { transform: [{ type: 'transpose' }] },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
    axis: {
      x: {
        title: axisXTitle,
      },
      y: {
        title: axisYTitle,
      },
    },
  });
}
