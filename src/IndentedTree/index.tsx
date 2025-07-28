import type { G6, IndentedTreeOptions } from '@ant-design/graphs';
import { IndentedTree as ADCIndentedTree } from '@ant-design/graphs';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import type { TreeGraphProps } from '../types';
import { visTreeData2GraphData } from '../utils/graph';

export interface IndentedTreeProps extends TreeGraphProps {}

const defaultConfig: IndentedTreeOptions = {
  type: 'linear',
  autoFit: 'view',
  autoResize: true,
  zoomRange: [0.1, 5],
  zoom: 1,
  node: { animation: { update: false, translate: false } },
  edge: { animation: { update: false, translate: false } },
  transforms: (prev) => [
    ...prev.filter(
      (transform) => (transform as G6.BaseTransformOptions).type !== 'collapse-expand-react-node',
    ),
    {
      ...(prev.find(
        (transform) => (transform as G6.BaseTransformOptions).type === 'collapse-expand-react-node',
      ) as G6.BaseTransformOptions),
      enable: true,
    },
  ],
  behaviors: ['drag-canvas'],
};

const IndentedTree: React.FC<IndentedTreeProps> = (props) => {
  const { data: propsData, ...restProps } = props;

  const data = useMemo(() => visTreeData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<IndentedTreeOptions>('IndentedTree', defaultConfig, restProps);

  return <ADCIndentedTree data={data} {...config} />;
};

export default IndentedTree;
