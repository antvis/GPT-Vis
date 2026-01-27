import { Chart } from '@antv/g2';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * FunnelDataItem is the type for each data item in the funnel chart.
 */
export type FunnelDataItem = {
  category: string;
  value: number;
};

/**
 * FunnelOptions defines the initialization options for Funnel chart.
 */
export interface FunnelOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * FunnelConfig defines the configuration for rendering the funnel chart.
 */
export interface FunnelConfig {
  type?: 'funnel';
  data: FunnelDataItem[];
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * FunnelInstance represents a funnel chart instance with render and destroy methods.
 */
export interface FunnelInstance {
  render: (config: FunnelConfig) => void;
  destroy: () => void;
}

/**
 * Funnel chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const funnel = Funnel({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * funnel.render({
 *   type: 'funnel',
 *   data: [
 *     { category: '访问', value: 1000 },
 *     { category: '咨询', value: 600 },
 *     { category: '下单', value: 300 },
 *     { category: '成交', value: 120 },
 *   ],
 *   theme: 'academy'
 * });
 *
 * funnel.destroy();
 * ```
 */
export const Funnel = (options: FunnelOptions): FunnelInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the funnel chart with the given configuration.
   */
  const render = (config: FunnelConfig): void => {
    const { data = [], theme = 'default', title, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'interval',
      data,
      title: title ?? '',
      encode: {
        x: 'category',
        y: 'value',
        color: 'category',
      },
      // Create funnel visualization using symmetryY transform and transpose coordinate
      // symmetryY centers the bars, and transpose rotates them horizontally
      transform: [{ type: 'symmetryY' }],
      coordinate: { transform: [{ type: 'transpose' }] },
      scale: {
        color: { range: colors },
      },
      legend: {
        color: { position: 'top' },
      },
      labels: [
        {
          text: 'value',
          position: 'inside',
          transform: [{ type: 'overlapHide' }],
        },
      ],
      tooltip: {
        items: [
          (d: any) => ({
            name: d.category,
            value: d.value,
          }),
        ],
      },
      style: {
        fillOpacity: 0.8,
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
