'use client';

import type { ColumnConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisColumnProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<ColumnConfig, 'type'>;
}

export function GPTVisColumn({ config, ...props }: GPTVisColumnProps) {
  return <GPTVisChart content={{ type: 'column', ...config }} {...props} />;
}
