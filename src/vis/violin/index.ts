import { plotlib, type BoxPlotMark } from '@antv/g2';
import { getThemeObject } from '../../theme/g2';
import type { ThemeStyle, VisualizationOptions, VisualizationTheme } from '../../types';
import { createChartRenderer, datumKey, getCartesianAxis, getColorLegend } from '../../util';

/**
 * ViolinDataItem is the type for each data item in the violin chart.
 */
export type ViolinDataItem = {
  category: string;
  value: number;
  group?: string;
};

/**
 * ViolinConfig defines the configuration for rendering the violin chart.
 */
export interface ViolinConfig {
  type?: 'violin';
  data: ViolinDataItem[];
  theme?: VisualizationTheme;
  title?: string;
  subtitle?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  style?: ThemeStyle & {
    startAtZero?: boolean;
  };
}

/**
 * ViolinInstance represents a violin chart instance with render and destroy.
 */
export interface ViolinInstance {
  render: (config: ViolinConfig) => void;
  destroy: () => void;
}

/** G2's point:false branch drops animate; preserve the violin overlay's animation policy. */
const createViolinBox = async (options: Omit<BoxPlotMark, 'type'>) => {
  const result = await plotlib()['mark.boxplot'](options);
  const marks = Array.isArray(result) ? result : [result];
  return marks.map((mark) => ({ ...mark, animate: options.animate }));
};

/**
 * Violin chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const violin = Violin({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * violin.render({
 *   type: 'violin',
 *   data: [
 *     { category: '班级A', value: 15 },
 *     { category: '班级A', value: 18 },
 *     { category: '班级A', value: 22 },
 *     { category: '班级A', value: 27 },
 *     { category: '班级A', value: 35 },
 *   ],
 *   theme: 'academy'
 * });
 *
 * violin.destroy();
 * ```
 */
export const Violin = (options: VisualizationOptions): ViolinInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  const renderer = createChartRenderer({
    container,
    width,
    height,
    autoFit: true,
  });

  /**
   * Render the violin chart with the given configuration.
   */
  const render = (config: ViolinConfig): void => {
    const {
      data = [],
      theme = chartTheme,
      title,
      subtitle,
      axisXTitle,
      axisYTitle,
      style: localStyle = {},
    } = config;

    // Get colors from style.palette or theme defaults
    const hasGroupField = (data || [])[0]?.group !== undefined;
    const appearance = getThemeObject('violin', theme, localStyle);
    const { theme: rendererTheme } = appearance;
    const boxMark = {
      shape: 'violin',
      opacity: 0.5,
      strokeOpacity: 0.5,
      ...appearance.mark.box,
    };
    const colors = rendererTheme.category10 as string[];

    const startAtZero = localStyle.startAtZero || false;
    const densityStyle = appearance.mark.density;

    const legend = getColorLegend(hasGroupField);

    // A streamed group can initially contain one value (or repeated equal values).
    // KDE requires a non-zero range; show its box until enough observations arrive.
    const groups = new Map<string, number[]>();
    const groupKey = (item: ViolinDataItem) => JSON.stringify([item.category, item.group ?? null]);
    for (const item of data) {
      const key = groupKey(item);
      const values = groups.get(key) ?? [];
      values.push(item.value);
      groups.set(key, values);
    }
    const densityData = data.filter((item) => {
      const values = groups.get(groupKey(item))!;
      return values.some((value) => value !== values[0]);
    });

    // Configure chart children for violin plot
    // Violin plot is composed of density plot + boxplot overlay
    let children = [];

    if (hasGroupField) {
      // Grouped violin plot: density by category and group
      children = [
        {
          type: 'density',
          data: {
            transform: [{ type: 'kde', field: 'value', groupBy: ['category', 'group'] }],
          },
          encode: {
            x: 'category',
            y: 'y',
            key: datumKey('category', 'group'),
            color: 'group',
            series: 'group',
            size: 'size',
          },
          scale: {
            y: { nice: true },
            color: { range: colors },
          },
          style: densityStyle,
        },
        {
          type: createViolinBox,
          key: 'violin-boxplot',
          encode: {
            x: 'category',
            y: 'value',
            key: datumKey('category', 'group'),
            series: 'group',
            color: 'group',
          },
          style: { ...boxMark, point: false },
          scale: {
            y: { nice: true },
            color: { range: colors },
          },
        },
      ];
    } else {
      // Simple violin plot: density by category only
      children = [
        {
          type: 'density',
          data: {
            transform: [{ type: 'kde', field: 'value', groupBy: ['category'], size: 20 }],
          },
          encode: {
            x: 'category',
            y: 'y',
            key: datumKey('category'),
            color: 'category',
            size: 'size',
          },
          scale: {
            y: { nice: true },
            color: { range: colors },
          },
          style: densityStyle,
        },
        {
          type: createViolinBox,
          key: 'violin-boxplot',
          encode: {
            x: 'category',
            y: 'value',
            key: datumKey('category'),
            color: 'category',
          },
          style: { ...boxMark, point: false },
          scale: {
            y: { nice: true },
            color: { range: colors },
          },
        },
      ];
    }

    children = children
      .filter((child) => child.type !== 'density' || densityData.length > 0)
      .map((child) =>
        child.type === 'density'
          ? { ...child, data: { ...child.data, value: densityData } }
          : child,
      );

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      animate: false,
      type: 'view',
      data,
      title: title ? { title, subtitle } : '',
      axis: getCartesianAxis(
        {
          xType: 'category',
          xValues: data.map(({ category }) => category),
          container,
          chartWidth: width,
          chartHeight: height,
          axisXTitle,
          axisYTitle,
        },
        rendererTheme,
      ),
      scale: {
        y: { nice: true, zero: startAtZero },
      },
      children: children,
      legend: legend === false ? { color: false } : { color: { position: 'top', ...legend.color } },

      theme: rendererTheme,
    };

    renderer.render(chartOptions);
  };

  /**
   * Destroy the chart instance and clean up resources.
   */
  const destroy = (): void => {
    renderer.destroy();
  };

  return {
    render,
    destroy,
  };
};
