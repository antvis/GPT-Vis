/**
 * Resolve a container parameter to an HTMLElement.
 * Supports CSS selectors (e.g., '#container', '.my-chart') and direct HTMLElement references.
 */
export function resolveContainer(container: string | HTMLElement): HTMLElement {
  if (typeof container === 'string') {
    const el = document.querySelector<HTMLElement>(container);
    if (!el) {
      throw new Error(`Container element "${container}" not found`);
    }
    return el;
  }
  return container;
}
