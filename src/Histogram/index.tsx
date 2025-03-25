import type { HistogramConfig } from '@ant-design/plots';
import { Histogram as ADCHistogram } from '@ant-design/plots';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

// binNumber和binWidth为互斥属性，选其一即可
type ADCHistogramConfig = Omit<HistogramConfig, 'binWidth'>;

export type HistogramProps = BasePlotProps<number> & Partial<HistogramConfig>;

const defaultConfig = (props: HistogramConfig): ADCHistogramConfig => {
  const { binField = (d: number) => d, binNumber } = props;

  return {
    binField,
    binNumber,
    style: { inset: 0.5 },
  } as ADCHistogramConfig;
};

const Histogram = (props: HistogramProps) => {
  const config = usePlotConfig<HistogramConfig>('Histogram', defaultConfig, props);

  return <ADCHistogram {...config} />;
};

export default Histogram;
