import { Graph, treeToGraphData } from '@antv/g6';
import {
  adaptG6ElementStyle,
  adaptG6Title,
  getG6TitlePadding,
  resolveG6ChartTheme,
} from '../../theme';
import { getBackgroundColor, normalizePalette } from '../../theme/builtins';
import type {
  FishboneDiagramChartStyle,
  G6NodeVisualStyle,
  ThemeInput,
  VisualizationOptions,
} from '../../types';

export interface FishboneNode {
  name: string;
  children?: FishboneNode[];
}

/**
 * FishboneDiagramConfig defines the configuration for rendering the fishbone diagram.
 */
export interface FishboneDiagramConfig {
  type?: 'fishbone-diagram';
  data: FishboneNode;
  theme?: ThemeInput;
  title?: string;
  subtitle?: string;
  style?: FishboneDiagramChartStyle;
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

function getNodeSize(text: string, depth: number, style: G6NodeVisualStyle): [number, number] {
  const defaultFontSize = depth === 0 ? 24 : depth === 1 ? 18 : 16;
  const fontSize = style.labelFontSize ?? defaultFontSize;
  const scale = fontSize / defaultFontSize;
  if (depth >= 2) return [2, Math.ceil(30 * scale)];

  const textWidth = measureText(text, fontSize, style.labelFontWeight, style.labelFontFamily);
  return [
    Math.ceil(textWidth + (depth === 0 ? 80 : 50) * scale),
    Math.ceil((depth === 0 ? 70 : 42) * scale),
  ];
}

const measureText = (function () {
  let canvas: HTMLCanvasElement | null = null;
  return (
    text: string,
    fontSize = 12,
    fontWeight: string | number = 'normal',
    fontFamily = FONT_FAMILY,
  ): number => {
    if (typeof document === 'undefined') return text.length * fontSize * 0.6;
    if (!canvas) canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return text.length * fontSize * 0.6;

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    return ctx.measureText(text).width;
  };
})();

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
    const { data, theme = chartTheme, title, subtitle, style: localStyle = {} } = config;

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
    const { baseTheme, rendererTheme, style } = resolveG6ChartTheme('fishbone-diagram', theme, {
      style: localStyle,
    });
    const isDark = baseTheme === 'dark';
    const backgroundColor = style.backgroundColor || getBackgroundColor(baseTheme);
    const palette = normalizePalette(style.palette, baseTheme);
    const rootFill = isDark ? '#2a2a2a' : '#EFF0F0';
    const rootLabelFill = isDark ? '#e0e0e0' : '#262626';
    const leafLabelFill = isDark ? '#c0c0c0' : '#262626';
    const edgeStroke = isDark ? '#555' : '#99ADD1';
    const nodeTheme = adaptG6ElementStyle('node', {}, style.node).style;
    // Deep nodes only anchor the layout; their labels consume the theme,
    // while box paint (including outlines and shadows) belongs to depths 0–1.
    const leafTheme = Object.fromEntries(
      Object.entries(nodeTheme).filter(([key]) => key.startsWith('label')),
    );
    const edgeTheme = adaptG6ElementStyle('edge', {}, style.edge).style;

    containerEl.style.backgroundColor = backgroundColor;

    const graphData = convertData(data);
    assignBranchColors(graphData, palette);

    graph = new Graph({
      animation: false,
      container: containerEl,
      width,
      height,
      autoFit: 'view',
      autoResize: true,
      padding: getG6TitlePadding(title, subtitle, style.title),
      theme: rendererTheme,
      plugins: adaptG6Title(title, subtitle, style.title, {
        titleFill: isDark ? '#e0e6ed' : '#000',
        titleFontFamily: 'sans-serif',
      }),
      data: graphData,
      node: {
        type: 'rect',
        style: (d: any) => {
          const depth = d.depth ?? 0;
          const nodeStyle: any = {
            radius: baseTheme === 'academy' ? 0 : 8,
            labelText: String(d.id),
            labelPlacement: 'left',
            labelFontFamily: FONT_FAMILY,
          };

          if (style.texture === 'rough') {
            nodeStyle.lineWidth = 0.5;
          }

          if (depth === 0) {
            Object.assign(nodeStyle, {
              fill: rootFill,
              labelFill: rootLabelFill,
              labelFontWeight: 'bold',
              labelFontSize: 24,
              labelOffsetY: 0,
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
              stroke: 'transparent',
              lineWidth: 0,
              labelFill: leafLabelFill,
              labelFontSize: 16,
            });
          }

          Object.assign(nodeStyle, depth < 2 ? nodeTheme : leafTheme);
          nodeStyle.size = getNodeSize(String(d.id), depth, nodeStyle);

          return nodeStyle;
        },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 3,
          stroke: edgeStroke,
          ...(style.texture === 'rough' ? { labelFontFamily: 'Comic Sans MS' } : {}),
          ...edgeTheme,
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
