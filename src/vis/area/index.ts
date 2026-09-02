import { Chart } from '@antv/g2';
import type { VisualizationOptions, VisualizationTheme } from '../../types';
import {
  CHART_STYLE_DEFAULTS,
  bindCrosshairAxisLabels,
  getBackgroundColor,
  getCartesianAxis,
  getCartesianLayout,
  getChartAnimation,
  getColorLegend,
  getLineHighlightState,
  getSeriesHighlightByColorInteraction,
  getSharedTooltipInteraction,
  getThemeObject,
  normalizePalette,
} from '../../util';

/**
 * AreaDataItem is the type for each data item in the area chart.
 */
export type AreaDataItem = {
  time: string | number;
  value: number;
  group?: string;
};

/**
 * AreaConfig defines the configuration for rendering the area chart.
 */
export interface AreaConfig {
  type?: 'area';
  data: AreaDataItem[];
  stack?: boolean;
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: VisualizationTheme;
  style?: {
    backgroundColor?: string;
    palette?: string[];
    lineWidth?: number;
  };
}

/**
 * AreaInstance represents an area chart instance with render and destroy methods.
 */
export interface AreaInstance {
  render: (config: AreaConfig) => void;
  destroy: () => void;
}

const getLinearGradientColor = (color: string, backgroundColor = 'white') =>
  `linear-gradient(-90deg, ${backgroundColor} 0%, ${color} 100%)`;
const DEFAULT_COLOR = '#3A95FF';

/**
 * Area chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const area = Area({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * area.render({
 *   type: 'area',
 *   data: [
 *     { time: '1 月', value: 23.895 },
 *     { time: '2 月', value: 23.695 },
 *     { time: '3 月', value: 23.655 },
 *   ],
 *   title: '1月到3月股票价格的变化',
 *   axisXTitle: '月份',
 *   axisYTitle: '价格',
 * });
 *
 * area.destroy();
 * ```
 */
export const Area = (options: VisualizationOptions): AreaInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;
  let hasRendered = false;
  let cleanupCrosshairAxisLabels: (() => void) | null = null;

  /**
   * Render the area chart with the given configuration.
   */
  const render = (config: AreaConfig): void => {
    const {
      data = [],
      theme = chartTheme,
      title,
      axisXTitle,
      axisYTitle,
      stack = false,
      style = {},
    } = config;

    // Clean up previous chart if exists
    if (chart) {
      cleanupCrosshairAxisLabels?.();
      cleanupCrosshairAxisLabels = null;
      chart.destroy();
    }

    const { lineWidth = CHART_STYLE_DEFAULTS.lineWidth } = style;
    const hasGroupField = data.length > 0 && data[0]?.group !== undefined;
    const colors = normalizePalette(style.palette, theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const fillColor = getLinearGradientColor(colors[0] || DEFAULT_COLOR, backgroundColor);
    const areaOpacity = CHART_STYLE_DEFAULTS.areaOpacity;
    const lineOpacity = CHART_STYLE_DEFAULTS.lineOpacity;
    const cartesianAxisOptions = {
      axisXTitle,
      axisYTitle,
      xLabels: data.map(({ time }) => time),
      chartWidth: width,
    };
    const tooltip = {
      items: [
        (d: any) => ({
          name: hasGroupField ? d.group : axisYTitle || d.time,
          value: d.value,
        }),
      ],
    };

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart encode and transform based on stack and group
    let encode: any = {};
    let transform: any = [];
    const scaleConfig: any = { y: { nice: true } };
    let children: any = [];

    if (hasGroupField && stack) {
      // Stacked area chart
      encode = { x: 'time', y: 'value', color: 'group' };
      transform = [{ type: 'stackY' }];
      scaleConfig.color = { range: colors };
      children = [
        {
          type: 'area',
          style: { fillOpacity: areaOpacity },
        },
        {
          type: 'line',
          style: { lineWidth, strokeOpacity: lineOpacity },
        },
      ];
    } else if (hasGroupField) {
      // Multi-line area chart (not stacked)
      encode = { x: 'time', y: 'value', color: 'group' };
      scaleConfig.color = { range: colors };
      children = [
        {
          type: 'area',
          style: { fillOpacity: areaOpacity },
        },
        {
          type: 'line',
          style: { lineWidth, strokeOpacity: lineOpacity },
        },
      ];
    } else {
      // Single area chart
      encode = { x: 'time', y: 'value' };
      children = [
        {
          type: 'area',
          style: {
            fillOpacity: areaOpacity,
            fill: fillColor,
          },
        },
        {
          type: 'line',
          style: {
            lineWidth,
            strokeOpacity: lineOpacity,
            lineCap: 'round',
            lineJoin: 'round',
            stroke: colors[0],
          },
        },
      ];
    }

    children = children.map((child: any) => ({
      ...child,
      animate: getChartAnimation(hasRendered, child.type === 'line' ? 'pathIn' : 'fadeIn'),
      tooltip: child.type === 'line' ? tooltip : false,
      state: hasGroupField
        ? child.type === 'area'
          ? {
              active: { fillOpacity: Math.min(areaOpacity + 0.1, 1) },
              inactive: { fillOpacity: 0.07 },
            }
          : getLineHighlightState(lineWidth)
        : undefined,
    }));

    if (!hasGroupField && data.length <= 24) {
      children.push({
        type: 'point',
        encode: {
          x: 'time',
          y: 'value',
          shape: 'point',
          size: CHART_STYLE_DEFAULTS.pointSize,
        },
        animate: getChartAnimation(hasRendered, 'fadeIn'),
        tooltip: false,
        style: {
          lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
          fill: colors[0],
          stroke: backgroundColor,
        },
      });
    }

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: title || '',
      encode,
      transform,
      children,
      scale: scaleConfig,
      ...getCartesianLayout(cartesianAxisOptions),
      axis: getCartesianAxis(cartesianAxisOptions),
      legend: getColorLegend(hasGroupField),
      interaction: {
        tooltip: getSharedTooltipInteraction({ crosshairs: true }),
        ...(hasGroupField ? getSeriesHighlightByColorInteraction() : {}),
      },
      viewStyle: style.backgroundColor ? { viewFill: backgroundColor } : undefined,
      theme: getThemeObject(theme),
    };

    chart.options(chartOptions);
    cleanupCrosshairAxisLabels = bindCrosshairAxisLabels(chart, theme);
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
