import type { G6, IndentedTreeOptions } from '@ant-design/graphs';
import { IndentedTree as ADCIndentedTree } from '@ant-design/graphs';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import { G6THEME_MAP } from '../theme';
import type { TreeGraphProps } from '../types';
import { visTreeData2GraphData } from '../utils/graph';

export interface IndentedTreeProps extends TreeGraphProps {
  theme?: 'default' | 'academy';
}

const getDefaultConfig = (props: IndentedTreeProps) => {
  const { theme = 'default' } = props;
  return {
    type: 'linear' as const,
    autoFit: 'view' as const,
    autoResize: true as const,
    zoomRange: [0.1, 5] as [number, number],
    zoom: 1,
    node: { animation: { update: false, translate: false } } as const,
    edge: { animation: { update: false, translate: false } } as const,
    transforms: (prev: any[]) => [
      ...prev.filter(
        (transform: G6.CustomBehaviorOption) =>
          (transform as G6.BaseTransformOptions).type !== 'collapse-expand-react-node',
      ),
      {
        ...(prev.find(
          (transform) =>
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

const IndentedTree: React.FC<IndentedTreeProps> = (props) => {
  const { data: propsData, ...restProps } = props;

  const data = useMemo(() => visTreeData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<IndentedTreeOptions>(
    'IndentedTree',
    getDefaultConfig(props),
    restProps,
  );

  return <ADCIndentedTree data={data} {...config} />;
};

export default IndentedTree;
