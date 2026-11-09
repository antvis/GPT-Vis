import type { getAnnotationDefaults } from '../theme/annotation';
import type { HighlightAnnotation } from '../types/annotation';
import { bindLabels } from './label';
import { validateHighlight } from './shared';

/** Select rows by raw data fields, columns by field, and cells by their intersection. */
export function bindAnnotations(
  container: HTMLElement,
  content: HTMLElement,
  data: Record<string, unknown>[],
  annotations: HighlightAnnotation<Record<string, unknown>>[] | undefined,
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  if (!annotations?.length) return () => {};
  const fields = Object.keys(data[0] ?? {});
  const rows = [...content.querySelectorAll('tbody tr')];
  const headers = [...content.querySelectorAll('th')];
  const selections = annotations.map((annotation) => {
    validateHighlight(annotation);
    const { field } = annotation;
    if (field !== undefined && !fields.includes(field))
      throw new Error(`Invalid annotation: unknown table field ${field}.`);
    const selectors =
      annotation.data === undefined
        ? undefined
        : Array.isArray(annotation.data)
          ? annotation.data
          : [annotation.data];
    if (!selectors?.length && field === undefined)
      throw new Error('Invalid annotation: table highlight needs data or a field.');
    if (
      selectors &&
      (!selectors.length ||
        selectors.some(
          (s) =>
            !s ||
            typeof s !== 'object' ||
            !Object.keys(s).length ||
            Object.keys(s).some((key) => !fields.includes(key)),
        ))
    )
      throw new Error('Invalid annotation: table data selectors need existing fields.');
    if (
      selectors?.some(
        (selector) =>
          !data.some((row) => Object.entries(selector).every(([key, value]) => row[key] === value)),
      )
    )
      throw new Error('Invalid annotation: table highlight matches no rows.');
    const indices = selectors
      ? data.flatMap((row, index) =>
          selectors.some((s) => Object.entries(s).every(([key, value]) => row[key] === value))
            ? [index]
            : [],
        )
      : data.map((_, index) => index);
    const column = field === undefined ? undefined : fields.indexOf(field);
    const cells = indices.flatMap((index) =>
      column === undefined ? [...rows[index].children] : [rows[index].children[column]],
    ) as HTMLElement[];
    if (column !== undefined && !selectors) cells.unshift(headers[column] as HTMLElement);
    return { annotation, cells };
  });
  const selected = new Set(selections.flatMap(({ cells }) => cells));
  const all = [...content.querySelectorAll<HTMLElement>('th, td')];
  const previous = all.map((cell) => cell.getAttribute('style'));
  const dim = Math.min(
    ...selections.map(({ annotation }) => annotation.dimOpacity ?? defaults.highlight.dimOpacity),
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
