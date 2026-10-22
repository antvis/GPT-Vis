import { Chart } from '@antv/g2';
import {
  adaptG2CartesianAxis,
  adaptG2ColorLegend,
  adaptG2MarkStyle,
  adaptG2Title,
  resolveG2ChartTheme,
} from '../../theme';
import { CHART_STYLE_DEFAULTS, normalizePalette } from '../../theme/builtins';
import type { DualAxesChartStyle, ThemeInput, VisualizationOptions } from '../../types';
import {
  bindCrosshairAxisLabels,
  getCartesianAxis,
  getCartesianLayout,
  getChartAnimation,
  getLineHighlightState,
  getSeriesHighlightByColorInteraction,
  getSharedTooltipInteraction,
} from '../../util';

/**
 * DualAxesSeriesItem defines a single series in the dual-axes chart.
 */
export type DualAxesSeriesItem = {
  type: 'line' | 'column';
  data: number[];
  axisYTitle?: string;
};

/**
 * DualAxesConfig defines the configuration for rendering the dual-axes chart.
 */
export interface DualAxesConfig {
  type?: 'dual-axes';
  categories: string[];
  series: DualAxesSeriesItem[];
  title?: string;
  subtitle?: string;
  axisXTitle?: string;
  theme?: ThemeInput;
  style?: DualAxesChartStyle & {
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
const getSeriesField = (index: number): string => `value_${index + 1}`;

function transformData(series: DualAxesSeriesItem[], categories: string[]) {
  return categories.map((category, index) => {
    const dataPoint: any = { category };
    series.forEach((item, seriesIndex) => {
      dataPoint[getSeriesField(seriesIndex)] = item.data[index];
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
export const DualAxes = (options: VisualizationOptions): DualAxesInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;
  let hasRendered = false;
  let cleanupCrosshairAxisLabels: (() => void) | null = null;

  /**
   * Render the dual-axes chart with the given configuration.
   */
  const render = (config: DualAxesConfig): void => {
    const {
      categories,
      series,
      theme = chartTheme,
      title,
      subtitle,
      axisXTitle,
      style: localStyle = {},
    } = config;

    // Clean up previous chart if exists
    if (chart) {
      cleanupCrosshairAxisLabels?.();
      cleanupCrosshairAxisLabels = null;
      chart.destroy();
    }

    const { baseTheme, rendererTheme, style } = resolveG2ChartTheme('dual-axes', theme, {
      style: localStyle,
    });
    const { startAtZero = false } = localStyle;
    const requestedColors = style.palette ? normalizePalette(style.palette, baseTheme) : [];
    const defaultColors = normalizePalette(undefined, baseTheme);
    const colors = [
      ...requestedColors,
      ...defaultColors.filter((color) => !requestedColors.includes(color)),
    ];

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
    const sortedSeries = series
      .map((item, originalIndex) => ({ item, originalIndex }))
      .sort((a, b) => {
        const order = ['column', 'line'];
        return order.indexOf(a.item.type) - order.indexOf(b.item.type);
      });
    const seriesMeta = sortedSeries.map(({ item, originalIndex }, index) => ({
      item,
      yField: getSeriesField(originalIndex),
      displayName: item.axisYTitle || getSeriesField(originalIndex),
      color: colors[index % colors.length],
    }));
    const seriesByField = new Map(
      seriesMeta.map(({ item, yField, displayName }) => [yField, { type: item.type, displayName }]),
    );
    const cartesianAxisOptions = {
      axisXTitle,
      xLabels: categories,
      chartWidth: width,
    };
    const cartesianAxis = getCartesianAxis(cartesianAxisOptions);
    const intervalStyle = style.mark?.interval;
    const lineStyle = style.mark?.line;
    const visibleSeriesMeta = seriesMeta;

    // Create children configurations for each series
    const children = seriesMeta
      .map(({ item, yField, displayName, color }) => {
        const tooltip = {
          items: [
            (datum: Record<string, unknown>) => ({
              name: displayName,
              value: datum[yField],
            }),
          ],
        };

        if (item.type === 'column') {
          const intervalMark = adaptG2MarkStyle(
            'interval',
            {
              fill: color,
              fillOpacity: 0.86,
              columnWidthRatio: CHART_STYLE_DEFAULTS.intervalWidthRatio,
              ...(baseTheme !== 'academy' ? { radiusTopLeft: 4, radiusTopRight: 4 } : {}),
            },
            intervalStyle,
          );
          const axis = adaptG2CartesianAxis({
            axisYTitle: item.axisYTitle,
            defaults: {
              y: {
                ...cartesianAxis.y,
                titleFill: color,
                titleFontWeight: 500,
              },
            },
            style: style.axis,
          });
          return {
            type: 'interval',
            encode: {
              x: 'category',
              y: yField,
              color: () => yField,
              ...intervalMark.encode,
            },
            scale: {
              y: { nice: true, zero: startAtZero },
            },
            tooltip,
            axis: { y: axis.y },
            style: intervalMark.style,
            animate: getChartAnimation(hasRendered, 'growInY'),
          };
        } else {
          const lineMark = adaptG2MarkStyle(
            'line',
            {
              shape: 'smooth',
              stroke: color,
              lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
              lineCap: 'round',
              lineJoin: 'round',
            },
            lineStyle,
          );
          const lineWidth = lineMark.style.lineWidth ?? CHART_STYLE_DEFAULTS.lineWidth;
          const axis = adaptG2CartesianAxis({
            axisYTitle: item.axisYTitle,
            defaults: {
              y: {
                ...cartesianAxis.y,
                position: 'right',
                titleFill: color,
                titleFontWeight: 500,
                grid: false,
              },
            },
            style: style.axis,
          });
          // line type
          return {
            type: 'line',
            encode: {
              x: 'category',
              y: yField,
              color: () => yField,
              ...lineMark.encode,
            },
            scale: {
              y: { independent: true, zero: startAtZero },
            },
            tooltip,
            axis: { y: axis.y },
            style: lineMark.style,
            state: getLineHighlightState(lineWidth),
            animate: getChartAnimation(hasRendered, 'pathIn'),
          };
        }
      })
      .filter(Boolean);

    const xAxis = adaptG2CartesianAxis({
      axisXTitle,
      defaults: { x: cartesianAxis.x },
      style: style.axis,
    }).x;
    const legend = adaptG2ColorLegend(visibleSeriesMeta.length > 0, style.legend);

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: adaptG2Title(title, subtitle, style.title),
      children,
      ...getCartesianLayout(cartesianAxisOptions),
      axis: { x: xAxis },
      scale: {
        y: { nice: true },
        color: {
          domain: visibleSeriesMeta.map(({ yField }) => yField),
          range: visibleSeriesMeta.map(({ color }) => color),
        },
      },
      legend:
        legend === false
          ? false
          : {
              color: {
                ...legend.color,
                labelFormatter: (value: string) => seriesByField.get(value)?.displayName || value,
                itemMarker: (value: string) =>
                  seriesByField.get(value)?.type === 'line' ? 'smooth' : 'rect',
              },
            },
      interaction: {
        tooltip: getSharedTooltipInteraction({ crosshairs: true }),
        ...getSeriesHighlightByColorInteraction(),
      },
      style: style.backgroundColor ? { viewFill: style.backgroundColor } : undefined,
      theme: rendererTheme,
    };

    chart.options(chartOptions);
    const lineYFields = visibleSeriesMeta
      .filter(({ item }) => item.type === 'line')
      .map(({ yField }) => yField);
    if (lineYFields.length) {
      const currentChart = chart;
      const cleanups = lineYFields.map((yField, index) =>
        bindCrosshairAxisLabels(currentChart, baseTheme, {
          showXLabel: index === 0,
          useStandaloneYLabel: true,
          yAxisPosition: 'right',
          yField,
        }),
      );
      cleanupCrosshairAxisLabels = () => cleanups.forEach((cleanup) => cleanup());
    }
    chart.render();
    hasRendered = true;
  };

  /**
   * Destroy the chart instance and clean up resources.
   */
  const destroy = (): void => {
    if (chart) {
      cleanupCrosshairAxisLabels?.();
      cleanupCrosshairAxisLabels = null;
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
