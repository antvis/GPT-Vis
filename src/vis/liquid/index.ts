import { Chart } from '@antv/g2';
import { getThemeObject } from '../../theme/g2';
import type { ThemeStyle, VisualizationOptions, VisualizationTheme } from '../../types';
import { CHART_FONT_FAMILY } from '../../util/tokens';

// Default dimensions used for font size calculation when not explicitly provided
const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;

/**
 * LiquidConfig defines the configuration for rendering the liquid chart.
 */
export interface LiquidConfig {
  type?: 'liquid';
  percent: number;
  shape?: 'circle' | 'rect' | 'pin' | 'triangle';
  theme?: VisualizationTheme;
  title?: string;
  subtitle?: string;
  style?: ThemeStyle;
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
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let chart: Chart | null = null;

  /**
   * Render the liquid chart with the given configuration.
   */
  const render = (config: LiquidConfig): void => {
    const { percent, shape, theme = chartTheme, title, subtitle, style: localStyle = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors from style.palette or theme defaults
    const appearance = getThemeObject('liquid', theme, localStyle);
    const { theme: rendererTheme } = appearance;
    const baseTheme = rendererTheme.type;
    const liquidStyle = appearance.mark.liquid;
    const resolvedShape = shape ?? (liquidStyle.shape as LiquidConfig['shape']) ?? 'circle';
    const colors = rendererTheme.category10 as string[];
    const backgroundColor = rendererTheme.view!.viewFill as string;
    const normalizedPercent = Number.isFinite(percent) ? Math.max(0, Math.min(1, percent)) : 0;

    // Calculate dynamic font size based on chart dimensions
    // Use default dimensions for font size calculation when not provided
    const inferFontSize = Math.min(width ?? DEFAULT_WIDTH, height ?? DEFAULT_HEIGHT) / 10;
    const fontSize = Math.min(Math.max(inferFontSize, 24), 64);
    const chartSize = Math.min(width ?? DEFAULT_WIDTH, height ?? DEFAULT_HEIGHT);
    const waveLength = Math.min(Math.max(chartSize * 0.4, 96), 192);
    const formattedPercent = `${Number((normalizedPercent * 100).toFixed(1))}%`;
    const liquidColor = colors[0];
    const isAcademy = baseTheme === 'academy';
    const outlineShadowColor =
      baseTheme === 'dark' ? 'rgba(0, 0, 0, 0.32)' : 'rgba(15, 23, 42, 0.10)';

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
      type: 'liquid',
      data: normalizedPercent,
      title: title ? { title, subtitle } : '',
      inset: 20,
      style: {
        contentText: formattedPercent,
        contentFontSize: fontSize,
        contentFill: rendererTheme.label!.fill,
        contentStroke: backgroundColor,
        contentStrokeOpacity: 0.92,
        contentLineWidth: baseTheme === 'dark' ? 3 : 2.5,
        contentFontFamily: CHART_FONT_FAMILY,
        contentFontWeight: 600,
        contentLetterSpacing: -0.8,
        contentFontVariantNumeric: 'tabular-nums',
        contentPaintOrder: 'stroke',
        backgroundFill: liquidColor,
        backgroundFillOpacity: baseTheme === 'dark' ? 0.14 : isAcademy ? 0.06 : 0.08,
        backgroundStroke: liquidColor,
        backgroundStrokeOpacity: baseTheme === 'dark' ? 0.3 : 0.22,
        backgroundLineWidth: 1,
        outlineBorder: isAcademy ? 1.5 : 2,
        outlineDistance: 0,
        outlineStrokeOpacity: isAcademy ? 0.9 : 0.72,
        outlineShadowColor: isAcademy ? 'transparent' : outlineShadowColor,
        outlineShadowBlur: isAcademy ? 0 : 6,
        outlineShadowOffsetY: isAcademy ? 0 : 2,
        waveLength,
        waveCount: 2,
        fillOpacity: isAcademy ? 0.9 : 0.88,
        contentPointerEvents: 'none',
        // Use palette color if provided
        ...(liquidColor ? { fill: liquidColor, outlineStroke: liquidColor } : {}),
        ...liquidStyle,
        shape: resolvedShape,
      },

      theme: rendererTheme,
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
