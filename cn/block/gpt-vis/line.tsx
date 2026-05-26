'use client';

import type { LineConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface LineProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<LineConfig, 'type'>;
}

export function Line({ config, ...props }: LineProps) {
  return <GPTVis content={{ type: 'line', ...config }} {...props} />;
}
