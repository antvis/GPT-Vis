import type { FishboneOptions } from '@ant-design/graphs';
import { Fishbone as ADCFishbone } from '@ant-design/graphs';
import { createElement, render } from 'preact/compat';
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
 * FishboneDiagram using @ant-design/graphs.
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

  const renderComponent = (config: FishboneDiagramConfig): void => {
    const { data, theme = 'default' } = config;

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Configure the fishbone diagram based on the existing React component
    const graphConfig: FishboneOptions = {
      data: graphData,
      autoFit: 'view',
      autoResize: true,
      zoomRange: [0.3, 2],
      zoom: 1,
      behaviors: ['drag-canvas', 'zoom-canvas'],
      transforms: (prev: any[]) => [
        {
          ...(prev.find((transform) => (transform as any).key === 'assign-color-by-branch') ||
            ({} as any)),
          ...G6THEME_MAP[theme],
        },
      ],
    };

    // Render using Preact compat
    render(createElement(ADCFishbone, graphConfig), container as HTMLElement);
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
