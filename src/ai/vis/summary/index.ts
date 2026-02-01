import { Text } from '@antv/t8';
import type { VisualizationOptions } from '../../types';

/**
 * SummaryConfig is a T8 Syntax string for narrative text visualization.
 * Supports markdown-like syntax with special annotations for metrics.
 * @example
 * ```
 * # Sales Report
 * Total sales reached [¥1,234,567](metric_value, origin=1234567).
 * ```
 */
export type SummaryConfig = string;

/**
 * SummaryGPTVisConfig is the config type for Summary when used in GPTVis.
 * Extends SummaryConfig to include the type field for chart type identification.
 */
export interface SummaryGPTVisConfig {
  type: 'summary';
  data: SummaryConfig;
}

/**
 * SummaryInstance represents a summary instance with render and destroy methods.
 */
export interface SummaryInstance {
  render: (syntax: SummaryConfig) => void;
  destroy: () => void;
}

/**
 * Summary component using @antv/t8 for narrative text visualization.
 *
 * This component provides a way to render data summaries with rich text formatting
 * and inline data visualization using T8 syntax (markdown-like syntax).
 *
 * @example
 * ```ts
 * const summary = Summary({
 *   container: '#container',
 *   theme: 'light',
 * });
 *
 * summary.render(`
 *   # Sales Report
 *   Total sales reached [¥1,234,567](metric_value, origin=1234567).
 *   This represents a [15%](delta_value, status=increase) increase compared to last quarter.
 * `);
 *
 * summary.destroy();
 * ```
 */
export const Summary = (options: VisualizationOptions): SummaryInstance => {
  // T8 only supports 'light' and 'dark', so map 'academy' to 'light'
  const themeOption = options.theme || 'light';
  const theme = themeOption === 'academy' ? 'light' : themeOption;
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  let text: Text | null = null;

  /**
   * Render the summary with the given T8 syntax string.
   */
  const render = (syntax: SummaryConfig): void => {
    // Clean up previous instance if exists
    if (text) {
      text.unmount();
    }

    // Create T8 Text instance
    text = new Text(container as HTMLElement);

    // Set theme and render syntax
    text.theme(theme);
    text.render(syntax);
  };

  /**
   * Destroy the summary instance and clean up resources.
   */
  const destroy = (): void => {
    if (text) {
      text.unmount();
      text = null;
    }
  };

  return {
    render,
    destroy,
  };
};
