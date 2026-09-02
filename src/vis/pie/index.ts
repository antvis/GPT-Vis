import { Chart } from '@antv/g2';
import type { VisualizationOptions, VisualizationTheme } from '../../types';
import {
  getChartAnimation,
  getChartVisualTokens,
  getColorLegend,
  getThemeObject,
  normalizePalette,
} from '../../util';

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
  theme?: VisualizationTheme;
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
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;
  let hasRendered = false;

  // Precision multiplier for rounding percentages to 4 decimal places
  const PERCENTAGE_PRECISION_MULTIPLIER = 10000;

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
    const colors = normalizePalette(style.palette, theme);
    const tokens = getChartVisualTokens(theme);

    // Calculate sum for percentage labels
    const sumValue = data.reduce((sum, item) => sum + item.value, 0);

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
      animate: getChartAnimation(hasRendered, 'waveIn'),
      type: 'interval',
      data,
      title: title || '',
      encode: {
        y: 'value',
        color: 'category',
      },
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta', innerRadius: Math.max(0, Math.min(1, innerRadius)) },
      scale: {
        color: { range: colors },
      },
      legend: getColorLegend(true),
      labels:
        data.length > 8
          ? []
          : [
              {
                text: (d: any) => {
                  const percentage = sumValue
                    ? Math.round((d.value / sumValue) * 100 * PERCENTAGE_PRECISION_MULTIPLIER) /
                      PERCENTAGE_PRECISION_MULTIPLIER
                    : 0;
                  const formattedPercentage = Number(percentage.toFixed(1)).toString();
                  return `${d.category}: ${formattedPercentage}%`;
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
        tooltip: true,
        elementHighlight: true,
        elementHoverScale: { shadow: false },
        elementSelect: { single: true },
      },
      state: {
        active: { fillOpacity: 1, lineWidth: 3 },
        inactive: { fillOpacity: 0.3 },
        selected: { fillOpacity: 1, lineWidth: 3 },
      },
      style: {
        fillOpacity: 1,
        stroke: tokens.separator,
        lineWidth: 2,
      },
      viewStyle: style.backgroundColor ? { viewFill: style.backgroundColor } : undefined,
      theme: getThemeObject(theme),
    };

    chart.options(chartOptions);
    chart.render();
    hasRendered = true;
  };

  /**
   * Destroy the chart instance and clean up resources.
   */
  const destroy = (): void => {
    if (chart) {
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
