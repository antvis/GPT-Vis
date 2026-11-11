import { describe, expect, it } from 'vitest';
import { getConnectorGeometry, type Point } from '../../src/annotation/shared';
import { getAnnotationDefaults } from '../../src/theme/annotation';

const defaults = getAnnotationDefaults('line').connector;
const view: Point = [400, 300];

describe('connector geometry', () => {
  it('keeps directed endpoints and a stable curve side when input order reverses', () => {
    const a: Point = [40, 240];
    const b: Point = [320, 60];
    const curve = getConnectorGeometry(a, b, { shape: 'curve' }, view, defaults);
    const reverse = getConnectorGeometry(b, a, { shape: 'curve' }, view, defaults);
    expect(curve.points[0]).toEqual(a);
    expect(curve.points.at(-1)).toEqual(b);
    expect(curve.anchor[0]).toBeLessThan((a[0] + b[0]) / 2);
    expect(curve.anchor[1]).toBeLessThan((a[1] + b[1]) / 2);
    expect(reverse.anchor).toEqual(curve.anchor);
    expect(reverse.points).toEqual([...curve.points].reverse());
    expect(curve.path[1][0]).toBe('Q');
    expect(curve.arrows).toBe('end');
  });

  it('bends into the plot at its top boundary and keeps coincident anchors finite', () => {
    const curve = getConnectorGeometry([20, 0], [380, 0], { shape: 'curve' }, view, defaults);
    expect(curve.points.every(([, y]) => y >= 0 && y <= view[1])).toBe(true);
    const same = getConnectorGeometry([20, 30], [20, 30], { shape: 'curve' }, view, defaults);
    expect(same.points).toEqual([
      [20, 30],
      [20, 30],
    ]);
    expect(same.anchor).toEqual([20, 30]);
  });

  it.each(['horizontal', 'vertical'] as const)(
    'projects a dimension along its %s span with separate witness lines',
    (orientation) => {
      const a: Point = [80, 220];
      const b: Point = [300, 100];
      const geometry = getConnectorGeometry(
        a,
        b,
        { shape: 'dimension', orientation },
        view,
        defaults,
      );
      const axis = orientation === 'horizontal' ? 0 : 1;
      const [p, q] = geometry.points;
      expect(p[axis]).toBe(a[axis]);
      expect(q[axis]).toBe(b[axis]);
      expect(p[1 - axis]).toBe(q[1 - axis]);
      expect(geometry.guides[0]).toEqual(['M', ...a]);
      expect(geometry.guides[2]).toEqual(['M', ...b]);
      expect(geometry.arrows).toBe('both');
      expect(geometry.segments).toHaveLength(3);
      expect(geometry.anchor).toEqual([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]);
    },
  );

  it.each(['horizontal', 'vertical'] as const)(
    'draws a %s bracket with orthogonal arms and no arrows',
    (orientation) => {
      const a: Point = [80, 220];
      const b: Point = [300, 100];
      const geometry = getConnectorGeometry(
        a,
        b,
        { shape: 'bracket', orientation },
        view,
        defaults,
      );
      expect(geometry.points[0]).toEqual(a);
      expect(geometry.points.at(-1)).toEqual(b);
      expect(geometry.segments.every(([p, q]) => p[0] === q[0] || p[1] === q[1])).toBe(true);
      expect(geometry.guides).toEqual([]);
      expect(geometry.arrows).toBe('none');
    },
  );

  it('places comparison lanes inside the plot when the preferred side has no room', () => {
    const vertical = getConnectorGeometry(
      [390, 50],
      [380, 250],
      { shape: 'dimension' },
      view,
      defaults,
    );
    expect(vertical.points.every(([x]) => x >= 0 && x < 380)).toBe(true);
    const horizontal = getConnectorGeometry(
      [50, 0],
      [350, 10],
      { shape: 'bracket' },
      view,
      defaults,
    );
    expect(horizontal.points.slice(1, 3).every(([, y]) => y > 10 && y <= view[1])).toBe(true);
  });
});
