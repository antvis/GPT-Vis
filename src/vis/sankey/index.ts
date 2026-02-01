import { Chart } from '@antv/g2';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * SankeyDataItem is the type for each data item in the sankey chart.
 */
export type SankeyDataItem = {
  source: string;
  target: string;
  value: number;
};

/**
 * SankeyConfig defines the configuration for rendering the sankey chart.
 */
export interface SankeyConfig {
  type?: 'sankey';
  data: SankeyDataItem[];
  nodeAlign?: 'left' | 'center' | 'right' | 'justify';
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * SankeyInstance represents a sankey chart instance with render and destroy methods.
 */
export interface SankeyInstance {
  render: (config: SankeyConfig) => void;
  destroy: () => void;
}

/**
 * Sankey chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const sankey = Sankey({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * sankey.render({
 *   type: 'sankey',
 *   data: [
 *     { source: '煤炭', target: '发电厂', value: 120 },
 *     { source: '天然气', target: '发电厂', value: 80 },
 *     { source: '发电厂', target: '工业', value: 100 },
 *   ],
 *   nodeAlign: 'justify',
 *   theme: 'academy'
 * });
 *
 * sankey.destroy();
 * ```
 */
export const Sankey = (options: VisualizationOptions): SankeyInstance => {
  const { container, width = 640, height = 480, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the sankey chart with the given configuration.
   */
  const render = (config: SankeyConfig): void => {
    const { data = [], nodeAlign = 'center', theme = chartTheme, title, style = {} } = config;

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
      type: 'sankey',
      data: {
        value: data,
        transform: [
          {
            type: 'custom',
            callback: (data: SankeyDataItem[]) => ({
              links: data,
            }),
          },
        ],
      },
      layout: {
        nodeAlign,
        nodePadding: 0.01,
      },
      title: title ?? '',
      scale: {
        color: { range: colors },
      },
      style: {
        labelSpacing: 2,
        nodeLineWidth: 1,
        linkFillOpacity: 0.3,
      },
      viewStyle: {
        viewFill: backgroundColor,
      },
      theme: getThemeObject(theme),
      legend: false,
      tooltip: false,
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
