import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme';
import type { ThemeInput, VennChartStyle, VisualizationOptions } from '../../types';

/**
 * VennDataItem is the type for each data item in the venn chart.
 */
export type VennDataItem = {
  /** Parser / DSL often yields a comma-separated string; G2 venn transform expects string[]. */
  sets: string[] | string;
  value: number;
  label?: string;
};

function normalizeVennSets(sets: unknown): string[] {
  if (Array.isArray(sets)) return sets.map((s) => String(s));
  if (typeof sets === 'string') {
    return sets
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (sets == null) return [];
  return [String(sets)];
}

/**
 * VennConfig defines the configuration for rendering the venn chart.
 */
export interface VennConfig {
  type?: 'venn';
  data: VennDataItem[];
  theme?: ThemeInput;
  title?: string;
  subtitle?: string;
  style?: VennChartStyle;
}

/**
 * VennInstance represents a venn chart instance with render and destroy methods.
 */
export interface VennInstance {
  render: (config: VennConfig) => void;
  destroy: () => void;
}

/**
 * Venn chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const venn = Venn({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * venn.render({
 *   type: 'venn',
 *   data: [
 *     { sets: ['A'], value: 20, label: '集合A' },
 *     { sets: ['B'], value: 15, label: '集合B' },
 *     { sets: ['A', 'B'], value: 5, label: '交集AB' },
 *   ],
 *   theme: 'academy'
 * });
 *
 * venn.destroy();
 * ```
 */
export const Venn = (options: VisualizationOptions): VennInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the venn chart with the given configuration.
   */
  const render = (config: VennConfig): void => {
    const { data = [], theme = chartTheme, title, subtitle, style: localStyle = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const appearance = getThemeObject('venn', theme, {
      style: localStyle,
      title,
      subtitle,
      defaults: {
        labels: {
          style: { fillOpacity: 0.85, fontSize: 10 },
          defaultVisible: true,
          position: 'inside',
          contrast: 'inside',
          text: (d: VennDataItem) => d.label || '',
        },
      },
    });
    const { rendererTheme } = appearance;
    const colors = appearance.colors;
    const pathMark = appearance.mark.path;

    const normalizedData = data.map((d) => ({
      ...d,
      sets: normalizeVennSets(d.sets),
    }));

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
      type: 'path',
      data: {
        value: normalizedData,
        transform: [
          {
            type: 'venn',
            padding: 8,
            sets: 'sets',
            size: 'value',
            as: ['key', 'path'],
          },
        ],
      },
      title: appearance.title,
      encode: { d: 'path', color: 'key', ...pathMark.encode },
      scale: {
        color: { range: colors },
      },
      style: {
        // Set opacity: intersections (sets.length > 1) are nearly transparent, single sets are more opaque
        opacity: (d: VennDataItem) => (normalizeVennSets(d.sets).length > 1 ? 0.001 : 0.65),
        ...pathMark.style,
      },
      labels: appearance.labels,
      viewStyle: appearance.viewStyle,
      theme: rendererTheme,
      legend: false,
      axis: false,
      tooltip: false,
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
