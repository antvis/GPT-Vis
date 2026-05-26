'use client';

import type { VennConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface VennProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<VennConfig, 'type'>;
}

export function Venn({ config, ...props }: VennProps) {
  return <GPTVis content={{ type: 'venn', ...config }} {...props} />;
}
