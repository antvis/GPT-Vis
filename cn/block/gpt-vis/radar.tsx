'use client';

import type { RadarConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface RadarProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<RadarConfig, 'type'>;
}

export function Radar({ config, ...props }: RadarProps) {
  return <GPTVis content={{ type: 'radar', ...config }} {...props} />;
}
