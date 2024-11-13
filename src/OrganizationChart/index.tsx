import type { G6, OrganizationChartOptions } from '@ant-design/graphs';
import { OrganizationChart as ADCOrganizationChart, RCNode } from '@ant-design/graphs';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import type { TreeGraphProps } from '../types';
import { visTreeData2GraphData } from '../utils/graph';

const { OrganizationChartNode } = RCNode;

export interface OrganizationChartProps extends TreeGraphProps {}

const defaultConfig: OrganizationChartOptions = {
  padding: [40, 0, 0, 120],
  autoFit: 'view',
  autoResize: true,
  node: {
    style: {
      component: (d: G6.NodeData) => {
        const isActive = d.states?.includes('active');
        return (
          <OrganizationChartNode
            name={d.name as string}
            position={d.description as string}
            status={'online'}
            isActive={isActive}
          />
        );
      },
      size: [280, 80],
    },
  },
  edge: {
    state: {
      active: {
        stroke: '#1890ff',
        halo: false,
      },
    },
  },
  behaviors: (prev) => [...prev, 'hover-activate-neighbors'],
  transforms: (prev) => [
    ...prev.filter((t) => (t as G6.BaseTransformOptions).type !== 'collapse-expand-react-node'),
    {
      ...(prev.find(
        (t) => (t as G6.BaseTransformOptions).type === 'collapse-expand-react-node',
      ) as G6.BaseTransformOptions),
      enable: true,
      iconOffsetY: 24,
    },
  ],
  animation: false,
};

const OrganizationChart: React.FC<OrganizationChartProps> = (props) => {
  const { data: propsData, ...restProps } = props;

  const data = useMemo(() => visTreeData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<OrganizationChartOptions>(
    'OrganizationChart',
    defaultConfig,
    restProps,
  );

  return <ADCOrganizationChart data={data} {...config} />;
};

export default OrganizationChart;
