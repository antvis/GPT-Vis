'use client';

import type { AreaConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisAreaProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<AreaConfig, 'type'>;
}

export function GPTVisArea({ config, ...props }: GPTVisAreaProps) {
  return <GPTVisChart content={{ type: 'area', ...config }} {...props} />;
}
