import type { HistogramConfig } from '@ant-design/plots';
import { Histogram as ADCHistogram } from '@ant-design/plots';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

// binNumber和binWidth为互斥属性，选其一即可
type ADCHistogramConfig = Omit<HistogramConfig, 'binWidth'>;

export type HistogramProps = BasePlotProps<number> & Partial<HistogramConfig>;

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
  const { data } = props;
  // 将数据转换为适用于 ADC 直方图的数据格式, 即 [{ value: number }]，其实 ADC 的直方图数据格式并不合理。
  const histogramData = data.map((v: number) => ({ value: v }));
  const config = usePlotConfig<HistogramConfig>('Histogram', defaultConfig, {
    ...props,
    data: histogramData,
  });

  return <ADCHistogram {...config} />;
};

export default Histogram;
