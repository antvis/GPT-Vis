'use client';

import type { FishboneDiagramConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface FishboneDiagramProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<FishboneDiagramConfig, 'type'>;
}

export function FishboneDiagram({ config, ...props }: FishboneDiagramProps) {
  return <GPTVis content={{ type: 'fishbone-diagram', ...config }} {...props} />;
}
