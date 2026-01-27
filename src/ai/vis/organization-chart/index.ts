import type {
  OrganizationChartOptions as ADCOrganizationChartOptions,
  G6,
} from '@ant-design/graphs';
import { OrganizationChart as ADCOrganizationChart, RCNode } from '@ant-design/graphs';
import { createElement, render } from 'preact/compat';
import { visTreeData2GraphData } from '../../util/graph';

const { OrganizationChartNode } = RCNode;

/**
 * OrganizationChart data type (tree structure)
 */
export type OrganizationChartData = {
  name: string;
  description?: string;
  children?: OrganizationChartData[];
};

/**
 * OrganizationChart initialization options
 */
export interface OrganizationChartOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

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
 * OrganizationChart using @ant-design/graphs.
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
export const OrganizationChart = (options: OrganizationChartOptions): OrganizationChartInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;

  const renderComponent = (config: OrganizationChartConfig): void => {
    const { data } = config;

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Configure the organization chart based on the existing React component
    const graphConfig: ADCOrganizationChartOptions = {
      data: graphData,
      width,
      height,
      padding: [40, 0, 0, 120],
      autoFit: 'view',
      autoResize: true,
      zoomRange: [0.1, 5],
      zoom: 1,
      node: {
        style: {
          component: (d: G6.NodeData) => {
            const isActive = d.states?.includes('active');
            return createElement(OrganizationChartNode, {
              name: d.name as string,
              position: d.description as string,
              status: 'online',
              isActive,
            });
          },
          size: [280, 80],
        },
      },
      edge: {
        state: {
          active: {
            stroke: '#1890ff',
            halo: false,
          },
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'hover-activate-neighbors'],
      transforms: (prev: any[]) => [
        ...prev.filter((t) => (t as G6.BaseTransformOptions).type !== 'collapse-expand-react-node'),
        {
          ...(prev.find(
            (t) => (t as G6.BaseTransformOptions).type === 'collapse-expand-react-node',
          ) as G6.BaseTransformOptions),
          enable: true,
          iconOffsetY: 24,
        },
      ],
      animation: false,
    };

    // Render using Preact compat
    render(createElement(ADCOrganizationChart, graphConfig), container as HTMLElement);
  };

  const destroy = (): void => {
    // Clean up by rendering null
    render(null, container as HTMLElement);
  };

  return {
    render: renderComponent,
    destroy,
  };
};
