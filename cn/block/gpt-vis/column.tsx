'use client';

import type { ColumnConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface ColumnProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<ColumnConfig, 'type'>;
}

export function Column({ config, ...props }: ColumnProps) {
  return <GPTVis content={{ type: 'column', ...config }} {...props} />;
}
