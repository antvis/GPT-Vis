import type { AreaConfig } from '@ant-design/plots';
import { Area as ADCArea } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type AreaDataItem = {
  time: string | number;
  value: number;
  [key: string]: string | number;
};

const getLinearGradientColor = (color: string) =>
  `linear-gradient(-90deg, white 0%, ${color} 100%)`;
const DEFAULT_COLOR = '#3A95FF';

export type AreaProps = BasePlotProps<AreaDataItem> & Theme & Style;

const defaultConfig = (props: AreaConfig): AreaConfig => {
  const { data, xField = 'time', yField = 'value', style = {} } = props;
  const { backgroundColor, palette, lineWidth = 2 } = style;
  const hasGroupField = get(data, '[0].group') !== undefined;
  const axisYTitle = get(props, 'axis.y.title');
  const fillColor = getLinearGradientColor(palette?.[0] || DEFAULT_COLOR);
  const defaultStyle = hasGroupField ? { opacity: 0.6 } : { opacity: 0.6, fill: fillColor };

  let paletteConfig: any = { color: undefined };
  let encode: any = {};
  const hasPalette = !!palette?.[0];

  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }

  if (hasGroupField) {
    encode = { x: xField, y: yField, color: 'group' };
  } else {
    encode = { x: xField, y: yField, color: () => 'all' };
  }

  return {
    xField,
    yField,
    style: defaultStyle,
    colorField: hasGroupField ? 'group' : undefined,
    stack: hasGroupField,
    // @ts-ignore
    encode,
    legend: hasGroupField ? {} : false,
    tooltip: (d: Record<string, string | number>) => {
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
    line: {
      encode,
      style: {
        lineWidth: lineWidth,
        strokeOpacity: 0.6,
      },
      ...paletteConfig,
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : { viewStyle: undefined }),
  };
};

const Area = (props: AreaProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Area', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as AreaConfig;

  return <ADCArea {...config} />;
};

export default Area;
