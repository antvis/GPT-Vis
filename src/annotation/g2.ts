import type {
  Chart,
  Filter,
  G2Context,
  G2Spec,
  MarkComponent,
  ShapeComponent,
  SingleMark,
} from '@antv/g2';
import { getAnnotationStyle } from '../theme/annotation';
import type { getThemeObject } from '../theme/g2';
import type { AnnotationData, PrimitiveAnnotation } from '../types/annotation';
import { placeLabel, routeLeader, type Box, type Segment } from './layout';
import { createPointPulse, hasPointAt, type Point } from './shared';

type View = NonNullable<G2Context['views']>[number];
type MarkOptions = NonNullable<Parameters<MarkComponent>[0]>;
type MarkElement = ReturnType<ReturnType<ShapeComponent>> & {
  markType: unknown;
  __data__: { points: Point[] };
  __removed__?: boolean;
};

/** Original fields and data remain internal to the renderer adapter. */
interface Mapping<T extends object> {
  x: keyof T & string;
  y: keyof T & string;
  data: T[];
  interval?: boolean;
}

function axisValue(scale: View['scale'][string], value: unknown, center = true) {
  const { domain, type } = scale.getOptions();
  if ((type === 'band' || type === 'point' || type === 'ordinal') && !domain.includes(value))
    throw new Error(`Invalid annotation: unknown category ${String(value)}.`);
  return Number(scale.map(value)) + (center ? (scale.getBandWidth?.(value) ?? 0) / 2 : 0);
}

/** Use native mark geometry, shapes and label layout after resolving original-data anchors. */
export function bindAnnotations<T extends object>(
  chart: Chart,
  annotations: PrimitiveAnnotation<T>[] | undefined,
  mapping: Mapping<T>,
  appearance: ReturnType<typeof getThemeObject>,
): () => void {
  if (!annotations?.length) return () => {};
  const defaults = getAnnotationStyle(appearance);
  const library = chart.getContext().library!;
  const hasPoints = annotations.some(({ type }) => type === 'point');
  let pulse: ReturnType<typeof createPointPulse> | undefined;
  let disposed = false;
  let visibleData: T[] = [];
  let sourceGeometry: { data: T; points: Point[] }[] = [];
  let sourceScale: View['scale'];
  let plotWidth = 0;

  // G2 legend filtering runs before this transform; capture its current source rows.
  const capture = (): ReturnType<typeof Filter> => (index, mark) => {
    visibleData = index.map((i) => mark.data[i]);
    return [index, mark];
  };

  const onlyAxisFields = (data: object) =>
    Object.keys(data).every((key) => key === mapping.x || key === mapping.y);
  const position = (data: AnnotationData<T>, coordinate: View['coordinate']): Point | undefined => {
    const mapped = (row: AnnotationData<T>): Point => [
      axisValue(sourceScale.x, row[mapping.x]),
      axisValue(sourceScale.y, row[mapping.y]),
    ];
    if (data[mapping.x] !== undefined && data[mapping.y] !== undefined && onlyAxisFields(data))
      return mapped(data);
    const matches = mapping.data.filter((row) =>
      Object.entries(data).every(([key, value]) => row[key as keyof T] === value),
    );
    if (matches.length !== 1)
      throw new Error(
        `Invalid annotation: position matches ${matches.length} data objects; expected one.`,
      );
    const row = matches[0];
    const same = (datum: T) =>
      Object.entries(row).every(([key, value]) => datum[key as keyof T] === value);
    if (!visibleData.some(same)) return undefined;
    if (!mapping.interval) return mapped(row);
    const target = sourceGeometry.find(({ data }) => same(data));
    if (!target) return undefined;
    const [a, b] = target.points;
    // Invert the actual interval endpoint, retaining stack, dodge and transpose.
    return coordinate.invert([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]) as Point;
  };

  const marks: MarkOptions[] = annotations.map((annotation) => {
    const isPath = annotation.type === 'line' && Array.isArray(annotation.data);
    const axis = !Array.isArray(annotation.data) && annotation.data[mapping.x] !== undefined;
    let nativeType: keyof typeof appearance.theme;
    if (annotation.type === 'line') nativeType = isPath ? 'line' : axis ? 'lineX' : 'lineY';
    else if (annotation.type === 'range')
      nativeType =
        annotation.data[mapping.x] && annotation.data[mapping.y]
          ? 'range'
          : axis
            ? 'rangeX'
            : 'rangeY';
    else nativeType = annotation.type === 'connector' ? 'link' : annotation.type;
    const native = library[`mark.${nativeType}`] as MarkComponent;
    const stroke =
      'stroke' in annotation ? (annotation.stroke ?? defaults.stroke) : defaults.stroke;
    const lineWidth =
      annotation.type === 'text'
        ? 0
        : (annotation.lineWidth ?? defaults.lineWidth[annotation.type]);
    let arrowSize = 0;
    const type: MarkComponent = (options) => {
      const geometry = native(options) as SingleMark;
      return (_index, scale, value, coordinate) => {
        if (disposed) return [[], []];
        if (annotation.type === 'range') {
          if (!onlyAxisFields(annotation.data))
            throw new Error('Invalid annotation: range only accepts axis fields.');
          const x = annotation.data[mapping.x];
          const y = annotation.data[mapping.y];
          const bounds = (values: unknown[] | undefined, scale: View['scale'][string]) => {
            if (!values) return [0, 1];
            const a = axisValue(scale, values[0], false);
            const b = axisValue(scale, values[1], false);
            const end = scale.getBandWidth?.(values[a < b ? 1 : 0]) ?? 0;
            return [Math.min(a, b), Math.max(a, b) + end];
          };
          const [x0, x1] = bounds(x, sourceScale.x);
          const [y0, y1] = bounds(y, sourceScale.y);
          return geometry(
            [0],
            scale,
            { ...value, x: [x0], x1: [x1], y: [y0], y1: [y1] },
            coordinate,
          );
        }
        if (annotation.type === 'line' && !Array.isArray(annotation.data)) {
          const x = annotation.data[mapping.x];
          const y = annotation.data[mapping.y];
          return geometry(
            [0],
            scale,
            {
              ...value,
              x: [x === undefined ? 0 : axisValue(sourceScale.x, x)],
              y: [y === undefined ? 0 : axisValue(sourceScale.y, y)],
            },
            coordinate,
          );
        }
        const data = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
        const positions = data.map((datum) => position(datum, coordinate));
        if (
          (annotation.type === 'line' || annotation.type === 'connector') &&
          positions.some((p) => !p)
        )
          return [[], []];
        if (annotation.type === 'connector') {
          const [from, to] = positions as Point[];
          const a = coordinate.map(from);
          const b = coordinate.map(to);
          arrowSize = Math.min(
            Math.hypot(a[0] - b[0], a[1] - b[1]) * 0.35,
            Math.max(8, lineWidth * 3),
          );
          return geometry(
            [0],
            scale,
            { ...value, x: [from[0]], y: [from[1]], x1: [to[0]], y1: [to[1]] },
            coordinate,
          );
        }
        return geometry(
          positions.flatMap((point, i) => (point ? [i] : [])),
          scale,
          { ...value, x: positions.map((p) => p?.[0] ?? 0), y: positions.map((p) => p?.[1] ?? 0) },
          coordinate,
        );
      };
    };
    // Function marks need the native shape defaults normally selected by mark name.
    const shapeName = annotation.type === 'point' ? defaults.shape : native.props!.defaultShape!;
    const shape = native.props!.shape![shapeName];
    const themedShape: ShapeComponent = (options, context) => {
      const draw = shape(options, context);
      return (points, value) => {
        const element = draw(points, value, {
          color: appearance.theme.color,
          ...(appearance.theme[nativeType]?.[shapeName] ??
            appearance.theme[nativeType]?.[native.props!.defaultShape!]),
        });
        element.setAttribute('annotationKind', annotation.type);
        if (annotation.type === 'point') {
          const [a, b] = points;
          const fill = annotation.fill;
          element.setAttribute('annotationPoint', {
            anchor: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2],
            size: annotation.size ?? defaults.size,
            color: fill && fill !== 'none' && fill !== 'transparent' ? fill : stroke,
            fill,
            stroke: annotation.stroke ?? defaults.pointStroke,
            pulse: annotation.pulse,
          });
        }
        return element;
      };
    };
    themedShape.props = shape.props;
    type.props = {
      ...native.props,
      defaultShape: shapeName,
      shape: { [shapeName]: themedShape },
    };
    const labelStyle = defaults.labels[annotation.type];
    const pointRadius =
      annotation.type === 'point'
        ? (annotation.size ?? defaults.size) * defaults.pulse.endScale
        : 0;
    const fontSize = annotation.labelFontSize ?? defaults.labelFontSize;
    const textStyle = {
      fill: annotation.labelFill ?? labelStyle.fill,
      fontFamily: defaults.fontFamily,
      fontSize,
      fontWeight: labelStyle.fontWeight,
      lineHeight: Math.ceil(fontSize * 1.5),
      wordWrap: true,
      wordWrapWidth: () =>
        Math.max(fontSize, Math.min(labelStyle.maxWidth, plotWidth) - labelStyle.padding[1] * 2),
      maxLines: Infinity,
      textOverflow: 'clip',
      pointerEvents: 'none',
    };
    return {
      type,
      data: Array.isArray(annotation.data) ? annotation.data : [annotation.data],
      encode: {
        x: () => 0,
        y: () => 0,
        ...(annotation.type === 'point' ? { size: annotation.size ?? defaults.size } : {}),
        ...(annotation.type === 'text' ? { text: () => annotation.label } : {}),
      },
      // Resolved normalized positions never contribute to the main-axis domains.
      scale: {
        x: { type: 'linear', domain: [0, 1], range: [0, 1], key: 'annotation-x' },
        y: { type: 'linear', domain: [0, 1], range: [0, 1], key: 'annotation-y' },
        color: { key: 'annotation-color' },
        size: { type: 'identity' },
      },
      axis: false,
      legend: false,
      tooltip: false,
      animate: false,
      zIndex: annotation.type === 'range' ? -1 : 0,
      style: {
        pointerEvents: 'none',
        stroke,
        lineWidth,
        fill: 'none',
        ...('lineDash' in annotation ? { lineDash: annotation.lineDash } : {}),
        ...(annotation.type === 'point'
          ? {
              shape: defaults.shape,
              stroke: annotation.stroke ?? defaults.pointStroke,
              fill: annotation.fill ?? 'transparent',
            }
          : {}),
        ...(annotation.type === 'range'
          ? {
              fill: annotation.fill ?? stroke,
              fillOpacity: annotation.fillOpacity ?? defaults.fillOpacity,
            }
          : {}),
        // G2 connector draws an elbow; link with an arrow matches our directional segment.
        ...(annotation.type === 'connector'
          ? { arrow: true, arrowSize: () => arrowSize, lineCap: 'round', lineJoin: 'round' }
          : {}),
        ...(annotation.type === 'text'
          ? { ...textStyle, textAlign: 'center', textBaseline: 'middle', stroke: 'none' }
          : {}),
      },
      labels:
        annotation.type !== 'text' && annotation.label !== undefined
          ? [
              {
                text: () => annotation.label,
                annotationLabel: annotation.type,
                annotationGap: labelStyle.gap + pointRadius,
                ...textStyle,
                position: annotation.type === 'connector' ? 'inside' : 'top',
                textAlign: 'center',
                textBaseline: 'bottom',
                dx: 0,
                dy: -labelStyle.gap - labelStyle.padding[0] - pointRadius,
                ...(isPath ? { selector: 'last' } : {}),
                background: true,
                backgroundFill: labelStyle.background,
                backgroundFillOpacity: labelStyle.backgroundOpacity,
                backgroundStroke: labelStyle.border,
                backgroundStrokeOpacity: labelStyle.borderOpacity,
                backgroundLineWidth: 1,
                backgroundPadding: labelStyle.padding,
                backgroundRadius: labelStyle.radius,
                connectorStroke: stroke,
                connectorLineWidth: 1,
                connectorFill: 'none',
              },
            ]
          : [],
    };
  });

  // Layout attached labels together. Standalone text retains its supplied position.
  const layoutLabels = (): View['labelTransform'] => (labels, context) => {
    if (disposed) return labels;
    const attached = labels.filter((label) => label.getAttribute('annotationLabel'));
    // Native updates reuse labels; reset the previous leader before measuring the new layout.
    for (const label of attached) {
      label.attr({
        x0: Number(label.style.x),
        y0: Number(label.style.y),
        connector: false,
        connectorPoints: [],
      });
      label.getElementById('connector')!.style.lineWidth = 0;
      // Place point cards beside their source when there is horizontal room.
      if (label.getAttribute('annotationLabel') !== 'point') continue;
      const { min, max } = label.getElementById('background')!.getLocalBounds();
      const gap = Number(label.getAttribute('annotationGap'));
      const right = Number(label.style.x) + gap + max[0] - min[0] <= plotWidth;
      const left = Number(label.style.x) - gap - (max[0] - min[0]) >= 0;
      if (!right && !left) continue;
      label.attr({
        textAlign: right ? 'left' : 'right',
        dx: (right ? 1 : -1) * (gap + defaults.labels.point.padding[1]),
      });
    }
    const anchors = new Map(
      attached.map((label) => [label, [Number(label.style.x), Number(label.style.y)]]),
    );
    library['labelTransform.overlapDodgeY']({ padding: 4 })(attached, context);
    library['labelTransform.exceedAdjust']({ bounds: 'main' })(attached, context);
    const boxes: Box[] = [];
    const segments: Segment[] = [];
    for (const element of context.canvas.document.querySelectorAll('.element') as MarkElement[]) {
      const kind = element.getAttribute('annotationKind');
      if (kind === 'range' || element.__removed__) continue;
      const points = element.__data__.points;
      if (
        kind === 'line' ||
        kind === 'connector' ||
        (!kind && source.type === 'line' && element.nodeName === 'path')
      ) {
        points.slice(1).forEach((point, index) => segments.push([points[index], point]));
        continue;
      }
      const point = element.getAttribute('annotationPoint');
      if (point) {
        const radius = point.size * defaults.pulse.endScale;
        boxes.push({
          x: point.anchor[0] - radius,
          y: point.anchor[1] - radius,
          width: radius * 2,
          height: radius * 2,
        });
      } else {
        const { min, max } = element.getLocalBounds();
        boxes.push({ x: min[0], y: min[1], width: max[0] - min[0], height: max[1] - min[1] });
      }
    }
    // Data labels remain fixed too. Standalone text is collected above as a native element.
    for (const label of labels.filter((label) => !label.getAttribute('annotationLabel'))) {
      const { min, max } = label.getElementById('background')!.getLocalBounds();
      boxes.push({
        x: Number(label.style.x) + min[0],
        y: Number(label.style.y) + min[1],
        width: max[0] - min[0],
        height: max[1] - min[1],
      });
    }
    const cards = attached.map((label) => {
      const anchor = anchors.get(label)! as Point;
      const { min, max } = label.getElementById('background')!.getLocalBounds();
      const box = placeLabel(
        anchor,
        [max[0] - min[0], max[1] - min[1]],
        context.coordinate.getSize() as Point,
        Number(label.getAttribute('annotationGap')),
        boxes,
        segments,
        [Number(label.style.x) + min[0], Number(label.style.y) + min[1]],
      );
      label.attr({ x: box.x - min[0], y: box.y - min[1] });
      boxes.push(box);
      return { label, anchor, box };
    });
    for (const {
      label,
      anchor: [x0, y0],
      box,
    } of cards) {
      const route = routeLeader([x0, y0], box, boxes, segments);
      const relative = route.map(([x, y]) => [
        x - Number(label.style.x),
        y - Number(label.style.y),
      ]);
      const edge = relative.at(-1) ?? [0, 0];
      label.attr({
        x0,
        y0,
        connector: route.length > 0,
        connectorPoints: [edge, edge],
      });
      // Keep the native connector shape, using the route selected against measured obstacles.
      label.getElementById('connector')!.setAttribute(
        'd',
        relative.map(([x, y], index) => [index ? 'L' : 'M', x, y]),
      );
      route.slice(1).forEach((point, index) => segments.push([route[index], point]));
    }
    // This native hook also runs on local view updates such as legend filtering.
    if (hasPoints) updatePoints();
    return labels;
  };
  const options = chart.options() as MarkOptions;
  let baseMarks: MarkOptions[];
  let viewOptions;
  if (options.type === 'view') {
    const { data, encode, scale, transform = [], children, ...rest } = options;
    baseMarks = (children as MarkOptions[]).map((mark) => ({
      ...mark,
      data: mark.data ?? data,
      encode: { ...encode, ...mark.encode },
      scale: { ...scale, ...mark.scale },
      transform: [...transform, ...(mark.transform ?? [])],
    }));
    viewOptions = rest;
  } else {
    const {
      type,
      data,
      encode,
      scale,
      transform,
      style,
      labels,
      tooltip,
      state,
      animate,
      ...rest
    } = options;
    baseMarks = [{ type, data, encode, scale, transform, style, labels, tooltip, state, animate }];
    viewOptions = rest;
  }
  const source = baseMarks[0];
  library['transform.annotationSource'] = capture;
  source.transform = [...(source.transform ?? []), { type: 'annotationSource' }];
  source.children = (data: typeof sourceGeometry, scale: View['scale'], layout: View['layout']) => {
    sourceGeometry = data;
    sourceScale = scale;
    plotWidth = layout.innerWidth!;
    return [];
  };
  chart.options({
    ...viewOptions,
    type: 'view',
    children: [...baseMarks, ...marks],
    labelTransform: [...(options.labelTransform ?? []), { type: layoutLabels }],
  } as G2Spec);
  const updatePoints = () => {
    if (disposed) return;
    const scene = chart.getContext().canvas!.document;
    pulse ??= createPointPulse(scene, defaults.pulse, updatePoints);
    pulse.clear();
    // Native exit elements remain mounted until their transition cleanup finishes.
    const elements = (scene.querySelectorAll('.element') as MarkElement[]).filter(
      (element) => !element.__removed__,
    );
    // Inspect rendered markers, including a line view's optional point layer.
    const centers = elements.flatMap((element): Point[] => {
      if (element.markType !== 'point' || !element.isVisible()) return [];
      const { halfExtents } = element.getLocalBounds();
      if (!halfExtents[0] && !halfExtents[1]) return [];
      const { points } = element.__data__;
      const a = points[0],
        b = points.at(-1)!;
      return [[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]];
    });
    for (const element of elements) {
      const point = element.getAttribute('annotationPoint');
      if (!point) continue;
      const { anchor, size, color, fill, stroke } = point;
      const covered = fill === undefined && hasPointAt(centers, anchor);
      element.setAttribute('fill', fill ?? (covered ? 'transparent' : color));
      element.setAttribute('stroke', covered ? 'transparent' : stroke);
      pulse.add(element.parentNode!, anchor, size, color, point.pulse);
    }
  };
  const cleanup = () => {
    disposed = true;
    delete library['transform.annotationSource'];
    chart.off('beforedestroy', cleanup);
    pulse?.destroy();
  };
  chart.on('beforedestroy', cleanup);
  return cleanup;
}
