import { Chart } from '@antv/g2';
import {
  adaptG2CartesianAxis,
  adaptG2ColorLegend,
  adaptG2MarkStyle,
  adaptG2Title,
  resolveG2ChartTheme,
} from '../../theme';
import { CHART_STYLE_DEFAULTS, normalizePalette } from '../../theme/builtins';
import type { RadarChartStyle, ThemeInput, VisualizationOptions } from '../../types';
import { getLineHighlightState, getSeriesHighlightByColorInteraction } from '../../util';

/**
 * RadarDataItem is the type for each data item in the radar chart.
 */
export type RadarDataItem = {
  name: string;
  value: number;
  group?: string;
};

/**
 * RadarConfig defines the configuration for rendering the radar chart.
 */
export interface RadarConfig {
  type?: 'radar';
  data: RadarDataItem[];
  title?: string;
  subtitle?: string;
  align?: boolean;
  theme?: ThemeInput;
  style?: RadarChartStyle;
}

/**
 * RadarInstance represents a radar chart instance with render and destroy methods.
 */
export interface RadarInstance {
  render: (config: RadarConfig) => void;
  destroy: () => void;
}

/**
 * Transform radar data to parallel coordinates format.
 * Groups data by group field and converts to position-based encoding.
 */
function transformRadarToParallel(data: RadarDataItem[]) {
  if (!data || data.length === 0) {
    return [];
  }

  // Group data by group field
  const groups: { [key: string]: RadarDataItem[] } = {};
  data.forEach((item) => {
    const groupKey = item.group || '';
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
  });

  // Transform to parallel format
  return Object.entries(groups).map(([group, values]) => {
    const parallelValues: any = {};
    values.forEach(({ name, value }) => {
      parallelValues[name] = value;
    });
    return {
      ...parallelValues,
      group,
    };
  });
}

/**
 * Radar chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const radar = Radar({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * radar.render({
 *   type: 'radar',
 *   data: [
 *     { name: '沟通能力', value: 2 },
 *     { name: '协作能力', value: 3 },
 *     { name: '领导能力', value: 2 },
 *     { name: '学习能力', value: 5 },
 *     { name: '创新能力', value: 6 },
 *     { name: '技术能力', value: 9 },
 *   ],
 * });
 *
 * radar.destroy();
 * ```
 */
export const Radar = (options: VisualizationOptions): RadarInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the radar chart with the given configuration.
   */
  const render = (config: RadarConfig): void => {
    const {
      data = [],
      theme = chartTheme,
      title,
      subtitle,
      align = false,
      style: localStyle = {},
    } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    const { baseTheme, rendererTheme, style } = resolveG2ChartTheme('radar', theme, {
      style: localStyle,
    });
    const lineMark = adaptG2MarkStyle(
      'line',
      {
        lineWidth: style.lineWidth ?? CHART_STYLE_DEFAULTS.lineWidth,
        lineCap: 'round',
        lineJoin: 'round',
        strokeOpacity: CHART_STYLE_DEFAULTS.lineOpacity,
      },
      style.mark?.line,
    );
    const lineWidth = lineMark.style.lineWidth ?? CHART_STYLE_DEFAULTS.lineWidth;
    const colors = normalizePalette(style.palette, baseTheme);

    // Transform data to parallel format
    const parallelData = transformRadarToParallel(data);
    const position = Object.keys(parallelData[0] || {}).filter((key) => key !== 'group');
    const hasMultipleSeries = parallelData.length > 1;
    const legend = adaptG2ColorLegend(hasMultipleSeries, style.legend);

    const adaptRadarAxis = (defaults: Record<string, unknown>) => {
      const axis = adaptG2CartesianAxis({ defaults: { x: defaults }, style: style.axis }).x;
      const visualStyle = { ...axis };
      delete visualStyle.title;
      return visualStyle;
    };

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
      type: 'line',
      data: parallelData,
      title: adaptG2Title(title, subtitle, style.title),
      coordinate: { type: 'radar' },
      inset: 24,
      encode: {
        position,
        color: 'group',
        ...lineMark.encode,
      },
      scale: {
        ...Object.fromEntries(
          Array.from({ length: position.length }, (_, i) => {
            const scaleConfig: any = { domainMin: 0, nice: true };
            if (align) {
              const allValues = data.map((d) => d.value).filter((v) => v != null);
              scaleConfig.domainMax = Math.max(...allValues);
            }
            return [`position${i === 0 ? '' : i}`, scaleConfig];
          }),
        ),
        color: {
          range: colors,
        },
      },
      axis: Object.fromEntries(
        Array.from({ length: position.length }, (_, i) => {
          const defaults = {
            label: align ? i === 0 : true,
            tickFilter: (_: string, idx: number) => {
              return !(i !== 0 && idx === 0);
            },
            grid: i === 0,
          };
          return [`position${i === 0 ? '' : i}`, adaptRadarAxis(defaults)];
        }),
      ),
      style: lineMark.style,
      state: hasMultipleSeries ? getLineHighlightState(lineWidth) : undefined,
      legend: legend === false ? false : { color: { ...legend.color, itemMarker: 'smooth' } },
      interaction: {
        tooltip: true,
        ...(hasMultipleSeries ? getSeriesHighlightByColorInteraction() : {}),
      },
      viewStyle: style.backgroundColor ? { viewFill: style.backgroundColor } : undefined,
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
