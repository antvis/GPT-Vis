import type { BarConfig } from '@ant-design/plots';
import { Bar as ADCBar } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

type BarDataItem = {
  category: string;
  value: number;
  [key: string]: string | number;
};

export type BarProps = BasePlotProps<BarDataItem> & Partial<BarConfig>;

const defaultConfig = (props: BarConfig): BarConfig => {
  const { data, xField = 'category', yField = 'value' } = props;
  const hasGroupField = get(data, '[0].group') !== undefined;
  const axisYTitle = get(props, 'axis.y.title');

  return {
    xField,
    yField,
    colorField: hasGroupField ? 'group' : undefined,
    tooltip: (d) => {
      const tooltipName = axisYTitle || d[xField as string];
      return {
        name: tooltipName,
        value: d[yField as string],
      };
    },
    style: {
      // 圆角样式
      radiusTopLeft: 5,
      radiusTopRight: 5,
    },
  };
};

const Bar = (props: BarProps) => {
  const config = usePlotConfig<BarConfig>('Bar', defaultConfig, props);

  return <ADCBar {...config} />;
};

export default Bar;
