'use client';

import type { HistogramConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisHistogramProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<HistogramConfig, 'type'>;
}

export function GPTVisHistogram({ config, ...props }: GPTVisHistogramProps) {
  return <GPTVisChart content={{ type: 'histogram', ...config }} {...props} />;
}
