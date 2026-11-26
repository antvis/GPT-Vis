import type { ExampleOption } from '../components/ExampleGuide';
import type { AnalysisType } from './annotations';

export const commonAnnotationOptions = [
  {
    property: 'label',
    valueType: 'string',
    typeHref: '/docs/reference/annotation-options#label',
    type: 'optional',
    description: 'Override the computed label; use an empty string to hide it.',
  },
  {
    property: 'style',
    valueType: 'AnnotationStyle',
    typeHref: '/docs/reference/annotation-options#annotation-style',
    type: 'optional',
    description:
      'Reuse the shared style definition with the fields supported by this annotation type.',
  },
] satisfies readonly ExampleOption[];

export function getAnnotationOptions(type: AnalysisType): readonly ExampleOption[] {
  return commonAnnotationOptions.map((option) =>
    option.property === 'style' ? { ...option, valueType: `AnnotationStyle<'${type}'>` } : option,
  );
}

export const annotationGuides = {
  maxX: {
    useCases: [
      'Identify the boundary observations on a numeric or time axis.',
      'Compare endpoints without relying on input order.',
    ],
    notes: [
      'X must be numeric or an ISO date; arbitrary category labels are not ordered numerically.',
      'All observations tied at the extreme are selected.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
    ],
  },
  minX: {
    useCases: [
      'Identify the boundary observations on a numeric or time axis.',
      'Compare endpoints without relying on input order.',
    ],
    notes: [
      'X must be numeric or an ISO date; arbitrary category labels are not ordered numerically.',
      'All observations tied at the extreme are selected.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
    ],
  },
  maxY: {
    useCases: [
      'Call attention to the highest or lowest measured value.',
      'Keep tied extremes visible in a comparison.',
    ],
    notes: [
      'All observations tied at the extreme are selected; filters use the original data fields.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
    ],
  },
  minY: {
    useCases: [
      'Call attention to the highest or lowest measured value.',
      'Keep tied extremes visible in a comparison.',
    ],
    notes: [
      'All observations tied at the extreme are selected; filters use the original data fields.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
    ],
  },
  first: {
    useCases: [
      'Mark the start or end of the input sequence.',
      'Explain the first or last observation after selection.',
    ],
    notes: [
      'Uses filtered input order, without sorting by X. Across multiple series, selection is overall rather than per series.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
    ],
  },
  last: {
    useCases: [
      'Mark the start or end of the input sequence.',
      'Explain the first or last observation after selection.',
    ],
    notes: [
      'Uses filtered input order, without sorting by X. Across multiple series, selection is overall rather than per series.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
    ],
  },
  peak: {
    useCases: [
      'Find local turning points in an ordered trend.',
      'Suppress small fluctuations with prominence and spacing.',
    ],
    notes: [
      'Available on ordered line and area series. Missing observations break the sequence; endpoints are excluded.',
      'minDistance counts observations within each series, rather than pixels or elapsed time.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
      {
        property: 'minProminence',
        valueType: 'number',
        type: 'optional',
        description: 'Minimum prominence in original value units.',
        defaultValue: '0',
      },
      {
        property: 'minDistance',
        valueType: 'number',
        type: 'optional',
        description: 'Minimum spacing in observations within each series.',
        defaultValue: '1',
      },
    ],
  },
  valley: {
    useCases: [
      'Find local turning points in an ordered trend.',
      'Suppress small fluctuations with prominence and spacing.',
    ],
    notes: [
      'Available on ordered line and area series. Missing observations break the sequence; endpoints are excluded.',
      'minDistance counts observations within each series, rather than pixels or elapsed time.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
      {
        property: 'minProminence',
        valueType: 'number',
        type: 'optional',
        description: 'Minimum prominence in original value units.',
        defaultValue: '0',
      },
      {
        property: 'minDistance',
        valueType: 'number',
        type: 'optional',
        description: 'Minimum spacing in observations within each series.',
        defaultValue: '1',
      },
    ],
  },
  topN: {
    useCases: [
      'Highlight the leaders or the lowest values.',
      'Add ranks to a short list of observations.',
    ],
    notes: [
      'Ties retain input order. Selection returns at most n observations, rather than expanding tied ranks.',
      'Tables require data.field for calculation; data.row limits candidates and data.column selects the emphasized column.',
    ],
    options: [
      {
        property: 'n',
        valueType: 'number',
        type: 'required',
        description: 'Positive integer; selects at most n observations.',
      },
      {
        property: 'data',
        valueType: 'Selection | TableMapping',
        type: 'optional',
        description:
          'Charts optionally select candidates; tables require an explicit calculation field.',
      },
    ],
  },
  bottomN: {
    useCases: [
      'Highlight the leaders or the lowest values.',
      'Add ranks to a short list of observations.',
    ],
    notes: [
      'Ties retain input order. Selection returns at most n observations, rather than expanding tied ranks.',
      'Tables require data.field for calculation; data.row limits candidates and data.column selects the emphasized column.',
    ],
    options: [
      {
        property: 'n',
        valueType: 'number',
        type: 'required',
        description: 'Positive integer; selects at most n observations.',
      },
      {
        property: 'data',
        valueType: 'Selection | TableMapping',
        type: 'optional',
        description:
          'Charts optionally select candidates; tables require an explicit calculation field.',
      },
    ],
  },
  group: {
    useCases: [
      'Emphasize one named series in a comparison.',
      'Keep a complete series visible against the other groups.',
    ],
    notes: ['Select complete named series. Bars and columns must use grouped or stacked data.'],
    options: [
      {
        property: 'data',
        valueType: '{ group: string } | { group: string }[]',
        type: 'required',
        description: 'Names of the complete series to emphasize.',
      },
    ],
  },
  contribution: {
    useCases: [
      'Explain the share of selected additive values.',
      'Compare a selected subset with the complete input total.',
    ],
    notes: [
      'Requires nonnegative additive values. Share equals the selected sum divided by all input values; a zero total produces no annotation.',
      'Supply a selection, rather than a precomputed total or share.',
      'Tables require data.field for calculation; data.row limits candidates and data.column selects the emphasized column.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection | TableMapping',
        type: 'required',
        description: 'Select observations to sum; tables also require field.',
      },
    ],
  },
  mean: {
    useCases: [
      'Put individual measurements in statistical context.',
      'Compare observations with a central reference.',
    ],
    notes: [
      'Calculations use finite values on the logical axis. Bars transpose that axis on screen.',
    ],
    options: [
      {
        property: 'axis',
        valueType: "'x' | 'y'",
        type: 'optional',
        description: 'Logical data axis, independent of chart transposition.',
        defaultValue: "'y'",
      },
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
    ],
  },
  median: {
    useCases: [
      'Put individual measurements in statistical context.',
      'Compare observations with a central reference.',
    ],
    notes: [
      'Calculations use finite values on the logical axis. Bars transpose that axis on screen.',
    ],
    options: [
      {
        property: 'axis',
        valueType: "'x' | 'y'",
        type: 'optional',
        description: 'Logical data axis, independent of chart transposition.',
        defaultValue: "'y'",
      },
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
    ],
  },
  quantile: {
    useCases: [
      'Show a percentile reference on the chart.',
      'Compare observations with a distribution cutoff.',
    ],
    notes: ['Uses R-7 linear interpolation over finite values; p must be between 0 and 1.'],
    options: [
      {
        property: 'p',
        valueType: 'number',
        type: 'required',
        description: 'Quantile probability in the inclusive interval [0, 1].',
      },
      {
        property: 'axis',
        valueType: "'x' | 'y'",
        type: 'optional',
        description: 'Logical data axis, independent of chart transposition.',
        defaultValue: "'y'",
      },
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
    ],
  },
  outlier: {
    useCases: ['Spot unusually high or low values.', 'Use IQR fences as an explicit outlier rule.'],
    notes: [
      'Each series needs at least four finite values. Scatter detection uses Y only.',
      'factor must be positive and finite; the default fence multiplier is 1.5.',
      'Tables require data.field for calculation; data.row limits candidates and data.column selects the emphasized column.',
    ],
    options: [
      {
        property: 'factor',
        valueType: 'number',
        type: 'optional',
        description: 'Positive IQR fence multiplier.',
        defaultValue: '1.5',
      },
      {
        property: 'data',
        valueType: 'Selection | TableMapping',
        type: 'optional',
        description: 'Charts optionally select candidates; tables require field.',
      },
    ],
  },
  centroid: {
    useCases: [
      'Show the calculated center of a scatter distribution.',
      'Use a weight field when observations have different importance.',
    ],
    notes: [
      'Scatter only. The cross marks a calculated coordinate, which may not be an observed point.',
      'Weights must be finite and nonnegative, with a positive total. Omit weight for the arithmetic center.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'optional',
        description:
          'Limit calculations to matching original observations; omit to use all input data.',
      },
      {
        property: 'weight',
        valueType: 'keyof T & string',
        type: 'optional',
        description: 'Original data field containing observation weights.',
      },
      {
        property: 'pulse',
        valueType: 'boolean',
        type: 'optional',
        description: 'Animate the marker halo; respects reduced-motion preferences.',
        defaultValue: 'false',
      },
    ],
  },
  thresholdX: {
    useCases: [
      'Mark a meaningful position along the logical X axis.',
      'Provide a fixed reference without selecting observations.',
    ],
    notes: [
      'Accepts a numeric value or an axis category/date string. Bars transpose logical X on screen.',
    ],
    options: [
      {
        property: 'threshold',
        valueType: 'string | number',
        type: 'required',
        description: 'Reference position on the logical X axis.',
      },
    ],
  },
  thresholdY: {
    useCases: [
      'Show a fixed numeric benchmark.',
      'Keep a reference visible without recoloring data.',
    ],
    notes: [
      'Uses a finite logical Y value. To emphasize threshold exceptions, use thresholdHighlight.',
    ],
    options: [
      {
        property: 'threshold',
        valueType: 'number',
        type: 'required',
        description: 'Finite numeric reference value.',
      },
    ],
  },
  target: {
    useCases: [
      'Compare measurements with a fixed target.',
      'Draw a baseline that changes over the input sequence.',
    ],
    notes: [
      'Use either target or data, never both. A path needs at least two complete axis coordinates in input order.',
    ],
    options: [
      {
        property: 'target',
        valueType: 'number',
        type: 'optional',
        description: 'Fixed finite target; required unless data supplies a baseline path.',
      },
      {
        property: 'axis',
        valueType: "'x' | 'y'",
        type: 'optional',
        description: 'Logical data axis, independent of chart transposition.',
        defaultValue: "'y'",
      },
      {
        property: 'data',
        valueType: 'AnnotationData<T>[]',
        type: 'optional',
        description: 'Ordered baseline coordinates; required when target is omitted.',
      },
    ],
  },
  thresholdHighlight: {
    useCases: [
      'Emphasize measurements above or below a limit.',
      'Show the reference and the exception together.',
    ],
    notes: [
      'Line and area selections must include complete series; partial-series selection is not supported.',
      'Tables require data.field for calculation; data.row limits candidates and data.column selects the emphasized column.',
    ],
    options: [
      {
        property: 'threshold',
        valueType: 'number',
        type: 'required',
        description: 'Finite numeric reference value.',
      },
      {
        property: 'direction',
        valueType: "'above' | 'below'",
        type: 'optional',
        description: 'Choose which side of the threshold to emphasize.',
        defaultValue: "'above'",
      },
      {
        property: 'inclusive',
        valueType: 'boolean',
        type: 'optional',
        description: 'Include observations equal to the threshold.',
        defaultValue: 'false',
      },
      {
        property: 'data',
        valueType: 'Selection | TableMapping',
        type: 'optional',
        description: 'Optional chart selection; tables require a calculation mapping.',
      },
    ],
  },
  rangeX: {
    useCases: [
      'Show a meaningful interval along an axis.',
      'Keep a reference region behind the observations.',
    ],
    notes: ['The unselected axis spans the plot. Numeric bounds must be finite and ordered.'],
    options: [
      {
        property: 'range',
        valueType: '[number, number] | [string, string]',
        type: 'required',
        description: 'Ordered numeric bounds, or time/category boundaries on the selected axis.',
      },
    ],
  },
  rangeY: {
    useCases: [
      'Show a meaningful interval along an axis.',
      'Keep a reference region behind the observations.',
    ],
    notes: ['The unselected axis spans the plot. Numeric bounds must be finite and ordered.'],
    options: [
      {
        property: 'range',
        valueType: '[number, number] | [string, string]',
        type: 'required',
        description: 'Ordered numeric bounds, or time/category boundaries on the selected axis.',
      },
    ],
  },
  rangeInside: {
    useCases: [
      'Emphasize values within or beyond a reference interval.',
      'Keep the bounds visible while highlighting observations.',
    ],
    notes: [
      'rangeInside includes both endpoints; rangeOutside selects values strictly beyond the bounds. Tables highlight cells without a reference band.',
      'Tables require data.field for calculation; data.row limits candidates and data.column selects the emphasized column.',
    ],
    options: [
      {
        property: 'range',
        valueType: '[number, number]',
        type: 'required',
        description: 'Ordered finite numeric bounds.',
      },
      {
        property: 'data',
        valueType: 'Selection | TableMapping',
        type: 'optional',
        description: 'Optional chart selection; tables require a calculation mapping.',
      },
    ],
  },
  rangeOutside: {
    useCases: [
      'Emphasize values within or beyond a reference interval.',
      'Keep the bounds visible while highlighting observations.',
    ],
    notes: [
      'rangeInside includes both endpoints; rangeOutside selects values strictly beyond the bounds. Tables highlight cells without a reference band.',
      'Tables require data.field for calculation; data.row limits candidates and data.column selects the emphasized column.',
    ],
    options: [
      {
        property: 'range',
        valueType: '[number, number]',
        type: 'required',
        description: 'Ordered finite numeric bounds.',
      },
      {
        property: 'data',
        valueType: 'Selection | TableMapping',
        type: 'optional',
        description: 'Optional chart selection; tables require a calculation mapping.',
      },
    ],
  },
  quadrant: {
    useCases: [
      'Divide a scatter plot into four decision regions.',
      'Name regions using your own business vocabulary.',
    ],
    notes: [
      'Scatter only. Supply the divider intersection using both original numeric axis fields.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'AnnotationData<T>',
        type: 'required',
        description: 'Complete numeric divider coordinates using original axis field names.',
      },
      {
        property: 'labels',
        valueType: 'Partial<Record<Quadrant, string>>',
        type: 'optional',
        description: 'Names for topRight, topLeft, bottomLeft, and bottomRight.',
      },
    ],
  },
  event: {
    useCases: [
      'Mark a known launch, incident, or milestone.',
      'Align a supplied event position with a trend.',
    ],
    notes: [
      'Events are supplied by the caller, not detected. Use positions or selectors that identify a unique observation.',
    ],
    options: [
      {
        property: 'data',
        valueType: 'Selection',
        type: 'required',
        description: 'Event positions or unique original-data selectors.',
      },
      {
        property: 'axis',
        valueType: "'x' | 'y'",
        type: 'optional',
        description: 'Logical axis along which event positions are marked.',
        defaultValue: "'x'",
      },
    ],
  },
  crossing: {
    useCases: [
      'Find where a trend crosses a fixed threshold.',
      'Show where two unstacked series intersect.',
    ],
    notes: [
      'Line and area only, with unstacked series. Use either a finite threshold or exactly two source-series selectors.',
      'Missing observations break crossings. Direction compares the first selected series against the second.',
    ],
    options: [
      {
        property: 'threshold',
        valueType: 'number',
        type: 'optional',
        description: 'Fixed finite reference; omit when comparing two series.',
      },
      {
        property: 'data',
        valueType: 'Selection | { series: [AnnotationData<T>, AnnotationData<T>] }',
        type: 'optional',
        description:
          'Optional threshold candidates, or exactly two complete source-series selectors.',
      },
      {
        property: 'direction',
        valueType: "'up' | 'down' | 'both'",
        type: 'optional',
        description: 'Filter upward crossings, downward crossings, or both.',
        defaultValue: "'both'",
      },
      {
        property: 'pulse',
        valueType: 'boolean',
        type: 'optional',
        description: 'Animate the marker halo; respects reduced-motion preferences.',
        defaultValue: 'false',
      },
    ],
  },
} satisfies Record<
  AnalysisType,
  { useCases: readonly string[]; notes: readonly string[]; options: readonly ExampleOption[] }
>;
