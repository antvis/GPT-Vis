'use client';

import type { NetworkGraphConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisNetworkGraphProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<NetworkGraphConfig, 'type'>;
}

export function GPTVisNetworkGraph({ config, ...props }: GPTVisNetworkGraphProps) {
  return <GPTVisChart content={{ type: 'network-graph', ...config }} {...props} />;
}
