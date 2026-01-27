import type { G6, IndentedTreeOptions } from '@ant-design/graphs';
import { IndentedTree as ADCIndentedTree } from '@ant-design/graphs';
import { h, render as preactRender } from 'preact';
import { G6THEME_MAP } from '../../../theme';
import { visTreeData2GraphData, type TreeGraphData } from '../util/graph';

export type IndentedTreeDataItem = TreeGraphData;

export interface IndentedTreeConfig {
  type?: 'indented-tree';
  data: IndentedTreeDataItem;
  theme?: 'default' | 'academy';
}

export interface IndentedTreeOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

export interface IndentedTreeInstance {
  render: (config: IndentedTreeConfig) => void;
  destroy: () => void;
}

const getDefaultConfig = (theme: 'default' | 'academy' = 'default') => {
  return {
    type: 'linear' as const,
    autoFit: 'view' as const,
    autoResize: true as const,
    zoomRange: [0.1, 5] as [number, number],
    zoom: 1,
    node: { animation: { update: false, translate: false } } as const,
    edge: { animation: { update: false, translate: false } } as const,
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
    behaviors: ['drag-canvas'],
  };
};

/**
 * IndentedTree using @ant-design/graphs with preact.
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
 *   data: {
 *     name: 'Root',
 *     children: [
 *       { name: 'Child 1', children: [{ name: 'Grandchild' }] },
 *     ],
 *   },
 * });
 *
 * indentedTree.destroy();
 * ```
 */
export const IndentedTree = (options: IndentedTreeOptions): IndentedTreeInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;

  const render = (config: IndentedTreeConfig): void => {
    const { data, theme = 'default' } = config;

    const graphData = visTreeData2GraphData(data);
    const defaultConfig = getDefaultConfig(theme);

    // Use preact to render the React component
    preactRender(
      h(ADCIndentedTree as any, {
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
