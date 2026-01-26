import { Chart } from '@antv/g2';
import { round, sumBy } from 'lodash';
import { ACADEMY_COLOR_PALETTE, DEFAULT_COLOR_PALETTE } from '../../utils/palette';

/**
 * PieDataItem is the type for each data item in the pie chart.
 */
type PieDataItem = {
  category: string;
  value: number;
};

/**
 * PieOptions defines the initialization options for Pie chart.
 */
export interface PieOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

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
 * Pie chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const pie = new Pie({
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
export class Pie {
  private chart: Chart | null = null;
  private readonly container: string | HTMLElement;
  private readonly width: number;
  private readonly height: number;

  constructor(options: PieOptions) {
    this.container = options.container;
    this.width = options.width || 640;
    this.height = options.height || 480;
  }

  /**
   * Render the pie chart with the given configuration.
   */
  render(config: PieConfig): void {
    const { data = [], innerRadius = 0, theme = 'default', title, style = {} } = config;

    // Clean up previous chart if exists
    if (this.chart) {
      this.chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || this.getThemeColors(theme);
    const backgroundColor = style.backgroundColor || this.getBackgroundColor(theme);

    // Calculate sum for percentage labels
    const sumValue = sumBy(data, 'value');

    // Create chart
    this.chart = new Chart({
      container: this.container,
      width: this.width,
      height: this.height,
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
      theme: this.getTheme(theme),
      animate: { enter: { type: 'waveIn' } },
    };

    this.chart.options(chartOptions);
    this.chart.render();
  }

  /**
   * Destroy the chart instance and clean up resources.
   */
  destroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  /**
   * Get normalized theme name.
   */
  private getTheme(theme: string): string {
    return theme === 'default' ? 'light' : theme;
  }

  /**
   * Get theme color palette based on theme name.
   */
  private getThemeColors(theme: string): string[] {
    switch (theme) {
      case 'academy':
        return ACADEMY_COLOR_PALETTE;
      case 'dark':
      case 'default':
      default:
        return DEFAULT_COLOR_PALETTE;
    }
  }

  /**
   * Get background color based on theme.
   */
  private getBackgroundColor(theme: string): string {
    switch (theme) {
      case 'dark':
        return '#000';
      case 'academy':
      case 'default':
      default:
        return '#FFF';
    }
  }
}
