import type { FlowGraphOptions, G6 } from '@ant-design/graphs';
import { FlowGraph as ADCFlowGraph, RCNode } from '@ant-design/graphs';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import type { GraphProps } from '../types';
import { visGraphData2GraphData } from '../utils/graph';

const { TextNode } = RCNode;

export interface FlowDiagramProps extends GraphProps {}

const defaultConfig: FlowGraphOptions = {
  autoResize: true,
  node: {
    style: {
      component: (d: G6.NodeData) => {
        const isActive = d.states?.includes('active');
        return (
          <TextNode
            text={d.id}
            isActive={isActive}
            type="filled"
            style={{
              fontSize: 12,
              background: 'linear-gradient(-89deg, #64b7f2 0%, #4c95f3 100%)',
            }}
          />
        );
      },
      size: [140, 32],
    },
    animation: { enter: false },
  },
  edge: {
    style: {
      endArrow: true,
      labelBackground: true,
      labelMaxLines: 2,
      labelMaxWidth: '40%',
      labelWordWrap: true,
    },
    state: {
      active: {
        halo: false,
        labelWordWrap: false,
        stroke: '#001f98',
      },
    },
    animation: { enter: false },
  },
  behaviors: (prev) => [
    ...prev,
    {
      type: 'hover-activate-neighbors',
      onHover: (e: G6.IPointerEvent) => {
        e.view.setCursor('pointer');
      },
      onHoverEnd: (e: G6.IPointerEvent) => {
        e.view.setCursor('default');
      },
    },
  ],
};

const FlowDiagram: React.FC<FlowDiagramProps> = (props) => {
  const { data: propsData, ...restProps } = props;

  const data = useMemo(() => visGraphData2GraphData(propsData), [propsData]);

  const config = useGraphConfig<FlowGraphOptions>('FlowDiagram', defaultConfig, restProps);

  return <ADCFlowGraph data={data} {...config} />;
};

export default FlowDiagram;
