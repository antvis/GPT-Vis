import { Chart } from '@antv/g2';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * ViolinDataItem is the type for each data item in the violin chart.
 */
export type ViolinDataItem = {
  category: string;
  value: number;
  group?: string;
};

/**
 * ViolinConfig defines the configuration for rendering the violin chart.
 */
export interface ViolinConfig {
  type?: 'violin';
  data: ViolinDataItem[];
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
 * ViolinInstance represents a violin chart instance with render and destroy.
 */
export interface ViolinInstance {
  render: (config: ViolinConfig) => void;
  destroy: () => void;
}

/**
 * Violin chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const violin = Violin({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * violin.render({
 *   type: 'violin',
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
 * violin.destroy();
 * ```
 */
export const Violin = (options: VisualizationOptions): ViolinInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the violin chart with the given configuration.
   */
  const render = (config: ViolinConfig): void => {
    const { data = [], theme = 'default', title, axisXTitle, axisYTitle, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const startAtZero = style.startAtZero || false;

    // Determine if data has group field for grouped violin plot
    const hasGroupField = (data || [])[0]?.group !== undefined;

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart children for violin plot
    // Violin plot is composed of density plot + boxplot overlay
    let children = [];

    if (hasGroupField) {
      // Grouped violin plot: density by category and group
      children = [
        {
          type: 'density',
          data: {
            transform: [{ type: 'kde', field: 'value', groupBy: ['category', 'group'] }],
          },
          encode: {
            x: 'category',
            y: 'y',
            color: 'group',
            series: 'group',
            size: 'size',
          },
          scale: {
            y: { nice: true },
            color: { range: colors },
          },
        },
        {
          type: 'boxplot',
          encode: {
            x: 'category',
            y: 'value',
            series: 'group',
            color: 'group',
            shape: 'violin',
          },
          style: { opacity: 0.5, strokeOpacity: 0.5, point: false },
          scale: {
            y: { nice: true },
            color: { range: colors },
          },
        },
      ];
    } else {
      // Simple violin plot: density by category only
      children = [
        {
          type: 'density',
          data: {
            transform: [{ type: 'kde', field: 'value', groupBy: ['category'], size: 20 }],
          },
          encode: {
            x: 'category',
            y: 'y',
            color: 'category',
            size: 'size',
          },
          scale: {
            y: { nice: true },
            color: { range: colors },
          },
        },
        {
          type: 'boxplot',
          encode: {
            x: 'category',
            y: 'value',
            color: 'category',
            shape: 'violin',
          },
          style: { opacity: 0.5, strokeOpacity: 0.5, point: false },
          scale: {
            y: { nice: true },
            color: { range: colors },
          },
        },
      ];
    }

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: title ?? '',
      axis: {
        x: {
          title: axisXTitle || false,
        },
        y: {
          title: axisYTitle || false,
        },
      },
      scale: {
        y: { nice: true, zero: startAtZero },
      },
      children: children,
      legend: {
        color: hasGroupField ? { position: 'top' } : false,
      },
      ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
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
