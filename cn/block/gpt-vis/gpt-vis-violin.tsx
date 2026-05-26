'use client';

import type { ViolinConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisViolinProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<ViolinConfig, 'type'>;
}

export function GPTVisViolin({ config, ...props }: GPTVisViolinProps) {
  return <GPTVisChart content={{ type: 'violin', ...config }} {...props} />;
}
