import { Chart } from '@antv/g2';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

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
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: 'default' | 'academy' | 'dark';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
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
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the column chart with the given configuration.
   */
  const render = (config: ColumnConfig): void => {
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
    let radiusStyle: any = {};

    // Set radius style for default theme
    if (theme === 'default') {
      radiusStyle = { radiusTopLeft: 4, radiusTopRight: 4 };
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
      encode = { x: 'category', y: 'value', color: 'category' };
    }

    // Configure scale
    const scaleConfig: any = {
      y: { nice: true },
      ...(style.palette?.length ? { color: { range: colors } } : {}),
    };

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'interval',
      data,
      title: title ?? '',
      encode,
      transform,
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
      theme: getThemeObject(theme),
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
