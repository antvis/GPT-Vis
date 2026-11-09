import type * as G2 from '@antv/g2';
import { stdlib, type Chart, type G2Context } from '@antv/g2';
import { describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation/g2';
import { getThemeObject } from '../../src/theme/g2';
import type { PrimitiveAnnotation } from '../../src/types/annotation';

vi.mock('@antv/g2', async (importOriginal) => ({
  ...(await importOriginal<typeof G2>()),
  selectPlotArea: (root: unknown) => root,
  selectG2Elements: (plot: { elements: unknown[] }) => plot.elements,
  dataOf: (element: { datum: unknown }) => element.datum,
}));

class Element {
  children: Element[] = [];
  elements: unknown[] = [];
  destroyed = false;
  constructor(
    public tag = 'g',
    public style: Record<string, any> = {},
  ) {}
  appendChild(child: Element) {
    this.children.push(child);
  }
  destroy() {
    this.destroyed = true;
  }
}

function setup({ band = false, transpose = false } = {}) {
  const plot = new Element();
  let width = 100;
  const xScale = band
    ? {
        map: (value: string) => ['A', 'B'].indexOf(value) / 2,
        getBandWidth: () => 0.4,
        getOptions: () => ({ type: 'band', domain: ['A', 'B'] }),
      }
    : {
        map: (value: number) => value / 10,
        getOptions: () => ({ type: 'linear', domain: [0, 10] }),
      };
  const yScale = {
    map: (value: number) => 1 - value / 10,
    getOptions: () => ({ type: 'linear', domain: [0, 10] }),
  };
  const view = {
    scale: { x: xScale, y: yScale },
    coordinate: {
      map: ([x, y]: number[]) =>
        (transpose ? [(1 - y) * width, x * 100] : [x * width, y * 100]).map(
          (value) => Math.round(value * 1e8) / 1e8,
        ),
    },
  };
  const context = {
    library: stdlib(),
    canvas: {
      getRoot: () => plot,
      document: {
        createElement: (tag: string, options: { style: Record<string, unknown> }) =>
          new Element(tag, options.style),
      },
    },
    views: [view],
  } as unknown as G2Context;
  let options: any = { interaction: { tooltip: true } };
  const chart = {
    options: (next?: any) => (next ? (options = next) : options),
    getContext: () => context,
  } as unknown as Chart;
  let cleanupView: (() => void) | undefined;
  const draw = (currentView = view) => {
    cleanupView?.();
    cleanupView = options.interaction.annotation.type()({ view: currentView, container: plot });
  };
  const shapes = () =>
    plot.children.filter((layer) => !layer.destroyed).flatMap((layer) => layer.children);
  return {
    plot,
    chart,
    draw,
    shapes,
    view,
    resize: () => {
      width = 200;
    },
  };
}

const theme = getThemeObject('line', 'default', { mark: { point: { shape: 'circle' } } });

describe('G2 annotation geometry', () => {
  it.each([
    { type: 'text', data: { x: 1, y: 2 } },
    { type: 'point', data: { x: 1, y: 2 }, label: 1 },
  ])('rejects invalid labels before installing the drawing hook: %j', (annotation) => {
    const { chart, plot } = setup();
    expect(() =>
      bindAnnotations(
        chart,
        [annotation as PrimitiveAnnotation<{ x: number; y: number }>],
        { x: 'x', y: 'y', data: [] },
        theme,
      ),
    ).toThrow('label must be a string');
    expect(chart.options().interaction).toEqual({ tooltip: true });
    expect(plot.children).toHaveLength(0);
  });

  it('preserves path order, maps independent positions and expands point batches', () => {
    const { chart, plot, draw, shapes } = setup();
    const data = [
      { time: 2, value: 4 },
      { time: 8, value: 6 },
    ];
    plot.elements = [{ datum: data }];
    const annotations: PrimitiveAnnotation<(typeof data)[number]>[] = [
      { type: 'line', data: [{ time: 8 }, { time: 2 }, { time: 5, value: 3 }] },
      { type: 'point', data: [{ time: 2 }, { time: 4.5, value: 5.5 }], label: '标记' },
      { type: 'text', data: { time: 7, value: 1 }, label: '独立文字' },
    ];
    const original = structuredClone({ data, annotations });
    bindAnnotations(chart, annotations, { x: 'time', y: 'value', data }, theme);
    draw();
    expect(shapes()[0].style.d).toBe('M80,40 L20,60 L50,70');
    const points = shapes().filter(({ tag }) => tag === 'circle');
    expect(points.map(({ style: { cx, cy } }) => [cx, cy])).toEqual([
      [20, 60],
      [45, 45],
    ]);
    expect(
      shapes()
        .filter(({ tag }) => tag === 'text')
        .map(({ style }) => style.text),
    ).toEqual(['标记', '标记', '独立文字']);
    expect(shapes().at(-1)?.style).toMatchObject({
      x: 70,
      y: 90,
      text: '独立文字',
      textBaseline: 'middle',
    });
    expect({ data, annotations }).toEqual(original);
  });

  it.each(['point', 'line'])(
    'follows filtering and restoration of %s elements without changing independent positions',
    (mark) => {
      const { chart, plot, draw, shapes, view } = setup();
      const data = [
        { time: 2, value: 4, group: 'A' },
        { time: 4, value: 5, group: 'A' },
        { time: 8, value: 6, group: 'B' },
      ];
      // Line series may be the only rendered marks when observation points are disabled.
      const elements =
        mark === 'line'
          ? [{ datum: data.slice(0, 2) }, { datum: data.slice(2) }]
          : data.map((datum) => ({ datum }));
      plot.elements = elements;
      bindAnnotations(
        chart,
        [
          {
            type: 'point',
            data: [
              { time: 2, group: 'A' },
              { time: 8, group: 'B' },
            ],
            label: 'batch',
          },
          { type: 'point', data: { time: 2, value: 4 }, label: 'independent' },
          { type: 'text', data: { time: 2, group: 'A' }, label: 'selected text' },
          {
            type: 'line',
            data: [
              { time: 1, value: 1 },
              { time: 4, group: 'A' },
              { time: 8, group: 'B' },
            ],
            label: 'path',
          },
          {
            type: 'connector',
            data: [
              { time: 2, group: 'A' },
              { time: 8, group: 'B' },
            ],
            label: 'connector',
          },
          { type: 'line', data: { value: 5 }, label: 'spanning' },
          { type: 'range', data: { time: [2, 4] }, label: 'range' },
        ],
        { x: 'time', y: 'value', data },
        theme,
      );
      draw();
      const original = shapes().map(({ style }) => structuredClone(style));
      expect(shapes().filter(({ tag }) => tag === 'circle')).toHaveLength(3);
      expect(shapes().filter(({ tag }) => tag === 'path')).toHaveLength(4);

      plot.elements = elements.slice(mark === 'line' ? 1 : 2);
      // Interaction updates can provide a new view without replacing context.views.
      const filteredView = {
        ...view,
        scale: {
          ...view.scale,
          y: { ...view.scale.y, map: (value: number) => 1 - (value - 5) / 5 },
        },
      };
      draw(filteredView);
      expect(
        shapes()
          .filter(({ tag }) => tag === 'text')
          .map(({ style }) => style.text),
      ).toEqual(['batch', 'independent', 'spanning', 'range']);
      expect(
        shapes()
          .filter(({ tag }) => tag === 'circle')
          .map(({ style }) => [style.cx, style.cy]),
      ).toEqual([
        [80, 80],
        [20, 120],
      ]);
      expect(shapes().filter(({ tag }) => tag === 'path')).toHaveLength(2);

      // Even with every series filtered out, independent geometry remains independent.
      plot.elements = [];
      draw(filteredView);
      expect(
        shapes()
          .filter(({ tag }) => tag === 'text')
          .map(({ style }) => style.text),
      ).toEqual(['independent', 'spanning', 'range']);

      plot.elements = elements;
      draw();
      expect(shapes().map(({ style }) => style)).toEqual(original);
    },
  );

  it('keeps selector ambiguity independent of which series are currently visible', () => {
    const { chart, plot, draw } = setup();
    const data = [
      { time: 2, value: 4, group: 'A' },
      { time: 2, value: 6, group: 'B' },
    ];
    plot.elements = [{ datum: data[1] }];
    bindAnnotations(
      chart,
      [{ type: 'point', data: { time: 2 } }],
      { x: 'time', y: 'value', data },
      theme,
    );
    expect(draw).toThrow('position matches multiple data objects');
  });

  it('maps complete coordinates directly even when several series share the observation', () => {
    const { chart, draw, shapes } = setup();
    const data = [
      { x: 1, y: 2, group: 'A' },
      { x: 1, y: 2, group: 'B' },
    ];
    bindAnnotations(
      chart,
      [
        { type: 'point', data: { x: 1, y: 2 } },
        {
          type: 'point',
          data: [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
          ],
        },
        {
          type: 'line',
          data: [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
          ],
        },
        {
          type: 'connector',
          data: [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
          ],
        },
        { type: 'text', data: { x: 1, y: 2 }, label: '重合位置' },
      ],
      { x: 'x', y: 'y', data },
      theme,
    );
    draw();
    expect(
      shapes()
        .filter(({ tag }) => tag === 'circle')
        .map(({ style }) => [style.cx, style.cy]),
    ).toEqual([
      [10, 80],
      [10, 80],
      [30, 60],
    ]);
    const paths = shapes()
      .filter(({ tag }) => tag === 'path')
      .map(({ style }) => style.d);
    expect(paths[0]).toBe('M10,80 L30,60');
    expect(paths[1]).toMatch(/^M10,80 L30,60 M/);
    expect(shapes().at(-1)?.style).toMatchObject({ x: 10, y: 80, text: '重合位置' });
  });

  it('maps spanning lines and inclusive reversed ranges through transposed coordinates', () => {
    const { chart, draw, shapes } = setup({ band: true, transpose: true });
    bindAnnotations(
      chart,
      [
        { type: 'line', data: { category: 'A' } },
        { type: 'line', data: { value: 5 } },
        { type: 'range', data: { category: ['B', 'A'] } },
        { type: 'range', data: { value: [2, 6] } },
        { type: 'range', data: { category: ['A', 'A'], value: [2, 6] } },
      ],
      { x: 'category', y: 'value', data: [] as { category: string; value: number }[] },
      theme,
    );
    draw();
    expect(shapes()[0].style.d).toBe('M100,20 L0,20');
    expect(shapes()[1].style.d).toBe('M50,0 L50,100');
    expect(shapes()[2].style.d).toBe('M100,0 L100,90 L0,90 L0,0 Z');
    expect(shapes()[3].style.d).toBe('M60,0 L60,100 L20,100 L20,0 Z');
    expect(shapes()[4].style.d).toBe('M60,0 L60,40 L20,40 L20,0 Z');
  });

  it('uses rendered interval endpoints for series selectors, including negative stacks', () => {
    const { chart, plot, draw, shapes } = setup({ band: true, transpose: true });
    const data = [
      { category: 'B', value: -2, group: 'One' },
      { category: 'B', value: -3, group: 'Two' },
    ];
    plot.elements = [
      {
        datum: data[1],
        __data__: {
          points: [
            [-50, 52],
            [-50, 68],
            [-20, 68],
            [-20, 52],
          ],
        },
      },
    ];
    bindAnnotations(
      chart,
      [
        { type: 'point', data: { category: 'B', group: 'Two' } },
        { type: 'point', data: data[1] },
        { type: 'point', data: { category: 'B', value: -3 } },
        { type: 'point', data: { category: 'B', group: 'One' } },
        {
          type: 'connector',
          data: [
            { category: 'B', group: 'Two' },
            { category: 'A', value: 5 },
          ],
          label: '连接',
        },
      ],
      { x: 'category', y: 'value', data, interval: true },
      theme,
    );
    draw();
    expect(
      shapes()
        .filter(({ tag }) => tag === 'circle')
        .map(({ style }) => [style.cx, style.cy]),
    ).toEqual([
      [-50, 60],
      [-50, 60],
      [-30, 70],
    ]);
    expect(shapes()[3].style.d).toMatch(/^M-50,60 L50,20 M/);
    expect(shapes()[4].style.text).toBe('连接');
  });

  it('keeps fill opacity separate from labels and applies label styles', () => {
    const { chart, draw, shapes } = setup();
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
        { type: 'text', data: { x: 2, y: 4 }, label: '独立文字', labelFontSize: 16 },
      ],
      { x: 'x', y: 'y', data: [] as { x: number; y: number }[] },
      theme,
    );
    draw();
    expect(shapes()[0].style.fillOpacity).toBe(0.15);
    expect(shapes()[1].style).not.toHaveProperty('fillOpacity');
    expect(shapes()[3].style).toMatchObject({
      fill: '#123456',
      fontSize: 18,
      x: 20,
      y: 52,
      textBaseline: 'bottom',
    });
    expect(shapes()[4].style).toMatchObject({
      fontSize: 16,
      x: 20,
      y: 60,
      textAlign: 'center',
      textBaseline: 'middle',
    });
  });

  it('places attached labels inside the plot at its top and side boundaries', () => {
    const { chart, draw, shapes } = setup();
    bindAnnotations(
      chart,
      [
        { type: 'line', data: { x: 0 }, label: '左侧' },
        { type: 'line', data: { x: 10 }, label: '右侧' },
        { type: 'line', data: { y: 10 }, label: '顶部' },
      ],
      { x: 'x', y: 'y', data: [] as { x: number; y: number }[] },
      theme,
    );
    draw();
    const labels = shapes().filter(({ tag }) => tag === 'text');
    expect(labels[0].style).toMatchObject({
      x: 0,
      y: 92,
      textAlign: 'left',
      textBaseline: 'bottom',
    });
    expect(labels[1].style).toMatchObject({
      x: 100,
      y: 92,
      textAlign: 'right',
      textBaseline: 'bottom',
    });
    expect(labels[2].style).toMatchObject({
      x: 100,
      y: 8,
      textAlign: 'right',
      textBaseline: 'top',
    });
  });

  it('draws an arrow toward the second position with symmetric wings on a diagonal', () => {
    const { chart, draw, shapes } = setup();
    bindAnnotations(
      chart,
      [
        {
          type: 'connector',
          data: [
            { x: 1, y: 9 },
            { x: 4, y: 5 },
          ],
        },
      ],
      { x: 'x', y: 'y', data: [] as { x: number; y: number }[] },
      theme,
    );
    draw();
    const numbers = shapes()[0]
      .style.d.match(/-?\d+(?:\.\d+)?/g)
      .map(Number);
    const [x0, y0, x1, y1, ax, ay, tipX, tipY, bx, by] = numbers;
    expect([tipX, tipY]).toEqual([x1, y1]);
    expect((bx - ax) * (x1 - x0) + (by - ay) * (y1 - y0)).toBeCloseTo(0);
    expect((x1 - (ax + bx) / 2) * (x1 - x0) + (y1 - (ay + by) / 2) * (y1 - y0)).toBeGreaterThan(0);
    expect(shapes()[0].style).toMatchObject({ lineCap: 'round', lineJoin: 'round' });
  });

  it('keeps very short arrows inside the segment and handles coincident endpoints', () => {
    const { chart, draw, shapes } = setup();
    bindAnnotations(
      chart,
      [
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
      { x: 'x', y: 'y', data: [] as { x: number; y: number }[] },
      theme,
    );
    draw();
    const values = shapes()[0]
      .style.d.match(/-?\d+(?:\.\d+)?/g)
      .map(Number);
    expect(values[4]).toBeGreaterThan(10);
    expect(values[8]).toBeGreaterThan(10);
    expect(shapes()[1].style.d).toBe('M10,90 L10,90');
  });

  it('repaints on resize, uses resolved themes and stops drawing on cleanup', () => {
    const { chart, draw, shapes, plot, resize } = setup();
    const themed = getThemeObject(
      'scatter',
      {
        id: 'custom',
        label: 'Custom',
        baseTheme: 'dark',
        tokens: {
          colorDefault: '#aabbcc',
          colorText: '#ddeeff',
          fontFamily: 'serif',
          fontSize: 15,
        },
      },
      { mark: { point: { shape: 'circle' } } },
    );
    const cleanup = bindAnnotations(
      chart,
      [{ type: 'point', data: { x: 2, y: 5 }, label: '主题' }],
      { x: 'x', y: 'y', data: [] as { x: number; y: number }[] },
      themed,
    );
    draw();
    expect(shapes()[0].style).toMatchObject({ cx: 20, fill: '#aabbcc' });
    expect(shapes()[1].style).toMatchObject({ fill: '#ddeeff', fontSize: 15, fontFamily: 'serif' });
    resize();
    draw();
    expect(plot.children[0].destroyed).toBe(true);
    expect(shapes()[0].style.cx).toBe(40);
    cleanup();
    expect(shapes()).toEqual([]);
    draw();
    expect(shapes()).toEqual([]);
  });

  it.each([
    ['neon-circuit', 'path', 17.528, 50, 4, false],
    ['terra-print', 'circle', 20, 50, 4, true],
    ['mono-signal', 'path', 16, 46, 4, true],
    ['candy-pop', 'path', 15, 50 + 5 * Math.sin(Math.PI / 3), 5, false],
    ['bauhaus', 'path', 16, 46, 4, false],
  ] as const)('follows the %s theme point shape and size', (name, tag, x, y, size, hollow) => {
    const { chart, draw, shapes } = setup();
    const appearance = getThemeObject('scatter', name);
    bindAnnotations(
      chart,
      [{ type: 'point', data: { x: 2, y: 5 } }],
      { x: 'x', y: 'y', data: [] as { x: number; y: number }[] },
      appearance,
    );
    draw();
    const marker = shapes()[0];
    expect(marker.tag).toBe(tag);
    if (tag === 'circle') {
      expect(marker.style).toMatchObject({ cx: x, cy: y, r: size });
    } else {
      expect(marker.style.d[0][0]).toBe('M');
      expect(marker.style.d[0][1]).toBeCloseTo(x);
      expect(marker.style.d[0][2]).toBeCloseTo(y);
    }
    expect(marker.style.fill).toBe(hollow ? 'transparent' : appearance.theme.category10![0]);
    expect(marker.style.pointerEvents).toBe('none');
  });

  it('uses the resolved local point shape override', () => {
    const { chart, draw, shapes } = setup();
    bindAnnotations(
      chart,
      [{ type: 'point', data: { x: 2, y: 5 }, size: 7 }],
      { x: 'x', y: 'y', data: [] as { x: number; y: number }[] },
      getThemeObject('scatter', 'neon-circuit', { mark: { point: { shape: 'hollowSquare' } } }),
    );
    draw();
    expect(shapes()[0].style).toMatchObject({
      fill: 'transparent',
      d: [['M', 13, 43], ['L', 27, 43], ['L', 27, 57], ['L', 13, 57], ['Z']],
    });
  });

  it('uses the corresponding theme widths and point size, with annotation overrides taking precedence', () => {
    const { chart, draw, shapes } = setup();
    const appearance = getThemeObject(
      'scatter',
      {
        id: 'custom-widths',
        label: 'Custom widths',
        tokens: { lineWidth: 2 },
        style: {
          mark: {
            line: { lineWidth: 3 },
            point: { lineWidth: 5, size: 8 },
            connector: { lineWidth: 4 },
          },
        },
      },
      {
        mark: {
          line: { lineWidth: 6 },
          point: { shape: 'circle', lineWidth: 7, size: 9 },
          interval: { lineWidth: 0 },
        },
      },
    );
    bindAnnotations(
      chart,
      [
        { type: 'line', data: { x: 2 }, lineDash: [4, 2] },
        { type: 'range', data: { x: [2, 4] }, lineDash: [1, 1] },
        {
          type: 'connector',
          data: [
            { x: 2, y: 5 },
            { x: 4, y: 5 },
          ],
          lineDash: [3, 3],
        },
        { type: 'point', data: { x: 2, y: 5 } },
        { type: 'line', data: { x: 2 }, lineWidth: 1 },
        { type: 'range', data: { x: [2, 4] }, lineWidth: 1 },
        {
          type: 'connector',
          data: [
            { x: 2, y: 5 },
            { x: 4, y: 5 },
          ],
          lineWidth: 0,
        },
        { type: 'point', data: { x: 2, y: 5 }, lineWidth: 0, size: 3 },
      ],
      { x: 'x', y: 'y', data: [] as { x: number; y: number }[] },
      appearance,
    );
    draw();
    expect(shapes().map(({ style }) => style.lineWidth)).toEqual([6, 0, 4, 7, 1, 1, 0, 0]);
    expect(shapes()[0].style.lineDash).toEqual([4, 2]);
    expect(shapes()[1].style.lineDash).toEqual([1, 1]);
    expect(shapes()[2].style.lineDash).toEqual([3, 3]);
    expect(shapes()[3].style.r).toBe(9);
    expect(shapes()[7].style.r).toBe(3);
  });

  it('rejects ambiguous selectors and invalid geometry instead of mapping to a false position', () => {
    // Bypass static types to exercise JSON input and dynamically produced arrays.
    const invalid: unknown[] = [
      { type: 'point', data: { category: 'A' } },
      { type: 'point', data: { category: 'B' } },
      { type: 'point', data: { category: 'A', value: 2, group: 'missing' } },
      { type: 'line', data: [] },
      { type: 'line', data: [{ category: 'A', value: 2 }] },
      { type: 'line', data: { category: 'A', value: 2 } },
      { type: 'line', data: { value: 2, group: 'One' } },
      { type: 'point', data: { category: 'missing', value: 2 } },
      { type: 'point', data: { category: 'B', value: NaN } },
      { type: 'range', data: {} },
      { type: 'range', data: { value: [2, 4], group: ['One', 'Two'] } },
      { type: 'range', data: { category: ['A'] } },
    ];
    for (const annotation of invalid) {
      const { chart, draw } = setup({ band: true });
      bindAnnotations(
        chart,
        [annotation as PrimitiveAnnotation<{ category: string; value: number; group?: string }>],
        {
          x: 'category',
          y: 'value',
          data: [
            { category: 'A', value: 2, group: 'One' },
            { category: 'A', value: 4, group: 'Two' },
          ],
        },
        theme,
      );
      expect(draw).toThrow('Invalid annotation:');
    }
  });
});
