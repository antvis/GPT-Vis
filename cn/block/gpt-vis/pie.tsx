'use client';

import type { PieConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface PieProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<PieConfig, 'type'>;
}

export function Pie({ config, ...props }: PieProps) {
  return <GPTVis content={{ type: 'pie', ...config }} {...props} />;
}
