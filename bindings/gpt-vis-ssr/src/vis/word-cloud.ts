import { createChart } from '@antv/g2-ssr';
import { type WordCloudProps } from '@antv/gpt-vis/dist/esm/WordCloud';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { CommonOptions } from './types';

type WordCloudStyle = {
  texture?: 'rough' | 'default';
};

export type WordCloudOptions = CommonOptions &
  WordCloudProps & {
    style?: WordCloudStyle;
  };

// do not support texture
export async function WordCloud(options: WordCloudOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    theme = 'default',
    style = {},
    renderPlugins,
  } = options;
  const { texture = 'default' } = style;

  return await createChart({
    devicePixelRatio: 3,
    type: 'wordCloud',
    theme: THEME_MAP[theme],
    layout: {
      fontSize: [8, 42],
    },
    style: {
      ...(texture === 'rough' ? { fontFamily: FontFamily.ROUGH } : {}),
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
    renderPlugins,
  });
}
