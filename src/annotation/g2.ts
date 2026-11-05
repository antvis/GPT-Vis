import { corelib, type Mark, type ShapeComponent } from '@antv/g2';
import type { getThemeObject } from '../theme/g2';
import type {
  Annotation,
  AnnotationAxis,
  AnnotationValue,
  HighlightAnnotation,
} from '../types/annotation';
import type { ColumnDataItem } from '../vis/column';
import type { LineDataItem } from '../vis/line';
import {
  cardAttachment,
  crosses,
  differenceRoute,
  inflate,
  intersects,
  overlap,
  placeLabel,
  type Box,
  type Point,
  type Segment,
} from './layout';
import { annotationError, matchData, matchOne } from './shared';

type AnnotationTheme = ReturnType<typeof getThemeObject>['annotation'];

/** Reserve an unused series color for emphasis; derive a tone when the palette is exhausted. */
function getHighlightColor(data: (LineDataItem | ColumnDataItem)[], appearance: AnnotationTheme) {
  const palette = appearance.palette;
  const groups = Array.from(new Set(data.map((datum) => datum.group)));
  const used = groups.map((_, index) => palette[index % palette.length]);
  const accent = palette.find((color) => !used.includes(color));
  return (datum: LineDataItem | ColumnDataItem) =>
    accent ??
    corelib()
      ['scale.linear']({
        domain: [0, 1],
        range: [palette[groups.indexOf(datum.group) % palette.length], appearance.textColor],
      })
      .map(0.45);
}

function differencePath(route: ReturnType<typeof differenceRoute>) {
  const [end, previous] = route.points.slice(-2).reverse();
  const angle = Math.atan2(end[1] - previous[1], end[0] - previous[0]);
  const arrow = [-0.55, 0.55].map((turn) => [
    end[0] - Math.cos(angle + turn) * 7,
    end[1] - Math.sin(angle + turn) * 7,
  ]);
  return (
    route.points.map(([x, y], index) => `${index ? 'L' : 'M'}${x},${y}`).join(' ') +
    ` M${arrow[0]} L${end} L${arrow[1]}`
  );
}

/** A measurement bracket stays separate from the series and terminates in a small arrow. */
const DifferenceShape: ShapeComponent =
  (options = {}, context) =>
  (points) => {
    const { annotationLane = 0, ...style } = options;
    const d = differencePath(
      differenceRoute(
        points[0],
        points[1],
        Number(annotationLane),
        Boolean(style.annotationTranspose),
      ),
    );
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
    const elements = canvas.document.getElementsByClassName('element') as unknown as Graphic[];
    const anchors = new Map<number, Point>();
    const barBounds = new Map<number, Box>();
    for (const element of elements) {
      const index = element.attr('annotationIndex');
      if (index === undefined || element.attr('visibility') === 'hidden') continue;
      const points = (element as unknown as { __data__: { points: Point[] } }).__data__.points;
      const xs = points.map(([x]) => x);
      const ys = points.map(([, y]) => y);
      const box = {
        x: Math.min(...xs),
        y: Math.min(...ys),
        width: Math.max(...xs) - Math.min(...xs),
        height: Math.max(...ys) - Math.min(...ys),
      };
      const negative = element.attr('annotationNegative');
      barBounds.set(index, box);
      anchors.set(
        index,
        element.attr('annotationTranspose')
          ? [negative ? box.x : box.x + box.width, box.y + box.height / 2]
          : [box.x + box.width / 2, negative ? box.y + box.height : box.y],
      );
      occupied.push(inflate(box, 2));
    }
    const resolveComparison = (graphic: Graphic) => {
      if (graphic.attr('annotationFrom') === undefined) return;
      const from = anchors.get(graphic.attr('annotationFrom'));
      const to = anchors.get(graphic.attr('annotationTo'));
      graphic.attr('visibility', from && to ? 'visible' : 'hidden');
      if (from && to)
        (graphic as unknown as { __data__: { points: Point[] } }).__data__.points = [from, to];
    };
    const comparisonRoute = (graphic: Graphic) => {
      const points = (graphic as unknown as { __data__: { points: Point[] } }).__data__.points;
      const from = barBounds.get(graphic.attr('annotationFrom'));
      const to = barBounds.get(graphic.attr('annotationTo'));
      return differenceRoute(
        points[0],
        points[1],
        Number(graphic.attr('annotationLane') ?? 0),
        Boolean(graphic.attr('annotationTranspose')),
        from && to ? [from, to] : undefined,
        bounds,
      );
    };
    for (const item of elements) {
      const element = item as unknown as Graphic;
      if (element.attr('annotationKind') === 'referenceArea') continue;
      resolveComparison(element);
      if (element.attr('visibility') === 'hidden') continue;
      const points =
        (element as unknown as { __data__?: { points?: Point[] } }).__data__?.points ?? [];
      if (element.attr('annotationKind') === 'difference' && points.length === 2) {
        const route = comparisonRoute(element);
        if (element.attr('annotationFrom') !== undefined) {
          element.attr('d', differencePath(route));
        }
        route.points
          .slice(1)
          .forEach((point, index) => segments.push([route.points[index], point]));
        continue;
      }
      points.slice(1).forEach((point, index) => segments.push([points[index], point]));
    }
    labels.forEach((label) => {
      resolveComparison(label);
      // G2's label group does not propagate text visibility to its background.
      if (label.attr('visibility') === 'hidden') label.remove();
    });
    const active = labels.filter((label) => label.attr('visibility') !== 'hidden');
    const callouts = active.filter((label) => label.attr('annotationKind') === 'highlight');
    for (const label of callouts) {
      const [x, y] =
        anchors.get(label.attr('annotationIndex')) ??
        (label as unknown as { __data__: { points: Point[] } }).__data__.points[0];
      occupied.push({ x: x - 13, y: y - 13, width: 26, height: 26 });
    }
    const obstacles = [...occupied];
    // Measurement and reference labels establish the guides; callouts use the remaining whitespace.
    const order = { difference: 0, referenceLine: 1, referenceArea: 2, highlight: 3 };
    const sorted = [...active].sort(
      (a, b) =>
        (order[a.attr('annotationKind') as keyof typeof order] ?? 4) -
        (order[b.attr('annotationKind') as keyof typeof order] ?? 4),
    );
    for (const label of sorted) {
      const kind = label.attr('annotationKind');
      if (!kind) continue;
      const callout = kind === 'highlight';
      label.attr(
        'wordWrapWidth',
        Math.min(
          156,
          Math.max(
            48,
            (callout
              ? bounds.width * (label.attr('annotationTranspose') ? 0.3 : 0.5)
              : bounds.width) - 32,
          ),
        ),
      );
      const points = (label as unknown as { __data__: { points: Point[] } }).__data__.points;
      const card = label.getElementById('background');
      if (!card || !points.length) continue;
      const { min, max } = card.getBounds();
      const size = { width: max[0] - min[0], height: max[1] - min[1] };
      let anchor: Point = anchors.get(label.attr('annotationIndex')) ?? points[0];
      let box: Box;
      if (kind === 'difference') {
        const route = comparisonRoute(label);
        anchor = route.label;
        box = { x: anchor[0] - size.width / 2, y: anchor[1] - size.height - 8, ...size };
        if (route.side) {
          box.x =
            anchor[0] < Math.min(points[0][0], points[1][0])
              ? anchor[0] - size.width - 8
              : anchor[0] + 8;
        }
      } else if (kind === 'referenceLine') {
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
      } else if (kind === 'referenceArea') {
        const minX = Math.min(...points.map(([x]) => x));
        const maxX = Math.max(...points.map(([x]) => x));
        const minY = Math.min(...points.map(([, y]) => y));
        const horizontal = label.attr('annotationAxis') === 'y';
        const rectangle = label.attr('annotationAxis') === undefined;
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
              y: rectangle ? top : bounds.y,
              width: Math.max(size.width, maxX - minX),
              height: Math.min(
                bounds.y + bounds.height - (rectangle ? top : bounds.y),
                size.height * 4 + 48,
              ),
            };
        box = placeLabel(
          horizontal ? [bounds.x, minY] : [(minX + maxX) / 2, rectangle ? minY : bounds.y],
          size,
          band,
          occupied,
          segments,
          size.height + 8,
        );
        if (horizontal) anchor = [box.x + box.width / 2, minY];
        if (rectangle) anchor = [Math.max(minX, Math.min(box.x + box.width / 2, maxX)), minY];
      } else {
        // Let native dodge separate callouts before checking data and connector obstacles.
        box = { x: anchor[0] + 16, y: anchor[1] - size.height - 16, ...size };
      }
      const center: Point = [box.x + box.width / 2, box.y + box.height / 2];
      label.attr({
        x: center[0],
        y: center[1],
        x0: anchor[0],
        y0: anchor[1],
        connector: false,
      });
      if (!callout) occupied.push(inflate(box, 6));
    }
    dodge(callouts, context);
    adjust(sorted, context);
    // Repair data/guide collisions once, after native label and boundary adjustment.
    const guides = sorted.filter((label) => !callouts.includes(label));
    const placed = [...obstacles, ...guides.map((label) => inflate(labelBox(label), 6))];
    for (const label of callouts) {
      let box = labelBox(label);
      const anchor: Point = [Number(label.attr('x0')), Number(label.attr('y0'))];
      const leader: Segment = [anchor, cardAttachment(anchor, box)];
      if (
        placed.some((other) => overlap(inflate(box, 6), other) || crosses(other, leader)) ||
        segments.some((segment) => crosses(inflate(box, 6), segment) || intersects(leader, segment))
      ) {
        box = placeLabel(anchor, box, bounds, placed, segments, 16, true);
        label.attr({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
      }
      placed.push(inflate(box, 6));
      segments.push([anchor, cardAttachment(anchor, box)]);
      const x = Number(label.attr('x'));
      const y = Number(label.attr('y'));
      const attachment = cardAttachment(anchor, box);
      label.attr({
        connector: true,
        connectorPoints: [attachment, attachment].map(([px, py]) => [px - x, py - y]),
      });
    }
    return labels;
  };
};

function getAnnotationLabels(
  annotation: Annotation,
  appearance: AnnotationTheme,
  transpose = false,
) {
  let axis: AnnotationAxis | undefined;
  if (annotation.type === 'referenceLine') axis = annotation.axis;
  if (annotation.type === 'referenceArea' && !(annotation.x && annotation.y)) {
    axis = annotation.x ? 'x' : 'y';
  }
  return annotation.label
    ? [
        {
          ...appearance.labels[annotation.type],
          text: () => annotation.label!.text,
          position: 'inside',
          textAlign: 'center',
          textBaseline: 'middle',
          connector: false,
          connectorZIndex: -2,
          annotationKind: annotation.type,
          annotationTranspose: transpose,
          // Constant channel names must not be interpreted as data field accessors.
          annotationAxis: () => (transpose && axis ? (axis === 'x' ? 'y' : 'x') : axis),
          ...annotation.label.style,
        },
      ]
    : undefined;
}

/** Native cartesian guides and line highlights share the chart scales. */
export function getCartesianAnnotations(
  data: (LineDataItem | ColumnDataItem)[],
  annotations: Annotation[],
  appearance: AnnotationTheme,
  { interval = false, transpose = false, stack = false } = {},
): {
  background: Mark[];
  foreground: Mark[];
  library: Record<string, ShapeComponent>;
  labelTransform: { type: typeof AnnotationLabels }[];
  insetTop: number;
} {
  const background: Mark[] = [];
  const foreground: Mark[] = [];
  const palette = appearance.palette;
  const color = palette[0];
  let comparisonLane = 0;
  const groups = Array.from(new Set(data.map((datum) => datum.group)));
  const highlightColor = getHighlightColor(data, appearance);
  const xValue = (datum: LineDataItem | ColumnDataItem) =>
    'time' in datum ? datum.time : datum.category;
  const times = Array.from(new Set(data.map(xValue)));
  const hasGroups = data.some((datum) => datum.group !== undefined);
  const numericTime = data.length > 0 && times.every((value) => typeof value === 'number');

  const checkValue = (axis: 'x' | 'y', value: AnnotationValue, annotation: Annotation) => {
    if (axis === 'y' || numericTime) {
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        annotationError(annotation, `${axis} requires a finite number.`);
      }
    } else if (!times.includes(value)) {
      annotationError(
        annotation,
        `x value must exist in the ${interval ? 'category' : 'time'} domain.`,
      );
    }
  };

  for (const annotation of annotations) {
    const labels = getAnnotationLabels(annotation, appearance, transpose);
    const common = { animate: false, tooltip: false } as const;
    switch (annotation.type) {
      case 'highlight': {
        if (annotation.fields !== undefined) {
          annotationError(annotation, 'line does not support field-level highlight.');
        }
        if (!annotation.data?.length) annotationError(annotation, 'highlight requires data.');
        const indices = annotation.data.flatMap((reference) =>
          matchData(data, reference, annotation),
        );
        const unique = Array.from(new Set(indices));
        const fill = (datum: LineDataItem | ColumnDataItem) =>
          annotation.style?.fill ?? highlightColor(datum);
        const stroke = (datum: LineDataItem | ColumnDataItem) =>
          annotation.style?.stroke ?? fill(datum);
        const encode = { x: 'time', y: 'value', ...(hasGroups ? { color: 'group' } : {}) };
        foreground.push({
          ...common,
          type: 'point',
          data: unique.map((index) => data[index]),
          encode: { ...encode, size: appearance.highlight.haloSize },
          style: {
            ...appearance.highlight.halo,
            fill,
            stroke,
            opacity: annotation.style?.opacity ?? appearance.highlight.halo.opacity,
          },
        });
        foreground.push({
          ...common,
          type: 'point',
          data: unique.map((index) => data[index]),
          encode: {
            ...encode,
            size: appearance.highlight.pointSize,
          },
          style: {
            ...appearance.highlight.point,
            fill,
            ...annotation.style,
          },
          labels: labels?.map((label) => ({
            ...label,
            connectorStroke: stroke,
          })),
        });
        break;
      }
      case 'referenceLine': {
        checkValue(annotation.axis, annotation.value, annotation);
        foreground.push({
          ...common,
          type: annotation.axis === 'x' ? 'lineX' : 'lineY',
          data: [{ value: annotation.value }],
          encode: { [annotation.axis]: 'value' },
          style: {
            ...appearance.referenceLine,
            ...(interval && annotation.axis === 'x' && { bandOffset: 0.5 }),
            ...annotation.style,
          },
          labels,
        });
        break;
      }
      case 'referenceArea': {
        const axes = (['x', 'y'] as const).filter((axis) => annotation[axis] !== undefined);
        if (!axes.length) annotationError(annotation, 'referenceArea requires an x or y interval.');
        const area: Record<string, AnnotationValue> = {};
        const encode: Record<string, string> = {};
        for (const axis of axes) {
          const range = annotation[axis];
          if (!Array.isArray(range) || range.length !== 2) {
            annotationError(annotation, `${axis} reference area requires two endpoints.`);
          }
          const [start, end] = range;
          checkValue(axis, start, annotation);
          checkValue(axis, end, annotation);
          const ordered =
            axis === 'y' || numericTime
              ? (start as number) <= (end as number)
              : times.indexOf(start) <= times.indexOf(end);
          if (!ordered) {
            annotationError(
              annotation,
              `${axis} reference area endpoints must follow axis domain order.`,
            );
          }
          area[axis] = start;
          area[`${axis}1`] = end;
          encode[axis] = axis;
          encode[`${axis}1`] = `${axis}1`;
        }
        background.push({
          ...common,
          type: axes.length === 2 ? 'range' : axes[0] === 'x' ? 'rangeX' : 'rangeY',
          data: [area],
          encode,
          style: {
            annotationKind: 'referenceArea',
            ...appearance.referenceArea,
            ...(axes.length === 2 && appearance.referenceAreaBorder),
            ...annotation.style,
          },
          labels,
        });
        break;
      }
      case 'difference': {
        const from = data[matchOne(data, annotation.from, annotation)];
        const to = data[matchOne(data, annotation.to, annotation)];
        if (stack) annotationError(annotation, 'stacked charts do not support difference yet.');
        if (!interval && from.group !== to.group) {
          annotationError(annotation, 'line difference currently requires the same series.');
        }
        foreground.push({
          ...common,
          type: 'link',
          data: [{ ...from, endTime: xValue(to), endValue: to.value }],
          encode: {
            x: interval ? 'category' : 'time',
            y: 'value',
            x1: 'endTime',
            y1: 'endValue',
            ...(hasGroups ? { color: 'group' } : {}),
          },
          style: {
            shape: 'gptVisDifference',
            annotationKind: 'difference',
            annotationLane: comparisonLane,
            annotationTranspose: transpose,
            ...(interval && { annotationFrom: data.indexOf(from), annotationTo: data.indexOf(to) }),
            stroke: palette[groups.indexOf(from.group) % palette.length] ?? color,
            ...appearance.difference,
            ...annotation.style,
          },
          labels: labels?.map((label) => ({
            ...label,
            annotationLane: comparisonLane,
            annotationTranspose: transpose,
            ...(interval && { annotationFrom: data.indexOf(from), annotationTo: data.indexOf(to) }),
          })),
        });
        comparisonLane++;
        break;
      }
      default:
        annotationError(annotation, 'unsupported cartesian annotation type.');
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
          Number(appearance.labels.highlight.lineHeight ?? appearance.labels.highlight.fontSize) +
            appearance.labels.highlight.backgroundPadding[0] * 2 +
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

/** Emphasize native bars and attach labels to their actual dodged or stacked bounds. */
export function getIntervalAnnotations(
  data: ColumnDataItem[],
  annotations: Annotation[],
  appearance: AnnotationTheme,
  { transpose = false, stack = false } = {},
) {
  const highlights = annotations.filter(
    (annotation): annotation is HighlightAnnotation => annotation.type === 'highlight',
  );
  const marks = getCartesianAnnotations(
    data,
    annotations.filter((annotation) => annotation.type !== 'highlight'),
    appearance,
    { interval: true, transpose, stack },
  );
  const groups = Array.from(new Set(data.map((datum) => datum.group)));
  const palette = appearance.palette;
  const highlighted = new Set<ColumnDataItem>();
  const styles: Record<string, unknown>[] = data.map(() => ({}));
  const labels = highlights.flatMap((annotation) => {
    if (annotation.fields !== undefined) {
      annotationError(annotation, 'interval charts do not support field-level highlight.');
    }
    if (!annotation.data?.length) annotationError(annotation, 'highlight requires data.');
    const indices = new Set(
      annotation.data.flatMap((reference) => matchData(data, reference, annotation)),
    );
    for (const index of indices) {
      highlighted.add(data[index]);
      Object.assign(styles[index], annotation.style);
    }
    return (
      getAnnotationLabels(annotation, appearance, transpose)?.map((label) => ({
        ...label,
        connectorStroke: (datum: ColumnDataItem) =>
          annotation.style?.stroke ??
          annotation.style?.fill ??
          palette[groups.indexOf(datum.group) % palette.length],
        annotationIndex: (datum: ColumnDataItem) => data.indexOf(datum),
        visibility: (datum: ColumnDataItem) =>
          indices.has(data.indexOf(datum)) ? 'visible' : 'hidden',
      })) ?? []
    );
  });
  const properties = Array.from(new Set(styles.flatMap((style) => Object.keys(style))));
  return {
    library: marks.library,
    // G2's native spec type does not include registered annotation shapes/transforms.
    options: (base: any): any => {
      if (!annotations.length) return base;
      const {
        data,
        title,
        scale,
        coordinate,
        axis,
        legend,
        interaction,
        theme,
        marginRight,
        ...interval
      } = base;
      const inset = Math.max(marks.insetTop, labels.length ? 56 : 0);
      return {
        type: 'view',
        data,
        title,
        coordinate,
        axis,
        legend,
        interaction,
        theme,
        marginRight,
        scale: {
          ...scale,
          x: {
            type: 'band',
            domain: Array.from(new Set(data.map((datum: ColumnDataItem) => datum.category))),
          },
          ...(scale.color && { color: { ...scale.color, domain: groups } }),
          // Reserve comparison/callout space through the shared scale. G2's
          // transposed axes reverse asymmetric physical insets independently.
          ...(transpose && {
            y: {
              ...scale.y,
              range: [1, annotations.some((annotation) => annotation.label) ? 0.3 : 0],
            },
          }),
        },
        children: [
          ...marks.background,
          {
            ...interval,
            labels: [...interval.labels, ...labels],
            style: {
              ...interval.style,
              ...(highlighted.size && {
                fillOpacity: (datum: ColumnDataItem) =>
                  highlighted.has(datum) ? 1 : appearance.highlight.inactiveOpacity,
              }),
              ...Object.fromEntries(
                properties.map((key) => [
                  key,
                  (datum: ColumnDataItem, index: number, ...rest: any[]) =>
                    styles[data.indexOf(datum)][key] ??
                    (typeof interval.style[key] === 'function'
                      ? interval.style[key](datum, index, ...rest)
                      : interval.style[key]),
                ]),
              ),
              annotationIndex: (datum: ColumnDataItem) => data.indexOf(datum),
              annotationNegative: (datum: ColumnDataItem) => datum.value < 0,
              annotationTranspose: transpose,
            },
          },
          ...marks.foreground,
        ],
        labelTransform: [{ type: AnnotationLabels }],
        insetTop: transpose ? 0 : inset,
        insetBottom:
          !transpose && labels.length && data.some((datum: ColumnDataItem) => datum.value < 0)
            ? 48
            : 0,
        insetRight: transpose ? 0 : 24,
      };
    },
  };
}
