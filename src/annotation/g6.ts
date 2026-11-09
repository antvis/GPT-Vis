import type { Graph } from '@antv/g6';
import type { getAnnotationDefaults } from '../theme/annotation';
import type { GraphData } from '../types';
import type { AnnotationData, GraphAnnotation } from '../types/annotation';
import { connectorPath, path, type Point } from './shared';

type Datum = GraphData['nodes'][number] | GraphData['edges'][number];

/** Business data selects graph elements; generated edge IDs stay inside the adapter. */
export function bindAnnotations(
  graph: Graph,
  container: HTMLElement,
  annotations: GraphAnnotation<Datum>[] | undefined,
  data: GraphData,
  edgeIds: string[],
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  if (!annotations?.length) return () => {};
  const rows: Datum[] = [...data.nodes, ...data.edges];
  const selections = new Map<Partial<Datum>, Datum>();
  for (const annotation of annotations) {
    if (
      (annotation.type === 'text' || annotation.label !== undefined) &&
      typeof annotation.label !== 'string'
    )
      throw new Error('Invalid annotation: label must be a string; text requires a label.');
    switch (annotation.type) {
      case 'line':
        if (!Array.isArray(annotation.data) || annotation.data.length < 2)
          throw new Error('Invalid annotation: graph lines need at least two data positions.');
        break;
      case 'connector':
        if (!Array.isArray(annotation.data) || annotation.data.length !== 2)
          throw new Error('Invalid annotation: connector needs two positions.');
        break;
      case 'point':
      case 'text':
        break;
      default:
        throw new Error(
          'Invalid annotation: graphs support point, text, line paths and connectors only.',
        );
    }
    const selectors = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
    for (const selector of selectors) selections.set(selector, selectDatum(rows, selector));
  }
  let ready = false;
  const layer = createLayer(
    container,
    annotations,
    (selector) => {
      if (!ready) return undefined;
      const row = selections.get(selector)!;
      const id = 'source' in row ? edgeIds[data.edges.indexOf(row)] : row.name;
      if (graph.getElementVisibility(id) === 'hidden') return undefined;
      const anchor =
        'source' in row ? graph.getElementRenderBounds(id).center : graph.getElementPosition(id);
      const center = graph.getViewportByCanvas(anchor);
      return [center[0], center[1]] as Point;
    },
    defaults,
  );
  const events = ['afterlayout', 'afterdraw', 'aftertransform', 'aftersizechange'];
  const draw = () => {
    if (ready) layer.draw();
  };
  const render = () => {
    ready = true;
    layer.draw();
  };
  graph.on('afterrender', render);
  for (const event of events) graph.on(event, draw);
  return () => {
    graph.off('afterrender', render);
    for (const event of events) graph.off(event, draw);
    layer.destroy();
  };
}

function selectDatum(data: Datum[], selector: Partial<Datum>) {
  const entries = Object.entries(selector);
  if (!entries.length) throw new Error('Invalid annotation: a data selector cannot be empty.');
  const matches = data.filter((row) =>
    entries.every(([key, value]) => row[key as keyof Datum] === value),
  );
  if (matches.length !== 1)
    throw new Error(
      `Invalid annotation: selector matches ${matches.length} objects; expected one.`,
    );
  return matches[0];
}

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Draw graph annotations in viewport coordinates without changing native node labels. */
function createLayer(
  container: HTMLElement,
  annotations: GraphAnnotation<Datum>[],
  position: (data: AnnotationData<Datum>) => Point | undefined,
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.classList.add('annotations');
  Object.assign(svg.style, {
    position: 'absolute',
    left: '0',
    top: '0',
    pointerEvents: 'none',
    overflow: 'visible',
  });
  const previousPosition = container.style.position;
  if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
  container.appendChild(svg);
  let disposed = false;

  const draw = () => {
    if (disposed) return;
    svg.style.display = 'none';
    const width = Math.max(container.clientWidth, container.scrollWidth);
    const height = Math.max(container.clientHeight, container.scrollHeight);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.style.display = '';
    const foreground = document.createElementNS(SVG_NS, 'g');
    const add = (tag: string, attributes: Record<string, unknown>) => {
      const element = document.createElementNS(SVG_NS, tag);
      for (const [key, value] of Object.entries(attributes))
        if (value !== undefined) element.setAttribute(key, String(value));
      foreground.appendChild(element);
      return element;
    };
    const label = (annotation: GraphAnnotation<Datum>, [x, y]: Point) => {
      if (annotation.label === undefined) return;
      const standalone = annotation.type === 'text';
      const element = add('text', {
        x,
        y: standalone ? y : y < 20 ? y + 16 : y - 10,
        fill: annotation.labelFill ?? defaults.labelFill,
        'font-family': defaults.fontFamily,
        'font-size': annotation.labelFontSize ?? defaults.labelFontSize,
        'font-weight': defaults.fontWeight,
        'text-anchor': standalone ? 'middle' : x < 60 ? 'start' : x > width - 60 ? 'end' : 'middle',
        'dominant-baseline': standalone ? 'central' : 'auto',
      });
      element.textContent = annotation.label;
    };
    const mapped = (data: AnnotationData<Datum>[]) => {
      const points = data.map(position);
      return points.some((p) => !p) ? undefined : (points as Point[]);
    };
    for (const annotation of annotations) {
      const stroke =
        'stroke' in annotation ? (annotation.stroke ?? defaults.stroke) : defaults.stroke;
      const lineWidth =
        annotation.type === 'text'
          ? 0
          : (annotation.lineWidth ?? defaults.lineWidth[annotation.type]);
      const attributes = {
        stroke,
        'stroke-width': lineWidth,
        fill: 'none',
        'stroke-dasharray': 'lineDash' in annotation ? annotation.lineDash?.join(' ') : undefined,
      };
      switch (annotation.type) {
        case 'line': {
          const points = mapped(annotation.data);
          if (!points) break;
          add('path', { ...attributes, d: path(points) });
          label(annotation, points.at(-1)!);
          break;
        }
        case 'connector': {
          const points = mapped(annotation.data);
          if (!points) break;
          const [a, b] = points;
          add('path', {
            ...attributes,
            d: connectorPath(a, b, lineWidth),
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          });
          label(annotation, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
          break;
        }
        case 'point': {
          for (const data of Array.isArray(annotation.data) ? annotation.data : [annotation.data]) {
            const point = position(data);
            if (!point) continue;
            const [x, y] = point;
            const r = annotation.size ?? defaults.size;
            const shape = defaults.shape;
            const paint = {
              ...attributes,
              fill: annotation.fill ?? (shape.startsWith('hollow') ? 'none' : stroke),
            };
            if (shape === 'square' || shape === 'hollowSquare')
              add('rect', { ...paint, x: x - r, y: y - r, width: 2 * r, height: 2 * r });
            else if (shape === 'diamond' || shape === 'hollowDiamond')
              add('path', {
                ...paint,
                d: path(
                  [
                    [x, y - r * 1.5],
                    [x + r, y],
                    [x, y + r * 1.5],
                    [x - r, y],
                  ],
                  true,
                ),
              });
            else if (shape === 'triangle' || shape === 'hollowTriangle')
              add('path', {
                ...paint,
                d: path(
                  [
                    [x, y - r],
                    [x + r, y + r],
                    [x - r, y + r],
                  ],
                  true,
                ),
              });
            else if (['point', 'circle', 'hollow', 'hollowCircle'].includes(shape))
              add('circle', { ...paint, cx: x, cy: y, r });
            else
              throw new Error(
                `Invalid annotation: unsupported theme point shape ${defaults.shape}.`,
              );
            label(annotation, point);
          }
          break;
        }
        case 'text': {
          const point = position(annotation.data);
          if (point) label(annotation, point);
          break;
        }
      }
    }
    svg.replaceChildren(foreground);
  };
  const resize = new ResizeObserver(draw);
  resize.observe(container);
  return {
    draw,
    destroy() {
      disposed = true;
      resize.disconnect();
      svg.remove();
      container.style.position = previousPosition;
    },
  };
}
