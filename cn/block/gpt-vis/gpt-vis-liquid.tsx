'use client';

import type { LiquidConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisLiquidProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<LiquidConfig, 'type'>;
}

export function GPTVisLiquid({ config, ...props }: GPTVisLiquidProps) {
  return <GPTVisChart content={{ type: 'liquid', ...config }} {...props} />;
}
