import type { LineConfig } from '@ant-design/plots';
import { Line as ADCLine } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

export type LineDataItem = {
  time: string | number;
  value: number;
  [key: string]: string | number;
};

export type LineProps = BasePlotProps<LineDataItem> & Theme & Style;

const defaultConfig = (props: LineConfig): LineConfig => {
  const { data, xField = 'time', yField = 'value', style = {} } = props;
  const { palette, lineWidth, backgroundColor } = style;
  const hasGroupField = get(data, '[0].group') !== undefined;
  const axisYTitle = get(props, 'axis.y.title');
  const hasPalette = !!palette?.[0];
  let encode = {};
  let paletteConfig: any = { color: undefined };

  if (hasGroupField) {
    encode = { x: xField, y: yField, color: 'group' };
  } else {
    encode = { x: xField, y: yField, color: () => 'all' };
  }

  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }

  return {
    xField,
    yField,
    colorField: hasGroupField ? 'group' : undefined,
    encode,
    legend: hasGroupField ? {} : false,
    tooltip: (d) => {
      const tooltipName = axisYTitle || d[xField as string];
      return {
        name: tooltipName,
        value: d[yField as string],
      };
    },
    scale: {
      y: {
        nice: true,
      },
      ...paletteConfig,
    },
    style: {
      lineWidth: lineWidth || 2,
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : { viewStyle: undefined }),
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
