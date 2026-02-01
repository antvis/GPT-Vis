import { Chart } from '@antv/g2';
import { round, sumBy } from 'lodash';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * PieDataItem is the type for each data item in the pie chart.
 */
type PieDataItem = {
  category: string;
  value: number;
};

/**
 * PieConfig defines the configuration for rendering the pie chart.
 */
export interface PieConfig {
  type?: 'pie';
  data: PieDataItem[];
  innerRadius?: number;
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * PieInstance represents a pie chart instance with render and destroy methods.
 */
export interface PieInstance {
  render: (config: PieConfig) => void;
  destroy: () => void;
}

/**
 * Pie chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const pie = Pie({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * pie.render({
 *   type: 'pie',
 *   data: [
 *     { category: '分类一', value: 27 },
 *     { category: '分类二', value: 25 },
 *   ],
 *   innerRadius: 0.6,
 *   theme: 'academy'
 * });
 *
 * pie.destroy();
 * ```
 */
export const Pie = (options: VisualizationOptions): PieInstance => {
  const { container, width = 640, height = 480, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the pie chart with the given configuration.
   */
  const render = (config: PieConfig): void => {
    const { data = [], innerRadius = 0, theme = chartTheme, title, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Calculate sum for percentage labels
    const sumValue = sumBy(data, 'value');

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase (e.g., Radar component)
    const chartOptions: any = {
      type: 'interval',
      data,
      title: title ?? '',
      encode: {
        y: 'value',
        color: 'category',
      },
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta', innerRadius: Math.max(0, Math.min(1, innerRadius)) },
      scale: {
        color: { range: colors },
      },
      legend: {
        color: { position: 'top' },
      },
      labels: [
        {
          text: (d: any) => {
            const percentage = round((d.value / sumValue) * 100, 4);
            return `${d.category}: ${percentage}%`;
          },
          position: 'outside',
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
      interaction: {
        elementSelect: { single: true },
      },
      style: {
        fillOpacity: 0.8,
      },
      viewStyle: {
        viewFill: backgroundColor,
      },
      theme: getThemeObject(theme),
      animate: { enter: { type: 'waveIn' } },
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
