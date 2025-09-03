import type { WordCloudConfig } from '@ant-design/plots';
import { WordCloud as ADCWordCloud } from '@ant-design/plots';
import React, { type FC } from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Theme } from '../types';

type WordCloudDataItem = {
  text: string;
  value: number;
};

const defaultConfig = {
  autoFit: true,
  layout: { fontSize: [20, 100] },
  colorField: 'text',
  legend: false,
  tooltip: false,
};

export type WordCloudProps = BasePlotProps<WordCloudDataItem> & Partial<WordCloudConfig> & Theme;

const WordCloud: FC<WordCloudProps> = (props) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('WordCloud', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as WordCloudConfig;

  return <ADCWordCloud {...config} />;
};

export default WordCloud;
