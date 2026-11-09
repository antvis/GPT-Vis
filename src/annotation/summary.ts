import type { getAnnotationDefaults } from '../theme/annotation';
import type { SummaryAnnotation } from '../types/annotation';
import { bindLabels } from './label';
import { validateHighlight } from './shared';

/** Match visible text across T8 inline phrases without replacing their styles or events. */
export function bindAnnotations(
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
    validateHighlight(annotation);
    if (annotation.field !== undefined)
      throw new Error('Invalid annotation: summary uses text, not a table field.');
    const data = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
    if (!data.length) throw new Error('Invalid annotation: summary highlight needs text.');
    const intervals = data.map((selector) => {
      if (
        !selector ||
        Object.keys(selector).some((key) => key !== 'text') ||
        typeof selector.text !== 'string' ||
        !selector.text.length
      )
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
    ...selections.map(({ annotation }) => annotation.dimOpacity ?? defaults.highlight.dimOpacity),
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
