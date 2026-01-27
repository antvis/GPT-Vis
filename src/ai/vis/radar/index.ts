import { Chart } from '@antv/g2';
import { getBackgroundColor, getTheme, getThemeColors } from '../../util/theme';

/**
 * RadarDataItem is the type for each data item in the radar chart.
 */
export type RadarDataItem = {
  name: string;
  value: number;
  group?: string;
};

/**
 * RadarOptions defines the initialization options for Radar chart.
 */
export interface RadarOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * RadarConfig defines the configuration for rendering the radar chart.
 */
export interface RadarConfig {
  type?: 'radar';
  data: RadarDataItem[];
  title?: string;
  theme?: 'default' | 'academy' | 'dark';
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
export const Radar = (options: RadarOptions): RadarInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the radar chart with the given configuration.
   */
  const render = (config: RadarConfig): void => {
    const { data = [], theme = 'default', title, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    const { lineWidth = 2 } = style;
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Transform data to parallel format
    const parallelData = transformRadarToParallel(data);
    const position = Object.keys(parallelData[0] || {}).filter((key) => key !== 'group');

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
      type: 'line',
      data: parallelData,
      title: title ?? '',
      coordinate: { type: 'radar' },
      inset: 18,
      encode: {
        position,
        color: 'group',
      },
      scale: {
        // Configure scales for each position axis
        ...Object.fromEntries(
          Array.from({ length: position.length }, (_, i) => [
            `position${i === 0 ? '' : i}`,
            {
              domainMin: 0,
              nice: true,
            },
          ]),
        ),
        color: {
          range: colors,
        },
      },
      axis: Object.fromEntries(
        Array.from({ length: position.length }, (_, i) => [
          `position${i === 0 ? '' : i}`,
          {
            zIndex: 1,
            titleFontSize: 10,
            titleSpacing: 8,
            label: true,
            labelFill: theme === 'dark' ? '#fff' : '#000',
            labelOpacity: 0.45,
            labelFontSize: 10,
            line: true,
            lineFill: '#000',
            lineStrokeOpacity: 0.25,
            tickFilter: (_: string, idx: number) => {
              return !(i !== 0 && idx === 0);
            },
            tickCount: 4,
            gridStrokeOpacity: 0.45,
            gridStroke: theme === 'dark' ? '#fff' : '#000',
            gridLineWidth: 1,
            gridLineDash: [4, 4],
          },
        ]),
      ),
      style: {
        lineWidth,
        lineCap: 'round',
        lineJoin: 'round',
      },
      legend: parallelData.length > 1 ? { color: { position: 'top', itemMarker: 'point' } } : false,
      interaction: {
        tooltip: {
          series: false,
        },
      },
      viewStyle: {
        viewFill: backgroundColor,
      },
      theme: getTheme(theme),
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
