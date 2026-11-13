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
      { type: 'path', data: { value: 18 } },
      {
        type: 'path',
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
      {
        type: 'text',
        data: { time: 1.5, value: 22 },
        label: 'Explanation',
        style: { labelFill: '#123456', labelFontSize: 14 },
      },
    ],
  };
  const table: TableConfig = {
    data: [{ product: 'Pro', revenue: 240 }],
    annotations: [
      { type: 'highlight', data: { row: { product: 'Pro' } } },
      { type: 'highlight', data: { column: 'revenue' } },
      {
        type: 'highlight',
        data: [{ row: { product: 'Pro' }, column: 'revenue' }],
        label: 'Revenue',
        style: {
          dimOpacity: 0.5,
        },
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

  // @ts-expect-error Highlight requires target data.
  const missingTarget: Annotation = { type: 'highlight' };
  const unsupportedTable: TableConfig = {
    data: [],
    // @ts-expect-error Tables support highlight, not coordinate primitives.
    annotations: [{ type: 'point', data: { product: 'Pro' } }],
  };
  const unsupportedSummary: SummaryConfig = {
    text: 'Revenue',
    // @ts-expect-error Summary targets require text and do not accept table columns.
    annotations: [{ type: 'highlight', data: { column: 'text' } }],
  };
  void [missingTarget, unsupportedTable, unsupportedSummary];
});

it('keeps appearance in style and restricts fields to the annotation kind', () => {
  type Point = Extract<Annotation, { type: 'point' }>;
  type Text = Extract<Annotation, { type: 'text' }>;
  const flatStyle: Point = {
    type: 'point',
    data: { value: 10 },
    // @ts-expect-error Appearance belongs in style.
    stroke: '#f80',
  };
  const dashedPoint: Point = {
    type: 'point',
    data: { value: 10 },
    // @ts-expect-error Points do not accept line dashes.
    style: { lineDash: [4, 2] },
  };
  const strokedText: Text = {
    type: 'text',
    data: { value: 10 },
    label: 'Text',
    // @ts-expect-error Text accepts label styles only.
    style: { stroke: '#f80' },
  };
  const emptyTableTarget: TableConfig = {
    data: [],
    // @ts-expect-error Table targets require a row or column.
    annotations: [{ type: 'highlight', data: {} }],
  };
  void [flatStyle, dashedPoint, strokedText, emptyTableTarget];
});

it('limits graph annotations to object anchors and ordered paths', () => {
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
        type: 'path',
        data: [{ name: 'A' }, { source: 'A', target: 'B' }, { name: 'B' }],
        label: 'Path',
        style: {
          stroke: '#123456',
          lineDash: [4, 2],
        },
      },
    ],
  };
  type GraphAnnotation = NonNullable<NetworkGraphConfig['annotations']>[number];
  // @ts-expect-error Graphs have no coordinate ranges.
  const range: GraphAnnotation = { type: 'range', data: { name: ['A', 'B'] } };
  // @ts-expect-error Graph paths require an array, not an axis field.
  const axisPath: GraphAnnotation = { type: 'path', data: { name: 'A' } };
  // @ts-expect-error Highlight is not implemented for graph views yet.
  const highlight: GraphAnnotation = { type: 'highlight', data: { name: 'A' } };
  expectTypeOf(graph).toMatchTypeOf<NetworkGraphConfig>();
  void [range, axisPath, highlight];
});
