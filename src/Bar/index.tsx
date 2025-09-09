import type { BarConfig } from '@ant-design/plots';
import { Bar as ADCBar } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type BarDataItem = {
  category: string;
  value: number;
  [key: string]: string | number;
};

export type BarProps = BasePlotProps<BarDataItem> & Partial<BarConfig> & Theme & Style;

const defaultConfig = (props: BarConfig): BarConfig => {
  const { data, xField = 'category', yField = 'value', style = {}, theme = {} } = props;
  const { backgroundColor, palette } = style;
  const hasGroupField = get(data, '[0].group') !== undefined;
  const axisYTitle = get(props, 'axis.y.title');
  const hasPalette = !!palette?.[0];

  let paletteConfig: any = { color: undefined };
  let radiusStyle: any = {
    radiusTopLeft: 4,
    radiusTopRight: 4,
  };

  if (theme?.type === 'academy') {
    radiusStyle = {
      radiusTopLeft: 0,
      radiusTopRight: 0,
    };
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
    colorField: hasGroupField ? 'group' : xField,
    tooltip: (d) => {
      const tooltipName = axisYTitle || d[xField as string];
      return {
        name: tooltipName,
        value: d[yField as string],
      };
    },
    style: {
      ...radiusStyle,
      columnWidthRatio: 0.8,
    },
    scale: {
      y: {
        nice: true,
      },
      ...paletteConfig,
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : { viewStyle: undefined }),
  };
};

const Bar = (props: BarProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Bar', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as BarConfig;

  return <ADCBar {...config} />;
};

export default Bar;
