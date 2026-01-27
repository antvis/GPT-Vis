import { Chart } from '@antv/g2';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * HistogramOptions defines the initialization options for Histogram chart.
 */
export interface HistogramOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * HistogramConfig defines the configuration for rendering the histogram chart.
 */
export interface HistogramConfig {
  type?: 'histogram';
  data: number[];
  binNumber?: number;
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: 'default' | 'academy' | 'dark';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
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
export const Histogram = (options: HistogramOptions): HistogramInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the histogram chart with the given configuration.
   */
  const render = (config: HistogramConfig): void => {
    const {
      data = [],
      theme = 'default',
      title,
      axisXTitle,
      axisYTitle,
      binNumber,
      style = {},
    } = config;

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
      type: 'interval',
      data,
      title: title ?? '',
      encode: {
        x: (d: any) => d,
        y: 'count',
        color: () => 'all',
      },
      // binX transform groups continuous data into bins and counts frequency
      transform: [{ type: 'binX', y: 'count', thresholds: binNumber }],
      style: {
        minHeight: 1,
        columnWidthRatio: 1,
        inset: 0.5,
      },
      axis: {
        x: {
          title: axisXTitle,
        },
        y: {
          title: axisYTitle,
        },
      },
      scale: {
        y: {
          nice: true,
        },
        color: { range: colors },
      },
      legend: false,
      tooltip: {
        items: [
          (d: any) => ({
            name: '频数',
            value: d.count,
          }),
        ],
      },
      viewStyle: {
        viewFill: backgroundColor,
      },
      theme: getThemeObject(theme),
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
