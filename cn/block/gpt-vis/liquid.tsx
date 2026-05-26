'use client';

import type { LiquidConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface LiquidProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<LiquidConfig, 'type'>;
}

export function Liquid({ config, ...props }: LiquidProps) {
  return <GPTVis content={{ type: 'liquid', ...config }} {...props} />;
}
