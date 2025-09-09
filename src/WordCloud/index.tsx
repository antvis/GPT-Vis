import type { WordCloudConfig } from '@ant-design/plots';
import { WordCloud as ADCWordCloud } from '@ant-design/plots';
import React, { type FC } from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type WordCloudDataItem = {
  text: string;
  value: number;
};

const defaultConfig = (props: WordCloudConfig): WordCloudConfig => {
  const { data, style = {} } = props;
  const { backgroundColor, palette } = style;
  const hasPalette = !!palette?.[0];
  let paletteConfig: any = { color: undefined };

  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }

  return {
    data,
    layout: { fontSize: [20, 100] },
    colorField: 'text',
    legend: false,
    tooltip: false,
    encode: {
      text: 'text',
      color: 'text',
      value: 'value',
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : { viewStyle: undefined }),
    scale: {
      ...paletteConfig,
    },
  };
};

export type WordCloudProps = BasePlotProps<WordCloudDataItem> & Theme & Style;

const WordCloud: FC<WordCloudProps> = (props) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('WordCloud', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as WordCloudConfig;

  return <ADCWordCloud {...config} />;
};

export default WordCloud;
