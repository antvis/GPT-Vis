import type { G6, OrganizationChartOptions } from '@ant-design/graphs';
import { OrganizationChart as ADCOrganizationChart, RCNode } from '@ant-design/graphs';
import { h, render as preactRender } from 'preact';
import { visTreeData2GraphData, type TreeGraphData } from '../util/graph';

const { OrganizationChartNode } = RCNode;

export type OrganizationChartDataItem = TreeGraphData;

export interface OrganizationChartConfig {
  type?: 'organization-chart';
  data: OrganizationChartDataItem;
}

export interface OrganizationChartOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

export interface OrganizationChartInstance {
  render: (config: OrganizationChartConfig) => void;
  destroy: () => void;
}

const defaultConfig: OrganizationChartOptions = {
  padding: [40, 0, 0, 120],
  autoFit: 'view',
  autoResize: true,
  zoomRange: [0.1, 5],
  zoom: 1,
  node: {
    style: {
      component: (d: G6.NodeData) => {
        const isActive = d.states?.includes('active');
        return h(OrganizationChartNode as any, {
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
  behaviors: ['drag-canvas', 'hover-activate-neighbors'],
  transforms: (prev) => [
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

/**
 * OrganizationChart using @ant-design/graphs with preact.
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
 *   data: {
 *     name: 'CEO',
 *     description: 'Chief Executive Officer',
 *     children: [{ name: 'CTO', description: 'Technology' }],
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

  const render = (config: OrganizationChartConfig): void => {
    const { data } = config;

    const graphData = visTreeData2GraphData(data);

    // Use preact to render the React component
    preactRender(
      h(ADCOrganizationChart as any, {
        data: graphData,
        width,
        height,
        ...defaultConfig,
      }),
      container as HTMLElement,
    );
  };

  const destroy = (): void => {
    if (container) {
      preactRender(null, container as HTMLElement);
    }
  };

  return {
    render,
    destroy,
  };
};
