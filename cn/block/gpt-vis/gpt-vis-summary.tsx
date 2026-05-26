'use client';

import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisSummaryProps extends Omit<GPTVisChartProps, 'content'> {
  /** T8 syntax string for summary visualization */
  config: string;
}

export function GPTVisSummary({ config, ...props }: GPTVisSummaryProps) {
  return <GPTVisChart content={config} {...props} />;
}
