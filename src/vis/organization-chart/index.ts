import { ExtensionCategory, Graph, Rect, register } from '@antv/g6';
import type { TreeGraphData, VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors } from '../../util/theme';

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
}

const NODE_WIDTH = 160;
const NODE_HEIGHT_WITH_DESC = 56;
const NODE_HEIGHT_NO_DESC = 40;
const ORG_CHART_NODE_TYPE = 'organization-chart-node';

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
 * Custom G6 node that extends Rect to render name (bold) + optional description (lighter)
 * as two separate text elements at fixed positions inside the rect.
 *
 * Per G6 v5 custom node docs: override render() and use this.upsert() to add shapes.
 * Properties passed via node.style in Graph config are available as attributes.*
 */
class OrganizationChartNodeShape extends Rect {
  getDescriptionStyle(attributes: Record<string, any>) {
    return {
      x: 0,
      y: 10,
      text: (attributes.descText as string) ?? '',
      fontSize: 11,
      fill: (attributes.descFill as string) ?? 'rgba(255,255,255,0.85)',
      textAlign: 'center' as const,
      textBaseline: 'middle' as const,
      fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif',
    };
  }

  drawDescriptionShape(attributes: Record<string, any>, container: any) {
    if (!attributes.descText) return;
    this.upsert('org-description', 'text', this.getDescriptionStyle(attributes), container);
  }

  render(attributes: Record<string, any> = this.parsedAttributes as any, container: any) {
    // Render the base Rect (background + border-radius) and the primary label (name)
    super.render(attributes as any, container);
    // Add secondary description text inside the node
    this.drawDescriptionShape(attributes, container);
  }
}

// Register once at module level; override flag avoids duplicate registration on HMR
register(ExtensionCategory.NODE, ORG_CHART_NODE_TYPE, OrganizationChartNodeShape);

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

    const colors =
      style.palette && style.palette.length > 0 ? style.palette : getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const isDark = theme === 'dark';

    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'gpt-vis-organization-chart-title';
      titleEl.style.cssText = `
        padding: 8px 12px 4px;
        font-size: 14px;
        font-weight: 600;
        color: ${isDark ? '#e0e0e0' : '#333'};
        background: ${backgroundColor};
      `;
      titleEl.textContent = title;
      containerEl.appendChild(titleEl);
    }

    const titleEl = containerEl.querySelector(
      '.gpt-vis-organization-chart-title',
    ) as HTMLElement | null;
    const titleHeight = titleEl ? titleEl.offsetHeight : 0;
    const parentHeight = containerEl.offsetHeight;
    const rawHeight =
      parentHeight > titleHeight ? parentHeight - titleHeight : (height || 400) - titleHeight;
    const graphHeight = Math.max(rawHeight, 0);
    const graphWidth = containerEl.offsetWidth || width || 600;

    const graphContainer = document.createElement('div');
    graphContainer.style.cssText = `
      width: 100%;
      height: ${graphHeight}px;
      background: ${backgroundColor};
      border-radius: 4px;
      overflow: hidden;
    `;
    containerEl.appendChild(graphContainer);

    // Flatten tree structure into G6 flat nodes + edges
    const flatNodes: FlatNode[] = [];
    const flatEdges: Array<{ source: string; target: string }> = [];
    flattenTree(data, 0, '0', flatNodes, flatEdges);

    const descFill = isDark ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.90)';

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
      container: graphContainer,
      width: graphWidth,
      height: graphHeight,
      autoFit: 'view',
      padding: 24,
      data: { nodes: nodeData, edges: edgeData },
      node: {
        type: ORG_CHART_NODE_TYPE,
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
          // Primary label: name — shifted up when description is present
          labelText: (d: OrgNodeStyleInput) => d.data.name,
          labelFill: '#ffffff',
          labelFontSize: 13,
          labelFontWeight: 600,
          labelPlacement: 'center' as const,
          labelOffsetY: (d: OrgNodeStyleInput) => (d.data.description ? -8 : 0),
          // Custom properties consumed by OrganizationChartNodeShape.drawDescriptionShape()
          descText: (d: OrgNodeStyleInput) => d.data.description ?? '',
          descFill,
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
      behaviors: ['drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  };

  const destroy = (): void => {
    if (graph) {
      graph.destroy();
      graph = null;
    }
  };

  return { render, destroy };
};
