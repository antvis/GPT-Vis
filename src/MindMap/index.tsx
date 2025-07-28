import type { G6, MindMapOptions } from '@ant-design/graphs';
import { MindMap as ADCMindMap } from '@ant-design/graphs';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import type { TreeGraphProps } from '../types';
import { visTreeData2GraphData } from '../utils/graph';

const defaultConfig: MindMapOptions = {
  type: 'boxed',
  autoFit: 'view',
  autoResize: true,
  padding: 2,
  zoomRange: [0.1, 5],
  zoom: 1,
  node: { animation: { translate: false, update: false } },
  edge: { animation: { translate: false, update: false } },
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

export interface MindMapProps extends TreeGraphProps {}

const MindMap: FC<MindMapProps> = (props) => {
  const { data: propsData, ...restProps } = props;

  const data = useMemo(() => visTreeData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<MindMapOptions>('MindMap', defaultConfig, restProps);

  return <ADCMindMap data={data} {...config} />;
};

export default MindMap;
