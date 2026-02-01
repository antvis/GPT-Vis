import { Chart } from '@antv/g2';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * FunnelDataItem is the type for each data item in the funnel chart.
 */
export type FunnelDataItem = {
  category: string;
  value: number;
};

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
export const Funnel = (options: VisualizationOptions): FunnelInstance => {
  const { container, width = 640, height = 480, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the funnel chart with the given configuration.
   */
  const render = (config: FunnelConfig): void => {
    const { data = [], theme = chartTheme, title, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Helper function to calculate conversion rate
    const conversionRate = (start: any, end: any) => `${((end / start) * 100).toFixed(2)} %`;

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
      paddingLeft: 40,
      paddingRight: 68,
    });

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: title ?? '',
      children: [
        {
          type: 'interval',
          data,
          encode: {
            x: 'category',
            y: 'value',
            color: 'category',
            shape: 'funnel', // Use funnel shape for proper funnel visualization
          },
          transform: [{ type: 'symmetryY' }],
          coordinate: { transform: [{ type: 'transpose' }] },
          scale: {
            x: { padding: 0 },
            color: { range: colors },
          },
          legend: {
            color: {
              position: 'top',
              layout: {
                justifyContent: 'center',
              },
            },
          },
          labels: [
            // Inside label showing category and value
            {
              text: (d: any) => `${d.category}\n${d.value}`,
              position: 'inside',
              transform: [{ type: 'contrastReverse' }],
            },
            // Connecting line for conversion rate
            {
              text: (d: any, i: any) => (i !== 0 ? '———' : ''),
              style: {
                'font-size': '1px',
                color: '#666',
                'letter-spacing': '0px',
              },
              position: 'top-right',
              fill: '#666',
              dx: 35,
              dy: -8,
            },
            // Conversion rate label text
            {
              text: (d: any, i: any) => (i !== 0 ? '转化率' : ''),
              position: 'top-right',
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#666',
              dx: 40,
            },
            // Conversion rate percentage
            {
              text: (d: any, i: any, dataArray: any) =>
                i !== 0 ? conversionRate(dataArray[i - 1].value, dataArray[i].value) : '',
              position: 'top-right',
              textAlign: 'left',
              textBaseline: 'middle',
              dx: 80,
            },
          ],
          viewStyle: {
            viewFill: backgroundColor,
          },
        },
        // Overall conversion rate connector
        {
          type: 'connector',
          data: [
            {
              startX: data[0]?.category,
              startY: data[data.length - 1]?.category,
              endX: 0,
              endY: (data[0]?.value - data[data.length - 1]?.value) / 2,
            },
          ],
          encode: { x: 'startX', x1: 'startY', y: 'endX', y1: 'endY' },
          style: {
            stroke: '#666',
            markerEnd: false,
            connectLength1: -12,
            offset2: -20,
            connectorStroke: '#0649f2',
            lineDash: [12, 2],
          },
          labels: [
            {
              text: '转化率',
              position: 'left',
              textAlign: 'start',
              textBaseline: 'middle',
              fill: '#666',
              dx: 10,
            },
            {
              text: conversionRate(data[0]?.value, data[data.length - 1]?.value),
              position: 'left',
              textAlign: 'start',
              dx: 50,
              fill: '#000',
            },
          ],
        },
      ],
      axis: false,
      tooltip: {
        items: [
          (d: any) => ({
            name: d.category,
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
