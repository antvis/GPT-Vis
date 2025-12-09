import type { WaterfallConfig } from '@ant-design/plots';
import { Waterfall as ADCWaterfall } from '@ant-design/plots';
import { get } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Theme } from '../types';

type WaterfallDataItem = {
  category: string;
  value: number;
  isTotal?: boolean;
  [key: string]: string | number | boolean | undefined;
};

const DEFAULT_POSITIVE_COLOR = '#FF4D4F';
const DEFAULT_NEGATIVE_COLOR = '#2EBB59';
const DEFAULT_TOTAL_COLOR = '#1783FF';

export type WaterfallProps = BasePlotProps<WaterfallDataItem> &
  Theme & {
    style: {
      backgroundColor?: string;
    };
    positiveColor?: string;
    negativeColor?: string;
    totalColor?: string;
  };

const defaultConfig = (
  props: WaterfallConfig & { positiveColor?: string; negativeColor?: string; totalColor?: string },
): WaterfallConfig => {
  const {
    xField = 'category',
    yField = 'value',
    style = {},
    positiveColor: customPositiveColor,
    negativeColor: customNegativeColor,
    totalColor: customTotalColor,
  } = props;
  const { backgroundColor } = style;
  const axisYTitle = get(props, 'axis.y.title');
  const positiveColor = customPositiveColor || DEFAULT_POSITIVE_COLOR;
  const negativeColor = customNegativeColor || DEFAULT_NEGATIVE_COLOR;
  const totalColor = customTotalColor || DEFAULT_TOTAL_COLOR;

  return {
    xField,
    yField,
    linkStyle: {
      lineDash: [4, 2],
      stroke: '#ccc',
    },
    style: {
      maxWidth: 60,
      stroke: '#666',
      radius: 4,
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
        transform: [{ type: 'overflowHide' }],
        fill: '#000',
        fontWeight: 600,
        stroke: '#fff',
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
