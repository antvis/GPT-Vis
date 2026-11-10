import { describe, expect, it } from 'vitest';
import { bindAnnotations } from '../../src/annotation/table';
import { getAnnotationDefaults } from '../../src/theme/annotation';
import type { HighlightAnnotation } from '../../src/types/annotation';

const defaults = getAnnotationDefaults('table');
const data = [
  { product: 'A', revenue: 120, group: 'One' },
  { product: 'B', revenue: 240, group: 'Two' },
  { product: 'A', revenue: 180, group: 'Two' },
];

function setup() {
  const cell = () => ({
    style: {} as Record<string, string>,
    getAttribute: () => null,
    removeAttribute() {
      this.style = {};
    },
  });
  const headers = data.map(cell);
  const rows = data.map(() => ({ children: data.map(cell) }));
  const cells = [...headers, ...rows.flatMap((row) => row.children)];
  const content = {
    querySelectorAll: (selector: string) =>
      selector === 'th' ? headers : selector === 'tbody tr' ? rows : cells,
  } as unknown as HTMLElement;
  const bind = (annotations: HighlightAnnotation<Record<string, unknown>>[]) =>
    bindAnnotations({} as HTMLElement, content, data, annotations, defaults);
  const selected = () =>
    cells.map((cell, index) => (cell.style.boxShadow ? index : -1)).filter((index) => index !== -1);
  return { bind, cells, selected };
}

describe('table highlight', () => {
  it('selects all matching business rows, columns including headers, and individual cells', () => {
    const row = setup();
    row.bind([{ type: 'highlight', data: { product: 'A' } }]);
    expect(row.selected()).toEqual([3, 4, 5, 9, 10, 11]);
    const column = setup();
    column.bind([{ type: 'highlight', field: 'revenue' }]);
    expect(column.selected()).toEqual([1, 4, 7, 10]);
    const cell = setup();
    cell.bind([{ type: 'highlight', data: { product: 'B' }, field: 'revenue' }]);
    expect(cell.selected()).toEqual([7]);
  });

  it('unions batches and annotations before dimming, and restores original styles on cleanup', () => {
    const { bind, cells, selected } = setup();
    const cleanup = bind([
      {
        type: 'highlight',
        data: [{ product: 'A' }, { group: 'One' }],
        field: 'revenue',
        dimOpacity: 0.3,
      },
      { type: 'highlight', data: { product: 'B' }, field: 'product', dimOpacity: 0.6 },
    ]);
    expect(selected()).toEqual([4, 6, 10]);
    expect(cells[0].style.opacity).toBe('0.3');
    expect(cells[6].style.opacity).toBeUndefined();
    cleanup();
    expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
  });

  it.each([
    { type: 'highlight', field: 'missing' },
    { type: 'highlight', data: { product: 'missing' } },
    { type: 'highlight', data: {} },
    { type: 'highlight', data: [] },
    { type: 'highlight' },
    { type: 'point', data: { product: 'A' } },
  ])('rejects invalid targets before changing any cells: %j', (annotation) => {
    const { bind, cells } = setup();
    expect(() => bind([annotation as HighlightAnnotation<Record<string, unknown>>])).toThrow(
      'Invalid annotation:',
    );
    expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
  });
});
