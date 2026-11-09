import type { getAnnotationDefaults } from '../theme/annotation';
import type { HighlightAnnotation } from '../types/annotation';

type Defaults = ReturnType<typeof getAnnotationDefaults>;

/** Shared DOM labels; renderers provide the current geometry of their own targets. */
export function bindLabels(
  container: HTMLElement,
  content: HTMLElement,
  items: {
    annotation: Pick<
      HighlightAnnotation<Record<string, unknown>>,
      'label' | 'labelFill' | 'labelFontSize'
    >;
    bounds: () => DOMRect | undefined;
  }[],
  defaults: Defaults,
) {
  const labeled = items.filter(({ annotation }) => annotation.label !== undefined);
  if (!labeled.length) return () => {};
  const previous = container.getAttribute('style');
  const notes = document.createElement('aside');
  notes.className = 'annotation-labels';
  notes.setAttribute('aria-label', 'Annotations');
  Object.assign(notes.style, {
    display: 'grid',
    alignContent: 'start',
    gap: `${defaults.highlight.labelGap}px`,
    minWidth: '0',
  });
  const cards = labeled.map(({ annotation }) => {
    const card = document.createElement('div');
    card.textContent = annotation.label!;
    Object.assign(card.style, {
      position: 'relative',
      zIndex: '1',
      color: annotation.labelFill ?? defaults.labelFill,
      fontFamily: defaults.fontFamily,
      fontSize: `${annotation.labelFontSize ?? defaults.labelFontSize}px`,
      fontWeight: String(defaults.fontWeight),
      lineHeight: '1.6',
      overflowWrap: 'anywhere',
      background: defaults.highlight.labelBackground,
      border: `1px solid ${defaults.highlight.labelBorder}`,
      borderLeft: `3px solid ${defaults.stroke}`,
      borderRadius: '6px',
      padding: `${defaults.highlight.labelPadding}px`,
    });
    notes.appendChild(card);
    return card;
  });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('annotation-leaders');
  svg.setAttribute('aria-hidden', 'true');
  Object.assign(svg.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    pointerEvents: 'none',
  });
  Object.assign(container.style, {
    position: 'relative',
    display: 'grid',
    gap: `${defaults.highlight.labelGap * 2}px`,
  });
  content.style.minWidth = '0';
  container.append(notes, svg);
  let disposed = false;
  const draw = () => {
    if (disposed) return;
    const side = container.clientWidth >= 650;
    const columns = side ? `minmax(0, 1fr) ${defaults.highlight.labelWidth}px` : 'minmax(0, 1fr)';
    if (container.style.gridTemplateColumns !== columns)
      container.style.gridTemplateColumns = columns;
    const root = container.getBoundingClientRect();
    const body = content.getBoundingClientRect();
    svg.replaceChildren();
    for (const [index, item] of labeled.entries()) {
      const target = item.bounds();
      const card = cards[index].getBoundingClientRect();
      if (!target || !target.width || !target.height) continue;
      const x = Math.max(body.left, Math.min(target.right, body.right)) - root.left;
      const y = target.bottom - root.top + 2;
      const endX = (side ? card.left : card.right) - root.left;
      const endY = card.top + card.height / 2 - root.top;
      const lane = body.right - root.left + 8 + (index % 2) * 4;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x},${y} H${lane} V${endY} H${endX}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', defaults.stroke);
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(path);
    }
  };
  const resize = new ResizeObserver(draw);
  resize.observe(container);
  resize.observe(content);
  content.addEventListener('scroll', draw, true);
  document.fonts.ready.then(draw);
  document.fonts.addEventListener('loadingdone', draw);
  draw();
  queueMicrotask(draw);
  return () => {
    disposed = true;
    resize.disconnect();
    content.removeEventListener('scroll', draw, true);
    document.fonts.removeEventListener('loadingdone', draw);
    notes.remove();
    svg.remove();
    if (previous === null) container.removeAttribute('style');
    else container.setAttribute('style', previous);
  };
}
