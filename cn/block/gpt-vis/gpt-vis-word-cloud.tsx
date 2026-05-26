'use client';

import type { WordCloudConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisWordCloudProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<WordCloudConfig, 'type'>;
}

export function GPTVisWordCloud({ config, ...props }: GPTVisWordCloudProps) {
  return <GPTVisChart content={{ type: 'word-cloud', ...config }} {...props} />;
}
