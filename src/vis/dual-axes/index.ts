import { Chart } from '@antv/g2';
import type { VisualizationOptions, VisualizationTheme } from '../../types';
import {
  CHART_STYLE_DEFAULTS,
  bindCrosshairAxisLabels,
  getCartesianAxis,
  getCartesianLayout,
  getChartAnimation,
  getLineHighlightState,
  getSeriesHighlightByColorInteraction,
  getSharedTooltipInteraction,
  getThemeObject,
  normalizePalette,
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
  axisXTitle?: string;
  theme?: VisualizationTheme;
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
    const { categories, series, theme = chartTheme, title, axisXTitle, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      cleanupCrosshairAxisLabels?.();
      cleanupCrosshairAxisLabels = null;
      chart.destroy();
    }

    const { startAtZero = false } = style;
    const requestedColors = style.palette ? normalizePalette(style.palette, theme) : [];
    const defaultColors = normalizePalette(undefined, theme);
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

    // Create children configurations for each series
    const children = seriesMeta.map(({ item, yField, displayName, color }) => {
      const tooltip = {
        items: [
          (datum: Record<string, unknown>) => ({
            name: displayName,
            value: datum[yField],
          }),
        ],
      };

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
          },
          tooltip,
          axis: {
            y: {
              ...cartesianAxis.y,
              title: item.axisYTitle || '',
              titleFill: color,
              titleFontWeight: 500,
            },
          },
          style: {
            fill: color,
            fillOpacity: 0.86,
            columnWidthRatio: CHART_STYLE_DEFAULTS.intervalWidthRatio,
            ...(theme !== 'academy' ? { radiusTopLeft: 4, radiusTopRight: 4 } : {}),
          },
          animate: getChartAnimation(hasRendered, 'growInY'),
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
          },
          tooltip,
          axis: {
            y: {
              ...cartesianAxis.y,
              position: 'right',
              title: item.axisYTitle || '',
              titleFill: color,
              titleFontWeight: 500,
              grid: false,
            },
          },
          style: {
            stroke: color,
            lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
            lineCap: 'round',
            lineJoin: 'round',
          },
          state: getLineHighlightState(CHART_STYLE_DEFAULTS.lineWidth),
          animate: getChartAnimation(hasRendered, 'pathIn'),
        };
      }
    });

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: title || '',
      children,
      ...getCartesianLayout(cartesianAxisOptions),
      axis: { x: cartesianAxis.x },
      scale: {
        y: { nice: true },
        color: {
          domain: seriesMeta.map(({ yField }) => yField),
          range: seriesMeta.map(({ color }) => color),
        },
      },
      legend: {
        color: {
          labelFormatter: (value: string) => seriesByField.get(value)?.displayName || value,
          itemMarker: (value: string) =>
            seriesByField.get(value)?.type === 'line' ? 'smooth' : 'rect',
        },
      },
      interaction: {
        tooltip: getSharedTooltipInteraction({ crosshairs: true }),
        ...getSeriesHighlightByColorInteraction(),
      },
      viewStyle: style.backgroundColor ? { viewFill: style.backgroundColor } : undefined,
      theme: getThemeObject(theme),
    };

    chart.options(chartOptions);
    const lineYFields = seriesMeta
      .filter(({ item }) => item.type === 'line')
      .map(({ yField }) => yField);
    if (lineYFields.length) {
      const currentChart = chart;
      const cleanups = lineYFields.map((yField, index) =>
        bindCrosshairAxisLabels(currentChart, theme, {
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
