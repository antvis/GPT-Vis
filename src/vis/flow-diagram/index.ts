import { ExtensionCategory, Graph, HoverActivate, idOf, register, type NodeData } from '@antv/g6';
import type { GraphData, VisualizationOptions } from '../../types';
import { getBackgroundColor, normalizePalette } from '../../util/theme';

/**
 * FlowDiagramConfig defines the configuration for rendering the flow diagram.
 */
export interface FlowDiagramConfig {
  type?: 'flow-diagram';
  data: GraphData;
  title?: string;
  theme?: 'default' | 'academy' | 'dark';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * FlowDiagramInstance represents a flow diagram instance with render and destroy methods.
 */
export interface FlowDiagramInstance {
  render: (config: FlowDiagramConfig) => void;
  destroy: () => void;
  zoomTo: (zoom: number) => void;
  getZoom: () => number | undefined;
}

const ACTIVE_COLOR = '#f6c523';
const DEFAULT_NODE_WIDTH = 200;
const DEFAULT_NODE_HEIGHT = 80;

class HoverElement extends HoverActivate {
  getActiveIds(event: any) {
    const { model, graph } = this.context;
    const { targetType, target } = event;
    const targetId = target.id;

    const ids: string[] = [targetId];
    if (targetType === 'edge') {
      const edge = model.getEdgeDatum(targetId);
      ids.push(edge.source as string, edge.target as string);
    } else if (targetType === 'node') {
      ids.push(...model.getRelatedEdgesData(targetId).map(idOf));
    }

    graph.frontElement(ids);
    return ids;
  }
}

let behaviorRegistered = false;

function ensureBehaviorRegistered() {
  if (!behaviorRegistered) {
    register(ExtensionCategory.BEHAVIOR, 'hover-element', HoverElement);
    behaviorRegistered = true;
  }
}

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createNodeHTML(d: NodeData, color: string, selectedBorderColor = '#000') {
  const text = escapeHtml((d.data?.text as string) || '');
  const isHovered = d.states?.includes('active');
  const isSelected = d.states?.includes('selected');
  const nodeColor = isHovered ? ACTIVE_COLOR : color;

  return `
    <div
      data-node-key="${escapeHtml(String(d.id))}"
      style="
        box-sizing: border-box;
        width: ${DEFAULT_NODE_WIDTH}px;
        min-height: ${DEFAULT_NODE_HEIGHT}px;
        padding: 16px;
        background: ${nodeColor};
        border: 3px solid ${isSelected ? selectedBorderColor : nodeColor};
        border-radius: 16px;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
        text-align: center;
        white-space: normal;
        word-break: break-word;
        overflow-wrap: anywhere;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      "
    >
      <div style="width: 100%;">
        ${text}
      </div>
    </div>
  `;
}

function measureAndUpdateNodeSizes(
  graph: Graph,
  container: HTMLElement,
  nodeColorMap: Map<string, string>,
  selectedBorderColor: string,
) {
  const nodes = graph.getNodeData();

  const updatedNodes = nodes.map((node) => {
    const dom = container.querySelector(`[data-node-key="${CSS.escape(String(node.id))}"]`);

    let height = DEFAULT_NODE_HEIGHT;
    if (dom) {
      height = Math.max(DEFAULT_NODE_HEIGHT, Math.ceil(dom.getBoundingClientRect().height));
    }

    return {
      id: node.id,
      style: {
        size: [DEFAULT_NODE_WIDTH, height] as [number, number],
        dx: -DEFAULT_NODE_WIDTH / 2,
        dy: -height / 2,
        innerHTML: createNodeHTML(
          node,
          nodeColorMap.get(String(node.id)) || '#1783FF',
          selectedBorderColor,
        ),
      },
    };
  });

  graph.updateNodeData(updatedNodes);
  graph.render();
}

/**
 * FlowDiagram chart component using G6 5.0 with dagre layout.
 */
export const FlowDiagram = (options: VisualizationOptions): FlowDiagramInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let graph: Graph | null = null;

  const render = (config: FlowDiagramConfig): void => {
    const { data, title, theme = chartTheme, style = {} } = config;

    if (graph) {
      graph.destroy();
      graph = null;
    }

    ensureBehaviorRegistered();

    const colors = normalizePalette(style.palette, theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Resolve container element
    let containerEl: HTMLElement;
    if (typeof container === 'string') {
      const el = document.getElementById(container.replace(/^#/, ''));
      if (!el) throw new Error(`Container element "${container}" not found`);
      containerEl = el;
    } else {
      containerEl = container;
    }

    containerEl.style.backgroundColor = backgroundColor;

    // Compute node ranks (BFS layers) for color assignment by row
    const nodeRankMap = new Map<string, number>();
    const incomingTargets = new Set(data.edges.map((e) => e.target));
    const childrenMap = new Map<string, string[]>();
    for (const edge of data.edges) {
      const list = childrenMap.get(edge.source) || [];
      list.push(edge.target);
      childrenMap.set(edge.source, list);
    }
    const roots = data.nodes.filter((n) => !incomingTargets.has(n.name)).map((n) => n.name);
    const queue = roots.map((name) => ({ name, rank: 0 }));
    let head = 0;
    while (head < queue.length) {
      const { name, rank } = queue[head++];
      if (nodeRankMap.has(name)) continue;
      nodeRankMap.set(name, rank);
      for (const child of childrenMap.get(name) || []) {
        if (!nodeRankMap.has(child)) {
          queue.push({ name: child, rank: rank + 1 });
        }
      }
    }

    // Convert GraphData (name-based) to G6 format (id-based), color by rank
    const nodeColorMap = new Map<string, string>();
    const g6Nodes = data.nodes.map((node) => {
      const rank = nodeRankMap.get(node.name) || 0;
      const color = colors[rank % colors.length];
      nodeColorMap.set(node.name, color);
      return {
        id: node.name,
        data: { text: node.name },
      };
    });

    const nodeNames = new Set(data.nodes.map((n) => n.name));
    const g6Edges = data.edges
      .filter((edge) => nodeNames.has(edge.source) && nodeNames.has(edge.target))
      .map((edge, index) => ({
        id: `edge-${index}`,
        source: edge.source,
        target: edge.target,
        data: { text: edge.name || '' },
      }));

    const isDark = theme === 'dark';
    const edgeStroke = isDark ? '#5a6b7f' : '#8b9baf';
    const labelFill = isDark ? '#aab4c0' : '#8b9baf';
    const labelBgFill = isDark ? '#1a1a2e' : '#f8f8f8';
    const labelBgStroke = isDark ? '#5a6b7f' : '#8b9baf';
    const selectedBorder = isDark ? '#fff' : '#000';

    graph = new Graph({
      animation: false,
      container: containerEl,
      width,
      height,
      theme,
      data: { nodes: g6Nodes, edges: g6Edges },
      autoFit: 'view',
      autoResize: true,
      padding: 20,
      plugins: title
        ? [{ key: 'title', type: 'title', title, titleFill: isDark ? '#e0e6ed' : '#1a1a2e' }]
        : [],
      node: {
        type: 'html',
        style: (d: NodeData) => {
          const color = nodeColorMap.get(String(d.id)) || colors[0];
          return {
            size: [DEFAULT_NODE_WIDTH, DEFAULT_NODE_HEIGHT],
            dx: -DEFAULT_NODE_WIDTH / 2,
            dy: -DEFAULT_NODE_HEIGHT / 2,
            innerHTML: createNodeHTML(d, color, selectedBorder),
            ports: [{ placement: 'top' as const }, { placement: 'bottom' as const }],
          };
        },
        state: {
          active: { halo: false },
          selected: { halo: false },
        },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 3,
          radius: 20,
          stroke: edgeStroke,
          endArrow: true,
          labelText: (d: any) => d.data?.text || '',
          labelFill,
          labelFontWeight: 600,
          labelBackground: true,
          labelBackgroundFill: labelBgFill,
          labelBackgroundOpacity: 1,
          labelBackgroundLineWidth: 3,
          labelBackgroundStroke: labelBgStroke,
          labelPadding: [1, 10],
          labelBackgroundRadius: 4,
          router: { type: 'orth' as const, padding: 40 },
        },
        state: {
          active: {
            stroke: ACTIVE_COLOR,
            labelBackgroundStroke: ACTIVE_COLOR,
            halo: false,
          },
        },
      },
      layout: {
        type: 'antv-dagre',
      },
      behaviors: ['drag-canvas', 'hover-element', 'click-select'],
    });

    graph.render();

    // Measure real node heights after initial render
    graph.once('afterrender', () => {
      if (graph) {
        measureAndUpdateNodeSizes(graph, containerEl, nodeColorMap, selectedBorder);
      }
    });
  };

  const destroy = (): void => {
    if (graph) {
      graph.destroy();
      graph = null;
    }
  };

  return {
    render,
    destroy,
    zoomTo: (zoom) => graph?.zoomTo(zoom),
    getZoom: () => graph?.getZoom(),
  };
};
