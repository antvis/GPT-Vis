import type { WaterfallConfig } from '@ant-design/plots';
import { Waterfall as ADCWaterfall } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type WaterfallDataItem = {
  category: string;
  value: number;
  isTotal?: boolean;
  [key: string]: string | number | boolean | undefined;
};

const DEFAULT_POSITIVE_COLOR = '#F56E53';
const DEFAULT_NEGATIVE_COLOR = '#3CC27F';
const DEFAULT_TOTAL_COLOR = '#96a6a6';

export type WaterfallProps = BasePlotProps<WaterfallDataItem> & Theme & Style;

const defaultConfig = (props: WaterfallConfig): WaterfallConfig => {
  const { xField = 'category', yField = 'value', style = {} } = props;
  const { backgroundColor, palette } = style;
  const axisYTitle = get(props, 'axis.y.title');

  const positiveColor = palette?.[0] || DEFAULT_POSITIVE_COLOR;
  const negativeColor = palette?.[1] || DEFAULT_NEGATIVE_COLOR;
  const totalColor = palette?.[2] || DEFAULT_TOTAL_COLOR;

  return {
    xField,
    yField,
    linkStyle: {
      lineDash: [4, 2],
      stroke: '#ccc',
    },
    style: {
      maxWidth: 60,
      stroke: '#ccc',
      fill: (d: any) => {
        return d.isTotal ? totalColor : d.value > 0 ? positiveColor : negativeColor;
      },
    },
    label: [
      {
        text: 'value',
        formatter: '~s',
        position: 'inside',
        fontSize: 10,
      },
      {
        text: (arg: any) => {
          return `${arg.__end__}`;
        },
        formatter: '~s',
        position: (d: any) => (d.value > 0 ? 'top' : 'bottom'),
        textBaseline: (d: any) => (d.value > 0 ? 'bottom' : 'top'),
        fontSize: 10,
        dy: (d: any) => (d.value > 0 ? -4 : 4),
      },
    ],
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
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : { viewStyle: undefined }),
  };
};

const Waterfall = (props: WaterfallProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Waterfall', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as WaterfallConfig;

  return <ADCWaterfall {...config} />;
};

export default Waterfall;
