import type { BoxConfig } from '@ant-design/plots';
import { Box as ADCBox } from '@ant-design/plots';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type BoxplotDatum = {
  category: string;
  value: number;
  group?: string;
};
export type BoxplotProps = BasePlotProps<BoxplotDatum> &
  Theme &
  Style & {
    xField?: string;
    yField?: string;
  };

const defaultConfig = (props: BoxplotProps) => {
  const { data, style = {}, axisYTitle, axisXTitle, xField = 'category', yField = 'value' } = props;
  const { backgroundColor, palette } = style;
  const hasGroupField = (data || [])[0]?.group !== undefined;
  let paletteConfig: any = { color: undefined };
  const hasPalette = !!palette?.[0];
  const colorField = hasGroupField ? 'group' : 'category';
  const seriesField = hasGroupField ? 'group' : 'category';

  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }

  return {
    data,
    boxType: 'boxplot',
    xField,
    yField,
    colorField,
    seriesField,
    axis: {
      y: {
        title: axisYTitle || false,
      },
      x: {
        title: axisXTitle || false,
      },
    },
    scale: {
      x: { paddingInner: 0.6, paddingOuter: 0.3 },
      series: { paddingInner: 0.3, paddingOuter: 0.1 },
      y: { nice: true },
      ...paletteConfig,
    },
    style: { stroke: 'black' },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
  };
};

const Boxplot = (props: BoxplotProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Boxplot', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as BoxConfig;

  return <ADCBox {...config} />;
};

export default Boxplot;
