import { Text } from '@antv/t8';
import type { VisualizationOptions } from '../../types';
import { getBackgroundColor } from '../../util/theme';

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
  // T8 only supports 'light' and 'dark', so map 'academy'/'default' to 'light'
  let { theme = 'light' } = options;
  if (theme === 'academy' || theme === 'default') theme = 'light';
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  // Create a wrapper element for padding and theme background
  const wrapper = document.createElement('div');
  wrapper.className = 'gpt-vis-summary';
  (container as HTMLElement).appendChild(wrapper);

  let text: Text | null = null;

  /**
   * Render the summary with the given T8 syntax string.
   * Supports an optional `theme <value>` line in the syntax to override the theme.
   */
  const render = (syntax: SummaryConfig): void => {
    // Clean up previous instance if exists
    if (text) {
      text.unmount();
    }

    // Extract optional `theme <value>` line from syntax
    let activeTheme = theme;
    const cleanedSyntax = syntax.replace(/^theme\s+(light|dark)\s*$/im, (_, t) => {
      activeTheme = t as 'light' | 'dark';
      return '';
    });

    // Create T8 Text instance
    text = new Text(wrapper);

    // Set background color and padding on the wrapper
    wrapper.style.backgroundColor = activeTheme === 'dark' ? getBackgroundColor('dark') : '';
    wrapper.style.padding = '16px';

    // Set theme and render syntax
    text.theme(activeTheme);
    text.render(cleanedSyntax.trim());
  };

  /**
   * Destroy the summary instance and clean up resources.
   */
  const destroy = (): void => {
    if (text) {
      text.unmount();
      text = null;
    }
    if (wrapper.parentNode) {
      wrapper.parentNode.removeChild(wrapper);
    }
  };

  return {
    render,
    destroy,
  };
};
