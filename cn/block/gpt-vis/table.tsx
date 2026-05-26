'use client';

import type { TableConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface TableProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<TableConfig, 'type'>;
}

export function Table({ config, ...props }: TableProps) {
  return <GPTVis content={{ type: 'table', ...config }} {...props} />;
}
