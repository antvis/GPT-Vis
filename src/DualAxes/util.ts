import type { DualAxesSeriesItem } from '.';
import { ChartType } from '../types';

export function transform(series: DualAxesSeriesItem[], categories: string[]) {
  const newChildren = series.map((item: any, index: number) => {
    const { type, axisYTitle, ...others } = item;

    const defaultYField = axisYTitle || `value_${index + 1}`;
    const baseConfig = {
      ...others,
      yField: defaultYField,
      axis: { y: { title: axisYTitle } },
      // data放在最外层
      data: undefined,
    };

    if (type === ChartType.Column) {
      return { ...baseConfig, type: 'interval' };
    }

    if (type === ChartType.Line) {
      return {
        ...baseConfig,
        type,
        shapeField: 'smooth',
        axis: { y: { position: 'right', title: axisYTitle } },
        style: { lineWidth: 2 },
      };
    }

    return baseConfig;
  });

  const newData = categories.map((item: string, index: number) => {
    const temp = {
      category: item,
    } as {
      category: string;
      [key: string]: any;
    };
    series.forEach((s: DualAxesSeriesItem, i: number) => {
      const defaultYField = s.axisYTitle || `value_${i + 1}`;
      temp[defaultYField] = s.data[index];
    });
    return temp;
  });

  const legendTypeList = series.map((item: any) => {
    return item.type === ChartType.Line ? 'smooth' : 'rect';
  });

  return {
    children: newChildren,
    data: newData,
    legendTypeList,
  };
}
