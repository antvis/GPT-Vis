import { Chart, type MarkComponent } from '@antv/g2';
import { describe, expect, it } from 'vitest';
import { bindAnnotations } from '../../src/annotation';
import type { RendererAnnotation } from '../../src/annotation/registry';
import { getAnnotationStyle } from '../../src/theme/annotation';
import { getThemeObject } from '../../src/theme/g2';

type Row = { x: number; y: number; group?: string };
const data: Row[] = [
  { x: 1, y: 20 },
  { x: 2, y: 80 },
];
const defaults = getAnnotationStyle(getThemeObject('line'));
type Mark = NonNullable<Parameters<MarkComponent>[0]>;

/** Geometry is already transformed: interval bounds can represent a stack or a negative baseline. */
function setup({
  rows = data,
  type = 'line',
  bounds = [20, 80],
  horizontal = false,
  annotations = [{ type: 'thresholdHighlight', threshold: 40 }],
  scale = (value: number) => value / 100,
  fill = '#654321',
}: {
  rows?: Row[];
  type?: 'line' | 'interval' | 'area';
  fill?: string;
  bounds?: number[];
  horizontal?: boolean;
  annotations?: RendererAnnotation<Row, 'g2'>[];
  scale?: (value: number) => number;
} = {}) {
  const attributes: Record<string, unknown> = { stroke: '#123456', fill };
  const element = {
    markType: type,
    __data__: { data: rows[0], seriesIndex: rows.map((_, i) => i), points: [] },
    getAttribute: (key: string) => attributes[key],
    setAttribute: (key: string, value: unknown) => {
      attributes[key] = value;
    },
    getLocalBounds: () =>
      horizontal
        ? { min: [bounds[0], 10], max: [bounds[1], 20] }
        : { min: [10, 100 - bounds[1]], max: [20, 100 - bounds[0]] },
  };
  const mapping = { x: 'x' as const, y: 'y' as const, data: rows, series: 'group' as const };
  const scene = {
    querySelectorAll: (selector: string) => (selector === '.element' ? [element] : []),
  };
  const chart = new Chart({ container: {} as HTMLElement });
  chart.options({ type, data: rows, encode: { x: 'x', y: 'y' } });
  const context = chart.getContext();
  context.canvas = { document: scene } as unknown as typeof context.canvas;
  const library = context.library!;
  const cleanup = bindAnnotations({
    renderer: 'g2',
    chartType: type === 'interval' ? (horizontal ? 'bar' : 'column') : type,
    chart,
    mapping,
    annotations,
    themeObject: getThemeObject('line'),
  });
  const options = chart.options() as Mark;
  const source = (options.children as Mark[])[0];
  library['transform.annotationSource'](source.transform.at(-1))(
    rows.map((_, i) => i),
    { data: rows },
  );
  source.children(
    rows.map((row) => ({ data: row, points: [] })),
    {
      x: { map: scale, getOptions: () => ({ type: 'linear' }) },
      y: { map: scale, getOptions: () => ({ type: 'linear' }) },
    },
    { innerWidth: 100 },
  );
  const coordinate = {
    getSize: () => [100, 100],
    map: ([x, y]: number[]) => (horizontal ? [y * 100, x * 100] : [x * 100, (1 - y) * 100]),
  };
  return {
    attributes,
    source,
    options,
    cleanup: () => {
      cleanup();
      context.canvas = undefined;
      chart.destroy();
    },
    update: () =>
      options.labelTransform[0].type()([], {
        coordinate,
        canvas: { document: scene },
        layout: { width: 100, height: 100 },
      }),
  };
}

describe('native threshold region paint', () => {
  it('retains the native line and switches its paint exactly at the threshold', () => {
    const { attributes, update, cleanup, options, source } = setup();
    update();
    expect(source.type).toBe('line');
    expect(options.children).toHaveLength(2); // Native line plus threshold reference only.
    expect(attributes.stroke).toBe(
      'linear-gradient(90deg, #2DAF9E 0.000000%, #2DAF9E 66.666667%, #123456 66.666667%, #123456 100.000000%)',
    );
    expect(attributes.fill).toBe('#654321');
    cleanup();
  });

  it.each([false, true])(
    'colors the cumulative portion of a stacked interval (horizontal=%s)',
    (horizontal) => {
      const { attributes, update, cleanup } = setup({
        rows: [{ x: 1, y: 30 }],
        type: 'interval',
        bounds: [30, 60],
        horizontal,
        annotations: [{ type: 'thresholdHighlight', style: { fill: '#f00' }, threshold: 40 }],
      });
      update();
      const gradient = String(attributes.fill);
      expect(gradient).toContain(`linear-gradient(${horizontal ? 0 : 90}deg`);
      expect(gradient).toContain('#f00');
      // Raw value is below 40; cumulative geometry crosses 40 and must still split.
      expect(gradient).toContain(horizontal ? '33.333333%' : '66.666667%');
      expect(attributes.stroke).toBe('#123456');
      cleanup();
    },
  );

  it('colors only the low portion of a negative interval', () => {
    const { attributes, update, cleanup } = setup({
      type: 'interval',
      bounds: [-80, 0],
      annotations: [{ type: 'thresholdHighlight', threshold: -40, direction: 'below' }],
    });
    update();
    expect(attributes.fill).toBe(
      'linear-gradient(90deg, #654321 0.000000%, #654321 50.000000%, #2DAF9E 50.000000%, #2DAF9E 100.000000%)',
    );
    cleanup();
  });

  it('uses scale coordinates for a nonlinear axis', () => {
    const { attributes, update, cleanup } = setup({
      bounds: [0, 100],
      scale: (value) => Math.log10(value) / 2,
      annotations: [{ type: 'thresholdHighlight', threshold: 10 }],
    });
    update();
    expect(attributes.stroke).toContain('50.000000%');
    cleanup();
  });

  it('applies overlapping regions in declaration order, preserving the original paint between them', () => {
    const { attributes, update, cleanup } = setup({
      bounds: [0, 100],
      horizontal: true,
      annotations: [
        {
          type: 'thresholdHighlight',
          style: { stroke: '#00f' },
          threshold: 30,
          direction: 'below',
        },
        { type: 'path', data: { y: 50 }, label: 'Reference' },
        { type: 'thresholdHighlight', style: { stroke: '#f00' }, threshold: 60 },
        { type: 'thresholdHighlight', style: { stroke: '#0f0' }, threshold: 80 },
      ],
    });
    update();
    expect(attributes.stroke).toBe(
      'linear-gradient(0deg, #00f 0.000000%, #00f 30.000000%, #123456 30.000000%, #123456 60.000000%, #f00 60.000000%, #f00 80.000000%, #0f0 80.000000%, #0f0 100.000000%)',
    );
    cleanup();
  });

  it.each([false, true])(
    'honors inclusive selection for a flat line at the threshold (%s)',
    (inclusive) => {
      const { attributes, update, cleanup } = setup({
        bounds: [40, 40],
        annotations: [{ type: 'thresholdHighlight', threshold: 40, inclusive }],
      });
      update();
      expect(attributes.stroke).toBe(inclusive ? defaults.highlight.color : '#123456');
      cleanup();
    },
  );

  it('snaps numerical noise at a stack boundary instead of emitting invalid scientific-notation stops', () => {
    const { attributes, update, cleanup } = setup({
      type: 'interval',
      horizontal: true,
      bounds: [40 - 1e-13, 80],
    });
    update();
    expect(attributes.fill).toBe(defaults.highlight.color);
    cleanup();
  });

  it('does not accumulate gradients and restores paint on cleanup', () => {
    const { attributes, update, cleanup } = setup();
    update();
    const paint = attributes.stroke;
    update();
    expect(attributes.stroke).toBe(paint);
    cleanup();
    expect(attributes.stroke).toBe('#123456');
  });

  it('leaves a path outside the threshold region unchanged', () => {
    const { attributes, update, cleanup } = setup({
      annotations: [{ type: 'thresholdHighlight', threshold: 100 }],
    });
    update();
    expect(attributes.stroke).toBe('#123456');
    cleanup();
  });

  it('rejects partial-series scope rather than silently recoloring unselected observations', () => {
    expect(() =>
      setup({
        annotations: [{ type: 'thresholdHighlight', threshold: 40, data: { x: 1 } }],
      }),
    ).toThrow('complete series');
  });
});

it('colors an area region using native layered fills and retains its original gradient', () => {
  const fill = 'linear-gradient(-90deg, #fff 0%, #123456 100%)';
  const { attributes, update, cleanup } = setup({ type: 'area', fill });
  update();
  const paint = attributes.fill;
  expect(paint).toBe(
    `${fill}, linear-gradient(90deg, #2DAF9E 0.000000%, #2DAF9E 66.666667%, transparent 66.666667%, transparent 100.000000%)`,
  );
  update();
  expect(attributes.fill).toBe(paint);
  cleanup();
  expect(attributes.fill).toBe(fill);
});
