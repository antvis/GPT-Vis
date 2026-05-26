'use client';

import type { FlowDiagramConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisFlowDiagramProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<FlowDiagramConfig, 'type'>;
}

export function GPTVisFlowDiagram({ config, ...props }: GPTVisFlowDiagramProps) {
  return <GPTVisChart content={{ type: 'flow-diagram', ...config }} {...props} />;
}
