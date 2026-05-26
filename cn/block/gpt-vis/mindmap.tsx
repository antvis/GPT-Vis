'use client';

import type { MindmapConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface MindmapProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<MindmapConfig, 'type'>;
}

export function Mindmap({ config, ...props }: MindmapProps) {
  return <GPTVis content={{ type: 'mindmap', ...config }} {...props} />;
}
