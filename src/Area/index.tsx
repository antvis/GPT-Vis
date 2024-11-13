import type { AreaConfig } from '@ant-design/plots';
import { Area as ADCArea } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

type AreaDataItem = {
  time: string | number;
  value: number;
  [key: string]: string | number;
};

export type AreaProps = BasePlotProps<AreaDataItem> & Partial<AreaConfig>;

const defaultConfig = (props: AreaConfig): AreaConfig => {
  const { data, xField = 'time', yField = 'value' } = props;
  const hasGroupField = get(data, '[0].group') !== undefined;
  const axisYTitle = get(props, 'axis.y.title');
  const defalutStyle = hasGroupField ? {} : { opacity: 0.6 };

  return {
    xField,
    yField,
    style: defalutStyle,
    colorField: hasGroupField ? 'group' : undefined,
    tooltip: (d: Record<string, string | number>) => {
      const tooltipName = axisYTitle || d[xField as string];
      return {
        name: tooltipName,
        value: d[yField as string],
      };
    },
  };
};

const Area = (props: AreaProps) => {
  const config = usePlotConfig<AreaConfig>('Area', defaultConfig, props);

  return <ADCArea {...config} />;
};

export default Area;
