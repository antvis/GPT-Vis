import { Chart } from '@antv/g2';
import {
  adaptG2CartesianAxis,
  adaptG2ColorLegend,
  adaptG2DataLabels,
  adaptG2MarkStyle,
  adaptG2Title,
  resolveG2ChartTheme,
} from '../../theme';
import { CHART_STYLE_DEFAULTS, normalizePalette } from '../../theme/builtins';
import type { IntervalChartStyle, ThemeInput, VisualizationOptions } from '../../types';
import {
  getCartesianAxis,
  getCartesianLayout,
  getCategoryBackgroundHighlightState,
  getCategoryHighlightInteraction,
} from '../../util';

/**
 * ColumnDataItem is the type for each data item in the column chart.
 */
export type ColumnDataItem = {
  category: string;
  value: number;
  group?: string;
};

/**
 * ColumnConfig defines the configuration for rendering the column chart.
 */
export interface ColumnConfig {
  type?: 'column';
  data: ColumnDataItem[];
  group?: boolean;
  stack?: boolean;
  title?: string;
  subtitle?: string;
  /** Show value labels. Defaults to `true`. */
  label?: boolean;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: ThemeInput;
  style?: IntervalChartStyle;
}

/**
 * ColumnInstance represents a column chart instance with render and destroy methods.
 */
export interface ColumnInstance {
  render: (config: ColumnConfig) => void;
  destroy: () => void;
}

/**
 * Column chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const column = Column({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * column.render({
 *   type: 'column',
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
 * column.destroy();
 * ```
 */
export const Column = (options: VisualizationOptions): ColumnInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the column chart with the given configuration.
   */
  const render = (config: ColumnConfig): void => {
    const {
      data = [],
      theme = chartTheme,
      title,
      subtitle,
      label,
      axisXTitle,
      axisYTitle,
      group = false,
      stack = false,
      style: localStyle = {},
    } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    const { baseTheme, labelTokens, rendererTheme, style } = resolveG2ChartTheme('column', theme, {
      style: localStyle,
    });
    const hasGroupField = data.length > 0 && data[0]?.group !== undefined;
    const colors = normalizePalette(style.palette, baseTheme);

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
    if (baseTheme !== 'academy') {
      radiusStyle = { radiusTopLeft: 4, radiusTopRight: 4 };
    }

    const intervalMark = adaptG2MarkStyle(
      'interval',
      {
        ...radiusStyle,
        columnWidthRatio: CHART_STYLE_DEFAULTS.intervalWidthRatio,
        ...(!hasGroupField ? { fill: colors[0] } : {}),
      },
      style.mark?.interval,
    );

    // Configure transforms based on group/stack flags
    if (hasGroupField && group) {
      transform = [{ type: 'dodgeX' }];
    }

    if (hasGroupField && stack) {
      transform = [{ type: 'stackY' }];
    }

    // Configure encode based on whether data has group field
    if (hasGroupField) {
      encode = { x: 'category', y: 'value', color: 'group', ...intervalMark.encode };
    } else {
      encode = { x: 'category', y: 'value', ...intervalMark.encode };
    }

    // Configure scale
    const scaleConfig: any = {
      y: { nice: true },
      ...(hasGroupField ? { color: { range: colors } } : {}),
    };
    const cartesianAxisOptions = {
      axisXTitle,
      axisYTitle,
      xLabels: data.map(({ category }) => category),
      chartWidth: width,
    };

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      // G2 growInY currently computes interval label bounds from the animated
      // clip path, which leaves inside labels at the axis baseline. Keep the
      // interval and its labels in sync until the upstream runtime is fixed.
      animate: false,
      type: 'interval',
      data,
      title: adaptG2Title(title, subtitle, style.title),
      encode,
      transform,
      scale: scaleConfig,
      ...getCartesianLayout(cartesianAxisOptions),
      axis: adaptG2CartesianAxis({
        axisXTitle,
        axisYTitle,
        defaults: getCartesianAxis(cartesianAxisOptions),
        style: style.axis,
      }),
      legend: adaptG2ColorLegend(hasGroupField, style.legend),
      labels: adaptG2DataLabels({
        style: style.label,
        visible: label,
        defaultVisible: true,
        text: 'value',
        position: 'inside',
        contrast: 'inside',
        tokens: labelTokens,
      }),
      tooltip: {
        items: [
          (d: any) => ({
            name: hasGroupField ? d.group : axisYTitle || d.category,
            value: d.value,
          }),
        ],
      },
      state: getCategoryBackgroundHighlightState(baseTheme),
      interaction: {
        tooltip: true,
        elementHighlight: getCategoryHighlightInteraction(),
      },
      style: intervalMark.style,
      viewStyle: style.backgroundColor ? { viewFill: style.backgroundColor } : undefined,
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
