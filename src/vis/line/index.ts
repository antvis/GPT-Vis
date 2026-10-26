import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme';
import type { ThemeInput, ThemeStyle, VisualizationOptions } from '../../types';
import {
  bindCrosshairAxisLabels,
  getCartesianAxis,
  getCartesianLayout,
  getChartAnimation,
  getSharedTooltipInteraction,
} from '../../util';

/**
 * LineDataItem is the type for each data item in the line chart.
 */
export type LineDataItem = {
  time: string | number;
  value: number;
  group?: string;
};

/**
 * LineConfig defines the configuration for rendering the line chart.
 */
export interface LineConfig {
  type?: 'line';
  data: LineDataItem[];
  title?: string;
  subtitle?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: ThemeInput;
  style?: ThemeStyle;
}

/**
 * LineInstance represents a line chart instance with render and destroy methods.
 */
export interface LineInstance {
  render: (config: LineConfig) => void;
  destroy: () => void;
}

/**
 * Line chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const line = Line({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * line.render({
 *   type: 'line',
 *   data: [
 *     { time: '2015 年', value: 1700 },
 *     { time: '2016 年', value: 1500 },
 *     { time: '2017 年', value: 1200 },
 *   ],
 *   title: '出生人口变化',
 *   axisXTitle: '年份',
 *   axisYTitle: '出生人口（万人）',
 * });
 *
 * line.destroy();
 * ```
 */
export const Line = (options: VisualizationOptions): LineInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;
  let hasRendered = false;
  let cleanupCrosshairAxisLabels: (() => void) | null = null;

  /**
   * Render the line chart with the given configuration.
   */
  const render = (config: LineConfig): void => {
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
      cleanupCrosshairAxisLabels?.();
      cleanupCrosshairAxisLabels = null;
      chart.destroy();
    }

    const hasGroupField = data.length > 0 && data[0]?.group !== undefined;
    const cartesianAxisOptions = {
      axisXTitle,
      axisYTitle,
      xLabels: data.map(({ time }) => time),
      chartWidth: width,
    };

    const appearance = getThemeObject('line', theme, {
      style: localStyle,
      title,
      subtitle,
      defaults: {
        axis: {
          axisXTitle,
          axisYTitle,
          defaults: getCartesianAxis(cartesianAxisOptions),
        },
        legend: { visible: hasGroupField },
      },
    });
    const { baseTheme, rendererTheme } = appearance;

    const lineMark = appearance.mark.line;
    const colors = appearance.colors;

    const tooltip = {
      items: [
        (d: any) => ({
          name: hasGroupField ? d.group : axisYTitle || d.time,
          value: d.value,
        }),
      ],
    };
    const lineAnimation = getChartAnimation(hasRendered, 'pathIn');
    const pointAnimation = getChartAnimation(hasRendered, 'fadeIn');

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart encode based on whether there's a group field
    let encode: any = {};
    const scaleConfig: any = { y: { nice: true } };

    if (hasGroupField) {
      encode = { x: 'time', y: 'value', color: 'group' };
      scaleConfig.color = { range: colors };
    } else {
      encode = { x: 'time', y: 'value' };
    }

    const children: any[] = [
      {
        type: 'line',
        tooltip,
        encode: lineMark.encode,
        style: {
          ...lineMark.style,
          ...(!hasGroupField ? { stroke: colors[0] } : {}),
        },
        animate: lineAnimation,
      },
    ];

    const showPoints = data.length <= (hasGroupField ? 36 : 24);
    if (showPoints) {
      const pointMark = appearance.mark.point;
      children.push({
        type: 'point',
        encode: {
          x: 'time',
          y: 'value',
          ...pointMark.encode,
          ...(hasGroupField ? { color: 'group' } : {}),
        },
        animate: pointAnimation,
        tooltip: false,
        style: {
          ...pointMark.style,
          ...(!hasGroupField ? { fill: colors[0] } : {}),
        },
      });
    }

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: appearance.title,
      encode,
      children,
      scale: scaleConfig,
      ...getCartesianLayout(cartesianAxisOptions),
      axis: appearance.axis,
      legend: appearance.legend,
      interaction: {
        tooltip: getSharedTooltipInteraction({ crosshairs: true }),
      },
      style: appearance.viewStyle,
      theme: rendererTheme,
    };

    chart.options(chartOptions);
    cleanupCrosshairAxisLabels = bindCrosshairAxisLabels(chart, baseTheme);
    chart.render();
    hasRendered = true;
  };

  /**
   * Destroy the chart instance and clean up resources.
   */
  const destroy = (): void => {
    if (chart) {
      cleanupCrosshairAxisLabels?.();
      cleanupCrosshairAxisLabels = null;
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
