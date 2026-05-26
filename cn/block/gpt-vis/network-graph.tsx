'use client';

import type { NetworkGraphConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface NetworkGraphProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<NetworkGraphConfig, 'type'>;
}

export function NetworkGraph({ config, ...props }: NetworkGraphProps) {
  return <GPTVis content={{ type: 'network-graph', ...config }} {...props} />;
}
