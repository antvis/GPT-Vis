'use client';

import type { FlowDiagramConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface FlowDiagramProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<FlowDiagramConfig, 'type'>;
}

export function FlowDiagram({ config, ...props }: FlowDiagramProps) {
  return <GPTVis content={{ type: 'flow-diagram', ...config }} {...props} />;
}
