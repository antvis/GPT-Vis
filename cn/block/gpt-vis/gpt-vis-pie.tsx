'use client';

import type { PieConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisPieProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<PieConfig, 'type'>;
}

export function GPTVisPie({ config, ...props }: GPTVisPieProps) {
  return <GPTVisChart content={{ type: 'pie', ...config }} {...props} />;
}
