import { createGraph } from '@antv/g6-ssr';
import { type FlowDiagramProps } from '@antv/gpt-vis/dist/esm/FlowDiagram';
import { G6THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { CommonOptions } from './types';

type FlowDiagramStyle = {
  texture?: 'rough' | 'default';
};

export type FlowDiagramOptions = CommonOptions &
  FlowDiagramProps & {
    style?: FlowDiagramStyle;
  };

const MAX_WIDTH = 110;

export async function FlowDiagram(options: FlowDiagramOptions) {
  const { data, width = 600, height = 400, theme = 'default', renderPlugins, style = {} } = options;
  const { texture = 'default' } = style;

  const graphData = {
    nodes: data.nodes.map((node) => ({ ...node, id: node.name })),
    edges: data.edges.map((edge) => ({ ...edge, id: `${edge.source}-${edge.target}` })),
  };

  return await createGraph({
    data: graphData,
    width,
    height,
    devicePixelRatio: 3,
    autoFit: 'view',
    padding: 20,
    animation: false,
    node: {
      type: 'rect',
      style: {
        // @ts-ignore
        size: [110, 38],
        // size: (d: any) => [d.name.length * 15 + 30, 35],
        radius: 6,
        // @ts-ignore
        iconText: (d) => d.name,
        iconFontSize: 12,
        iconFontWeight: 800,
        iconWordWrapWidth: MAX_WIDTH - 5,
        iconTextOverflow: 'ellipsis',
        iconWordWrap: true,
        iconMaxLines: 2,
        ...(texture === 'rough'
          ? {
              lineWidth: 0.5,
              iconFill: '#262626',
              iconFontFamily: FontFamily.ROUGH,
            }
          : {}),
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 2,
        radius: 10,
        stroke: '#99ADD1',
        endArrow: true,
        // @ts-ignore
        labelText: (d) => d.name,
        // labelFill: '#555555',
        labelFontWeight: 800,
        labelBackground: true,
        labelBackgroundFill: 'rgba(255,255,255,0.6)',
        labelBackgroundOpacity: 1,
        labelBackgroundLineWidth: 2,
        labelPadding: [2, 5],
        labelBackgroundRadius: 2,
        router: {
          type: 'orth',
        },
        ...(texture === 'rough' ? { labelFontFamily: FontFamily.ROUGH } : {}),
      },
    },
    layout: {
      type: 'dagre',
      rankdir: 'LR',
      ranksep: 88,
      nodesep: 60,
    },
    transforms: [G6THEME_MAP[theme]],
    renderPlugins,
  });
}
