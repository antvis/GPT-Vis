import { Chart } from '@antv/g2';
import { getBackgroundColor, getTheme, getThemeColors } from '../../util/theme';

/**
 * VennDataItem is the type for each data item in the venn chart.
 */
export type VennDataItem = {
  sets: string[];
  value: number;
  label?: string;
};

/**
 * VennOptions defines the initialization options for Venn chart.
 */
export interface VennOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * VennConfig defines the configuration for rendering the venn chart.
 */
export interface VennConfig {
  type?: 'venn';
  data: VennDataItem[];
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * VennInstance represents a venn chart instance with render and destroy methods.
 */
export interface VennInstance {
  render: (config: VennConfig) => void;
  destroy: () => void;
}

/**
 * Venn chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const venn = Venn({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * venn.render({
 *   type: 'venn',
 *   data: [
 *     { sets: ['A'], value: 20, label: '集合A' },
 *     { sets: ['B'], value: 15, label: '集合B' },
 *     { sets: ['A', 'B'], value: 5, label: '交集AB' },
 *   ],
 *   theme: 'academy'
 * });
 *
 * venn.destroy();
 * ```
 */
export const Venn = (options: VennOptions): VennInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the venn chart with the given configuration.
   */
  const render = (config: VennConfig): void => {
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
      type: 'path',
      data: {
        value: data,
        transform: [
          {
            type: 'venn',
            padding: 8,
            sets: 'sets',
            size: 'value',
            as: ['key', 'path'],
          },
        ],
      },
      title: title ?? '',
      encode: { d: 'path', color: 'key' },
      scale: {
        color: { range: colors },
      },
      style: {
        // Set opacity: intersections (sets.length > 1) are nearly transparent, single sets are more opaque
        opacity: (d: VennDataItem) => (d.sets.length > 1 ? 0.001 : 0.65),
      },
      labels: [
        {
          position: 'inside',
          text: (d: VennDataItem) => d.label || '',
          fill: '#000',
          fillOpacity: 0.85,
          fontSize: 10,
        },
      ],
      viewStyle: {
        viewFill: backgroundColor,
      },
      theme: getTheme(theme),
      legend: false,
      axis: false,
      tooltip: false,
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
