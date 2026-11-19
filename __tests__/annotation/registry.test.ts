import { afterEach, describe, expect, it, vi } from 'vitest';
import { path, point } from '../../src/annotation/components';
import { createAnnotationRenderer } from '../../src/annotation/registry';
import type { G2AnnotationContext } from '../../src/annotation/runtime';
import type { ChartAnnotation } from '../../src/types/annotation';

type Row = { value: number };
const annotations: ChartAnnotation<Row>[] = [
  { type: 'point', data: { value: 1 }, label: 'point1' },
  { type: 'point', data: { value: 2 }, label: 'point2' },
  { type: 'path', data: { value: 3 }, label: 'path1' },
  { type: 'point', data: { value: 4 }, label: 'point3' },
  { type: 'path', data: { value: 5 }, label: 'path2' },
];

function renderGroups() {
  const groups: (string | undefined)[][] = [];
  for (const component of [path, point]) {
    vi.spyOn(component, 'g2').mockImplementation((annotations: { label?: string }[]) => {
      groups.push(annotations.map(({ label }) => label));
      return {};
    });
  }
  createAnnotationRenderer('g2')(annotations, {} as G2AnnotationContext<Row>);
  return groups;
}

describe('annotation component grouping', () => {
  afterEach(() => {
    delete path.grouping;
    delete point.grouping;
    vi.restoreAllMocks();
  });

  it.each([undefined, 'consecutive'] as const)(
    'preserves consecutive drawing order with grouping=%s',
    (grouping) => {
      path.grouping = grouping;
      point.grouping = grouping;
      expect(renderGroups()).toEqual([['point1', 'point2'], ['path1'], ['point3'], ['path2']]);
    },
  );

  it('lets multiple components independently collect their type at its first occurrence', () => {
    path.grouping = 'byType';
    point.grouping = 'byType';
    expect(renderGroups()).toEqual([
      ['point1', 'point2', 'point3'],
      ['path1', 'path2'],
    ]);
  });
});
