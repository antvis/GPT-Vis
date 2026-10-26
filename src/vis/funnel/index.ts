import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme';
import { CHART_FONT_FAMILY } from '../../theme/shared';
import type { ThemeInput, ThemeStyle, VisualizationOptions } from '../../types';
import { resolveChartLocale } from '../../util';

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
  theme?: ThemeInput;
  title?: string;
  subtitle?: string;
  conversionRateLabel?: string;
  style?: ThemeStyle;
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
    const {
      data = [],
      theme = chartTheme,
      title,
      subtitle,
      conversionRateLabel,
      style: localStyle = {},
    } = config;
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
    const appearance = getThemeObject('funnel', theme, {
      style: localStyle,
      title,
      subtitle,
      defaults: {
        labels: {
          style: {
            fontFamily: CHART_FONT_FAMILY,
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 17,
          },
          defaultVisible: true,
          text: (d: FunnelDataItem) => `${d.category}\n${formatValue(d.value)}`,
          position: 'inside',
          contrast: 'inside',
          transform: [{ type: 'overflowStroke' }],
        },
      },
    });
    const { rendererTheme } = appearance;
    const colors = appearance.colors;

    const tokens = appearance.values;
    const intervalMark = appearance.mark.interval;

    const connectorMark = appearance.mark.connector.style;

    const formatValue = (value: number): string =>
      Number.isFinite(value) ? numberFormatter.format(value) : '—';
    const isInverted = data.length > 1 && data[0].value < data[data.length - 1].value;
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
    const primaryLabels = appearance.labels ?? [];

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
      title: appearance.title,
      children: [
        {
          type: 'interval',
          data,
          encode: {
            x: 'category',
            y: 'value',
            color: 'category',
            ...intervalMark.encode,
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
            ...primaryLabels,
            {
              text: (_d: FunnelDataItem, index: number, items: FunnelDataItem[]) =>
                (isInverted ? index < items.length - 1 : index > 0) ? '———' : '',
              position: isInverted ? 'bottom-right' : 'top-right',
              fill: tokens.textSecondary,
              fillOpacity: 0.72,
              dx: 8,
              dy: isInverted ? 6 : -6,
              style: {
                fontFamily: CHART_FONT_FAMILY,
                fontSize: 8,
                fontWeight: 400,
                letterSpacing: -2,
              },
            },
            {
              text: (_d: FunnelDataItem, index: number, items: FunnelDataItem[]) => {
                const from = isInverted ? items[index] : items[index - 1];
                const to = isInverted ? items[index + 1] : items[index];
                return from && to
                  ? formatMetricLabel(
                      stageConversionRateLabel,
                      formatConversionRate(from.value, to.value),
                      chartLocale,
                    )
                  : '';
              },
              position: isInverted ? 'bottom-right' : 'top-right',
              textAlign: 'left',
              textBaseline: 'middle',
              fill: tokens.textPrimary,
              dx: 26,
              style: {
                fontFamily: CHART_FONT_FAMILY,
                fontSize: 11,
                fontWeight: 500,
              },
            },
          ],
          style: intervalMark.style,
          state: {
            active: {
              fillOpacity: 1,
              stroke: tokens.separator,
              lineWidth: 3,
            },
          },
        },
        ...(data.length > 1
          ? [
              {
                type: 'connector',
                data: [
                  {
                    startX: isInverted ? data[data.length - 1].category : data[0].category,
                    startY: isInverted ? data[0].category : data[data.length - 1].category,
                    endX: 0,
                    endY: Math.abs(data[0].value - data[data.length - 1].value) / 2,
                  },
                ],
                encode: {
                  x: 'startX',
                  x1: 'startY',
                  y: 'endX',
                  y1: 'endY',
                },
                tooltip: false,
                style: connectorMark,
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
      style: appearance.viewStyle,
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
