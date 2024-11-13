import type { ScatterConfig } from '@ant-design/plots';
import { Scatter as ADCScatter } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

type ScatterDataItem = {
  x: number;
  y: number;
  [key: string]: string | number;
};

export type ScatterProps = BasePlotProps<ScatterDataItem> & Partial<ScatterConfig>;

const defaultConfig = (props: ScatterConfig): ScatterConfig => {
  const { data, xField = 'x', yField = 'y' } = props;
  const axisXTitle = get(props, 'axis.x.title');
  const axisYTitle = get(props, 'axis.y.title');

  return {
    data,
    xField,
    yField,
    tooltip: [
      { channel: 'x', name: axisXTitle || 'x' },
      { channel: 'y', name: axisYTitle || 'y' },
    ],
  };
};

const Scatter = (props: ScatterProps) => {
  const config = usePlotConfig<ScatterConfig>('Scatter', defaultConfig, props);

  return <ADCScatter {...config} />;
};

export default Scatter;
