'use client';

import type { MindmapConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisMindmapProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<MindmapConfig, 'type'>;
}

export function GPTVisMindmap({ config, ...props }: GPTVisMindmapProps) {
  return <GPTVisChart content={{ type: 'mindmap', ...config }} {...props} />;
}
