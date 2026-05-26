'use client';

import type { WaterfallConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface WaterfallProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<WaterfallConfig, 'type'>;
}

export function Waterfall({ config, ...props }: WaterfallProps) {
  return <GPTVis content={{ type: 'waterfall', ...config }} {...props} />;
}
