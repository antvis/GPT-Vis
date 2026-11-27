import { describe, expect, it } from 'vitest';
import { connector } from '../../../src/annotation/components/connector';
import type { Point, Segment } from '../../../src/annotation/layout';
import { renderAnnotations, type RendererAnnotation } from '../../../src/annotation/registry';
import type { G6AnnotationContext } from '../../../src/annotation/runtime';
import { getAnnotationDefaults } from '../../../src/theme/annotation';

describe('connector shapes', () => {
  it('draws a brace between endpoints with an outward anchor', () => {
    const top = connector.brace([20, 18], [80, 18], 'top');
    expect(top.paths).toHaveLength(1);
    expect(top.anchor).toEqual([50, 12]);
    expect(top.paths[0][0][0]).toBe(20);
    expect(top.paths[0].at(-1)![0]).toBe(80);
    const right = connector.brace([92, 30], [92, 80], 'right');
    expect(right.anchor).toEqual([98, 55]);
    expect(right.paths[0].every(([x]) => x > 80)).toBe(true);
    const same = connector.brace([20, 30], [20, 30], 'top');
    expect(same.paths.flat(2).every(Number.isFinite)).toBe(true);
  });

  it.each([
    [0.1, 0.4],
    [0.8, 1.2],
    [0, 1],
  ] as Point[])('draws one arc for the supplied range %s–%s', (start, end) => {
    const arc = connector.arc(
      [100, 100],
      (angle) => [
        100 + 60 * Math.cos(angle * Math.PI * 2),
        100 + 60 * Math.sin(angle * Math.PI * 2),
      ],
      [start, end],
    );
    expect(arc.paths).toHaveLength(1);
    expect(arc.paths.flat(2).every(Number.isFinite)).toBe(true);
    const path = arc.paths[0];
    const angles = path.map(([x, y]) => (Math.atan2(y - 100, x - 100) / (Math.PI * 2) + 1) % 1);
    expect(
      angles.every((angle) =>
        [angle - 1, angle, angle + 1].some((turn) => turn >= start && turn <= end),
      ),
    ).toBe(true);
    expect(path.every(([x, y]) => Math.hypot(x - 100, y - 100) > 60)).toBe(true);
  });
});

type Connector = Extract<RendererAnnotation<{ id: string }, 'g6'>, { type: 'connector' }>;
type Path = (['M' | 'L', number, number] | ['Q', number, number, number, number])[];
const view: Point = [400, 300];

// Record the native paths and label anchor produced by the component's public entry.
function draw(a: Point, b: Point, options: Pick<Connector, 'shape' | 'orientation'>) {
  class Shape {
    children: Shape[] = [];
    constructor(public style: Record<string, unknown>) {}
    appendChild(child: Shape) {
      this.children.push(child);
    }
  }
  const root = new Shape({});
  const segments: Segment[] = [];
  let anchor: Point | undefined;
  renderAnnotations(
    'g6',
    [{ type: 'connector', data: [{ id: 'a' }, { id: 'b' }], label: 'Comparison', ...options }],
    {
      chartType: 'network-graph',
      data: [{ id: 'a' }, { id: 'b' }],
      scene: {
        createElement: (_tag: string, { style }: { style: Record<string, unknown> }) =>
          new Shape(style),
      },
      root,
      defaults: getAnnotationDefaults('line'),
      size: view,
      segments,
      position: ({ id }: { id?: string }) => (id === 'a' ? a : b),
      label: (_annotation: RendererAnnotation<{ id: string }, 'g6'>, position: Point) => {
        anchor = position;
      },
    } as unknown as G6AnnotationContext<{ id: string }>,
  );
  const paths = root.children[0].children;
  const main = paths[paths.length - 1].style;
  return {
    path: main.d as Path,
    guides: paths.length > 1 ? (paths[0].style.d as Path) : [],
    startArrow: main.markerStart,
    endArrow: main.markerEnd,
    segments,
    anchor,
  };
}

describe('connector rendering', () => {
  it('keeps directed endpoints and a stable curve side when input order reverses', () => {
    const a: Point = [40, 240];
    const b: Point = [320, 60];
    const curve = draw(a, b, { shape: 'curve' });
    const reverse = draw(b, a, { shape: 'curve' });
    expect(curve.path[0]).toEqual(['M', ...a]);
    expect(curve.path[1].slice(-2)).toEqual(b);
    expect(curve.anchor![0]).toBeLessThan((a[0] + b[0]) / 2);
    expect(curve.anchor![1]).toBeLessThan((a[1] + b[1]) / 2);
    expect(reverse.anchor).toEqual(curve.anchor);
    expect(reverse.segments).toEqual([...curve.segments].reverse().map(([p, q]) => [q, p]));
    expect(curve.path[1][0]).toBe('Q');
    expect(curve.startArrow).toBeUndefined();
    expect(curve.endArrow).toBeDefined();
  });

  it('bends into the plot at its top boundary and keeps coincident anchors finite', () => {
    const curve = draw([20, 0], [380, 0], { shape: 'curve' });
    expect(curve.segments.flat().every(([, y]) => y >= 0 && y <= view[1])).toBe(true);
    const same = draw([20, 30], [20, 30], { shape: 'curve' });
    expect(same.path).toEqual([
      ['M', 20, 30],
      ['L', 20, 30],
    ]);
    expect(same.anchor).toEqual([20, 30]);
    expect(same.endArrow).toBeUndefined();
  });

  it.each(['horizontal', 'vertical'] as const)(
    'projects a dimension along its %s span with separate witness lines',
    (orientation) => {
      const a: Point = [80, 220];
      const b: Point = [300, 100];
      const result = draw(a, b, { shape: 'dimension', orientation });
      const axis = orientation === 'horizontal' ? 0 : 1;
      const [p, q] = result.segments[0];
      expect(p[axis]).toBe(a[axis]);
      expect(q[axis]).toBe(b[axis]);
      expect(p[1 - axis]).toBe(q[1 - axis]);
      expect(result.guides[0]).toEqual(['M', ...a]);
      expect(result.guides[2]).toEqual(['M', ...b]);
      expect(result.startArrow).toBeDefined();
      expect(result.endArrow).toBeDefined();
      expect(result.segments).toHaveLength(3);
      expect(result.anchor).toEqual([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]);
    },
  );

  it.each(['horizontal', 'vertical'] as const)(
    'draws a %s bracket with orthogonal arms and no arrows',
    (orientation) => {
      const a: Point = [80, 220];
      const b: Point = [300, 100];
      const result = draw(a, b, { shape: 'bracket', orientation });
      expect(result.path[0]).toEqual(['M', ...a]);
      expect(result.path.at(-1)).toEqual(['L', ...b]);
      expect(result.segments.every(([p, q]) => p[0] === q[0] || p[1] === q[1])).toBe(true);
      expect(result.guides).toEqual([]);
      expect(result.startArrow).toBeUndefined();
      expect(result.endArrow).toBeUndefined();
    },
  );

  it('places comparison lanes inside the plot when the preferred side has no room', () => {
    const vertical = draw([390, 50], [380, 250], { shape: 'dimension' });
    expect(vertical.segments[0].every(([x]) => x >= 0 && x < 380)).toBe(true);
    const horizontal = draw([50, 0], [350, 10], { shape: 'bracket' });
    expect(horizontal.segments[1].every(([, y]) => y > 10 && y <= view[1])).toBe(true);
  });
});
