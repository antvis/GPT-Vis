import { Chart } from '@antv/g2';
import { getChartAnimation, prefersReducedMotion } from './animation';

type Cleanup = (() => void) | null | undefined;

/** Keep mark identities and the canvas stable as complete data snapshots arrive. */
const withUpdateAnimation = (options: any, hasRendered: boolean, key = 'chart'): any => {
  const markKey = options.key ?? key;
  const occurrences = new Map<string, number>();
  const children = options.children?.map((child: any) => {
    const index = occurrences.get(child.type) ?? 0;
    occurrences.set(child.type, index + 1);
    return withUpdateAnimation(child, hasRendered, `${markKey}-${child.type}-${index}`);
  });
  return {
    ...options,
    key: markKey,
    animate: prefersReducedMotion()
      ? false
      : hasRendered
        ? getChartAnimation(true)
        : (options.animate ?? getChartAnimation(false, 'fadeIn')),
    ...(children ? { children } : {}),
  };
};

/** Shared G2 lifecycle. The renderer owns resources; chart modules own their specs. */
export const createChartRenderer = (options: ConstructorParameters<typeof Chart>[0]) => {
  let chart: Chart | null = null;
  let hasRendered = false;
  let cleanups: Cleanup[] = [];

  const cleanup = () => {
    for (const dispose of cleanups) dispose?.();
    cleanups = [];
  };

  return {
    render(spec: any, bind?: (chart: Chart) => Cleanup[]) {
      cleanup();
      chart ??= new Chart(options);
      chart.options(withUpdateAnimation(spec, hasRendered));
      cleanups = bind?.(chart) ?? [];
      // G2 coalesces renders received while its previous render is in progress.
      chart.render();
      hasRendered = true;
    },
    destroy() {
      cleanup();
      chart?.destroy();
      chart = null;
      hasRendered = false;
    },
  };
};

/** Use semantic identity for discrete marks, independently of their changing value. */
export const datumKey =
  (...fields: string[]) =>
  (datum: Record<string, unknown>) =>
    JSON.stringify(fields.map((field) => datum[field] ?? null));

/** Match observations by input position so appending data preserves existing shapes. */
export const observationKey = (_datum: unknown, index: number): string => String(index);

/** Set identity after aggregation, when derived channels such as bin boundaries exist. */
export const keyByChannels =
  (...channels: string[]) =>
  () =>
  (index: number[], mark: any): [number[], any] => {
    const values = mark.encode.key.value.slice();
    for (const i of index) {
      values[i] = JSON.stringify(channels.map((channel) => mark.encode[channel]?.value[i] ?? null));
    }
    return [index, { ...mark, encode: { ...mark.encode, key: { type: 'column', value: values } } }];
  };
