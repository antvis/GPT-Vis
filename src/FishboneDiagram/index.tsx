import type { FishboneOptions } from '@ant-design/graphs';
import { Fishbone as ADCFishbone } from '@ant-design/graphs';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import { G6THEME_MAP } from '../theme';
import type { TreeGraphProps } from '../types';
import { visTreeData2GraphData } from '../utils/graph';

export interface FishboneDiagramProps extends TreeGraphProps {
  theme?: 'default' | 'academy';
}

const getDefaultConfig = (props: FishboneDiagramProps) => {
  const { theme = 'default' } = props;
  return {
    autoFit: 'view' as const,
    autoResize: true,
    zoomRange: [0.1, 5] as [number, number],
    zoom: 1,
    behaviors: ['drag-canvas'],
    transforms: (prev: any[]) => [
      {
        ...(prev.find((transform) => (transform as any).key === 'assign-color-by-branch') ||
          ({} as any)),
        ...G6THEME_MAP[theme],
      },
    ],
  };
};

const FishboneDiagram: React.FC<FishboneDiagramProps> = (props) => {
  const { data: propsData, ...restProps } = props;

  const data = useMemo(() => visTreeData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<FishboneOptions>(
    'FishboneDiagram',
    getDefaultConfig(props),
    restProps,
  );

  return <ADCFishbone data={data} {...config} />;
};

export default FishboneDiagram;
