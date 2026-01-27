import { Chart } from '@antv/g2';
import { getBackgroundColor, getThemeObject, getThemeColors } from '../../util/theme';

/**
 * ScatterDataItem is the type for each data item in the scatter chart.
 */
export type ScatterDataItem = {
  x: number;
  y: number;
  group?: string;
};

/**
 * ScatterOptions defines the initialization options for Scatter chart.
 */
export interface ScatterOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * ScatterConfig defines the configuration for rendering the scatter chart.
 */
export interface ScatterConfig {
  type?: 'scatter';
  data: ScatterDataItem[];
  title?: string;
  theme?: 'default' | 'academy' | 'dark';
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
export const Scatter = (options: ScatterOptions): ScatterInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the scatter chart with the given configuration.
   */
  const render = (config: ScatterConfig): void => {
    const { data = [], theme = 'default', title, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || getThemeColors(theme);
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
    };

    if (hasGroupField) {
      encode = { x: 'x', y: 'y', color: 'group' };
      scaleConfig.color = { range: colors };
    } else {
      encode = { x: 'x', y: 'y', color: () => 'all' };
    }

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'point',
      data,
      title: title ?? '',
      encode,
      legend: hasGroupField ? { color: { position: 'top' } } : false,
      scale: scaleConfig,
      style: {
        lineWidth: 1,
      },
      tooltip: {
        title: (d: any) => (d?.group ? d.group : false),
        items: [
          { channel: 'x', name: 'x' },
          { channel: 'y', name: 'y' },
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
