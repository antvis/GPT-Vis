import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { renderOrgChartNode } from '../../util/nodes';

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
 * OrganizationChart using @antv/g6 directly.
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

  const renderComponent = (config: OrganizationChartConfig): void => {
    const { data } = config;

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Destroy existing graph if any
    if (graph) {
      graph.destroy();
    }

    // Create G6 graph with compact-box layout
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
            const isActive = d.states?.includes('active') || false;
            return renderOrgChartNode({
              name: d.id,
              description: d.description,
              isActive,
            });
          },
        },
      },
      edge: {
        type: 'polyline',
        style: {
          stroke: '#91CAFF',
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
        type: 'compact-box',
        direction: 'TB',
        getWidth: () => 280,
        getHeight: () => 80,
        getHGap: () => 40,
        getVGap: () => 40,
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        'hover-activate-neighbors',
        {
          type: 'collapse-expand',
          enable: true,
          iconOffsetY: 24,
        },
      ],
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
    render: renderComponent,
    destroy,
  };
};
