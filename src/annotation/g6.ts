import { Label, type Graph } from '@antv/g6';
import type { getAnnotationDefaults } from '../theme/annotation';
import type { GraphData } from '../types';
import type { AnnotationData, GraphAnnotation } from '../types/annotation';
import type { Point } from './shared';

type Datum = GraphData['nodes'][number] | GraphData['edges'][number];

/** Business data selects graph elements; generated edge IDs stay inside the adapter. */
export function bindAnnotations(
  graph: Graph,
  annotations: GraphAnnotation<Datum>[] | undefined,
  data: GraphData,
  edgeIds: string[],
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  if (!annotations?.length) return () => {};
  const rows: Datum[] = [...data.nodes, ...data.edges];
  const selections = new Map<AnnotationData<Datum>, Datum>();
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
  const position = (selector: AnnotationData<Datum>): Point | undefined => {
    const row = selections.get(selector)!;
    const id = 'source' in row ? edgeIds[data.edges.indexOf(row)] : row.name;
    if (graph.getElementVisibility(id) === 'hidden') return undefined;
    const anchor =
      'source' in row ? graph.getElementRenderBounds(id).center : graph.getElementPosition(id);
    const center = graph.getViewportByCanvas(anchor);
    return [center[0], center[1]];
  };
  let layer: ReturnType<typeof createLayer> | undefined;
  const events = ['afterlayout', 'afterdraw', 'aftertransform', 'aftersizechange'];
  const draw = () => {
    layer?.draw();
  };
  const render = () => {
    layer ??= createLayer(graph, annotations, position, defaults);
    layer.draw();
  };
  graph.on('afterrender', render);
  for (const event of events) graph.on(event, draw);
  return () => {
    graph.off('afterrender', render);
    for (const event of events) graph.off(event, draw);
    layer?.destroy();
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

/** Native canvas shapes and labels, independent of the graph's own node and edge labels. */
function createLayer(
  graph: Graph,
  annotations: GraphAnnotation<Datum>[],
  position: (data: AnnotationData<Datum>) => Point | undefined,
  defaults: ReturnType<typeof getAnnotationDefaults>,
) {
  const canvas = graph.getCanvas();
  const scene = canvas.document;
  const root = scene.createElement('g', {
    className: 'annotations',
    style: { pointerEvents: 'none', zIndex: 1000 },
  });
  canvas.appendChild(root);
  let disposed = false;

  const draw = () => {
    if (disposed) return;
    const [width, height] = canvas.getSize();
    // Cancel the camera transform so marks, text and stroke widths stay in screen pixels.
    root.setLocalPosition(graph.getCanvasByViewport([0, 0]));
    root.setLocalScale(1 / graph.getZoom());
    root.destroyChildren();
    const boxes: { left: number; top: number; width: number; height: number }[] = [];
    const add = (tag: string, style: Record<string, unknown>, className = 'annotation-mark') => {
      const shape = scene.createElement(tag, {
        className,
        style: { ...style, pointerEvents: 'none' },
      });
      root.appendChild(shape);
    };
    const label = (annotation: GraphAnnotation<Datum>, [x, y]: Point) => {
      if (annotation.label === undefined) return;
      const standalone = annotation.type === 'text';
      const style = defaults.labels[annotation.type];
      const fontSize = annotation.labelFontSize ?? defaults.labelFontSize;
      const [, px] = style.padding;
      const card = new Label({
        className: `annotation-label annotation-${annotation.type}`,
        style: {
          text: annotation.label,
          fill: annotation.labelFill ?? style.fill,
          fontFamily: defaults.fontFamily,
          fontSize,
          fontWeight: style.fontWeight,
          lineHeight: Math.ceil(fontSize * 1.5),
          textAlign: standalone ? 'center' : 'left',
          wordWrapWidth: Math.max(fontSize, Math.min(style.maxWidth, width) - px * 2),
          maxLines: Infinity,
          textOverflow: 'clip',
          padding: style.padding,
          background: !standalone,
          backgroundFill: style.background,
          backgroundFillOpacity: style.backgroundOpacity,
          backgroundOpacity: 1,
          backgroundStroke: style.border,
          backgroundStrokeOpacity: style.borderOpacity,
          backgroundLineWidth: 1,
          backgroundRadius: style.radius,
          pointerEvents: 'none',
          zIndex: 2,
        },
      });
      root.appendChild(card);
      const bounds = card.getGeometryBounds();
      const [labelWidth, labelHeight] = bounds.halfExtents.map((size) => size * 2);
      if (standalone) {
        card.setLocalPosition([x - bounds.center[0], y - bounds.center[1]]);
        return;
      }
      const gap =
        style.gap + (annotation.type === 'point' ? (annotation.size ?? defaults.size) : 0);
      const above = labelPosition([x, y], [labelWidth, labelHeight], [width, height], gap);
      const below = labelPosition([x, y], [labelWidth, labelHeight], [width, height], gap, true);
      // Independent labels are not collected by G6 auto-adapt-label; keep attached cards apart.
      const candidates: Point[] = [
        above,
        below,
        [Math.max(0, Math.min(x + gap, width - labelWidth)), above[1]],
        [Math.max(0, x - gap - labelWidth), above[1]],
      ];
      const [left, top] =
        candidates.find(([left, top]) =>
          boxes.every(
            (box) =>
              left >= box.left + box.width + 4 ||
              left + labelWidth + 4 <= box.left ||
              top >= box.top + box.height + 4 ||
              top + labelHeight + 4 <= box.top,
          ),
        ) ?? above;
      boxes.push({ left, top, width: labelWidth, height: labelHeight });
      card.setLocalPosition([left - bounds.min[0], top - bounds.min[1]]);
      const edge: Point = [
        Math.max(left, Math.min(x, left + labelWidth)),
        Math.max(top, Math.min(y, top + labelHeight)),
      ];
      if (edge[0] !== x || edge[1] !== y)
        add(
          'path',
          {
            d: [
              ['M', x, y],
              ['L', ...edge],
            ],
            stroke:
              'stroke' in annotation ? (annotation.stroke ?? defaults.stroke) : defaults.stroke,
            lineWidth: 1,
            strokeOpacity: 0.5,
            zIndex: 1,
          },
          'annotation-leader',
        );
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
        lineWidth,
        fill: 'none',
        lineDash: 'lineDash' in annotation ? annotation.lineDash : undefined,
      };
      switch (annotation.type) {
        case 'line': {
          const points = mapped(annotation.data);
          if (!points) break;
          add('path', { ...attributes, d: points.map(([x, y], i) => [i ? 'L' : 'M', x, y]) });
          label(annotation, points.at(-1)!);
          break;
        }
        case 'connector': {
          const points = mapped(annotation.data);
          if (!points) break;
          const [a, b] = points;
          const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
          const head = Math.min(length * 0.35, Math.max(8, lineWidth * 3));
          const arrow = length
            ? scene.createElement('path', {
                style: {
                  d: [
                    ['M', head, -head / 2],
                    ['L', 0, 0],
                    ['L', head, head / 2],
                  ],
                  stroke,
                  lineWidth,
                  fill: 'none',
                  lineCap: 'round',
                  lineJoin: 'round',
                  pointerEvents: 'none',
                },
              })
            : undefined;
          add('path', {
            ...attributes,
            d: [
              ['M', ...a],
              ['L', ...b],
            ],
            markerEnd: arrow,
            lineCap: 'round',
            lineJoin: 'round',
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
                d: [
                  ['M', x, y - r * 1.5],
                  ['L', x + r, y],
                  ['L', x, y + r * 1.5],
                  ['L', x - r, y],
                  ['Z'],
                ],
              });
            else if (shape === 'triangle' || shape === 'hollowTriangle')
              add('path', {
                ...paint,
                d: [['M', x, y - r], ['L', x + r, y + r], ['L', x - r, y + r], ['Z']],
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
  };
  // Wrapping now depends on font metrics, so update once web fonts become available.
  document.fonts.ready.then(draw);
  document.fonts.addEventListener('loadingdone', draw);
  return {
    draw,
    destroy() {
      disposed = true;
      document.fonts.removeEventListener('loadingdone', draw);
      root.destroy();
    },
  };
}

function labelPosition(
  [x, y]: Point,
  [width, height]: Point,
  [viewWidth, viewHeight]: Point,
  gap: number,
  below = false,
): Point {
  const top = below || y - gap - height < 0 ? y + gap : y - gap - height;
  return [
    Math.max(0, Math.min(x - width / 2, viewWidth - width)),
    Math.max(0, Math.min(top, viewHeight - height)),
  ];
}
