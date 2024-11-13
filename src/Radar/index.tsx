import type { RadarConfig } from '@ant-design/plots';
import { Radar as ADCRadar } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

export type RadarDataItem = {
  name: string;
  value: number;
  [key: string]: string | number;
};

export type RadarProps = BasePlotProps<RadarDataItem> & Partial<RadarConfig>;

const defaultConfig = (props: RadarConfig): RadarConfig => {
  const { data, xField = 'name', yField = 'value' } = props;
  const hasGroupField = get(data, '[0].group') !== undefined;

  return {
    xField,
    yField,
    colorField: hasGroupField ? 'group' : undefined,
    area: {
      style: {
        fillOpacity: 0.5,
      },
    },
    scale: {
      x: {
        padding: 0.6,
        align: 0,
      },
      y: {
        nice: true,
      },
    },
    axis: {
      x: {
        title: false,
        grid: true,
      },
      y: {
        zIndex: 1,
        title: false,
        gridConnect: 'line',
        gridLineWidth: 1,
      },
    },
    tooltip: (d) => {
      return {
        name: d[xField as string],
        value: d[yField as string],
      };
    },
  };
};

const Radar = (props: RadarProps) => {
  const config = usePlotConfig<RadarConfig>('Radar', defaultConfig, props);

  return <ADCRadar {...config} />;
};

export default Radar;
