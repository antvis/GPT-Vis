import { expectTypeOf, it } from 'vitest';
import type {
  Annotation,
  AnnotationOptions,
  AnnotationStyle,
  AreaConfig,
  BarConfig,
  ColumnConfig,
  LineConfig,
  NetworkGraphConfig,
  PieConfig,
  ScatterConfig,
  SummaryConfig,
  TableConfig,
} from '../../src';
import type { RendererAnnotation } from '../../src/annotation/registry';

it('reuses shared label and style options while retaining annotation-specific fields', () => {
  const style: AnnotationStyle<'topN'> = { labelFill: '#176b68', dimOpacity: 0.16 };
  const options: AnnotationOptions<typeof style> = { label: 'Key result', style };
  const annotations: Annotation[] = [
    { type: 'topN', n: 2, ...options },
    { type: 'bottomN', n: 1, style },
  ];
  expectTypeOf<AnnotationStyle<'topN'>>().toEqualTypeOf<AnnotationStyle<'contribution'>>();
  expectTypeOf<AnnotationStyle<'mean'>>().toEqualTypeOf<AnnotationStyle<'event'>>();
  const line: AnnotationStyle<'mean'> = {
    lineDash: [4, 4],
    // @ts-expect-error Reference lines do not accept selection dimming.
    dimOpacity: 0.16,
  };
  const marker: AnnotationStyle<'centroid'> = {
    size: 6,
    // @ts-expect-error Point markers do not accept line dashes.
    lineDash: [4, 4],
  };
  const text: AnnotationStyle<'text'> = {
    labelFontSize: 12,
    // @ts-expect-error Standalone text only accepts label styling.
    fill: '#176b68',
  };
  void [annotations, line, marker, text];
});

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
  type Path = Extract<Annotation, { type: 'path' }>;
  type Connector = Extract<Annotation, { type: 'connector' }>;
  type Highlight = Extract<Annotation, { type: 'highlight' }>;
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
  const shapedPoint: Point = {
    type: 'point',
    data: { value: 10 },
    // @ts-expect-error Point shapes follow the theme.
    style: { shape: 'triangle' },
  };
  const filledPath: Path = {
    type: 'path',
    data: { value: 10 },
    // @ts-expect-error Paths draw lines, without exposing region fill.
    style: { fill: '#f80' },
  };
  const edgePath: Path = {
    type: 'path',
    data: { value: 10 },
    // @ts-expect-error Label placement is internal to the component.
    labelPosition: 'end',
  };
  const edgeConnector: Connector = {
    type: 'connector',
    data: [{ value: 10 }, { value: 20 }],
    // @ts-expect-error Comparison lanes are internal to the component.
    placement: 'end',
  };
  const pulsingHighlight: Highlight = {
    type: 'highlight',
    data: { value: 10 },
    // @ts-expect-error Shared highlights do not expose point-specific animation controls.
    pulse: false,
  };
  const haloHighlight: Highlight = {
    type: 'highlight',
    data: { value: 10 },
    // @ts-expect-error Shared highlights do not expose point-specific geometry controls.
    style: { halo: false },
  };
  const emptyTableTarget: TableConfig = {
    data: [],
    // @ts-expect-error Table targets require a row or column.
    annotations: [{ type: 'highlight', data: {} }],
  };
  void [
    flatStyle,
    dashedPoint,
    strokedText,
    shapedPoint,
    filledPath,
    edgePath,
    edgeConnector,
    pulsingHighlight,
    haloHighlight,
    emptyTableTarget,
  ];
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
  type GraphOptions = NonNullable<NetworkGraphConfig['annotations']>[number];
  // @ts-expect-error Graphs have no coordinate ranges.
  const range: GraphOptions = { type: 'range', data: { name: ['A', 'B'] } };
  // @ts-expect-error Graph paths require an array, not an axis field.
  const axisPath: GraphOptions = { type: 'path', data: { name: 'A' } };
  const graphPlotLabel: RendererAnnotation<Record<string, string | number>, 'g6'> = {
    type: 'path',
    data: [{ name: 'A' }, { name: 'B' }],
    // @ts-expect-error Path label placement is internal to the component.
    labelPosition: 'end',
  };
  const highlight: RendererAnnotation<Record<string, string | number>, 'g6'> = {
    type: 'highlight',
    data: { name: 'A' },
  };
  expectTypeOf(graph).toMatchTypeOf<NetworkGraphConfig>();
  void [range, axisPath, graphPlotLabel, highlight];
});

it('accepts highlight semantics with renderer-specific fields and keeps coordinates out of tables and graphs', () => {
  const line: LineConfig = {
    data: [{ time: 1, value: 20, group: 'North' }],
    annotations: [
      { type: 'maxY', label: 'Peak', data: { group: 'North' } },
      { type: 'minX' },
      { type: 'first' },
      { type: 'last' },
      { type: 'topN', n: 3 },
      { type: 'bottomN', n: 1 },
      { type: 'thresholdHighlight', threshold: 80, direction: 'above' },
      { type: 'rangeOutside', range: [20, 80] },
      { type: 'peak' },
      { type: 'valley', data: { time: 1 } },
      { type: 'outlier', factor: 1.5, data: { group: 'North' } },
      { type: 'group', data: { group: 'North' } },
      // @ts-expect-error Group selects complete series, not individual observations.
      { type: 'group', data: { group: 'North', time: 1 } },
      { type: 'contribution', data: { time: 1 } },
    ],
  };
  const table: TableConfig = {
    data: [{ product: 'Pro', revenue: 240 }],
    annotations: [
      { type: 'topN', n: 3, data: { field: 'revenue', column: 'revenue' } },
      { type: 'thresholdHighlight', threshold: 200, data: { field: 'revenue' } },
      { type: 'outlier', factor: 3, data: { field: 'revenue', column: 'revenue' } },
      // @ts-expect-error Automatic table outliers require the calculation field.
      { type: 'outlier', data: { row: { product: 'Pro' } } },
      { type: 'highlight', data: { row: { product: 'Pro' } } },
      // @ts-expect-error Tables select multiple targets with highlight, not series group annotations.
      { type: 'group', data: { row: { product: 'Pro' } } },
      { type: 'contribution', data: { row: { product: 'Pro' }, field: 'revenue' } },
      // @ts-expect-error Table ranking requires an explicit calculation field.
      { type: 'topN', n: 3 },
    ],
  };
  const graph: NetworkGraphConfig = {
    data: { nodes: [{ name: 'A' }, { name: 'B' }], edges: [{ source: 'A', target: 'B' }] },
    annotations: [
      // @ts-expect-error Graph selections use highlight, not statistical group annotations.
      { type: 'group', data: { name: 'A' } },
      { type: 'highlight', data: [{ name: 'A' }, { source: 'A', target: 'B' }] },
      // @ts-expect-error Relationship was a redundant alias of highlight.
      { type: 'relationship', data: { name: 'A' } },
      // @ts-expect-error Graphs have no mapped numeric y field.
      { type: 'maxY' },
    ],
  };
  const pie: PieConfig = {
    data: [{ category: 'Pro', value: 240 }],
    annotations: [
      { type: 'highlight', data: [{ category: 'Pro' }] },
      // @ts-expect-error Pie slices are targets, not statistical series groups.
      { type: 'group', data: { category: 'Pro' } },
    ],
  };
  type Row = { product: string; revenue: number };
  // @ts-expect-error Calculations require an original field name.
  const typo: RendererAnnotation<Row, 'table'> = { type: 'topN', n: 1, data: { field: 'reveneu' } };
  expectTypeOf(line).toMatchTypeOf<LineConfig>();
  expectTypeOf(table).toMatchTypeOf<TableConfig>();
  expectTypeOf(graph).toMatchTypeOf<NetworkGraphConfig>();
  expectTypeOf<RendererAnnotation<{ name: string }, 'g6'>>().toMatchTypeOf<
    Annotation<{ name: string }>
  >();
  void [typo, pie];
});

it('derives chart capabilities from registration while preserving renderer-specific data', () => {
  type Item<C extends { annotations?: unknown[] }> = NonNullable<C['annotations']>[number];
  const linePeak: Item<LineConfig> = { type: 'peak' };
  const areaValley: Item<AreaConfig> = { type: 'valley' };
  expectTypeOf<Extract<Item<ColumnConfig>, { type: 'peak' | 'valley' }>>().toBeNever();
  expectTypeOf<Extract<Item<BarConfig>, { type: 'peak' | 'valley' }>>().toBeNever();
  expectTypeOf<Extract<Item<ScatterConfig>, { type: 'peak' | 'valley' }>>().toBeNever();
  expectTypeOf<Extract<Item<PieConfig>, { type: 'group' | 'maxY' | 'point' }>>().toBeNever();
  expectTypeOf<RendererAnnotation<{ value: number }, 'g2', 'radar'>>().toBeNever();

  const rankedPie: Item<PieConfig> = { type: 'topN', n: 2, data: { category: 'A' } };
  const rankedTable: RendererAnnotation<{ value: number }, 'table', 'table'> = {
    type: 'topN',
    n: 2,
    data: { field: 'value' },
  };
  // @ts-expect-error Pie charts use source selectors, not table mappings.
  const tableMappingOnPie: Item<PieConfig> = { type: 'topN', n: 2, data: { field: 'value' } };
  void [linePeak, areaValley, rankedPie, rankedTable, tableMappingOnPie];
});

it('keeps analysis rules outside data and removes implementation and external-result options', () => {
  type Row = { category: string; value: number };
  type Rank = Extract<Annotation<Row>, { type: 'topN' }>;
  type Threshold = Extract<Annotation<Row>, { type: 'thresholdHighlight' }>;
  type Contribution = Extract<Annotation<Row>, { type: 'contribution' }>;
  const rank: Rank = { type: 'topN', n: 3, data: { category: 'A' } };
  const threshold: Threshold = { type: 'thresholdHighlight', threshold: 80, direction: 'above' };
  const outlier: Annotation<Row> = { type: 'outlier', factor: 3 };
  const contribution: Contribution = {
    type: 'contribution',
    data: [{ category: 'A' }, { category: 'B' }],
  };
  // @ts-expect-error Ranking count is required on the annotation, not in data.
  const nestedRank: Rank = { type: 'topN', data: { n: 3 } };
  // @ts-expect-error Threshold uses an explicit semantic name.
  const vagueThreshold: Threshold = { type: 'thresholdHighlight', value: 80 };
  const translucentThreshold: Threshold = {
    type: 'thresholdHighlight',
    threshold: 80,
    // @ts-expect-error Threshold emphasis retains the chart's native fill opacity.
    style: { fillOpacity: 0.1 },
  };
  const dimmedThreshold: Threshold = {
    type: 'thresholdHighlight',
    threshold: 80,
    // @ts-expect-error Threshold annotations do not configure dimming.
    style: { dimOpacity: 0.1 },
  };
  // @ts-expect-error Contribution computes its own denominator.
  const suppliedTotal: Contribution = { type: 'contribution', data: { category: 'A' }, total: 100 };
  // @ts-expect-error Contribution computes its own fraction.
  const suppliedShare: Contribution = { type: 'contribution', data: { category: 'A' }, share: 0.4 };
  const line: LineConfig = {
    data: [],
    annotations: [
      // @ts-expect-error Statistical charts use their existing mapping, not a table field descriptor.
      { type: 'topN', n: 3, data: { field: 'value' } },
    ],
  };
  expectTypeOf<keyof Rank>().toEqualTypeOf<'type' | 'data' | 'n' | 'label' | 'style'>();
  void [
    rank,
    threshold,
    outlier,
    contribution,
    nestedRank,
    vagueThreshold,
    translucentThreshold,
    dimmedThreshold,
    suppliedTotal,
    suppliedShare,
    line,
  ];
});

it('derives unified and renderer configurations from the same data contracts', () => {
  type Row = { category: string; value: number };
  expectTypeOf<RendererAnnotation<Row, 'g2'>>().toMatchTypeOf<Annotation<Row>>();
  expectTypeOf<RendererAnnotation<Row, 'g6'>>().toMatchTypeOf<Annotation<Row>>();
  expectTypeOf<RendererAnnotation<Row, 'table'>>().toMatchTypeOf<Annotation<Row>>();
  expectTypeOf<RendererAnnotation<Row, 'summary'>>().toMatchTypeOf<Annotation<Row>>();

  const chartContribution: RendererAnnotation<Row, 'g2'> = {
    type: 'contribution',
    data: { category: 'A' },
  };
  const tableContribution: RendererAnnotation<Row, 'table'> = {
    type: 'contribution',
    data: { field: 'value', row: [{ category: 'A' }], column: 'value' },
  };
  // @ts-expect-error A contribution needs selected rows as its numerator.
  const missingContributionRows: RendererAnnotation<Row, 'table'> = {
    type: 'contribution',
    data: { field: 'value' },
  };
  const mixedTargets: Annotation<Row> = {
    type: 'highlight',
    // @ts-expect-error A highlight cannot mix targets from different renderers.
    data: [{ row: { category: 'A' } }, { text: 'Revenue' }],
  };
  void [chartContribution, tableContribution, missingContributionRows, mixedTargets];
});

it('restricts automatic peak and valley annotations to line and area charts', () => {
  const scatter: ScatterConfig = {
    data: [],
    annotations: [
      // @ts-expect-error A point cloud has no sequence neighbours.
      { type: 'peak' },
    ],
  };
  const column: ColumnConfig = {
    data: [],
    annotations: [
      // @ts-expect-error Unordered categories do not define a signal.
      { type: 'valley' },
    ],
  };
  const bar: BarConfig = {
    data: [],
    annotations: [
      // @ts-expect-error Automatic local extrema require a trend chart.
      { type: 'peak' },
    ],
  };
  const line: LineConfig = {
    data: [],
    annotations: [{ type: 'peak', minProminence: 5, minDistance: 3 }],
  };
  void [scatter, column, bar, line];
});

it('accepts original scatter weight fields and checks explicitly supplied row types', () => {
  type Row = { x: number; y: number; population: number };
  const scatter: ScatterConfig<Row> = {
    data: [{ x: 2, y: 4, population: 10 }],
    annotations: [{ type: 'centroid', weight: 'population' }],
  };
  const weighted: ScatterConfig<{ x: number; y: number; weight: number }> = {
    data: [{ x: 2, y: 4, weight: 10 }],
    annotations: [{ type: 'centroid', weight: 'weight' }],
  };
  const invalid: ScatterConfig<Row> = {
    data: scatter.data,
    // @ts-expect-error Explicit row types restrict weights to original fields.
    annotations: [{ type: 'centroid', weight: 'populaton' }],
  };
  void [scatter, weighted, invalid];
});
