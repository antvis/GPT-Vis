import type { getAnnotationDefaults } from '../../theme/annotation';
import type { Annotation } from '../../types/annotation';
import {
  bindLabels,
  bindPieLabels,
  getLabelColorWidth,
  groupLabels,
  labelConnectors,
  rankedLabels,
} from '../label';
import type { Point } from '../layout';
import { mergeResults } from '../merge';
import type {
  AnnotationComponent,
  AnnotationDraw,
  AnnotationResult,
  RendererAnnotation,
} from '../registry';
import type { G2AnnotationContext, MarkOptions } from '../runtime/g2';
import { getDimOpacity } from '../utils';
import type { ConnectorShape } from './connector';
import { point } from './point';

/** Highlight batches share selection and dimming so overlapping targets form a union. */
export const highlight: AnnotationComponent<'highlight'> & {
  create: typeof createHighlight;
} = {
  create: createHighlight,
  g2: (annotations, context) => [drawG2, ...createSeriesMarkers(annotations, context)],
  g6: () => drawG6,
  table: () => drawTable,
  summary: () => drawSummary,
};

// Computed targets retain observation identity; user selectors still match by field values.
const computedHighlights = new WeakSet<object>();

type HighlightConfig<T extends object> = Omit<
  Extract<Annotation, { type: 'highlight' }>,
  'data'
> & {
  data: T | T[];
};

/** Create configurations for later merging and drawing; empty selections are a no-op. */
function createHighlight<T extends object>(
  options: Omit<HighlightConfig<T>, 'type'>,
  computed = true,
): HighlightConfig<T>[] {
  if (Array.isArray(options.data) && !options.data.length) return [];
  const annotation = {
    type: 'highlight' as const,
    data: options.data,
    label: options.label,
    style: options.style,
  };
  if (computed) computedHighlights.add(annotation);
  return [annotation];
}

const drawG2: AnnotationDraw<'highlight', 'g2'> = (annotations, context) => {
  const selections = selectHighlights(context.mapping.data, annotations);
  let labelSelections = selections;
  const results: AnnotationResult[] = [];
  switch (context.chartType) {
    case 'line':
    case 'area':
      if (selections.length) applySeriesHighlights(selections, context);
      break;
    case 'bar':
    case 'column':
      if (selections.length)
        applyNativeHighlights(context.sourceMarks, selections, context, 'interval');
      break;
    case 'scatter':
      if (selections.length)
        applyNativeHighlights(context.sourceMarks, selections, context, 'point');
      break;
    case 'pie':
      if (selections.length)
        applyNativeHighlights(context.sourceMarks, selections, context, 'interval');
      results.push(bindPieLabels(selections, context));
      labelSelections = selections.filter(({ annotation }) => !rankedLabels.has(annotation));
      break;
    default:
      throw new Error(`Unsupported ${context.chartType} highlight.`);
  }
  results.push({ marks: createHighlightLabels(labelSelections, context) });
  return mergeResults(results);
};

const drawG6: AnnotationDraw<'highlight', 'g6'> = (annotations, context) => {
  // The G6 runtime applies native appearance before render; place explanations after layout.
  for (const { annotation, rows } of selectHighlights(context.data, annotations)) {
    if (!annotation.label) continue;
    const positions = rows.flatMap((row) => {
      const point = context.position(row);
      return point ? [point] : [];
    });
    const anchor: Point | undefined = positions.length
      ? [
          positions.reduce((sum, point) => sum + point[0], 0) / positions.length,
          positions.reduce((sum, point) => sum + point[1], 0) / positions.length,
        ]
      : undefined;
    if (anchor) context.label(annotation, anchor);
  }
  return {};
};

const drawTable: AnnotationDraw<'highlight', 'table'> = (annotations, context) => ({
  cleanup: bindTableHighlights(
    context.container,
    context.content,
    context.data,
    annotations,
    context.defaults,
  ),
});

const drawSummary: AnnotationDraw<'highlight', 'summary'> = (annotations, context) => ({
  cleanup: bindSummaryHighlights(context.container, context.content, annotations, context.defaults),
});

type Selection<T extends object> = ReturnType<typeof selectHighlights<T>>[number];

/** Preserve native paint and borders unless an annotation explicitly overrides them. */
function applyNativeHighlights<T extends object>(
  marks: MarkOptions[],
  selections: Selection<T>[],
  context: G2AnnotationContext<T>,
  outline: 'none' | 'series' | 'point' | 'interval',
) {
  const { defaults } = context;
  const annotations = selections.map(({ annotation }) => annotation);
  const pie = context.chartType === 'pie';
  const dim = getDimOpacity(
    annotations,
    pie
      ? defaults.highlight.pieDimOpacity
      : annotations.some((annotation) => labelConnectors.has(annotation))
        ? defaults.highlight.contributionDimOpacity
        : defaults.highlight.dimOpacity,
  );
  for (const mark of marks) {
    const style = { ...mark.style };
    const original = (key: string, fallback: unknown, args: unknown[]) =>
      typeof style[key] === 'function' ? style[key](...args) : (style[key] ?? fallback);
    const selectedAnnotations = (datum: object | object[]) => {
      const rows = Array.isArray(datum) ? datum : [datum];
      return selections.filter((selection) => rows.every(selection.matches));
    };
    mark.style = {
      ...style,
      opacity: (...args: [object | object[], ...unknown[]]) => {
        const rows = Array.isArray(args[0]) ? args[0] : [args[0]];
        return (
          Number(original('opacity', 1, args)) *
          (rows.some((row) => selections.some((selection) => selection.matches(row))) ? 1 : dim)
        );
      },
    };
    // Closed areas retain their own fill and border; the companion line owns the contour.
    if (outline !== 'none')
      for (const key of ['stroke', 'lineWidth'] as const) {
        if (!annotations.some((annotation) => annotation.style?.[key] !== undefined)) continue;
        mark.style[key] = (...args: [object | object[], ...unknown[]]) =>
          selectedAnnotations(args[0])
            .map(({ annotation }) => annotation.style?.[key])
            .filter((value) => value !== undefined)
            .at(-1) ??
          original(
            key,
            key === 'lineWidth'
              ? outline === 'series'
                ? defaults.lineWidth.path
                : outline === 'point'
                  ? defaults.lineWidth.point
                  : 0
              : outline === 'interval'
                ? 'none'
                : context.color(Array.isArray(args[0]) ? args[0][0] : args[0]),
            args,
          );
      }
    for (const key of ['fill', 'fillOpacity'] as const) {
      if (!annotations.some((annotation) => annotation.style?.[key] !== undefined)) continue;
      mark.style[key] = (...args: [object | object[], ...unknown[]]) =>
        selectedAnnotations(args[0])
          .map(({ annotation }) => annotation.style?.[key])
          .filter((v) => v !== undefined)
          .at(-1) ??
        original(
          key,
          key === 'fill' ? context.color(Array.isArray(args[0]) ? args[0][0] : args[0]) : 1,
          args,
        );
    }
  }
}

/** Native series paint stays on the source geometry; observation markers expand separately. */
function applySeriesHighlights<T extends object>(
  selections: Selection<T>[],
  context: G2AnnotationContext<T>,
) {
  for (const mark of context.sourceMarks) {
    const outline = mark.type === 'area' ? 'none' : mark.type === 'line' ? 'series' : 'point';
    applyNativeHighlights([mark], selections, context, outline);
  }
}

/** Resolve the union before creating markers; a fully selected series needs no extra points. */
function createSeriesMarkers<T extends object>(
  annotations: Extract<RendererAnnotation<T, 'g2'>, { type: 'highlight' }>[],
  {
    chartType,
    mapping,
    sourceMarks,
  }: Pick<G2AnnotationContext<T>, 'chartType' | 'mapping'> &
    Partial<Pick<G2AnnotationContext<T>, 'sourceMarks'>>,
) {
  switch (chartType) {
    case 'line':
    case 'area': {
      const selections = selectHighlights(mapping.data, annotations);
      const selected = new Set(selections.flatMap(({ rows }) => rows));
      const series = sourceMarks?.find((mark) => mark.type === 'line' || mark.type === 'area');
      const field =
        mapping.series ??
        (typeof series?.encode?.color === 'string' ? series.encode.color : undefined);
      return [...selected].flatMap((row) => {
        const seriesRows = mapping.data.filter(
          (datum) => !field || datum[field as keyof T] === row[field as keyof T],
        );
        if (seriesRows.every((datum) => selected.has(datum))) return [];
        const { style } = selections.findLast((selection) => selection.matches(row))!.annotation;
        return point.create(
          {
            data: row,
            style: { fill: style?.fill, stroke: style?.stroke, lineWidth: style?.lineWidth },
          },
          { useSourceGeometry: true, fillOpacity: style?.fillOpacity },
        );
      });
    }
    default:
      return [];
  }
}

function createHighlightLabels<T extends object>(
  selections: Selection<T>[],
  context: G2AnnotationContext<T>,
) {
  const { defaults } = context;
  let connectorIndex = 0;
  const connectorCount = selections.filter(
    ({ annotation }) => annotation.label && labelConnectors.has(annotation),
  ).length;
  // Invisible anchors share the primitive label layout without adding native data labels.
  return selections
    .filter(({ annotation }) => annotation.label)
    .map(({ annotation, rows }) => {
      const row = rows[0];
      const note = groupLabels.has(annotation);
      const pie = context.chartType === 'pie';
      const connect = labelConnectors.get(annotation);
      const index = connect ? connectorIndex++ : 0;
      let anchors: Point[] = [];
      let bracket: ConnectorShape | undefined;
      const colors = () => [
        ...new Set(
          rows
            .filter((row) => context.isVisible(row))
            .map(
              (row) =>
                (context.chartType === 'line'
                  ? annotation.style?.stroke
                  : annotation.style?.fill) ?? context.color(row),
            ),
        ),
      ];
      const [py, px] = defaults.labels.highlight.padding;
      const textStyle = context.getTextStyle(annotation);
      return context.createMark(
        { ...annotation, data: row },
        {
          nativeType: 'point',
          style: { fill: 'none', stroke: 'none' },
          label: {
            connectorStroke: annotation.style?.stroke ?? defaults.stroke,
            ...(connect
              ? {
                  annotationBracket: () => bracket,
                  connectorStroke: annotation.style?.stroke ?? defaults.labels.highlight.fill,
                  connectorLineWidth: 1.5,
                }
              : {}),
            ...(pie && !connect
              ? {
                  annotationRadial: true,
                  annotationAnchors: () => anchors,
                  connectorStroke: annotation.style?.stroke ?? defaults.labels.highlight.fill,
                  connectorLineWidth: 1.5,
                }
              : {}),
            ...(note
              ? {
                  annotationNote: true,
                  annotationColors: colors,
                  connector: false,
                  position: 'inside',
                  textAlign: 'right',
                  textBaseline: 'top',
                  dx: -px,
                  dy: py,
                  backgroundPadding: () => [py, px, py, px + getLabelColorWidth(colors())],
                  wordWrapWidth: () =>
                    Math.max(
                      annotation.style?.labelFontSize ?? defaults.labelFontSize,
                      textStyle.wordWrapWidth() - getLabelColorWidth(colors()),
                    ),
                }
              : {}),
          },
          // Nonzero invisible geometry keeps AntV's transform origin well-defined.
          draw: (scene) =>
            scene.createElement('circle', { style: { r: 1, fill: 'none', stroke: 'none' } }),
          decorate: (element, [anchor]) => {
            element.attr({ cx: anchor[0], cy: anchor[1] });
            element.setAttribute('annotationIgnoreObstacle', true);
            element.setAttribute('annotationSelection', annotation);
          },
          geometry: () => (_index, _scale, _value, coordinate) => {
            const points = rows.flatMap((row) => {
              const position = context.position(row, coordinate, true);
              // Connect within each selected sector, away from both the hole and its edges.
              const point =
                position && (coordinate.map(pie ? [0.18, position[1]] : position) as Point);
              return point?.every(Number.isFinite) ? [point] : [];
            });
            anchors = points;
            if (connect) {
              const geometry = rows.flatMap((row) => {
                const source = context.getGeometry(row);
                return source ? [source] : [];
              });
              bracket = connect(points, geometry, coordinate, index, connectorCount);
            }
            if (!points.length) return [[], []];
            if (bracket) return [[0], [[bracket.anchor]], [[0]]];
            if (pie) return [[0], [[coordinate.getCenter() as Point]], [[0]]];
            if (note) {
              const [width] = coordinate.getSize();
              return [
                [0],
                [[[width - defaults.labels.highlight.gap, defaults.labels.highlight.gap]]],
                [[0]],
              ];
            }
            const anchor: Point = [
              (Math.min(...points.map(([x]) => x)) + Math.max(...points.map(([x]) => x))) / 2,
              (Math.min(...points.map(([, y]) => y)) + Math.max(...points.map(([, y]) => y))) / 2,
            ];
            return [[0], [[anchor]], [[0]]];
          },
        },
      );
    });
}

/** Selection uses original fields and intentionally allows a selector to match a whole series. */
function selectHighlights<T extends object>(
  data: T[],
  annotations: Extract<RendererAnnotation<T, 'g2'>, { type: 'highlight' }>[],
) {
  const originals = new Set(data);
  return annotations.map((annotation) => {
    const targets = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
    if (!targets.length) throw new Error('Invalid annotation: highlight needs target data.');
    const selectors: ((row: object) => boolean)[] = [];
    const rows = new Set<T>();
    for (const target of targets) {
      if (
        !target ||
        typeof target !== 'object' ||
        Array.isArray(target) ||
        !Object.keys(target).length
      )
        throw new Error('Invalid annotation: highlight needs a nonempty original-field selector.');
      const entries = Object.entries(target);
      if (entries.some(([key]) => !data.some((row) => Object.hasOwn(row, key))))
        throw new Error('Invalid annotation: highlight contains an unknown field.');
      // Computed selections retain observation identity, including identical input rows.
      const exact = computedHighlights.has(annotation);
      const matchesRow = (row: object) =>
        exact && originals.has(row as T)
          ? row === target
          : entries.every(([key, value]) => (row as Record<string, unknown>)[key] === value);
      selectors.push(matchesRow);
      const matches = data.filter(matchesRow);
      if (!matches.length) throw new Error('Invalid annotation: highlight matches no data.');
      matches.forEach((row) => rows.add(row));
    }
    return {
      annotation,
      rows: [...rows],
      matches: (row: object) => selectors.some((matches) => matches(row)),
    };
  });
}

/** Each data target selects rows, a column or their intersection; targets select their union. */
function bindTableHighlights<T extends object>(
  container: HTMLElement,
  content: HTMLElement,
  data: T[],
  annotations: Extract<RendererAnnotation<T, 'table'>, { type: 'highlight' }>[] | undefined,
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  if (!annotations?.length) return () => {};
  const dim = getDimOpacity(annotations, defaults.highlight.dimOpacity);
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
        const exact = computedHighlights.has(annotation) ? data.indexOf(selector as T) : -1;
        indices =
          exact === -1
            ? data.flatMap((row, index) =>
                entries.every(([key, value]) => row[key as keyof T] === value) ? [index] : [],
              )
            : [exact];
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
  for (const cell of all) {
    if (selected.has(cell)) {
      const style = Object.assign(
        {},
        ...selections
          .filter(({ cells }) => cells.includes(cell))
          .map(({ annotation }) => annotation.style),
      );
      const color = style.fill ?? defaults.stroke;
      const opacity = style.fillOpacity ?? defaults.highlight.fillOpacity;
      // Older browsers retain this translucent background when color-mix is unsupported.
      cell.style.background = `rgba(127, 127, 127, ${opacity})`;
      cell.style.background = `color-mix(in srgb, ${color} ${opacity * 100}%, ${defaults.highlight.background})`;
      cell.style.boxShadow = `inset 0 -${style.lineWidth ?? defaults.highlight.lineWidth}px ${style.stroke ?? defaults.stroke}`;
    } else cell.style.opacity = String(dim);
  }
  const cleanupLabels = bindLabels(
    container,
    content,
    selections.map(({ annotation, cells }) => ({
      annotation,
      bounds: () => {
        const clip = content.getBoundingClientRect();
        const visible = cells
          .map((cell) => cell.getBoundingClientRect())
          .filter(
            (box) =>
              box.right > clip.left &&
              box.left < clip.right &&
              box.bottom > clip.top &&
              box.top < clip.bottom,
          );
        if (!visible.length) return undefined;
        const groups = labelConnectors.has(annotation)
          ? [...new Set(cells.map((cell) => cell.parentElement))].map((row) =>
              cells
                .filter((cell) => cell.parentElement === row)
                .map((cell) => cell.getBoundingClientRect())
                .filter(
                  (box) =>
                    box.right > clip.left &&
                    box.left < clip.right &&
                    box.bottom > clip.top &&
                    box.top < clip.bottom,
                ),
            )
          : [visible];
        return groups
          .filter((boxes) => boxes.length)
          .map((boxes) => {
            const left = Math.max(clip.left, Math.min(...boxes.map((box) => box.left)));
            const top = Math.max(clip.top, Math.min(...boxes.map((box) => box.top)));
            const right = Math.min(clip.right, Math.max(...boxes.map((box) => box.right)));
            const bottom = Math.min(clip.bottom, Math.max(...boxes.map((box) => box.bottom)));
            return DOMRect.fromRect({ x: left, y: top, width: right - left, height: bottom - top });
          });
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
  annotations: RendererAnnotation<{ text: string }, 'summary'>[] | undefined,
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  if (!annotations?.length) return () => {};
  const dim = getDimOpacity(annotations, defaults.highlight.dimOpacity);
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
        const style = Object.assign({}, ...matches.map(({ annotation }) => annotation.style));
        const color = style.fill ?? defaults.stroke;
        const opacity = style.fillOpacity ?? defaults.highlight.fillOpacity;
        span.className = 'annotation-highlight';
        Object.assign(span.style, {
          background: `rgba(127, 127, 127, ${opacity})`,
          borderBottom: `${style.lineWidth ?? defaults.highlight.lineWidth}px solid ${style.stroke ?? defaults.stroke}`,
          color: 'inherit',
          padding: '2px 0',
        });
        span.style.background = `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
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
      bounds: () => {
        const rects = marks[marks.length - 1]?.getClientRects();
        return rects?.[rects.length - 1];
      },
    })),
    defaults,
  );
  return () => {
    cleanupLabels();
    for (const span of spans) span.replaceWith(...span.childNodes);
    content.normalize();
  };
}
