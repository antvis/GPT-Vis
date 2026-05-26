'use client';

import type { BarConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisBarProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<BarConfig, 'type'>;
}

export function GPTVisBar({ config, ...props }: GPTVisBarProps) {
  return <GPTVisChart content={{ type: 'bar', ...config }} {...props} />;
}
