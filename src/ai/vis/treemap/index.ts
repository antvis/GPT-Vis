import { Chart } from '@antv/g2';
import { getBackgroundColor, getTheme, getThemeColors } from '../../util/theme';

/**
 * TreemapDataItem is the type for each data item in the treemap chart.
 */
export type TreemapDataItem = {
  name: string;
  value: number;
  children?: TreemapDataItem[];
};

/**
 * TreemapOptions defines the initialization options for Treemap chart.
 */
export interface TreemapOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * TreemapConfig defines the configuration for rendering the treemap chart.
 */
export interface TreemapConfig {
  type?: 'treemap';
  data: TreemapDataItem[];
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * TreemapInstance represents a treemap chart instance with render and destroy methods.
 */
export interface TreemapInstance {
  render: (config: TreemapConfig) => void;
  destroy: () => void;
}

/**
 * Treemap chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const treemap = Treemap({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * treemap.render({
 *   type: 'treemap',
 *   data: [
 *     {
 *       name: 'A',
 *       value: 100,
 *       children: [
 *         { name: 'A1', value: 40 },
 *         { name: 'A2', value: 30 },
 *         { name: 'A3', value: 30 },
 *       ],
 *     },
 *     {
 *       name: 'B',
 *       value: 80,
 *       children: [
 *         { name: 'B1', value: 50 },
 *         { name: 'B2', value: 30 },
 *       ],
 *     },
 *   ],
 *   theme: 'academy'
 * });
 *
 * treemap.destroy();
 * ```
 */
export const Treemap = (options: TreemapOptions): TreemapInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the treemap chart with the given configuration.
   */
  const render = (config: TreemapConfig): void => {
    const { data = [], theme = 'default', title, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'treemap',
      data: {
        type: 'inline',
        value: {
          name: 'root',
          children: data,
        },
      },
      title: title ?? '',
      layout: {
        tile: 'treemapBinary',
        paddingInner: 2,
      },
      encode: {
        value: 'value',
      },
      style: {
        fillOpacity: 0.8,
        labelFontSize: 10,
      },
      scale: {
        color: { range: colors },
      },
      legend: false,
      tooltip: {
        items: [
          (d: any) => ({
            name: d.data?.name || d.name,
            value: d.data?.value || d.value,
          }),
        ],
      },
      viewStyle: {
        viewFill: backgroundColor,
      },
      theme: getTheme(theme),
    };

    chart.options(chartOptions);
    chart.render();
  };

  /**
   * Destroy the chart instance and clean up resources.
   */
  const destroy = (): void => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  };

  return {
    render,
    destroy,
  };
};
