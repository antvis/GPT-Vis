import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme/g2';
import type { ThemeStyle, VisualizationOptions, VisualizationTheme } from '../../types';
import { getCartesianAxis, getColorLegend } from '../../util/components';

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
  theme?: VisualizationTheme;
  title?: string;
  subtitle?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  style?: ThemeStyle & {
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
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the violin chart with the given configuration.
   */
  const render = (config: ViolinConfig): void => {
    const {
      data = [],
      theme = chartTheme,
      title,
      subtitle,
      axisXTitle,
      axisYTitle,
      style: localStyle = {},
    } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const hasGroupField = (data || [])[0]?.group !== undefined;
    const appearance = getThemeObject('violin', theme, localStyle);
    const { theme: rendererTheme } = appearance;
    const boxMark = {
      shape: 'violin',
      opacity: 0.5,
      strokeOpacity: 0.5,
      ...appearance.mark.box,
    };
    const colors = rendererTheme.category10 as string[];

    const startAtZero = localStyle.startAtZero || false;
    const densityStyle = appearance.mark.density;

    const legend = getColorLegend(hasGroupField);

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
          style: densityStyle,
        },
        {
          type: 'boxplot',
          encode: {
            x: 'category',
            y: 'value',
            series: 'group',
            color: 'group',
          },
          style: { ...boxMark, point: false },
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
          style: densityStyle,
        },
        {
          type: 'boxplot',
          encode: {
            x: 'category',
            y: 'value',
            color: 'category',
          },
          style: { ...boxMark, point: false },
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
      animate: false,
      type: 'view',
      data,
      title: title ? { title, subtitle } : '',
      axis: getCartesianAxis({ axisXTitle, axisYTitle }),
      scale: {
        y: { nice: true, zero: startAtZero },
      },
      children: children,
      legend: legend === false ? { color: false } : { color: { position: 'top', ...legend.color } },

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
