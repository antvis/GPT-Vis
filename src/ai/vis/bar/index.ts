import { Chart } from '@antv/g2';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * BarDataItem is the type for each data item in the bar chart.
 */
export type BarDataItem = {
  category: string;
  value: number;
  group?: string;
};

/**
 * BarConfig defines the configuration for rendering the bar chart.
 */
export interface BarConfig {
  type?: 'bar';
  data: BarDataItem[];
  group?: boolean;
  stack?: boolean;
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
 * BarInstance represents a bar chart instance with render and destroy methods.
 */
export interface BarInstance {
  render: (config: BarConfig) => void;
  destroy: () => void;
}

/**
 * Bar chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const bar = Bar({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * bar.render({
 *   type: 'bar',
 *   data: [
 *     { category: '2015 年', value: 80 },
 *     { category: '2016 年', value: 140 },
 *     { category: '2017 年', value: 220 },
 *   ],
 *   title: '海底捞公司外卖收入',
 *   axisXTitle: '年份',
 *   axisYTitle: '金额 （百万元）',
 * });
 *
 * bar.destroy();
 * ```
 */
export const Bar = (options: VisualizationOptions): BarInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the bar chart with the given configuration.
   */
  const render = (config: BarConfig): void => {
    const {
      data = [],
      theme = 'default',
      title,
      axisXTitle,
      axisYTitle,
      group = false,
      stack = false,
      style = {},
    } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    const hasGroupField = data.length > 0 && data[0]?.group !== undefined;
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart encode and transform based on group/stack
    let encode: any = {};
    let transform: any = [];
    let radiusStyle: any = {};

    // Set radius style for default theme
    if (theme === 'default') {
      radiusStyle = { radiusTopLeft: 4, radiusTopRight: 4 };
    }

    // Configure transforms based on group/stack flags
    if (hasGroupField && group) {
      transform = [{ type: 'dodgeX' }];
    }

    if (hasGroupField && stack) {
      transform = [{ type: 'stackY' }];
    }

    // Configure encode based on whether data has group field
    if (hasGroupField) {
      encode = { x: 'category', y: 'value', color: 'group' };
    } else {
      encode = { x: 'category', y: 'value', color: 'category' };
    }

    // Configure scale
    const scaleConfig: any = {
      y: { nice: true },
      ...(style.palette?.length ? { color: { range: colors } } : {}),
    };

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'interval',
      data,
      title: title ?? '',
      encode,
      transform,
      coordinate: { transform: [{ type: 'transpose' }] },
      scale: scaleConfig,
      axis: {
        x: { title: axisXTitle || false },
        y: { title: axisYTitle || false },
      },
      legend: hasGroupField ? { color: { position: 'top' } } : false,
      tooltip: {
        items: [
          (d: any) => ({
            name: axisYTitle || d.category,
            value: d.value,
          }),
        ],
      },
      style: {
        ...radiusStyle,
        columnWidthRatio: 0.8,
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
