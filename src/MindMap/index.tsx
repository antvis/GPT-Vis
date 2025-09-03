import type { G6, MindMapOptions } from '@ant-design/graphs';
import { MindMap as ADCMindMap } from '@ant-design/graphs';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import { G6THEME_MAP } from '../theme';
import type { TreeGraphProps } from '../types';
import { visTreeData2GraphData } from '../utils/graph';

export interface MindMapProps extends TreeGraphProps {
  theme?: 'default' | 'academy';
}

const getDefaultConfig = (props: MindMapProps) => {
  const { theme = 'default' } = props;
  return {
    type: 'boxed' as const,
    autoFit: 'view' as const,
    autoResize: true,
    padding: 2,
    zoomRange: [0.1, 5] as [number, number],
    zoom: 1,
    node: { animation: { translate: false, update: false } } as const,
    edge: { animation: { translate: false, update: false } } as const,
    transforms: (prev: any[]) => [
      ...prev.filter(
        (transform) => (transform as G6.BaseTransformOptions).type !== 'collapse-expand-react-node',
      ),
      {
        ...(prev.find(
          (transform: G6.CustomBehaviorOption) =>
            (transform as G6.BaseTransformOptions).type === 'collapse-expand-react-node',
        ) as G6.BaseTransformOptions),
        enable: true,
      },
      {
        ...(prev.find((transform) => (transform as any).key === 'assign-color-by-branch') ||
          ({} as any)),
        ...G6THEME_MAP[theme],
      },
    ],
    behaviors: ['drag-canvas'],
  };
};

const MindMap: FC<MindMapProps> = (props) => {
  const { data: propsData, ...restProps } = props;

  const data = useMemo(() => visTreeData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<MindMapOptions>('MindMap', getDefaultConfig(props), restProps);

  return <ADCMindMap data={data} {...config} />;
};

export default MindMap;
