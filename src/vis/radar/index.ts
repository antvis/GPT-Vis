import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme/g2';
import type { ThemeStyle, VisualizationOptions, VisualizationTheme } from '../../types';
import { getLineHighlightState, getSeriesHighlightByColorInteraction } from '../../util';
import { getColorLegend } from '../../util/components';
import { CHART_STYLE_DEFAULTS } from '../../util/tokens';

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
  theme?: VisualizationTheme;
  style?: ThemeStyle;
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

    const parallelData = transformRadarToParallel(data);
    const appearance = getThemeObject('radar', theme, localStyle);
    const { theme: rendererTheme } = appearance;
    const lineMark = {
      lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
      lineCap: 'round',
      lineJoin: 'round',
      strokeOpacity: CHART_STYLE_DEFAULTS.lineOpacity,
      ...appearance.mark.line,
    };
    const lineWidth = lineMark.lineWidth ?? CHART_STYLE_DEFAULTS.lineWidth;
    const colors = rendererTheme.category10 as string[];

    // Transform data to parallel format
    const position = Object.keys(parallelData[0] || {}).filter((key) => key !== 'group');
    const hasMultipleSeries = parallelData.length > 1;
    const legend = getColorLegend(parallelData.length > 1);

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
      title: title ? { title, subtitle } : '',
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
        Array.from({ length: position.length }, (_, i) => {
          const defaults = {
            label: align ? i === 0 : true,
            tickFilter: (_: string, idx: number) => {
              return !(i !== 0 && idx === 0);
            },
            grid: i === 0,
          };
          return [`position${i === 0 ? '' : i}`, { ...defaults, ...rendererTheme.axis }];
        }),
      ),
      style: lineMark,
      state: hasMultipleSeries ? getLineHighlightState(lineWidth) : undefined,
      legend: legend === false ? false : { color: { ...legend.color, itemMarker: 'smooth' } },
      interaction: {
        tooltip: true,
        ...(hasMultipleSeries ? getSeriesHighlightByColorInteraction() : {}),
      },

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
