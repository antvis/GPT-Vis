import { Graph, treeToGraphData } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
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

// Data transformation helper
function visTreeData2GraphData(data: FishboneDiagramData) {
  return treeToGraphData(data as any, {
    getNodeData: (datum: any, depth: number) => {
      datum.id = datum.name;
      datum.depth = depth;
      if (!datum.children) return datum;
      const { children, ...restDatum } = datum;
      return {
        ...restDatum,
        children: children.map((child: any) => child.name),
      };
    },
    getEdgeData: (source: any, target: any) => ({
      source: source.name,
      target: target.name,
    }),
  });
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
      autoFit: {
        type: 'view',
        options: {
          when: 'overflow',
          direction: 'x',
        },
      },
      autoResize: true,
      padding: 20,
      node: {
        type: 'rect',
        style: (d: any) => {
          const style: any = {
            radius: 8,
            labelText: d.id,
            labelFontFamily: 'Gill Sans',
          };

          if (d.depth === 0) {
            // Root node
            Object.assign(style, {
              size: [150, 70],
              fill: '#EFF0F0',
              labelFill: '#262626',
              labelFontWeight: 'bold',
              labelFontSize: 24,
              labelPlacement: 'center',
            });
          } else if (d.depth === 1) {
            // First level branches
            Object.assign(style, {
              size: [120, 42],
              fill: d.style?.color || '#5B8FF9',
              labelFontSize: 18,
              labelFill: '#fff',
              labelPlacement: 'center',
            });
          } else {
            // Sub-branches
            Object.assign(style, {
              size: [2, 30],
              fill: 'transparent',
              labelFontSize: 16,
              labelFill: '#262626',
              labelPlacement: 'left',
            });
          }

          return style;
        },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 3,
          stroke: function (this: any, data: any) {
            return this.getNodeData(data.target).style.color || '#99ADD1';
          },
        },
      },
      layout: {
        type: 'fishbone',
        direction: 'RL',
        hGap: 40,
        vGap: 60,
      },
      behaviors: ['drag-canvas', 'zoom-canvas'],
      transforms: [
        {
          key: 'assign-color-by-branch',
          type: 'assign-color-by-branch',
          ...(themeColors?.palette ? { palette: themeColors.palette } : {}),
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
