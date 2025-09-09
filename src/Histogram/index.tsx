import type { HistogramConfig } from '@ant-design/plots';
import { Histogram as ADCHistogram } from '@ant-design/plots';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

// binNumber和binWidth为互斥属性，选其一即可
type ADCHistogramConfig = Omit<HistogramConfig, 'binWidth'>;

export type HistogramProps = BasePlotProps<number> &
  Theme &
  Style & {
    binNumber: number;
  };

const defaultConfig = (props: HistogramConfig): ADCHistogramConfig => {
  const { binField = (d: number) => d, binNumber, style = {} } = props;
  const { backgroundColor, palette } = style;
  const hasPalette = !!palette?.[0];
  let paletteConfig: any = { color: undefined };

  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }

  return {
    binField,
    binNumber,
    style: { inset: 0.5, minHeight: 1, columnWidthRatio: 1 },
    legend: false,
    // @ts-ignore
    encode: {
      x: (d: any) => d,
      y: 'count',
      color: () => 'all',
    },
    scale: {
      y: {
        nice: true,
      },
      ...paletteConfig,
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : { viewStyle: undefined }),
  } as ADCHistogramConfig;
};

const Histogram = (props: HistogramProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Histogram', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as HistogramConfig;

  return <ADCHistogram {...config} />;
};

export default Histogram;
