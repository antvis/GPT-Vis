import type { IndentedTreeOptions as ADCIndentedTreeOptions, G6 } from '@ant-design/graphs';
import { IndentedTree as ADCIndentedTree } from '@ant-design/graphs';
import { createElement, render } from 'preact/compat';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { G6THEME_MAP } from '../../util/theme';

/**
 * IndentedTree data type (tree structure)
 */
export type IndentedTreeData = {
  name: string;
  children?: IndentedTreeData[];
};

/**
 * IndentedTree configuration for rendering
 */
export interface IndentedTreeConfig {
  type?: 'indented-tree';
  data: IndentedTreeData;
  theme?: 'default' | 'academy';
}

/**
 * IndentedTree instance with render and destroy methods
 */
export interface IndentedTreeInstance {
  render: (config: IndentedTreeConfig) => void;
  destroy: () => void;
}

/**
 * IndentedTree using @ant-design/graphs.
 *
 * @example
 * ```ts
 * const indentedTree = IndentedTree({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * indentedTree.render({
 *   type: 'indented-tree',
 *   data: {
 *     name: 'Root',
 *     children: [
 *       { name: 'Child 1' },
 *       { name: 'Child 2', children: [{ name: 'Grandchild' }] },
 *     ],
 *   },
 * });
 *
 * indentedTree.destroy();
 * ```
 */
export const IndentedTree = (options: VisualizationOptions): IndentedTreeInstance => {
  const { theme: chartTheme = 'default' } = options;
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const renderComponent = (config: IndentedTreeConfig): void => {
    const { data, theme = chartTheme } = config;

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Configure the indented tree based on the existing React component
    const graphConfig: ADCIndentedTreeOptions = {
      data: graphData,
      type: 'linear',
      autoFit: 'view',
      autoResize: true,
      zoomRange: [0.3, 2],
      zoom: 1,
      node: { animation: { update: false, translate: false } },
      edge: { animation: { update: false, translate: false } },
      transforms: (prev: any[]) => [
        ...prev.filter(
          (transform: G6.CustomBehaviorOption) =>
            (transform as G6.BaseTransformOptions).type !== 'collapse-expand-react-node',
        ),
        {
          ...(prev.find(
            (transform) =>
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

    // Render using Preact compat
    render(createElement(ADCIndentedTree, graphConfig), container as HTMLElement);
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
