import type { ScatterConfig } from '@ant-design/plots';
import { Scatter as ADCScatter } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Theme } from '../types';

type ScatterDataItem = {
  x: number;
  y: number;
  [key: string]: string | number;
};

export type ScatterProps = BasePlotProps<ScatterDataItem> & Partial<ScatterConfig> & Theme;

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
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Scatter', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as ScatterConfig;

  return <ADCScatter {...config} />;
};

export default Scatter;
