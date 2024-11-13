import type { WordCloudConfig } from '@ant-design/plots';
import { WordCloud as ADCWordCloud } from '@ant-design/plots';
import React, { type FC } from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

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

export type WordCloudProps = BasePlotProps<WordCloudDataItem> & Partial<WordCloudConfig>;

const WordCloud: FC<WordCloudProps> = (props) => {
  const config = usePlotConfig<WordCloudConfig>('WordCloud', defaultConfig, props);

  return <ADCWordCloud {...config} />;
};

export default WordCloud;
