import { Chart } from '@antv/g2';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * DualAxesSeriesItem defines a single series in the dual-axes chart.
 */
export type DualAxesSeriesItem = {
  type: 'line' | 'column';
  data: number[];
  axisYTitle?: string;
};

/**
 * DualAxesOptions defines the initialization options for DualAxes chart.
 */
export interface DualAxesOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * DualAxesConfig defines the configuration for rendering the dual-axes chart.
 */
export interface DualAxesConfig {
  type?: 'dual-axes';
  categories: string[];
  series: DualAxesSeriesItem[];
  title?: string;
  axisXTitle?: string;
  theme?: 'default' | 'academy' | 'dark';
  style?: {
    backgroundColor?: string;
    palette?: string[];
    startAtZero?: boolean;
  };
}

/**
 * DualAxesInstance represents a dual-axes chart instance with render and destroy methods.
 */
export interface DualAxesInstance {
  render: (config: DualAxesConfig) => void;
  destroy: () => void;
}

/**
 * Transform series data to G2 format.
 * Combines multiple series into a single data array with categories.
 */
function transformData(series: DualAxesSeriesItem[], categories: string[]) {
  return categories.map((category, index) => {
    const dataPoint: any = { category };
    series.forEach((s, i) => {
      const yField = s.axisYTitle || `value_${i + 1}`;
      dataPoint[yField] = s.data[index];
    });
    return dataPoint;
  });
}

/**
 * DualAxes chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const dualAxes = DualAxes({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * dualAxes.render({
 *   type: 'dual-axes',
 *   categories: ['2018', '2019', '2020', '2021', '2022'],
 *   series: [
 *     {
 *       type: 'column',
 *       data: [91.9, 99.1, 101.6, 114.4, 121],
 *       axisYTitle: '销售额',
 *     },
 *     {
 *       type: 'line',
 *       data: [0.055, 0.06, 0.062, 0.07, 0.075],
 *       axisYTitle: '利润率',
 *     },
 *   ],
 * });
 *
 * dualAxes.destroy();
 * ```
 */
export const DualAxes = (options: DualAxesOptions): DualAxesInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the dual-axes chart with the given configuration.
   */
  const render = (config: DualAxesConfig): void => {
    const { categories, series, theme = 'default', title, axisXTitle, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    const { startAtZero = false } = style;
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Transform data
    const data = transformData(series, categories);

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Sort series: column first, then line (line rendered last appears on top)
    const sortedSeries = [...series].sort((a, b) => {
      const order = ['column', 'line'];
      return order.indexOf(a.type) - order.indexOf(b.type);
    });

    // Create children configurations for each series
    const children = sortedSeries.map((item, index) => {
      const yField = item.axisYTitle || `value_${index + 1}`;
      const color = colors[index % colors.length];

      if (item.type === 'column') {
        return {
          type: 'interval',
          encode: {
            x: 'category',
            y: yField,
            color: () => yField,
          },
          scale: {
            y: { nice: true, zero: startAtZero },
            color: { range: [color] },
          },
          axis: {
            y: { title: item.axisYTitle || '' },
          },
          style: {
            columnWidthRatio: 0.8,
            radiusTopLeft: 4,
            radiusTopRight: 4,
          },
        };
      } else {
        // line type
        return {
          type: 'line',
          encode: {
            x: 'category',
            y: yField,
            shape: 'smooth',
            color: () => yField,
          },
          scale: {
            y: { independent: true, zero: startAtZero },
            color: { range: [color] },
          },
          axis: {
            y: { position: 'right', title: item.axisYTitle || '' },
          },
          style: {
            lineWidth: 2,
          },
        };
      }
    });

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: title ?? '',
      children,
      axis: {
        x: { title: axisXTitle || false },
      },
      scale: {
        y: { nice: true },
      },
      legend: {
        color: {
          position: 'top',
          itemMarker: (v: string, index: number) => {
            const seriesItem = series[index];
            return seriesItem?.type === 'line' ? 'smooth' : 'rect';
          },
        },
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
