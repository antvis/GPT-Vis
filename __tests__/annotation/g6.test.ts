import type { Graph } from '@antv/g6';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation/g6';
import { getAnnotationDefaults } from '../../src/theme/annotation';
import type { GraphData } from '../../src/types';

// Record scene operations here; real native text measurement is verified in the browser.
const { Shape, NativeLabel } = vi.hoisted(() => {
  class Shape {
    children: Shape[] = [];
    parent?: Shape;
    position = [0, 0];
    scale = 1;
    destroyed = false;
    animations = new Set<{ cancel: () => void; currentTime: number }>();
    animate = vi.fn((): { cancel: () => void; currentTime: number } | null => {
      const animation = {
        cancel: vi.fn(() => this.animations.delete(animation)),
        currentTime: 0,
      };
      this.animations.add(animation);
      return animation;
    });
    getAnimations() {
      return [...this.animations];
    }
    constructor(
      public tag: string,
      public attributes: Record<string, any> = {},
      public className = '',
    ) {}
    appendChild(child: Shape) {
      child.parent = this;
      this.children.push(child);
    }
    setLocalPosition(position: number[]) {
      this.position = position;
    }
    setLocalScale(scale: number) {
      this.scale = scale;
    }
    destroyChildren() {
      [...this.children].forEach((child) => child.destroy());
    }
    destroy() {
      this.destroyChildren();
      this.getAnimations().forEach((animation) => animation.cancel());
      this.destroyed = true;
      if (this.parent)
        this.parent.children = this.parent.children.filter((child) => child !== this);
    }
  }
  class NativeLabel extends Shape {
    constructor(options: { className: string; style: Record<string, any> }) {
      super('label', options.style, options.className);
    }
    getGeometryBounds() {
      return { min: [-10, -20], center: [40, 0], halfExtents: [50, 20] };
    }
  }
  return { Shape, NativeLabel };
});
vi.mock('@antv/g6', () => ({ Label: NativeLabel }));

const data: GraphData = {
  nodes: [{ name: 'A' }, { name: 'B' }],
  edges: [{ source: 'A', target: 'B', name: 'link' }],
};
const defaults = getAnnotationDefaults('network-graph', 'dark');

function setup(animation = true) {
  const listeners = new Map<string, (() => void)[]>();
  let zoom = 1;
  let hidden = false;
  let origin = [0, 0];
  let node = [100, 120];
  const scene = new Shape('canvas');
  const graph = {
    on: (name: string, callback: () => void) =>
      listeners.set(name, [...(listeners.get(name) ?? []), callback]),
    off: (name: string, callback: () => void) =>
      listeners.set(
        name,
        (listeners.get(name) ?? []).filter((c) => c !== callback),
      ),
    getElementVisibility: () => (hidden ? 'hidden' : 'visible'),
    getElementPosition: () => node,
    getElementRenderBounds: (id: string) => {
      const center = id === 'internal-edge' ? [130, 140] : node;
      return { center, min: center.map((v) => v - 14), max: center.map((v) => v + 14) };
    },
    getViewportByCanvas: ([x, y]: number[]) => [(x - origin[0]) * zoom, (y - origin[1]) * zoom],
    getCanvasByViewport: () => origin,
    getZoom: () => zoom,
    getCanvas: vi.fn(() => ({
      document: {
        createElement: (
          tag: string,
          options: { style: Record<string, unknown>; className?: string },
        ) => {
          const shape = new Shape(tag, options.style, options.className);
          if (!animation) shape.animate.mockReturnValue(null);
          return shape;
        },
      },
      getSize: () => [400, 300],
      appendChild: (shape: InstanceType<typeof Shape>) => scene.appendChild(shape),
    })),
  } as unknown as Graph;
  return {
    graph,
    scene,
    listeners,
    shapes: () =>
      scene.children[0]?.children.filter((shape) => shape.className !== 'annotation-pulse') ?? [],
    pulses: () =>
      scene.children[0]?.children.filter((shape) => shape.className === 'annotation-pulse') ?? [],
    emit: (name: string) => listeners.get(name)?.forEach((fn) => fn()),
    zoom: () => {
      zoom = 2;
      origin = [10, 20];
    },
    move: (position = [150, 160]) => {
      node = position;
    },
    hide: () => {
      hidden = true;
    },
  };
}

describe('G6 native annotation adapter', () => {
  beforeEach(() => {
    vi.stubGlobal('document', {
      fonts: { ready: Promise.resolve(), addEventListener: vi.fn(), removeEventListener: vi.fn() },
    });
    vi.stubGlobal('window', {
      matchMedia: () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('waits for the canvas and maps original node and edge objects to visible anchors', () => {
    const { graph, shapes, emit, hide, move } = setup();
    bindAnnotations(
      graph,
      [{ type: 'point', data: [{ name: 'A' }, { source: 'A', target: 'B' }] }],
      data,
      ['internal-edge'],
      defaults,
    );
    expect(graph.getCanvas).not.toHaveBeenCalled();
    emit('afterrender');
    expect(shapes().map((s) => [s.tag, s.attributes.cx, s.attributes.cy])).toEqual([
      ['circle', 100, 120],
      ['circle', 130, 140],
    ]);
    expect(shapes().map((shape) => [shape.attributes.fill, shape.attributes.stroke])).toEqual([
      ['transparent', 'transparent'],
      [defaults.stroke, defaults.pointStroke],
    ]);
    move([130, 140]);
    emit('afterdraw');
    expect(shapes().every((shape) => shape.attributes.fill === 'transparent')).toBe(true);
    hide();
    emit('afterdraw');
    expect(shapes()).toHaveLength(0);
  });

  it('cancels camera zoom and translation while preserving pixel sizes and tracking movement', () => {
    const { graph, scene, shapes, emit, zoom, move } = setup();
    bindAnnotations(
      graph,
      [
        {
          type: 'point',
          data: { name: 'A' },
          style: {
            size: 7,
          },
        },
      ],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    zoom();
    emit('aftertransform');
    expect(scene.children[0].position).toEqual([10, 20]);
    expect(scene.children[0].scale).toBe(0.5);
    expect(shapes()[0].attributes).toMatchObject({ cx: 180, cy: 200, r: 7 });
    move();
    emit('afterdraw');
    expect(shapes()[0].attributes).toMatchObject({ cx: 280, cy: 280 });
  });

  it('preserves path order and delegates directional arrows to native end markers', () => {
    const { graph, shapes, emit } = setup();
    bindAnnotations(
      graph,
      [
        {
          type: 'path',
          data: [{ name: 'A' }, { source: 'A', target: 'B' }, { name: 'B' }],
          style: {
            lineDash: [4, 2],
          },
        },
        {
          type: 'connector',
          data: [{ name: 'A' }, { source: 'A', target: 'B' }],
          style: {
            stroke: '#f80',
            lineWidth: 3,
          },
        },
      ],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    expect(shapes()[0].attributes).toMatchObject({
      d: [
        ['M', 100, 120],
        ['L', 130, 140],
        ['L', 100, 120],
      ],
      lineDash: [4, 2],
    });
    const connector = shapes()[1].children[0];
    expect(connector.attributes).toMatchObject({
      d: [
        ['M', 100, 120],
        ['L', 130, 140],
      ],
      lineJoin: 'round',
    });
    expect(connector.attributes.markerEnd.attributes).toMatchObject({
      stroke: '#f80',
      lineWidth: 3,
      pointerEvents: 'none',
    });
  });

  it('keeps coincident connector endpoints finite without an oversized arrow', () => {
    const { graph, shapes, emit } = setup();
    bindAnnotations(
      graph,
      [{ type: 'connector', data: [{ name: 'A' }, { name: 'B' }] }],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    expect(shapes()[0].children[0].attributes.markerEnd).toBeUndefined();
    expect(shapes()[0].children[0].attributes.d).toEqual([
      ['M', 100, 120],
      ['L', 100, 120],
    ]);
  });

  it('renders curves, dimension arrows and brackets as native paths and updates after zoom', () => {
    const { graph, shapes, emit, zoom } = setup();
    bindAnnotations(
      graph,
      [
        { type: 'connector', shape: 'curve', data: [{ name: 'A' }, { name: 'link' }] },
        {
          type: 'connector',
          shape: 'dimension',
          orientation: 'horizontal',
          data: [{ name: 'A' }, { name: 'link' }],
        },
        { type: 'connector', shape: 'bracket', data: [{ name: 'A' }, { name: 'link' }] },
      ],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    const [curve, dimension, bracket] = shapes();
    expect(curve.children[0].attributes.d[1][0]).toBe('Q');
    expect(curve.children[0].attributes.markerEnd).toBeDefined();
    expect(dimension.children).toHaveLength(2);
    expect(dimension.children[1].attributes.markerStart).toBeDefined();
    expect(dimension.children[1].attributes.markerEnd).toBeDefined();
    expect(bracket.children[0].attributes.markerStart).toBeUndefined();
    expect(bracket.children[0].attributes.markerEnd).toBeUndefined();
    zoom();
    emit('aftertransform');
    expect(curve.destroyed).toBe(true);
    expect(shapes()[0].children[0].attributes.d[0]).toEqual(['M', 180, 200]);
  });

  it('uses native Label wrapping and theme cards while centering standalone text', () => {
    const { graph, shapes, emit } = setup();
    const explanation = '长文字由 G6 原生标签测量并换行，保留完整内容。';
    bindAnnotations(
      graph,
      [
        {
          type: 'point',
          data: { name: 'A' },
          label: explanation,
          style: {
            labelFontSize: 14,
          },
        },
        { type: 'text', data: { name: 'B' }, label: '独立说明' },
      ],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    const labels = shapes().filter((shape) => shape instanceof NativeLabel);
    expect(labels).toHaveLength(2);
    expect(labels[0].attributes).toMatchObject({
      text: explanation,
      background: true,
      backgroundFill: defaults.labels.point.background,
      padding: [8, 10],
      fontSize: 14,
      maxLines: Infinity,
      textOverflow: 'clip',
    });
    expect(labels[1].attributes).toMatchObject({ background: false, textAlign: 'center' });
    expect(labels[1].position).toEqual([60, 120]);
    expect(shapes().filter((shape) => shape.className === 'annotation-leader')).toHaveLength(1);
  });

  it('reuses its root and releases shapes, listeners and font callbacks on cleanup', async () => {
    const { graph, scene, emit, listeners } = setup();
    const cleanup = bindAnnotations(
      graph,
      [{ type: 'point', data: { name: 'A' } }],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    const root = scene.children[0];
    const mark = root.children[0];
    emit('afterrender');
    expect(scene.children).toEqual([root]);
    expect(mark.destroyed).toBe(true);
    cleanup();
    await Promise.resolve();
    expect([...listeners.values()].flat()).toHaveLength(0);
    expect(root.destroyed).toBe(true);
    expect(scene.children).toHaveLength(0);
    expect(document.fonts.removeEventListener).toHaveBeenCalledWith(
      'loadingdone',
      expect.any(Function),
    );
  });

  it('moves attached cards apart while preserving the standalone text anchor', () => {
    const { graph, shapes, emit } = setup();
    bindAnnotations(
      graph,
      [
        { type: 'point', data: { name: 'A' }, label: 'first' },
        { type: 'point', data: { name: 'B' }, label: 'second' },
        { type: 'text', data: { name: 'A' }, label: 'fixed' },
      ],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    const labels = shapes().filter((shape) => shape instanceof NativeLabel);
    const boxes = labels.map((label) => ({
      x: label.position[0] - 10,
      y: label.position[1] - 20,
      width: 100,
      height: 40,
    }));
    const separated = (a: (typeof boxes)[number], b: (typeof boxes)[number]) =>
      a.x + a.width <= b.x ||
      b.x + b.width <= a.x ||
      a.y + a.height <= b.y ||
      b.y + b.height <= a.y;
    expect(separated(boxes[0], boxes[1])).toBe(true);
    expect(separated(boxes[0], boxes[2])).toBe(true);
    expect(separated(boxes[1], boxes[2])).toBe(true);
    expect(labels[2].position).toEqual([60, 120]);
  });

  it('resolves node and edge selectors when drawing and rejects missing or ambiguous anchors', () => {
    const cases: [{ name: string }, GraphData, number][] = [
      [{ name: 'unknown' }, data, 0],
      [{ name: 'A' }, { ...data, nodes: [...data.nodes, { name: 'A' }] }, 2],
    ];
    for (const [selector, source, count] of cases) {
      const { graph, emit } = setup();
      const cleanup = bindAnnotations(
        graph,
        [{ type: 'point', data: selector }],
        source,
        ['internal-edge'],
        defaults,
      );
      expect(() => emit('afterrender')).toThrow(`matches ${count} objects`);
      cleanup();
    }
  });

  it('rejects unsupported annotation types when drawing', () => {
    const { graph, emit } = setup();
    const cleanup = bindAnnotations(
      graph,
      // @ts-expect-error Graphs do not support coordinate ranges.
      [{ type: 'range', data: {} }],
      data,
      ['internal-edge'],
      defaults,
    );
    expect(() => emit('afterrender')).toThrow('Unsupported graph annotation type');
    cleanup();
  });

  it('follows theme point geometry and rejects unsupported shapes', () => {
    const { graph, shapes, emit } = setup();
    bindAnnotations(graph, [{ type: 'point', data: { name: 'A' } }], data, ['internal-edge'], {
      ...defaults,
      shape: 'hollowSquare',
    });
    emit('afterrender');
    expect(shapes()[0].tag).toBe('rect');
    expect(shapes()[0].attributes.fill).toBe('transparent');
    const invalid = setup();
    const cleanup = bindAnnotations(
      invalid.graph,
      [{ type: 'point', data: { name: 'A' } }],
      data,
      ['internal-edge'],
      { ...defaults, shape: 'triangleDown' },
    );
    expect(() => invalid.emit('afterrender')).toThrow('Unsupported annotation point shape');
    cleanup();
  });

  it('keeps theme marker outlines separate from halo colors and applies explicit paint', () => {
    const { graph, shapes, pulses, emit } = setup();
    const themed = getAnnotationDefaults('network-graph', 'dark', {
      mark: { point: { stroke: '#123', lineWidth: 2 } },
    });
    bindAnnotations(
      graph,
      [
        { type: 'point', data: { source: 'A', target: 'B' }, pulse: false },
        {
          type: 'point',
          data: { source: 'A', target: 'B' },
          pulse: false,
          style: {
            fill: '#ff0',
            stroke: '#f80',
            lineWidth: 3,
          },
        },
      ],
      data,
      ['internal-edge'],
      themed,
    );
    emit('afterrender');
    expect(shapes().map((shape) => shape.attributes)).toEqual([
      expect.objectContaining({ fill: themed.stroke, stroke: '#123', lineWidth: 2 }),
      expect.objectContaining({ fill: '#ff0', stroke: '#f80', lineWidth: 3 }),
    ]);
    expect(pulses().map((ring) => ring.attributes.stroke)).toEqual([themed.stroke, '#ff0']);
  });

  it('pulses batches in sync and cancels old loops on redraw, hiding and cleanup', () => {
    vi.spyOn(performance, 'now').mockReturnValue(2400);
    const { graph, shapes, pulses, emit, hide } = setup();
    const cleanup = bindAnnotations(
      graph,
      [
        {
          type: 'point',
          data: [{ name: 'A' }, { source: 'A', target: 'B' }],
          style: {
            fill: '#f80',
          },
        },
      ],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    const first = pulses();
    expect(first).toHaveLength(2);
    expect(first.map((ring) => ring.getAnimations()[0].currentTime)).toEqual([600, 600]);
    expect(first[0].attributes).toMatchObject({
      stroke: '#f80',
      fill: 'none',
      pointerEvents: 'none',
    });
    expect(shapes().every((shape) => shape.attributes.fill === '#f80')).toBe(true);
    expect(shapes().every((shape) => shape.animate.mock.calls.length === 0)).toBe(true);
    emit('afterdraw');
    expect(first.every((ring) => ring.destroyed && ring.getAnimations().length === 0)).toBe(true);
    expect(pulses()).toHaveLength(2);
    hide();
    emit('afterdraw');
    expect(pulses()).toHaveLength(0);
    cleanup();
  });

  it('keeps a static halo with reduced motion and responds to preference changes', () => {
    const listeners = new Set<() => void>();
    const motion = {
      matches: true,
      addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
    };
    vi.stubGlobal('window', { matchMedia: () => motion });
    const { graph, pulses, emit } = setup();
    const cleanup = bindAnnotations(
      graph,
      [{ type: 'point', data: { name: 'A' } }],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    const [ring] = pulses();
    expect(ring.animate).not.toHaveBeenCalled();
    expect(ring.attributes.opacity).toBeGreaterThan(0);
    motion.matches = false;
    listeners.forEach((listener) => listener());
    expect(ring.destroyed).toBe(true);
    const [animation] = pulses()[0].getAnimations();
    expect(animation).toBeDefined();
    motion.matches = true;
    listeners.forEach((listener) => listener());
    expect(animation.cancel).toHaveBeenCalledOnce();
    expect(pulses()[0].getAnimations()).toHaveLength(0);
    expect(pulses()[0].attributes).toMatchObject({
      r: defaults.size * defaults.pulse.staticScale,
      opacity: defaults.pulse.opacity,
      fill: 'none',
    });
    cleanup();
    expect(listeners.size).toBe(0);
  });

  it('allows animated and static point annotations in the same graph', () => {
    const { graph, pulses, emit } = setup();
    const cleanup = bindAnnotations(
      graph,
      [
        { type: 'point', data: { name: 'A' }, pulse: false },
        { type: 'point', data: { source: 'A', target: 'B' }, pulse: true },
      ],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    const [staticHalo, animatedHalo] = pulses();
    expect(staticHalo.animate).not.toHaveBeenCalled();
    expect(staticHalo.attributes).toMatchObject({
      r: defaults.size * defaults.pulse.staticScale,
      opacity: defaults.pulse.opacity,
      fill: 'none',
    });
    expect(animatedHalo.getAnimations()).toHaveLength(1);
    cleanup();
  });

  it('retains a visible static halo when the native animation timeline is unavailable', () => {
    const { graph, pulses, emit } = setup(false);
    const cleanup = bindAnnotations(
      graph,
      [{ type: 'point', data: { name: 'A' } }],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    expect(pulses()).toHaveLength(1);
    expect(pulses()[0].attributes.r).toBe(defaults.size * defaults.pulse.staticScale);
    expect(pulses()[0].attributes.opacity).toBeGreaterThan(0);
    expect(pulses()[0].getAnimations()).toHaveLength(0);
    cleanup();
  });
});
