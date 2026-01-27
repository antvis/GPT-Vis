import { Chart } from '@antv/g2';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeObject } from '../../util/theme';

/**
 * WaterfallDataItem is the type for each data item in the waterfall chart.
 */
export type WaterfallDataItem = {
  category: string;
  value?: number;
  isIntermediateTotal?: boolean;
  isTotal?: boolean;
};

/**
 * WaterfallPalette defines custom colors for positive, negative, total bars.
 */
export interface WaterfallPalette {
  positiveColor?: string;
  negativeColor?: string;
  totalColor?: string;
}

/**
 * WaterfallConfig defines the configuration for rendering the waterfall chart.
 */
export interface WaterfallConfig {
  type?: 'waterfall';
  data: WaterfallDataItem[];
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  style?: {
    backgroundColor?: string;
    palette?: WaterfallPalette;
  };
}

/**
 * WaterfallInstance represents a waterfall chart instance with render/destroy.
 */
export interface WaterfallInstance {
  render: (config: WaterfallConfig) => void;
  destroy: () => void;
}

// Default colors for waterfall chart
const DEFAULT_POSITIVE_COLOR = '#FF4D4F';
const DEFAULT_NEGATIVE_COLOR = '#2EBB59';
const DEFAULT_TOTAL_COLOR = '#1783FF';

/**
 * Transform waterfall data to add __start__ and __end__ fields
 * for proper rendering of stacked intervals
 */
function transformWaterfallData(data: WaterfallDataItem[]) {
  let cumulative = 0;
  let lastIntermediateTotalEnd = 0;
  let totalSum = 0;

  return data.map((item) => {
    const value = item.value || 0;
    let start: number;
    let end: number;

    if (item.isTotal) {
      start = 0;
      end = totalSum;
    } else if (item.isIntermediateTotal) {
      start = lastIntermediateTotalEnd;
      end = cumulative;
      lastIntermediateTotalEnd = end;
    } else {
      start = cumulative;
      end = cumulative + value;
      cumulative = end;
      totalSum += value;
    }

    return {
      ...item,
      __start__: start,
      __end__: end,
      __value__: item.isTotal ? totalSum : item.isIntermediateTotal ? end - start : value,
    };
  });
}

/**
 * Generate link data for connecting waterfall bars
 * Each link connects the end of the previous bar to the start of the current bar
 */
function generateLinkData(data: any[]) {
  return data.reduce((result: any[], current: any, index: number) => {
    if (index > 0) {
      const previous = data[index - 1];
      result.push({
        x: [previous.category, current.category],
        y: current.isTotal || current.isIntermediateTotal ? current.__end__ : current.__start__,
      });
    }
    return result;
  }, []);
}

/**
 * Waterfall chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const waterfall = Waterfall({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * waterfall.render({
 *   type: 'waterfall',
 *   data: [
 *     { category: '期初利润', value: 100 },
 *     { category: '销售收入', value: 80 },
 *     { category: '运营成本', value: -50 },
 *     { category: '税费', value: -20 },
 *     { category: '总计', isTotal: true },
 *   ],
 *   theme: 'academy'
 * });
 *
 * waterfall.destroy();
 * ```
 */
export const Waterfall = (options: VisualizationOptions): WaterfallInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the waterfall chart with the given configuration.
   */
  const render = (config: WaterfallConfig): void => {
    const { data = [], theme = 'default', title, axisXTitle, axisYTitle, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or defaults
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const palette = style.palette || {};
    const positiveColor = palette.positiveColor || DEFAULT_POSITIVE_COLOR;
    const negativeColor = palette.negativeColor || DEFAULT_NEGATIVE_COLOR;
    const totalColor = palette.totalColor || DEFAULT_TOTAL_COLOR;

    // Transform data to include __start__ and __end__ fields
    const transformedData = transformWaterfallData(data);

    // Generate link data for connecting lines
    const linkData = generateLinkData(transformedData);

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
      type: 'view',
      data: transformedData,
      title: title ?? '',
      marginRight: 28,
      axis: {
        x: {
          title: axisXTitle || false,
        },
        y: {
          title: axisYTitle || false,
          labelFormatter: '~s',
        },
      },
      scale: {
        y: { nice: true },
      },
      children: [
        {
          type: 'interval',
          data: transformedData,
          encode: { x: 'category', y: ['__start__', '__end__'], color: 'category' },
          style: {
            maxWidth: 60,
            stroke: '#666',
            radius: 4,
            fill: (d: any) => {
              return d.isTotal || d.isIntermediateTotal
                ? totalColor
                : d.__value__ > 0
                  ? positiveColor
                  : negativeColor;
            },
          },
          labels: [
            {
              text: '__value__',
              position: 'inside',
              fontSize: 10,
              transform: [{ type: 'overflowHide' }],
              formatter: '~s',
              fill: '#000',
              fontWeight: 600,
              stroke: '#fff',
            },
          ],
        },
        {
          type: 'link',
          data: linkData,
          encode: {
            x: 'x',
            y: 'y',
          },
          zIndex: -1,
          style: {
            stroke: '#ccc',
            lineDash: [4, 2],
            lineWidth: 1,
          },
          tooltip: false,
        },
      ],
      legend: false,
      ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
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
