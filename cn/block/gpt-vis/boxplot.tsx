'use client';

import type { BoxplotConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface BoxplotProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<BoxplotConfig, 'type'>;
}

export function Boxplot({ config, ...props }: BoxplotProps) {
  return <GPTVis content={{ type: 'boxplot', ...config }} {...props} />;
}
