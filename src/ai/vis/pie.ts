import { Chart } from '@antv/g2';
import { round, sumBy } from 'lodash';
import { ACADEMY_COLOR_PALETTE, DEFAULT_COLOR_PALETTE } from '../../utils/palette';

/**
 * PieDataItem is the type for each data item in the pie chart.
 * @param category The name of the sector.
 * @param value The value of the sector.
 */
type PieDataItem = {
  category: string;
  value: number;
  [key: string]: string | number;
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
  angleField?: string;
  colorField?: string;
  [key: string]: any;
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
  private container: string | HTMLElement;
  private width: number;
  private height: number;

  constructor(options: PieOptions) {
    this.container = options.container;
    this.width = options.width || 640;
    this.height = options.height || 480;
  }

  /**
   * Render the pie chart with the given configuration.
   */
  render(config: PieConfig): void {
    const {
      data = [],
      innerRadius = 0,
      theme = 'default',
      angleField = 'value',
      colorField = 'category',
    } = config;

    // Clean up previous chart if exists
    if (this.chart) {
      this.chart.destroy();
    }

    // Get theme colors
    const colors = this.getThemeColors(theme);
    const backgroundColor = this.getBackgroundColor(theme);

    // Calculate sum for percentage labels
    const sumValue = sumBy(data, angleField);

    // Create chart
    this.chart = new Chart({
      container: this.container,
      width: this.width,
      height: this.height,
    });

    // Configure chart options
    const chartOptions: any = {
      type: 'interval',
      data,
      encode: {
        y: angleField,
        color: colorField,
      },
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta', innerRadius: Math.max(0, Math.min(1, innerRadius)) },
      scale: {
        color: { range: colors },
      },
      legend: {
        color: { position: 'top' },
      },
      label: {
        text: (d: any) => {
          const percentage = round((d[angleField] / sumValue) * 100, 1);
          return `${d[colorField]}: ${percentage}%`;
        },
        position: 'outside',
        transform: [{ type: 'overlapHide' }],
      },
      tooltip: {
        items: [
          (d: any) => ({
            name: d[colorField],
            value: d[angleField],
          }),
        ],
      },
      interaction: {
        elementSelect: { single: true },
      },
      style: {
        fillOpacity: 0.8,
      },
      ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
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
   * Get theme color palette based on theme name.
   */
  private getThemeColors(theme: string): string[] {
    switch (theme) {
      case 'academy':
        return ACADEMY_COLOR_PALETTE;
      case 'dark':
        return DEFAULT_COLOR_PALETTE;
      case 'default':
      default:
        return DEFAULT_COLOR_PALETTE;
    }
  }

  /**
   * Get background color based on theme.
   */
  private getBackgroundColor(theme: string): string | null {
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
