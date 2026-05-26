'use client';

import type { TreemapConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface TreemapProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<TreemapConfig, 'type'>;
}

export function Treemap({ config, ...props }: TreemapProps) {
  return <GPTVis content={{ type: 'treemap', ...config }} {...props} />;
}
