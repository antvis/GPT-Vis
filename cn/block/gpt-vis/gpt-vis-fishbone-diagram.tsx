'use client';

import type { FishboneDiagramConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisFishboneDiagramProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<FishboneDiagramConfig, 'type'>;
}

export function GPTVisFishboneDiagram({ config, ...props }: GPTVisFishboneDiagramProps) {
  return <GPTVisChart content={{ type: 'fishbone-diagram', ...config }} {...props} />;
}
