import { getThemeObject } from '../../theme/g2';
import type { ThemeStyle, VisualizationOptions, VisualizationTheme } from '../../types';
import {
  CHART_STYLE_DEFAULTS,
  createChartRenderer,
  datumKey,
  getCartesianAxis,
  getCategoryBackgroundHighlightState,
  getCategoryHighlightInteraction,
  getColorLegend,
  getDataLabels,
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
  theme?: VisualizationTheme;
  style?: ThemeStyle;
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
  const renderer = createChartRenderer({
    container,
    width,
    height,
    autoFit: true,
  });

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

    const hasGroupField = data.length > 0 && data[0]?.group !== undefined;
    const cartesianAxisOptions = {
      xType: 'category' as const,
      xValues: data.map(({ category }) => category),
      axisXTitle,
      axisYTitle,
      container,
      chartWidth: width,
      chartHeight: height,
    };

    const appearance = getThemeObject('column', theme, localStyle);
    const { theme: rendererTheme } = appearance;
    const intervalMark = {
      ...(rendererTheme.type !== 'academy' && appearance.mark.interval.radius === undefined
        ? { radiusTopLeft: 4, radiusTopRight: 4 }
        : {}),
      columnWidthRatio: CHART_STYLE_DEFAULTS.intervalWidthRatio,
      ...(!hasGroupField ? { fill: (rendererTheme.category10 as string[])[0] } : {}),
      ...appearance.mark.interval,
    };
    const baseTheme = rendererTheme.type;
    const colors = rendererTheme.category10 as string[];

    // Configure chart encode and transform based on group/stack
    let encode: any = {};
    let transform: any = [];

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
      // G2 growInY currently computes interval label bounds from the animated
      // clip path, which leaves inside labels at the axis baseline. Keep the
      // interval and its labels in sync until the upstream runtime is fixed.
      animate: false,
      type: 'interval',
      data,
      title: title ? { title, subtitle } : '',
      encode: { ...encode, key: datumKey('group', 'category') },
      transform,
      scale: scaleConfig,
      axis: getCartesianAxis(cartesianAxisOptions, rendererTheme),
      legend: getColorLegend(hasGroupField),
      labels: getDataLabels(rendererTheme, {
        visible: label,
        defaultVisible: true,
        text: 'value',
        position: 'inside',
        contrast: 'inside',
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
      style: intervalMark,

      theme: rendererTheme,
    };

    renderer.render(chartOptions);
  };

  /**
   * Destroy the chart instance and clean up resources.
   */
  const destroy = (): void => {
    renderer.destroy();
  };

  return {
    render,
    destroy,
  };
};
