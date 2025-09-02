import type { AreaConfig } from '@ant-design/plots';
import { Area as ADCArea } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Theme } from '../types';

type AreaDataItem = {
  time: string | number;
  value: number;
  [key: string]: string | number;
};

export type AreaProps = BasePlotProps<AreaDataItem> & Partial<AreaConfig> & Theme;

const defaultConfig = (props: AreaConfig): AreaConfig => {
  const { data, xField = 'time', yField = 'value' } = props;
  const hasGroupField = get(data, '[0].group') !== undefined;
  const axisYTitle = get(props, 'axis.y.title');
  const defaultStyle = hasGroupField ? {} : { opacity: 0.6 };

  return {
    xField,
    yField,
    style: defaultStyle,
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
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<AreaConfig>('Area', defaultConfig, {
    ...props,
    theme: themeConfig,
  });

  return <ADCArea {...config} />;
};

export default Area;
