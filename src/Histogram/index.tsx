import type { HistogramConfig } from '@ant-design/plots';
import { Histogram as ADCHistogram } from '@ant-design/plots';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Theme } from '../types';

// binNumber和binWidth为互斥属性，选其一即可
type ADCHistogramConfig = Omit<HistogramConfig, 'binWidth'>;

export type HistogramProps = BasePlotProps<number> & Partial<HistogramConfig> & Theme;

const defaultConfig = (props: HistogramConfig): ADCHistogramConfig => {
  const { binField = (d: number) => d, binNumber } = props;

  return {
    binField,
    binNumber,
    style: { inset: 0.5 },
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
