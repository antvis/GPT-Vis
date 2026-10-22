import { Chart } from '@antv/g2';
import {
  adaptG2CartesianAxis,
  adaptG2DataLabels,
  adaptG2MarkStyle,
  adaptG2Title,
  resolveG2ChartTheme,
} from '../../theme';
import { getBackgroundColor } from '../../theme/builtins';
import type { ThemeInput, VisualizationOptions, WaterfallChartStyle } from '../../types';

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
 * WaterfallConfig defines the configuration for rendering the waterfall chart.
 */
export interface WaterfallConfig {
  type?: 'waterfall';
  data: WaterfallDataItem[];
  theme?: ThemeInput;
  title?: string;
  subtitle?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  style?: WaterfallChartStyle & {
    /**
     * Custom color palette for waterfall bars.
     * Array order: [0] positive color, [1] negative color, [2] total/intermediate-total color.
     * Defaults: ['#FF4D4F', '#2EBB59', '#1783FF']
     */
    palette?: string[];
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
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the waterfall chart with the given configuration.
   */
  const render = (config: WaterfallConfig): void => {
    const {
      data = [],
      theme = chartTheme,
      title,
      subtitle,
      axisXTitle,
      axisYTitle,
      style: localStyle = {},
    } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or defaults
    // palette array order: [0] positive, [1] negative, [2] total
    const { baseTheme, labelTokens, rendererTheme, style } = resolveG2ChartTheme(
      'waterfall',
      theme,
      {
        style: localStyle,
      },
    );
    const backgroundColor = style.backgroundColor || getBackgroundColor(baseTheme);
    const palette = style.palette || [];
    const positiveColor = palette[0] || DEFAULT_POSITIVE_COLOR;
    const negativeColor = palette[1] || DEFAULT_NEGATIVE_COLOR;
    const totalColor = palette[2] || DEFAULT_TOTAL_COLOR;
    const intervalMark = adaptG2MarkStyle(
      'interval',
      {
        maxWidth: 60,
        stroke: '#666',
        ...(baseTheme !== 'academy' ? { radius: 4 } : {}),
      },
      style.mark?.interval,
    );
    const linkStyle = style.mark?.link;
    const linkMark = adaptG2MarkStyle(
      'link',
      { stroke: '#ccc', lineDash: [4, 2], lineWidth: 1 },
      linkStyle,
    );

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
      animate: false,
      type: 'view',
      data: transformedData,
      title: adaptG2Title(title, subtitle, style.title),
      marginRight: 28,
      axis: adaptG2CartesianAxis({
        axisXTitle,
        axisYTitle,
        defaults: { y: { labelFormatter: '~s' } },
        style: style.axis,
      }),
      scale: {
        y: { nice: true },
      },
      children: [
        {
          type: 'interval',
          animate: false,
          data: transformedData,
          encode: {
            x: 'category',
            y: ['__start__', '__end__'],
            color: 'category',
            ...intervalMark.encode,
          },
          style: {
            fill: (d: any) => {
              return d.isTotal || d.isIntermediateTotal
                ? totalColor
                : d.__value__ > 0
                  ? positiveColor
                  : negativeColor;
            },
            ...intervalMark.style,
          },
          labels: adaptG2DataLabels({
            style: {
              fontSize: 10,
              fontWeight: 600,
              stroke: '#fff',
              ...style.label,
            },
            defaultVisible: true,
            text: '__value__',
            position: 'inside',
            contrast: 'inside',
            tokens: labelTokens,
            transform: [{ type: 'overflowHide' }],
            formatter: '~s',
          }),
          tooltip: {
            title: (d: any) => d.category,
            items: [
              {
                field: '__value__',
                name: '数值',
                valueFormatter: '~s',
              },
              {
                field: '__start__',
                name: '起始',
                valueFormatter: '~s',
              },
              {
                field: '__end__',
                name: '结束',
                valueFormatter: '~s',
              },
            ],
          },
        },
        {
          type: 'link',
          animate: false,
          data: linkData,
          encode: {
            x: 'x',
            y: 'y',
            ...linkMark.encode,
          },
          zIndex: -1,
          style: linkMark.style,
          tooltip: false,
        },
      ],
      legend: false,
      style: style.backgroundColor ? { viewFill: backgroundColor } : undefined,
      theme: rendererTheme,
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
