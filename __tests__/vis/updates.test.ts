import type * as ComponentModule from '@antv/component';
import type * as G2Module from '@antv/g2';
import type * as G6Module from '@antv/g6';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as GPTVis from '../../src';
import { createChartRenderer } from '../../src/util';
import {
  chartOptions,
  graphOptions,
  MockChart,
  MockElement,
  MockGraph,
  textInstances,
} from '../helpers/renderers';

vi.mock('@antv/g2', async (original) => ({
  ...(await original<typeof G2Module>()),
  Chart: (await import('../helpers/renderers')).MockChart,
}));
vi.mock('@antv/g6', async (original) => ({
  ...(await original<typeof G6Module>()),
  Graph: (await import('../helpers/renderers')).MockGraph,
}));
vi.mock('@antv/t8', async () => ({ Text: (await import('../helpers/renderers')).MockText }));
vi.mock('measury', () => ({ measureText: () => ({ width: 40 }) }));
vi.mock('@antv/component', async (original) => ({
  ...(await original<typeof ComponentModule>()),
  measureTextWidth: (text: string) => text.length * 7,
}));
vi.mock('../../src/annotation', () => ({ bindAnnotations: () => undefined }));

const categorical = [
  { category: 'A', value: 12 },
  { category: 'B', value: 20 },
];
const temporal = [
  { time: 'Jan', value: 12 },
  { time: 'Feb', value: 20 },
];
const tree = { name: 'Root', children: [{ name: 'A' }, { name: 'B' }] };
const network = { nodes: [{ name: 'A' }, { name: 'B' }], edges: [{ source: 'A', target: 'B' }] };

// G2 renderers other than Funnel and Boxplot share the same resource and update contract.
const charts = [
  ['Area', { data: temporal }],
  ['Bar', { data: categorical }],
  ['Column', { data: categorical }],
  ['DualAxes', { categories: ['A', 'B'], series: [{ type: 'line', data: [12, 20] }] }],
  ['Histogram', { data: [10, 12, 20, 22] }],
  ['Line', { data: temporal }],
  ['Liquid', { percent: 0.4 }],
  ['Pie', { data: categorical }],
  [
    'Radar',
    {
      data: [
        { name: 'A', value: 12 },
        { name: 'B', value: 20 },
      ],
    },
  ],
  ['Sankey', { data: [{ source: 'A', target: 'B', value: 12 }] }],
  [
    'Scatter',
    {
      data: [
        { x: 1, y: 12 },
        { x: 2, y: 20 },
      ],
    },
  ],
  [
    'Treemap',
    {
      data: [
        { name: 'A', value: 12 },
        { name: 'B', value: 20 },
      ],
    },
  ],
  [
    'Venn',
    {
      data: [
        { sets: ['A'], value: 12 },
        { sets: ['B'], value: 20 },
      ],
    },
  ],
  [
    'Violin',
    {
      data: [10, 12, 14, 18, 20, 24].flatMap((value) => [
        { category: 'A', value },
        { category: 'B', value: value + 5 },
      ]),
    },
  ],
  ['Waterfall', { data: categorical }],
  [
    'WordCloud',
    {
      data: [
        { text: 'A', value: 12 },
        { text: 'B', value: 20 },
      ],
    },
  ],
] as const;
const graphs = [
  ['Mindmap', { data: tree }],
  ['IndentedTree', { data: tree }],
  ['OrganizationChart', { data: tree }],
  ['FishboneDiagram', { data: tree }],
  ['NetworkGraph', { data: network, layout: 'circular' }],
  ['FlowDiagram', { data: network }],
] as const;

const make = (name: string, container = new MockElement()) =>
  (GPTVis as any)[name]({ container, width: 600, height: 400 });

// Exercise the installed G2 inference/aggregation functions, not a reimplementation of them.
const nativeTransform = async (spec: any) => {
  const native = await vi.importActual<typeof G2Module>('@antv/g2');
  let index = spec.data.map((_: unknown, i: number) => i);
  let mark = {
    data: spec.data,
    encode: Object.fromEntries(
      Object.entries(spec.encode).map(([name, encode]) => [
        name,
        {
          type: 'column',
          value: spec.data.map((datum: any, i: number) =>
            typeof encode === 'function'
              ? encode(datum, i)
              : typeof encode === 'string' &&
                  datum != null &&
                  typeof datum === 'object' &&
                  encode in datum
                ? datum[encode]
                : encode,
          ),
        },
      ]),
    ),
  };
  [index, mark] = (native.MaybeKey({}) as any)(index, mark);
  for (const { type, ...options } of spec.transform ?? []) {
    const component =
      typeof type === 'function' ? type : (native as any)[type[0].toUpperCase() + type.slice(1)];
    [index, mark] = component(options)(index, mark);
  }
  return { index, mark };
};

beforeEach(() => {
  chartOptions.length = 0;
  graphOptions.length = 0;
  textInstances.length = 0;
  vi.stubGlobal('Element', MockElement);
  vi.stubGlobal('document', {
    createElement: () => new MockElement(),
    head: new MockElement(),
    querySelector: () => null,
  });
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('incremental chart rendering', () => {
  it('confirms that G2 default keys change when an encoded measure changes', async () => {
    const before = await nativeTransform({
      data: [{ category: 'A', value: 10 }],
      encode: { x: 'category', y: 'value' },
    });
    const after = await nativeTransform({
      data: [{ category: 'A', value: 20 }],
      encode: { x: 'category', y: 'value' },
    });
    expect(before.mark.encode.key.value[0]).not.toBe(after.mark.encode.key.value[0]);
  });

  it('keeps series identity when the first time point is replaced', () => {
    for (const name of ['Line', 'Area']) {
      const chart = make(name);
      chart.render({ data: temporal });
      const series = chartOptions
        .at(-1)
        .children.filter((child: any) => ['line', 'area'].includes(child.type));
      for (const mark of series) {
        expect(mark.encode.key({ time: 'Jan', value: 10, group: 'A' })).toBe(
          mark.encode.key({ time: 'Feb', value: 30, group: 'A' }),
        );
        expect(mark.encode.key({ group: 'A' })).not.toBe(mark.encode.key({ group: 'B' }));
      }
      chart.destroy();
    }
  });

  it('retains scatter point slots when observations are appended, including identical points', async () => {
    const chart = make('Scatter');
    const data = [
      { x: 1, y: 2 },
      { x: 1, y: 2 },
    ];
    chart.render({ data });
    const before = await nativeTransform(chartOptions.at(-1));
    chart.render({ data: [...data, { x: 3, y: 4 }] });
    const after = await nativeTransform(chartOptions.at(-1));
    expect(after.mark.encode.key.value.slice(0, data.length)).toEqual(before.mark.encode.key.value);
    expect(new Set(after.mark.encode.key.value).size).toBe(3);
    chart.destroy();
  });

  it('identifies histogram bins by their computed boundaries, not the first sample or count', async () => {
    const chart = make('Histogram');
    chart.render({ data: [1, 3, 18], binNumber: 2 });
    const spec = chartOptions.at(-1);
    const transform = [{ ...spec.transform[0], thresholds: [0, 10, 20] }, spec.transform[1]];
    const before = await nativeTransform({ ...spec, transform });
    const after = await nativeTransform({ ...spec, data: [4, 1, 3, 12, 18], transform });
    expect(before.mark.encode.key.value).toEqual(after.mark.encode.key.value);
    expect(before.mark.encode.y.value).not.toEqual(after.mark.encode.y.value);
    const expanded = await nativeTransform({ ...spec, data: [1, 3, 18, 22], transform });
    expect(expanded.mark.encode.key.value).not.toEqual(before.mark.encode.key.value);
    chart.destroy();
  });

  it.each([false, true])(
    'preserves violin overlay animation options (reduced motion: %s)',
    async (reduced) => {
      vi.stubGlobal('window', { matchMedia: () => ({ matches: reduced }) });
      for (const group of [undefined, 'One']) {
        const chart = make('Violin');
        const data = [1, 2, 3, 4, 5].map((value) => ({ category: 'A', value, group }));
        chart.render({ data });
        chart.render({ data });
        const overlay = chartOptions
          .at(-1)
          .children.find((child: any) => child.key === 'violin-boxplot');
        const { type, ...options } = overlay;
        const marks = await type({ ...options, data });
        expect(marks).toHaveLength(1);
        expect(marks[0].type).toBe('box');
        expect(marks[0].animate).toEqual(reduced ? false : overlay.animate);
        const before = await nativeTransform(marks[0]);
        const after = await nativeTransform({
          ...marks[0],
          data: [...data, { category: 'A', value: 6, group }],
        });
        expect(after.mark.encode.key.value).toEqual(before.mark.encode.key.value);
        chart.destroy();
      }
    },
  );

  it('preserves explicit parent mark keys when deriving nested mark identities', () => {
    const renderer = createChartRenderer({ container: {} as HTMLElement });
    renderer.render({
      type: 'view',
      key: 'sales',
      children: [{ type: 'view', key: 'region', children: [{ type: 'point' }] }],
    });
    expect(chartOptions.at(-1).children[0].children[0].key).toBe('region-point-0');
    renderer.destroy();
  });

  it('retains Sankey endpoints and distinguishes parallel links without including flow values', () => {
    const chart = make('Sankey');
    const data = [
      { source: 'A', target: 'B', value: 10 },
      { source: 'A', target: 'B', value: 20 },
      { source: 'A', target: 'C', value: 30 },
    ];
    chart.render({ data });
    const before = chartOptions.at(-1).encode;
    const first = { source: { key: 'A' }, target: { key: 'B' }, index: 0, value: 10 };
    expect(before.nodeKey).toBe('key');
    expect(before.linkKey(first)).not.toBe(before.linkKey({ ...first, index: 1 }));
    chart.render({ data: [data[2], { ...data[0], value: 40 }, data[1]] });
    expect(chartOptions.at(-1).encode.linkKey({ ...first, index: 1, value: 40 })).toBe(
      before.linkKey(first),
    );
    chart.destroy();
  });

  it.each(['Funnel', 'Boxplot'])(
    'preserves %s rebuild behavior without adding update animations',
    (name) => {
      const render = vi.spyOn(MockChart.prototype, 'render');
      const destroy = vi.spyOn(MockChart.prototype, 'destroy');
      const chart = make(name);
      chart.render({ data: categorical });
      chart.render({ data: [...categorical, { category: 'C', value: 8 }], theme: 'midnight' });
      expect(new Set(render.mock.contexts).size).toBe(2);
      expect(destroy).toHaveBeenCalledTimes(1);
      expect(chartOptions.at(-1).animate).toBe(false);
      chart.destroy();
      chart.destroy();
      expect(destroy).toHaveBeenCalledTimes(2);
    },
  );
  it.each(charts)(
    '%s reuses its native chart across data, theme and empty snapshots',
    (name, config) => {
      const render = vi.spyOn(MockChart.prototype, 'render');
      const destroy = vi.spyOn(MockChart.prototype, 'destroy');
      const chart = make(name);
      chart.render(structuredClone(config));
      const initial = chartOptions.at(-1);
      chart.render({ ...structuredClone(config), theme: 'midnight' });
      expect(new Set(render.mock.contexts).size).toBe(1);
      expect(chartOptions.at(-1).key).toBe(initial.key);
      expect(chartOptions.at(-1).animate.update).toMatchObject({
        type: 'morphing',
        duration: 260,
      });
      chart.render({ ...structuredClone(config), data: [] });
      chart.render(structuredClone(config));
      expect(new Set(render.mock.contexts).size).toBe(1);
      expect(destroy).not.toHaveBeenCalled();
      chart.destroy();
      chart.destroy();
      expect(destroy).toHaveBeenCalledTimes(1);
      chart.render(structuredClone(config));
      expect(new Set(render.mock.contexts).size).toBe(2);
      chart.destroy();
    },
  );

  it.each(charts)('%s respects reduced motion on updates', (name, config) => {
    vi.stubGlobal('window', { matchMedia: () => ({ matches: true }) });
    const chart = make(name);
    chart.render(structuredClone(config));
    chart.render(structuredClone(config));
    const check = (spec: any) => {
      expect(spec.animate).toBe(false);
      spec.children?.forEach(check);
    };
    check(chartOptions.at(-1));
    chart.destroy();
  });

  it.each(['Bar', 'Column', 'Pie'])(
    '%s matches categories after reorder and value edits',
    (name) => {
      const chart = make(name);
      chart.render({ data: categorical });
      const key = chartOptions.at(-1).encode.key;
      const before = key(categorical[0]);
      chart.render({
        data: [
          { category: 'B', value: 30 },
          { category: 'A', value: 40 },
        ],
      });
      expect(chartOptions.at(-1).encode.key({ category: 'A', value: 40 })).toBe(before);
      if (name !== 'Pie') expect(key({ category: 'A', group: 'Other' })).not.toBe(before);
      chart.destroy();
    },
  );

  it.each(graphs)('%s preserves its original rebuild and fit behavior', (name, config) => {
    const render = vi.spyOn(MockGraph.prototype, 'render');
    const destroy = vi.spyOn(MockGraph.prototype, 'destroy');
    const chart = make(name);
    chart.render(structuredClone(config));
    chart.render({ ...structuredClone(config), theme: 'midnight' });
    expect(new Set(render.mock.contexts).size).toBe(2);
    expect(graphOptions.at(-1).animation).toBe(false);
    expect(graphOptions.at(-1).autoFit).toBe('view');
    expect(destroy).toHaveBeenCalledTimes(1);
    chart.destroy();
    chart.destroy();
    expect(destroy).toHaveBeenCalledTimes(2);
    chart.render(structuredClone(config));
    expect(new Set(render.mock.contexts).size).toBe(3);
    chart.destroy();
  });

  it('retains table rows and cells while appending, editing, clearing and restoring data', () => {
    const container = new MockElement();
    const chart = make('Table', container);
    chart.render({ data: [{ Name: 'A', Value: 12 }] });
    const wrapper = container.children[0];
    const content = wrapper.children[0];
    const table = content.children[2];
    const body = table.children[1];
    const row = body.children[0];
    const cell = row.children[1];
    chart.render({
      data: [
        { Name: 'A', Value: 20 },
        { Name: '<B>', Value: 30 },
      ],
      theme: 'midnight',
    });
    expect(container.children[0]).toBe(wrapper);
    expect(body.children[0]).toBe(row);
    expect(row.children[1]).toBe(cell);
    expect(cell.textContent).toBe('20');
    expect(body.children[1].children[0].textContent).toBe('<B>');
    chart.render({ data: [] });
    expect(body.children).toHaveLength(0);
    chart.render({ data: [{ Only: 'New column' }] });
    expect(body.children[0].children).toHaveLength(1);
    chart.destroy();
    expect(container.children).toHaveLength(0);
  });

  it('retains the T8 renderer and content node during text generation', () => {
    const container = new MockElement();
    const chart = make('Summary', container);
    chart.render('# Revenue');
    const wrapper = container.children[0];
    const content = wrapper.children[0];
    const unmount = vi.spyOn(textInstances[0], 'unmount');
    chart.render('# Revenue\nTotal increased');
    expect(textInstances).toHaveLength(1);
    expect(wrapper.children[0]).toBe(content);
    expect(unmount).not.toHaveBeenCalled();
    chart.render('theme dark\n# Midnight');
    expect(textInstances[0].themeArgs?.[0]).toBe('dark');
    expect(textInstances).toHaveLength(1);
    chart.destroy();
    expect(unmount).toHaveBeenCalledOnce();
  });
});
