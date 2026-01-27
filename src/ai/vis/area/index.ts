import { Chart } from '@antv/g2';
import { getBackgroundColor, getTheme, getThemeColors } from '../../util/theme';

/**
 * AreaDataItem is the type for each data item in the area chart.
 */
export type AreaDataItem = {
  time: string | number;
  value: number;
  group?: string;
};

/**
 * AreaOptions defines the initialization options for Area chart.
 */
export interface AreaOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

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
  theme?: 'default' | 'academy' | 'dark';
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

const getLinearGradientColor = (color: string) =>
  `linear-gradient(-90deg, white 0%, ${color} 100%)`;
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
export const Area = (options: AreaOptions): AreaInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the area chart with the given configuration.
   */
  const render = (config: AreaConfig): void => {
    const {
      data = [],
      theme = 'default',
      title,
      axisXTitle,
      axisYTitle,
      stack = false,
      style = {},
    } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    const { lineWidth = 2 } = style;
    const hasGroupField = data[0]?.group !== undefined;
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const fillColor = getLinearGradientColor(colors[0] || DEFAULT_COLOR);

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
          style: { fillOpacity: 0.6 },
        },
        {
          type: 'line',
          style: { lineWidth, strokeOpacity: 0.6 },
        },
      ];
    } else if (hasGroupField) {
      // Multi-line area chart (not stacked)
      encode = { x: 'time', y: 'value', color: 'group' };
      scaleConfig.color = { range: colors };
      children = [
        {
          type: 'area',
          style: { fillOpacity: 0.6 },
        },
        {
          type: 'line',
          style: { lineWidth, strokeOpacity: 0.6 },
        },
      ];
    } else {
      // Single area chart
      encode = { x: 'time', y: 'value' };
      children = [
        {
          type: 'area',
          style: {
            fillOpacity: 0.6,
            fill: fillColor,
          },
        },
        {
          type: 'line',
          style: {
            lineWidth,
            strokeOpacity: 0.6,
            ...(style.palette ? { stroke: colors[0] } : {}),
          },
        },
      ];
    }

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: title ?? '',
      encode,
      transform,
      children,
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
      theme: getTheme(theme),
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
