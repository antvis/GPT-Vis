'use client';

import type { ScatterConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface ScatterProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<ScatterConfig, 'type'>;
}

export function Scatter({ config, ...props }: ScatterProps) {
  return <GPTVis content={{ type: 'scatter', ...config }} {...props} />;
}
