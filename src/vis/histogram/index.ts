import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme';
import type { HistogramChartStyle, ThemeInput, VisualizationOptions } from '../../types';

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
  theme?: ThemeInput;
  style?: HistogramChartStyle;
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
    const appearance = getThemeObject('histogram', theme, {
      style: localStyle,
      title,
      subtitle,
      defaults: { axis: { axisXTitle, axisYTitle } },
    });
    const { rendererTheme } = appearance;
    const colors = appearance.colors;
    const intervalMark = appearance.mark.interval;

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
      title: appearance.title,
      encode: {
        x: (d: any) => d,
        y: 'count',
        color: () => 'all',
        ...intervalMark.encode,
      },
      // binX transform groups continuous data into bins and counts frequency
      transform: [{ type: 'binX', y: 'count', thresholds: binNumber }],
      style: intervalMark.style,
      axis: appearance.axis,
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
      viewStyle: appearance.viewStyle,
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
