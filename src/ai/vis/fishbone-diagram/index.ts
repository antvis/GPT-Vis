import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { G6THEME_MAP } from '../../util/theme';

/**
 * FishboneDiagram data type (tree structure)
 */
export type FishboneDiagramData = {
  name: string;
  children?: FishboneDiagramData[];
};

/**
 * FishboneDiagram configuration for rendering
 */
export interface FishboneDiagramConfig {
  type?: 'fishbone-diagram';
  data: FishboneDiagramData;
  theme?: 'default' | 'academy';
}

/**
 * FishboneDiagram instance with render and destroy methods
 */
export interface FishboneDiagramInstance {
  render: (config: FishboneDiagramConfig) => void;
  destroy: () => void;
}

/**
 * FishboneDiagram using @antv/g6 directly.
 *
 * @example
 * ```ts
 * const fishbone = FishboneDiagram({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * fishbone.render({
 *   type: 'fishbone-diagram',
 *   data: {
 *     name: 'Problem',
 *     children: [
 *       {
 *         name: 'Cause 1',
 *         children: [{ name: 'Sub-cause 1.1' }, { name: 'Sub-cause 1.2' }],
 *       },
 *       { name: 'Cause 2' },
 *     ],
 *   },
 * });
 *
 * fishbone.destroy();
 * ```
 */
export const FishboneDiagram = (options: VisualizationOptions): FishboneDiagramInstance => {
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

  const renderComponent = (config: FishboneDiagramConfig): void => {
    const { data, theme = 'default' } = config;

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Destroy existing graph if any
    if (graph) {
      graph.destroy();
    }

    const themeColors = G6THEME_MAP[theme];

    // Create G6 graph with fishbone layout
    graph = new Graph({
      container: container as HTMLElement,
      width,
      height,
      data: graphData,
      autoFit: 'view',
      autoResize: true,
      zoomRange: [0.1, 5],
      zoom: 1,
      node: {
        type: 'rect',
        style: {
          size: [100, 30],
          fill: '#5B8FF9',
          stroke: '#5B8FF9',
          lineWidth: 1,
          radius: 4,
          labelText: (d: any) => d.id,
          labelFontSize: 12,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      edge: {
        type: 'polyline',
        style: {
          stroke: '#5B8FF9',
          lineWidth: 2,
          strokeOpacity: 0.6,
        },
      },
      layout: {
        type: 'fishbone',
        direction: 'LR',
        hGap: 20,
        vGap: 20,
      },
      behaviors: ['drag-canvas', 'zoom-canvas'],
      transforms: [
        {
          key: 'assign-color-by-branch',
          type: 'assign-color-by-branch',
          palette: themeColors?.palette || [
            '#1783FF',
            '#00C9C9',
            '#F08F56',
            '#D580FF',
          ],
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
