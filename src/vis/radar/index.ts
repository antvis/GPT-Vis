import { Chart } from '@antv/g2';
import type { VisualizationOptions, VisualizationTheme } from '../../types';
import {
  CHART_STYLE_DEFAULTS,
  getColorLegend,
  getLineHighlightState,
  getSeriesHighlightByColorInteraction,
  getThemeObject,
  normalizePalette,
} from '../../util';

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
  align?: boolean;
  theme?: VisualizationTheme;
  style?: {
    backgroundColor?: string;
    palette?: string[];
    lineWidth?: number;
  };
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
    const { data = [], theme = chartTheme, title, align = false, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    const { lineWidth = CHART_STYLE_DEFAULTS.lineWidth } = style;
    const colors = normalizePalette(style.palette, theme);

    // Transform data to parallel format
    const parallelData = transformRadarToParallel(data);
    const position = Object.keys(parallelData[0] || {}).filter((key) => key !== 'group');
    const hasMultipleSeries = parallelData.length > 1;
    const legend = getColorLegend(hasMultipleSeries);

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
      title: title || '',
      coordinate: { type: 'radar' },
      inset: 24,
      encode: {
        position,
        color: 'group',
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
        Array.from({ length: position.length }, (_, i) => [
          `position${i === 0 ? '' : i}`,
          {
            label: align ? i === 0 : true,
            tickFilter: (_: string, idx: number) => {
              return !(i !== 0 && idx === 0);
            },
            grid: i === 0,
          },
        ]),
      ),
      style: {
        lineWidth,
        lineCap: 'round',
        lineJoin: 'round',
        strokeOpacity: CHART_STYLE_DEFAULTS.lineOpacity,
      },
      state: hasMultipleSeries ? getLineHighlightState(lineWidth) : undefined,
      legend:
        legend === false
          ? false
          : {
              color: {
                ...legend.color,
                itemMarker: 'smooth',
              },
            },
      interaction: {
        tooltip: true,
        ...(hasMultipleSeries ? getSeriesHighlightByColorInteraction() : {}),
      },
      viewStyle: style.backgroundColor ? { viewFill: style.backgroundColor } : undefined,
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
