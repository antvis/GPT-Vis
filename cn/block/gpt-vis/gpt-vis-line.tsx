'use client';

import type { LineConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisLineProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<LineConfig, 'type'>;
}

export function GPTVisLine({ config, ...props }: GPTVisLineProps) {
  return <GPTVisChart content={{ type: 'line', ...config }} {...props} />;
}
