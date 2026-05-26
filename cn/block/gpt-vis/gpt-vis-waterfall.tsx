'use client';

import type { WaterfallConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisWaterfallProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<WaterfallConfig, 'type'>;
}

export function GPTVisWaterfall({ config, ...props }: GPTVisWaterfallProps) {
  return <GPTVisChart content={{ type: 'waterfall', ...config }} {...props} />;
}
