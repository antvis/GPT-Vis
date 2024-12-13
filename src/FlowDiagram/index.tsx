import type { FlowGraphOptions, G6 } from '@ant-design/graphs';
import { FlowGraph as ADCFlowGraph, RCNode } from '@ant-design/graphs';
import React, { useMemo } from 'react';
import { useGraphConfig } from '../ConfigProvider/hooks';
import type { GraphProps } from '../types';
import { mergeGraphOptions } from '../utils/config';
import { visGraphData2GraphData } from '../utils/graph';
import { getGraphOptionsByData } from './helper';

const { TextNode } = RCNode;

export interface FlowDiagramProps extends GraphProps {}

const defaultConfig: FlowGraphOptions = {
  autoResize: true,
  autoFit: 'view',
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
            borderWidth={2}
          />
        );
      },
      size: [140, 32],
    },
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

  const config = useGraphConfig<FlowGraphOptions>(
    'FlowDiagram',
    mergeGraphOptions(defaultConfig, getGraphOptionsByData(data)),
    restProps,
  );

  return <ADCFlowGraph data={data} {...config} />;
};

export default FlowDiagram;
