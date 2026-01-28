import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { createTextNode } from '../../util/html-nodes';
import { measureTextSize } from '../../util/measure-text';
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
 * FishboneDiagram using G6.
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

  const render = (config: FishboneDiagramConfig): void => {
    const { data, theme = 'default' } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Get theme colors
    const themeConfig = G6THEME_MAP[theme];

    const PADDING = [24, 16];

    // Configure the fishbone diagram using G6 with HTML nodes
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
        type: 'html',
        style: {
          size: (d: any) => {
            const label = d.id || d.name || '';
            return measureTextSize(label, PADDING);
          },
          innerHTML: (d: any) => {
            const depth = d.depth || 0;
            const color = d.style?.color || themeConfig.colors?.[depth % themeConfig.colors.length] || '#1783ff';
            const label = d.id || d.name || '';
            const isActive = d.states?.includes('active');
            
            return createTextNode({
              type: 'filled',
              text: label,
              color,
              isActive,
            }).outerHTML;
          },
        },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 2,
          stroke: function (d: any) {
            const source = (this as unknown as Graph).getNodeData(d.source);
            const depth = source?.depth || 0;
            return source?.style?.color || themeConfig.colors?.[depth % themeConfig.colors.length] || '#99ADD1';
          },
        },
      },
      layout: {
        type: 'fishbone',
        direction: 'LR',
        getHeight: (d: any) => {
          const label = d.id || d.name || '';
          const [, h] = measureTextSize(label, PADDING);
          return h;
        },
        getWidth: (d: any) => {
          const label = d.id || d.name || '';
          const [w] = measureTextSize(label, PADDING);
          return w;
        },
        getVGap: () => 20,
        getHGap: () => 60,
      },
      transforms: [
        'transform-v4-data',
        {
          ...themeConfig,
          type: 'assign-color-by-branch',
          key: 'assign-color-by-branch',
        },
      ],
      behaviors: ['drag-canvas', 'zoom-canvas'],
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
