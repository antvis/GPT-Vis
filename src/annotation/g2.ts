import {
  dataOf,
  selectG2Elements,
  selectPlotArea,
  type Chart,
  type G2Context,
  type ShapeComponent,
} from '@antv/g2';
import { getAnnotationStyle } from '../theme/annotation';
import type { getThemeObject } from '../theme/g2';
import type { AnnotationData, PrimitiveAnnotation } from '../types/annotation';
import { connectorPath, path, type Point } from './shared';

type View = NonNullable<G2Context['views']>[number];
type Element = ReturnType<typeof selectPlotArea>;

/** Internal chart mapping; renderer details never enter the annotation configuration. */
interface Mapping<T extends object> {
  x: keyof T & string;
  y: keyof T & string;
  data: T[];
  interval?: boolean;
}

const fail = (message: string): never => {
  throw new Error(`Invalid annotation: ${message}`);
};

function axisValue(scale: View['scale'][string], value: unknown, center = true) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'number' && !Number.isFinite(value))
  )
    fail('axis values must be finite numbers or categories.');
  const { domain, type } = scale.getOptions();
  if ((type === 'band' || type === 'point' || type === 'ordinal') && !domain.includes(value))
    fail(`unknown category ${String(value)}.`);
  const mapped = Number(scale.map(value));
  const width = scale.getBandWidth?.(value) ?? 0;
  if (!Number.isFinite(mapped)) fail('position cannot be mapped to the chart.');
  return mapped + (center ? width / 2 : 0);
}

/** G2 reapplies this drawing hook with the current view after filtering or repainting. */
export function bindAnnotations<T extends object>(
  chart: Chart,
  annotations: PrimitiveAnnotation<T>[] | undefined,
  mapping: Mapping<T>,
  appearance: ReturnType<typeof getThemeObject>,
): () => void {
  if (!annotations?.length) return () => {};
  for (const annotation of annotations) {
    if (
      (annotation.type === 'text' || annotation.label !== undefined) &&
      typeof annotation.label !== 'string'
    )
      fail('label must be a string; text requires a label.');
  }
  const defaults = getAnnotationStyle(appearance);
  let layer: Element | undefined;
  let disposed = false;

  const clear = () => {
    layer?.destroy();
    layer = undefined;
  };

  const draw = (view: View, plot: Element) => {
    if (disposed) return;
    clear();
    const { canvas, library } = chart.getContext();
    if (!canvas || !plot) return;
    const { document } = canvas;
    layer = document.createElement('g', {
      className: 'annotations',
      style: { zIndex: 6, pointerEvents: 'none' },
    });
    plot.appendChild(layer);

    const add = (tag: string, style: Record<string, unknown>) => {
      const element = document.createElement(tag, { style: { ...style, pointerEvents: 'none' } });
      layer!.appendChild(element);
    };
    const map = (x: number, y: number) => view.coordinate.map([x, y]) as Point;
    const onlyAxisFields = (data: object) =>
      Object.keys(data).every((key) => key === mapping.x || key === mapping.y);
    const elements = selectG2Elements(plot).map((element) => ({
      element,
      data: dataOf(element, view),
    }));

    const position = (data: AnnotationData<T>): Point | undefined => {
      const entries = Object.entries(data);
      if (!entries.length) fail('a position needs axis fields or an unambiguous data object.');
      // Complete coordinates never depend on matching observations or series counts.
      if (data[mapping.x] !== undefined && data[mapping.y] !== undefined && onlyAxisFields(data)) {
        return map(
          axisValue(view.scale.x, data[mapping.x]),
          axisValue(view.scale.y, data[mapping.y]),
        );
      }
      const matches = mapping.data.filter((row) =>
        entries.every(([key, value]) => row[key as keyof T] === value),
      );
      if (!matches.length) fail('position does not match any data object.');
      if (matches.length > 1)
        fail('position matches multiple data objects; include the series fields.');
      const row = matches[0];
      // A line element represents a series; point and interval elements represent one row.
      const target = elements.find(({ data }) =>
        (Array.isArray(data) ? data : [data]).some(
          (datum) => datum && Object.entries(row).every(([key, value]) => datum[key] === value),
        ),
      );
      if (!target) return undefined;
      if (mapping.interval) {
        // G2 interval geometry starts with the two corners of the value end.
        // These points already include dodge, stack and coordinate transforms.
        const points = (target.element as Element & { __data__: { points: Point[] } }).__data__
          .points;
        return [(points[0][0] + points[1][0]) / 2, (points[0][1] + points[1][1]) / 2];
      }
      return map(axisValue(view.scale.x, row[mapping.x]), axisValue(view.scale.y, row[mapping.y]));
    };

    const label = (annotation: PrimitiveAnnotation<T>, point: Point) => {
      if (annotation.label === undefined) return;
      const standalone = annotation.type === 'text';
      const [corner0, corner1] = [map(0, 0), map(1, 1)];
      const gap = 8;
      const below = !standalone && point[1] < Math.min(corner0[1], corner1[1]) + gap;
      add('text', {
        x: point[0],
        y: standalone ? point[1] : point[1] + (below ? gap : -gap),
        text: annotation.label,
        fill: annotation.labelFill ?? defaults.labelFill,
        stroke: 'none',
        lineWidth: 0,
        fontFamily: defaults.fontFamily,
        fontSize: annotation.labelFontSize ?? defaults.labelFontSize,
        fontWeight: defaults.fontWeight,
        textAlign: standalone
          ? 'center'
          : point[0] <= Math.min(corner0[0], corner1[0]) + gap
            ? 'left'
            : point[0] >= Math.max(corner0[0], corner1[0]) - gap
              ? 'right'
              : 'center',
        textBaseline: standalone ? 'middle' : below ? 'top' : 'bottom',
      });
    };

    for (const annotation of annotations) {
      const lineWidth = annotation.type === 'text' ? 0 : defaults.lineWidth[annotation.type];
      const stroke =
        'stroke' in annotation ? (annotation.stroke ?? defaults.stroke) : defaults.stroke;
      const lineStyle = {
        stroke,
        lineWidth: 'lineWidth' in annotation ? (annotation.lineWidth ?? lineWidth) : lineWidth,
        lineDash: 'lineDash' in annotation ? annotation.lineDash : undefined,
        fill: 'none',
      };
      switch (annotation.type) {
        case 'line': {
          let points: Point[];
          if (Array.isArray(annotation.data)) {
            if (annotation.data.length < 2) fail('line paths need at least two positions.');
            const mapped = annotation.data.map(position);
            if (mapped.some((point) => !point)) continue;
            points = mapped as Point[];
          } else {
            const x = annotation.data[mapping.x];
            const y = annotation.data[mapping.y];
            if (!onlyAxisFields(annotation.data) || (x === undefined) === (y === undefined))
              fail('a spanning line needs exactly one axis field.');
            points =
              x !== undefined
                ? [map(axisValue(view.scale.x, x), 0), map(axisValue(view.scale.x, x), 1)]
                : [map(0, axisValue(view.scale.y, y)), map(1, axisValue(view.scale.y, y))];
          }
          add('path', { ...lineStyle, d: path(points) });
          label(annotation, points.at(-1)!);
          break;
        }
        case 'range': {
          if (!onlyAxisFields(annotation.data)) fail('range only accepts axis fields.');
          const x = annotation.data[mapping.x];
          const y = annotation.data[mapping.y];
          if (!x && !y) fail('range needs at least one axis interval.');
          if (
            (x && (!Array.isArray(x) || x.length !== 2)) ||
            (y && (!Array.isArray(y) || y.length !== 2))
          )
            fail('range intervals need two values.');
          const bounds = (values: unknown[] | undefined, scale: View['scale'][string]) => {
            if (!values) return [0, 1];
            const a = axisValue(scale, values[0], false);
            const b = axisValue(scale, values[1], false);
            const end = scale.getBandWidth?.(values[a < b ? 1 : 0]) ?? 0;
            return [Math.min(a, b), Math.max(a, b) + end];
          };
          const [x0, x1] = bounds(x, view.scale.x);
          const [y0, y1] = bounds(y, view.scale.y);
          const points = [map(x0, y0), map(x1, y0), map(x1, y1), map(x0, y1)];
          add('path', {
            ...lineStyle,
            d: path(points, true),
            fill: annotation.fill ?? stroke,
            fillOpacity: annotation.fillOpacity ?? defaults.fillOpacity,
          });
          label(annotation, map((x0 + x1) / 2, (y0 + y1) / 2));
          break;
        }
        case 'connector': {
          if (annotation.data.length !== 2) fail('connector needs two positions.');
          const from = position(annotation.data[0]);
          const to = position(annotation.data[1]);
          if (!from || !to) continue;
          add('path', {
            ...lineStyle,
            d: connectorPath(from, to, lineStyle.lineWidth),
            lineCap: 'round',
            lineJoin: 'round',
          });
          label(annotation, [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2]);
          break;
        }
        case 'point': {
          const shape = library?.['mark.point']?.props?.shape?.[defaults.shape] as ShapeComponent;
          if (!shape) fail(`unknown theme point shape ${defaults.shape}.`);
          const data = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
          for (const row of data) {
            const point = position(row);
            if (!point) continue;
            const r = annotation.size ?? defaults.size;
            const element = shape(
              {
                ...lineStyle,
                fill:
                  annotation.fill ?? (defaults.shape.startsWith('hollow') ? 'transparent' : stroke),
                r,
                pointerEvents: 'none',
              },
              { document, coordinate: view.coordinate },
            )(
              [point],
              { color: stroke, size: r },
              appearance.theme.point?.[defaults.shape] ?? appearance.theme.point?.point ?? {},
            );
            layer!.appendChild(element);
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
          fail('this chart currently supports geometric primitives only.');
      }
    }
  };

  const update =
    () =>
    ({ view, container }: { view: View; container: Element }) => {
      draw(view, selectPlotArea(container));
      return clear;
    };
  update.props = { reapplyWhenUpdate: true };
  const options = chart.options();
  chart.options({
    ...options,
    interaction: { ...options.interaction, annotation: { type: update } },
  });
  return () => {
    disposed = true;
    clear();
  };
}
