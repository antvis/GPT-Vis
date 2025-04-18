import { createChart } from '@antv/g2-ssr';
import { type ColumnOptions } from '../type';

export async function Column(options: ColumnOptions) {
  const { data, title, width, height, axisYTitle, axisXTitle, group, stack } = options;
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
    data,
    type: 'interval',
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
