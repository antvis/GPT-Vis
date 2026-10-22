import { Chart } from '@antv/g2';
import {
  adaptG2CartesianAxis,
  adaptG2ColorLegend,
  adaptG2MarkStyle,
  adaptG2Title,
  resolveG2ChartTheme,
} from '../../theme';
import { CHART_STYLE_DEFAULTS, getBackgroundColor, normalizePalette } from '../../theme/builtins';
import type { ScatterChartStyle, ThemeInput, VisualizationOptions } from '../../types';
import { getCartesianAxis, getChartAnimation, getPointHighlightState } from '../../util';

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
  subtitle?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: ThemeInput;
  style?: ScatterChartStyle;
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
    const { baseTheme, rendererTheme, style } = resolveG2ChartTheme('scatter', theme, {
      style: localStyle,
    });
    const colors = normalizePalette(style.palette, baseTheme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(baseTheme);
    const pointMark = adaptG2MarkStyle(
      'point',
      {
        shape: 'point',
        size: CHART_STYLE_DEFAULTS.scatterPointSize,
        lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
        fillOpacity: 0.88,
        stroke: backgroundColor,
      },
      style.mark?.point,
    );

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
        ...pointMark.encode,
      };
      scaleConfig.color = { range: colors };
    } else {
      encode = {
        x: 'x',
        y: 'y',
        ...pointMark.encode,
      };
    }

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      animate: getChartAnimation(hasRendered, 'fadeIn'),
      type: 'point',
      data,
      title: adaptG2Title(title, subtitle, style.title),
      encode,
      legend: adaptG2ColorLegend(hasGroupField, style.legend),
      scale: scaleConfig,
      axis: adaptG2CartesianAxis({
        axisXTitle,
        axisYTitle,
        defaults: getCartesianAxis({ axisXTitle, axisYTitle }),
        style: style.axis,
      }),
      style: {
        ...pointMark.style,
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
      theme: rendererTheme,
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
