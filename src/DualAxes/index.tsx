import type { DualAxesConfig } from '@ant-design/plots';
import { DualAxes as ADCDualAxes } from '@ant-design/plots';
import React, { useMemo } from 'react';
import type { ColumnDataItem } from '../Column';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { LineDataItem } from '../Line';
import { transform } from './util';

export type DualAxesProps = Partial<DualAxesConfig>;

export type DualAxesDataItem = ColumnDataItem | LineDataItem;

const defaultConfig = (props: DualAxesConfig): DualAxesConfig => {
  const { xField = 'time' } = props;
  return {
    xField,
    legend: {},
  };
};

const DualAxes = (props: DualAxesProps) => {
  const { children, xField, ...others } = props;
  const transformData = useMemo(() => transform(children, xField as string), [children]);
  const config = usePlotConfig<DualAxesConfig>('DualAxes', defaultConfig, {
    ...others,
    ...transformData,
  });

  return <ADCDualAxes {...config} />;
};

export default DualAxes;
