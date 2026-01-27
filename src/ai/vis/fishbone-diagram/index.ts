import { Graph } from '@antv/g6';
import {
  getBackgroundColor,
  getBorderColor,
  getSecondaryBackgroundColor,
  getTextColor,
  getThemeColors,
} from '../../util/theme';
import { getG6ThemeTransform, treeToGraphData, type TreeData } from '../util/graph';

/**
 * FishboneDiagram data item type
 */
export type FishboneDiagramDataItem = TreeData;

/**
 * FishboneDiagram initialization options
 */
export interface FishboneDiagramOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * FishboneDiagram configuration for rendering
 */
export interface FishboneDiagramConfig {
  type?: 'fishbone-diagram';
  data: FishboneDiagramDataItem;
  theme?: 'default' | 'academy' | 'dark';
  style?: {
    backgroundColor?: string;
  };
}

/**
 * FishboneDiagram instance with render and destroy methods
 */
export interface FishboneDiagramInstance {
  render: (config: FishboneDiagramConfig) => void;
  destroy: () => void;
}

/**
 * FishboneDiagram component using G6 5.0.
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
 *     name: '问题',
 *     children: [
 *       {
 *         name: '原因1',
 *         children: [{ name: '子原因1-1' }, { name: '子原因1-2' }],
 *       },
 *     ],
 *   },
 * });
 *
 * fishbone.destroy();
 * ```
 */
export const FishboneDiagram = (options: FishboneDiagramOptions): FishboneDiagramInstance => {
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
    const { data, theme = 'default', style = {} } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const textColor = getTextColor(theme);
    const secondaryBgColor = getSecondaryBackgroundColor(theme);
    const borderColor = getBorderColor(theme);
    const themeColors = getThemeColors(theme);
    const primaryColor = themeColors[0];
    const whiteOrBlack = theme === 'dark' ? '#000' : '#FFF';

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
        style: (d: any) => {
          const depth = d.depth || 0;
          if (depth === 0) {
            // Root node (problem/effect)
            return {
              size: [140, 60],
              radius: 8,
              labelText: d.id,
              labelPlacement: 'center',
              labelFontSize: 18,
              labelFontWeight: 'bold',
              labelFill: textColor,
              fill: secondaryBgColor,
              lineWidth: 2,
            };
          } else if (depth === 1) {
            // Primary branches (main causes)
            return {
              size: [120, 40],
              radius: 8,
              labelText: d.id,
              labelPlacement: 'center',
              labelFontSize: 16,
              labelFill: whiteOrBlack,
              fill: d.style?.color || primaryColor,
              lineWidth: 2,
            };
          } else {
            // Sub-branches (sub-causes)
            return {
              size: [2, 30],
              labelText: d.id,
              labelPlacement: 'left',
              labelOffsetX: 10,
              labelFontSize: 14,
              labelFill: textColor,
              fill: 'transparent',
              lineWidth: 0,
            };
          }
        },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 2,
          stroke: borderColor,
        },
      },
      layout: {
        type: 'fishbone',
        direction: 'RL',
        hGap: 40,
        vGap: 60,
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
