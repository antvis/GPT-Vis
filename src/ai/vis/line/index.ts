import { Chart } from '@antv/g2';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

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
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: 'default' | 'academy' | 'dark';
  style?: {
    backgroundColor?: string;
    palette?: string[];
    lineWidth?: number;
  };
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
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the line chart with the given configuration.
   */
  const render = (config: LineConfig): void => {
    const { data = [], theme = 'default', title, axisXTitle, axisYTitle, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    const { lineWidth = 2 } = style;
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

    // Configure chart encode based on whether there's a group field
    let encode: any = {};
    const scaleConfig: any = { y: { nice: true } };

    if (hasGroupField) {
      encode = { x: 'time', y: 'value', color: 'group' };
      scaleConfig.color = { range: colors };
    } else {
      encode = { x: 'time', y: 'value' };
    }

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: title ?? '',
      encode,
      children: [
        {
          type: 'line',
          style: {
            lineWidth,
            ...(!hasGroupField && style.palette ? { stroke: colors[0] } : {}),
          },
        },
      ],
      scale: scaleConfig,
      axis: {
        x: { title: axisXTitle || false },
        y: { title: axisYTitle || false },
      },
      legend: hasGroupField ? { color: { position: 'top' } } : false,
      tooltip: {
        items: [
          (d: any) => ({
            name: axisYTitle || d.time,
            value: d.value,
          }),
        ],
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
