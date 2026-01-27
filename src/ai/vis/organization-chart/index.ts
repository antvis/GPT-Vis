import { Graph } from '@antv/g6';
import { getBackgroundColor, getBorderColor, getTextColor, getThemeColors } from '../../util/theme';
import { getG6ThemeTransform, treeToGraphData, type TreeData } from '../util/graph';

/**
 * OrganizationChart data item type
 */
export type OrganizationChartDataItem = TreeData;

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
  data: OrganizationChartDataItem;
  theme?: 'default' | 'academy' | 'dark';
  orient?: 'vertical' | 'horizontal';
  style?: {
    backgroundColor?: string;
  };
}

/**
 * OrganizationChart instance with render and destroy methods
 */
export interface OrganizationChartInstance {
  render: (config: OrganizationChartConfig) => void;
  destroy: () => void;
}

/**
 * OrganizationChart component using G6 5.0.
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
 *       {
 *         name: 'CTO',
 *         description: 'Chief Technology Officer',
 *       },
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
  let graph: Graph | null = null;

  const render = (config: OrganizationChartConfig): void => {
    const { data, theme = 'default', orient = 'vertical', style = {} } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const textColor = getTextColor(theme);
    const borderColor = getBorderColor(theme);
    const themeColors = getThemeColors(theme);
    const primaryColor = themeColors[0];
    const nodeBackgroundColor = theme === 'dark' ? '#1A1A1A' : '#E8F4FF';
    const isHorizontal = orient === 'horizontal';

    // Transform tree data to graph data
    const graphData = treeToGraphData(data);

    // Create and configure graph
    graph = new Graph({
      container: container as HTMLElement,
      width,
      height,
      autoFit: 'view',
      data: graphData,
      node: {
        type: 'rect',
        style: {
          size: [200, 60],
          radius: 4,
          labelText: (d: any) => `${d.id}\n${d.description || ''}`,
          labelPlacement: 'center',
          labelFontSize: 14,
          labelFill: textColor,
          fill: nodeBackgroundColor,
          lineWidth: 1,
          stroke: primaryColor,
          ports: isHorizontal
            ? [{ placement: 'left' }, { placement: 'right' }]
            : [{ placement: 'top' }, { placement: 'bottom' }],
        },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 1,
          stroke: borderColor,
          router: {
            type: 'orth',
          },
        },
      },
      layout: {
        type: 'dagre',
        rankdir: isHorizontal ? 'LR' : 'TB',
        nodesep: 40,
        ranksep: 80,
      },
      transforms: [getG6ThemeTransform(theme)],
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      background: backgroundColor,
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
