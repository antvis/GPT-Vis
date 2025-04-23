import { createChart } from '@antv/g2-ssr';
import { type HistogramProps } from '../export';
import { type BaseChartConfig } from './type';

export type HistogramOptions = BaseChartConfig & { type: 'histogram' } & HistogramProps;

export async function Histogram(options: HistogramOptions) {
  const { data, title, width, height, axisYTitle, axisXTitle, binNumber } = options;
  // TODO 有问题
  return await createChart({
    type: 'interval',
    width,
    height,
    data,
    title,
    encode: {
      x: (d: any) => d,
      y: 'count',
    },
    transform: [{ type: 'binX', y: 'count', thresholds: binNumber }],
    style: { minHeight: 1, columnWidthRatio: 1, inset: 0.5 },
    axis: {
      x: { title: axisXTitle },
      y: { title: axisYTitle },
    },
    animate: false,
  });
}
