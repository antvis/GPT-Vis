import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { Line } from '../../src/vis/line';
import { NetworkGraph } from '../../src/vis/network-graph';
import { chartOptions, createContainer, graphOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));
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

describe('line annotations', () => {
  it('resolves all five annotations with categorical x and shared series, without changing data', () => {
    const original = structuredClone(lineData);
    Line({ container: createContainer() }).render({
      data: lineData,
      annotations: [
        { type: 'range', axis: 'x', value: ['Q1', 'Q2'] },
        { type: 'line', axis: 'y', value: 100, label: { text: 'Target' } },
        { type: 'highlight', data: [{ group: 'East' }, { time: 'Q2', group: 'East' }] },
        { type: 'point', data: { time: 'Q2', group: 'West' }, label: { text: 'Note' } },
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
    expect(chart.children[0]).toMatchObject({ type: 'rangeX', encode: { x: 'start', x1: 'end' } });
    expect(chart.children.find((mark: any) => mark.type === 'lineY')).toMatchObject({
      data: [{ value: 100 }],
      tooltip: false,
    });
    const emphasis = chart.children.filter(
      (mark: any) => mark.type === 'point' && mark.data && mark.style.fillOpacity === 1,
    );
    expect(emphasis[0].data).toEqual(lineData.slice(0, 2));
    expect(emphasis[1].data).toEqual([lineData[3]]);
    expect(emphasis[1].labels[0].text()).toBe('Note');
    expect(chart.children.find((mark: any) => mark.type === 'link')).toMatchObject({
      data: [{ ...lineData[0], endTime: 'Q2', endValue: 120 }],
    });
    expect(lineData).toEqual(original);
  });

  it('keeps highlighted points visible in dense charts and clears overlays on rerender', () => {
    const data = Array.from({ length: 50 }, (_, time) => ({ time, value: time * 2 }));
    const line = Line({ container: createContainer() });
    line.render({ data, annotations: [{ type: 'point', data: { time: 25 } }] });
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
          type: 'point',
          data: { time: 'Q1', group: 'East' },
          label: { text: 'Start', style: { fontWeight: 'bold' } },
        },
        { type: 'line', axis: 'y', value: 100, style: { lineWidth: 3 } },
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
      line.render({ data: lineData, annotations: [{ type: 'point', data: { time: 'Q2' } }] }),
    ).toThrow('one item');
    expect(() =>
      line.render({ data: lineData, annotations: [{ type: 'point', data: { time: 'Q3' } }] }),
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
  - type point
    data
      time Q1
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
  - type range
    axis x
    value
      - Q1
      - Q1
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
      { type: 'point', data: { time: 'Q1' }, label: { text: 'Start', style: { fontSize: 14 } } },
      { type: 'highlight', data: [{ time: 'Q1' }], style: { lineDash: [3, 2] } },
      { type: 'range', axis: 'x', value: ['Q1', 'Q1'] },
      { type: 'difference', from: { time: 'Q1' }, to: { time: 'Q1' }, label: { text: 'Same' } },
    ]);
    Line({ container: createContainer() }).render(config as any);
    const point = chartOptions
      .at(-1)
      .children.find((mark: any) => mark.type === 'point' && mark.labels);
    expect(point.labels[0].text()).toBe('Start');
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
        { type: 'point', data: { name: 'Payments' }, label: { text: 'Bottleneck' } },
        { type: 'point', data: { source: 'Orders', target: 'Payments' }, label: { text: 'Slow' } },
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
      graph.render({ data: graphData, annotations: [{ type: 'line', axis: 'y', value: 10 }] }),
    ).toThrow('highlight and point');
  });

  it('clears annotation styles on rerender and uses theme colors for explanations', () => {
    const graph = NetworkGraph({ container: createContainer() });
    graph.render({
      data: graphData,
      theme: 'dark',
      annotations: [{ type: 'point', data: { name: 'Payments' }, label: { text: 'Note' } }],
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
      annotations: [{ type: 'point', data: { name: 'Payments' }, label: { text: 'Note' } }],
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
