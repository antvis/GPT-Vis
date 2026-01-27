import type { G6, MindMapOptions as ADCMindMapOptions } from '@ant-design/graphs';
import { MindMap as ADCMindMap } from '@ant-design/graphs';
import { h, render as preactRender } from 'preact';
import { visTreeData2GraphData } from '../../util/graph';

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
export interface MindMapOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

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

// Theme color mappings
const THEME_COLORS = {
  default: [
    '#1783FF',
    '#00C9C9',
    '#F0884D',
    '#D580FF',
    '#7863FF',
    '#60C42D',
    '#BD8F24',
    '#FF80CA',
    '#2491B3',
    '#17C76F',
  ],
  academy: [
    '#6B74E4',
    '#4BBDE3',
    '#F7C348',
    '#EF7C69',
    '#85CB56',
    '#D284E5',
    '#F09452',
    '#A9AABC',
    '#52C41A',
    '#5B8FF9',
  ],
};

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
export const MindMap = (
  options: MindMapOptions,
): MindMapInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;

  const render = (config: MindMapConfig): void => {
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
            (transform as G6.BaseTransformOptions).type !==
            'collapse-expand-react-node',
        ),
        {
          ...(prev.find(
            (transform: G6.CustomBehaviorOption) =>
              (transform as G6.BaseTransformOptions).type ===
              'collapse-expand-react-node',
          ) as G6.BaseTransformOptions),
          enable: true,
        },
        {
          ...(prev.find(
            (transform) => (transform as any).key === 'assign-color-by-branch',
          ) || ({} as any)),
          type: 'assign-color-by-branch',
          colors: THEME_COLORS[theme],
        },
      ],
      behaviors: ['drag-canvas'],
    };

    // Render using preact
    preactRender(h(ADCMindMap, graphConfig), container as HTMLElement);
  };

  const destroy = (): void => {
    // Clean up by rendering null
    preactRender(null, container as HTMLElement);
  };

  return {
    render,
    destroy,
  };
};
