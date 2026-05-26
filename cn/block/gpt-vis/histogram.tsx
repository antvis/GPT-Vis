'use client';

import type { HistogramConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface HistogramProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<HistogramConfig, 'type'>;
}

export function Histogram({ config, ...props }: HistogramProps) {
  return <GPTVis content={{ type: 'histogram', ...config }} {...props} />;
}
