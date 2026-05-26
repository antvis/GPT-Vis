'use client';

import type { SankeyConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface SankeyProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<SankeyConfig, 'type'>;
}

export function Sankey({ config, ...props }: SankeyProps) {
  return <GPTVis content={{ type: 'sankey', ...config }} {...props} />;
}
