import type { DualAxesDataItem } from '.';
import { ChartType } from '../types';

type DatasetItem = {
  data: DualAxesDataItem[];
  yField: string;
};

/**
 * Merges data for dual-axes charts.
 * @param children - The children containing chart data.
 * @param xField - The field used as x-axis, defaults to 'time'.
 * @returns Merged global data.
 */
function mergeData(children: any[], xField: string = 'time'): any[] {
  const originalData = children.map((child) => {
    return {
      data: child.data,
      yField: child.yField,
    };
  });
  const mergedData: { [key: string]: any }[] = [];
  const xFieldMap: Record<string, Record<string, number>> = {};

  originalData.forEach((dataset, index) => {
    const { data, yField }: DatasetItem = dataset;
    data.forEach((entry) => {
      const key = entry[xField] ?? entry.category;
      if (!key) return;

      if (!xFieldMap[key]) {
        xFieldMap[key] = {};
      }

      if (entry.value !== undefined) {
        xFieldMap[key][`value_${index + 1}`] = entry.value;
      } else {
        xFieldMap[key][yField] = entry[yField] as number;
      }
    });
  });

  for (const xFieldKey in xFieldMap) {
    if (Object.keys(xFieldMap[xFieldKey]).length === originalData.length) {
      mergedData.push({ [xField]: xFieldKey, ...xFieldMap[xFieldKey] });
    }
  }

  return mergedData;
}

export function transform(children: any, xField: string = 'time') {
  const newChildren = children.map((item: any, index: number) => {
    const { type, style, axis, yField, ...others } = item;

    const defaultYField = `value_${index + 1}`;
    const baseConfig = {
      ...others,
      yField: yField || defaultYField,
      style,
      axis,
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
        axis: { y: { position: 'right' }, ...axis },
        style: { lineWidth: 2, ...style },
      };
    }

    return baseConfig;
  });

  return {
    children: newChildren,
    data: mergeData(children, xField),
    xField,
  };
}
