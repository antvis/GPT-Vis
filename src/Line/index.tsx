import type { LineConfig } from '@ant-design/plots';
import { Line as ADCLine } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps } from '../types';

export type LineDataItem = {
  time: string | number;
  value: number;
  [key: string]: string | number;
};

export type LineProps = BasePlotProps<LineDataItem> &
  Partial<LineConfig> & { theme?: 'default' | 'academy' | 'dark' };

const defaultConfig = (props: LineConfig): LineConfig => {
  const { data, xField = 'time', yField = 'value' } = props;
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
  };
};

const Line = (props: LineProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Line', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as LineConfig;

  return <ADCLine {...config} />;
};

export default Line;
