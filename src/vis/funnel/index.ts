import { Chart } from '@antv/g2';
import type { VisualizationOptions, VisualizationTheme } from '../../types';
import {
  CHART_FONT_FAMILY,
  CHART_STYLE_DEFAULTS,
  getChartTitle,
  getChartVisualTokens,
  getTooltipInteraction,
} from '../../util/chart-style';
import { getBackgroundColor, getThemeObject, normalizePalette } from '../../util/theme';

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
  theme?: VisualizationTheme;
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
  const { container, width, height, theme: chartTheme = 'default' } = options;
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
    const colors = normalizePalette(style.palette, theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const tokens = getChartVisualTokens(theme);

    // Helper function to calculate conversion rate
    const conversionRate = (start: number, end: number): string => {
      if (!Number.isFinite(start) || !Number.isFinite(end) || start === 0) return '—';
      return `${((end / start) * 100).toFixed(1)}%`;
    };
    const numberFormatter = new Intl.NumberFormat('en-US');
    const formatValue = (value: number): string =>
      Number.isFinite(value) ? numberFormatter.format(value) : '—';
    const metricsByCategory = new Map(
      data.map((item, index) => {
        const previous = data[index - 1];
        return [
          item.category,
          {
            conversion: previous ? conversionRate(previous.value, item.value) : '基准',
            dropOff: previous ? Math.max(0, previous.value - item.value) : null,
          },
        ];
      }),
    );

    // Create chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
      paddingLeft: 56,
      paddingRight: 118,
    });

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: getChartTitle(title, theme),
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
          legend: false,
          labels: [
            {
              text: (d: FunnelDataItem) => `${d.category}\n${formatValue(d.value)}`,
              position: 'inside',
              transform: [{ type: 'contrastReverse' }, { type: 'overflowStroke' }],
              style: {
                fontFamily: CHART_FONT_FAMILY,
                fontSize: 12,
                fontWeight: 500,
                lineHeight: 17,
              },
            },
            {
              text: (_d: FunnelDataItem, index: number) => (index === 0 ? '' : '———'),
              position: 'top-right',
              fill: tokens.textSecondary,
              fillOpacity: 0.72,
              dx: 18,
              dy: -6,
              style: {
                fontFamily: CHART_FONT_FAMILY,
                fontSize: 8,
                fontWeight: 400,
                letterSpacing: -2,
              },
            },
            {
              text: (_d: FunnelDataItem, index: number) => (index === 0 ? '' : '转化率：'),
              position: 'top-right',
              textAlign: 'left',
              textBaseline: 'middle',
              fill: tokens.textSecondary,
              dx: 44,
              style: {
                fontFamily: CHART_FONT_FAMILY,
                fontSize: 11,
                fontWeight: 500,
              },
            },
            {
              text: (_d: FunnelDataItem, index: number, items: FunnelDataItem[]) =>
                index === 0 ? '' : conversionRate(items[index - 1].value, items[index].value),
              position: 'top-right',
              textAlign: 'left',
              textBaseline: 'middle',
              fill: tokens.textPrimary,
              dx: 88,
              style: {
                fontFamily: CHART_FONT_FAMILY,
                fontSize: 11,
                fontWeight: 500,
              },
            },
          ],
          style: {
            fillOpacity: 0.94,
            stroke: tokens.separator,
            lineWidth: 2,
            ...(theme === 'academy' ? {} : { radius: 4 }),
          },
          state: {
            active: {
              fillOpacity: 1,
              stroke: tokens.separator,
              lineWidth: 3,
            },
          },
          viewStyle: {
            viewFill: backgroundColor,
          },
        },
        ...(data.length > 1
          ? [
              {
                type: 'connector',
                data: [
                  {
                    startX: data[0].category,
                    startY: data[data.length - 1].category,
                    endX: 0,
                    endY: (data[0].value - data[data.length - 1].value) / 2,
                  },
                ],
                encode: { x: 'startX', x1: 'startY', y: 'endX', y1: 'endY' },
                style: {
                  stroke: tokens.axisLine,
                  strokeOpacity: theme === 'academy' ? 1 : 0.82,
                  lineWidth: theme === 'academy' ? 1 : 0.75,
                  markerEnd: false,
                  connectLength1: -12,
                },
                labels: [
                  {
                    text: '整体转化率：',
                    position: 'left',
                    textAlign: 'start',
                    textBaseline: 'middle',
                    fill: tokens.textSecondary,
                    dx: 8,
                    style: {
                      fontFamily: CHART_FONT_FAMILY,
                      fontSize: 11,
                      fontWeight: 500,
                    },
                  },
                  {
                    text: conversionRate(data[0].value, data[data.length - 1].value),
                    position: 'left',
                    textAlign: 'start',
                    textBaseline: 'middle',
                    fill: tokens.textPrimary,
                    dx: 80,
                    style: {
                      fontFamily: CHART_FONT_FAMILY,
                      fontSize: 11,
                      fontWeight: 500,
                    },
                  },
                ],
              },
            ]
          : []),
      ],
      axis: false,
      tooltip: {
        title: 'category',
        items: [
          (d: FunnelDataItem) => ({
            name: '当前值',
            value: formatValue(d.value),
          }),
          (d: FunnelDataItem) => ({
            name: '阶段转化率',
            value: metricsByCategory.get(d.category)?.conversion ?? '—',
          }),
          (d: FunnelDataItem) => ({
            name: '较上一步流失',
            value:
              metricsByCategory.get(d.category)?.dropOff === null
                ? '—'
                : formatValue(metricsByCategory.get(d.category)?.dropOff ?? Number.NaN),
          }),
        ],
      },
      interaction: {
        tooltip: getTooltipInteraction(theme),
        elementHighlight: { delay: CHART_STYLE_DEFAULTS.interactionDelay },
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
