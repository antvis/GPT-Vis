import { Chart } from '@antv/g2';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * BoxplotDataItem is the type for each data item in the boxplot chart.
 */
export type BoxplotDataItem = {
  category: string;
  value: number;
  group?: string;
};

/**
 * BoxplotOptions defines the initialization options for Boxplot chart.
 */
export interface BoxplotOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * BoxplotConfig defines the configuration for rendering the boxplot chart.
 */
export interface BoxplotConfig {
  type?: 'boxplot';
  data: BoxplotDataItem[];
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
    startAtZero?: boolean;
  };
}

/**
 * BoxplotInstance represents a boxplot chart instance with render and destroy.
 */
export interface BoxplotInstance {
  render: (config: BoxplotConfig) => void;
  destroy: () => void;
}

/**
 * Boxplot chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const boxplot = Boxplot({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * boxplot.render({
 *   type: 'boxplot',
 *   data: [
 *     { category: '班级A', value: 15 },
 *     { category: '班级A', value: 18 },
 *     { category: '班级A', value: 22 },
 *     { category: '班级A', value: 27 },
 *     { category: '班级A', value: 35 },
 *   ],
 *   theme: 'academy'
 * });
 *
 * boxplot.destroy();
 * ```
 */
export const Boxplot = (options: BoxplotOptions): BoxplotInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the boxplot chart with the given configuration.
   */
  const render = (config: BoxplotConfig): void => {
    const { data = [], theme = 'default', title, axisXTitle, axisYTitle, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const startAtZero = style.startAtZero || false;

    // Determine if data has group field for grouped boxplot
    const hasGroupField = (data || [])[0]?.group !== undefined;
    let encode = {};

    if (hasGroupField) {
      encode = {
        x: 'category',
        y: 'value',
        color: 'group',
        series: 'group',
      };
    } else {
      encode = {
        x: 'category',
        y: 'value',
        color: 'category',
      };
    }

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
      type: 'boxplot',
      data,
      title: title ?? '',
      encode: encode,
      axis: {
        x: {
          title: axisXTitle || false,
        },
        y: {
          title: axisYTitle || false,
        },
      },
      scale: {
        x: { paddingInner: 0.6, paddingOuter: 0.3 },
        series: { paddingInner: 0.3, paddingOuter: 0.1 },
        y: { nice: true, zero: startAtZero },
        color: { range: colors },
      },
      style: { stroke: 'black' },
      legend: {
        color: hasGroupField ? { position: 'top' } : false,
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
