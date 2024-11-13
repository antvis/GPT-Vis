import type { ColumnConfig } from '@ant-design/plots';
import { Column as ADCColumn } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

export type ColumnDataItem = {
  category: string | number;
  value: number;
  [key: string]: string | number;
};

export type ColumnProps = BasePlotProps<ColumnDataItem> & Partial<ColumnConfig>;

const defaultConfig = (props: ColumnConfig): ColumnConfig => {
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
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };
};

const Column = (props: ColumnProps) => {
  const config = usePlotConfig<ColumnConfig>('Column', defaultConfig, props);

  return <ADCColumn {...config} />;
};

export default Column;
