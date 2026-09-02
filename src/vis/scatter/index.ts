import { Chart } from '@antv/g2';
import type { VisualizationOptions, VisualizationTheme } from '../../types';
import {
  CHART_STYLE_DEFAULTS,
  getBackgroundColor,
  getCartesianAxis,
  getChartAnimation,
  getColorLegend,
  getPointHighlightState,
  getThemeObject,
  normalizePalette,
} from '../../util';

/**
 * ScatterDataItem is the type for each data item in the scatter chart.
 */
export type ScatterDataItem = {
  x: number;
  y: number;
  group?: string;
};

/**
 * ScatterConfig defines the configuration for rendering the scatter chart.
 */
export interface ScatterConfig {
  type?: 'scatter';
  data: ScatterDataItem[];
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
 * ScatterInstance represents a scatter chart instance with render and destroy methods.
 */
export interface ScatterInstance {
  render: (config: ScatterConfig) => void;
  destroy: () => void;
}

/**
 * Scatter chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const scatter = Scatter({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * scatter.render({
 *   type: 'scatter',
 *   data: [
 *     { x: 10, y: 15 },
 *     { x: 20, y: 25 },
 *     { x: 30, y: 35 },
 *     { x: 40, y: 45 },
 *   ],
 * });
 *
 * scatter.destroy();
 * ```
 */
export const Scatter = (options: VisualizationOptions): ScatterInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;
  let hasRendered = false;

  /**
   * Render the scatter chart with the given configuration.
   */
  const render = (config: ScatterConfig): void => {
    const { data = [], theme = chartTheme, title, axisXTitle, axisYTitle, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = normalizePalette(style.palette, theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Check if data has group field
    const hasGroupField = data.length > 0 && data[0]?.group !== undefined;

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart encode based on whether there's a group field
    let encode: any = {};
    const scaleConfig: any = {
      y: { nice: true },
      x: { nice: true },
    };

    if (hasGroupField) {
      encode = {
        x: 'x',
        y: 'y',
        color: 'group',
        shape: 'point',
        size: CHART_STYLE_DEFAULTS.scatterPointSize,
      };
      scaleConfig.color = { range: colors };
    } else {
      encode = {
        x: 'x',
        y: 'y',
        shape: 'point',
        size: CHART_STYLE_DEFAULTS.scatterPointSize,
      };
    }

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      animate: getChartAnimation(hasRendered, 'fadeIn'),
      type: 'point',
      data,
      title: title || '',
      encode,
      legend: getColorLegend(hasGroupField),
      scale: scaleConfig,
      axis: getCartesianAxis({
        axisXTitle,
        axisYTitle,
      }),
      style: {
        lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
        fillOpacity: 0.88,
        stroke: backgroundColor,
        ...(!hasGroupField ? { fill: colors[0] } : {}),
      },
      // A same-color stroke enlarges the rendered path without changing its transform or
      // hit area, so repeated pointer events cannot accumulate scale.
      state: getPointHighlightState(),
      tooltip: {
        title: (d: any) => (d?.group ? d.group : false),
        items: [
          { channel: 'x', name: axisXTitle ?? 'x' },
          { channel: 'y', name: axisYTitle ?? 'y' },
        ],
      },
      interaction: {
        tooltip: true,
        elementHighlight: true,
      },
      viewStyle: style.backgroundColor ? { viewFill: backgroundColor } : undefined,
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
