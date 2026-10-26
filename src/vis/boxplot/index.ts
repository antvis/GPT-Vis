import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme';
import type { ThemeInput, ThemeStyle, VisualizationOptions } from '../../types';

/**
 * BoxplotDataItem is the type for each data item in the boxplot chart.
 */
export type BoxplotDataItem = {
  category: string;
  value: number;
  group?: string;
};

/**
 * BoxplotConfig defines the configuration for rendering the boxplot chart.
 */
export interface BoxplotConfig {
  type?: 'boxplot';
  data: BoxplotDataItem[];
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
 * BoxplotInstance represents a boxplot chart instance with render and destroy.
 */
export interface BoxplotInstance {
  render: (config: BoxplotConfig) => void;
  destroy: () => void;
}

const prefixMarkStyle = <T extends object>(
  prefix: 'box' | 'point',
  style?: T,
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(style ?? {}).map(([key, value]) => [
      `${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`,
      value,
    ]),
  );

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
export const Boxplot = (options: VisualizationOptions): BoxplotInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the boxplot chart with the given configuration.
   */
  const render = (config: BoxplotConfig): void => {
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
    const appearance = getThemeObject('boxplot', theme, {
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

    const showPoints = !hasGroupField;
    const boxStyle = appearance.mark.box.style;
    const resolvedPointStyle = appearance.mark.point.style;
    const markStyle = showPoints
      ? {
          ...prefixMarkStyle('box', boxStyle),
          ...prefixMarkStyle('point', resolvedPointStyle),
        }
      : { ...boxStyle, point: false };
    const legend = appearance.legend;

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
      type: 'boxplot',
      data,
      title: appearance.title,
      encode: encode,
      axis: appearance.axis,
      scale: {
        x: { paddingInner: 0.6, paddingOuter: 0.3 },
        series: { paddingInner: 0.3, paddingOuter: 0.1 },
        y: { nice: true, zero: startAtZero },
        color: { range: colors },
      },
      // Grouped boxplots keep outliers disabled because G2's point child does
      // not inherit the composite color scale used by legend filtering.
      style: { stroke: 'black', ...markStyle },
      legend: legend === false ? { color: false } : { color: { position: 'top', ...legend.color } },
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
