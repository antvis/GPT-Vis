import type { ScatterConfig } from '@ant-design/plots';
import { Scatter as ADCScatter } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type ScatterDataItem = {
  x: number;
  y: number;
  [key: string]: string | number;
};

export type ScatterProps = BasePlotProps<ScatterDataItem> & Theme & Style;

const defaultConfig = (props: ScatterConfig): ScatterConfig => {
  const { data, xField = 'x', yField = 'y', style = {} } = props;
  const { backgroundColor, palette } = style;
  const axisXTitle = get(props, 'axis.x.title');
  const axisYTitle = get(props, 'axis.y.title');
  const hasGroupField = (data || [])[0]?.group !== undefined;
  const hasPalette = !!palette?.[0];
  let paletteConfig: any = { color: undefined };
  let encode: any = {};

  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }

  if (hasGroupField) {
    encode = {
      x: xField,
      y: yField,
      color: 'group',
    };
  } else {
    encode = {
      x: xField,
      y: yField,
      color: () => 'all',
    };
  }

  return {
    data,
    xField,
    yField,
    tooltip: [
      { channel: 'x', name: axisXTitle || 'x' },
      { channel: 'y', name: axisYTitle || 'y' },
    ],
    legend: hasGroupField ? {} : false,
    encode,
    scale: {
      y: {
        nice: true,
      },
      ...paletteConfig,
    },
    style: {
      lineWidth: 1,
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : { viewStyle: undefined }),
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
