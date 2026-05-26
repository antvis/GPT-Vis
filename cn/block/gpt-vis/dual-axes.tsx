'use client';

import type { DualAxesConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface DualAxesProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<DualAxesConfig, 'type'>;
}

export function DualAxes({ config, ...props }: DualAxesProps) {
  return <GPTVis content={{ type: 'dual-axes', ...config }} {...props} />;
}
