import { Text } from '@antv/t8';
import type { VisualizationOptions } from '../../types';

/**
 * Summary component options extending VisualizationOptions.
 */
export interface SummaryOptions extends VisualizationOptions {
  /**
   * Theme for the summary component.
   * @default 'light'
   */
  theme?: 'light' | 'dark';
}

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
 * SummaryGPTVisConfig is used for GPTVis integration.
 * Contains the type field for chart type detection.
 */
export interface SummaryGPTVisConfig {
  type: 'summary';
  syntax: string;
  theme?: 'light' | 'dark';
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
export const Summary = (options: SummaryOptions): SummaryInstance => {
  const { theme: defaultTheme = 'light' } = options;
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  let text: Text | null = null;
  let currentTheme = defaultTheme;

  /**
   * Render the summary with the given T8 syntax string.
   * @internal For GPTVis integration, can accept SummaryGPTVisConfig with theme override
   */
  const render = (syntaxOrConfig: SummaryConfig | SummaryGPTVisConfig): void => {
    let syntax: string;
    let theme: 'light' | 'dark';

    // Handle both string (direct syntax) and object (GPTVis config) formats
    if (typeof syntaxOrConfig === 'string') {
      syntax = syntaxOrConfig;
      theme = currentTheme;
    } else {
      syntax = syntaxOrConfig.syntax;
      theme = syntaxOrConfig.theme || currentTheme;
    }

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
