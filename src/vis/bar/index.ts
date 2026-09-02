import { Chart } from '@antv/g2';
import type { VisualizationOptions, VisualizationTheme } from '../../types';
import {
  CHART_STYLE_DEFAULTS,
  getCartesianAxis,
  getCategoryBackgroundHighlightState,
  getCategoryHighlightInteraction,
  getChartAnimation,
  getChartTitle,
  getColorLegend,
  getTooltipInteraction,
} from '../../util/chart-style';
import { getBackgroundColor, getThemeObject, normalizePalette } from '../../util/theme';

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
  theme?: VisualizationTheme;
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
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;
  let hasRendered = false;

  /**
   * Render the bar chart with the given configuration.
   */
  const render = (config: BarConfig): void => {
    const {
      data = [],
      theme = chartTheme,
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
    const colors = normalizePalette(style.palette, theme);
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

    // academy theme uses no rounded corners; other themes use rounded top corners
    if (theme !== 'academy') {
      radiusStyle = { radius: 4 };
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
      encode = { x: 'category', y: 'value' };
    }

    // Configure scale
    const scaleConfig: any = {
      y: { nice: true },
      ...(hasGroupField ? { color: { range: colors } } : {}),
    };

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      animate: getChartAnimation(hasRendered, 'growInX'),
      type: 'interval',
      data,
      title: getChartTitle(title, theme),
      encode,
      transform,
      coordinate: { transform: [{ type: 'transpose' }] },
      scale: scaleConfig,
      axis: getCartesianAxis({ theme, axisXTitle, axisYTitle }),
      legend: getColorLegend(hasGroupField, theme),
      tooltip: {
        items: [
          (d: any) => ({
            name: hasGroupField ? d.group : axisYTitle || d.category,
            value: d.value,
          }),
        ],
      },
      state: getCategoryBackgroundHighlightState(theme),
      interaction: {
        tooltip: getTooltipInteraction(theme),
        elementHighlight: getCategoryHighlightInteraction(),
      },
      style: {
        ...radiusStyle,
        columnWidthRatio: CHART_STYLE_DEFAULTS.intervalWidthRatio,
        fillOpacity: 0.96,
        ...(!hasGroupField ? { fill: colors[0] } : {}),
      },
      viewStyle: {
        viewFill: backgroundColor,
      },
      theme: getThemeObject(theme),
    };

    chart.options(chartOptions);
    chart.render();
    hasRendered = true;
  };

  /**
   * Destroy the chart instance and clean up resources.
   */
  const destroy = (): void => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
    hasRendered = false;
  };

  return {
    render,
    destroy,
  };
};
