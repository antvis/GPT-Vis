'use client';

import type { IndentedTreeConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface IndentedTreeProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<IndentedTreeConfig, 'type'>;
}

export function IndentedTree({ config, ...props }: IndentedTreeProps) {
  return <GPTVis content={{ type: 'indented-tree', ...config }} {...props} />;
}
