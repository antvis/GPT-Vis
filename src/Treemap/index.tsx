import type { TreemapConfig } from '@ant-design/plots';
import { Treemap as ADCTreemap } from '@ant-design/plots';
import React, { useMemo } from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import type { BasePlotProps } from '../types';

type TreeNode = {
  name: string;
  value: number;
  children?: TreeNode[];
};
// binNumber和binWidth为互斥属性，选其一即可
type ADCTreemapConfig = TreemapConfig & {
  valueField: string;
};
export type TreemapProps = BasePlotProps<TreeNode> & Partial<TreemapConfig>;

const defaultConfig = (props: ADCTreemapConfig): TreemapConfig => {
  const { valueField = 'value' } = props;
  return {
    legend: false,
    layout: {
      tile: 'treemapBinary',
      paddingInner: 3,
    },
    valueField,
    tooltip: {
      items: [
        (d) => {
          return {
            name: d.data?.name,
            value: d[valueField],
          };
        },
      ],
    },
    style: { fillOpacity: 0.8, labelFontSize: 12 },
  };
};
const transform = (data: TreeNode[]) => {
  return {
    name: 'root',
    children: data,
  };
};

const Treemap = (props: TreemapProps) => {
  const config = usePlotConfig<TreemapConfig>('Treemap', defaultConfig, props);
  const { data, ...others } = config;
  const transformData = useMemo(() => transform(data), [data]);

  return <ADCTreemap {...others} data={transformData} />;
};

export default Treemap;
