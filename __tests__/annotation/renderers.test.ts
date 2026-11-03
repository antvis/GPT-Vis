import type * as G2 from '@antv/g2';
import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import type { ReferenceAreaAnnotation } from '../../src/types/annotation';
import { Bar } from '../../src/vis/bar';
import { Column } from '../../src/vis/column';
import { Line } from '../../src/vis/line';
import { NetworkGraph } from '../../src/vis/network-graph';
import { chartOptions, createContainer, graphOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async (importOriginal) => ({
  corelib: (await importOriginal<typeof G2>()).corelib,
  Chart: (await import('../helpers/renderers')).MockChart,
}));
vi.mock('@antv/g6', async () => ({ Graph: (await import('../helpers/renderers')).MockGraph }));

const lineData = [
  { time: 'Q1', value: 80, group: 'East' },
  { time: 'Q2', value: 120, group: 'East' },
  { time: 'Q1', value: 60, group: 'West' },
  { time: 'Q2', value: 90, group: 'West' },
];
const graphData = {
  nodes: [{ name: 'Orders' }, { name: 'Payments' }],
  edges: [{ source: 'Orders', target: 'Payments', name: 'Calls' }],
};

beforeEach(() => {
  chartOptions.length = 0;
  graphOptions.length = 0;
});

describe('reference area intervals', () => {
  it('requires at least one interval and does not accept the old axis/value form', () => {
    expectTypeOf<{
      type: 'referenceArea';
      x: [string, string];
    }>().toExtend<ReferenceAreaAnnotation>();
    expectTypeOf<{
      type: 'referenceArea';
      y: [number, number];
    }>().toExtend<ReferenceAreaAnnotation>();
    expectTypeOf<{
      type: 'referenceArea';
      x: [string, string];
      y: [number, number];
    }>().toExtend<ReferenceAreaAnnotation>();
    expectTypeOf<{ type: 'referenceArea' }>().not.toExtend<ReferenceAreaAnnotation>();
    expectTypeOf<{
      type: 'referenceArea';
      axis: 'x';
      value: [string, string];
    }>().not.toExtend<ReferenceAreaAnnotation>();
  });

  it.each([
    [{ type: 'referenceArea' }, 'requires an x or y interval'],
    [{ type: 'referenceArea', axis: 'x', value: ['Q1', 'Q2'] }, 'requires an x or y interval'],
    [{ type: 'referenceArea', x: [] }, 'requires two endpoints'],
    [{ type: 'referenceArea', y: [70] }, 'requires two endpoints'],
    [{ type: 'referenceArea', x: null }, 'requires two endpoints'],
  ])('rejects malformed JSON %j before replacing the chart', (annotation, message) => {
    const line = Line({ container: createContainer() });
    line.render({ data: lineData });
    expect(() => line.render({ data: lineData, annotations: [annotation as any] })).toThrow(
      message as string,
    );
    expect(chartOptions).toHaveLength(1);
  });
});

describe.each([
  ['line', Line, false],
  ['column', Column, false],
  ['bar', Bar, true],
] as const)('%s single-axis reference areas', (_type, createChart, transpose) => {
  it.each(['x', 'y'] as const)('leaves the omitted axis to the native plot extent (%s)', (axis) => {
    const annotation: ReferenceAreaAnnotation =
      axis === 'x'
        ? { type: 'referenceArea', x: ['Q1', 'Q2'] }
        : { type: 'referenceArea', y: [70, 110] };
    createChart({ container: createContainer() }).render({
      data: lineData.map((datum) => ({ ...datum, category: datum.time })),
      annotations: [{ ...annotation, label: { text: 'Window' } }],
    });
    const area = chartOptions.at(-1).children[0];
    expect(area.type).toBe(axis === 'x' ? 'rangeX' : 'rangeY');
    expect(area.data).toEqual(axis === 'x' ? [{ x: 'Q1', x1: 'Q2' }] : [{ y: 70, y1: 110 }]);
    expect(area.encode).toEqual({ [axis]: axis, [`${axis}1`]: `${axis}1` });
    expect(area.labels[0].annotationAxis()).toBe(transpose ? (axis === 'x' ? 'y' : 'x') : axis);
  });
});

describe('line annotations', () => {
  it('uses an unused palette color for point, halo and connector, with explicit fill taking priority', () => {
    const line = Line({ container: createContainer() });
    const config = {
      data: lineData,
      style: { palette: ['#287', '#79a', '#f80'] },
      annotations: [
        {
          type: 'highlight' as const,
          data: [{ time: 'Q2' }],
          label: { text: 'Quarter-end' },
        },
      ],
    };
    line.render(config);
    const points = () =>
      chartOptions.at(-1).children.filter((mark: any) => mark.type === 'point' && mark.data);
    expect(points()[0].style.fill(lineData[1])).toBe('#f80');
    expect(points()[1].style.fill(lineData[3])).toBe('#f80');
    expect(points()[1].labels[0].connectorStroke(lineData[1])).toBe('#f80');
    line.render({
      ...config,
      annotations: [{ ...config.annotations[0], style: { fill: '#e05' } }],
    });
    expect(points()[0].style.fill(lineData[1])).toBe('#e05');
    expect(points()[1].style.fill).toBe('#e05');
    expect(points()[1].labels[0].connectorStroke(lineData[1])).toBe('#e05');
  });

  it('resolves all four annotation types with categorical x and shared series, without changing data', () => {
    const original = structuredClone(lineData);
    Line({ container: createContainer() }).render({
      data: lineData,
      annotations: [
        { type: 'referenceArea', x: ['Q1', 'Q2'], label: { text: 'Window' } },
        { type: 'referenceLine', axis: 'y', value: 100, label: { text: 'Target' } },
        { type: 'highlight', data: [{ group: 'East' }, { time: 'Q2', group: 'East' }] },
        { type: 'highlight', data: [{ time: 'Q2', group: 'West' }], label: { text: 'Note' } },
        {
          type: 'difference',
          from: { time: 'Q1', group: 'East' },
          to: { time: 'Q2', group: 'East' },
          label: { text: '+40' },
        },
      ],
    });
    const chart = chartOptions.at(-1);
    expect(chart.scale.x.domain).toEqual(['Q1', 'Q2']);
    expect(chart.scale.color.domain).toEqual(['East', 'West']);
    expect(chart.children[0]).toMatchObject({ type: 'rangeX', encode: { x: 'x', x1: 'x1' } });
    expect(chart.children.find((mark: any) => mark.type === 'lineY')).toMatchObject({
      data: [{ value: 100 }],
      tooltip: false,
    });
    const emphasis = chart.children.filter(
      (mark: any) => mark.type === 'point' && mark.data && mark.style.fillOpacity === 1,
    );
    expect(emphasis[0].data).toEqual(lineData.slice(0, 2));
    expect(emphasis[0].labels).toBeUndefined();
    expect(emphasis[1].data).toEqual([lineData[3]]);
    expect(emphasis[1].labels[0].text()).toBe('Note');
    expect(chart.children.find((mark: any) => mark.type === 'link')).toMatchObject({
      data: [{ ...lineData[0], endTime: 'Q2', endValue: 120 }],
    });
    expect(lineData).toEqual(original);
  });

  it('allows one reference to highlight multiple series with explanations', () => {
    Line({ container: createContainer() }).render({
      data: lineData,
      annotations: [
        {
          type: 'highlight',
          data: [{ time: 'Q2' }, { time: 'Q2', group: 'East' }],
          label: { text: 'Quarter-end' },
        },
      ],
    });
    const chart = chartOptions.at(-1);
    const emphasis = chart.children.find(
      (mark: any) => mark.type === 'point' && mark.style.fillOpacity === 1,
    );
    expect(emphasis.data).toEqual([lineData[1], lineData[3]]);
    expect(emphasis.labels[0].text()).toBe('Quarter-end');
    expect(chart.children.find((mark: any) => mark.type === 'line').style.opacity).toBeUndefined();
  });

  it('bounds a reference area on both axes without reordering categorical data or series', () => {
    Line({ container: createContainer() }).render({
      data: lineData,
      annotations: [
        {
          type: 'referenceArea',
          x: ['Q1', 'Q2'],
          y: [75, 110],
          label: { text: 'Target zone' },
        },
      ],
    });
    const chart = chartOptions.at(-1);
    expect(chart.scale.x.domain).toEqual(['Q1', 'Q2']);
    expect(chart.scale.color.domain).toEqual(['East', 'West']);
    expect(chart.children[0]).toMatchObject({
      type: 'range',
      data: [{ x: 'Q1', x1: 'Q2', y: 75, y1: 110 }],
      encode: { x: 'x', x1: 'x1', y: 'y', y1: 'y1' },
      tooltip: false,
    });
    expect(chart.children[0].labels[0].text()).toBe('Target zone');
    expect(chart.children[0].labels[0].annotationAxis()).toBeUndefined();
  });

  it('accepts numeric area boundaries between observations and rejects invalid bounds before replacing the chart', () => {
    const data = [
      { time: 0, value: 10 },
      { time: 10, value: 20 },
    ];
    const line = Line({ container: createContainer() });
    line.render({
      data,
      annotations: [{ type: 'referenceArea', x: [2, 8], y: [12, 18] }],
    });
    expect(chartOptions.at(-1).children[0].data).toEqual([{ x: 2, x1: 8, y: 12, y1: 18 }]);
    expect(() =>
      line.render({
        data,
        annotations: [{ type: 'referenceArea', x: [8, 2], y: [12, 18] }],
      }),
    ).toThrow('x reference area endpoints');
    expect(() =>
      line.render({
        data,
        annotations: [{ type: 'referenceArea', x: [2, 8], y: [18, 12] }],
      }),
    ).toThrow('y reference area endpoints');
    expect(() =>
      line.render({
        data,
        annotations: [{ type: 'referenceArea', x: [2, 8], y: [12, Infinity] }],
      }),
    ).toThrow('finite number');
    expect(() =>
      line.render({
        data: lineData,
        annotations: [{ type: 'referenceArea', x: ['Q2', 'Q1'], y: [75, 110] }],
      }),
    ).toThrow('x reference area endpoints');
    expect(() =>
      line.render({
        data: lineData,
        annotations: [{ type: 'referenceArea', x: ['Q1', 'Q3'], y: [75, 110] }],
      }),
    ).toThrow('time domain');
    expect(chartOptions).toHaveLength(1);
  });

  it('keeps highlighted points visible in dense charts and clears overlays on rerender', () => {
    const data = Array.from({ length: 50 }, (_, time) => ({ time, value: time * 2 }));
    const line = Line({ container: createContainer() });
    line.render({ data, annotations: [{ type: 'highlight', data: [{ time: 25 }] }] });
    expect(chartOptions.at(-1).children.filter((mark: any) => mark.type === 'point')).toHaveLength(
      2,
    );
    line.render({ data });
    expect(chartOptions.at(-1).children.map((mark: any) => mark.type)).toEqual(['line']);
  });

  it('inherits annotation paint from theme tokens and keeps per-annotation overrides', () => {
    Line({ container: createContainer() }).render({
      data: lineData,
      theme: {
        id: 'report',
        label: 'Report',
        tokens: {
          colorSurface: '#fffaf0',
          colorStroke: '#73634b',
          colorText: '#332211',
          fontSize: 16,
          fontFamily: 'serif',
          lineHeight: 24,
          radius: 12,
          spacingSmall: 9,
          spacingMedium: 14,
          lineWidth: 2,
        },
      },
      annotations: [
        {
          type: 'highlight',
          data: [{ time: 'Q1', group: 'East' }],
          label: { text: 'Start', style: { fontWeight: 'bold' } },
        },
        { type: 'referenceLine', axis: 'y', value: 100, style: { lineWidth: 3 } },
      ],
    });
    const marks = chartOptions.at(-1).children;
    expect(marks.find((mark: any) => mark.labels)?.labels[0]).toMatchObject({
      fill: '#332211',
      fontSize: 16,
      fontFamily: 'serif',
      fontWeight: 'bold',
      lineHeight: 24,
      backgroundFill: '#fffaf0',
      backgroundStroke: '#73634b',
      backgroundLineWidth: 2,
      backgroundRadius: 12,
      backgroundPadding: [9, 14],
      connectorLineWidth: 2,
    });
    expect(marks.find((mark: any) => mark.type === 'lineY').style.lineWidth).toBe(3);
  });

  it('rejects ambiguous, missing, empty and unsupported references before replacing the chart', () => {
    const line = Line({ container: createContainer() });
    line.render({ data: lineData });
    expect(() =>
      line.render({
        data: lineData,
        annotations: [
          {
            type: 'difference',
            from: { time: 'Q2' },
            to: { time: 'Q1', group: 'East' },
            label: { text: 'Change' },
          },
        ],
      }),
    ).toThrow('one item');
    expect(() =>
      line.render({ data: lineData, annotations: [{ type: 'highlight', data: [{ time: 'Q3' }] }] }),
    ).toThrow('no data');
    expect(() =>
      line.render({ data: lineData, annotations: [{ type: 'highlight', data: [{}] }] }),
    ).toThrow('empty');
    expect(() =>
      line.render({ data: lineData, annotations: [{ type: 'highlight', fields: ['value'] }] }),
    ).toThrow('field-level');
    expect(chartOptions).toHaveLength(1);
  });

  it('parses nested annotation objects from streaming syntax', () => {
    const config = parse(`vis line
data
  - time Q1
    value 80
annotations
  - type highlight
    data
      - time Q1
    label
      text Start
      style
        fontSize 14
  - type highlight
    data
      - time Q1
    style
      lineDash
        - 3
        - 2
  - type referenceArea
    x
      - Q1
      - Q1
  - type referenceLine
    axis y
    value 100
  - type referenceArea
    x
      - Q1
      - Q1
    y
      - 70
      - 90
  - type difference
    from
      time Q1
    to
      time Q1
    label
      text Same
title Parsed title
`);
    expect(config.title).toBe('Parsed title');
    expect(config.annotations).toEqual([
      {
        type: 'highlight',
        data: [{ time: 'Q1' }],
        label: { text: 'Start', style: { fontSize: 14 } },
      },
      { type: 'highlight', data: [{ time: 'Q1' }], style: { lineDash: [3, 2] } },
      { type: 'referenceArea', x: ['Q1', 'Q1'] },
      { type: 'referenceLine', axis: 'y', value: 100 },
      { type: 'referenceArea', x: ['Q1', 'Q1'], y: [70, 90] },
      { type: 'difference', from: { time: 'Q1' }, to: { time: 'Q1' }, label: { text: 'Same' } },
    ]);
    Line({ container: createContainer() }).render(config as any);
    const point = chartOptions
      .at(-1)
      .children.find((mark: any) => mark.type === 'point' && mark.labels);
    expect(point.labels[0].text()).toBe('Start');
  });
});

describe.each([
  ['column', Column, false],
  ['bar', Bar, true],
] as const)('%s annotations', (_type, createChart, transpose) => {
  const data = lineData.map(({ time, ...datum }) => ({ category: time, ...datum }));

  it.each([false, true])(
    'preserves series colors and dims only unmatched bars (stack=%s)',
    (stack) => {
      createChart({ container: createContainer() }).render({
        data,
        group: !stack,
        stack,
        style: { palette: ['#287', '#79a', '#f80'] },
        annotations: [{ type: 'highlight', data: [{ category: 'Q2' }], label: { text: 'Note' } }],
      });
      const options = chartOptions.at(-1);
      const interval = options.children.find((mark: any) => mark.type === 'interval');
      expect(interval.style.fill).toBeUndefined();
      expect(data.map(interval.style.fillOpacity)).toEqual([0.32, 1, 0.32, 1]);
      expect(interval.labels.at(-1).connectorStroke(data[1])).toBe('#287');
      expect(interval.labels.at(-1).connectorStroke(data[3])).toBe('#79a');
      expect(options.scale.color).toMatchObject({
        domain: ['East', 'West'],
        range: ['#287', '#79a', '#f80'],
      });
    },
  );

  it('preserves plain bar colors and combines multiple highlights without labels', () => {
    const plainData = data.map(({ value }, index) => ({ category: `${index}`, value }));
    createChart({ container: createContainer() }).render({
      data: plainData,
      style: { palette: ['#287'] },
      annotations: [
        { type: 'highlight', data: [{ category: '1' }] },
        { type: 'highlight', data: [{ category: '3' }] },
      ],
    });
    const interval = chartOptions.at(-1).children.find((mark: any) => mark.type === 'interval');
    expect(interval.style.fill).toBe('#287');
    expect(plainData.map(interval.style.fillOpacity)).toEqual([0.32, 1, 0.32, 1]);
  });

  it('emphasizes native grouped intervals, preserves data labels and keeps shared domains ordered', () => {
    const original = structuredClone(data);
    createChart({ container: createContainer() }).render({
      data,
      group: true,
      annotations: [
        { type: 'referenceArea', x: ['Q1', 'Q2'], label: { text: 'Window' } },
        { type: 'referenceLine', axis: 'y', value: 100, label: { text: 'Target' } },
        { type: 'referenceLine', axis: 'x', value: 'Q2' },
        {
          type: 'highlight',
          data: [{ category: 'Q2' }, { category: 'Q2', group: 'East' }],
          style: { stroke: '#d00', lineWidth: 4 },
          label: { text: 'Quarter-end' },
        },
        {
          type: 'difference',
          from: { category: 'Q1', group: 'West' },
          to: { category: 'Q2', group: 'East' },
          label: { text: '+60' },
        },
      ],
    });
    const chart = chartOptions.at(-1);
    expect(chart.scale.x).toMatchObject({ type: 'band', domain: ['Q1', 'Q2'] });
    expect(chart.scale.color.domain).toEqual(['East', 'West']);
    expect(chart.coordinate).toEqual(
      transpose ? { transform: [{ type: 'transpose' }] } : undefined,
    );
    expect(chart.children[0]).toMatchObject({ type: 'rangeX', encode: { x: 'x', x1: 'x1' } });
    expect(chart.children[0].labels[0].annotationAxis()).toBe(transpose ? 'y' : 'x');
    const interval = chart.children.find((mark: any) => mark.type === 'interval');
    expect(interval.transform).toEqual([{ type: 'dodgeX' }]);
    expect(interval.encode).toEqual({ x: 'category', y: 'value', color: 'group' });
    expect(interval.labels[0].text).toBe('value');
    const note = interval.labels.find((label: any) => label.annotationKind === 'highlight');
    expect(note.text()).toBe('Quarter-end');
    expect(data.map(note.visibility)).toEqual(['hidden', 'visible', 'hidden', 'visible']);
    expect(data.map(interval.style.annotationIndex)).toEqual([0, 1, 2, 3]);
    expect(interval.style.annotationTranspose).toBe(transpose);
    expect(interval.style.stroke(data[1])).toBe('#d00');
    expect(interval.style.lineWidth(data[3])).toBe(4);
    expect(interval.style.opacity).toBeUndefined();
    expect(chart.children.some((mark: any) => mark.type === 'point')).toBe(false);
    const reference = chart.children.find((mark: any) => mark.type === 'lineY');
    expect(reference.encode).toEqual({ y: 'value' });
    expect(reference.labels[0].annotationAxis()).toBe(transpose ? 'x' : 'y');
    expect(chart.children.find((mark: any) => mark.type === 'lineX').style.bandOffset).toBe(0.5);
    expect(chart.children.find((mark: any) => mark.type === 'link').style).toMatchObject({
      annotationFrom: 2,
      annotationTo: 1,
      annotationTranspose: transpose,
    });
    expect(data).toEqual(original);
  });

  it('supports stacked segment emphasis and bounded reference areas without enabling misleading comparisons', () => {
    const chart = createChart({ container: createContainer() });
    chart.render({
      data,
      stack: true,
      annotations: [
        {
          type: 'highlight',
          data: [{ category: 'Q1', group: 'West' }],
          label: { text: 'Segment' },
        },
        { type: 'referenceArea', x: ['Q1', 'Q2'], y: [70, 110] },
      ],
    });
    const options = chartOptions.at(-1);
    expect(options.children[0]).toMatchObject({
      type: 'range',
      data: [{ x: 'Q1', x1: 'Q2', y: 70, y1: 110 }],
    });
    expect(options.children.find((mark: any) => mark.type === 'interval').transform).toEqual([
      { type: 'stackY' },
    ]);
    expect(() =>
      chart.render({
        data,
        stack: true,
        annotations: [{ type: 'difference', from: data[0], to: data[1], label: { text: '+40' } }],
      }),
    ).toThrow('stacked charts');
    expect(chartOptions).toHaveLength(1);
  });

  it('preserves native theme paint on unmatched bars and allows annotation and text overrides', () => {
    createChart({ container: createContainer() }).render({
      data,
      theme: {
        id: 'report',
        label: 'Report',
        tokens: {
          colorSurface: '#fffaf0',
          colorText: '#332211',
          colorStroke: '#73634b',
          fontSize: 16,
          radius: 12,
          lineWidth: 2,
        },
      },
      style: { palette: ['#287'], mark: { interval: { stroke: '#123', lineWidth: 1 } } },
      annotations: [
        {
          type: 'highlight',
          data: [{ category: 'Q2' }],
          style: { fill: '#f80' },
          label: { text: 'Note', style: { fontWeight: 'bold' } },
        },
      ],
    });
    const interval = chartOptions.at(-1).children.find((mark: any) => mark.type === 'interval');
    expect(chartOptions.at(-1).scale.color.range[0]).toBe('#287');
    expect(interval.style.fill(data[0])).toBeUndefined();
    expect(interval.style.fill(data[1])).toBe('#f80');
    expect(data.map(interval.style.fillOpacity)).toEqual([0.32, 1, 0.32, 1]);
    expect(interval.style.stroke).toBe('#123');
    expect(interval.style.lineWidth).toBe(1);
    expect(interval.labels.at(-1)).toMatchObject({
      fill: '#332211',
      fontSize: 16,
      fontWeight: 'bold',
      backgroundFill: '#fffaf0',
      backgroundStroke: '#73634b',
      backgroundRadius: 12,
    });
  });

  it('rejects unmatched, ambiguous and unsupported references and clears annotations on rerender', () => {
    const chart = createChart({ container: createContainer() });
    chart.render({ data, annotations: [{ type: 'highlight', data: [{ category: 'Q2' }] }] });
    expect(() =>
      chart.render({
        data,
        annotations: [{ type: 'highlight', data: [{ category: 'Missing' }] }],
      }),
    ).toThrow('no data');
    expect(() =>
      chart.render({
        data,
        annotations: [
          { type: 'difference', from: { category: 'Q2' }, to: data[0], label: { text: 'Change' } },
        ],
      }),
    ).toThrow('one item');
    expect(() =>
      chart.render({
        data,
        annotations: [{ type: 'highlight', fields: ['value'] }],
      }),
    ).toThrow('field-level');
    expect(chartOptions).toHaveLength(1);
    chart.render({ data });
    expect(chartOptions.at(-1).type).toBe('interval');
    expect(chartOptions.at(-1).style.annotationIndex).toBeUndefined();
    expect(chartOptions.at(-1).style.fillOpacity).toBeUndefined();
    expect(chartOptions.at(-1).labels).toHaveLength(1);
  });
});

describe('network annotations', () => {
  it('maps original node and edge fields to styles and adds explanations without replacing labels', () => {
    const original = structuredClone(graphData);
    NetworkGraph({ container: createContainer() }).render({
      data: graphData,
      annotations: [
        {
          type: 'highlight',
          data: [{ source: 'Orders', target: 'Payments' }],
          style: { stroke: '#f00' },
        },
        { type: 'highlight', data: [{ name: 'Payments' }], label: { text: 'Bottleneck' } },
        {
          type: 'highlight',
          data: [{ source: 'Orders', target: 'Payments' }],
          label: { text: 'Slow' },
        },
      ],
    });
    const graph = graphOptions.at(-1);
    expect(graph.data.nodes[0].style.halo).toBeUndefined();
    expect(graph.data.nodes[1].style).toMatchObject({
      labelText: 'Payments',
      halo: true,
      badges: [expect.objectContaining({ text: 'Bottleneck' })],
    });
    expect(graph.data.edges[0].style).toMatchObject({
      labelText: 'Calls',
      badgeText: 'Slow',
      stroke: '#f00',
    });
    expect(graphData).toEqual(original);
  });

  it('rejects node/edge ambiguity and unsupported annotations', () => {
    const graph = NetworkGraph({ container: createContainer() });
    expect(() =>
      graph.render({
        data: { ...graphData, edges: [{ source: 'Orders', target: 'Payments', name: 'Payments' }] },
        annotations: [{ type: 'highlight', data: [{ name: 'Payments' }] }],
      }),
    ).toThrow('both nodes and edges');
    expect(() =>
      graph.render({
        data: graphData,
        annotations: [{ type: 'referenceLine', axis: 'y', value: 10 }],
      }),
    ).toThrow('supports highlight only');
  });

  it('clears annotation styles on rerender and uses theme colors for explanations', () => {
    const graph = NetworkGraph({ container: createContainer() });
    graph.render({
      data: graphData,
      theme: 'dark',
      annotations: [{ type: 'highlight', data: [{ name: 'Payments' }], label: { text: 'Note' } }],
    });
    expect(graphOptions.at(-1).data.nodes[1].style.badges[0].fill).toBe('#e0e0e0');
    graph.render({ data: graphData });
    expect(graphOptions.at(-1).data.nodes[1].style.badges).toBeUndefined();
    graph.render({
      data: graphData,
      theme: {
        id: 'custom',
        label: 'Custom',
        tokens: {
          colorText: '#123456',
          fontSize: 15,
          fontFamily: 'serif',
          lineHeight: 22,
          colorSurface: '#fffaf0',
          colorStroke: '#73634b',
          lineWidth: 2,
          radius: 12,
          spacingSmall: 9,
          spacingMedium: 14,
        },
      },
      annotations: [{ type: 'highlight', data: [{ name: 'Payments' }], label: { text: 'Note' } }],
    });
    expect(graphOptions.at(-1).data.nodes[1].style.badges[0]).toMatchObject({
      fill: '#123456',
      fontSize: 15,
      fontFamily: 'serif',
      lineHeight: 22,
      backgroundFill: '#fffaf0',
      backgroundStroke: '#73634b',
      backgroundLineWidth: 2,
      backgroundRadius: 12,
      padding: [9, 14],
    });
  });
});
