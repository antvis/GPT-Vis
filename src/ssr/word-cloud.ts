import { createChart } from '@antv/g2-ssr';
import { type WordCloudProps } from '../export';
import { type BaseChartConfig } from './type';

export type WordCloudOptions = BaseChartConfig & { type: 'word-cloud' } & WordCloudProps;

export async function WordCloud(options: WordCloudOptions) {
  const { data, title, width, height } = options;
  return await createChart({
    type: 'wordCloud',
    layout: {
      fontSize: [8, 42],
    },
    title,
    data,
    width,
    height,
    encode: {
      text: 'text',
      color: 'text',
      value: 'value',
    },
    legend: false,
  });
}
