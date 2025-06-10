import type { FunnelConfig } from '@ant-design/plots';
import { Funnel as ADCFunnel } from '@ant-design/plots';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

type FunnelDataItem = {
  type: string;
  value: number;
  [key: string]: string | number;
};

export type FunnelProps = BasePlotProps<FunnelDataItem> & Partial<FunnelConfig>;

const defaultConfig = (props: FunnelConfig): FunnelConfig => {
  const { xField = 'type', yField = 'value', data } = props;

  return {
    data,
    xField,
    yField,
    label: {
      text: (d: any) => `${d.type}\n${d.value}`,
    },
    axis: {
      x: false,
      y: false,
    },
  };
};

const Funnel = (props: FunnelProps) => {
  const config = usePlotConfig<FunnelProps>('Funnel', defaultConfig, props);

  return <ADCFunnel {...config} />;
};

export default Funnel;
