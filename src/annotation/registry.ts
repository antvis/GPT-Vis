import type { Annotation, RendererAnnotationOptions } from '../types/annotation';
import type { ChartType } from '../types/theme';
import {
  bottomN,
  connector,
  contribution,
  first,
  group,
  highlight,
  last,
  maxX,
  maxY,
  minX,
  minY,
  outlier,
  path,
  peak,
  point,
  range,
  rangeInside,
  rangeOutside,
  text,
  thresholdHighlight,
  topN,
  valley,
} from './components';
import {
  mergeAnnotations,
  mergeResults,
  type AnnotationEntry,
  type AnnotationGroup,
} from './merge';
import type {
  G2AnnotationContext,
  G6AnnotationContext,
  MarkOptions,
  SummaryContext,
  TableContext,
} from './runtime';

interface AnnotationContexts<T extends object> {
  g2: G2AnnotationContext<T>;
  g6: G6AnnotationContext<T>;
  table: TableContext<T>;
  summary: SummaryContext;
}

type AnnotationRenderer = keyof AnnotationContexts<object>;
type AnnotationType = Annotation['type'];

type ComponentRenderer<K extends AnnotationType> = {
  [R in AnnotationRenderer]: Extract<
    RendererAnnotationOptions<object, R>,
    { type: K }
  > extends never
    ? never
    : R;
}[AnnotationRenderer];

/** Internal renderer constraints keep table mappings out of statistical-chart suggestions. */
export type RendererAnnotation<
  T extends object,
  R extends AnnotationRenderer,
  C extends ChartType | undefined = undefined,
> = [C] extends [undefined]
  ? RendererAnnotationOptions<T, R>
  : Extract<
      RendererAnnotationOptions<T, R>,
      { type: SupportedAnnotationType<Exclude<C, undefined>> }
    >;

type SupportedAnnotationType<C extends ChartType> = {
  [K in AnnotationType]: Extract<C, (typeof components)[K]['charts'][number]> extends never
    ? never
    : K;
}[AnnotationType];

/** Expansion reads source data and defaults; only deferred drawing can change a scene. */
interface AnnotationSources<T extends object> {
  g2: Pick<G2AnnotationContext<T>, 'mapping' | 'defaults' | 'chartType'> &
    Partial<Pick<G2AnnotationContext<T>, 'sourceMarks'>>;
  g6: Pick<G6AnnotationContext<T>, 'chartType' | 'data'>;
  table: Pick<TableContext<T>, 'chartType' | 'data' | 'defaults'>;
  summary: SummaryContext;
}

export interface AnnotationResult {
  marks?: MarkOptions[];
  update?: () => void;
  cleanup?: () => void;
}

export type AnnotationDraw<K extends AnnotationType, R extends AnnotationRenderer> = <
  T extends object,
>(
  annotations: Extract<RendererAnnotation<T, R>, { type: K }>[],
  context: AnnotationContexts<T>[R],
) => AnnotationResult;

/** Components return configurations and/or deferred drawing, never drawing during preparation. */
export type AnnotationComponent<
  K extends AnnotationType,
  R extends AnnotationRenderer = ComponentRenderer<K>,
> = {
  [P in R]: <T extends object>(
    annotations: Extract<RendererAnnotation<T, P>, { type: K }>[],
    context: AnnotationSources<T>[P],
  ) => (RendererAnnotation<T, P> | AnnotationDraw<K, P>)[] | AnnotationDraw<K, P>;
};

type DrawingEntry<T extends object, R extends AnnotationRenderer> = AnnotationEntry<
  RendererAnnotation<T, R>,
  AnnotationContexts<T>[R]
>;

type PreparationEntry<T extends object, R extends AnnotationRenderer> = AnnotationEntry<
  RendererAnnotation<T, R>,
  AnnotationSources<T>[R],
  (RendererAnnotation<T, R> | DrawingEntry<T, R>['draw'])[] | DrawingEntry<T, R>['draw']
>;

const drawingComponents = {
  path,
  range,
  connector,
  point,
  text,
  highlight,
  thresholdHighlight,
};

const cartesianCharts = ['line', 'area', 'column', 'bar', 'scatter'] as const;

/** Registration is the single source for chart support in both types and runtime checks. */
const components = {
  path: {
    component: path as AnnotationComponent<'path', 'g2' | 'g6'>,
    charts: [...cartesianCharts, 'network-graph'],
  },
  range: { component: range as AnnotationComponent<'range', 'g2'>, charts: cartesianCharts },
  connector: {
    component: connector as AnnotationComponent<'connector', 'g2' | 'g6'>,
    charts: [...cartesianCharts, 'network-graph'],
  },
  point: {
    component: point as AnnotationComponent<'point', 'g2' | 'g6'>,
    charts: [...cartesianCharts, 'network-graph'],
  },
  text: {
    component: text as AnnotationComponent<'text', 'g2' | 'g6'>,
    charts: [...cartesianCharts, 'network-graph'],
  },
  highlight: {
    component: highlight as AnnotationComponent<'highlight'>,
    charts: [...cartesianCharts, 'pie', 'network-graph', 'table', 'summary'],
  },
  maxX: { component: maxX, charts: cartesianCharts },
  minX: { component: minX, charts: cartesianCharts },
  maxY: { component: maxY, charts: cartesianCharts },
  minY: { component: minY, charts: cartesianCharts },
  first: { component: first, charts: cartesianCharts },
  last: { component: last, charts: cartesianCharts },
  peak: { component: peak, charts: ['line', 'area'] },
  valley: { component: valley, charts: ['line', 'area'] },
  topN: { component: topN, charts: [...cartesianCharts, 'pie', 'table'] },
  bottomN: { component: bottomN, charts: [...cartesianCharts, 'pie', 'table'] },
  thresholdHighlight: { component: thresholdHighlight, charts: [...cartesianCharts, 'table'] },
  rangeInside: { component: rangeInside, charts: [...cartesianCharts, 'table'] },
  rangeOutside: { component: rangeOutside, charts: [...cartesianCharts, 'table'] },
  outlier: { component: outlier, charts: [...cartesianCharts, 'table'] },
  group: { component: group, charts: cartesianCharts },
  contribution: { component: contribution, charts: [...cartesianCharts, 'pie', 'table'] },
} as const satisfies {
  [K in AnnotationType]: {
    component: AnnotationComponent<K>;
    charts: readonly ChartType[];
  };
};

export function renderAnnotations<T extends object, R extends AnnotationRenderer>(
  renderer: R,
  annotations: RendererAnnotation<T, R>[],
  context: AnnotationContexts<T>[R],
): AnnotationResult {
  const prepared = prepareAnnotations<T, R>(renderer, annotations, context);
  const groups = mergeAnnotations(prepared);
  return drawAnnotations<T, R>(groups, context);
}

/** Expand semantic configurations and prepare deferred drawing without changing the scene. */
export function prepareAnnotations<T extends object, R extends AnnotationRenderer>(
  renderer: R,
  annotations: RendererAnnotation<T, R>[],
  context: AnnotationSources<T>[R],
): DrawingEntry<T, R>[] {
  const expanded = expandAnnotations<T, R>(renderer, annotations, context);
  // Group selections before deriving points; the final merge groups the resulting drawing tasks.
  const groups = mergeAnnotations(expanded);
  return groups.flatMap(({ annotations, draw: prepare }) => {
    const result = prepare(annotations, context);
    return (Array.isArray(result) ? result : [result]).flatMap((prepared): DrawingEntry<T, R>[] =>
      typeof prepared === 'function'
        ? annotations.map((annotation) => ({ annotation, draw: prepared }))
        : prepareAnnotations<T, R>(renderer, [prepared], context),
    );
  });
}

export function drawAnnotations<T extends object, R extends AnnotationRenderer>(
  groups: AnnotationGroup<RendererAnnotation<T, R>, AnnotationContexts<T>[R]>[],
  context: AnnotationContexts<T>[R],
): AnnotationResult {
  return mergeResults(groups.map(({ annotations, draw }) => draw(annotations, context)));
}

/** Semantic sugar expands into native capabilities; their preparation waits for merged selections. */
function expandAnnotations<T extends object, R extends AnnotationRenderer>(
  renderer: R,
  annotations: RendererAnnotation<T, R>[],
  context: AnnotationSources<T>[R],
): PreparationEntry<T, R>[] {
  // Validate the whole batch before expanding any semantic component or changing a scene.
  const entries: PreparationEntry<T, R>[] = annotations.map((annotation) => {
    const registration = Object.hasOwn(components, annotation.type)
      ? components[annotation.type]
      : undefined;
    // The registry preserves the type/renderer pairing; erase it only at this dynamic lookup.
    const prepare = (registration &&
      (registration.component as Partial<AnnotationComponent<AnnotationType>>)[renderer]) as
      PreparationEntry<T, R>['draw'] | undefined;
    if (
      !registration ||
      !prepare ||
      !(registration.charts as readonly ChartType[]).includes(context.chartType)
    )
      throw new Error(`Unsupported ${context.chartType} annotation type: ${annotation.type}.`);
    return { annotation, draw: prepare };
  });
  return entries.flatMap(({ annotation, draw: prepare }) => {
    if (Object.hasOwn(drawingComponents, annotation.type)) return [{ annotation, draw: prepare }];
    const result = prepare([annotation], context);
    if (typeof result === 'function')
      throw new Error('Semantic annotations must return configurations.');
    return result.flatMap((config) => {
      if (typeof config === 'function')
        throw new Error('Semantic annotations must return configurations.');
      return expandAnnotations<T, R>(renderer, [config], context);
    });
  });
}
