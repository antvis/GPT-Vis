import { stdlib, type Chart, type G2Context, type MarkComponent, type SingleMark } from '@antv/g2';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation/g2';
import type { Point } from '../../src/annotation/shared';
import { getThemeObject } from '../../src/theme/g2';
import type { PrimitiveAnnotation } from '../../src/types/annotation';

type Row = { x: string | number; y: number; group?: string };
type Options = NonNullable<Parameters<MarkComponent>[0]>;
const theme = getThemeObject('scatter', 'default', { mark: { point: { shape: 'circle' } } });
const center = ([a, b]: Point[]): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

function setup(data: Row[] = [], { band = false, transpose = false, view = false } = {}) {
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
    getOptions: () => ({ transformations: [] }),
  } as unknown as Parameters<SingleMark>[3];
  const normalized = { map: (x: number) => x, getOptions: () => ({ type: 'linear' }) };
  const library = stdlib() as NonNullable<G2Context['library']>;
  const source = {
    type: 'point',
    data,
    encode: { x: 'x', y: 'y', color: 'group' },
    scale: { y: { nice: true } },
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
  const chart = {
    options: (next?: Options) => (next ? (options = next) : options),
    getContext: () => ({ library, canvas: { document: { querySelectorAll: () => [] } } }),
    on: vi.fn(),
    off: vi.fn(),
  } as unknown as Chart;
  const marks = (): Options[] => (chart.options() as Options).children.slice(view ? 2 : 1);
  const draw = (rows = data, points: Point[][] = [], scale = { x: xScale, y: yScale }) => {
    const base = (chart.options() as Options).children[0];
    library['transform.annotationSource']()(
      rows.map((_, i) => i),
      { data: rows },
    );
    base.children(
      rows.map((row, i) => ({ data: row, points: points[i] })),
      scale,
      { innerWidth: width },
    );
    return marks().map((mark) =>
      (mark.type(mark) as SingleMark)(
        mark.data.map((_: Row, i: number) => i),
        { x: normalized, y: normalized } as unknown as Parameters<SingleMark>[1],
        { size: mark.data.map(() => mark.encode.size) },
        coordinate,
      )[1].map((points) =>
        points.map((point) => point.map((v) => Math.round(v * 1e8) / 1e8) as Point),
      ),
    );
  };
  return {
    chart,
    draw,
    marks,
    library,
    coordinate,
    resize: () => {
      width = 200;
    },
  };
}

describe('G2 native annotation adapter', () => {
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
  it.each([
    { type: 'text', data: { x: 1, y: 2 } },
    { type: 'point', data: { x: 1, y: 2 }, label: 1 },
  ])('rejects invalid labels before changing chart options: %j', (annotation) => {
    const { chart, library } = setup();
    const before = chart.options();
    expect(() =>
      bindAnnotations(
        chart,
        [annotation as PrimitiveAnnotation<Row>],
        { x: 'x', y: 'y', data: [] as Row[] },
        theme,
      ),
    ).toThrow('label must be a string');
    expect(chart.options()).toBe(before);
    expect(library['transform.annotationSource']).toBeUndefined();
  });

  it('preserves path order, original fields, independent coordinates and point batches', () => {
    const data = [
      { x: 2, y: 4 },
      { x: 8, y: 6 },
    ];
    const { chart, draw } = setup(data);
    const annotations: PrimitiveAnnotation<Row>[] = [
      { type: 'line', data: [{ x: 8 }, { x: 2 }, { x: 5, y: 3 }] },
      { type: 'point', data: [{ x: 2 }, { x: 4.5, y: 5.5 }] },
      { type: 'text', data: { x: 7, y: 1 }, label: '独立文字' },
    ];
    const before = structuredClone({ annotations, data });
    bindAnnotations(chart, annotations, { x: 'x', y: 'y', data }, theme);
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
    expect({ annotations, data }).toEqual(before);
  });

  it('keeps complete coordinates independent when multiple series overlap', () => {
    const data = [
      { x: 1, y: 2, group: 'A' },
      { x: 1, y: 2, group: 'B' },
    ];
    const { chart, draw } = setup(data);
    bindAnnotations(
      chart,
      [{ type: 'point', data: { x: 1, y: 2 } }],
      { x: 'x', y: 'y', data },
      theme,
    );
    expect(center(draw([])[0][0])).toEqual([10, 80]);
  });

  it.each([false, true])('follows filtered data and current scales, including view=%s', (view) => {
    const data = [
      { x: 2, y: 4, group: 'A' },
      { x: 8, y: 6, group: 'B' },
    ];
    const { chart, draw } = setup(data, { view });
    bindAnnotations(
      chart,
      [
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
          type: 'line',
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
        { type: 'line', data: { y: 5 } },
        { type: 'range', data: { x: [2, 4] } },
      ],
      { x: 'x', y: 'y', data },
      theme,
    );
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

  it('preserves positive and negative interval endpoints, dodge and transpose', () => {
    const data = [
      { x: 'B', y: -2, group: 'One' },
      { x: 'B', y: -3, group: 'Two' },
    ];
    const { chart, draw } = setup(data, { band: true, transpose: true });
    bindAnnotations(
      chart,
      [
        { type: 'point', data: { x: 'B', group: 'Two' } },
        { type: 'point', data: data[1] },
        { type: 'point', data: { x: 'B', y: -3 } },
        { type: 'point', data: { x: 'B', group: 'One' } },
      ],
      { x: 'x', y: 'y', data, interval: true },
      theme,
    );
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
    bindAnnotations(
      chart,
      [
        { type: 'line', data: { x: 'A' } },
        { type: 'line', data: { y: 5 } },
        { type: 'range', data: { x: ['B', 'A'] } },
        { type: 'range', data: { y: [2, 6] } },
        { type: 'range', data: { x: ['A', 'A'], y: [2, 6] } },
      ],
      { x: 'x', y: 'y', data: [] as Row[] },
      theme,
    );
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

  it.each([
    [{ type: 'point', data: {} }, 'needs axis fields'],
    [{ type: 'point', data: { x: 2 } }, 'does not match'],
    [{ type: 'line', data: [] }, 'at least two'],
    [{ type: 'line', data: [{ x: 1, y: 2 }] }, 'at least two'],
    [{ type: 'line', data: { x: 1, y: 2 } }, 'exactly one axis'],
    [{ type: 'connector', data: [{ x: 1, y: 2 }] }, 'two positions'],
    [{ type: 'range', data: {} }, 'at least one axis'],
    [{ type: 'range', data: { x: [1] } }, 'two values'],
    [{ type: 'range', data: { x: [1, 2], group: ['A', 'B'] } }, 'only accepts axis fields'],
    [{ type: 'point', data: { x: NaN, y: 2 } }, 'finite numbers'],
  ])('rejects invalid geometry: %j', (annotation, message) => {
    const { chart, draw } = setup();
    bindAnnotations(
      chart,
      [annotation as PrimitiveAnnotation<Row>],
      { x: 'x', y: 'y', data: [] as Row[] },
      theme,
    );
    expect(() => draw()).toThrow(message);
  });

  it('rejects ambiguous selectors and unknown categories', () => {
    const data = [
      { x: 'A', y: 2, group: 'One' },
      { x: 'A', y: 3, group: 'Two' },
    ];
    for (const [position, message] of [
      [{ x: 'A' }, 'multiple data objects'],
      [{ x: 'C', y: 2 }, 'unknown category'],
    ] as const) {
      const { chart, draw } = setup(data, { band: true });
      bindAnnotations(chart, [{ type: 'point', data: position }], { x: 'x', y: 'y', data }, theme);
      expect(() => draw()).toThrow(message);
    }
  });

  it('keeps main data, scales, transforms, tooltip and interaction separate from annotation channels', () => {
    const data = [{ x: 1, y: 2 }];
    const { chart, marks } = setup(data);
    bindAnnotations(chart, [{ type: 'line', data: { y: 1000 } }], { x: 'x', y: 'y', data }, theme);
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

  it('uses native label backgrounds, wrapping, flat overrides and separate range fill opacity', () => {
    const { chart, marks, draw } = setup();
    bindAnnotations(
      chart,
      [
        { type: 'range', data: { x: [2, 4] }, fillOpacity: 0.15, label: '区域' },
        {
          type: 'point',
          data: { x: 2, y: 4 },
          label: '标记',
          labelFill: '#123456',
          labelFontSize: 18,
        },
        { type: 'text', data: { x: 2, y: 4 }, label: '独立\n文字', labelFontSize: 16 },
      ],
      { x: 'x', y: 'y', data: [] as Row[] },
      theme,
    );
    draw();
    const [range, point, text] = marks();
    expect(range.style.fillOpacity).toBe(0.15);
    expect(range.zIndex).toBe(-1);
    expect(range.labels[0]).not.toHaveProperty('fillOpacity');
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

  it('runs native layout once across annotation labels without moving data labels or standalone text', () => {
    const { chart, library } = setup();
    bindAnnotations(
      chart,
      [{ type: 'point', data: { x: 1, y: 2 }, label: '标注' }],
      { x: 'x', y: 'y', data: [] as Row[] },
      theme,
    );
    const dodge = vi.fn();
    const exceed = vi.fn();
    library['labelTransform.overlapDodgeY'] = () => dodge;
    library['labelTransform.exceedAdjust'] = () => exceed;
    const labels = [
      {
        getAttribute: () => true,
        style: { x: 30, y: 50 },
        getElementById: () => ({
          style: {},
          getLocalBounds: () => ({ min: [-20, -40], max: [20, -10] }),
        }),
        attr: vi.fn(),
      },
      { getAttribute: () => false },
    ];
    const transform = (chart.options() as Options).labelTransform[0].type();
    expect(transform(labels, {})).toBe(labels);
    expect(dodge).toHaveBeenCalledWith([labels[0]], {});
    expect(exceed).toHaveBeenCalledWith([labels[0]], {});
  });

  it.each(['neon-circuit', 'terra-print', 'mono-signal', 'candy-pop', 'bauhaus'] as const)(
    'uses native themed point shapes and sizes: %s',
    (name) => {
      const { chart, marks } = setup();
      const appearance = getThemeObject('scatter', name);
      bindAnnotations(
        chart,
        [{ type: 'point', data: { x: 2, y: 5 } }],
        { x: 'x', y: 'y', data: [] as Row[] },
        appearance,
      );
      const [mark] = marks();
      expect(mark.style.shape).toBe(appearance.mark.point.shape);
      expect(mark.encode.size).toBe(appearance.mark.point.size);
      expect(mark.style.fill).toBe(
        String(appearance.mark.point.shape).startsWith('hollow')
          ? 'transparent'
          : appearance.theme.category10![0],
      );
    },
  );

  it('uses theme widths with local overrides and native directional link arrows', () => {
    const { chart, draw, marks } = setup();
    const appearance = getThemeObject('scatter', 'default', {
      mark: {
        line: { lineWidth: 6 },
        point: { lineWidth: 7, size: 9 },
        connector: { lineWidth: 4 },
        interval: { lineWidth: 0 },
      },
    });
    bindAnnotations(
      chart,
      [
        { type: 'line', data: { x: 2 } },
        { type: 'range', data: { x: [2, 4] } },
        { type: 'point', data: { x: 2, y: 5 }, lineWidth: 2, size: 7 },
        {
          type: 'connector',
          data: [
            { x: 1, y: 1 },
            { x: 1.1, y: 1 },
          ],
          lineWidth: 5,
        },
        {
          type: 'connector',
          data: [
            { x: 1, y: 1 },
            { x: 1, y: 1 },
          ],
        },
      ],
      { x: 'x', y: 'y', data: [] as Row[] },
      appearance,
    );
    draw();
    expect(marks().map((mark) => mark.style.lineWidth)).toEqual([6, 0, 2, 5, 4]);
    expect(marks()[2].encode.size).toBe(7);
    expect(marks()[3].style.arrow).toBe(true);
    expect(marks()[3].style.arrowSize()).toBeCloseTo(0.35);
    expect(marks()[4].style.arrowSize()).toBe(0);
  });

  it('recomputes positions on resize and disables disposed annotations', () => {
    const { chart, draw, resize, library } = setup();
    const cleanup = bindAnnotations(
      chart,
      [{ type: 'point', data: { x: 2, y: 5 } }],
      { x: 'x', y: 'y', data: [] as Row[] },
      theme,
    );
    expect(center(draw()[0][0])).toEqual([20, 50]);
    resize();
    expect(center(draw()[0][0])).toEqual([40, 50]);
    cleanup();
    cleanup();
    expect(library['transform.annotationSource']).toBeUndefined();
  });

  it.each([false, true, undefined])('updates native point halos with pulse: %s', (pulse) => {
    const { chart, library, draw, marks, coordinate } = setup();
    const parent = { appendChild: vi.fn() };
    const halo = { animate: vi.fn(() => null), destroy: vi.fn() };
    const active = {
      style: {} as Record<string, unknown>,
      parentNode: parent,
      setAttribute(name: string, value: unknown) {
        this.style[name] = value;
      },
      getAttribute(name: string) {
        return this.style[name];
      },
    };
    const scene = {
      querySelectorAll: () => [active, { ...active, __removed__: true }],
      createElement: vi.fn((_tag: string, options: { className?: string }) =>
        options.className === 'annotation-pulse' ? halo : active,
      ),
    };
    vi.spyOn(chart, 'getContext').mockReturnValue({
      library,
      canvas: { document: scene },
    } as unknown as G2Context);
    const cleanup = bindAnnotations(
      chart,
      [{ type: 'point', data: { x: 4, y: 5 }, size: 5, pulse }],
      { x: 'x', y: 'y', data: [] as Row[] },
      theme,
    );
    const [mark] = marks();
    mark.type.props.shape.circle(mark.style, { document: scene, coordinate })(draw()[0][0], {
      size: 5,
    });
    const update = (chart.options() as Options).labelTransform[0].type();
    library['labelTransform.overlapDodgeY'] = () => () => {};
    library['labelTransform.exceedAdjust'] = () => () => {};
    update([], {});
    expect(parent.appendChild).toHaveBeenCalledOnce();
    expect(halo.animate).toHaveBeenCalledTimes(pulse === false ? 0 : 1);
    update([], {});
    expect(halo.destroy).toHaveBeenCalledOnce();
    expect(parent.appendChild).toHaveBeenCalledTimes(2);
    cleanup();
    expect(halo.destroy).toHaveBeenCalledTimes(2);
    update([], {});
    expect(parent.appendChild).toHaveBeenCalledTimes(2);
  });
});
