import { Text } from '@antv/t8';
import { bindSummaryAnnotations } from '../../annotation';
import { getAnnotationDefaults } from '../../theme/annotation';
import { getThemeObject } from '../../theme/summary';
import type { VisualizationOptions } from '../../types';
import type { SummaryAnnotation } from '../../types/annotation';

/**
 * T8 syntax, or an object pairing syntax with text highlight annotations.
 * Supports markdown-like syntax with special annotations for metrics.
 * @example
 * ```
 * # Sales Report
 * Total sales reached [¥1,234,567](metric_value, origin=1234567).
 * ```
 */
export type SummaryConfig =
  | string
  | {
      type?: 'summary';
      text: string;
      annotations?: SummaryAnnotation[];
    };

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
  const appearance = getThemeObject('summary', options.theme);
  const { theme } = appearance;
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
  let cleanupAnnotations: (() => void) | undefined;

  /**
   * Render T8 syntax, optionally paired with highlight annotations.
   * Supports an optional `theme <value>` line in the syntax to override the theme.
   */
  const render = (config: SummaryConfig): void => {
    const { text: syntax, annotations } =
      typeof config === 'string' ? { text: config, annotations: undefined } : config;

    // Extract optional `theme <value>` line from syntax
    let activeTheme = theme;
    const cleanedSyntax = syntax.replace(/^theme\s+(light|dark)\s*$/im, (_, t) => {
      activeTheme = t as 'light' | 'dark';
      return '';
    });

    cleanupAnnotations?.();
    cleanupAnnotations = undefined;
    text?.unmount();
    const content = document.createElement('div');
    wrapper.textContent = '';
    wrapper.appendChild(content);
    text = new Text(content);

    // Set background color and padding on the wrapper
    wrapper.style.backgroundColor = appearance.backgrounds[activeTheme];
    wrapper.style.padding = '16px';

    // Set theme and render syntax
    text.theme(activeTheme, appearance.summary);
    text.render(cleanedSyntax.trim());
    cleanupAnnotations = bindSummaryAnnotations({
      container: wrapper,
      content,
      annotations,
      defaults: getAnnotationDefaults(
        'summary',
        activeTheme === theme ? options.theme : activeTheme,
      ),
    });
  };

  /**
   * Destroy the summary instance and clean up resources.
   */
  const destroy = (): void => {
    cleanupAnnotations?.();
    cleanupAnnotations = undefined;
    if (text) {
      text.unmount();
      text = null;
    }
    wrapper.remove();
  };

  return {
    render,
    destroy,
  };
};
