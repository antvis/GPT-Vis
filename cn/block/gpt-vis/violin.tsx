'use client';

import type { ViolinConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface ViolinProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<ViolinConfig, 'type'>;
}

export function Violin({ config, ...props }: ViolinProps) {
  return <GPTVis content={{ type: 'violin', ...config }} {...props} />;
}
