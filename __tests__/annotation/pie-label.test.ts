import { Chart, type MarkComponent } from '@antv/g2';
import { describe, expect, it } from 'vitest';
import { bindAnnotations } from '../../src/annotation';
import type { RendererAnnotation } from '../../src/annotation/registry';
import { getThemeObject } from '../../src/theme/g2';

type Mark = NonNullable<Parameters<MarkComponent>[0]>;
const data = [
  { category: 'A', value: 30, budget: 60 },
  { category: 'B', value: 20, budget: 40 },
  { category: 'C', value: 40, budget: 80 },
  { category: 'D', value: 10, budget: 20 },
];

/** Use real G2 options and annotation components; only the browser scene is simulated. */
function setup(annotations: RendererAnnotation<(typeof data)[number], 'g2'>[]) {
  const sceneLabels: object[] = [];
  const scene = {
    querySelectorAll: (selector: string) => (selector === '.label' ? sceneLabels : []),
    createElement: () => ({
      style: {} as Record<string, unknown>,
      attr(values: Record<string, unknown>) {
        Object.assign(this.style, values);
      },
      setAttribute(name: string, value: unknown) {
        this.style[name] = value;
      },
      getAttribute(name: string) {
        return this.style[name];
      },
    }),
  };
  const chart = new Chart({ container: {} as HTMLElement });
  chart.options({
    type: 'interval',
    data,
    encode: { y: 'value', color: 'category' },
    labels: [{ text: 'value', annotationNativePercentage: true }],
  });
  const context = chart.getContext();
  context.canvas = { document: scene } as unknown as typeof context.canvas;
  const cleanup = bindAnnotations({
    renderer: 'g2',
    chartType: 'pie',
    chart,
    annotations,
    mapping: { x: 'category', y: 'value', data },
    themeObject: getThemeObject('pie'),
  });
  const options = chart.options() as Mark;
  const source = (options.children as Mark[])[0];
  return {
    source,
    options,
    cleanup: () => {
      cleanup();
      context.canvas = undefined;
      chart.destroy();
    },
    scene,
    sceneLabels,
    update: () =>
      options.labelTransform[0].type()([], {
        canvas: { document: scene },
        layout: { width: 100, height: 100 },
        coordinate: { getSize: () => [100, 100] },
      }),
  };
}

function contribution({
  hidden = false,
  percentage = true,
  extra = {},
}: {
  hidden?: boolean;
  percentage?: boolean;
  extra?: Partial<
    Extract<RendererAnnotation<(typeof data)[number], 'g2'>, { type: 'contribution' }>
  >;
} = {}) {
  const result = setup([{ type: 'contribution', data: { category: 'A' }, ...extra }]);
  const text = { style: { visibility: hidden ? 'hidden' : 'visible' } };
  const native = {
    __data__: { dependentElement: { __data__: { data: data[0] }, getAttribute: () => undefined } },
    style: { visibility: hidden ? 'hidden' : 'visible' },
    getAttribute: (name: string) => name === 'annotationNativePercentage' && percentage,
    querySelectorAll: () => [text],
  };
  const mark = (result.options.children as Mark[])[1];
  const shape = mark.type.props.shape[mark.type.props.defaultShape];
  // Execute the generated shape decorator instead of injecting internal selection metadata.
  const element = shape(mark.style, { document: result.scene })([[50, 50]], {});
  const fallback = {
    __data__: { dependentElement: element },
    style: { visibility: 'visible' } as Record<string, unknown>,
    getAttribute: () => undefined,
    attr(values: Record<string, unknown>) {
      Object.assign(this.style, values);
    },
  };
  result.sceneLabels.push(native, fallback);
  return { ...result, native, text, fallback };
}

describe('pie contribution label coordination', () => {
  it('hides the fallback text, background and connector when a native percentage is visible', () => {
    const { update, fallback, cleanup } = contribution();
    update();
    expect(fallback.style).toMatchObject({
      visibility: 'hidden',
      backgroundVisibility: 'hidden',
      connectorVisibility: 'hidden',
    });
    cleanup();
  });

  it.each([{ hidden: true }, { percentage: false }])(
    'keeps a fallback for hidden or non-percentage native labels: %j',
    (options) => {
      const { update, fallback, cleanup } = contribution(options);
      update();
      expect(fallback.style).toMatchObject({
        visibility: 'visible',
        backgroundVisibility: 'visible',
        connectorVisibility: 'visible',
      });
      cleanup();
    },
  );

  it('re-evaluates native visibility on subsequent updates', () => {
    const { update, fallback, native, text, cleanup } = contribution();
    for (const visibility of ['visible', 'hidden', 'visible']) {
      native.style.visibility = text.style.visibility = visibility;
      update();
      const expected = visibility === 'hidden' ? 'visible' : 'hidden';
      expect(fallback.style).toMatchObject({
        visibility: expected,
        backgroundVisibility: expected,
        connectorVisibility: expected,
      });
    }
    cleanup();
  });

  it.each([{ data: [{ category: 'A' }, { category: 'B' }] }, { label: 'Core products' }])(
    'preserves a separate business explanation for %j',
    (extra) => {
      const { update, fallback, cleanup } = contribution({ extra });
      update();
      expect(fallback.style.visibility).toBe('visible');
      cleanup();
    },
  );
});

describe('pie rank labels', () => {
  it.each(['topN', 'bottomN'] as const)(
    'gives %s one native label configuration with three ranks',
    (type) => {
      const { source, options, cleanup } = setup([{ type, n: 3 }]);
      expect(options.children).toHaveLength(1); // No duplicate attached-label marks.
      expect(source.labels).toHaveLength(2); // Original percentages plus one ranking.
      expect(source.labels[0]).toMatchObject({ text: 'value' });
      const label = source.labels[1];
      expect(label).toMatchObject({ position: 'inside', background: false, connector: false });
      expect(data.map(label.text)).toEqual(
        type === 'topN'
          ? ['Top 2', 'Top 3', 'Top 1', '']
          : ['Bottom 3', 'Bottom 2', '', 'Bottom 1'],
      );
      // Run the generated removal transform with G2's per-sector label candidates.
      const candidates = data.map((row) => ({
        getAttribute: () => label.text(row),
        destroyed: false,
        destroy() {
          this.destroyed = true;
        },
      }));
      const visible: typeof candidates = label.transform[0].type()(candidates);
      expect(visible).toHaveLength(3);
      expect(candidates.filter((candidate) => candidate.destroyed)).toHaveLength(1);
      expect(visible.map((candidate) => candidate.getAttribute()).every(Boolean)).toBe(true);
      cleanup();
    },
  );

  it('preserves independent ranking configurations, custom text and custom color', () => {
    const { source, cleanup } = setup([
      { type: 'topN', label: '优选', style: { labelFill: '#f00' }, n: 2 },
      { type: 'bottomN', n: 2 },
    ]);
    const [, top, bottom] = source.labels;
    expect(source.labels).toHaveLength(3);
    expect(data.map(top.text)).toEqual(['优选', '', '优选', '']);
    expect(top.fill).toBe('#f00');
    expect(top.transform).not.toContainEqual({ type: 'contrastReverse' });
    expect(data.map(bottom.text)).toEqual(['', 'Bottom 2', '', 'Bottom 1']);
    expect(bottom.transform).toContainEqual({ type: 'contrastReverse' });
    cleanup();
  });

  it('suppresses ranking labels without suppressing selection or native percentages', () => {
    const { source, options, cleanup } = setup([{ type: 'topN', label: '', n: 2 }]);
    expect(source.labels).toHaveLength(1);
    expect(options.children).toHaveLength(1);
    expect(data.map((row) => source.style.opacity(row))).toEqual([1, 0.16, 1, 0.16]);
    cleanup();
  });
});
