import { createGraph, G6 } from '@antv/g6-ssr';
import { G6THEME_MAP } from '../theme';
import { OrganizationChartNode, treeToGraphData } from '../util';
import { CommonOptions } from './types';

const { register, ExtensionCategory } = G6;

// Register the custom node for organization chart.
register(ExtensionCategory.NODE, 'organization-chart-node', OrganizationChartNode);

export type TreeGraphData = {
  name: string;
  description: string;
  children?: TreeGraphData[];
};

export type OrganizationChartOptions = CommonOptions & {
  /**
   * Data for the organization chart.
   */
  data: TreeGraphData;
  /**
   * The orient of the organization chart.
   * Can be 'vertical' or 'horizontal'.
   * Default is 'vertical'.
   */
  orient?: 'vertical' | 'horizontal';
};

/**
 * 组织架构图
 * @param options
 * @returns
 */
export async function OrganizationChart(options: OrganizationChartOptions) {
  const { data, width = 600, height = 400, theme = 'default', orient = 'vertical' } = options;
  const dataParse = treeToGraphData(data);

  const isHorizontal = orient === 'horizontal';

  return await createGraph({
    waitForRender: 300,
    width,
    height,
    data: dataParse,
    devicePixelRatio: 3,
    padding: 24,
    autoFit: {
      type: 'view',
    },
    node: {
      type: 'organization-chart-node',
      style: {
        labelPlacement: 'center',
        lineWidth: 0,
        ports: isHorizontal
          ? [{ placement: 'left' }, { placement: 'right' }]
          : [{ placement: 'top' }, { placement: 'bottom' }],
        radius: 4,
        shadowBlur: 10,
        shadowColor: '#e0e0e0',
        shadowOffsetX: 3,
        size: [200, 60],
      },
      palette: {
        type: 'group',
        field: (d: any) => d.data.name,
        color: G6THEME_MAP[theme].colors,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        router: {
          type: 'orth',
        },
        stroke: '#99ADD1',
      },
    },
    layout: {
      type: 'dagre',
      rankdir: isHorizontal ? 'LR' : 'TB',
    },
    animation: false,
    behaviors: [],
  });
}
