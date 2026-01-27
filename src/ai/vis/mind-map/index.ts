import type { MindMapOptions as ADCMindMapOptions, G6 } from '@ant-design/graphs';
import { MindMap as ADCMindMap } from '@ant-design/graphs';
import { createElement, render } from 'preact/compat';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { G6THEME_MAP } from '../../util/theme';

/**
 * MindMap data type (tree structure)
 */
export type MindMapData = {
  name: string;
  children?: MindMapData[];
};

/**
 * MindMap initialization options
 */
export type MindMapOptions = VisualizationOptions;

/**
 * MindMap configuration for rendering
 */
export interface MindMapConfig {
  type?: 'mind-map';
  data: MindMapData;
  theme?: 'default' | 'academy';
}

/**
 * MindMap instance with render and destroy methods
 */
export interface MindMapInstance {
  render: (config: MindMapConfig) => void;
  destroy: () => void;
}

/**
 * MindMap using @ant-design/graphs.
 *
 * @example
 * ```ts
 * const mindMap = MindMap({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * mindMap.render({
 *   type: 'mind-map',
 *   data: {
 *     name: '项目计划',
 *     children: [
 *       { name: '研究阶段' },
 *       { name: '设计阶段' },
 *       { name: '开发阶段' },
 *     ],
 *   },
 * });
 *
 * mindMap.destroy();
 * ```
 */
export const MindMap = (options: MindMapOptions): MindMapInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;

  const renderComponent = (config: MindMapConfig): void => {
    const { data, theme = 'default' } = config;

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Configure the mind map based on the existing React component
    const graphConfig: ADCMindMapOptions = {
      data: graphData,
      width,
      height,
      type: 'boxed',
      autoFit: 'view',
      autoResize: true,
      padding: 2,
      zoomRange: [0.1, 5],
      zoom: 1,
      node: { animation: { translate: false, update: false } },
      edge: { animation: { translate: false, update: false } },
      transforms: (prev: any[]) => [
        ...prev.filter(
          (transform) =>
            (transform as G6.BaseTransformOptions).type !== 'collapse-expand-react-node',
        ),
        {
          ...(prev.find(
            (transform: G6.CustomBehaviorOption) =>
              (transform as G6.BaseTransformOptions).type === 'collapse-expand-react-node',
          ) as G6.BaseTransformOptions),
          enable: true,
        },
        {
          ...(prev.find((transform) => (transform as any).key === 'assign-color-by-branch') ||
            ({} as any)),
          ...G6THEME_MAP[theme],
        },
      ],
      behaviors: ['drag-canvas', 'zoom-canvas'],
    };

    // Render using Preact compat (compatible with React components from @ant-design/graphs)
    render(createElement(ADCMindMap, graphConfig), container as HTMLElement);
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
