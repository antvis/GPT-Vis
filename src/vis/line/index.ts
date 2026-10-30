import { Chart } from '@antv/g2';
import { getLineAnnotations } from '../../annotation/g2';
import { getThemeObject } from '../../theme/g2';
import type { ThemeStyle, VisualizationOptions, VisualizationTheme } from '../../types';
import type { AnnotationOptions } from '../../types/annotation';
import {
  bindCrosshairAxisLabels,
  getCartesianAxis,
  getCartesianLayout,
  getChartAnimation,
  getSharedTooltipInteraction,
} from '../../util';
import { getColorLegend } from '../../util/components';
import { CHART_STYLE_DEFAULTS } from '../../util/tokens';

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
export interface LineConfig extends AnnotationOptions {
  type?: 'line';
  data: LineDataItem[];
  title?: string;
  subtitle?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: VisualizationTheme;
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
      annotations = [],
    } = config;

    const hasGroupField = data.length > 0 && data[0]?.group !== undefined;
    const cartesianAxisOptions = {
      axisXTitle,
      axisYTitle,
      xLabels: data.map(({ time }) => time),
      chartWidth: width,
    };

    const appearance = getThemeObject('line', theme, localStyle);
    const { theme: rendererTheme } = appearance;
    const lineMark = {
      lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
      lineCap: 'round',
      lineJoin: 'round',
      ...appearance.mark.line,
    };
    const pointStyle = {
      shape: 'point',
      size: CHART_STYLE_DEFAULTS.pointSize,
      lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
      stroke: rendererTheme.view!.viewFill as string,
      ...appearance.mark.point,
    };
    const baseTheme = rendererTheme.type;
    const colors = rendererTheme.category10 as string[];
    const annotationMarks = getLineAnnotations(data, annotations, rendererTheme, appearance.tokens);

    // Resolve annotations before replacing an existing chart.
    if (chart) {
      cleanupCrosshairAxisLabels?.();
      cleanupCrosshairAxisLabels = null;
      chart.destroy();
    }

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
    const context = chart.getContext();
    context.library = { ...context.library, ...annotationMarks.library };

    // Configure chart encode based on whether there's a group field
    let encode: any = {};
    const scaleConfig: any = { y: { nice: true } };

    // Annotation layers must not reorder the categories or series in shared scales.
    if (data.some(({ time }) => typeof time === 'string')) {
      scaleConfig.x = { domain: Array.from(new Set(data.map(({ time }) => time))) };
    }

    if (hasGroupField) {
      encode = { x: 'time', y: 'value', color: 'group' };
      scaleConfig.color = {
        range: colors,
        domain: Array.from(new Set(data.map(({ group }) => group))),
      };
    } else {
      encode = { x: 'time', y: 'value' };
    }

    const children: any[] = [
      {
        type: 'line',
        encode,
        tooltip,
        style: {
          ...lineMark,
          ...(!hasGroupField ? { stroke: colors[0] } : {}),
        },
        animate: lineAnimation,
      },
    ];

    const showPoints = data.length <= (hasGroupField ? 36 : 24);
    if (showPoints) {
      const { size: pointSize, ...pointMark } = pointStyle;
      children.push({
        type: 'point',
        encode: {
          x: 'time',
          y: 'value',
          size: pointSize,
          ...(hasGroupField ? { color: 'group' } : {}),
        },
        animate: pointAnimation,
        tooltip: false,
        style: {
          ...pointMark,
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
      title: title ? { title, subtitle } : '',
      children: [...annotationMarks.background, ...children, ...annotationMarks.foreground],
      scale: scaleConfig,
      ...getCartesianLayout(cartesianAxisOptions),
      axis: getCartesianAxis(cartesianAxisOptions),
      legend: getColorLegend(hasGroupField),
      interaction: {
        tooltip: getSharedTooltipInteraction({ crosshairs: true }),
      },

      theme: rendererTheme,
      labelTransform: annotationMarks.labelTransform,
      insetTop: annotationMarks.insetTop,
      insetRight: annotations.length ? 24 : 0,
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
