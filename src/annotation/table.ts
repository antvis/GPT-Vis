import type { getAnnotationDefaults } from '../theme/annotation';
import type { TableAnnotation } from '../types/annotation';
import { bindLabels } from './label';
import { validateHighlight } from './shared';

/** Each data target selects rows, a column or their intersection; targets select their union. */
export function bindAnnotations(
  container: HTMLElement,
  content: HTMLElement,
  data: Record<string, unknown>[],
  annotations: TableAnnotation<Record<string, unknown>>[] | undefined,
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  if (!annotations?.length) return () => {};
  const fields = Object.keys(data[0] ?? {});
  const rows = [...content.querySelectorAll('tbody tr')];
  const headers = [...content.querySelectorAll('th')];
  const selections = annotations.map((annotation) => {
    validateHighlight(annotation);
    const targets = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
    if (!targets.length) throw new Error('Invalid annotation: table highlight needs target data.');
    const selected = new Set<HTMLElement>();
    for (const target of targets) {
      if (!target || typeof target !== 'object' || Array.isArray(target))
        throw new Error('Invalid annotation: table target must contain row or column.');
      const { row: selector, column: field } = target;
      if (Object.keys(target).some((key) => key !== 'row' && key !== 'column'))
        throw new Error('Invalid annotation: table target only accepts row and column.');
      if (selector === undefined && field === undefined)
        throw new Error('Invalid annotation: table target must contain row or column.');
      const column = field === undefined ? undefined : fields.indexOf(field);
      if (column === -1) throw new Error(`Invalid annotation: unknown table column ${field}.`);
      let indices: number[];
      if (selector === undefined) {
        indices = data.map((_, index) => index);
        selected.add(headers[column!] as HTMLElement);
      } else {
        if (!selector || typeof selector !== 'object' || Array.isArray(selector))
          throw new Error('Invalid annotation: table row must be an original-field selector.');
        const entries = Object.entries(selector);
        if (!entries.length) throw new Error('Invalid annotation: table row must not be empty.');
        if (entries.some(([key]) => !fields.includes(key)))
          throw new Error('Invalid annotation: table row contains an unknown field.');
        indices = data.flatMap((row, index) =>
          entries.every(([key, value]) => row[key] === value) ? [index] : [],
        );
        if (!indices.length)
          throw new Error('Invalid annotation: table highlight matches no rows.');
      }
      for (const index of indices) {
        const cells =
          column === undefined ? [...rows[index].children] : [rows[index].children[column]];
        for (const cell of cells) selected.add(cell as HTMLElement);
      }
    }
    const cells = [...selected];
    return { annotation, cells };
  });
  const selected = new Set(selections.flatMap(({ cells }) => cells));
  const all = [...content.querySelectorAll<HTMLElement>('th, td')];
  const previous = all.map((cell) => cell.getAttribute('style'));
  const dim = Math.min(
    ...selections.map(
      ({ annotation }) => annotation.style?.dimOpacity ?? defaults.highlight.dimOpacity,
    ),
  );
  for (const cell of all) {
    if (selected.has(cell)) {
      cell.style.background = `color-mix(in srgb, ${defaults.stroke} ${defaults.highlight.fillOpacity * 100}%, ${defaults.highlight.background})`;
      cell.style.boxShadow = `inset 0 -2px ${defaults.stroke}`;
    } else cell.style.opacity = String(dim);
  }
  const cleanupLabels = bindLabels(
    container,
    content,
    selections.map(({ annotation, cells }) => ({
      annotation,
      bounds: () => {
        const clip = content.getBoundingClientRect();
        return cells
          .map((cell) => cell.getBoundingClientRect())
          .filter(
            (box) =>
              box.right > clip.left &&
              box.left < clip.right &&
              box.bottom > clip.top &&
              box.top < clip.bottom,
          )
          .at(-1);
      },
    })),
    defaults,
  );
  return () => {
    cleanupLabels();
    all.forEach((cell, index) => {
      if (previous[index] === null) cell.removeAttribute('style');
      else cell.setAttribute('style', previous[index]!);
    });
  };
}
