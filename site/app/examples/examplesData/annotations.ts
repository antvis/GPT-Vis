import type { Annotation } from '../../../../src';

const cartesian = ['line', 'area', 'column', 'bar', 'scatter'] as const;
export type AnnotationChart = (typeof cartesian)[number] | 'pie' | 'table';

export type AnalysisExample = {
  type: Annotation['type'];
  description: string;
  charts: readonly AnnotationChart[];
  options: Record<string, unknown>;
};

/** One shared taxonomy for the homepage, gallery, and chart guides. */
export const annotationGroups = [
  {
    id: 'observations',
    tone: { accent: '#7556a8', rgb: '117, 86, 168', paper: '#f0eaf7', fold: '#ded1ee' },
    name: 'Extremes & observations',
    description: 'Find the highs, lows, and turning points in your data.',
    headline: ['Spot the high.', 'Catch the low.'],
    preview: 'maxY',
    chart: 'line',
    types: ['maxX', 'minX', 'maxY', 'minY', 'first', 'last', 'peak', 'valley'],
  },
  {
    id: 'ranking',
    tone: { accent: '#507d70', rgb: '80, 125, 112', paper: '#eaf1e9', fold: '#d1dfd2' },
    name: 'Ranking & contribution',
    description: 'Show who leads, what stands out, and how much it contributes.',
    headline: ['See what leads.', 'Know its share.'],
    preview: 'topN',
    chart: 'column',
    types: ['topN', 'bottomN', 'group', 'contribution'],
  },
  {
    id: 'statistics',
    tone: { accent: '#926b34', rgb: '146, 107, 52', paper: '#f5efdf', fold: '#e6d9bb' },
    name: 'Statistical references',
    description: 'Give every value context with averages, quantiles, and outliers.',
    headline: ['Beyond a number.', 'A frame of reference.'],
    preview: 'mean',
    chart: 'line',
    types: ['mean', 'median', 'quantile', 'outlier', 'centroid'],
  },
  {
    id: 'thresholds',
    tone: { accent: '#a66550', rgb: '166, 101, 80', paper: '#f5e9e1', fold: '#e8cfc0' },
    name: 'Thresholds & targets',
    description: 'Put targets on the chart and bring the exceptions into focus.',
    headline: ['Set the target.', 'See the exceptions.'],
    preview: 'thresholdHighlight',
    chart: 'area',
    types: ['thresholdX', 'thresholdY', 'target', 'thresholdHighlight'],
  },
  {
    id: 'regions',
    tone: { accent: '#527f99', rgb: '82, 127, 153', paper: '#e8eff3', fold: '#cedde7' },
    name: 'Ranges & regions',
    description: 'Make meaningful intervals and decision regions visible.',
    headline: ['Draw the bounds.', 'Find your focus.'],
    preview: 'rangeInside',
    chart: 'column',
    types: ['rangeX', 'rangeY', 'rangeInside', 'rangeOutside', 'quadrant'],
  },
  {
    id: 'events',
    tone: { accent: '#99647f', rgb: '153, 100, 127', paper: '#f3e7ec', fold: '#e4cad7' },
    name: 'Events & crossings',
    description: 'Mark the moment something happens or a trend crosses a boundary.',
    headline: ['Mark the moment.', 'Follow the crossing.'],
    preview: 'crossing',
    chart: 'line',
    types: ['event', 'crossing'],
  },
] as const satisfies readonly {
  id: string;
  name: string;
  description: string;
  headline: readonly [string, string];
  tone: { accent: string; rgb: string; paper: string; fold: string };
  preview: Annotation['type'];
  chart: AnnotationChart;
  types: readonly Annotation['type'][];
}[];

export const annotationsData = {
  id: 'annotations',
  examples: [
    {
      type: 'maxX',
      description: 'Select every observation at the largest numeric X value.',
      charts: cartesian,
      options: {},
    },
    {
      type: 'minX',
      description: 'Select every observation at the smallest numeric X value.',
      charts: cartesian,
      options: {},
    },
    {
      type: 'maxY',
      description: 'Select every observation at the largest value.',
      charts: cartesian,
      options: {},
    },
    {
      type: 'minY',
      description: 'Select every observation at the smallest value.',
      charts: cartesian,
      options: {},
    },
    {
      type: 'first',
      description: 'Select the first observation in input order, without sorting by X.',
      charts: cartesian,
      options: {},
    },
    {
      type: 'last',
      description: 'Select the last observation in input order, without sorting by X.',
      charts: cartesian,
      options: {},
    },
    {
      type: 'peak',
      description:
        'Detect local peaks within each ordered series, using prominence and observation spacing.',
      charts: ['line', 'area'],
      options: { minProminence: 10, minDistance: 2 },
    },
    {
      type: 'valley',
      description:
        'Detect local valleys within each ordered series, using prominence and observation spacing.',
      charts: ['line', 'area'],
      options: { minProminence: 10, minDistance: 2 },
    },
    {
      type: 'topN',
      description: 'Rank candidates by value and label each selected item with its rank.',
      charts: [...cartesian, 'pie', 'table'],
      options: { n: 2 },
    },
    {
      type: 'bottomN',
      description: 'Rank candidates from smallest to largest, preserving input order for ties.',
      charts: [...cartesian, 'pie', 'table'],
      options: { n: 2 },
    },
    {
      type: 'thresholdHighlight',
      description: 'Draw a threshold reference and recolor the portion above or below it.',
      charts: [...cartesian, 'table'],
      options: { threshold: 55 },
    },
    {
      type: 'rangeInside',
      description: 'Show a reference band and emphasize observations within the inclusive bounds.',
      charts: [...cartesian, 'table'],
      options: { range: [30, 60] },
    },
    {
      type: 'rangeOutside',
      description: 'Show a reference band and emphasize observations strictly outside the bounds.',
      charts: [...cartesian, 'table'],
      options: { range: [30, 60] },
    },
    {
      type: 'outlier',
      description: 'Detect value outliers with IQR fences; scatter detection uses Y only.',
      charts: [...cartesian, 'table'],
      options: { factor: 1.5 },
    },
    {
      type: 'group',
      description:
        'Emphasize a complete named series; columns and bars use grouped or stacked data.',
      charts: cartesian,
      options: { data: { group: 'Actual' } },
    },
    {
      type: 'contribution',
      description: 'Sum selected values and divide by the total of all input values.',
      charts: [...cartesian, 'pie', 'table'],
      options: {},
    },
    {
      type: 'mean',
      description: 'Compute an arithmetic mean and draw a dashed axis reference.',
      charts: cartesian,
      options: {},
    },
    {
      type: 'median',
      description: 'Compute the median of finite values and draw a dashed axis reference.',
      charts: cartesian,
      options: {},
    },
    {
      type: 'quantile',
      description: 'Compute a quantile using R-7 interpolation; p is between 0 and 1.',
      charts: cartesian,
      options: { p: 0.9 },
    },
    {
      type: 'thresholdX',
      description: 'Draw a reference at a logical X value; bars transpose this axis on screen.',
      charts: cartesian,
      options: { threshold: 4 },
    },
    {
      type: 'thresholdY',
      description: 'Draw a reference at a logical Y value without recoloring observations.',
      charts: cartesian,
      options: { threshold: 55 },
    },
    {
      type: 'target',
      description: 'Draw a fixed target or an ordered path of complete baseline coordinates.',
      charts: cartesian,
      options: { target: 65 },
    },
    {
      type: 'event',
      description: 'Mark one or more event positions with an axis line and a label.',
      charts: ['line', 'area', 'column', 'bar'],
      options: {},
    },
    {
      type: 'rangeX',
      description: 'Shade a logical X interval; the other axis spans the plot.',
      charts: cartesian,
      options: { range: [2, 5] },
    },
    {
      type: 'rangeY',
      description: 'Shade a logical Y interval; the other axis spans the plot.',
      charts: cartesian,
      options: { range: [30, 60] },
    },
    {
      type: 'quadrant',
      description: 'Divide a numeric scatter plot into four named decision regions.',
      charts: ['scatter'],
      options: { data: { x: 4.5, y: 55 } },
    },
    {
      type: 'centroid',
      description:
        'Compute a scatter center; the cross marks a calculated position rather than an observed point.',
      charts: ['scatter'],
      options: {},
    },
    {
      type: 'crossing',
      description:
        'Find upward and downward threshold crossings, or intersections of two unstacked series.',
      charts: ['line', 'area'],
      options: { threshold: 55 },
    },
  ] satisfies AnalysisExample[],
};

export type AnalysisType = (typeof annotationsData.examples)[number]['type'];

export const annotationHref = (type: AnalysisType) => `/examples/annotations/${type}`;

export function annotationGroup(type: AnalysisType) {
  return annotationGroups.find((group) => (group.types as readonly string[]).includes(type))!;
}

export function annotationPreviewChart(example: AnalysisExample): AnnotationChart {
  switch (example.type) {
    case 'maxX':
    case 'minX':
      return 'scatter';
    case 'topN':
      return 'column';
    case 'bottomN':
      return 'bar';
    case 'group':
      return 'column';
    case 'contribution':
      return 'pie';
    default:
      return example.charts[0];
  }
}

const values = [24, 58, 31, 76, 29, 54, 36, 140];

export type AnnotationVariant = {
  variant: string;
  title: string;
  chart?: AnnotationChart;
  options?: Record<string, unknown>;
};

const selectedObservations = [{ variant: 'selected', title: 'Analyze selected observations' }];
const parameterVariants: Record<AnalysisType, AnnotationVariant[]> = {
  maxX: selectedObservations,
  minX: selectedObservations,
  maxY: selectedObservations,
  minY: selectedObservations,
  first: selectedObservations,
  last: selectedObservations,
  peak: [
    {
      variant: 'prominent',
      title: 'Stricter prominence and spacing',
      options: { minProminence: 30, minDistance: 3 },
    },
  ],
  valley: [
    {
      variant: 'prominent',
      title: 'Stricter prominence and spacing',
      options: { minProminence: 30, minDistance: 3 },
    },
  ],
  topN: [{ variant: 'four', title: 'Select four ranked observations', options: { n: 4 } }],
  bottomN: [{ variant: 'four', title: 'Select four ranked observations', options: { n: 4 } }],
  thresholdHighlight: [
    { variant: 'below', title: 'Below threshold', options: { direction: 'below' } },
    {
      variant: 'inclusive',
      title: 'Include the threshold value',
      options: { threshold: 58, inclusive: true },
    },
  ],
  rangeInside: [
    { variant: 'narrow', title: 'Narrower value interval', options: { range: [40, 55] } },
  ],
  rangeOutside: [
    { variant: 'narrow', title: 'Narrower value interval', options: { range: [40, 55] } },
  ],
  outlier: [{ variant: 'factor', title: 'Wider IQR fences', options: { factor: 3 } }],
  group: [{ variant: 'stacked', title: 'Highlight a stacked series' }],
  contribution: [{ variant: 'single', title: 'Contribution of one observation' }],
  mean: [
    {
      variant: 'x-axis',
      title: 'Reference on the numeric X axis',
      chart: 'scatter',
      options: { axis: 'x' },
    },
  ],
  median: [
    {
      variant: 'x-axis',
      title: 'Reference on the numeric X axis',
      chart: 'scatter',
      options: { axis: 'x' },
    },
  ],
  quantile: [{ variant: 'lower', title: 'Lower quartile', options: { p: 0.25 } }],
  thresholdX: [{ variant: 'position', title: 'Move the X reference' }],
  thresholdY: [{ variant: 'higher', title: 'Higher Y threshold', options: { threshold: 90 } }],
  target: [{ variant: 'path', title: 'Changing target baseline' }],
  event: [{ variant: 'multiple', title: 'Multiple event positions' }],
  rangeX: [{ variant: 'wide', title: 'Wider X interval' }],
  rangeY: [{ variant: 'wide', title: 'Wider Y interval', options: { range: [20, 90] } }],
  quadrant: [
    {
      variant: 'labels',
      title: 'Named decision regions',
      options: {
        labels: {
          topRight: 'Scale up',
          topLeft: 'Investigate',
          bottomLeft: 'Monitor',
          bottomRight: 'Optimize',
        },
      },
    },
  ],
  centroid: [{ variant: 'weighted', title: 'Weighted center' }],
  crossing: [
    { variant: 'series', title: 'Two-series intersections' },
    { variant: 'up', title: 'Upward crossings only', options: { direction: 'up' } },
    { variant: 'down', title: 'Downward crossings only', options: { direction: 'down' } },
  ],
};

export function annotationVariants(example: AnalysisExample): AnnotationVariant[] {
  return [
    {
      variant: 'default',
      title: example.type === 'centroid' ? 'Arithmetic center' : 'Default configuration',
    },
    ...parameterVariants[example.type as AnalysisType],
  ];
}

/** Keep examples in the public data shapes; annotations use those same original fields. */
export function annotationExample(
  example: AnalysisExample,
  chart: AnnotationChart,
  variant = 'default',
): Record<string, unknown> {
  const xField =
    chart === 'scatter' ? 'x' : chart === 'line' || chart === 'area' ? 'time' : 'category';
  const yField = chart === 'scatter' ? 'y' : 'value';
  const xValue = (index: number) =>
    xField === 'category' ? String.fromCharCode(65 + index) : index + 1;
  let data: Record<string, unknown>[] = values.map((value, index) => ({
    [xField]: xValue(index),
    [yField]: value,
  }));
  const annotation: Record<string, unknown> = { type: example.type, ...example.options };
  const options: Record<string, unknown> = {};

  if (
    example.type === 'maxX' ||
    example.type === 'minX' ||
    example.type === 'first' ||
    example.type === 'last'
  ) {
    // Differentiate coordinate extrema from input order without sorting a trend series.
    if (chart === 'scatter')
      data = [data[3], data[0], data[7], ...data.slice(1, 3), ...data.slice(4, 7)];
    if (xField === 'category' && (example.type === 'maxX' || example.type === 'minX')) {
      data = data.map((row, index) => ({
        ...row,
        category: `2026-01-${String(index + 1).padStart(2, '0')}`,
      }));
    }
  }
  if (example.type === 'group') {
    data = data.flatMap((row) => [
      { ...row, group: 'Actual' },
      { ...row, [yField]: Number((Number(row[yField]) * 0.6 + 10).toFixed(1)), group: 'Budget' },
    ]);
    if (chart === 'column' || chart === 'bar') options.group = true;
    if (variant === 'stacked' && (chart === 'column' || chart === 'bar')) {
      delete options.group;
      options.stack = true;
    }
  }
  if (example.type === 'event') annotation.data = { [xField]: xValue(3) };
  if (example.type === 'event' && variant === 'multiple')
    annotation.data = [{ [xField]: xValue(1) }, { [xField]: xValue(5) }];
  if (example.type === 'contribution')
    annotation.data = [{ [xField]: xValue(3) }, { [xField]: xValue(7) }];
  if (example.type === 'contribution' && variant === 'single')
    annotation.data = { [xField]: xValue(3) };
  if (example.type === 'thresholdX') annotation.threshold = xValue(3);
  if (example.type === 'rangeX') annotation.range = [xValue(1), xValue(4)];
  if (example.type === 'rangeX' && variant === 'wide') annotation.range = [xValue(0), xValue(6)];
  if (example.type === 'thresholdX' && variant === 'position') annotation.threshold = xValue(1);
  if (example.type === 'target' && variant === 'path') {
    delete annotation.target;
    annotation.data = [35, 42, 50, 46, 60, 65, 72, 80].map((value, index) => ({
      [xField]: xValue(index),
      [yField]: value,
    }));
  }
  if (variant === 'selected') {
    annotation.data = data.slice(1, 5).map((row) => ({ [xField]: row[xField] }));
  }
  if (example.type === 'thresholdHighlight')
    annotation.direction = variant === 'below' ? 'below' : 'above';
  if (example.type === 'centroid' && variant === 'weighted') {
    data = data.map((row, index) => ({ ...row, weight: index + 1 }));
    annotation.weight = 'weight';
  }
  if (example.type === 'crossing') {
    data = [25, 45, 75, 65, 35, 20].map((value, index) => ({
      [xField]: index + 1,
      [yField]: value,
    }));
    annotation.direction = 'both';
    if (variant === 'series') {
      data = data.flatMap((row) => [
        { ...row, group: 'Actual' },
        { ...row, [yField]: 55, group: 'Budget' },
      ]);
      delete annotation.threshold;
      annotation.data = { series: [{ group: 'Actual' }, { group: 'Budget' }] };
    }
  }
  if (chart === 'table') {
    annotation.data = {
      field: 'value',
      column: 'value',
      ...(example.type === 'contribution' ? { row: [{ category: 'D' }, { category: 'H' }] } : {}),
    };
  }
  Object.assign(
    annotation,
    parameterVariants[example.type as AnalysisType].find((item) => item.variant === variant)
      ?.options,
  );
  return { type: chart, data, ...options, annotations: [annotation] };
}
