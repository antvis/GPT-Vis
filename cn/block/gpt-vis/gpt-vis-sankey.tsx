'use client';

import type { SankeyConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisSankeyProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<SankeyConfig, 'type'>;
}

export function GPTVisSankey({ config, ...props }: GPTVisSankeyProps) {
  return <GPTVisChart content={{ type: 'sankey', ...config }} {...props} />;
}
