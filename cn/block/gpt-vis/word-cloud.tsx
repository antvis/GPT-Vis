'use client';

import type { WordCloudConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface WordCloudProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<WordCloudConfig, 'type'>;
}

export function WordCloud({ config, ...props }: WordCloudProps) {
  return <GPTVis content={{ type: 'word-cloud', ...config }} {...props} />;
}
