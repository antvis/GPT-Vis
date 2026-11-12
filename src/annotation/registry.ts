import type {
  Annotation,
  GraphAnnotation,
  PrimitiveAnnotation,
  SummaryAnnotation,
  TableAnnotation,
} from '../types/annotation';
import { connector, highlight, path, point, range, text } from './components';
import type {
  G2AnnotationContext,
  G6AnnotationContext,
  MarkOptions,
  SummaryContext,
  TableContext,
} from './runtime';

/** Each host pairs its accepted configuration with its rendering context. */
interface AnnotationHosts<T extends object> {
  g2: { annotation: PrimitiveAnnotation<T>; context: G2AnnotationContext<T> };
  g6: { annotation: GraphAnnotation<T>; context: G6AnnotationContext<T> };
  table: { annotation: TableAnnotation<T>; context: TableContext<T> };
  summary: { annotation: SummaryAnnotation; context: SummaryContext };
}

type AnnotationHost = keyof AnnotationHosts<object>;
type AnnotationType = Annotation['type'];

/** Components own their marks and any updates or resources associated with them. */
interface AnnotationResult {
  marks?: MarkOptions[];
  update?: () => void;
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
      if (!Object.prototype.hasOwnProperty.call(library, type))
        throw new Error(`Unsupported ${host} annotation type: ${type}.`);

    const marks: MarkOptions[] = [];
    const updates: (() => void)[] = [];
    const cleanups: (() => void)[] = [];
    for (let start = 0; start < annotations.length;) {
      const { type } = annotations[start];
      let end = start + 1;
      while (end < annotations.length && annotations[end].type === type) end++;
      // Consecutive batches retain drawing order; DOM highlights receive their full union.
      const result = library[type]!(annotations.slice(start, end), context);
      marks.push(...(result.marks ?? []));
      if (result.update) updates.push(result.update);
      if (result.cleanup) cleanups.push(result.cleanup);
      start = end;
    }
    return {
      marks,
      update: updates.length ? () => updates.forEach((update) => update()) : undefined,
      cleanup: cleanups.length ? () => cleanups.forEach((cleanup) => cleanup()) : undefined,
    };
  };
}
