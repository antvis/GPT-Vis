'use client';

import type { RadarConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisRadarProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<RadarConfig, 'type'>;
}

export function GPTVisRadar({ config, ...props }: GPTVisRadarProps) {
  return <GPTVisChart content={{ type: 'radar', ...config }} {...props} />;
}
