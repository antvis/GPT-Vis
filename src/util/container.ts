/**
 * Resolve a container parameter to an HTMLElement.
 * Supports CSS selectors (e.g., '#container', '.my-chart') and direct HTMLElement references.
 */
export function resolveContainer(container: string | HTMLElement): HTMLElement {
  if (typeof container === 'string') {
    if (typeof document === 'undefined') {
      // In a non-browser (SSR) environment, a string container cannot be resolved to a real HTMLElement.
      // Throwing an error here prevents a ReferenceError from document.querySelector
      // and clearly indicates that DOM resolution is not possible in this environment.
      throw new Error(
        `Container element "${container}" cannot be resolved in a non-browser environment.`,
      );
    }
    const el = document.querySelector<HTMLElement>(container);
    if (!el) {
      throw new Error(`Container element "${container}" not found`);
    }
    return el;
  }
  return container;
}
