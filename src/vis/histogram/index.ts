import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme/g2';
import type { ThemeStyle, VisualizationOptions, VisualizationTheme } from '../../types';
import { getCartesianAxis } from '../../util/components';

/**
 * HistogramConfig defines the configuration for rendering the histogram chart.
 */
export interface HistogramConfig {
  type?: 'histogram';
  data: number[];
  binNumber?: number;
  title?: string;
  subtitle?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: VisualizationTheme;
  style?: ThemeStyle;
}

/**
 * HistogramInstance represents a histogram chart instance with render and destroy methods.
 */
export interface HistogramInstance {
  render: (config: HistogramConfig) => void;
  destroy: () => void;
}

/**
 * Histogram chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const histogram = Histogram({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * histogram.render({
 *   type: 'histogram',
 *   data: [78, 88, 60, 100, 95],
 *   binNumber: 5,
 *   title: '成绩分布',
 *   theme: 'academy'
 * });
 *
 * histogram.destroy();
 * ```
 */
export const Histogram = (options: VisualizationOptions): HistogramInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the histogram chart with the given configuration.
   */
  const render = (config: HistogramConfig): void => {
    const {
      data = [],
      theme = chartTheme,
      title,
      subtitle,
      axisXTitle,
      axisYTitle,
      binNumber,
      style: localStyle = {},
    } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const appearance = getThemeObject('histogram', theme, localStyle);
    const { theme: rendererTheme } = appearance;
    const intervalMark = {
      minHeight: 1,
      columnWidthRatio: 1,
      inset: 0.5,
      ...appearance.mark.interval,
    };
    const colors = rendererTheme.category10 as string[];

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
      type: 'interval',
      data,
      title: title ? { title, subtitle } : '',
      encode: {
        x: (d: any) => d,
        y: 'count',
        color: () => 'all',
      },
      // binX transform groups continuous data into bins and counts frequency
      transform: [{ type: 'binX', y: 'count', thresholds: binNumber }],
      style: intervalMark,
      axis: getCartesianAxis({ axisXTitle, axisYTitle }),
      scale: {
        y: {
          nice: true,
        },
        color: { range: colors },
      },
      legend: false,
      tooltip: {
        items: [{ channel: 'y', name: '频数' }],
      },

      theme: rendererTheme,
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
