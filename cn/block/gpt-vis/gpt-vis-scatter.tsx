'use client';

import type { ScatterConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisScatterProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<ScatterConfig, 'type'>;
}

export function GPTVisScatter({ config, ...props }: GPTVisScatterProps) {
  return <GPTVisChart content={{ type: 'scatter', ...config }} {...props} />;
}
