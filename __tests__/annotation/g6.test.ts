import type { Graph } from '@antv/g6';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation/g6';
import { getAnnotationDefaults } from '../../src/theme/annotation';
import type { GraphData } from '../../src/types';
import type { GraphAnnotation } from '../../src/types/annotation';

// Record scene operations here; real native text measurement is verified in the browser.
const { Shape, NativeLabel } = vi.hoisted(() => {
  class Shape {
    children: Shape[] = [];
    parent?: Shape;
    position = [0, 0];
    scale = 1;
    destroyed = false;
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

function setup() {
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
      expect(id).toBe('internal-edge');
      return { center: [130, 140] };
    },
    getViewportByCanvas: ([x, y]: number[]) => [(x - origin[0]) * zoom, (y - origin[1]) * zoom],
    getCanvasByViewport: () => origin,
    getZoom: () => zoom,
    getCanvas: vi.fn(() => ({
      document: {
        createElement: (
          tag: string,
          options: { style: Record<string, unknown>; className?: string },
        ) => new Shape(tag, options.style, options.className),
      },
      getSize: () => [400, 300],
      appendChild: (shape: InstanceType<typeof Shape>) => scene.appendChild(shape),
    })),
  } as unknown as Graph;
  return {
    graph,
    scene,
    listeners,
    shapes: () => scene.children[0]?.children ?? [],
    emit: (name: string) => listeners.get(name)?.forEach((fn) => fn()),
    zoom: () => {
      zoom = 2;
      origin = [10, 20];
    },
    move: () => {
      node = [150, 160];
    },
    hide: () => {
      hidden = true;
    },
  };
}

describe('G6 native annotation adapter', () => {
  beforeEach(() =>
    vi.stubGlobal('document', {
      fonts: { ready: Promise.resolve(), addEventListener: vi.fn(), removeEventListener: vi.fn() },
    }),
  );
  afterEach(() => vi.unstubAllGlobals());

  it('waits for the canvas and maps original node and edge objects to visible anchors', () => {
    const { graph, shapes, emit, hide } = setup();
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
    hide();
    emit('afterdraw');
    expect(shapes()).toHaveLength(0);
  });

  it('cancels camera zoom and translation while preserving pixel sizes and tracking movement', () => {
    const { graph, scene, shapes, emit, zoom, move } = setup();
    bindAnnotations(
      graph,
      [{ type: 'point', data: { name: 'A' }, size: 7 }],
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
          type: 'line',
          data: [{ name: 'A' }, { source: 'A', target: 'B' }, { name: 'B' }],
          lineDash: [4, 2],
        },
        {
          type: 'connector',
          data: [{ name: 'A' }, { source: 'A', target: 'B' }],
          stroke: '#f80',
          lineWidth: 3,
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
    expect(shapes()[1].attributes).toMatchObject({
      d: [
        ['M', 100, 120],
        ['L', 130, 140],
      ],
      lineJoin: 'round',
    });
    expect(shapes()[1].attributes.markerEnd.attributes).toMatchObject({
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
    expect(shapes()[0].attributes.markerEnd).toBeUndefined();
    expect(shapes()[0].attributes.d).toEqual([
      ['M', 100, 120],
      ['L', 100, 120],
    ]);
  });

  it('uses native Label wrapping and theme cards while centering standalone text', () => {
    const { graph, shapes, emit } = setup();
    const explanation = '长文字由 G6 原生标签测量并换行，保留完整内容。';
    bindAnnotations(
      graph,
      [
        { type: 'point', data: { name: 'A' }, label: explanation, labelFontSize: 14 },
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
    expect(Math.abs(labels[0].position[1] - labels[1].position[1])).toBeGreaterThanOrEqual(44);
    expect(labels[2].position).toEqual([60, 120]);
  });

  it('rejects ambiguous selectors and unsupported axes before accessing the canvas', () => {
    const { graph } = setup();
    const invalid: unknown[] = [
      { type: 'point', data: {} },
      { type: 'point', data: { name: 'unknown' } },
      { type: 'range', data: { name: ['A', 'B'] } },
      { type: 'line', data: { name: 'A' } },
      { type: 'line', data: [] },
      { type: 'line', data: [{ name: 'A' }] },
      { type: 'connector', data: [{ name: 'A' }] },
      { type: 'text', data: { name: 'A' } },
      { type: 'point', data: { name: 'A' }, label: 1 },
    ];
    const ambiguous = { ...data, nodes: [...data.nodes, { name: 'A' }] };
    expect(() =>
      bindAnnotations(
        graph,
        [{ type: 'point', data: { name: 'A' } }],
        ambiguous,
        ['internal-edge'],
        defaults,
      ),
    ).toThrow('matches 2 objects');
    for (const annotation of invalid)
      expect(() =>
        bindAnnotations(
          graph,
          [annotation as GraphAnnotation<GraphData['nodes'][number] | GraphData['edges'][number]>],
          data,
          ['internal-edge'],
          defaults,
        ),
      ).toThrow('Invalid annotation:');
    expect(graph.getCanvas).not.toHaveBeenCalled();
  });

  it('follows theme point geometry and rejects unsupported shapes', () => {
    const { graph, shapes, emit } = setup();
    bindAnnotations(graph, [{ type: 'point', data: { name: 'A' } }], data, ['internal-edge'], {
      ...defaults,
      shape: 'hollowSquare',
    });
    emit('afterrender');
    expect(shapes()[0].tag).toBe('rect');
    expect(shapes()[0].attributes.fill).toBe('none');
    const invalid = setup();
    const cleanup = bindAnnotations(
      invalid.graph,
      [{ type: 'point', data: { name: 'A' } }],
      data,
      ['internal-edge'],
      { ...defaults, shape: 'triangleDown' },
    );
    expect(() => invalid.emit('afterrender')).toThrow('unsupported theme point shape triangleDown');
    cleanup();
  });
});
