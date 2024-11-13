import type { HistogramConfig } from '@ant-design/plots';
import { Histogram as ADCHistogram } from '@ant-design/plots';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

type HistogramDataItem = {
  value: number;
  [key: string]: string | number;
};
// binNumber和binWidth为互斥属性，选其一即可
type ADCHistogramConfig = Omit<HistogramConfig, 'binWidth'>;

export type HistogramProps = BasePlotProps<HistogramDataItem> & Partial<HistogramConfig>;

const defaultConfig = (props: HistogramConfig): ADCHistogramConfig => {
  const { data, binField = 'value', binNumber } = props;

  return {
    data,
    binField,
    binNumber,
    style: { inset: 0.5 },
  };
};

const Histogram = (props: HistogramProps) => {
  const config = usePlotConfig<HistogramConfig>('Histogram', defaultConfig, props);

  return <ADCHistogram {...config} />;
};

export default Histogram;
