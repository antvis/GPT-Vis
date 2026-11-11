import { Label, type Graph } from '@antv/g6';
import type { getAnnotationDefaults } from '../theme/annotation';
import type { GraphData } from '../types';
import type { AnnotationData, GraphAnnotation } from '../types/annotation';
import { placeLabel, routeLeader, type Box, type Segment } from './layout';
import {
  createConnectorShape,
  createPointPulse,
  getConnectorGeometry,
  hasPointAt,
  type Point,
} from './shared';

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
  const position = (selector: AnnotationData<Datum>): Point | undefined => {
    const row = selectDatum(rows, selector);
    const id = 'source' in row ? edgeIds[data.edges.indexOf(row)] : row.name;
    if (graph.getElementVisibility(id) === 'hidden') return undefined;
    const anchor =
      'source' in row ? graph.getElementRenderBounds(id).center : graph.getElementPosition(id);
    const center = graph.getViewportByCanvas(anchor);
    return [center[0], center[1]];
  };
  let layer: ReturnType<typeof createLayer> | undefined;
  const events = ['afterlayout', 'afterdraw', 'aftertransform', 'aftersizechange'];
  const draw = () => layer?.draw();
  const render = () => {
    layer ??= createLayer(graph, annotations, position, defaults, data);
    draw();
  };
  graph.on('afterrender', render);
  for (const event of events) graph.on(event, draw);
  const cleanup = () => {
    graph.off('afterrender', render);
    for (const event of events) graph.off(event, draw);
    graph.off('beforedestroy', cleanup);
    layer?.destroy();
  };
  graph.on('beforedestroy', cleanup);
  return cleanup;
}

function selectDatum(data: Datum[], selector: Partial<Datum>) {
  const entries = Object.entries(selector);
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
  data: GraphData,
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
    pulse?.clear();
    root.destroyChildren();
    const boxes: Box[] = [];
    const segments: Segment[] = [];
    const centers: Point[] = [];
    for (const node of data.nodes) {
      if (graph.getElementVisibility(node.name) === 'hidden') continue;
      const [x, y] = graph.getViewportByCanvas(graph.getElementPosition(node.name));
      centers.push([x, y]);
      const { min, max } = graph.getElementRenderBounds(node.name);
      const a = graph.getViewportByCanvas(min);
      const b = graph.getViewportByCanvas(max);
      boxes.push({ x: a[0], y: a[1], width: b[0] - a[0], height: b[1] - a[1] });
    }
    for (const edge of data.edges) {
      if ([edge.source, edge.target].some((id) => graph.getElementVisibility(id) === 'hidden'))
        continue;
      const points = [edge.source, edge.target].map((id) =>
        graph.getViewportByCanvas(graph.getElementPosition(id)),
      );
      segments.push([
        [points[0][0], points[0][1]],
        [points[1][0], points[1][1]],
      ]);
    }
    const cards: {
      card: Label;
      annotation: GraphAnnotation<Datum>;
      anchor: Point;
      bounds: Box;
      min: Point;
    }[] = [];
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
      const fontSize = annotation.style?.labelFontSize ?? defaults.labelFontSize;
      const [, px] = style.padding;
      const card = new Label({
        className: `annotation-label annotation-${annotation.type}`,
        style: {
          text: annotation.label,
          fill:
            annotation.style?.labelFill ??
            (annotation.type === 'connector'
              ? (annotation.style?.stroke ?? defaults.stroke)
              : style.fill),
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
        boxes.push({
          x: x - labelWidth / 2,
          y: y - labelHeight / 2,
          width: labelWidth,
          height: labelHeight,
        });
        return;
      }
      cards.push({
        card,
        annotation,
        anchor: [x, y],
        min: [bounds.min[0], bounds.min[1]],
        bounds: { x: 0, y: 0, width: labelWidth, height: labelHeight },
      });
    };
    const mapped = (data: AnnotationData<Datum>[]) => {
      const points = data.map(position);
      return points.some((p) => !p) ? undefined : (points as Point[]);
    };
    for (const annotation of annotations) {
      const stroke =
        annotation.type === 'text'
          ? defaults.stroke
          : (annotation.style?.stroke ?? defaults.stroke);
      const lineWidth =
        annotation.type === 'text'
          ? 0
          : (annotation.style?.lineWidth ?? defaults.lineWidth[annotation.type]);
      const attributes = {
        stroke,
        lineWidth,
        fill: 'none',
        lineDash:
          annotation.type === 'path' || annotation.type === 'connector'
            ? annotation.style?.lineDash
            : undefined,
      };
      switch (annotation.type) {
        case 'path': {
          const points = mapped(annotation.data);
          if (!points) break;
          points.slice(1).forEach((point, index) => segments.push([points[index], point]));
          add('path', { ...attributes, d: points.map(([x, y], i) => [i ? 'L' : 'M', x, y]) });
          label(annotation, points.at(-1)!);
          break;
        }
        case 'connector': {
          const points = mapped(annotation.data);
          if (!points) break;
          const [a, b] = points;
          const geometry = getConnectorGeometry(
            a,
            b,
            annotation,
            [width, height],
            defaults.connector,
          );
          segments.push(...geometry.segments);
          const shape = createConnectorShape(scene, geometry, attributes, defaults.connector);
          shape.className = 'annotation-mark';
          root.appendChild(shape);
          label(annotation, geometry.anchor);
          break;
        }
        case 'point': {
          for (const data of Array.isArray(annotation.data) ? annotation.data : [annotation.data]) {
            const point = position(data);
            if (!point) continue;
            const [x, y] = point;
            const r = annotation.style?.size ?? defaults.size;
            const halo = r * defaults.pulse.endScale;
            boxes.push({ x: x - halo, y: y - halo, width: halo * 2, height: halo * 2 });
            const shape = defaults.shape;
            const covered = annotation.style?.fill === undefined && hasPointAt(centers, point);
            const paint = {
              ...attributes,
              stroke: covered ? 'transparent' : (annotation.style?.stroke ?? defaults.pointStroke),
              fill: annotation.style?.fill ?? (covered ? 'transparent' : stroke),
            };
            pulse?.add(
              root,
              point,
              r,
              paint.fill !== 'none' && paint.fill !== 'transparent' ? paint.fill : stroke,
              annotation.pulse,
            );
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
            else throw new Error(`Unsupported annotation point shape: ${shape}.`);
            label(annotation, point);
          }
          break;
        }
        case 'text': {
          const point = position(annotation.data);
          if (point) label(annotation, point);
          break;
        }
        default:
          throw new Error('Unsupported graph annotation type.');
      }
    }
    // Measure every fixed text and mark before placing any attached card, regardless of input order.
    for (const item of cards) {
      const { annotation, anchor, card, min } = item;
      const gap =
        defaults.labels[annotation.type].gap +
        (annotation.type === 'point'
          ? (annotation.style?.size ?? defaults.size) * defaults.pulse.endScale
          : 0);
      item.bounds = placeLabel(
        anchor,
        [item.bounds.width, item.bounds.height],
        [width, height],
        gap,
        boxes,
        segments,
      );
      boxes.push(item.bounds);
      card.setLocalPosition([item.bounds.x - min[0], item.bounds.y - min[1]]);
    }
    for (const { annotation, anchor, bounds } of cards) {
      const route = routeLeader(anchor, bounds, boxes, segments);
      if (!route.length) continue;
      add(
        'path',
        {
          d: route.map(([x, y], index) => [index ? 'L' : 'M', x, y]),
          stroke:
            annotation.type === 'text'
              ? defaults.stroke
              : (annotation.style?.stroke ?? defaults.stroke),
          lineWidth: 1,
          strokeOpacity: 0.5,
          zIndex: 1,
        },
        'annotation-leader',
      );
      route.slice(1).forEach((point, index) => segments.push([route[index], point]));
    }
  };
  const pulse = annotations.some(({ type }) => type === 'point')
    ? createPointPulse(scene, defaults.pulse, draw)
    : undefined;
  // Wrapping now depends on font metrics, so update once web fonts become available.
  document.fonts.ready.then(draw);
  document.fonts.addEventListener('loadingdone', draw);
  return {
    draw,
    destroy() {
      disposed = true;
      document.fonts.removeEventListener('loadingdone', draw);
      pulse?.destroy();
      root.destroy();
    },
  };
}
