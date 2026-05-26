'use client';

import type { VennConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisVennProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<VennConfig, 'type'>;
}

export function GPTVisVenn({ config, ...props }: GPTVisVennProps) {
  return <GPTVisChart content={{ type: 'venn', ...config }} {...props} />;
}
