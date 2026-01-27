import { Chart } from '@antv/g2';
import { getBackgroundColor, getTheme, getThemeColors } from '../../util/theme';

/**
 * BarDataItem is the type for each data item in the bar chart.
 */
export type BarDataItem = {
  category: string;
  value: number;
  group?: string;
};

/**
 * BarOptions defines the initialization options for Bar chart.
 */
export interface BarOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

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
export const Bar = (options: BarOptions): BarInstance => {
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
    const scaleConfig: any = { y: { nice: true } };

    if (hasGroupField && group) {
      // Grouped bar chart
      encode = { x: 'category', y: 'value', color: 'group' };
      transform = [{ type: 'dodgeX' }];
      scaleConfig.color = { range: colors };
    } else if (hasGroupField && stack) {
      // Stacked bar chart
      encode = { x: 'category', y: 'value', color: 'group' };
      transform = [{ type: 'stackY' }];
      scaleConfig.color = { range: colors };
    } else if (hasGroupField) {
      // Has group field but not grouped or stacked, use category coloring
      encode = { x: 'category', y: 'value', color: 'category' };
      scaleConfig.color = { range: colors };
    } else {
      // Simple bar chart without groups
      encode = { x: 'category', y: 'value', color: 'category' };
      scaleConfig.color = { range: colors };
    }

    // Configure radius style based on theme
    // For horizontal bars (transposed), use right-side radius for rounded ends
    let radiusStyle: any = {};
    if (theme === 'default') {
      radiusStyle = { radiusTopRight: 4, radiusBottomRight: 4 };
    }

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
      theme: getTheme(theme),
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
