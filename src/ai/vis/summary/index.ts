import { Text } from '@antv/t8';
import type { VisualizationOptions } from '../../types';

/**
 * SummaryConfig defines the configuration for rendering the summary.
 */
export interface SummaryConfig {
  type?: 'summary';
  /**
   * T8 Syntax string for narrative text visualization.
   * Supports markdown-like syntax with special annotations for metrics.
   * @example
   * ```
   * # Sales Report
   * Total sales reached [¥1,234,567](metric_value, origin=1234567).
   * ```
   */
  syntax: string;
  /**
   * Theme for the summary component.
   * @default 'light'
   */
  theme?: 'light' | 'dark';
}

/**
 * SummaryInstance represents a summary instance with render and destroy methods.
 */
export interface SummaryInstance {
  render: (config: SummaryConfig) => void;
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
 *   width: 600,
 *   height: 400,
 * });
 *
 * summary.render({
 *   type: 'summary',
 *   syntax: `
 *     # Sales Report
 *     Total sales reached [¥1,234,567](metric_value, origin=1234567).
 *     This represents a [15%](delta_value, status=increase) increase compared to last quarter.
 *   `,
 *   theme: 'light',
 * });
 *
 * summary.destroy();
 * ```
 */
export const Summary = (options: VisualizationOptions): SummaryInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  let text: Text | null = null;

  /**
   * Render the summary with the given configuration.
   */
  const render = (config: SummaryConfig): void => {
    const { syntax = '', theme = 'light' } = config;

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
