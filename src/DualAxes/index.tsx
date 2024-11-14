import type { DualAxesConfig } from '@ant-design/plots';
import { DualAxes as ADCDualAxes } from '@ant-design/plots';
import React, { useMemo } from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { transform } from './util';

export type DualAxesProps = Partial<DualAxesConfig> & {
  categories: string[];
  axisXTitle?: string;
  series: DualAxesSeriesItem[];
  legendTypeList: string[];
};

export type DualAxesSeriesItem = {
  type: string;
  data: number[];
  axisYTitle?: string;
};

const defaultConfig = (props: DualAxesProps): DualAxesConfig => {
  const { xField = 'category', axisXTitle, legendTypeList } = props;
  return {
    xField,
    axis: {
      x: {
        title: axisXTitle,
      },
    },
    legend: {
      color: {
        itemMarker: (v: string, i: number) => {
          return legendTypeList[i];
        },
      },
    },
    scale: {
      color: {
        palette: 'category10',
      },
    },
  };
};

const DualAxes = (props: DualAxesProps) => {
  const { categories, series, ...others } = props;
  const transformData = useMemo(() => transform(series, categories), [props]);
  const config = usePlotConfig<DualAxesConfig>('DualAxes', defaultConfig, {
    ...others,
    ...transformData,
  });

  return <ADCDualAxes {...config} />;
};

export default DualAxes;
