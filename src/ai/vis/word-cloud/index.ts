import { Chart } from '@antv/g2';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * WordCloudDataItem is the type for each data item in the word cloud chart.
 */
export type WordCloudDataItem = {
  text: string;
  value: number;
};

/**
 * WordCloudConfig defines the configuration for rendering the word cloud chart.
 */
export interface WordCloudConfig {
  type?: 'word-cloud';
  data: WordCloudDataItem[];
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * WordCloudInstance represents a word cloud chart instance with render and destroy methods.
 */
export interface WordCloudInstance {
  render: (config: WordCloudConfig) => void;
  destroy: () => void;
}

/**
 * WordCloud chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const wordCloud = WordCloud({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * wordCloud.render({
 *   type: 'word-cloud',
 *   data: [
 *     { text: '环境', value: 20 },
 *     { text: '保护', value: 15 },
 *     { text: '可持续发展', value: 10 },
 *   ],
 *   theme: 'academy'
 * });
 *
 * wordCloud.destroy();
 * ```
 */
export const WordCloud = (options: VisualizationOptions): WordCloudInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  /**
   * Render the word cloud chart with the given configuration.
   */
  const render = (config: WordCloudConfig): void => {
    const { data = [], theme = 'default', title, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

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
      type: 'wordCloud',
      data,
      title: title ?? '',
      layout: {
        fontSize: [8, 42],
      },
      encode: {
        text: 'text',
        color: 'text',
        value: 'value',
      },
      scale: {
        color: { range: colors },
      },
      legend: false,
      tooltip: {
        items: [
          (d: any) => ({
            name: d.text,
            value: d.value,
          }),
        ],
      },
      viewStyle: {
        viewFill: backgroundColor,
      },
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
