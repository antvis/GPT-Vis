import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { createOrganizationChartNode } from '../../util/html-nodes';

/**
 * OrganizationChart data type (tree structure)
 */
export type OrganizationChartData = {
  name: string;
  description?: string;
  children?: OrganizationChartData[];
};

/**
 * OrganizationChart configuration for rendering
 */
export interface OrganizationChartConfig {
  type?: 'organization-chart';
  data: OrganizationChartData;
}

/**
 * OrganizationChart instance with render and destroy methods
 */
export interface OrganizationChartInstance {
  render: (config: OrganizationChartConfig) => void;
  destroy: () => void;
}

/**
 * OrganizationChart using G6.
 *
 * @example
 * ```ts
 * const orgChart = OrganizationChart({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * orgChart.render({
 *   type: 'organization-chart',
 *   data: {
 *     name: 'CEO',
 *     description: 'Chief Executive Officer',
 *     children: [
 *       { name: 'CTO', description: 'Chief Technology Officer' },
 *       { name: 'CFO', description: 'Chief Financial Officer' },
 *     ],
 *   },
 * });
 *
 * orgChart.destroy();
 * ```
 */
export const OrganizationChart = (options: VisualizationOptions): OrganizationChartInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;
  let graph: Graph | null = null;

  const render = (config: OrganizationChartConfig): void => {
    const { data } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Configure the organization chart using G6 with HTML nodes
    graph = new Graph({
      container: container as HTMLElement,
      width,
      height,
      data: graphData,
      padding: [40, 0, 0, 120],
      autoFit: 'view',
      autoResize: true,
      zoomRange: [0.1, 5],
      zoom: 1,
      node: {
        type: 'html',
        style: {
          size: [280, 80],
          innerHTML: (d: any) => {
            const name = d.name || d.id || '';
            const position = d.description || '';
            const isActive = d.states?.includes('active');
            return createOrganizationChartNode({
              name,
              position,
              status: 'online',
              isActive,
            }).outerHTML;
          },
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
        },
      },
      edge: {
        type: 'polyline',
        style: {
          stroke: '#5B8FF9',
          lineWidth: 2,
          radius: 8,
        },
        state: {
          active: {
            stroke: '#1890ff',
            halo: false,
          },
        },
      },
      layout: {
        type: 'dagre',
        rankdir: 'TB',
        align: 'UL',
        nodesep: 30,
        ranksep: 50,
      },
      transforms: [
        'transform-v4-data',
        {
          type: 'collapse-expand',
          key: 'collapse-expand',
          enable: true,
          trigger: 'click',
        },
      ],
      behaviors: ['drag-canvas', 'zoom-canvas', 'hover-activate-neighbors'],
      animation: false,
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
  };
};
