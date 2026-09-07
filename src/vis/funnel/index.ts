import { Chart } from '@antv/g2';
import type { VisualizationOptions, VisualizationTheme } from '../../types';
import {
  CHART_FONT_FAMILY,
  getBackgroundColor,
  getChartVisualTokens,
  getThemeObject,
  normalizePalette,
  resolveChartLocale,
} from '../../util';

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
  conversionRateLabel?: string;
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

const FUNNEL_LABELS = {
  'en-US': {
    baseline: 'Baseline',
    conversionRate: 'Conversion Rate',
    currentValue: 'Current value',
    dropOff: 'Drop-off from previous',
    overallConversionRate: 'Overall conversion',
    stageConversion: 'Stage conversion',
  },
  'zh-CN': {
    baseline: '基准',
    conversionRate: '转化率',
    currentValue: '当前值',
    dropOff: '较上一步流失',
    overallConversionRate: '整体转化率',
    stageConversion: '阶段转化率',
  },
} as const;

const formatConversionRate = (start: number, end: number): string => {
  if (!Number.isFinite(start) || !Number.isFinite(end) || start === 0) return '—';
  return `${((end / start) * 100).toFixed(1)}%`;
};

const formatMetricLabel = (label: string, value: string, locale: string): string =>
  locale === 'zh-CN' ? `${label}：${value}` : `${label}: ${value}`;

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
  const { container, width, height, locale, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the funnel chart with the given configuration.
   */
  const render = (config: FunnelConfig): void => {
    const { data = [], theme = chartTheme, title, conversionRateLabel, style = {} } = config;
    const chartLocale = resolveChartLocale(locale);
    const labels = FUNNEL_LABELS[chartLocale];
    const numberFormatter = new Intl.NumberFormat(chartLocale);
    const stageConversionRateLabel = conversionRateLabel ?? labels.conversionRate;
    const overallConversionRateLabel = conversionRateLabel ?? labels.overallConversionRate;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = normalizePalette(style.palette, theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const tokens = getChartVisualTokens(theme);

    const formatValue = (value: number): string =>
      Number.isFinite(value) ? numberFormatter.format(value) : '—';
    const metricsByCategory = new Map(
      data.map((item, index) => {
        const previous = data[index - 1];
        return [
          item.category,
          {
            conversion: previous
              ? formatConversionRate(previous.value, item.value)
              : labels.baseline,
            dropOff: previous ? Math.max(0, previous.value - item.value) : null,
          },
        ];
      }),
    );
    const funnelTooltip = {
      title: 'category',
      items: [
        (d: FunnelDataItem) => ({
          name: labels.currentValue,
          value: formatValue(d.value),
        }),
        (d: FunnelDataItem) => ({
          name: labels.stageConversion,
          value: metricsByCategory.get(d.category)?.conversion ?? '—',
        }),
        (d: FunnelDataItem) => ({
          name: labels.dropOff,
          value:
            metricsByCategory.get(d.category)?.dropOff === null
              ? '—'
              : formatValue(metricsByCategory.get(d.category)?.dropOff ?? Number.NaN),
        }),
      ],
    };

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
      animate: false,
      type: 'view',
      data,
      title: title || '',
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
          tooltip: funnelTooltip,
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
              text: (_d: FunnelDataItem, index: number, items: FunnelDataItem[]) =>
                index === 0
                  ? ''
                  : formatMetricLabel(
                      stageConversionRateLabel,
                      formatConversionRate(items[index - 1].value, items[index].value),
                      chartLocale,
                    ),
              position: 'top-right',
              textAlign: 'left',
              textBaseline: 'middle',
              fill: tokens.textPrimary,
              dx: 44,
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
          viewStyle: style.backgroundColor ? { viewFill: backgroundColor } : undefined,
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
                tooltip: false,
                style: {
                  stroke: tokens.axisLine,
                  strokeOpacity: theme === 'academy' ? 1 : 0.82,
                  lineWidth: theme === 'academy' ? 1 : 0.75,
                  markerEnd: false,
                  connectLength1: -12,
                },
                labels: [
                  {
                    text: formatMetricLabel(
                      overallConversionRateLabel,
                      formatConversionRate(data[0].value, data[data.length - 1].value),
                      chartLocale,
                    ),
                    position: 'left',
                    textAlign: 'start',
                    textBaseline: 'middle',
                    fill: tokens.textPrimary,
                    dx: 8,
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
      interaction: {
        tooltip: true,
        elementHighlight: true,
      },
      viewStyle: style.backgroundColor ? { viewFill: backgroundColor } : undefined,
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
