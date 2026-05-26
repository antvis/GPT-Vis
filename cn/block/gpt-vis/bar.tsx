'use client';

import type { BarConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface BarProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<BarConfig, 'type'>;
}

export function Bar({ config, ...props }: BarProps) {
  return <GPTVis content={{ type: 'bar', ...config }} {...props} />;
}
