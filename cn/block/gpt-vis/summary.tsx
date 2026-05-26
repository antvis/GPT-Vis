'use client';

import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface SummaryProps extends Omit<GPTVisProps, 'content'> {
  /** T8 syntax string for summary visualization */
  config: string;
}

export function Summary({ config, ...props }: SummaryProps) {
  return <GPTVis content={config} {...props} />;
}
