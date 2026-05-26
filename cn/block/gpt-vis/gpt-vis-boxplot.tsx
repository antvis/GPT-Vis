'use client';

import type { BoxplotConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisBoxplotProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<BoxplotConfig, 'type'>;
}

export function GPTVisBoxplot({ config, ...props }: GPTVisBoxplotProps) {
  return <GPTVisChart content={{ type: 'boxplot', ...config }} {...props} />;
}
