import { createChart } from '@antv/g2-ssr';
import { type ScatterOptions } from '../type';

export async function Scatter(options: ScatterOptions) {
  const { data, title, width, height, axisYTitle, axisXTitle } = options;
  return await createChart({
    type: 'point',
    data,
    width,
    height,
    title,
    encode: {
      x: 'x',
      y: 'y',
      // shape: 'point',
    },
    axis: {
      x: {
        title: axisXTitle,
      },
      y: {
        title: axisYTitle,
      },
    },
    style: { lineWidth: 1 },
    legend: { size: false },
    animate: false,
    tooltip: false,
  });
}
