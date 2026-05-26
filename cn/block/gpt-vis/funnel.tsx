'use client';

import type { FunnelConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface FunnelProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<FunnelConfig, 'type'>;
}

export function Funnel({ config, ...props }: FunnelProps) {
  return <GPTVis content={{ type: 'funnel', ...config }} {...props} />;
}
