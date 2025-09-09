import type { ColumnConfig } from '@ant-design/plots';
import { Column as ADCColumn } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

export type ColumnDataItem = {
  category: string | number;
  value: number;
  [key: string]: string | number;
};

export type ColumnProps = BasePlotProps<ColumnDataItem> & Theme & Style;

const defaultConfig = (props: ColumnConfig): ColumnConfig => {
  const { data, xField = 'category', yField = 'value', style = {}, theme = {} } = props;
  const { backgroundColor, palette } = style;
  const hasGroupField = get(data, '[0].group') !== undefined;
  const hasPalette = !!palette?.[0];
  const axisYTitle = get(props, 'axis.y.title');

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

const Column = (props: ColumnProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Column', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as ColumnConfig;

  return <ADCColumn {...config} />;
};

export default Column;
