import type { getAnnotationDefaults } from '../../theme/annotation';
import type {
  AnnotationData,
  AnnotationTypeMap,
  HighlightAnnotation,
  SummaryAnnotation,
  TableAnnotation,
} from '../../types/annotation';
import type { AnnotationComponent, AnnotationResult } from '../registry';
import type { G2AnnotationContext, MarkOptions } from '../runtime/g2';
import type { G6AnnotationOptions } from '../runtime/g6';
import { bindLabels } from '../shared/dom-label';
import type { Point } from '../shared/layout';
import { point } from './point';

/** Highlight batches share selection and dimming so overlapping targets form a union. */
export const highlight: AnnotationComponent<'highlight'> & {
  bindGraph: typeof bindNetworkGraphHighlights;
} = {
  grouping: 'byType',
  bindGraph: bindNetworkGraphHighlights,
  g2: (annotations, context) => {
    const selections = selectHighlights(context.mapping.data, annotations);
    let result: AnnotationResult = {};
    switch (context.chartType) {
      case 'line':
      case 'area':
        result = renderSeriesHighlights(selections, context);
        break;
      case 'bar':
      case 'column':
        applyNativeHighlights(context.sourceMarks, selections, context, 'interval');
        break;
      case 'scatter':
        applyNativeHighlights(context.sourceMarks, selections, context, 'point');
        break;
      case 'pie':
        applyNativeHighlights(context.sourceMarks, selections, context, 'interval');
        break;
      default:
        throw new Error(`Unsupported ${context.chartType} highlight.`);
    }
    return {
      ...result,
      marks: [...(result.marks ?? []), ...createHighlightLabels(selections, context)],
    };
  },
  g6: (annotations, context) => {
    // NetworkGraph paint is bound before render; this pass places explanations.
    for (const { annotation, rows } of selectHighlights(context.data, annotations)) {
      if (!annotation.label) continue;
      const anchor = context.position(rows[rows.length - 1]);
      if (anchor) context.label(annotation, anchor);
    }
    return {};
  },
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

type Selection<T extends object> = ReturnType<typeof selectHighlights<T>>[number];

/** Preserve native paint; chart adapters choose which outlines can be emphasized. */
function applyNativeHighlights<T extends object>(
  marks: MarkOptions[],
  selections: Selection<T>[],
  context: G2AnnotationContext<T>,
  outline: 'none' | 'series' | 'point' | 'interval',
) {
  const { defaults } = context;
  const annotations = selections.map(({ annotation }) => annotation);
  const dim = getDimOpacity(annotations, defaults.highlight.dimOpacity);
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
    if (outline !== 'none') {
      mark.style.lineWidth = (...args: [object | object[], ...unknown[]]) => {
        const width = Number(
          original(
            'lineWidth',
            outline === 'series' ? defaults.lineWidth.path : defaults.lineWidth.point,
            args,
          ),
        );
        const selectedStyles = selectedAnnotations(args[0]);
        const rows = Array.isArray(args[0]) ? args[0] : [args[0]];
        const active = rows.every((row) => selections.some((selection) => selection.matches(row)));
        return active
          ? (selectedStyles.at(-1)?.annotation.style?.lineWidth ??
              width + defaults.highlight.lineWidth)
          : width;
      };
      mark.style.stroke = (...args: [object | object[], ...unknown[]]) => {
        const selected = selectedAnnotations(args[0]);
        const row = Array.isArray(args[0]) ? args[0][0] : args[0];
        const color = context.color(row);
        const fallback = outline === 'interval' ? 'none' : color;
        if (outline === 'point' && selected.length)
          return selected.at(-1)!.annotation.style?.stroke ?? color;
        return selected.length
          ? (selected.at(-1)!.annotation.style?.stroke ?? original('stroke', color, args))
          : original('stroke', fallback, args);
      };
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

/** Line/Area layers share series selection; individual observations reuse point markers. */
function renderSeriesHighlights<T extends object>(
  selections: Selection<T>[],
  context: G2AnnotationContext<T>,
) {
  const { defaults, mapping, sourceMarks } = context;
  for (const mark of sourceMarks) {
    const outline = mark.type === 'area' ? 'none' : mark.type === 'line' ? 'series' : 'point';
    applyNativeHighlights([mark], selections, context, outline);
  }
  const selected = new Set(selections.flatMap(({ rows }) => rows));
  const selectedRows = [...selected];
  // A series is one path. A selection within it needs observation markers, not a recolored path.
  const series = sourceMarks.find((mark) => mark.type === 'line' || mark.type === 'area');
  const colorField = typeof series?.encode?.color === 'string' ? series.encode.color : undefined;
  const group = (row: object) => colorField && (row as Record<string, unknown>)[colorField];
  type Marker = AnnotationTypeMap<T>['point'];
  const targets = new Map<Marker, AnnotationTypeMap<T>['highlight']>();
  if (series) {
    for (const row of selectedRows) {
      const seriesRows = mapping.data.filter((datum) => group(datum) === group(row));
      if (seriesRows.every((datum) => selected.has(datum))) continue;
      const annotation = selections.findLast((selection) => selection.matches(row))!.annotation;
      targets.set(
        {
          type: 'point',
          data: row,
          style: {
            fill: annotation.style?.fill,
            stroke: annotation.style?.stroke,
            lineWidth: annotation.style?.lineWidth,
          },
        },
        annotation,
      );
    }
  }
  return targets.size
    ? point.g2([...targets.keys()], {
        ...context,
        position: (data, coordinate) => context.position(data, coordinate, true),
        createMark: (marker, definition) => {
          if (marker.type !== 'point') return context.createMark(marker, definition);
          const { style } = targets.get(marker)!;
          const row = Array.isArray(marker.data) ? marker.data[0] : marker.data;
          return context.createMark(marker, {
            ...definition,
            style: { ...definition.style, fillOpacity: style?.fillOpacity },
            decorate: (element, points) => {
              definition.decorate?.(element, points);
              element.setAttribute('annotationPoint', {
                ...element.getAttribute('annotationPoint'),
                color: style?.fill ?? context.color(row),
                stroke: style?.stroke ?? defaults.pointStroke,
              });
            },
          });
        },
      })
    : {};
}

function createHighlightLabels<T extends object>(
  selections: Selection<T>[],
  context: G2AnnotationContext<T>,
) {
  const { defaults } = context;
  // Invisible anchors share the primitive label layout without adding native data labels.
  return selections
    .filter(({ annotation }) => annotation.label)
    .map(({ annotation, rows }) => {
      const row = rows[rows.length - 1];
      return context.createMark(
        { ...annotation, data: row },
        {
          nativeType: 'point',
          style: { fill: 'none', stroke: 'none' },
          label: { connectorStroke: defaults.stroke },
          // Nonzero invisible geometry keeps AntV's transform origin well-defined.
          draw: (scene) =>
            scene.createElement('circle', { style: { r: 1, fill: 'none', stroke: 'none' } }),
          decorate: (element, [anchor]) => {
            element.attr({ cx: anchor[0], cy: anchor[1] });
            element.setAttribute('annotationIgnoreObstacle', true);
          },
          geometry: () => (_index, _scale, _value, coordinate) => {
            const anchor = context.position(row, coordinate, true);
            if (!anchor) return [[], []];
            // Series metadata gives polar labels a single anchor instead of sector bounds.
            return [[0], [[coordinate.map(anchor) as Point]], [[0]]];
          },
        },
      );
    });
}

/** Selection uses original fields and intentionally allows a selector to match a whole series. */
function selectHighlights<T extends object>(
  data: T[],
  annotations: HighlightAnnotation<AnnotationData<T>>[],
) {
  return annotations.map((annotation) => {
    const targets = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
    if (!targets.length) throw new Error('Invalid annotation: highlight needs target data.');
    const selectors: [string, unknown][][] = [];
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
      selectors.push(entries);
      if (entries.some(([key]) => !data.some((row) => Object.hasOwn(row, key))))
        throw new Error('Invalid annotation: highlight contains an unknown field.');
      const matches = data.filter((row) =>
        entries.every(([key, value]) => row[key as keyof T] === value),
      );
      if (!matches.length) throw new Error('Invalid annotation: highlight matches no data.');
      matches.forEach((row) => rows.add(row));
    }
    return {
      annotation,
      rows: [...rows],
      matches: (row: object) =>
        selectors.some((entries) =>
          entries.every(([key, value]) => (row as Record<string, unknown>)[key] === value),
        ),
    };
  });
}

/** All renderers share the same dimming rule and reject invalid opacity before painting. */
function getDimOpacity(annotations: HighlightAnnotation<object>[], fallback: number) {
  let dim = 1;
  for (const { style } of annotations) {
    const opacity = style?.dimOpacity ?? fallback;
    if (!Number.isFinite(opacity) || opacity < 0 || opacity > 1)
      throw new Error('Invalid annotation: dimOpacity must be between 0 and 1.');
    dim = Math.min(dim, opacity);
  }
  return dim;
}

/** Apply native graph data styles before render; never add replacement nodes or edges. */
function bindNetworkGraphHighlights({
  graph,
  data,
  edgeIds,
  annotations,
  defaults,
}: G6AnnotationOptions) {
  type GraphHighlight = Extract<
    NonNullable<G6AnnotationOptions['annotations']>[number],
    { type: 'highlight' }
  >;
  const highlights =
    annotations?.filter(
      (annotation): annotation is GraphHighlight => annotation.type === 'highlight',
    ) ?? [];
  if (!highlights.length) return () => {};
  const selections = selectHighlights([...data.nodes, ...data.edges], highlights);
  const dim = getDimOpacity(highlights, defaults.highlight.dimOpacity);
  const restore: (() => void)[] = [];
  for (const [index, row] of [...data.nodes, ...data.edges].entries()) {
    const edge = index >= data.nodes.length;
    const id = edge ? edgeIds[index - data.nodes.length] : data.nodes[index].name;
    const original = edge ? graph.getEdgeData(id) : graph.getNodeData(id);
    const matches = selections.filter(({ rows }) => rows.includes(row));
    const style: Record<string, unknown> = matches.length
      ? {
          lineWidth:
            Number(
              original.style?.lineWidth ??
                (edge ? defaults.lineWidth.path : defaults.lineWidth.point),
            ) + defaults.highlight.lineWidth,
          stroke: edge ? defaults.stroke : (original.style?.stroke ?? defaults.stroke),
        }
      : { opacity: Number(original.style?.opacity ?? 1) * dim };
    for (const { annotation } of matches)
      for (const key of ['fill', 'stroke', 'lineWidth', 'fillOpacity'] as const)
        if (annotation.style?.[key] !== undefined) style[key] = annotation.style[key];
    const previous = Object.fromEntries(
      Object.keys(style).map((key) => [key, original.style?.[key]]),
    );
    if (edge) {
      graph.updateEdgeData([{ id, style }]);
      restore.push(() => graph.updateEdgeData([{ id, style: previous }]));
    } else {
      graph.updateNodeData([{ id, style }]);
      restore.push(() => graph.updateNodeData([{ id, style: previous }]));
    }
  }
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    restore.forEach((reset) => reset());
  };
}

/** Each data target selects rows, a column or their intersection; targets select their union. */
function bindTableHighlights<T extends object>(
  container: HTMLElement,
  content: HTMLElement,
  data: T[],
  annotations: TableAnnotation<T>[] | undefined,
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
        return visible[visible.length - 1];
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
