import { corelib, type Mark, type ShapeComponent, type Theme } from '@antv/g2';
import type { ThemeTokens } from '../types';
import type { Annotation, AnnotationValue } from '../types/annotation';
import type { LineDataItem } from '../vis/line';
import {
  cardAttachment,
  differenceRoute,
  inflate,
  overlap,
  placeLabel,
  type Box,
  type Point,
  type Segment,
} from './layout';
import { annotationError, matchData, matchOne } from './shared';

/** A measurement bracket stays separate from the series and terminates in a small arrow. */
const DifferenceShape: ShapeComponent =
  (options = {}, context) =>
  (points) => {
    const { annotationLane = 0, ...style } = options;
    const route = differenceRoute(points[0], points[1], Number(annotationLane));
    const [end, previous] = route.points.slice(-2).reverse();
    const angle = Math.atan2(end[1] - previous[1], end[0] - previous[0]);
    const arrow = [-0.55, 0.55].map((turn) => [
      end[0] - Math.cos(angle + turn) * 7,
      end[1] - Math.sin(angle + turn) * 7,
    ]);
    const d =
      route.points.map(([x, y], index) => `${index ? 'L' : 'M'}${x},${y}`).join(' ') +
      ` M${arrow[0]} L${end} L${arrow[1]}`;
    return context!.document.createElement('path', {
      style: { ...style, d, fill: 'none', pointerEvents: 'none' },
    });
  };
DifferenceShape.props = { defaultMarker: 'line' };

/** Run after native layout, including legend filtering and resize, using actual text bounds. */
type Graphic = ReturnType<ReturnType<ShapeComponent>>;
type NativeLabelTransform = ReturnType<ReturnType<typeof corelib>['labelTransform.exceedAdjust']>;
const labelBox = (label: Graphic): Box => {
  const { min, max } = label.getElementById('background')!.getBounds();
  const width = max[0] - min[0];
  const height = max[1] - min[1];
  return {
    x: Number(label.attr('x')) - width / 2,
    y: Number(label.attr('y')) - height / 2,
    width,
    height,
  };
};
const AnnotationLabels: () => NativeLabelTransform = () => {
  const library = corelib();
  const dodge = library['labelTransform.overlapDodgeY']({ padding: 8 });
  const adjust = library['labelTransform.exceedAdjust']({ bounds: 'main', offsetX: 8, offsetY: 8 });
  return (labels: Graphic[], context: Parameters<typeof adjust>[1]) => {
    const { canvas, layout } = context;
    const bounds: Box = {
      x: 8,
      y: 8,
      width: Math.max(1, (layout.innerWidth ?? 1) - 16),
      height: Math.max(1, (layout.innerHeight ?? 1) - 16),
    };
    const occupied: Box[] = [];
    const segments: Segment[] = [];
    for (const item of canvas.document.getElementsByClassName('element')) {
      const element = item as unknown as Graphic;
      if (element.attr('annotationKind') === 'range') continue;
      const points =
        (element as unknown as { __data__?: { points?: Point[] } }).__data__?.points ?? [];
      if (element.attr('annotationKind') === 'difference' && points.length === 2) {
        const route = differenceRoute(
          points[0],
          points[1],
          Number(element.attr('annotationLane') ?? 0),
        );
        route.points
          .slice(1)
          .forEach((point, index) => segments.push([route.points[index], point]));
        continue;
      }
      points.slice(1).forEach((point, index) => segments.push([points[index], point]));
    }
    const callouts = labels.filter((label) =>
      ['point', 'highlight'].includes(label.attr('annotationKind')),
    );
    for (const label of callouts) {
      const [x, y] = (label as unknown as { __data__: { points: Point[] } }).__data__.points[0];
      occupied.push({ x: x - 13, y: y - 13, width: 26, height: 26 });
    }
    const obstacles = [...occupied];
    // Measurement and reference labels establish the guides; callouts use the remaining whitespace.
    const order = { difference: 0, line: 1, range: 2, point: 3, highlight: 3 };
    const sorted = [...labels].sort(
      (a, b) =>
        (order[a.attr('annotationKind') as keyof typeof order] ?? 4) -
        (order[b.attr('annotationKind') as keyof typeof order] ?? 4),
    );
    for (const label of sorted) {
      const kind = label.attr('annotationKind');
      if (!kind) continue;
      const callout = kind === 'point' || kind === 'highlight';
      label.attr(
        'wordWrapWidth',
        Math.min(156, Math.max(64, (callout ? bounds.width / 2 : bounds.width) - 20)),
      );
      const points = (label as unknown as { __data__: { points: Point[] } }).__data__.points;
      const card = label.getElementById('background');
      if (!card || !points.length) continue;
      const { min, max } = card.getBounds();
      const size = { width: max[0] - min[0], height: max[1] - min[1] };
      let anchor: Point = points[0];
      let box: Box;
      if (kind === 'difference') {
        const route = differenceRoute(
          points[0],
          points[1],
          Number(label.attr('annotationLane') ?? 0),
        );
        anchor = route.label;
        box = { x: anchor[0] - size.width / 2, y: anchor[1] - size.height - 8, ...size };
        if (route.side) box.x += size.width / 2 + 8;
      } else if (kind === 'line') {
        const horizontal = label.attr('annotationAxis') === 'y';
        box = placeLabel(
          horizontal ? [bounds.x + bounds.width, anchor[1]] : [anchor[0], bounds.y],
          size,
          horizontal
            ? { ...bounds, y: anchor[1] - size.height - 6, height: size.height * 2 + 12 }
            : { ...bounds, x: anchor[0] + 6, width: size.width },
          occupied,
          segments,
          8,
        );
      } else if (kind === 'range') {
        const minX = Math.min(...points.map(([x]) => x));
        const maxX = Math.max(...points.map(([x]) => x));
        const minY = Math.min(...points.map(([, y]) => y));
        const horizontal = label.attr('annotationAxis') === 'y';
        const top = Math.max(bounds.y, minY - size.height - 6);
        const band = horizontal
          ? {
              ...bounds,
              y: top,
              height: Math.min(size.height * 2 + 20, bounds.y + bounds.height - top),
            }
          : {
              ...bounds,
              x: Math.max(bounds.x, Math.min(minX, bounds.x + bounds.width - size.width)),
              width: Math.max(size.width, maxX - minX),
              height: Math.min(bounds.height, size.height * 4 + 48),
            };
        box = placeLabel(
          horizontal ? [bounds.x, minY] : [(minX + maxX) / 2, bounds.y],
          size,
          band,
          occupied,
          segments,
          size.height + 8,
        );
        if (horizontal) anchor = [box.x + box.width / 2, minY];
      } else {
        box = placeLabel(anchor, size, bounds, occupied, segments, 16);
      }
      const center: Point = [box.x + box.width / 2, box.y + box.height / 2];
      label.attr({
        x: center[0],
        y: center[1],
        x0: anchor[0],
        y0: anchor[1],
        connector: false,
      });
      occupied.push(inflate(box, 6));
    }
    dodge(callouts, context);
    adjust(sorted, context);
    // Native dodge only sees callouts. Preserve the guides when it moves a card into their space.
    const guides = sorted.filter((label) => !callouts.includes(label));
    const placed = [...obstacles, ...guides.map((label) => inflate(labelBox(label), 6))];
    for (const label of callouts) {
      let box = labelBox(label);
      if (placed.some((other) => overlap(box, other))) {
        box = placeLabel(
          [Number(label.attr('x0')), Number(label.attr('y0'))],
          box,
          bounds,
          placed,
          segments,
          16,
        );
        label.attr({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
      }
      placed.push(inflate(box, 6));
    }
    const connected = sorted.filter(
      (label) =>
        callouts.includes(label) ||
        (label.attr('annotationKind') === 'range' && label.attr('annotationAxis') === 'y'),
    );
    for (const label of connected) {
      const x = Number(label.attr('x'));
      const y = Number(label.attr('y'));
      const anchor: Point = [Number(label.attr('x0')), Number(label.attr('y0'))];
      const attachment = cardAttachment(anchor, labelBox(label));
      label.attr({
        connector: true,
        connectorPoints: [attachment, attachment].map(([px, py]) => [px - x, py - y]),
      });
    }
    return labels;
  };
};

/** Translate line-chart annotation intent into native marks sharing its scales. */
export function getLineAnnotations(
  data: LineDataItem[],
  annotations: Annotation[],
  theme: Theme,
  tokens: ThemeTokens,
): {
  background: Mark[];
  foreground: Mark[];
  library: Record<string, ShapeComponent>;
  labelTransform: { type: typeof AnnotationLabels }[];
  insetTop: number;
} {
  const background: Mark[] = [];
  const foreground: Mark[] = [];
  const palette = theme.category10 as string[];
  const color = palette[0];
  const backgroundColor = theme.view?.viewFill ?? '#fff';
  let comparisonLane = 0;
  const groups = Array.from(new Set(data.map((datum) => datum.group)));
  const times = Array.from(new Set(data.map((datum) => datum.time)));
  const hasGroups = data.some((datum) => datum.group !== undefined);
  const numericTime = data.length > 0 && data.every((datum) => typeof datum.time === 'number');

  const checkValue = (axis: 'x' | 'y', value: AnnotationValue, annotation: Annotation) => {
    if (axis === 'y' || numericTime) {
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        annotationError(annotation, `${axis} requires a finite number.`);
      }
    } else if (!times.includes(value)) {
      annotationError(annotation, 'x value must exist in the time domain.');
    }
  };

  for (const annotation of annotations) {
    const labels = annotation.label
      ? [
          {
            text: () => annotation.label!.text,
            position: 'inside',
            textAlign: 'center',
            textBaseline: 'middle',
            fontSize: 12,
            fontWeight: 500,
            ...theme.label,
            wordWrap: true,
            wordWrapWidth: 156,
            background: true,
            backgroundFill: tokens.colorSurface ?? backgroundColor,
            backgroundFillOpacity: 1,
            backgroundStroke: tokens.colorStroke ?? theme.label?.fill ?? color,
            backgroundStrokeOpacity: tokens.colorStroke ? 1 : 0.16,
            backgroundLineWidth: tokens.lineWidth ?? 1,
            backgroundRadius: tokens.radius ?? 5,
            backgroundPadding: [tokens.spacingSmall ?? 7, tokens.spacingMedium ?? 10],
            connectorStroke: color,
            connectorLineWidth: tokens.lineWidth ?? 1,
            connectorStrokeOpacity: 0.65,
            connectorZIndex: -2,
            annotationKind: annotation.type,
            annotationAxis: 'axis' in annotation ? annotation.axis : undefined,
            ...annotation.label.style,
          },
        ]
      : undefined;
    const common = { animate: false, tooltip: false } as const;
    const addPoints = (indices: number[]) => {
      const unique = Array.from(new Set(indices));
      const stroke = (datum: LineDataItem) =>
        annotation.style?.stroke ?? palette[groups.indexOf(datum.group) % palette.length] ?? color;
      const encode = { x: 'time', y: 'value', ...(hasGroups ? { color: 'group' } : {}) };
      foreground.push({
        ...common,
        type: 'point',
        data: unique.map((index) => data[index]),
        encode: { ...encode, size: 13 },
        style: {
          fill: stroke,
          fillOpacity: 0.14,
          stroke,
          strokeOpacity: 0.45,
          lineWidth: tokens.lineWidth ?? 1.5,
          opacity: annotation.style?.opacity ?? 1,
        },
      });
      foreground.push({
        ...common,
        type: 'point',
        data: unique.map((index) => data[index]),
        encode: {
          ...encode,
          size: 6,
        },
        style: {
          fill: stroke,
          fillOpacity: 1,
          stroke: backgroundColor,
          strokeOpacity: 1,
          lineWidth: tokens.lineWidth ?? 2.5,
          ...annotation.style,
        },
        labels: labels?.map((label) => ({ ...label, connectorStroke: stroke })),
      });
    };

    switch (annotation.type) {
      case 'highlight': {
        if (annotation.fields !== undefined) {
          annotationError(annotation, 'line does not support field-level highlight.');
        }
        if (!annotation.data?.length) annotationError(annotation, 'highlight requires data.');
        addPoints(annotation.data.flatMap((reference) => matchData(data, reference, annotation)));
        break;
      }
      case 'point':
        addPoints([matchOne(data, annotation.data, annotation)]);
        break;
      case 'line': {
        checkValue(annotation.axis, annotation.value, annotation);
        foreground.push({
          ...common,
          type: annotation.axis === 'x' ? 'lineX' : 'lineY',
          data: [{ value: annotation.value }],
          encode: { [annotation.axis]: 'value' },
          style: {
            stroke: color,
            strokeOpacity: 0.6,
            lineWidth: tokens.lineWidth ?? 1,
            lineDash: [4, 4],
            ...annotation.style,
          },
          labels,
        });
        break;
      }
      case 'range': {
        const [start, end] = annotation.value;
        checkValue(annotation.axis, start, annotation);
        checkValue(annotation.axis, end, annotation);
        const ordered =
          annotation.axis === 'y' || numericTime
            ? (start as number) <= (end as number)
            : times.indexOf(start) <= times.indexOf(end);
        if (!ordered) annotationError(annotation, 'range endpoints must follow axis domain order.');
        background.push({
          ...common,
          type: annotation.axis === 'x' ? 'rangeX' : 'rangeY',
          data: [{ start, end }],
          encode: { [annotation.axis]: 'start', [`${annotation.axis}1`]: 'end' },
          style: { annotationKind: 'range', fill: color, fillOpacity: 0.055, ...annotation.style },
          labels,
        });
        break;
      }
      case 'difference': {
        const from = data[matchOne(data, annotation.from, annotation)];
        const to = data[matchOne(data, annotation.to, annotation)];
        if (from.group !== to.group) {
          annotationError(annotation, 'line difference currently requires the same series.');
        }
        foreground.push({
          ...common,
          type: 'link',
          data: [{ ...from, endTime: to.time, endValue: to.value }],
          encode: {
            x: 'time',
            y: 'value',
            x1: 'endTime',
            y1: 'endValue',
            ...(hasGroups ? { color: 'group' } : {}),
          },
          style: {
            shape: 'gptVisDifference',
            annotationKind: 'difference',
            annotationLane: comparisonLane,
            stroke: palette[groups.indexOf(from.group) % palette.length] ?? color,
            lineWidth: tokens.lineWidth ?? 1.5,
            lineJoin: 'round',
            lineCap: 'round',
            ...annotation.style,
          },
          labels: labels?.map((label) => ({
            ...label,
            annotationLane: comparisonLane,
            fontWeight: annotation.label.style?.fontWeight ?? theme.label?.fontWeight ?? 600,
          })),
        });
        comparisonLane++;
        break;
      }
      default:
        annotationError(annotation, 'unsupported line annotation type.');
    }
  }
  return {
    background,
    foreground,
    library: { 'shape.link.gptVisDifference': DifferenceShape },
    labelTransform: annotations.length ? [{ type: AnnotationLabels }] : [],
    insetTop: comparisonLane
      ? Math.max(
          84,
          Number(theme.label?.lineHeight ?? theme.label?.fontSize ?? 12) +
            (tokens.spacingSmall ?? 7) * 2 +
            56,
        ) +
        Math.max(0, comparisonLane - 1) * 34
      : annotations.some((annotation) => annotation.label)
        ? 40
        : annotations.length
          ? 16
          : 0,
  };
}
