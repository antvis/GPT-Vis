import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme';
import type { ThemeInput, ThemeStyle, VisualizationOptions } from '../../types';

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
  theme?: ThemeInput;
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
    const appearance = getThemeObject('violin', theme, {
      style: localStyle,
      title,
      subtitle,
      defaults: {
        axis: { axisXTitle, axisYTitle },
        legend: { visible: hasGroupField },
      },
    });
    const { rendererTheme } = appearance;
    const colors = appearance.colors;

    const startAtZero = localStyle.startAtZero || false;
    const densityStyle = appearance.mark.density.style;

    const boxMark = appearance.mark.box;

    const legend = appearance.legend;

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
            ...boxMark.encode,
          },
          style: { ...boxMark.style, point: false },
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
            ...boxMark.encode,
          },
          style: { ...boxMark.style, point: false },
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
      title: appearance.title,
      axis: appearance.axis,
      scale: {
        y: { nice: true, zero: startAtZero },
      },
      children: children,
      legend: legend === false ? { color: false } : { color: { position: 'top', ...legend.color } },
      style: appearance.viewStyle,
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
