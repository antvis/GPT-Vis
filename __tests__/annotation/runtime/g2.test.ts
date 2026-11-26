import { stdlib, type Chart, type G2Context, type MarkComponent, type SingleMark } from '@antv/g2';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../../src/annotation';
import type { Point } from '../../../src/annotation/layout';
import type { RendererAnnotation } from '../../../src/annotation/registry';
import { getThemeObject } from '../../../src/theme/g2';
import type { Annotation } from '../../../src/types/annotation';

type Row = { x: string | number; y: number; group?: string };
type Options = NonNullable<Parameters<MarkComponent>[0]>;
const theme = getThemeObject('scatter', 'default', { mark: { point: { shape: 'circle' } } });
const center = ([a, b = a]: Point[]): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

/** Simulate view updates and scales, then evaluate the adapter with real G2 mark geometry. */
function setup(
  data: Row[] = [],
  { band = false, transpose = false, view = false, shape = '' } = {},
) {
  let width = 100;
  const xScale = band
    ? {
        map: (value: string) => ['A', 'B'].indexOf(value) / 2,
        getBandWidth: () => 0.4,
        getOptions: () => ({ type: 'band', domain: ['A', 'B'] }),
      }
    : { map: (value: number) => value / 10, getOptions: () => ({ type: 'linear' }) };
  const yScale = { map: (value: number) => 1 - value / 10, getOptions: () => ({ type: 'linear' }) };
  const coordinate = {
    map: ([x, y]: Point) => (transpose ? [(1 - y) * width, x * 100] : [x * width, y * 100]),
    invert: ([x, y]: Point) => (transpose ? [y / 100, 1 - x / width] : [x / width, y / 100]),
    getSize: () => [width, 100],
    getCenter: () => [width / 2, 50],
    getOptions: () => ({ x: 0, y: 0, transformations: [] }),
  } as unknown as Parameters<SingleMark>[3];
  const normalized = { map: (x: number) => x, getOptions: () => ({ type: 'linear' }) };
  const library = stdlib() as NonNullable<G2Context['library']>;
  const source = {
    type: shape ? 'line' : 'point',
    data,
    encode: { x: 'x', y: 'y', color: 'group' },
    scale: { y: { nice: true } },
    ...(shape ? { style: { shape } } : {}),
  };
  let options: Options = view
    ? {
        type: 'view',
        data,
        encode: source.encode,
        scale: source.scale,
        children: [{ type: 'line' }, { type: 'point' }],
      }
    : source;
  options.interaction = { tooltip: true };
  // G2 constructs the real D3 path; only its detached DOM container is simulated.
  const scene = {
    querySelectorAll: () => [],
    createElement: () => {
      const style: Record<string, unknown> = {};
      return { style, getAttribute: (key: string) => style[key], destroy() {} };
    },
  };
  const chart = {
    map: (transform: (options: Options) => Options) => (options = transform(options)),
    options: (next?: Options) => (next ? (options = next) : options),
    getContext: () => ({ library, canvas: { document: scene } }),
    on: vi.fn(),
    off: vi.fn(),
  } as unknown as Chart;
  const marks = (): Options[] => (chart.options() as Options).children.slice(view ? 2 : 1);
  const channels: { size: number[] }[] = [];
  const draw = (
    rows = data,
    points: Point[][] = [],
    scale = { x: xScale, y: yScale },
    seriesIndices?: number[][],
    geometryChannels: { y: number; y1: number }[] = [],
  ) => {
    const base = (chart.options() as Options).children[0];
    library['transform.annotationSource'](base.transform.at(-1))(
      rows.map((_, i) => i),
      { data: rows },
    );
    base.children(
      rows.map((row, i) => ({
        data: row,
        points: points[i],
        seriesIndex: seriesIndices?.[i],
        ...geometryChannels[i],
      })),
      scale,
      { innerWidth: width },
    );
    channels.length = 0;
    return marks().map((mark) => {
      const value = { size: mark.data.map(() => mark.encode.size) };
      channels.push(value);
      return (mark.type(mark) as SingleMark)(
        mark.data.map((_: Row, i: number) => i),
        { x: normalized, y: normalized } as unknown as Parameters<SingleMark>[1],
        value,
        coordinate,
      )[1].map((points) =>
        points.map((point) => point.map((v) => Math.round(v * 1e8) / 1e8) as Point),
      );
    });
  };
  return {
    chart,
    draw,
    marks,
    library,
    coordinate,
    channels,
    resize: (next = 200) => {
      width = next;
    },
  };
}

describe('G2 native annotation adapter', () => {
  it('fills the complete quadrant plot and keeps region names inside their own bounds after resize', () => {
    const data = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ];
    const { chart, draw, marks, resize } = setup(data);
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [{ type: 'quadrant', data: { x: 4, y: 6 } }],
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    const assertRegions = (width: number) => {
      const geometry = draw();
      const regions = marks().flatMap((mark, i) => (mark.zIndex === -1 ? [geometry[i][0]] : []));
      expect(regions).toHaveLength(4);
      const area = regions.reduce((sum, points) => {
        const xs = points.map(([x]) => x),
          ys = points.map(([, y]) => y);
        expect(Math.min(...xs)).toBeGreaterThanOrEqual(0);
        expect(Math.max(...xs)).toBeLessThanOrEqual(width);
        return sum + (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
      }, 0);
      expect(area).toBeCloseTo(width * 100);
      const text = marks().flatMap((mark, i) => (mark.encode.text ? [center(geometry[i][0])] : []));
      expect(text).toEqual([
        [width * 0.7, 18],
        [width * 0.2, 18],
        [width * 0.2, 58],
        [width * 0.7, 58],
      ]);
    };
    assertRegions(100);
    resize();
    assertRegions(200);
  });

  it('supplies native sizes and data for every dynamically resolved marker', () => {
    const data = [0, 8, 0, 8, 0].map((y, i) => ({ x: i * 2, y }));
    const { chart, draw, marks, channels } = setup(data, { shape: 'smooth' });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'line',
      chart,
      annotations: [{ type: 'crossing', threshold: 4 }],
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    const geometry = draw();
    for (const [i, mark] of marks().entries()) {
      if (!['triangle', 'triangleDown'].includes(mark.style.shape)) continue;
      expect(geometry[i]).toHaveLength(2);
      expect(mark.data).toHaveLength(2);
      expect(channels[i].size).toEqual([7, 7]);
    }
  });

  it.each(['smooth', 'hv'])(
    'allows an empty %s path without drawing synthetic crossings',
    (shape) => {
      const data = [
        { x: 0, y: NaN },
        { x: 10, y: NaN },
      ];
      const { chart, draw, marks } = setup(data, { shape });
      bindAnnotations({
        renderer: 'g2',
        chartType: 'line',
        chart,
        annotations: [{ type: 'crossing', threshold: 4 }],
        mapping: { x: 'x', y: 'y', data },
        themeObject: theme,
      });
      const geometry = draw();
      const markers = marks().flatMap((mark, i) =>
        ['triangle', 'triangleDown'].includes(mark.style.shape) ? geometry[i] : [],
      );
      expect(markers).toEqual([]);
    },
  );

  it.each([
    ['smooth', [6.946, 72.216]],
    ['hv', [20, 100]],
    ['vh', [0, 20]],
    ['hvh', [10, 60]],
  ] as const)(
    'locates %s crossings on native curves and retains them after resize',
    (shape, expected) => {
      const data = [
        { x: 0, y: 0 },
        { x: 2, y: 8 },
        { x: 10, y: 0 },
      ];
      const { chart, draw, marks, resize } = setup(data, { shape });
      bindAnnotations({
        renderer: 'g2',
        chartType: 'line',
        chart,
        annotations: [{ type: 'crossing', threshold: 4 }],
        mapping: { x: 'x', y: 'y', data },
        themeObject: theme,
      });
      const assertPositions = (factor: number) => {
        const geometry = draw();
        const markers = marks().flatMap((mark, i) =>
          mark.style.shape === 'triangle' || mark.style.shape === 'triangleDown'
            ? geometry[i].map(center)
            : [],
        );
        expect(markers).toHaveLength(2);
        markers.forEach(([x, y], i) => {
          expect(Math.abs(x - expected[i] * factor)).toBeLessThan(0.15);
          expect(y).toBeCloseTo(60, 5);
        });
      };
      assertPositions(1);
      resize();
      assertPositions(2);
      resize(200.1234);
      assertPositions(2.001234);
    },
  );

  it('renders reference calculations and interpolated crossings with real G2 geometry after resize', () => {
    const data = [
      { x: 2, y: 2 },
      { x: 8, y: 6 },
    ];
    const { chart, draw, resize, marks } = setup(data);
    bindAnnotations({
      renderer: 'g2',
      chartType: 'line',
      chart,
      annotations: [
        { type: 'mean' },
        { type: 'rangeY', range: [2, 6] },
        { type: 'crossing', threshold: 4 },
      ],
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    const geometry = draw();
    expect(geometry[0][0]).toEqual([
      [0, 60],
      [100, 60],
    ]);
    expect(center(geometry[geometry.length - 1][0])).toEqual([50, 60]);
    expect(marks().at(-1)!.style.shape).toBe('triangle');
    resize();
    const updated = draw();
    expect(updated[0][0]).toEqual([
      [0, 60],
      [200, 60],
    ]);
    expect(center(updated[updated.length - 1][0])).toEqual([100, 60]);
  });

  it('finds two smooth-series intersections between observations whose ordering never changes', () => {
    const data = [
      ...[5, 5, 6, 10].map((y, i) => ({ x: [0, 2, 8, 10][i], y, group: 'A' })),
      ...[0, 4.9, 5.9, 5.9].map((y, i) => ({ x: [0, 2, 8, 10][i], y, group: 'B' })),
    ];
    const { chart, draw, marks } = setup(data, { shape: 'smooth' });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'line',
      chart,
      annotations: [{ type: 'crossing', data: { series: [{ group: 'A' }, { group: 'B' }] } }],
      mapping: { x: 'x', y: 'y', series: 'group', data },
      themeObject: theme,
    });
    const geometry = draw();
    const xs = marks()
      .flatMap((mark, i) =>
        ['triangle', 'triangleDown'].includes(mark.style.shape)
          ? geometry[i].map((points) => center(points)[0])
          : [],
      )
      .sort((a, b) => a - b);
    expect(xs).toHaveLength(2);
    expect(xs[0]).toBeCloseTo(23.167, 0);
    expect(xs[1]).toBeCloseTo(76.833, 0);
  });

  it.each(['line', 'smooth', 'hv', 'vh', 'hvh'])(
    'removes %s crossing markers and bands when either source series is hidden, then restores them',
    (shape) => {
      const data = [
        { x: 0, y: 0, group: 'A' },
        { x: 10, y: 8, group: 'A' },
        { x: 0, y: 8, group: 'B' },
        { x: 10, y: 0, group: 'B' },
      ];
      const { chart, draw } = setup(data, { shape });
      bindAnnotations({
        renderer: 'g2',
        chartType: 'line',
        chart,
        annotations: [{ type: 'crossing', data: { series: [{ group: 'A' }, { group: 'B' }] } }],
        mapping: { x: 'x', y: 'y', series: 'group', data },
        themeObject: theme,
      });
      const initial = draw();
      expect(initial.flat().length).toBeGreaterThan(0);
      for (const group of ['A', 'B']) {
        expect(draw(data.filter((row) => row.group === group)).flat()).toEqual([]);
        expect(draw()).toEqual(initial);
      }
      expect(draw([]).flat()).toEqual([]);
    },
  );

  it.each(['line', 'smooth', 'hv'])(
    'hides %s threshold crossings with their series while retaining the independent reference',
    (shape) => {
      const data = [
        { x: 0, y: 0, group: 'A' },
        { x: 10, y: 8, group: 'A' },
        { x: 0, y: 8, group: 'B' },
        { x: 10, y: 0, group: 'B' },
      ];
      const { chart, draw, marks } = setup(data, { shape });
      bindAnnotations({
        renderer: 'g2',
        chartType: 'line',
        chart,
        annotations: [{ type: 'crossing', threshold: 4, data: { group: 'A' } }],
        mapping: { x: 'x', y: 'y', series: 'group', data },
        themeObject: theme,
      });
      const initial = draw();
      expect(initial.flat().length).toBeGreaterThan(1);
      const hidden = draw(data.filter((row) => row.group === 'B'));
      expect(
        hidden.filter((_, i) => marks()[i].labels[0]?.text() !== 'Threshold: 4').flat(),
      ).toEqual([]);
      expect(hidden.flat()).toHaveLength(1);
      expect(draw()).toEqual(initial);
    },
  );

  it.each(['smooth', 'hv', 'vh', 'hvh'])(
    'does not reconnect excluded observations on the native %s curve',
    (shape) => {
      const data = [
        { x: 0, y: 0 },
        { x: 2, y: NaN },
        { x: 4, y: 8 },
        { x: 6, y: 0 },
        { x: 8, y: 8 },
      ];
      const { chart, draw, marks } = setup(data, { shape });
      bindAnnotations({
        renderer: 'g2',
        chartType: 'line',
        chart,
        annotations: [{ type: 'crossing', threshold: 4, data: [{ x: 0 }, { x: 4 }, { x: 8 }] }],
        mapping: { x: 'x', y: 'y', data },
        themeObject: theme,
      });
      const geometry = draw();
      expect(
        geometry.filter((_, i) => marks()[i].labels[0]?.text() !== 'Threshold: 4').flat(),
      ).toEqual([]);
    },
  );

  it.each(['hv', 'vh', 'hvh'])(
    'does not retain a %s jump from an excluded neighbour at a selection boundary',
    (shape) => {
      for (const values of [
        [0, 8, 8],
        [0, 0, 8],
      ]) {
        const data = values.map((y, i) => ({ x: i * 2, y }));
        const selection = values[1] === 8 ? [{ x: 2 }, { x: 4 }] : [{ x: 0 }, { x: 2 }];
        const { chart, draw, marks } = setup(data, { shape });
        bindAnnotations({
          renderer: 'g2',
          chartType: 'line',
          chart,
          annotations: [{ type: 'crossing', threshold: 4, data: selection }],
          mapping: { x: 'x', y: 'y', data },
          themeObject: theme,
        });
        const geometry = draw();
        expect(
          geometry
            .filter((_, i) => ['triangle', 'triangleDown'].includes(marks()[i].style.shape))
            .flat(),
        ).toEqual([]);
      }
    },
  );

  it.each(['smooth', 'hv'])('does not bridge gaps or mark tangencies on %s paths', (shape) => {
    const data = [
      { x: 0, y: 0 },
      { x: 2, y: NaN },
      { x: 4, y: 8 },
      { x: 6, y: 8 },
      { x: 8, y: 0 },
    ];
    const { chart, draw, marks } = setup(data, { shape });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'line',
      chart,
      annotations: [
        { type: 'crossing', threshold: 4 },
        { type: 'crossing', threshold: 8 },
      ],
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    const geometry = draw();
    const markers = marks().flatMap((mark, i) =>
      ['triangle', 'triangleDown'].includes(mark.style.shape) ? geometry[i].map(center) : [],
    );
    expect(markers).toHaveLength(1);
    expect(markers[0][0]).toBeGreaterThanOrEqual(60);
    expect(markers[0][1]).toBeCloseTo(60, 5);
  });

  it.each(['line', 'area'] as const)(
    'draws merged %s observation highlights through point with native positions and paint',
    (chartType) => {
      const data = [
        { x: 2, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 5 },
      ];
      const { chart, draw, marks } = setup(data, { view: true });
      bindAnnotations({
        renderer: 'g2',
        chartType,
        chart,
        annotations: [
          { type: 'bottomN', n: 1, label: '', style: { fill: '#f00' } },
          { type: 'path', data: { y: 3 } },
          { type: 'bottomN', n: 1, label: '', style: { stroke: '#00f', fillOpacity: 0.7 } },
        ],
        mapping: { x: 'x', y: 'y', data },
        themeObject: theme,
      });
      const geometry = draw(data, [[[20, 55]], [[20, 25]], [[30, 10]]], undefined, [[0], [1], [2]]);
      expect(marks()).toHaveLength(2); // One point for the union, plus the independent reference path.
      expect(center(geometry[0][0])).toEqual([20, 55]);
      expect(marks()[0].style).toMatchObject({ shape: 'circle', stroke: '#00f', fillOpacity: 0.7 });
      const source = (chart.options() as Options).children[0];
      expect(data.map((row) => source.style.opacity(row))).toEqual([1, 0.16, 0.16]);
    },
  );

  it.each(['rangeInside', 'rangeOutside'] as const)(
    'combines %s with native range geometry on a transposed view',
    (type) => {
      const data = [
        { x: 'A', y: 2 },
        { x: 'B', y: 7 },
      ];
      const { chart, draw, marks } = setup(data, { band: true, transpose: true });
      bindAnnotations({
        renderer: 'g2',
        chartType: 'bar',
        chart,
        annotations: [{ type, range: [3, 8], label: '' }],
        mapping: { x: 'x', y: 'y', data },
        themeObject: theme,
      });
      const geometry = draw();
      expect(geometry).toHaveLength(1);
      expect(marks()[0].style.stroke).toBe('none');
      expect(geometry[0][0]).toEqual([
        [80, 0],
        [80, 100],
        [30, 100],
        [30, 0],
      ]);
      const source = (chart.options() as Options).children[0];
      expect(data.map((row) => source.style.opacity(row))).toEqual(
        type === 'rangeInside' ? [0.16, 1] : [1, 0.16],
      );
    },
  );

  it.each([NaN, Infinity])('lays out labels across missing line values (%s)', (missing) => {
    const { chart, draw, coordinate } = setup([], { view: true });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'line',
      chart,
      annotations: [{ type: 'path', data: { y: 5 }, label: 'Threshold' }],
      mapping: { x: 'x', y: 'y', data: [] as Row[] },
      themeObject: theme,
    });
    draw();
    const connector = { style: { lineWidth: 1 }, setAttribute: vi.fn() };
    const background = { getLocalBounds: () => ({ min: [-15, -10], max: [15, 0] }) };
    const label = {
      style: { x: 50, y: 50 } as Record<string, unknown>,
      children: [],
      getRenderBounds() {
        const x = Number(this.style.x),
          y = Number(this.style.y);
        return { min: [x - 15, y - 10], max: [x + 15, y] };
      },
      getBounds() {
        return this.getRenderBounds();
      },
      getAttribute: (name: string) => ({ annotationLabel: 'path', annotationGap: 4 })[name],
      attr(values: Record<string, unknown>) {
        Object.assign(this.style, values);
      },
      getElementById: (id: string) => (id === 'connector' ? connector : background),
    };
    const points: Point[] = [
      [0, 60],
      [20, 40],
      [40, missing],
      [60, 60],
      [100, 40],
    ];
    const element = {
      nodeName: 'path',
      __data__: { points },
      getAttribute: () => undefined,
    };
    const update = (chart.options() as Options).labelTransform[0].type();
    update([label], {
      coordinate,
      layout: { width: 100, height: 100 },
      canvas: { document: { querySelectorAll: () => [element] } },
    });
    expect(Number.isFinite(label.style.x)).toBe(true);
    expect(Number.isFinite(label.style.y)).toBe(true);
  });

  it('anchors a computed highlight label to one of two identical observations', () => {
    const data = [
      { x: 2, y: 4 },
      { x: 2, y: 4 },
      { x: 3, y: 5 },
    ];
    const { chart, draw } = setup(data);
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [{ type: 'bottomN', label: 'Lowest', n: 1 }],
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    const source = (chart.options() as Options).children[0];
    expect(data.map((row) => source.style.opacity(row))).toEqual([1, 0.16, 0.16]);
    expect(center(draw()[0][0])).toEqual([20, 60]);
  });

  it('places group notes independently of missing observations and follows visibility and resize', () => {
    const data = [
      { x: 2, y: NaN, group: 'A' },
      { x: 4, y: 6, group: 'A' },
      { x: 8, y: 3, group: 'B' },
    ];
    const { chart, draw, marks, resize } = setup(data, { view: true });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'line',
      chart,
      annotations: [{ type: 'group', data: { group: 'A' }, label: 'Selected series' }],
      mapping: { x: 'x', y: 'y', series: 'group', data },
      themeObject: theme,
    });
    expect(draw()[0]).toEqual([[[90, 10]]]);
    expect(marks()[0].labels[0]).toMatchObject({ annotationNote: true, connector: false });
    resize();
    expect(draw()[0]).toEqual([[[190, 10]]]);
    expect(draw([data[2]])[0]).toEqual([]);
    expect(draw([data[0]])[0]).toEqual([]);
  });

  it('retains field matching for public highlight selectors passed as original objects', () => {
    const data = [
      { x: 2, y: 4 },
      { x: 2, y: 4 },
      { x: 3, y: 5 },
    ];
    const { chart } = setup(data);
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [{ type: 'highlight', data: data[0] }],
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    const source = (chart.options() as Options).children[0];
    expect(data.map((row) => source.style.opacity(row))).toEqual([1, 1, 0.16]);
  });

  it.each(['line', 'area', 'column', 'bar', 'scatter'] as const)(
    'brackets each %s contribution selection, keeps emphasis unions, and follows visibility',
    (chartType) => {
      const data = [
        { x: 1, y: 2 },
        { x: 4, y: 6 },
        { x: 9, y: 3 },
        { x: 10, y: 1 },
      ];
      const { chart, draw, marks, resize } = setup(data, { transpose: chartType === 'bar' });
      bindAnnotations({
        renderer: 'g2',
        chartType,
        chart,
        annotations: [
          { type: 'contribution', data: [{ x: 1 }, { x: 4 }], style: { stroke: '#125ea8' } },
          { type: 'contribution', data: [{ x: 4 }, { x: 9 }], style: { stroke: '#a85212' } },
        ],
        mapping: { x: 'x', y: 'y', data },
        themeObject: theme,
      });
      draw();
      const labels = marks()
        .flatMap((mark) => mark.labels ?? [])
        .filter((label) => label.annotationBracket);
      expect(labels).toHaveLength(2);
      labels.forEach((label) => expect(label.annotationBracket().paths).toHaveLength(1));
      expect(labels.map((label) => label.connectorStroke)).toEqual(['#125ea8', '#a85212']);
      const source = (chart.options() as Options).children[0];
      expect(data.map((row) => source.style.opacity(row))).toEqual([1, 1, 1, 0.16]);
      const before = labels[0].annotationBracket();
      expect(before.paths[0].at(0)).not.toEqual(before.paths[0].at(-1));
      resize();
      draw();
      expect(labels[0].annotationBracket()).not.toEqual(before);
      draw([data[1]]);
      labels.forEach((label) => expect(label.annotationBracket().paths).toHaveLength(1));
      draw([]);
      labels.forEach((label) => expect(label.annotationBracket()).toBeUndefined());
    },
  );

  it.each([0, 0.6])(
    'brackets actual pie sectors outside the circle with innerRadius=%s',
    (innerRadius) => {
      const data = [
        { x: 'A', y: 80 },
        { x: 'B', y: 20 },
      ];
      const { chart, draw, marks, coordinate } = setup(data);
      const map = ([radius, angle]: Point): Point => [
        50 + (innerRadius + (1 - radius) * (1 - innerRadius)) * 50 * Math.cos(angle * Math.PI * 2),
        50 + (innerRadius + (1 - radius) * (1 - innerRadius)) * 50 * Math.sin(angle * Math.PI * 2),
      ];
      Object.assign(coordinate, {
        map,
        invert: ([x, y]: Point): Point => [
          (1 - Math.hypot(x - 50, y - 50) / 50) / (1 - innerRadius),
          (Math.atan2(y - 50, x - 50) / (Math.PI * 2) + 1) % 1,
        ],
        getOptions: () => ({ transformations: [['polar']] }),
      });
      chart.options({ type: 'interval', data, encode: { y: 'y' } });
      bindAnnotations({
        renderer: 'g2',
        chartType: 'pie',
        chart,
        annotations: [{ type: 'contribution', data: [{ x: 'A' }, { x: 'B' }] }],
        mapping: { x: 'x', y: 'y', data },
        themeObject: theme,
      });
      const sector = (start: number, end: number) => [
        map([0, start]),
        map([1, start]),
        map([1, end]),
        map([0, end]),
      ];
      const geometry = [sector(0, 0.8), sector(0.8, 1)];
      const channels = [
        { y: 0, y1: 0.8 },
        { y: 0.8, y1: 1 },
      ];
      const [explanation] = draw(data, geometry, undefined, undefined, channels);
      expect(center(explanation[0])).toEqual([-10, 50]);
      const label = marks()[0].labels[0];
      expect(label.text()).toBe('Selected 2 items: 100%');
      const assertBracket = (angle?: number) => {
        const bracket = label.annotationBracket();
        if (angle === undefined) {
          expect(bracket).toBeUndefined();
          return;
        }
        expect(bracket.paths).toHaveLength(1);
        expect(bracket.anchor[0]).toBeCloseTo(50 + 60 * Math.cos(angle * Math.PI * 2));
        expect(bracket.anchor[1]).toBeCloseTo(50 + 60 * Math.sin(angle * Math.PI * 2));
        bracket.paths[0].forEach(([x, y]: Point) =>
          expect(Math.hypot(x - 50, y - 50)).toBeGreaterThan(50),
        );
      };
      assertBracket(0.5);
      draw([data[1]], [geometry[1]], undefined, undefined, [channels[1]]);
      assertBracket(0.9);
      expect(draw([], [], undefined, undefined, [])[0]).toEqual([]);
      assertBracket();
      draw([data[0]], [sector(0, 1)], undefined, undefined, [{ y: 0, y1: 1 }]);
      assertBracket(0.5); // Full circles have coincident outer vertices.
    },
  );

  it('routes a separate leader from every selected sector to one measured explanation', () => {
    const { chart, draw, coordinate } = setup();
    bindAnnotations({
      renderer: 'g2',
      chartType: 'pie',
      chart,
      annotations: [{ type: 'highlight', data: { x: 'A' }, label: 'Focus' }],
      mapping: { x: 'x', y: 'y', data: [{ x: 'A', y: 10 }] },
      themeObject: theme,
    });
    draw();
    const connector = { style: { lineWidth: 1 }, setAttribute: vi.fn() };
    const label = {
      style: { x: 50, y: 50 },
      children: [],
      getRenderBounds() {
        return {
          min: [this.style.x - 10, this.style.y - 5],
          max: [this.style.x + 10, this.style.y + 5],
        };
      },
      getBounds() {
        return this.getRenderBounds();
      },
      getAttribute: (name: string) =>
        ({
          annotationLabel: 'highlight',
          annotationRadial: true,
          annotationGap: 10,
          annotationAnchors: [
            [10, 50],
            [90, 50],
          ],
        })[name],
      attr(values: Record<string, unknown>) {
        Object.assign(this.style, values);
      },
      getElementById: (id: string) =>
        id === 'connector'
          ? connector
          : { getLocalBounds: () => ({ min: [-10, -5], max: [10, 5] }) },
    };
    (chart.options() as Options).labelTransform[0].type()([label], {
      coordinate,
      layout: { width: 100, height: 100 },
      canvas: { document: { querySelectorAll: () => [] } },
    });
    const path = connector.setAttribute.mock.calls.find(([key]) => key === 'd')![1] as [
      string,
      number,
      number,
    ][];
    expect(path.filter(([command]) => command === 'M')).toEqual([
      ['M', -40, 0],
      ['M', 40, 0],
    ]);
    expect(path.filter(([command]) => command === 'L')).toEqual([
      ['L', -10, 0],
      ['L', 10, 0],
    ]);
  });

  it('keeps resolved points at their anchors when native channels contain interval ends', () => {
    const { chart, draw, marks, coordinate } = setup();
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [{ type: 'point', data: { x: 2, y: 5 } }],
      mapping: { x: 'x', y: 'y', data: [] as Row[] },
      themeObject: theme,
    });
    draw();
    const mark = marks()[0];
    const [, points] = (mark.type(mark) as SingleMark)(
      [0],
      {},
      { x1: [0.9], y1: [0.9], dx: [0.2], dy: [0.2], size: [5] },
      coordinate,
    );
    expect(center(points[0])).toEqual([20, 50]);
  });
  beforeEach(() => {
    vi.stubGlobal('window', {
      matchMedia: () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  it('preserves mixed annotation order, path order, original fields and point batches', () => {
    const data = [
      { x: 2, y: 4 },
      { x: 8, y: 6 },
    ];
    const { chart, draw } = setup(data);
    const annotations: Extract<
      Annotation<Row>,
      { type: 'path' | 'range' | 'connector' | 'point' | 'text' }
    >[] = [
      { type: 'path', data: [{ x: 8 }, { x: 2 }, { x: 5, y: 3 }] },
      { type: 'point', data: [{ x: 2 }, { x: 4.5, y: 5.5 }] },
      { type: 'text', data: { x: 7, y: 1 }, label: '独立文字' },
      {
        type: 'path',
        data: [
          { x: 1, y: 2 },
          { x: 9, y: 8 },
        ],
      },
    ];
    const before = structuredClone({ annotations, data });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations,
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    const geometry = draw();
    expect(geometry[0]).toEqual([
      [
        [80, 40],
        [20, 60],
        [50, 70],
      ],
    ]);
    expect(geometry[1].map(center)).toEqual([
      [20, 60],
      [45, 45],
    ]);
    expect(geometry[2]).toEqual([[[70, 90]]]);
    expect(geometry[3]).toEqual([
      [
        [10, 80],
        [90, 20],
      ],
    ]);
    expect({ annotations, data }).toEqual(before);
  });

  it('keeps complete coordinates independent when multiple series overlap', () => {
    const data = [
      { x: 1, y: 2, group: 'A' },
      { x: 1, y: 2, group: 'B' },
    ];
    const { chart, draw } = setup(data);
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [{ type: 'point', data: { x: 1, y: 2 } }],
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    expect(center(draw([])[0][0])).toEqual([10, 80]);
  });

  it.each([false, true])('follows filtered data and current scales, including view=%s', (view) => {
    const data = [
      { x: 2, y: 4, group: 'A' },
      { x: 8, y: 6, group: 'B' },
    ];
    const { chart, draw } = setup(data, { view });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [
        {
          type: 'point',
          data: [
            { x: 2, group: 'A' },
            { x: 8, group: 'B' },
          ],
        },
        { type: 'point', data: { x: 2, y: 4 } },
        { type: 'text', data: { x: 2, group: 'A' }, label: 'selected' },
        {
          type: 'path',
          data: [
            { x: 2, group: 'A' },
            { x: 8, group: 'B' },
          ],
        },
        {
          type: 'connector',
          data: [
            { x: 2, group: 'A' },
            { x: 8, group: 'B' },
          ],
        },
        { type: 'path', data: { y: 5 } },
        { type: 'range', data: { x: [2, 4] } },
      ],
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    const original = draw();
    expect(original[0].map(center)).toEqual([
      [20, 60],
      [80, 40],
    ]);
    const filtered = draw(data.slice(1), [], {
      x: { map: (x) => x / 10, getOptions: () => ({ type: 'linear' }) },
      y: { map: (y) => 1 - (y - 5) / 5, getOptions: () => ({ type: 'linear' }) },
    });
    expect(filtered[0].map(center)).toEqual([[80, 80]]);
    expect(filtered[1].map(center)).toEqual([[20, 120]]);
    expect(filtered.slice(2, 5)).toEqual([[], [], []]);
    const empty = draw([]);
    expect(empty[0]).toEqual([]);
    expect(empty[1]).toHaveLength(1);
    expect(empty[5]).toHaveLength(1);
    expect(empty[6]).toHaveLength(1);
    expect(draw()).toEqual(original);
  });

  it('anchors selected rows to supplied interval endpoints in transposed coordinates', () => {
    const data = [
      { x: 'B', y: -2, group: 'One' },
      { x: 'B', y: -3, group: 'Two' },
    ];
    const { chart, draw } = setup(data, { band: true, transpose: true });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [
        { type: 'point', data: { x: 'B', group: 'Two' } },
        { type: 'point', data: data[1] },
        { type: 'point', data: { x: 'B', y: -3 } },
        { type: 'point', data: { x: 'B', group: 'One' } },
      ],
      mapping: { x: 'x', y: 'y', data, interval: true },
      themeObject: theme,
    });
    const geometry = draw(data.slice(1), [
      [
        [-50, 52],
        [-50, 68],
        [-20, 68],
        [-20, 52],
      ],
    ]);
    expect(geometry.slice(0, 3).map((points) => center(points[0]))).toEqual([
      [-50, 60],
      [-50, 60],
      [-30, 70],
    ]);
    expect(geometry[3]).toEqual([]);
  });

  it('uses native spanning lines and inclusive reversed ranges in transposed coordinates', () => {
    const { chart, draw } = setup([], { band: true, transpose: true });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [
        { type: 'path', data: { x: 'A' } },
        { type: 'path', data: { y: 5 } },
        { type: 'range', data: { x: ['B', 'A'] } },
        { type: 'range', data: { y: [2, 6] } },
        { type: 'range', data: { x: ['A', 'A'], y: [2, 6] } },
      ],
      mapping: { x: 'x', y: 'y', data: [] as Row[] },
      themeObject: theme,
    });
    expect(draw()).toEqual([
      [
        [
          [0, 20],
          [100, 20],
        ],
      ],
      [
        [
          [50, 0],
          [50, 100],
        ],
      ],
      [
        [
          [100, 0],
          [100, 90],
          [0, 90],
          [0, 0],
        ],
      ],
      [
        [
          [60, 0],
          [60, 100],
          [20, 100],
          [20, 0],
        ],
      ],
      [
        [
          [60, 0],
          [60, 40],
          [20, 40],
          [20, 0],
        ],
      ],
    ]);
  });

  it('rejects non-axis range fields when rendering', () => {
    const { chart, draw } = setup();
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [{ type: 'range', data: { x: [1, 2], group: ['A', 'B'] } }],
      mapping: { x: 'x', y: 'y', data: [] as Row[] },
      themeObject: theme,
    });
    expect(draw).toThrow('range only accepts axis fields');
  });

  it('resolves unique data selectors and known categories when rendering', () => {
    const data = [
      { x: 'A', y: 2, group: 'One' },
      { x: 'A', y: 3, group: 'Two' },
    ];
    for (const [position, message] of [
      [{ x: 'A' }, 'matches 2 data objects'],
      [{ x: 'C' }, 'matches 0 data objects'],
      [{ x: 'C', y: 2 }, 'unknown category'],
    ] as const) {
      const { chart, draw } = setup(data, { band: true });
      bindAnnotations({
        renderer: 'g2',
        chartType: 'scatter',
        chart,
        annotations: [{ type: 'point', data: position }],
        mapping: { x: 'x', y: 'y', data },
        themeObject: theme,
      });
      expect(draw).toThrow(message);
    }
  });

  it('keeps main data, scales, transforms, tooltip and interaction separate from annotation channels', () => {
    const data = [{ x: 1, y: 2 }];
    const { chart, marks } = setup(data);
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [{ type: 'path', data: { y: 1000 } }],
      mapping: { x: 'x', y: 'y', data },
      themeObject: theme,
    });
    const options = chart.options() as Options;
    expect(options.interaction).toEqual({ tooltip: true });
    expect(options.children[0]).toMatchObject({
      data,
      encode: { x: 'x', y: 'y', color: 'group' },
      scale: { y: { nice: true } },
    });
    expect(marks()[0]).toMatchObject({
      axis: false,
      legend: false,
      tooltip: false,
      animate: false,
      scale: { x: { key: 'annotation-x', domain: [0, 1] }, color: { key: 'annotation-color' } },
    });
    expect(options.data).toBeUndefined();
    expect(options.encode).toBeUndefined();
  });

  it('maps nested styles to marks and labels without fading range labels', () => {
    const { chart, marks, draw } = setup();
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [
        {
          type: 'range',
          data: { x: [2, 4] },
          label: '区域',
          style: {
            stroke: '#f80',
            fillOpacity: 0.15,
          },
        },
        {
          type: 'point',
          data: { x: 2, y: 4 },
          label: '标记',
          style: {
            labelFill: '#123456',
            labelFontSize: 18,
          },
        },
        {
          type: 'text',
          data: { x: 2, y: 4 },
          label: '独立\n文字',
          style: {
            labelFontSize: 16,
          },
        },
        {
          type: 'point',
          data: { x: 6, y: 3 },
          style: {
            fill: '#f80',
          },
        },
      ],
      mapping: { x: 'x', y: 'y', data: [] as Row[] },
      themeObject: theme,
    });
    draw();
    const [range, point, text, filledPoint] = marks();
    expect(point.style.fill).toBe('transparent');
    expect(filledPoint.style.fill).toBe('#f80');
    expect(range.style.fillOpacity).toBe(0.15);
    expect(range.style.stroke).toBe('#f80');
    expect(range.zIndex).toBe(-1);
    expect(range.labels[0].fillOpacity).toBe(1);
    expect(range.labels[0].backgroundStroke).toBe(theme.theme.category10![0]);
    expect(range.labels[0].backgroundStrokeOpacity).toBe(0.3);
    expect(point.labels[0]).toMatchObject({
      annotationLabel: 'point',
      fill: '#123456',
      fontSize: 18,
      background: true,
      backgroundPadding: [8, 10],
      wordWrap: true,
      maxLines: Infinity,
      textOverflow: 'clip',
    });
    expect(point.labels[0].wordWrapWidth()).toBe(80);
    expect(text.labels).toEqual([]);
    expect(text.style).toMatchObject({ fontSize: 16, textAlign: 'center', textBaseline: 'middle' });
    expect(range.labels[0].backgroundPadding).not.toEqual(point.labels[0].backgroundPadding);
  });

  it.each(['default', 'dark', 'academy', 'neon-circuit'] as const)(
    'distinguishes %s reference lines from data colors and preserves explicit strokes',
    (name) => {
      const data = [
        { x: 2, y: 4 },
        { x: 8, y: 6 },
      ];
      const { chart, draw, marks } = setup(data);
      const appearance = getThemeObject('scatter', name);
      bindAnnotations({
        renderer: 'g2',
        chartType: 'scatter',
        chart,
        annotations: [
          { type: 'mean' },
          {
            type: 'path',
            data: [
              { x: 2, y: 4 },
              { x: 8, y: 6 },
            ],
          },
          { type: 'thresholdHighlight', threshold: 5, style: { fill: '#f00' } },
          { type: 'thresholdX', threshold: 5, style: { stroke: '#f80' } },
        ],
        mapping: { x: 'x', y: 'y', data },
        themeObject: appearance,
      });
      draw();
      const [mean, connected, threshold, custom] = marks();
      for (const reference of [mean, threshold]) {
        expect(reference.style).toMatchObject({
          stroke: appearance.theme.label!.fill,
          lineDash: [4, 4],
        });
        expect(reference.zIndex).toBe(1);
      }
      expect(connected.style.stroke).toBe(appearance.theme.category10![0]);
      expect((chart.options() as Options).children[0].style.fill(data[1])).toBe('#f00');
      expect(custom.style.stroke).toBe('#f80');
    },
  );

  it('uses theme widths with local overrides and keeps connector anchors at the supplied positions', () => {
    const { chart, draw, marks } = setup();
    const appearance = getThemeObject('scatter', 'default', {
      mark: {
        line: { lineWidth: 6 },
        point: { lineWidth: 7, size: 9, stroke: '#123' },
        connector: { lineWidth: 4 },
        interval: { lineWidth: 0 },
      },
    });
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [
        { type: 'path', data: { x: 2 } },
        { type: 'range', data: { x: [2, 4] } },
        {
          type: 'point',
          data: { x: 2, y: 5 },
          style: {
            lineWidth: 2,
            size: 7,
            stroke: '#f80',
          },
        },
        {
          type: 'connector',
          data: [
            { x: 1, y: 1 },
            { x: 1.1, y: 1 },
          ],
          label: 'short',
          style: {
            lineWidth: 5,
          },
        },
        {
          type: 'connector',
          data: [
            { x: 1, y: 1 },
            { x: 1, y: 1 },
          ],
        },
      ],
      mapping: { x: 'x', y: 'y', data: [] as Row[] },
      themeObject: appearance,
    });
    draw();
    expect(marks().map((mark) => mark.style.lineWidth)).toEqual([6, 0, 2, 5, 4]);
    expect(marks()[2].encode.size).toBe(7);
    expect(marks()[2].style.stroke).toBe('#f80');
    expect(marks()[3].labels[0].annotationAnchor()).toEqual([10.5, 90]);
    expect(draw()[4][0]).toEqual([
      [10, 90],
      [10, 90],
    ]);
  });

  it('places connector labels on their curve or comparison span after resize', () => {
    const { chart, draw, marks, resize } = setup();
    bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [
        {
          type: 'connector',
          shape: 'curve',
          data: [
            { x: 2, y: 2 },
            { x: 8, y: 8 },
          ],
          label: 'change',
          style: {
            stroke: '#b45309',
          },
        },
        {
          type: 'connector',
          shape: 'dimension',
          orientation: 'horizontal',
          data: [
            { x: 2, y: 2 },
            { x: 8, y: 8 },
          ],
          label: '+6',
        },
      ],
      mapping: { x: 'x', y: 'y', data: [] as Row[] },
      themeObject: theme,
    });
    draw();
    const [curve, dimension] = marks();
    expect(curve.labels[0].annotationAnchor()[1]).toBeLessThan(50);
    expect(curve.labels[0].fill).toBe('#b45309');
    const before = dimension.labels[0].annotationAnchor();
    expect(before[0]).toBe(50);
    resize();
    draw();
    expect(dimension.labels[0].annotationAnchor()[0]).toBe(100);
    expect(dimension.labels[0].annotationAnchor()[1]).toBe(before[1]);
  });

  it('recomputes positions on resize and disables disposed annotations', () => {
    const { chart, draw, resize, library, marks, coordinate } = setup();
    const cleanup = bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [{ type: 'point', data: { x: 2, y: 5 } }],
      mapping: { x: 'x', y: 'y', data: [] as Row[] },
      themeObject: theme,
    });
    expect(center(draw()[0][0])).toEqual([20, 50]);
    resize();
    expect(center(draw()[0][0])).toEqual([40, 50]);
    const mark = marks()[0];
    const geometry = mark.type(mark);
    cleanup();
    cleanup();
    expect(library['transform.annotationSource']).toBeTypeOf('function');
    expect(geometry([], {}, {}, coordinate)).toEqual([[], []]);
  });

  it.each([
    { chartType: 'scatter', type: 'point', pulse: false },
    { chartType: 'scatter', type: 'point', pulse: true },
    { chartType: 'scatter', type: 'point', pulse: undefined },
    { chartType: 'line', type: 'topN', pulse: undefined },
    { chartType: 'area', type: 'topN', pulse: undefined },
  ] as const)(
    'updates and cleans native point halos for $chartType $type (pulse=$pulse)',
    ({ chartType, type, pulse }) => {
      const data: Row[] = [
        { x: 4, y: 5 },
        { x: 8, y: 2 },
      ];
      const { chart, library, draw, marks, coordinate } = setup(data);
      if (chartType !== 'scatter')
        chart.options({ type: chartType, data, encode: { x: 'x', y: 'y' } });
      const parent = { appendChild: vi.fn() };
      const halo = { animate: vi.fn(() => null), destroy: vi.fn() };
      const active = {
        __data__: { points: [] },
        style: {} as Record<string, unknown>,
        parentNode: parent,
        setAttribute(name: string, value: unknown) {
          this.style[name] = value;
        },
        getAttribute(name: string) {
          return this.style[name];
        },
      };
      const original = {
        markType: 'point',
        __data__: {
          points: [
            [35, 45],
            [45, 55],
          ],
        },
        __removed__: false,
        isVisible: () => true,
        getAttribute: () => undefined,
        getLocalBounds: () => ({ halfExtents: [5, 5], min: [35, 45], max: [45, 55] }),
      };
      const scene = {
        querySelectorAll: () => [original, active, { ...active, __removed__: true }],
        createElement: vi.fn((_tag: string, options: { className?: string }) =>
          options.className === 'annotation-pulse' ? halo : active,
        ),
      };
      vi.spyOn(chart, 'getContext').mockReturnValue({
        library,
        canvas: { document: scene },
      } as unknown as G2Context);
      const annotation: RendererAnnotation<Row, 'g2'> =
        type === 'point'
          ? { type, data: { x: 4, y: 5 }, pulse, style: { size: 5 } }
          : { type, label: '', n: 1 };
      const cleanup = bindAnnotations({
        renderer: 'g2',
        chartType,
        chart,
        annotations: [annotation],
        mapping: { x: 'x', y: 'y', data },
        themeObject: theme,
      });
      const [mark] = marks();
      mark.type.props.shape.circle(mark.style, { document: scene, coordinate })(draw()[0][0], {
        size: 5,
      });
      expect(active.style.fill).toBe('transparent');
      const update = (chart.options() as Options).labelTransform[0].type();
      const context = {
        coordinate,
        canvas: { document: scene },
        layout: { width: 100, height: 100 },
      };
      update([], context);
      expect(active.style).toMatchObject({ fill: 'transparent', stroke: 'transparent' });
      expect(parent.appendChild).toHaveBeenCalledOnce();
      expect(scene.createElement).toHaveBeenLastCalledWith(
        'circle',
        expect.objectContaining({
          style: expect.objectContaining({ fill: 'none', stroke: theme.theme.category10![0] }),
        }),
      );
      expect(halo.animate).toHaveBeenCalledTimes(pulse === false ? 0 : 1);
      original.__removed__ = true;
      update([], context);
      expect(active.style).toMatchObject({
        fill: theme.theme.category10![0],
        stroke: theme.theme.view!.viewFill,
      });
      expect(halo.destroy).toHaveBeenCalledOnce();
      expect(parent.appendChild).toHaveBeenCalledTimes(2);
      original.__removed__ = false;
      update([], context);
      expect(active.style).toMatchObject({ fill: 'transparent', stroke: 'transparent' });
      cleanup();
      expect(halo.destroy).toHaveBeenCalledTimes(3);
      update([], context);
      expect(parent.appendChild).toHaveBeenCalledTimes(3);
    },
  );

  it('keeps halos isolated across separated point batches and clears them on removal', () => {
    const { chart, library, draw, marks, coordinate } = setup();
    const redraws = new Set<() => void>();
    const motion = {
      matches: false,
      addEventListener: (_event: string, redraw: () => void) => redraws.add(redraw),
      removeEventListener: (_event: string, redraw: () => void) => redraws.delete(redraw),
    };
    vi.stubGlobal('window', { matchMedia: () => motion });
    const parent = { appendChild: vi.fn() };
    const elements: ReturnType<typeof createPoint>[] = [];
    const rings: { style: Record<string, unknown>; destroyed: boolean; destroy(): void }[] = [];
    function createPoint() {
      return {
        __data__: { points: [] },
        __removed__: false,
        parentNode: parent,
        style: {} as Record<string, unknown>,
        setAttribute(name: string, value: unknown) {
          this.style[name] = value;
        },
        getAttribute(name: string) {
          return this.style[name];
        },
      };
    }
    const scene = {
      querySelectorAll: () => elements,
      createElement: (
        _tag: string,
        options: { className?: string; style: Record<string, unknown> },
      ) => {
        if (options.className === 'annotation-pulse') {
          const ring = {
            style: options.style,
            destroyed: false,
            destroy() {
              this.destroyed = true;
            },
          };
          rings.push(ring);
          return ring;
        }
        const element = createPoint();
        elements.push(element);
        return element;
      },
    };
    vi.spyOn(chart, 'getContext').mockReturnValue({
      library,
      canvas: { document: scene },
    } as unknown as G2Context);
    const cleanup = bindAnnotations({
      renderer: 'g2',
      chartType: 'scatter',
      chart,
      annotations: [
        { type: 'point', data: { x: 2, y: 5 }, pulse: false, style: { stroke: '#f00' } },
        { type: 'text', data: { x: 5, y: 5 }, label: 'between points' },
        { type: 'point', data: { x: 8, y: 5 }, pulse: false, style: { stroke: '#00f' } },
      ],
      mapping: { x: 'x', y: 'y', data: [] as Row[] },
      themeObject: theme,
    });
    const geometry = draw();
    for (const index of [0, 2]) {
      const mark = marks()[index];
      mark.type.props.shape.circle(mark.style, { document: scene, coordinate })(
        geometry[index][0],
        {
          size: mark.encode.size,
        },
      );
    }
    // Native updates copy the computed attributes onto previously retained shapes.
    elements.forEach((element, index) => {
      elements[index] = { ...element, style: { ...element.style } };
    });
    const update = (chart.options() as Options).labelTransform[0].type();
    library['labelTransform.overlapDodgeY'] = () => () => {};
    library['labelTransform.exceedAdjust'] = () => () => {};
    const context = { coordinate, canvas: { document: scene } };
    const haloStyles = () => rings.filter((ring) => !ring.destroyed).map((ring) => ring.style);
    for (let i = 0; i < 2; i++) {
      update([], context);
      expect(haloStyles()).toEqual([
        expect.objectContaining({ cx: 20, cy: 50, stroke: '#f00' }),
        expect.objectContaining({ cx: 80, cy: 50, stroke: '#00f' }),
      ]);
    }
    elements[0].__removed__ = true;
    update([], context);
    expect(haloStyles()).toEqual([expect.objectContaining({ cx: 80, stroke: '#00f' })]);
    const pendingRedraws = [...redraws];
    cleanup();
    expect(haloStyles()).toEqual([]);
    expect(redraws.size).toBe(0);
    const created = rings.length;
    pendingRedraws.forEach((redraw) => redraw());
    update([], context);
    expect(rings).toHaveLength(created);
  });
});
