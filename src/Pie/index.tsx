import type { PieConfig } from '@ant-design/plots';
import { Pie as ADCPie } from '@ant-design/plots';
import { round, sumBy } from 'lodash';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

/**
 * PieDataItem is the type for each data item in the pie chart.
 * It includes the name of the sector and its corresponding value.
 * @param category The name of the sector.
 * @param value The value of the sector.
 */
type PieDataItem = {
  category: string;
  value: number;
  [key: string]: string | number;
};

/**
 * the props for the Pie
 * @param data pie data
 */
export type PieProps = BasePlotProps<PieDataItem> & Partial<PieConfig>;

const defaultConfig = (props: PieConfig): PieConfig => {
  const { data = [], angleField = 'value', colorField = 'category' } = props;
  const sumValue = sumBy(data, angleField);

  return {
    angleField,
    colorField,
    tooltip: (d) => {
      return {
        name: d[colorField as string],
        value: d[angleField as string],
      };
    },
    label: {
      position: 'outside',
      // text: angleField,
      text: (d: Record<string, any>) =>
        `${d[colorField as string]}: ${round((d[angleField as string] / sumValue) * 100, 1)}%`,
    },
    legend: {
      color: {
        title: false,
        position: 'top',
      },
    },
    interaction: {
      elementSelect: {
        single: true,
      },
    },
  };
};

const Pie = (props: PieProps) => {
  const config = usePlotConfig<PieConfig>('Pie', defaultConfig, props);

  return <ADCPie {...config} />;
};

export default Pie;
