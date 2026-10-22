import { Chart } from '@antv/g2';
import {
  adaptG2CartesianAxis,
  adaptG2ColorLegend,
  adaptG2MarkStyle,
  adaptG2Title,
  resolveG2ChartTheme,
} from '../../theme';
import { CHART_STYLE_DEFAULTS, getBackgroundColor, normalizePalette } from '../../theme/builtins';
import type { LineChartStyle, ThemeInput, VisualizationOptions } from '../../types';
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
  style?: LineChartStyle;
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

    const { baseTheme, rendererTheme, style } = resolveG2ChartTheme('line', theme, {
      style: localStyle,
    });
    const lineStyle = style.mark?.line ?? {};
    const lineWidth = lineStyle.lineWidth ?? style.lineWidth ?? CHART_STYLE_DEFAULTS.lineWidth;
    const lineMark = adaptG2MarkStyle(
      'line',
      { lineWidth, lineCap: 'round', lineJoin: 'round' },
      lineStyle,
    );
    const hasGroupField = data.length > 0 && data[0]?.group !== undefined;
    const colors = normalizePalette(style.palette, baseTheme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(baseTheme);
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
    const cartesianAxisOptions = {
      axisXTitle,
      axisYTitle,
      xLabels: data.map(({ time }) => time),
      chartWidth: width,
    };

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

    const pointStyle = style.mark?.point;
    const showPoints = data.length <= (hasGroupField ? 36 : 24);
    if (showPoints) {
      const pointMark = adaptG2MarkStyle(
        'point',
        {
          shape: 'point',
          size: CHART_STYLE_DEFAULTS.pointSize,
          lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
          stroke: backgroundColor,
        },
        pointStyle,
      );
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
      title: adaptG2Title(title, subtitle, style.title),
      encode,
      children,
      scale: scaleConfig,
      ...getCartesianLayout(cartesianAxisOptions),
      axis: adaptG2CartesianAxis({
        axisXTitle,
        axisYTitle,
        defaults: getCartesianAxis(cartesianAxisOptions),
        style: style.axis,
      }),
      legend: adaptG2ColorLegend(hasGroupField, style.legend),
      interaction: {
        tooltip: getSharedTooltipInteraction({ crosshairs: true }),
      },
      style: style.backgroundColor ? { viewFill: backgroundColor } : undefined,
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
