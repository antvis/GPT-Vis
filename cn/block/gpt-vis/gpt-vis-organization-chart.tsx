'use client';

import type { OrganizationChartConfig } from '@antv/gpt-vis';
import { GPTVisChart, type GPTVisChartProps } from './gpt-vis-chart';

export interface GPTVisOrganizationChartProps extends Omit<GPTVisChartProps, 'content'> {
  config: Omit<OrganizationChartConfig, 'type'>;
}

export function GPTVisOrganizationChart({ config, ...props }: GPTVisOrganizationChartProps) {
  return <GPTVisChart content={{ type: 'organization-chart', ...config }} {...props} />;
}
