import { createChart } from '@antv/g2-ssr';
import { type WordCloudProps } from '@antv/gpt-vis/dist/esm/WordCloud';
import { THEME_MAP } from '../constant';
import { CommonOptions } from './types';

export type WordCloudOptions = CommonOptions & WordCloudProps;

// do not support texture
export async function WordCloud(options: WordCloudOptions) {
  const { data, title, width, height, theme = 'default' } = options;
  return await createChart({
    type: 'wordCloud',
    theme: THEME_MAP[theme],
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
