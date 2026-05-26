'use client';

import type { AreaConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface AreaProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<AreaConfig, 'type'>;
}

export function Area({ config, ...props }: AreaProps) {
  return <GPTVis content={{ type: 'area', ...config }} {...props} />;
}
