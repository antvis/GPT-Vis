import type { getAnnotationDefaults } from '../../theme/annotation';
import type { SummaryAnnotation, TableAnnotation } from '../../types/annotation';
import type { AnnotationComponent } from '../registry';
import { bindLabels } from '../shared/dom-label';

/** Highlight batches share selection and dimming so overlapping targets form a union. */
export const highlight: AnnotationComponent<'highlight', 'table' | 'summary'> = {
  table: (annotations, context) => ({
    cleanup: bindTableHighlights(
      context.container,
      context.content,
      context.data,
      annotations,
      context.defaults,
    ),
  }),
  summary: (annotations, context) => ({
    cleanup: bindSummaryHighlights(
      context.container,
      context.content,
      annotations,
      context.defaults,
    ),
  }),
};

/** Each data target selects rows, a column or their intersection; targets select their union. */
function bindTableHighlights<T extends object>(
  container: HTMLElement,
  content: HTMLElement,
  data: T[],
  annotations: TableAnnotation<T>[] | undefined,
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  if (!annotations?.length) return () => {};
  const fields = Object.keys(data[0] ?? {});
  const rows = [...content.querySelectorAll('tbody tr')];
  const headers = [...content.querySelectorAll('th')];
  const selections = annotations.map((annotation) => {
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
          entries.every(([key, value]) => row[key as keyof T] === value) ? [index] : [],
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

/** Match visible text across T8 inline phrases without replacing their styles or events. */
function bindSummaryHighlights(
  container: HTMLElement,
  content: HTMLElement,
  annotations: SummaryAnnotation[] | undefined,
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  if (!annotations?.length) return () => {};
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
  const nodes: { node: Text; start: number }[] = [];
  let text = '';
  let lastBlock: Element | null = null;
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const block = node.parentElement?.closest('p, h1, h2, h3, h4, h5, h6, li') ?? null;
    if (lastBlock && block !== lastBlock) text += '\n';
    nodes.push({ node, start: text.length });
    text += node.data;
    lastBlock = block;
  }
  const selections = annotations.map((annotation) => {
    const data = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
    if (!data.length) throw new Error('Invalid annotation: summary highlight needs text.');
    const intervals = data.map((selector) => {
      if (!selector.text)
        throw new Error('Invalid annotation: summary highlight needs a nonempty text string.');
      const start = text.indexOf(selector.text);
      if (start < 0) throw new Error(`Invalid annotation: text not found: ${selector.text}.`);
      if (text.indexOf(selector.text, start + 1) !== -1)
        throw new Error(`Invalid annotation: text is ambiguous: ${selector.text}.`);
      return { start, end: start + selector.text.length };
    });
    return { annotation, intervals, marks: [] as HTMLElement[] };
  });
  const dim = Math.min(
    ...selections.map(
      ({ annotation }) => annotation.style?.dimOpacity ?? defaults.highlight.dimOpacity,
    ),
  );
  const spans: HTMLElement[] = [];
  for (const { node, start } of nodes) {
    const end = start + node.length;
    const boundaries = new Set([start, end]);
    for (const { intervals } of selections)
      for (const interval of intervals) {
        if (interval.start > start && interval.start < end) boundaries.add(interval.start);
        if (interval.end > start && interval.end < end) boundaries.add(interval.end);
      }
    const offsets = [...boundaries].sort((a, b) => a - b);
    const fragment = document.createDocumentFragment();
    for (let i = 1; i < offsets.length; i++) {
      const a = offsets[i - 1],
        b = offsets[i];
      const matches = selections.filter(({ intervals }) =>
        intervals.some((r) => r.start <= a && r.end >= b),
      );
      if (!matches.length && dim === 1) {
        fragment.appendChild(document.createTextNode(node.data.slice(a - start, b - start)));
        continue;
      }
      const span = document.createElement(matches.length ? 'mark' : 'span');
      span.textContent = node.data.slice(a - start, b - start);
      if (matches.length) {
        span.className = 'annotation-highlight';
        Object.assign(span.style, {
          background: `color-mix(in srgb, ${defaults.stroke} ${defaults.highlight.fillOpacity * 100}%, transparent)`,
          borderBottom: `2px solid ${defaults.stroke}`,
          color: 'inherit',
          padding: '2px 0',
        });
        for (const match of matches) match.marks.push(span);
      } else span.style.opacity = String(dim);
      spans.push(span);
      fragment.appendChild(span);
    }
    node.replaceWith(fragment);
  }
  const cleanupLabels = bindLabels(
    container,
    content,
    selections.map(({ annotation, marks }) => ({
      annotation,
      bounds: () => [...(marks.at(-1)?.getClientRects() ?? [])].at(-1),
    })),
    defaults,
  );
  return () => {
    cleanupLabels();
    for (const span of spans) span.replaceWith(...span.childNodes);
    content.normalize();
  };
}
