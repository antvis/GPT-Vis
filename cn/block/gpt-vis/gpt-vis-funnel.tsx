'use client';

import type { FunnelConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisFunnelProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<FunnelConfig, 'type'>;
}

export function GPTVisFunnel({ config, ...props }: GPTVisFunnelProps) {
  return <GPTVisChart content={{ type: 'funnel', ...config }} {...props} />;
}
