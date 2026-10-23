import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme';
import type { ThemeInput, TreemapChartStyle, VisualizationOptions } from '../../types';

/**
 * TreemapDataItem is the type for each data item in the treemap chart.
 */
export type TreemapDataItem = {
  name: string;
  value: number;
  children?: TreemapDataItem[];
};

/**
 * TreemapConfig defines the configuration for rendering the treemap chart.
 */
export interface TreemapConfig {
  type?: 'treemap';
  data: TreemapDataItem[];
  theme?: ThemeInput;
  title?: string;
  subtitle?: string;
  style?: TreemapChartStyle;
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
export const Treemap = (options: VisualizationOptions): TreemapInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the treemap chart with the given configuration.
   */
  const render = (config: TreemapConfig): void => {
    const { data = [], theme = chartTheme, title, subtitle, style: localStyle = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const appearance = getThemeObject('treemap', theme, {
      style: localStyle,
      title,
      subtitle,
    });
    const { labelTokens, rendererTheme } = appearance;
    const colors = appearance.colors;
    const treemapStyle = appearance.mark.treemap.style;

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
      animate: false,
      type: 'treemap',
      data: {
        type: 'inline',
        value: {
          name: 'root',
          children: data,
        },
      },
      title: appearance.title,
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
        labelFill: labelTokens.colorText,
        ...treemapStyle,
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
      viewStyle: appearance.viewStyle,
      theme: rendererTheme,
      scale: {
        ...(colors.length > 0
          ? {
              color: {
                range: colors,
              },
            }
          : {}),
      },
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
