import type { getAnnotationDefaults } from '../theme/annotation';
import { cartesianBracket } from './bracket';
import type { Box } from './layout';
import type { AnnotationResult, RendererAnnotation } from './registry';
import type { G2AnnotationContext, LabelElement, Scene } from './runtime/g2';

/** Only automatically computed pie percentages may reuse a native percentage label. */
export const nativePercentageLabels = new WeakSet<object>();

/** Contribution explanations collect selected observations with one aggregate bracket. */
export const contributionLabels = new WeakSet<object>();

/** Ranks from one analysis annotation share a native label configuration. */
export const rankedLabels = new WeakMap<object, object>();

/** Group explanations identify their selected native colors without adding public options. */
export const groupLabels = new WeakSet<object>();

const colorSize = 10;
const colorGap = 6;

type Defaults = ReturnType<typeof getAnnotationDefaults>;

/** Shared DOM labels; renderers provide the current geometry of their own targets. */
export function bindLabels(
  container: HTMLElement,
  content: HTMLElement,
  items: {
    annotation: Pick<
      Extract<RendererAnnotation<Record<string, unknown>, 'g2'>, { type: 'highlight' }>,
      'label' | 'style'
    >;
    bounds: () => DOMRect | DOMRect[] | undefined;
  }[],
  defaults: Defaults,
) {
  const labeled = items.filter(({ annotation }) => annotation.label);
  if (!labeled.length) return () => {};
  const previous = container.getAttribute('style');
  const previousContent = content.getAttribute('style');
  const notes = document.createElement('aside');
  notes.className = 'annotation-labels';
  notes.setAttribute('aria-label', 'Annotations');
  Object.assign(notes.style, {
    display: 'grid',
    alignContent: 'start',
    justifyItems: 'start',
    gap: `${defaults.highlight.labelGap}px`,
    minWidth: '0',
    width: 'max-content',
    maxWidth: `${defaults.labels.highlight.maxWidth}px`,
  });
  const cards = labeled.map(({ annotation }) => {
    const card = document.createElement('div');
    card.textContent = annotation.label!;
    Object.assign(card.style, {
      position: 'relative',
      zIndex: '1',
      color: annotation.style?.labelFill ?? defaults.labelFill,
      fontFamily: defaults.fontFamily,
      fontSize: `${annotation.style?.labelFontSize ?? defaults.labelFontSize}px`,
      fontWeight: String(defaults.fontWeight),
      lineHeight: '1.6',
      overflowWrap: 'anywhere',
      background: defaults.highlight.labelBackground,
      border: `1px solid ${defaults.highlight.labelBorder}`,
      borderLeft: `3px solid ${annotation.style?.stroke ?? defaults.stroke}`,
      borderRadius: '6px',
      width: 'fit-content',
      maxWidth: '100%',
      boxSizing: 'border-box',
      padding: `${defaults.labels.highlight.padding[0]}px ${defaults.labels.highlight.padding[1]}px`,
    });
    notes.appendChild(card);
    return card;
  });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('annotation-leaders');
  svg.setAttribute('aria-hidden', 'true');
  Object.assign(svg.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    pointerEvents: 'none',
  });
  Object.assign(container.style, {
    position: 'relative',
    display: 'grid',
    gap: `${defaults.highlight.labelGap * 2}px`,
    alignItems: 'start',
    alignContent: 'start',
    justifyContent: 'start',
  });
  Object.assign(content.style, { minWidth: '0', width: 'fit-content', maxWidth: '100%' });
  container.append(notes, svg);
  let disposed = false;
  const draw = () => {
    if (disposed) return;
    // Measure intrinsic content before reserving room for explanations.
    container.style.gridTemplateColumns = 'minmax(0, max-content)';
    notes.style.position = '';
    notes.style.height = '';
    notes.style.width = 'max-content';
    cards.forEach((card) => Object.assign(card.style, { position: 'relative', top: '' }));
    const style = getComputedStyle(container);
    const width =
      container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    notes.style.maxWidth = `${Math.min(defaults.labels.highlight.maxWidth, width)}px`;
    const gap = defaults.highlight.labelGap * 2;
    const side =
      content.getBoundingClientRect().width + gap + notes.offsetWidth <= width || width >= 650;
    if (side) {
      container.style.gridTemplateColumns = 'minmax(0, max-content) max-content';
      notes.style.width = `${notes.offsetWidth}px`;
      notes.style.position = 'relative';
    }
    const root = container.getBoundingClientRect();
    const body = content.getBoundingClientRect();
    const targets = labeled.map((item) => {
      const bounds = item.bounds();
      return Array.isArray(bounds) ? bounds : bounds ? [bounds] : [];
    });
    if (side) {
      const placements = cards
        .map((card, index) => ({
          card,
          height: card.offsetHeight,
          y: targets[index].length
            ? targets[index].reduce((sum, box) => sum + (box.top + box.bottom) / 2, 0) /
                targets[index].length -
              body.top
            : 0,
          top: 0,
        }))
        .sort((a, b) => a.y - b.y);
      const height = Math.max(
        body.height,
        placements.reduce((sum, item) => sum + item.height, 0) +
          (cards.length - 1) * defaults.highlight.labelGap,
      );
      let bottom = 0;
      for (const item of placements) {
        item.top = Math.max(bottom, item.y - item.height / 2);
        bottom = item.top + item.height + defaults.highlight.labelGap;
      }
      bottom = height;
      for (const item of placements.reverse()) {
        item.top = Math.min(item.top, bottom - item.height);
        bottom = item.top - defaults.highlight.labelGap;
        Object.assign(item.card.style, { position: 'absolute', top: `${item.top}px` });
      }
      notes.style.height = `${height}px`;
    }
    svg.textContent = '';
    for (const [index, bounds] of targets.entries()) {
      if (contributionLabels.has(labeled[index].annotation)) {
        const points = bounds
          .filter((box) => box.width && box.height)
          .flatMap((box) => [
            [Math.min(box.right, body.right) - root.left, box.top - root.top] as [number, number],
            [Math.min(box.right, body.right) - root.left, box.bottom - root.top] as [
              number,
              number,
            ],
          ]);
        const bracket = cartesianBracket(points, [], 'right', index);
        if (!bracket) continue;
        const card = cards[index].getBoundingClientRect();
        const endX = (side ? card.left : card.right) - root.left;
        const endY = card.top + card.height / 2 - root.top;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const outline = bracket.paths
          .map((points) => points.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' '))
          .join(' ');
        const leader = side
          ? `H${endX} V${endY}`
          : `H${Math.max(bracket.anchor[0] + 8, body.right - root.left + gap / 2)} V${endY} H${endX}`;
        path.setAttribute('d', `${outline} M${bracket.anchor.join(',')} ${leader}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', labeled[index].annotation.style?.stroke ?? defaults.stroke);
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
        continue;
      }
      for (const target of bounds) {
        const card = cards[index].getBoundingClientRect();
        if (!target || !target.width || !target.height) continue;
        const x = Math.max(body.left, Math.min(target.right, body.right)) - root.left;
        const y = (target.top + target.bottom) / 2 - root.top;
        const endX = (side ? card.left : card.right) - root.left;
        const endY = card.top + card.height / 2 - root.top;
        const lane = side ? (body.right - root.left + endX) / 2 : body.right - root.left + gap / 2;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M${x},${y} H${lane} V${endY} H${endX}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', labeled[index].annotation.style?.stroke ?? defaults.stroke);
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
      }
    }
  };
  let frame: number | undefined;
  const scheduleDraw = () => {
    if (disposed || frame !== undefined) return;
    frame = requestAnimationFrame(() => {
      frame = undefined;
      draw();
    });
  };
  const resize = new ResizeObserver(scheduleDraw);
  resize.observe(container);
  resize.observe(content);
  content.addEventListener('scroll', scheduleDraw, true);
  document.fonts.ready.then(scheduleDraw);
  document.fonts.addEventListener('loadingdone', scheduleDraw);
  draw();
  return () => {
    disposed = true;
    if (frame !== undefined) cancelAnimationFrame(frame);
    resize.disconnect();
    content.removeEventListener('scroll', scheduleDraw, true);
    document.fonts.removeEventListener('loadingdone', scheduleDraw);
    notes.remove();
    svg.remove();
    if (previous === null) container.removeAttribute('style');
    else container.setAttribute('style', previous);
    if (previousContent === null) content.removeAttribute('style');
    else content.setAttribute('style', previousContent);
  };
}

/** Reserve space inside the measured card, so color keys participate in label avoidance. */
export function getLabelColorWidth(colors: string[]) {
  return colors.length * (colorSize + colorGap);
}

/** Native canvas color keys stay inside their label and share its movement and cleanup. */
export function drawLabelColors(
  label: Pick<LabelElement, 'appendChild'>,
  scene: Scene,
  colors: string[],
  box: Box,
  padding: number,
) {
  const keys = scene.createElement('g', {
    className: 'annotation-label-colors',
    style: { pointerEvents: 'none' },
  });
  label.appendChild(keys);
  colors.forEach((fill, index) =>
    keys.appendChild(
      scene.createElement('rect', {
        className: 'annotation-label-color',
        style: {
          x: box.x + padding + index * (colorSize + colorGap),
          y: box.y + (box.height - colorSize) / 2,
          width: colorSize,
          height: colorSize,
          radius: 2,
          fill,
          stroke: 'none',
          pointerEvents: 'none',
        },
      }),
    ),
  );
}

/** Decide after native overlap hiding, so a hidden percentage never suppresses the fallback. */
export function bindPieLabels<T extends object>(
  selections: {
    annotation: Extract<RendererAnnotation<T, 'g2'>, { type: 'highlight' }>;
    rows: T[];
  }[],
  context: G2AnnotationContext<T>,
): AnnotationResult {
  bindRankLabels(selections, context);
  const automatic = selections.filter(({ annotation }) => nativePercentageLabels.has(annotation));
  if (!automatic.length) return {};
  return {
    update: () => {
      const labels = context.getScene().querySelectorAll('.label') as LabelElement[];
      for (const { annotation, rows } of automatic) {
        const native = labels.find((label) => {
          const element = label.__data__?.dependentElement;
          return (
            label.getAttribute('annotationNativePercentage') &&
            element &&
            rows.includes(element.__data__.data as T) &&
            label.style.visibility !== 'hidden' &&
            Number(label.style.opacity ?? 1) > 0 &&
            label
              .querySelectorAll('text')
              .some(
                (text) =>
                  text.style.visibility !== 'hidden' &&
                  Number(text.style.opacity ?? 1) > 0 &&
                  Number(text.style.fillOpacity ?? 1) > 0,
              )
          );
        });
        for (const label of labels) {
          const element = label.__data__?.dependentElement;
          if (element?.getAttribute('annotationSelection') !== annotation) continue;
          const visibility = native ? 'hidden' : 'visible';
          // G2 applies text, background and connector styles separately when labels redraw.
          label.attr({
            visibility,
            backgroundVisibility: visibility,
            connectorVisibility: visibility,
          });
        }
      }
    },
  };
}

/** Ranks from one analysis annotation share its native label configuration. */
function bindRankLabels<T extends object>(
  selections: {
    annotation: Extract<RendererAnnotation<T, 'g2'>, { type: 'highlight' }>;
    rows: T[];
  }[],
  context: G2AnnotationContext<T>,
) {
  const groups = new Map<
    object,
    {
      annotation: Extract<RendererAnnotation<T, 'g2'>, { type: 'highlight' }>;
      text: Map<T, string>;
    }
  >();
  for (const { annotation, rows } of selections) {
    const source = rankedLabels.get(annotation);
    if (!source || !annotation.label) continue;
    let group = groups.get(source);
    if (!group) {
      group = { annotation, text: new Map() };
      groups.set(source, group);
    }
    for (const row of rows) group.text.set(row, annotation.label);
  }
  if (!groups.size) return;
  const mark = context.sourceMarks[0];
  mark.labels = [
    ...(mark.labels ?? []),
    ...[...groups.values()].map(({ annotation, text }) => ({
      ...context.getTextStyle(annotation),
      text: (row: T) => text.get(row) ?? '',
      position: 'inside',
      annotationLabel: 'highlight',
      annotationInside: true,
      background: false,
      connector: false,
      transform: [
        { type: () => removeEmptyLabels },
        ...(annotation.style?.labelFill === undefined ? [{ type: 'contrastReverse' }] : []),
      ],
    })),
  ];
}

// Native interval labels do not support selectors; remove empty candidates before layout.
function removeEmptyLabels(labels: LabelElement[]) {
  return labels.filter((label) => {
    if (label.getAttribute('text')) return true;
    label.destroy();
    return false;
  });
}
