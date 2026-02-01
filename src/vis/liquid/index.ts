import { Chart } from '@antv/g2';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors, getThemeObject } from '../../util/theme';

/**
 * LiquidConfig defines the configuration for rendering the liquid chart.
 */
export interface LiquidConfig {
  type?: 'liquid';
  percent: number;
  shape?: 'rect' | 'circle' | 'pin' | 'triangle';
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * LiquidInstance represents a liquid chart instance with render and destroy methods.
 */
export interface LiquidInstance {
  render: (config: LiquidConfig) => void;
  destroy: () => void;
}

/**
 * Liquid chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const liquid = Liquid({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * liquid.render({
 *   type: 'liquid',
 *   percent: 0.75,
 *   shape: 'circle',
 *   theme: 'academy'
 * });
 *
 * liquid.destroy();
 * ```
 */
export const Liquid = (options: VisualizationOptions): LiquidInstance => {
  const { container, width = 640, height = 480, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the liquid chart with the given configuration.
   */
  const render = (config: LiquidConfig): void => {
    const { percent, shape = 'circle', theme = chartTheme, title, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Calculate dynamic font size based on chart dimensions
    const inferFontSize = Math.min(width, height) / 10;
    const fontSize = Math.min(Math.max(inferFontSize, 24), 64);

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
      type: 'liquid',
      data: percent,
      title: title ?? '',
      style: {
        shape,
        contentFontSize: fontSize,
        contentFill: '#000',
        contentStroke: '#fff',
        contentLineWidth: 2,
        outlineBorder: 4,
        outlineDistance: 4,
        waveLength: 128,
        contentPointerEvents: 'none',
        // Use palette color if provided
        ...(colors[0] ? { fill: colors[0], outlineStroke: colors[0] } : {}),
      },
      viewStyle: {
        viewFill: backgroundColor,
      },
      theme: getThemeObject(theme),
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
