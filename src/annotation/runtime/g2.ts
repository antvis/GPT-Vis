import type {
  Chart,
  Filter,
  G2Context,
  G2Spec,
  MarkComponent,
  ShapeComponent,
  SingleMark,
} from '@antv/g2';
import { getAnnotationStyle } from '../../theme/annotation';
import type { getThemeObject } from '../../theme/g2';
import type { ChartType } from '../../types';
import type { Annotation, AnnotationData } from '../../types/annotation';
import { drawLabelColors } from '../label';
import { placeLabel, routeLeader, type Box, type Point, type Segment } from '../layout';
import type { RendererAnnotation } from '../registry';
import { renderAnnotations } from '../registry';
import type { AnnotationBindingOptions } from './index';

type View = NonNullable<G2Context['views']>[number];
export type MarkOptions = NonNullable<Parameters<MarkComponent>[0]>;
export type Scene = NonNullable<Parameters<ShapeComponent>[1]>['document'];
type Shape = ReturnType<ReturnType<ShapeComponent>>;
/** Rendering stays independent of the growing set of public analysis configurations. */
type MarkAnnotation<T extends object> =
  | Extract<Annotation<T>, { type: 'path' | 'range' | 'connector' | 'point' | 'text' }>
  | Extract<RendererAnnotation<T, 'g2'>, { type: 'highlight' }>;
export type MarkElement = Shape & {
  markType: unknown;
  __data__: { points: Point[]; data?: object; seriesIndex?: number[] };
  __removed__?: boolean;
};

export type LabelElement = Shape & {
  __data__: { dependentElement?: MarkElement };
};

export interface G2AnnotationContext<T extends object> {
  chartType: ChartType;
  defaults: ReturnType<typeof getAnnotationStyle>;
  sourceMarks: MarkOptions[];
  /** Original fields and data remain internal to the chart runtime. */
  mapping: {
    x: keyof T & string;
    y: keyof T & string;
    data: T[];
    interval?: boolean;
    series?: keyof T & string;
  };
  position(
    data: AnnotationData<T>,
    coordinate: View['coordinate'],
    observation?: boolean,
  ): Point | undefined;
  color(data: AnnotationData<T>): string;
  axisValue(axis: 'x' | 'y', value: unknown, center?: boolean): number;
  bandWidth(axis: 'x' | 'y', value: unknown): number;
  onlyAxisFields(data: object): boolean;
  createMark(annotation: MarkAnnotation<T>, definition: G2MarkDefinition): MarkOptions;
  getTextStyle(
    annotation: MarkAnnotation<T>,
  ): Record<string, unknown> & { wordWrapWidth(): number };
  getScene(): Scene;
  getSourceData(element: MarkElement): T[];
  getCoordinate(): View['coordinate'];
}

interface G2MarkDefinition {
  nativeType: keyof ReturnType<typeof getThemeObject>['theme'];
  geometry(native: SingleMark): SingleMark;
  shape?: string;
  draw?: (scene: Scene) => Shape;
  decorate?: (element: Shape, points: number[][]) => void;
  style: Record<string, unknown>;
  encode?: MarkOptions['encode'];
  label?: Record<string, unknown> | false;
  labelGap?: number;
  zIndex?: number;
  clip?: boolean;
}

function axisValue(scale: View['scale'][string], value: unknown, center = true) {
  const { domain, type } = scale.getOptions();
  if ((type === 'band' || type === 'point' || type === 'ordinal') && !domain.includes(value))
    throw new Error(`Invalid annotation: unknown category ${String(value)}.`);
  return Number(scale.map(value)) + (center ? (scale.getBandWidth?.(value) ?? 0) / 2 : 0);
}

/** A stateless factory can be shared; each mark carries its own capture callback. */
const annotationSource = ({ capture }: { capture: ReturnType<typeof Filter> }) => capture;

/** Replace annotation declarations rather than deep-merging stale styles and mark types. */
function replaceOptions(chart: Chart, options: G2Spec) {
  chart.children = [];
  chart.map(() => ({}));
  chart.options(options);
}

export interface G2AnnotationOptions<T extends object> {
  renderer: 'g2';
  chartType: ChartType;
  chart: Chart;
  annotations?: RendererAnnotation<T, 'g2'>[];
  mapping: G2AnnotationContext<T>['mapping'];
  themeObject: ReturnType<typeof getThemeObject>;
}

/** Bind native marks, source coordinates and shared label layout to a G2 chart. */
export function bindAnnotations<T extends object>(
  binding: AnnotationBindingOptions<T>,
): (() => void) | undefined {
  if (binding.renderer !== 'g2') return;
  const { chart, chartType, annotations, mapping, themeObject } = binding;
  if (!annotations?.length) return () => {};
  const defaults = getAnnotationStyle(themeObject);
  const library = chart.getContext().library!;
  let disposed = false;
  let visibleData: T[] = [];
  let sourceGeometry: { data: T; points: Point[]; seriesIndex?: number[]; color?: string }[] = [];
  let sourceRows: T[] = [];
  let sourceScale: View['scale'];
  let plotWidth = 0;
  let coordinate: View['coordinate'];

  // G2 legend filtering runs before this transform; capture its current source rows.
  const capture: ReturnType<typeof Filter> = (index, mark) => {
    if (disposed) return [index, mark];
    sourceRows = mark.data;
    visibleData = index.map((i) => mark.data[i]);
    return [index, mark];
  };

  const originalRows = new Set(mapping.data);
  const onlyAxisFields = (data: object) =>
    Object.keys(data).every((key) => key === mapping.x || key === mapping.y);
  const position = (
    data: AnnotationData<T>,
    coordinate: View['coordinate'],
    observation = false,
  ): Point | undefined => {
    const mapped = (row: AnnotationData<T>): Point => [
      axisValue(sourceScale.x, row[mapping.x]),
      axisValue(sourceScale.y, row[mapping.y]),
    ];
    if (
      !observation &&
      data[mapping.x] !== undefined &&
      data[mapping.y] !== undefined &&
      onlyAxisFields(data)
    )
      return mapped(data);
    const matches =
      observation && originalRows.has(data as T)
        ? [data as T]
        : mapping.data.filter((row) =>
            Object.entries(data).every(([key, value]) => row[key as keyof T] === value),
          );
    if (matches.length !== 1)
      throw new Error(
        `Invalid annotation: position matches ${matches.length} data objects; expected one.`,
      );
    const row = matches[0];
    const same = (datum: T) =>
      observation && originalRows.has(datum)
        ? datum === row
        : Object.entries(row).every(([key, value]) => datum[key as keyof T] === value);
    if (!visibleData.some(same)) return undefined;
    if (!mapping.interval && source.type !== 'interval') {
      const index = sourceRows.findIndex(same);
      const series = sourceGeometry.find((item) => item.seriesIndex?.includes(index));
      if (series) {
        const point = series.points[series.seriesIndex!.indexOf(index)];
        return coordinate.invert(point) as Point;
      }
      return mapped(row);
    }
    const target = sourceGeometry.find(({ data }) => same(data));
    if (!target) return undefined;
    if (coordinate.getOptions().transformations?.some(([type]) => type === 'polar')) {
      const from = coordinate.invert(target.points[0]) as Point;
      const to = coordinate.invert(target.points[2]) as Point;
      // Theta intervals span the angular y channel. Unwrap sectors crossing the seam.
      const end = to[1] < from[1] - 1e-6 ? to[1] + 1 : to[1];
      return [(from[0] + to[0]) / 2, ((from[1] + end) / 2) % 1];
    }
    const [a, b] = target.points;
    // Invert the actual interval endpoint, retaining stack, dodge and transpose.
    return coordinate.invert([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]) as Point;
  };

  function getTextStyle(annotation: MarkAnnotation<T>) {
    const label = defaults.labels[annotation.type];
    const fontSize = annotation.style?.labelFontSize ?? defaults.labelFontSize;
    return {
      fill: annotation.style?.labelFill ?? label.fill,
      // Keep annotation labels legible when G2's base label theme dims text.
      opacity: 1,
      fillOpacity: 1,
      fontFamily: defaults.fontFamily,
      fontSize,
      fontWeight: label.fontWeight,
      lineHeight: Math.ceil(fontSize * 1.5),
      wordWrap: true,
      wordWrapWidth: () =>
        Math.max(fontSize, Math.min(label.maxWidth, plotWidth) - label.padding[1] * 2),
      maxLines: Infinity,
      textOverflow: 'clip',
      pointerEvents: 'none',
    };
  }

  /** Native mark plumbing only; each annotation owns its geometry, paint and special labels. */
  function createMark(annotation: MarkAnnotation<T>, definition: G2MarkDefinition): MarkOptions {
    const { nativeType, style } = definition;
    const native = library[`mark.${nativeType}`] as MarkComponent;
    const type: MarkComponent = (options) => {
      const geometry = definition.geometry(native(options) as SingleMark);
      return (...args) => (disposed ? [[], []] : geometry(...args));
    };
    const shapeName = definition.shape ?? native.props!.defaultShape!;
    const shape = native.props!.shape![shapeName];
    const themedShape: ShapeComponent = (options, shapeContext) => {
      const draw = shape(options, shapeContext);
      return (points, value) => {
        const element = definition.draw
          ? definition.draw(shapeContext!.document)
          : draw(points, value, {
              color: themeObject.theme.color,
              ...(themeObject.theme[nativeType]?.[shapeName] ??
                themeObject.theme[nativeType]?.[native.props!.defaultShape!]),
            });
        element.setAttribute('annotationKind', annotation.type);
        definition.decorate?.(element, points);
        return element;
      };
    };
    themedShape.props = shape.props;
    type.props = { ...native.props, defaultShape: shapeName, shape: { [shapeName]: themedShape } };
    const label = defaults.labels[annotation.type];
    const gap = label.gap + (definition.labelGap ?? 0);
    return {
      type,
      data: Array.isArray(annotation.data) ? annotation.data : [annotation.data],
      encode: { x: () => 0, y: () => 0, ...definition.encode },
      // Resolved positions never contribute to the main-axis domains.
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
      zIndex: definition.zIndex ?? 0,
      clip: definition.clip,
      style: { pointerEvents: 'none', ...style },
      labels:
        definition.label !== false && annotation.label !== undefined && annotation.label !== ''
          ? [
              {
                text: () => annotation.label,
                annotationLabel: annotation.type,
                annotationGap: gap,
                annotationPaddingX: label.padding[1],
                ...getTextStyle(annotation),
                position: 'top',
                textAlign: 'center',
                textBaseline: 'bottom',
                dx: 0,
                dy: -gap - label.padding[0],
                background: true,
                backgroundFill: label.background,
                backgroundFillOpacity: label.backgroundOpacity,
                backgroundStroke: label.border,
                backgroundStrokeOpacity: label.borderOpacity,
                backgroundLineWidth: 1,
                backgroundPadding: label.padding,
                backgroundRadius: label.radius,
                connectorStroke: style.stroke,
                connectorLineWidth: 1,
                connectorFill: 'none',
                ...definition.label,
              },
            ]
          : [],
    };
  }

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

  const context: G2AnnotationContext<T> = {
    chartType,
    defaults,
    sourceMarks: baseMarks,
    mapping,
    position,
    color: (selector) => {
      const index = sourceRows.findIndex((row) =>
        Object.entries(selector).every(([key, value]) => row[key as keyof T] === value),
      );
      return (
        sourceGeometry.find(
          (item) => item.data === sourceRows[index] || item.seriesIndex?.includes(index),
        )?.color ?? defaults.stroke
      );
    },
    onlyAxisFields,
    axisValue: (axis, value, center = true) => axisValue(sourceScale[axis], value, center),
    bandWidth: (axis, value) => sourceScale[axis].getBandWidth?.(value) ?? 0,
    createMark,
    getTextStyle,
    getSourceData: (element) =>
      element.__data__.seriesIndex
        ? element.__data__.seriesIndex.map((index) => sourceRows[index])
        : [element.__data__.data as T],
    getCoordinate: () => coordinate,
    getScene: () => chart.getContext().canvas!.document,
  };
  const result = renderAnnotations<T, 'g2'>('g2', annotations, context);
  const marks = result.marks ?? [];

  // Layout attached labels together. Standalone text retains its supplied position.
  const layoutLabels = (): View['labelTransform'] => (labels, context) => {
    if (disposed) return labels;
    coordinate = context.coordinate;
    result.update?.();
    const attached = labels.filter(
      (label) =>
        label.getAttribute('annotationLabel') &&
        !label.getAttribute('annotationInside') &&
        label.style.visibility !== 'hidden',
    );
    // Native updates reuse labels; reset the previous leader before measuring the new layout.
    for (const label of attached) {
      const anchor = label.getAttribute('annotationAnchor') as Point | undefined;
      if (anchor) label.attr({ x: anchor[0], y: anchor[1] });
      label.attr({
        x0: Number(label.style.x),
        y0: Number(label.style.y),
        connector: false,
        connectorPoints: [],
      });
      label.getElementById('connector')!.style.lineWidth = 0;
      // Place point cards beside their source when there is horizontal room.
      if (!label.getAttribute('annotationPreferSide')) continue;
      const { min, max } = label.getElementById('background')!.getLocalBounds();
      const gap = Number(label.getAttribute('annotationGap'));
      const right = Number(label.style.x) + gap + max[0] - min[0] <= plotWidth;
      const left = Number(label.style.x) - gap - (max[0] - min[0]) >= 0;
      if (!right && !left) continue;
      label.attr({
        textAlign: right ? 'left' : 'right',
        dx: (right ? 1 : -1) * (gap + Number(label.getAttribute('annotationPaddingX'))),
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
      if (element.getAttribute('annotationIgnoreObstacle') || element.__removed__) continue;
      const annotationSegments = element.getAttribute('annotationSegments') as
        Segment[] | undefined;
      if (annotationSegments) {
        segments.push(...annotationSegments);
        continue;
      }
      const points = element.__data__.points;
      if (!kind && source.type === 'line' && element.nodeName === 'path') {
        points.slice(1).forEach((point, index) => {
          const previous = points[index];
          // Native lines retain missing values as gaps; they are not layout obstacles.
          if (previous.every(Number.isFinite) && point.every(Number.isFinite))
            segments.push([previous, point]);
        });
        continue;
      }
      const bounds = element.getAttribute('annotationBounds') as Box | undefined;
      if (bounds) boxes.push(bounds);
      else {
        const { min, max } = element.getLocalBounds();
        boxes.push({ x: min[0], y: min[1], width: max[0] - min[0], height: max[1] - min[1] });
      }
    }
    // Data labels remain fixed too. Standalone text is collected above as a native element.
    for (const label of labels.filter(
      (label) => !label.getAttribute('annotationLabel') && label.style.visibility !== 'hidden',
    )) {
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
      const route = label.getAttribute('annotationNote')
        ? []
        : routeLeader([x0, y0], box, boxes, segments);
      const relative = route.map(([x, y]) => [
        x - Number(label.style.x),
        y - Number(label.style.y),
      ]);
      const edge = relative[relative.length - 1] ?? [0, 0];
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
      const colors = label.getAttribute('annotationColors') as string[] | undefined;
      if (colors?.length) {
        label.querySelector('.annotation-label-colors')?.remove();
        const { min, max } = label.getElementById('background')!.getLocalBounds();
        drawLabelColors(
          label,
          context.canvas.document,
          colors,
          {
            x: min[0],
            y: min[1],
            width: max[0] - min[0],
            height: max[1] - min[1],
          },
          defaults.labels.highlight.padding[1],
        );
      }
    }
    return labels;
  };
  const source = baseMarks[0];
  // G2's legend filter expects named transforms, so store chart-local state in its options.
  library['transform.annotationSource'] = annotationSource;
  source.transform = [...(source.transform ?? []), { type: 'annotationSource', capture }];
  source.children = (data: typeof sourceGeometry, scale: View['scale'], layout: View['layout']) => {
    sourceGeometry = data;
    sourceScale = scale;
    plotWidth = layout.innerWidth!;
    return [];
  };
  replaceOptions(chart, {
    ...viewOptions,
    type: 'view',
    children: [...baseMarks, ...marks],
    labelTransform: [...(options.labelTransform ?? []), { type: layoutLabels }],
  } as G2Spec);

  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    chart.off('beforedestroy', cleanup);
    result.cleanup?.();
    replaceOptions(chart, options as G2Spec);
  };
  chart.on('beforedestroy', cleanup);
  return cleanup;
}
