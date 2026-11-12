import { describe, expect, it } from 'vitest';
import { bindAnnotations } from '../../src/annotation';
import { getAnnotationDefaults } from '../../src/theme/annotation';
import type { TableAnnotation } from '../../src/types/annotation';

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
  const fields = Object.keys(data[0]);
  const headers = fields.map(cell);
  const rows = data.map(() => ({ children: fields.map(cell) }));
  const cells = [...headers, ...rows.flatMap((row) => row.children)];
  const content = {
    querySelectorAll: (selector: string) =>
      selector === 'th' ? headers : selector === 'tbody tr' ? rows : cells,
  } as unknown as HTMLElement;
  const bind = (annotations: TableAnnotation<Record<string, unknown>>[]) =>
    bindAnnotations({
      renderer: 'table',
      container: {} as HTMLElement,
      content,
      data,
      annotations,
      defaults,
    });
  const selected = () =>
    cells.map((cell, index) => (cell.style.boxShadow ? index : -1)).filter((index) => index !== -1);
  return { bind, cells, selected };
}

describe('table highlight', () => {
  it('selects all matching business rows, columns including headers, and individual cells', () => {
    const row = setup();
    row.bind([{ type: 'highlight', data: { row: { product: 'A' } } }]);
    expect(row.selected()).toEqual([3, 4, 5, 9, 10, 11]);
    const column = setup();
    column.bind([{ type: 'highlight', data: { column: 'revenue' } }]);
    expect(column.selected()).toEqual([1, 4, 7, 10]);
    const cell = setup();
    cell.bind([{ type: 'highlight', data: { row: { product: 'B' }, column: 'revenue' } }]);
    expect(cell.selected()).toEqual([7]);
  });

  it('unions batches and annotations before dimming, and restores original styles on cleanup', () => {
    const { bind, cells, selected } = setup();
    const cleanup = bind([
      {
        type: 'highlight',
        data: [
          { row: { product: 'A' }, column: 'revenue' },
          { row: { group: 'One' }, column: 'revenue' },
        ],
        style: {
          dimOpacity: 0.3,
        },
      },
      {
        type: 'highlight',
        data: { row: { product: 'B' }, column: 'product' },
        style: {
          dimOpacity: 0.6,
        },
      },
    ]);
    expect(selected()).toEqual([4, 6, 10]);
    expect(cells[0].style.opacity).toBe('0.3');
    expect(cells[6].style.opacity).toBeUndefined();
    cleanup();
    expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
  });

  it('uses combined row conditions to distinguish repeated values', () => {
    const { bind, selected } = setup();
    bind([{ type: 'highlight', data: { row: { product: 'A', group: 'Two' } } }]);
    expect(selected()).toEqual([9, 10, 11]);
  });

  it('unions independent row and column targets without crossing their selections', () => {
    const { bind, selected } = setup();
    bind([
      {
        type: 'highlight',
        data: [
          { row: { product: 'A' }, column: 'revenue' },
          { row: { product: 'B' }, column: 'group' },
        ],
      },
    ]);
    expect(selected()).toEqual([4, 8, 10]);
  });

  it.each([
    { type: 'highlight', data: { column: 'missing' } },
    { type: 'highlight', data: { row: { product: 'missing' } } },
    { type: 'highlight', data: { row: {} } },
    { type: 'highlight', data: { row: { missing: undefined } } },
    { type: 'highlight', data: { row: [] } },
    { type: 'highlight', data: { row: null } },
    { type: 'highlight', data: {} },
    { type: 'highlight', data: [] },
    { type: 'highlight', data: [{ row: { product: 'A' } }, { column: 'missing' }] },
    { type: 'highlight' },
  ])('rejects invalid targets before changing any cells: %j', (annotation) => {
    const { bind, cells } = setup();
    expect(() => bind([annotation as TableAnnotation<Record<string, unknown>>])).toThrow(
      'Invalid annotation:',
    );
    expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
  });

  it.each(['point', 'toString'])(
    'rejects unsupported type %s before highlighting any cells',
    (type) => {
      const { bind, cells } = setup();
      const annotations = [
        { type: 'highlight', data: { row: { product: 'A' } } },
        { type, data: { product: 'B' } },
      ] as TableAnnotation<Record<string, unknown>>[];
      expect(() => bind(annotations)).toThrow(`Unsupported table annotation type: ${type}.`);
      expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
    },
  );
});
