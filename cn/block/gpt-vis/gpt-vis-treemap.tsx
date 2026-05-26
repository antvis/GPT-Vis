'use client';

import type { TreemapConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisTreemapProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<TreemapConfig, 'type'>;
}

export function GPTVisTreemap({ config, ...props }: GPTVisTreemapProps) {
  return <GPTVisChart content={{ type: 'treemap', ...config }} {...props} />;
}
