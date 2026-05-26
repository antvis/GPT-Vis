'use client';

import type { IndentedTreeConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisIndentedTreeProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<IndentedTreeConfig, 'type'>;
}

export function GPTVisIndentedTree({ config, ...props }: GPTVisIndentedTreeProps) {
  return <GPTVisChart content={{ type: 'indented-tree', ...config }} {...props} />;
}
