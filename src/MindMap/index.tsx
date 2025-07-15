import type { G6, MindMapOptions } from '@ant-design/graphs';
import { MindMap as ADCMindMap } from '@ant-design/graphs';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import type { TreeGraphProps } from '../types';
import { visTreeData2GraphData } from '../utils/graph';

const defaultConfig: MindMapOptions = {
  type: 'boxed',
  // autoFit: 'view',
  autoResize: true, // 启用自动调整大小以适应容器
  padding: 2,
  zoomRange: [0.5, 5],
  zoom: 0.5, // 是否启用缩放到适合视图
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
  behaviors: ['drag-canvas'], // 添加缩放行为
};

export interface MindMapProps extends TreeGraphProps {}

const MindMap: FC<MindMapProps> = (props) => {
  const { data: propsData, onReady, ...restProps } = props;

  const data = useMemo(() => visTreeData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<MindMapOptions>('MindMap', defaultConfig, restProps);
  console.log('MindMap config', config);
  console.log('MindMap onReady', onReady);

  return (
    // <div style={{ width: '100%', height: '100%' }}>
    <ADCMindMap data={data} {...config} onReady={onReady} />
    // </div>
  );
};

export default MindMap;
