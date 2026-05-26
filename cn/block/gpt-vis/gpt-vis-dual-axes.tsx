'use client';

import type { DualAxesConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisDualAxesProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<DualAxesConfig, 'type'>;
}

export function GPTVisDualAxes({ config, ...props }: GPTVisDualAxesProps) {
  return <GPTVisChart content={{ type: 'dual-axes', ...config }} {...props} />;
}
