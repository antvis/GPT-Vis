import { Graph } from '@antv/g6';
import type { TreeGraphData, VisualizationOptions } from '../../types';
import { getBackgroundColor, normalizePalette } from '../../util/theme';

export type OrganizationChartData = TreeGraphData;

/**
 * OrganizationChartConfig defines the configuration for rendering the organization chart.
 */
export interface OrganizationChartConfig {
  type?: 'organization-chart';
  data: OrganizationChartData;
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * OrganizationChartInstance represents a chart instance with render and destroy methods.
 */
export interface OrganizationChartInstance {
  render: (config: OrganizationChartConfig) => void;
  destroy: () => void;
  zoomTo: (zoom: number) => void;
  getZoom: () => number | undefined;
}

const NODE_WIDTH = 160;
// Keep stable layout height when description exists.
const NODE_HEIGHT_WITH_DESC = 72;
const NODE_HEIGHT_NO_DESC = 40;
const FONT_FAMILY = 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif';
const LABEL_MAX_WIDTH = NODE_WIDTH - 16; // padding

/** Business data stored in each G6 node's `data` field. */
interface OrgNodeData {
  name: string;
  description?: string;
  depth: number;
}

/** Shorthand for the G6 node style callback argument shape. */
type OrgNodeStyleInput = { data: OrgNodeData };

interface FlatNode {
  /** Path-based unique ID (e.g. "0", "0-1", "0-1-2") to avoid collisions with duplicate names. */
  id: string;
  name: string;
  description?: string;
  depth: number;
}

/**
 * Recursively flatten a tree into flat nodes and edges arrays for G6.
 * Uses path-index IDs instead of names to prevent duplicate-name collisions.
 */
function flattenTree(
  node: OrganizationChartData,
  depth: number,
  pathId: string,
  nodes: FlatNode[],
  edges: Array<{ source: string; target: string }>,
): void {
  nodes.push({ id: pathId, name: node.name, description: node.description, depth });
  (node.children ?? []).forEach((child, index) => {
    // Use an underscore separator to avoid ambiguity with auto-generated edge IDs.
    // Some render/layout internals may derive edge IDs by concatenating source/target with "-",
    // and using "-" inside node IDs can lead to collisions in rare cases.
    const childId = `${pathId}_${index}`;
    edges.push({ source: pathId, target: childId });
    flattenTree(child, depth + 1, childId, nodes, edges);
  });
}

/**
 * OrganizationChart component using G6 5.0.
 * - dagre (TB) layout for hierarchical structure
 * - custom rect node with name + description labels
 * - depth-based color cycling
 *
 * @example
 * ```ts
 * const chart = OrganizationChart({ container: '#container', width: 600, height: 400 });
 *
 * chart.render({
 *   type: 'organization-chart',
 *   data: {
 *     name: 'Alice Johnson',
 *     description: 'Chief Technology Officer',
 *     children: [
 *       {
 *         name: 'Bob Smith',
 *         description: 'Senior Software Engineer',
 *         children: [
 *           { name: 'Charlie Brown', description: 'Software Engineer' },
 *           { name: 'Diana White',   description: 'Software Engineer' },
 *         ],
 *       },
 *       {
 *         name: 'Eve Black',
 *         description: 'IT Support Department Head',
 *         children: [
 *           { name: 'Frank Green', description: 'IT Support Specialist' },
 *           { name: 'Grace Blue',  description: 'IT Support Specialist' },
 *         ],
 *       },
 *     ],
 *   },
 * });
 *
 * chart.destroy();
 * ```
 */
export const OrganizationChart = (options: VisualizationOptions): OrganizationChartInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let graph: Graph | null = null;

  const render = (config: OrganizationChartConfig): void => {
    const { data, theme = chartTheme, title, style = {} } = config;

    if (!data || !data.name) {
      throw new Error('OrganizationChart: data with a name field is required');
    }

    if (graph) {
      graph.destroy();
      graph = null;
    }

    const containerEl =
      typeof container === 'string' ? document.querySelector<HTMLElement>(container) : container;

    if (!containerEl) {
      throw new Error('OrganizationChart: container element not found');
    }

    containerEl.innerHTML = '';

    const colors = normalizePalette(style.palette, theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const isDark = theme === 'dark';

    containerEl.style.background = backgroundColor;
    containerEl.style.borderRadius = '4px';
    containerEl.style.overflow = 'hidden';

    // Flatten tree structure into G6 flat nodes + edges
    const flatNodes: FlatNode[] = [];
    const flatEdges: Array<{ source: string; target: string }> = [];
    flattenTree(data, 0, '0', flatNodes, flatEdges);

    // Store node business data in the `data` field so style functions can access it via d.data.*
    const nodeData = flatNodes.map((node) => ({
      id: node.id,
      data: {
        name: node.name,
        description: node.description,
        depth: node.depth,
      } satisfies OrgNodeData,
    }));

    const edgeData = flatEdges.map((edge) => ({
      id: `e__${edge.source}__${edge.target}`,
      source: edge.source,
      target: edge.target,
    }));

    graph = new Graph({
      animation: false,
      container: containerEl,
      width,
      height,
      autoFit: 'view',
      autoResize: true,
      padding: title ? [46, 20, 20, 20] : 20,
      data: { nodes: nodeData, edges: edgeData },
      plugins: [
        {
          type: 'tooltip',
          trigger: 'hover',
          enable: (e: any) => e?.targetType === 'node',
          offset: [10, 10],
          getContent: (e: any, items: any[]) => {
            const item = items?.[0];
            const biz = item?.data as OrgNodeData | undefined;
            if (!biz) return '';
            const name = escapeHtml(String(biz.name ?? ''));
            const desc = biz.description ? escapeHtml(String(biz.description)) : '';
            return `
              <div style="max-width:260px;font-family:${FONT_FAMILY};">
                <div style="font-weight:700;font-size:12px;line-height:1.2;margin-bottom:${desc ? '4px' : '0'};">
                  ${name}
                </div>
                ${
                  desc
                    ? `<div style="font-size:12px;line-height:1.35;opacity:${
                        isDark ? '0.86' : '0.78'
                      };">${desc}</div>`
                    : ''
                }
              </div>
            `;
          },
          style: {
            '.tooltip': {
              background: isDark ? 'rgba(20,20,20,0.92)' : 'rgba(255,255,255,0.96)',
              color: isDark ? '#f2f2f2' : '#1f1f1f',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)'}`,
              borderRadius: 8,
              boxShadow: '0 12px 28px rgba(0,0,0,0.16)',
              padding: '8px 10px',
              pointerEvents: 'none',
            },
          },
        },
        ...(title
          ? [
              {
                key: 'title',
                type: 'title',
                title,
                titleFill: isDark ? '#e0e6ed' : '#000',
                titleFontFamily: 'sans-serif',
              },
            ]
          : []),
      ],
      node: {
        type: 'rect',
        style: {
          // size: [width, height] is the correct API for rect nodes in G6 v5
          size: (d: OrgNodeStyleInput) => [
            NODE_WIDTH,
            d.data.description ? NODE_HEIGHT_WITH_DESC : NODE_HEIGHT_NO_DESC,
          ],
          fill: (d: OrgNodeStyleInput) => colors[d.data.depth % colors.length],
          stroke: isDark ? '#555' : '#e8ebf0',
          lineWidth: 1,
          radius: 8,
          // Use official label wrapping/ellipsis for BOTH name & description.
          // 1 line name + up to 2 lines description => total maxLines = 3.
          labelText: (d: OrgNodeStyleInput) =>
            d.data.description ? `${d.data.name}\n${d.data.description}` : d.data.name,
          labelFill: '#ffffff',
          labelFontSize: 12,
          labelFontWeight: 600,
          labelWordWrap: true,
          labelWordWrapWidth: LABEL_MAX_WIDTH,
          labelMaxLines: (d: OrgNodeStyleInput) => (d.data.description ? 3 : 1),
          labelLineHeight: 14,
          labelPlacement: 'center' as const,
        } as any,
      },
      edge: {
        // Use a tree-friendly edge type that does not depend on node ports.
        type: 'cubic-vertical',
        style: {
          stroke: isDark ? '#4a4a4a' : '#d0d7e0',
          lineWidth: 1.5,
          endArrow: false,
          startArrow: false,
        },
      },
      layout: {
        type: 'dagre',
        rankdir: 'TB',
        nodesep: 40,
        ranksep: 60,
        // Dynamic nodeSize lets dagre calculate accurate per-node spacing
        nodeSize: (d: OrgNodeStyleInput) =>
          [NODE_WIDTH, d.data.description ? NODE_HEIGHT_WITH_DESC : NODE_HEIGHT_NO_DESC] as [
            number,
            number,
          ],
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
    zoomTo: (zoom) => graph?.zoomTo(zoom),
    getZoom: () => graph?.getZoom(),
  };
};

function escapeHtml(input: string): string {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
