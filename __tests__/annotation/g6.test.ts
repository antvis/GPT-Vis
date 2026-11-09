import type { Graph } from '@antv/g6';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation/g6';
import { getAnnotationDefaults } from '../../src/theme/annotation';
import type { GraphData } from '../../src/types';
import type { GraphAnnotation } from '../../src/types/annotation';

const data: GraphData = {
  nodes: [{ name: 'A' }, { name: 'B' }],
  edges: [{ source: 'A', target: 'B', name: 'link' }],
};
const defaults = getAnnotationDefaults('network-graph', 'dark');
const disconnectResize = vi.fn();

class Element {
  attributes: Record<string, string> = {};
  style: Record<string, string> = { position: '' };
  children: Element[] = [];
  parent?: Element;
  classList = { add: vi.fn() };
  clientWidth = 100;
  scrollWidth = 100;
  clientHeight = 100;
  scrollHeight = 100;
  constructor(public tag: string) {}
  setAttribute(key: string, value: string) {
    this.attributes[key] = value;
  }
  appendChild(child: Element) {
    child.parent = this;
    this.children.push(child);
  }
  replaceChildren(...children: Element[]) {
    this.children = children;
  }
  remove() {
    if (this.parent) this.parent.children = this.parent.children.filter((child) => child !== this);
  }
}

function setup() {
  const listeners = new Map<string, (() => void)[]>();
  let zoom = 1;
  let hidden = false;
  const graph = {
    on: (name: string, callback: () => void) =>
      listeners.set(name, [...(listeners.get(name) ?? []), callback]),
    off: (name: string, callback: () => void) =>
      listeners.set(
        name,
        (listeners.get(name) ?? []).filter((c) => c !== callback),
      ),
    getElementVisibility: () => (hidden ? 'hidden' : 'visible'),
    getElementPosition: () => [10, 20],
    getElementRenderBounds: (id: string) => {
      expect(id).toBe('internal-edge');
      return { center: [30, 40] };
    },
    getViewportByCanvas: ([x, y]: number[]) => [x * zoom, y * zoom],
  } as unknown as Graph;
  const container = new Element('div');
  return {
    graph,
    container,
    listeners,
    shapes: () => container.children[0]?.children[0]?.children ?? [],
    emit: (name: string) => listeners.get(name)?.forEach((fn) => fn()),
    zoom: () => {
      zoom = 2;
    },
    hide: () => {
      hidden = true;
    },
  };
}

describe('G6 annotation mapping', () => {
  beforeEach(() => {
    vi.stubGlobal('document', {
      createElementNS: (_namespace: string, tag: string) => new Element(tag),
    });
    vi.stubGlobal('getComputedStyle', () => ({ position: 'static' }));
    disconnectResize.mockClear();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = vi.fn();
        disconnect = disconnectResize;
      },
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it('maps raw node and edge objects through current viewport geometry without exposing IDs', () => {
    const { graph, container, shapes, emit, zoom, hide } = setup();
    bindAnnotations(
      graph,
      container as unknown as HTMLElement,
      [{ type: 'point', data: [{ name: 'A' }, { source: 'A', target: 'B' }] }],
      data,
      ['internal-edge'],
      defaults,
    );
    expect(shapes()).toHaveLength(0);
    emit('afterrender');
    expect(shapes().map((s) => [s.attributes.cx, s.attributes.cy])).toEqual([
      ['10', '20'],
      ['30', '40'],
    ]);
    zoom();
    emit('aftertransform');
    expect(shapes()[0].attributes).toMatchObject({ cx: '20', cy: '40', r: String(defaults.size) });
    hide();
    emit('afterdraw');
    expect(shapes()).toHaveLength(0);
  });

  it('draws a directed arrow and preserves independent text alignment', () => {
    const { graph, container, shapes, emit } = setup();
    bindAnnotations(
      graph,
      container as unknown as HTMLElement,
      [
        { type: 'connector', data: [{ name: 'A' }, { source: 'A', target: 'B' }] },
        { type: 'text', data: { name: 'A' }, label: 'note' },
      ],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    expect(shapes()[0].attributes.d).toMatch(/^M10,20 L30,40 M/);
    expect(shapes()[0].attributes['stroke-linejoin']).toBe('round');
    expect(shapes()[1].attributes).toMatchObject({ x: '10', y: '20', 'text-anchor': 'middle' });
  });

  it('updates after graph movement and detaches listeners and its layer on cleanup', () => {
    const { graph, container, shapes, emit, listeners, zoom } = setup();
    const cleanup = bindAnnotations(
      graph,
      container as unknown as HTMLElement,
      [{ type: 'point', data: { name: 'A' } }],
      data,
      ['internal-edge'],
      defaults,
    );
    emit('afterrender');
    zoom();
    emit('afterdraw');
    expect(shapes()[0].attributes.cx).toBe('20');
    cleanup();
    expect([...listeners.values()].flat()).toHaveLength(0);
    expect(container.children).toHaveLength(0);
    expect(disconnectResize).toHaveBeenCalledOnce();
  });

  it('rejects ambiguous or unknown data and unsupported axes before creating a layer', () => {
    const { graph, container } = setup();
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
    for (const annotation of invalid)
      expect(() =>
        bindAnnotations(
          graph,
          container as unknown as HTMLElement,
          [annotation as GraphAnnotation<GraphData['nodes'][number] | GraphData['edges'][number]>],
          data,
          ['internal-edge'],
          defaults,
        ),
      ).toThrow('Invalid annotation:');
    expect(container.children).toHaveLength(0);
  });

  it('rejects unimplemented theme shapes instead of drawing a different shape', () => {
    const { graph, container, emit } = setup();
    bindAnnotations(
      graph,
      container as unknown as HTMLElement,
      [{ type: 'point', data: { name: 'A' } }],
      data,
      ['internal-edge'],
      { ...defaults, shape: 'triangleDown' },
    );
    expect(() => emit('afterrender')).toThrow('unsupported theme point shape triangleDown');
  });
});
