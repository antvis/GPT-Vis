import type { MarkComponent, ShapeComponent } from '@antv/g2';
import type { AnnotationData } from '../../types/annotation';
import type { Point } from '../layout';
import type { AnnotationComponent } from '../registry';
import type { G2AnnotationContext } from '../runtime';
import { axisPosition, finiteValue, formatNumber, selectRows } from '../utils';
import { path } from './path';
import { point } from './point';

/** Resolve native curve crossings, then reuse paths and directional point presets. */
export const crossing: AnnotationComponent<'crossing'> = {
  g2: (annotations, context) =>
    annotations.flatMap((annotation) => {
      const { mapping, defaults } = context;
      const type =
        context.sourceMarks?.find((mark) => mark.type === 'line')?.style?.shape ?? 'line';
      if (
        context.sourceMarks?.some((mark) =>
          mark.transform?.some((t: { type?: string }) => t?.type === 'stackY'),
        )
      )
        throw new Error('Invalid annotation: automatic crossing requires unstacked series.');
      let deferred = false;
      switch (type) {
        case 'line':
        case 'linear':
          break;
        case 'smooth':
        case 'hv':
        case 'vh':
        case 'hvh':
          deferred = true;
          break;
        default:
          throw new Error(`Invalid annotation: unsupported crossing curve ${String(type)}.`);
      }
      const direction = annotation.direction ?? 'both';
      if (!['up', 'down', 'both'].includes(direction))
        throw new Error('Invalid annotation: crossing direction must be up, down or both.');
      const samples = (rows: typeof mapping.data) => {
        requireOneSeries(rows, mapping.series);
        if (!rows.length) return [];
        const selected = new Set<unknown>(rows.map((row) => row[mapping.x]));
        const all = mapping.series
          ? mapping.data.filter((row) => row[mapping.series!] === rows[0][mapping.series!])
          : mapping.data;
        // Selection must not turn nonadjacent observations into a new source segment.
        return seriesSamples(all, mapping.x, mapping.y).map((sample) =>
          selected.has(sample.x) ? sample : { ...sample, y: null },
        );
      };
      let compared: Compared[];
      let selected: (typeof mapping.data)[];
      if (annotation.threshold !== undefined) {
        const threshold = finiteValue(annotation.threshold, 'threshold');
        const rows = selectRows(
          mapping.data,
          annotation.data as
            | AnnotationData<(typeof mapping.data)[number]>
            | AnnotationData<(typeof mapping.data)[number]>[]
            | undefined,
        );
        selected = [rows];
        compared = samples(rows).map((sample) => ({
          ...sample,
          other: threshold,
          difference: sample.y === null ? null : sample.y - threshold,
        }));
      } else {
        const selection = annotation.data;
        if (
          !selection ||
          Array.isArray(selection) ||
          !('series' in selection) ||
          !Array.isArray(selection.series) ||
          selection.series.length !== 2
        )
          throw new Error(
            'Invalid annotation: crossing needs a threshold or two series selectors in data.series.',
          );
        const [first, second] = selection.series.map((selector) =>
          selectRows(mapping.data, selector),
        );
        selected = [first, second];
        const firstRows = new Set(first);
        if (second.some((row) => firstRows.has(row)))
          throw new Error('Invalid annotation: crossing series selectors must not overlap.');
        compared = compareSeries(samples(first), samples(second));
      }
      const visible = () =>
        selected.every((rows) => rows.some((row) => context.isVisible?.(row) ?? true));
      const position = (sample: Sample) =>
        ({
          [mapping.x]: sample.x,
          [mapping.y]: sample.y,
        }) as AnnotationData<(typeof mapping.data)[number]>;
      const createMarker = (
        sample: Sample & { direction: Direction },
        positions?: NonNullable<Parameters<typeof point.create>[1]>['positions'],
      ) => {
        const color =
          annotation.style?.stroke ??
          annotation.style?.fill ??
          defaults.directions[sample.direction];
        return point.create(
          {
            data: position(sample),
            label:
              annotation.label ??
              `${sample.direction === 'up' ? 'Crosses above' : 'Crosses below'}${annotation.threshold === undefined ? '' : ` ${formatNumber(annotation.threshold)}`}`,
            pulse: annotation.pulse ?? false,
            style: {
              ...annotation.style,
              size: annotation.style?.size ?? Math.max(defaults.size, 7),
              lineWidth: annotation.style?.lineWidth ?? 2,
              fill: annotation.style?.fill ?? color,
              stroke: color,
            },
          },
          {
            shape: sample.direction === 'up' ? 'triangle' : 'triangleDown',
            outline: annotation.style?.stroke ?? defaults.pointStroke,
            zIndex: 2,
            visible,
            positions,
          },
        );
      };
      const references =
        annotation.threshold === undefined
          ? []
          : path.create({
              data: axisPosition(mapping.y, annotation.threshold),
              label:
                annotation.label === '' ? '' : `Threshold: ${formatNumber(annotation.threshold)}`,
              style: { lineDash: [4, 4], stroke: annotation.style?.stroke },
            });
      const createBand = (
        band: ReturnType<typeof relationshipBands>[number],
        positions?: NonNullable<Parameters<typeof path.create>[1]>['positions'],
      ) =>
        path.create(
          {
            data: [...band.upper, ...band.lower.slice().reverse(), band.upper[0]].map(position),
            label: '',
          },
          {
            fill:
              annotation.style?.fill ??
              annotation.style?.stroke ??
              defaults.directions[band.direction],
            fillOpacity: 0.07,
            visible,
            positions,
          },
        );
      // Categorical crossings remain observed events; no synthetic category is introduced.
      if (!deferred || compared.some(({ x }) => typeof x === 'string')) {
        const marks = intersections(compared)
          .filter((sample) => direction === 'both' || direction === sample.direction)
          .flatMap((sample) => createMarker(sample));
        const bands = (context.chartType === 'area' ? [] : relationshipBands(compared))
          .filter(({ direction: side }) => direction === 'both' || direction === side)
          .flatMap((band) => createBand(band));
        return [...bands, ...references, ...marks];
      }
      const series = selected.map((rows) => {
        const group = mapping.series && rows[0]?.[mapping.series];
        const all = mapping.series
          ? mapping.data.filter((row) => row[mapping.series!] === group)
          : mapping.data;
        const full = seriesSamples(all, mapping.x, mapping.y);
        const chosen = new Set<unknown>(rows.map((row) => row[mapping.x]));
        const runs: Sample[][] = [];
        let run: Sample[] | undefined;
        for (const sample of full) {
          if (!chosen.has(sample.x)) run = undefined;
          else {
            if (!run) runs.push((run = []));
            run.push(sample);
          }
        }
        // Step direction depends on source order; normalize only after native path generation.
        if (full.length && Number(all[0][mapping.x]) > Number(all.at(-1)![mapping.x]))
          full.reverse();
        return { samples: full, runs, chosen };
      });
      const resolve = (geometry: GeometryContext, coordinate: Coordinate) => {
        // G2's D3 paths round to 0.001px; keep boundary jumps and exact threshold touches stable.
        const tolerance = 0.002 / Math.max(1, Math.min(...coordinate.getSize()));
        const paths = series.map(({ samples, runs, chosen }) => {
          // Step curves depend only on adjacent observations; masking preserves their exact edges.
          const source =
            type === 'smooth'
              ? samples
              : samples.map((sample) => (chosen.has(sample.x) ? sample : { ...sample, y: null }));
          const full = sampleCurve(type, source, geometry, coordinate);
          if (type !== 'smooth') return full;
          return runs
            .filter((run) => run.length > 1)
            .flatMap((run, i): Sample[] => {
              const from = geometry.axisValue('x', run[0].x);
              const to = geometry.axisValue('x', run.at(-1)!.x);
              const clipped = clipSamples(full, Math.min(from, to), Math.max(from, to), tolerance);
              return i ? [{ x: from, y: null }, ...clipped] : clipped;
            });
        });
        if (annotation.threshold !== undefined) {
          const threshold = -geometry.axisValue('y', annotation.threshold);
          return paths[0].map((sample) => ({
            ...sample,
            other: threshold,
            difference:
              sample.y === null
                ? null
                : Math.abs(sample.y - threshold) <= tolerance
                  ? 0
                  : sample.y - threshold,
          }));
        }
        return comparePaths(paths[0], paths[1], tolerance);
      };
      const sides: Direction[] = direction === 'both' ? ['up', 'down'] : [direction];
      const seed: Sample = { x: 0, y: 0 };
      const marks = sides.flatMap((side) =>
        createMarker({ ...seed, direction: side }, (geometry, coordinate) =>
          intersections(resolve(geometry, coordinate))
            .filter((sample) => sample.direction === side)
            .map((sample) => [Number(sample.x), -sample.y!] as Point),
        ),
      );
      const bands =
        context.chartType === 'area'
          ? []
          : sides.flatMap((side) =>
              createBand(
                { upper: [seed], lower: [seed], direction: side },
                (geometry, coordinate) =>
                  relationshipBands(resolve(geometry, coordinate))
                    .filter((band) => band.direction === side)
                    .map((band) =>
                      [...band.upper, ...band.lower.slice().reverse(), band.upper[0]].map(
                        (sample) => [Number(sample.x), -sample.y!] as Point,
                      ),
                    ),
              ),
            );
      return [...bands, ...references, ...marks];
    }),
};

type Sample = { x: string | number; y: number | null };
type Compared = Sample & { other: number | null; difference: number | null };
type Direction = 'up' | 'down';
type GeometryContext = Pick<G2AnnotationContext<object>, 'library' | 'axisValue' | 'getScene'>;
type Coordinate = Parameters<G2AnnotationContext<object>['position']>[1];
type Command = [string, ...number[]];

/** G2 owns the curve construction; crossing only reads and flattens its detached path. */
function sampleCurve(
  type: string,
  samples: Sample[],
  context: GeometryContext,
  coordinate: Coordinate,
): Sample[] {
  const library = context.library;
  const line = library['mark.line'] as MarkComponent;
  const shape = line.props!.shape![type];
  const element = shape({}, { document: context.getScene(), coordinate } as NonNullable<
    Parameters<ShapeComponent>[1]
  >)(
    samples.map(({ x, y }) =>
      y === null
        ? [NaN, NaN]
        : (coordinate.map([context.axisValue('x', x), context.axisValue('y', y)]) as Point),
    ),
    {},
    { color: 'none', lineWidth: 0 },
  );
  let commands: Command[];
  try {
    // Detached shapes have not run G's style parser yet; D3 emits only M/L/C/Z commands here.
    const path = element.getAttribute('d');
    commands =
      typeof path === 'string'
        ? Array.from(path.matchAll(/([MLCZ])([^MLCZ]*)/g), ([, command, values]) => [
            command,
            ...(values.match(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g) ?? []).map(Number),
          ])
        : [];
  } finally {
    element.destroy();
  }
  const paths: Point[][] = [];
  for (const [command, ...values] of commands) {
    const end: Point = [values.at(-2)!, values.at(-1)!];
    switch (command) {
      case 'M':
        paths.push([end]);
        break;
      case 'L':
        paths.at(-1)!.push(end);
        break;
      case 'C': {
        const path = paths.at(-1)!;
        flattenCubic(path.at(-1)!, [values[0], values[1]], [values[2], values[3]], end, path);
        break;
      }
      case 'Z':
        break; // G2 closes single-observation lines without introducing another observation.
      default:
        throw new Error(`Invalid annotation: unsupported crossing path command ${command}.`);
    }
  }
  const projected = paths.map((points) =>
    points.map((point): Sample => {
      const [x, y] = coordinate.invert(point);
      return { x, y: -y };
    }),
  );
  if (Number(projected[0]?.[0].x) > Number(projected.at(-1)?.at(-1)?.x)) {
    projected.reverse();
    projected.forEach((path) => path.reverse());
  }
  const result: Sample[] = [];
  for (const path of projected) {
    if (result.length)
      result.push({ x: (Number(result.at(-1)!.x) + Number(path[0].x)) / 2, y: null });
    result.push(...path);
  }
  return result;
}

/** Subdivide in screen pixels so marker and fill errors remain below a visible pixel. */
function flattenCubic(a: Point, b: Point, c: Point, d: Point, points: Point[], depth = 0) {
  const length = Math.hypot(d[0] - a[0], d[1] - a[1]);
  const distance = (p: Point) =>
    length
      ? Math.abs((d[0] - a[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (d[1] - a[1])) / length
      : Math.hypot(p[0] - a[0], p[1] - a[1]);
  if (depth >= 16 || Math.max(distance(b), distance(c)) <= 0.1) {
    points.push(d);
    return;
  }
  const middle = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const ab = middle(a, b),
    bc = middle(b, c),
    cd = middle(c, d);
  const abc = middle(ab, bc),
    bcd = middle(bc, cd),
    center = middle(abc, bcd);
  flattenCubic(a, ab, abc, center, points, depth + 1);
  flattenCubic(center, bcd, cd, d, points, depth + 1);
}

/** Preserve both limits at a step's vertical edge; ordinary curves have identical limits. */
function sampleAt(samples: Sample[], x: number, side: 'before' | 'after'): number | null {
  let from = 0,
    to = samples.length;
  while (from < to) {
    const mid = (from + to) >>> 1;
    if (Number(samples[mid].x) < x || (side === 'after' && samples[mid].x === x)) from = mid + 1;
    else to = mid;
  }
  if (side === 'before' && samples[from]?.x === x) return samples[from].y;
  const a = samples[from - 1],
    b = samples[from];
  if (a?.x === x) return a.y;
  if (!a || !b || a.y === null || b.y === null) return null;
  const t = interpolationFraction(Number(a.x), Number(b.x), x);
  return a.y * (1 - t) + b.y * t;
}

function clipSamples(samples: Sample[], from: number, to: number, tolerance: number): Sample[] {
  if (!samples.length || from > to) return [];
  const result = samples.filter(
    ({ x }) => Number(x) >= from - tolerance && Number(x) <= to + tolerance,
  );
  if (!result.length || Math.abs(Number(result[0].x) - from) > tolerance)
    result.unshift({ x: from, y: sampleAt(samples, from, 'after') });
  if (Math.abs(Number(result.at(-1)!.x) - to) > tolerance)
    result.push({ x: to, y: sampleAt(samples, to, 'before') });
  return result;
}

/** Compare continuous segments and single-series jumps without inventing a point on overlaps. */
function comparePaths(first: Sample[], second: Sample[], tolerance: number): Compared[] {
  if (!first.length || !second.length) return [];
  const from = Math.max(Number(first[0].x), Number(second[0].x));
  const to = Math.min(Number(first.at(-1)!.x), Number(second.at(-1)!.x));
  const xs = [...new Set([...first, ...second].map(({ x }) => Number(x)))]
    .filter((x) => x >= from && x <= to)
    .sort((a, b) => a - b);
  const result: Compared[] = [];
  for (const x of xs) {
    const a0 = sampleAt(first, x, 'before'),
      a1 = sampleAt(first, x, 'after');
    const b0 = sampleAt(second, x, 'before'),
      b1 = sampleAt(second, x, 'after');
    const compared = (a: number | null, b: number | null): Compared => ({
      x,
      y: a,
      other: a !== null && b !== null && Math.abs(a - b) <= tolerance ? a : b,
      difference: a === null || b === null ? null : Math.abs(a - b) <= tolerance ? 0 : a - b,
    });
    result.push(compared(a0, b0));
    // Two simultaneous jumps can overlap along an entire vertical segment, with no unique crossing.
    if (a0 !== a1 && b0 !== b1) result.push({ x, y: null, other: null, difference: null });
    if (a0 !== a1 || b0 !== b1) result.push(compared(a1, b1));
  }
  return result;
}

function seriesSamples<T extends object>(
  rows: T[],
  x: keyof T & string,
  y: keyof T & string,
): Sample[] {
  const samples = rows.map((row): Sample => {
    const value = row[x];
    axisPosition(x, value);
    const raw = row[y];
    if (raw === null || raw === undefined || (typeof raw === 'number' && !Number.isFinite(raw)))
      return { x: value as string | number, y: null };
    return { x: value as string | number, y: finiteValue(raw, y) };
  });
  if (new Set(samples.map(({ x }) => x)).size !== samples.length)
    throw new Error('Invalid annotation: crossing requires unique x values per series.');
  if (samples.some((sample) => typeof sample.x !== typeof samples[0].x))
    throw new Error('Invalid annotation: crossing x values must have a consistent type.');
  if (typeof samples[0]?.x === 'number' && samples.length > 1) {
    const direction = Number(samples[1].x) - Number(samples[0].x);
    if (
      samples
        .slice(1)
        .some((sample, i) => (Number(sample.x) - Number(samples[i].x)) * direction <= 0)
    )
      throw new Error('Invalid annotation: crossing x values must be monotonic.');
    if (direction < 0) samples.reverse();
  }
  return samples;
}

function interpolate(samples: Sample[], x: number): number | null {
  let left = 0;
  let right = samples.length - 1;
  while (left < right) {
    const middle = Math.ceil((left + right) / 2);
    if (Number(samples[middle].x) <= x) left = middle;
    else right = middle - 1;
  }
  const a = samples[left];
  if (a.x === x) return a.y;
  const b = samples[left + 1];
  if (!b || a.y === null || b.y === null) return null;
  const t = interpolationFraction(Number(a.x), Number(b.x), x);
  return a.y * (1 - t) + b.y * t;
}

function compareSeries(first: Sample[], second: Sample[]): Compared[] {
  if (!first.length || !second.length) return [];
  if (typeof first[0].x === 'number' && typeof second[0].x === 'number') {
    const min = Math.max(Number(first[0].x), Number(second[0].x));
    const max = Math.min(Number(first[first.length - 1].x), Number(second[second.length - 1].x));
    return [...new Set([...first, ...second].map(({ x }) => Number(x)))]
      .filter((x) => x >= min && x <= max)
      .sort((a, b) => a - b)
      .map((x) => {
        const y = interpolate(first, x);
        const other = interpolate(second, x);
        return { x, y, other, difference: y === null || other === null ? null : y - other };
      });
  }
  if (first.length !== second.length || first.some((sample, i) => sample.x !== second[i].x))
    throw new Error(
      'Invalid annotation: categorical crossing requires identical categories in identical order.',
    );
  return first.map((sample, i) => ({
    ...sample,
    other: second[i].y,
    difference: sample.y === null || second[i].y === null ? null : sample.y - second[i].y!,
  }));
}

/** Skip touches; an equality plateau that changes side is marked at its first coordinate. */
function intersections(samples: Compared[]) {
  const points: (Sample & { direction: Direction })[] = [];
  let previous = -1;
  for (let i = 0; i < samples.length; i++) {
    const current = samples[i];
    if (current.difference === null) {
      previous = -1;
      continue;
    }
    if (current.difference === 0) continue;
    const start = samples[previous];
    if (start && Math.sign(start.difference!) !== Math.sign(current.difference)) {
      const direction = current.difference > 0 ? 'up' : 'down';
      if (i > previous + 1) points.push({ ...samples[previous + 1], direction });
      else if (typeof start.x === 'number' && typeof current.x === 'number') {
        const t = crossingFraction(start, current);
        points.push({
          x: start.x * (1 - t) + current.x * t,
          y: start.y! * (1 - t) + current.y! * t,
          direction,
        });
      } else points.push({ ...current, direction });
    }
    previous = i;
  }
  return points;
}

/** Numeric relationships split at exact intersections; missing values never form a filled bridge. */
function relationshipBands(samples: Compared[]) {
  const bands: { upper: Sample[]; lower: Sample[]; direction: Direction }[] = [];
  if (!samples.every(({ x }) => typeof x === 'number')) return bands;
  let active: (typeof bands)[number] | undefined;
  const append = (a: Compared, b: Compared) => {
    const difference = a.difference || b.difference;
    if (!difference) {
      active = undefined;
      return;
    }
    const direction = difference > 0 ? 'up' : 'down';
    if (!active || active.direction !== direction) {
      active = { upper: [a], lower: [{ x: a.x, y: a.other }], direction };
      bands.push(active);
    }
    active.upper.push(b);
    active.lower.push({ x: b.x, y: b.other });
  };
  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1],
      b = samples[i];
    if (a.difference === null || b.difference === null) {
      active = undefined;
      continue;
    }
    if (Math.sign(a.difference) * Math.sign(b.difference) < 0) {
      const t = crossingFraction(a, b);
      const intersection = {
        x: Number(a.x) * (1 - t) + Number(b.x) * t,
        y: a.y! * (1 - t) + b.y! * t,
        other: a.y! * (1 - t) + b.y! * t,
        difference: 0,
      };
      append(a, intersection);
      append(intersection, b);
    } else append(a, b);
  }
  return bands;
}

/** Normalize before subtracting opposite extremes, and before summing the two distances. */
function crossingFraction(a: Compared, b: Compared) {
  const scale = Math.max(Math.abs(a.y!), Math.abs(a.other!), Math.abs(b.y!), Math.abs(b.other!));
  const difference = (sample: Compared) =>
    Number.isFinite(sample.difference)
      ? sample.difference! / scale
      : sample.y! / scale - sample.other! / scale;
  const left = Math.abs(difference(a));
  const right = Math.abs(difference(b));
  return left / (left + right);
}

function interpolationFraction(from: number, to: number, value: number) {
  if (Number.isFinite(to - from)) return (value - from) / (to - from);
  const scale = Math.max(Math.abs(from), Math.abs(to));
  return (value / scale - from / scale) / (to / scale - from / scale);
}

function requireOneSeries<T extends object>(rows: T[], series?: keyof T & string) {
  if (series && new Set(rows.map((row) => row[series])).size > 1)
    throw new Error('Invalid annotation: select a single series with data.');
}
