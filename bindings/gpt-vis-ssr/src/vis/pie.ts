import { createChart } from '@antv/g2-ssr';
import { type PieProps } from '@antv/gpt-vis/dist/esm/Pie';
import { BACKGROUND_STYLE } from '../constant';
import { CommonOptions } from './types';

export type PieOptions = CommonOptions & PieProps;

export async function Pie(options: PieOptions) {
  const { data, title, width, height, innerRadius, theme = 'light' } = options;

  return await createChart({
    type: 'interval',
    theme,
    title,
    width,
    height,
    data,
    encode: { y: 'value', color: 'category' },
    transform: [{ type: 'stackY' }],
    coordinate: {
      type: 'theta',
      outerRadius: 0.95,
      innerRadius,
    },
    style: {
      radius: 4,
      stroke: '#fff',
      lineWidth: 1,
    },
    viewStyle: {
      ...BACKGROUND_STYLE,
    },
    labels: [
      {
        text: (data: any) => `${data.category}: ${data.value}`,
        position: 'outside',
        radius: 0.85,
        fontSize: 12,
      },
    ],
    legend: {
      color: { position: 'bottom', layout: { justifyContent: 'center' } },
    },
    animate: false,
    axis: false,
  });
}
