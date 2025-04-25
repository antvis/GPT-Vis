import { createChart } from '@antv/g2-ssr';
import { type LineProps } from '@antv/gpt-vis/dist/esm/Line';
import { CommonOptions } from './types';

export type LineOptions = CommonOptions & LineProps;

export async function Line(options: LineOptions) {
  const { data, title, width = 600, height = 400, axisYTitle, axisXTitle } = options;
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
        type: 'line',
      },
    ],
  });
}
