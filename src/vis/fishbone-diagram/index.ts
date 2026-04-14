import { Graph, treeToGraphData } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, normalizePalette } from '../../util/theme';

/**
 * FishboneDiagramConfig defines the configuration for rendering the fishbone diagram.
 */
export interface FishboneDiagramConfig {
  type?: 'fishbone-diagram';
  data: any; // TreeData;
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    /** Custom color palette for branch nodes, overrides theme default */
    palette?: string[];
    /** Canvas background color, overrides theme default */
    backgroundColor?: string;
    /** Node rendering style: 'rough' for hand-drawn look, 'default' for smooth */
    texture?: 'rough' | 'default';
  };
}

/**
 * FishboneDiagramInstance represents a fishbone diagram instance.
 */
export interface FishboneDiagramInstance {
  render: (config: FishboneDiagramConfig) => void;
  destroy: () => void;
  zoomTo: (zoom: number) => void;
  getZoom: () => number | undefined;
}

const FONT_FAMILY = 'system-ui, sans-serif';

function getNodeSize(id: string, depth: number): [number, number] {
  return depth === 0
    ? [measureText(id, 24, 'bold') + 80, 70]
    : depth === 1
      ? [measureText(id, 18) + 50, 42]
      : [2, 30];
}

function measureText(text: string, fontSize = 12, fontWeight = 'normal'): number {
  if (typeof document === 'undefined') return text.length * fontSize * 0.6;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;

  ctx.font = `${fontWeight} ${fontSize}px ${FONT_FAMILY}`;
  return ctx.measureText(text).width;
}

/**
 * Convert name-based tree to G6 tree format (name → id).
 */
function toG6TreeData(node: any): any {
  return {
    id: node.name,
    children: (node.children || []).map(toG6TreeData),
  };
}

/**
 * Convert GPT-Vis tree data to flat G6 graph data, attaching depth to each node.
 */
function convertData(data: any) {
  return treeToGraphData(toG6TreeData(data), {
    getNodeData: (datum: any, depth: number) => {
      datum.depth = depth;
      if (!datum.children) return datum;
      const { children, ...rest } = datum;
      return { ...rest, children: children.map((c: any) => c.id) };
    },
  });
}

/**
 * Assign a unique palette color to each depth-1 branch node so that each
 * branch is visually distinct, matching the v0.6.1 multi-color style.
 */
function assignBranchColors(graphData: any, palette: string[]): void {
  const nodes: any[] = graphData.nodes || [];
  let colorIndex = 0;
  nodes
    .filter((n) => n.depth === 1)
    .forEach((n) => {
      n.style = n.style || {};
      n.style.branchColor = palette[colorIndex++ % palette.length];
    });
}

/**
 * FishboneDiagram chart component using G6 with fishbone layout.
 */
export const FishboneDiagram = (options: VisualizationOptions): FishboneDiagramInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let graph: Graph | null = null;

  const render = (config: FishboneDiagramConfig): void => {
    const { data, theme = chartTheme, style = {} } = config;

    if (!data?.name) {
      throw new Error('FishboneDiagram: data with a name field is required');
    }

    if (graph) {
      graph.destroy();
      graph = null;
    }

    const containerEl =
      typeof container === 'string' ? document.querySelector<HTMLElement>(container) : container;

    if (!containerEl) throw new Error('FishboneDiagram: container element not found');

    containerEl.innerHTML = '';

    // Theme-derived colors, allowing style.palette to override the theme default
    const isDark = theme === 'dark';
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const palette = normalizePalette(style.palette, theme);
    const rootFill = isDark ? '#2a2a2a' : '#EFF0F0';
    const rootLabelFill = isDark ? '#e0e0e0' : '#262626';
    const leafLabelFill = isDark ? '#c0c0c0' : '#262626';
    const edgeStroke = isDark ? '#555' : '#99ADD1';

    containerEl.style.backgroundColor = backgroundColor;

    const graphWidth = containerEl.offsetWidth || width || 600;
    const graphHeight = containerEl.offsetHeight || height || 400;

    const graphData = convertData(data);
    assignBranchColors(graphData, palette);

    graph = new Graph({
      container: containerEl,
      width: graphWidth,
      height: graphHeight,
      autoFit: 'view',
      padding: 20,
      theme: chartTheme,
      data: graphData,
      node: {
        type: 'rect',
        style: (d: any) => {
          const depth = d.depth ?? 0;
          const nodeStyle: any = {
            radius: 8,
            size: getNodeSize(String(d.id), depth),
            labelText: String(d.id),
            labelPlacement: 'left',
            labelFontFamily: FONT_FAMILY,
          };

          if (depth === 0) {
            Object.assign(nodeStyle, {
              fill: rootFill,
              labelFill: rootLabelFill,
              labelFontWeight: 'bold',
              labelFontSize: 24,
              labelOffsetY: 4,
              labelPlacement: 'center',
            });
          } else if (depth === 1) {
            const color = (d.style as any)?.branchColor || palette[0];
            Object.assign(nodeStyle, {
              fill: color,
              labelFill: '#fff',
              labelFontSize: 18,
              labelPlacement: 'center',
            });
          } else {
            Object.assign(nodeStyle, {
              fill: 'transparent',
              labelFill: leafLabelFill,
              labelFontSize: 16,
            });
          }

          if (style.texture === 'rough') {
            nodeStyle.lineWidth = 0.5;
          }

          return nodeStyle;
        },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 3,
          stroke: edgeStroke,
          ...(style.texture === 'rough' ? { labelFontFamily: 'Comic Sans MS' } : {}),
        },
      },
      layout: {
        type: 'fishbone',
        direction: 'RL',
        hGap: 40,
        vGap: 60,
      },
      behaviors: ['drag-canvas'],
    });

    graph.render();
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
    zoomTo: (zoom: number) => graph?.zoomTo(zoom),
    getZoom: () => graph?.getZoom() ?? 1,
  };
};
