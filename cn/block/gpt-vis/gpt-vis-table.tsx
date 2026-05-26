'use client';

import type { TableConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisTableProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<TableConfig, 'type'>;
}

export function GPTVisTable({ config, ...props }: GPTVisTableProps) {
  return <GPTVisChart content={{ type: 'table', ...config }} {...props} />;
}
