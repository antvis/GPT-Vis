'use client';

import type { OrganizationChartConfig } from '@antv/gpt-vis';
import { GPTVis, type GPTVisProps } from './gpt-vis';

export interface OrganizationChartProps extends Omit<GPTVisProps, 'content'> {
  config: Omit<OrganizationChartConfig, 'type'>;
}

export function OrganizationChart({ config, ...props }: OrganizationChartProps) {
  return <GPTVis content={{ type: 'organization-chart', ...config }} {...props} />;
}
