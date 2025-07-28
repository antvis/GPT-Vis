import type { NetworkGraphOptions } from '@ant-design/graphs';
import { NetworkGraph as ADCNetworkGraph } from '@ant-design/graphs';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import type { GraphProps } from '../types';
import { visGraphData2GraphData } from '../utils/graph';

export interface NetworkGraphProps extends GraphProps {}

const defaultConfig: NetworkGraphOptions = {
  autoFit: 'view',
  autoResize: true,
  zoomRange: [0.1, 5],
  zoom: 1,
  node: {
    style: {
      size: 28,
      labelFontSize: 10,
      labelBackground: true,
    },
    animation: {
      enter: false,
    },
  },
  edge: {
    style: {
      labelFontSize: 10,
      labelBackground: true,
      endArrow: true,
    },
    animation: { enter: false },
  },
  behaviors: ['drag-canvas', { key: 'hover-activate', type: 'hover-activate', degree: 1 }],
  transforms: (prev) => [...prev, 'process-parallel-edges'],
  layout: {
    type: 'force',
    animation: false,
  },
};

const NetworkGraph: React.FC<NetworkGraphProps> = (props) => {
  const { data: propsData, ...restProps } = props;

  const data = useMemo(() => visGraphData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<NetworkGraphOptions>('NetworkGraph', defaultConfig, restProps);

  return <ADCNetworkGraph data={data} {...config} />;
};

export default NetworkGraph;
