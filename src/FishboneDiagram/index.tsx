import type { FishboneOptions } from '@ant-design/graphs';
import { Fishbone as ADCFishbone } from '@ant-design/graphs';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import type { TreeGraphProps } from '../types';
import { visTreeData2GraphData } from '../utils/graph';

export interface FishboneDiagramProps extends TreeGraphProps {}

const defaultConfig: FishboneOptions = {
  autoFit: 'view',
  autoResize: true,
};

const FishboneDiagram: React.FC<FishboneDiagramProps> = (props) => {
  const { data: propsData, ...restProps } = props;

  const data = useMemo(() => visTreeData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<FishboneOptions>('FishboneDiagram', defaultConfig, restProps);

  return <ADCFishbone data={data} {...config} />;
};

export default FishboneDiagram;
