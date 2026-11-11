import { expectTypeOf, it } from 'vitest';
import type {
  Annotation,
  LineConfig,
  NetworkGraphConfig,
  SummaryConfig,
  TableConfig,
} from '../../src';

it('defines runnable configuration examples for primitives, table targets and summary text', () => {
  const line: LineConfig = {
    data: [
      { time: 1, value: 12 },
      { time: 2, value: 24 },
    ],
    annotations: [
      { type: 'line', data: { value: 18 } },
      {
        type: 'line',
        data: [
          { time: 1, value: 12 },
          { time: 2, value: 24 },
        ],
      },
      { type: 'range', data: { time: [1, 2], value: [10, 20] } },
      { type: 'connector', data: [{ time: 1 }, { time: 2 }], label: 'Change' },
      { type: 'connector', shape: 'curve', data: [{ time: 1 }, { time: 2 }] },
      {
        type: 'connector',
        shape: 'dimension',
        orientation: 'vertical',
        data: [{ time: 1 }, { time: 2 }],
        label: '+12',
      },
      { type: 'connector', shape: 'bracket', data: [{ time: 1 }, { time: 2 }], label: 'Compare' },
      { type: 'point', data: [{ time: 1 }, { time: 1.5, value: 18 }] },
      { type: 'point', data: { time: 2 }, pulse: false },
      { type: 'text', data: { time: 1.5, value: 22 }, label: 'Explanation' },
    ],
  };
  const table: TableConfig = {
    data: [{ product: 'Pro', revenue: 240 }],
    annotations: [
      { type: 'highlight', data: { product: 'Pro' } },
      { type: 'highlight', field: 'revenue' },
      {
        type: 'highlight',
        data: [{ product: 'Pro' }],
        field: 'revenue',
        label: 'Revenue',
        dimOpacity: 0.5,
      },
    ],
  };
  const summary: SummaryConfig = {
    type: 'summary',
    text: 'Revenue reached [240](metric_value).',
    annotations: [{ type: 'highlight', data: { text: '240' }, label: 'Explanation' }],
  };
  expectTypeOf(line).toMatchTypeOf<LineConfig>();
  expectTypeOf(table).toMatchTypeOf<TableConfig>();
  expectTypeOf(summary).toMatchTypeOf<SummaryConfig>();
  expectTypeOf('Original string API').toMatchTypeOf<SummaryConfig>();

  // @ts-expect-error Highlight needs a data target or a table field.
  const missingTarget: Annotation = { type: 'highlight' };
  const unsupportedTable: TableConfig = {
    data: [],
    // @ts-expect-error Tables support highlight, not coordinate primitives.
    annotations: [{ type: 'point', data: { product: 'Pro' } }],
  };
  const unsupportedSummary: SummaryConfig = {
    text: 'Revenue',
    // @ts-expect-error Summary targets require text and do not accept table columns.
    annotations: [{ type: 'highlight', field: 'text' }],
  };
  void [missingTarget, unsupportedTable, unsupportedSummary];
});

it('limits graph annotations to object anchors and paths with at least two positions', () => {
  const graph: NetworkGraphConfig = {
    data: {
      nodes: [{ name: 'A' }, { name: 'B' }],
      edges: [{ source: 'A', target: 'B' }],
    },
    annotations: [
      { type: 'point', data: { name: 'A' }, pulse: true },
      { type: 'point', data: [{ name: 'A' }, { source: 'A', target: 'B' }] },
      { type: 'text', data: { source: 'A', target: 'B' }, label: 'Edge' },
      { type: 'connector', data: [{ name: 'A' }, { name: 'B' }] },
      {
        type: 'line',
        data: [{ name: 'A' }, { source: 'A', target: 'B' }, { name: 'B' }],
        stroke: '#123456',
        lineDash: [4, 2],
        label: 'Path',
      },
    ],
  };
  type GraphAnnotation = NonNullable<NetworkGraphConfig['annotations']>[number];
  // @ts-expect-error Graphs have no coordinate ranges.
  const range: GraphAnnotation = { type: 'range', data: { name: ['A', 'B'] } };
  // @ts-expect-error Graph lines require a path, not an axis field.
  const axisLine: GraphAnnotation = { type: 'line', data: { name: 'A' } };
  // @ts-expect-error A line path needs at least two positions.
  const empty: GraphAnnotation = { type: 'line', data: [] };
  // @ts-expect-error A line path needs at least two positions.
  const single: GraphAnnotation = { type: 'line', data: [{ name: 'A' }] };
  // @ts-expect-error Highlight is not implemented for graph views yet.
  const highlight: GraphAnnotation = { type: 'highlight', data: { name: 'A' } };
  expectTypeOf(graph).toMatchTypeOf<NetworkGraphConfig>();
  void [range, axisLine, empty, single, highlight];
});
