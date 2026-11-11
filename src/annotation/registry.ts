import type {
  Annotation,
  GraphAnnotation,
  PrimitiveAnnotation,
  SummaryAnnotation,
  TableAnnotation,
} from '../types/annotation';
import { connector } from './components/connector';
import { highlight } from './components/highlight';
import { path } from './components/path';
import { point } from './components/point';
import { range } from './components/range';
import { text } from './components/text';
import type { G2AnnotationContext, MarkOptions } from './runtime/g2';
import type { G6AnnotationContext } from './runtime/g6';
import type { SummaryContext } from './runtime/summary';
import type { TableContext } from './runtime/table';

/** Each host pairs its accepted configuration with its rendering context. */
interface AnnotationHosts<T extends object> {
  g2: { annotation: PrimitiveAnnotation<T>; context: G2AnnotationContext<T> };
  g6: { annotation: GraphAnnotation<T>; context: G6AnnotationContext<T> };
  table: { annotation: TableAnnotation<T>; context: TableContext<T> };
  summary: { annotation: SummaryAnnotation; context: SummaryContext };
}

type AnnotationHost = keyof AnnotationHosts<object>;
type AnnotationType = Annotation['type'];

/** G2 collects native marks; immediate renderers can return a resource cleanup. */
interface AnnotationResult {
  marks?: MarkOptions[];
  cleanup?: () => void;
}

export type AnnotationComponent<
  K extends AnnotationType,
  H extends AnnotationHost = AnnotationHost,
> = {
  [P in H]: <T extends object>(
    annotations: Extract<AnnotationHosts<T>[P]['annotation'], { type: K }>[],
    context: AnnotationHosts<T>[P]['context'],
  ) => AnnotationResult;
};

/** Every annotation declares its supported hosts in its own component file. */
const annotationComponents: { [K in AnnotationType]: Partial<AnnotationComponent<K>> } = {
  path,
  range,
  connector,
  point,
  text,
  highlight,
};

type BatchRenderer<H extends AnnotationHost> = <T extends object>(
  annotations: AnnotationHosts<T>[H]['annotation'][],
  context: AnnotationHosts<T>[H]['context'],
) => AnnotationResult;

/** Select a host once. Components receive a concrete context and need no renderer switches. */
export function createAnnotationRenderer<H extends AnnotationHost>(host: H): BatchRenderer<H> {
  const library = Object.fromEntries(
    Object.entries(annotationComponents).flatMap(([type, component]) => {
      const render = (component as Partial<AnnotationComponent<AnnotationType>>)[host];
      return render ? [[type, render]] : [];
    }),
  ) as Partial<Record<AnnotationType, BatchRenderer<H>>>;

  return (annotations, context) => {
    // Validate the whole batch before any immediate renderer changes the scene or DOM.
    for (const { type } of annotations)
      if (!Object.hasOwn(library, type))
        throw new Error(`Unsupported ${host} annotation type: ${type}.`);

    const marks: MarkOptions[] = [];
    const cleanups: (() => void)[] = [];
    for (let start = 0; start < annotations.length;) {
      const { type } = annotations[start];
      let end = start + 1;
      while (end < annotations.length && annotations[end].type === type) end++;
      // Consecutive batches retain drawing order; DOM highlights receive their full union.
      const result = library[type]!(annotations.slice(start, end), context);
      marks.push(...(result.marks ?? []));
      if (result.cleanup) cleanups.push(result.cleanup);
      start = end;
    }
    return {
      marks,
      cleanup: cleanups.length ? () => cleanups.forEach((cleanup) => cleanup()) : undefined,
    };
  };
}
