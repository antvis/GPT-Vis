import { describe, expect, it } from 'vitest';
import { bindAnnotations } from '../../src/annotation';
import type { RendererAnnotation } from '../../src/annotation/registry';
import { getAnnotationDefaults } from '../../src/theme/annotation';

const defaults = getAnnotationDefaults('table');
const data = [
  { product: 'A', revenue: 120, group: 'One' },
  { product: 'B', revenue: 240, group: 'Two' },
  { product: 'A', revenue: 180, group: 'Two' },
];

function setup(source: Record<string, unknown>[] = data) {
  const cell = () => ({
    style: {} as Record<string, string>,
    getAttribute: () => null,
    removeAttribute() {
      this.style = {};
    },
  });
  const fields = Object.keys(source[0]);
  const headers = fields.map(cell);
  const rows = source.map(() => ({ children: fields.map(cell) }));
  const cells = [...headers, ...rows.flatMap((row) => row.children)];
  const content = {
    querySelectorAll: (selector: string) =>
      selector === 'th' ? headers : selector === 'tbody tr' ? rows : cells,
  } as unknown as HTMLElement;
  const bind = (annotations: RendererAnnotation<Record<string, unknown>, 'table'>[]) =>
    bindAnnotations({
      renderer: 'table',
      container: {} as HTMLElement,
      content,
      data: source,
      annotations,
      defaults,
    });
  const selected = () =>
    cells.map((cell, index) => (cell.style.boxShadow ? index : -1)).filter((index) => index !== -1);
  return { bind, cells, selected };
}

describe('table highlight', () => {
  it('paints automatic outliers and explicit targets together and restores both on cleanup', () => {
    const source = [0, 2, 4, 6, 8, 18].map((revenue, index) => ({
      product: String(index),
      revenue,
    }));
    const { bind, selected, cells } = setup(source);
    const cleanup = bind([
      {
        type: 'outlier',
        label: '',
        style: { dimOpacity: 0.5 },
        data: { field: 'revenue', column: 'revenue' },
      },
      { type: 'highlight', data: { row: { product: '0' }, column: 'product' } },
    ]);
    expect(selected()).toEqual([2, 13]);
    expect(cells[12].style.opacity).toBe('0.5');
    cleanup();
    expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
  });

  it('unions ranking, interval, caller-selected and explicit highlights before dimming', () => {
    const { bind, cells, selected } = setup();
    const cleanup = bind([
      {
        type: 'topN',
        label: '',
        style: { dimOpacity: 0.4 },
        n: 1,
        data: { field: 'revenue', column: 'revenue' },
      },
      {
        type: 'rangeInside',
        label: '',
        style: { dimOpacity: 0.2 },
        range: [120, 120],
        data: { field: 'revenue', column: 'revenue' },
      },
      { type: 'highlight', label: '', data: { row: { group: 'Two' }, column: 'product' } },
      { type: 'highlight', data: { row: { product: 'A', group: 'Two' }, column: 'group' } },
    ]);
    expect(selected()).toEqual([4, 6, 7, 9, 11]);
    expect(cells[0].style.opacity).toBe('0.2');
    expect(cells[7].style.opacity).toBeUndefined();
    cleanup();
    expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
  });

  it('preserves exact ranking counts when original rows are identical', () => {
    const source = [{ ...data[0] }, { ...data[0] }, data[1]];
    const { bind, selected } = setup(source);
    const cleanup = bind([{ type: 'bottomN', label: '', n: 1, data: { field: 'revenue' } }]);
    expect(selected()).toEqual([3, 4, 5]);
    cleanup();
    bind([{ type: 'highlight', data: { row: source[0] } }]);
    expect(selected()).toEqual([3, 4, 5, 6, 7, 8]);
  });

  it('rejects an invalid computed selection before applying an explicit highlight', () => {
    const { bind, cells } = setup();
    expect(() =>
      bind([
        { type: 'highlight', data: { row: { product: 'A' } } },
        { type: 'topN', n: 0, data: { field: 'revenue' } },
      ]),
    ).toThrow('positive integer');
    expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
  });

  it.each([-1, 2, NaN])('rejects invalid dim opacity %s before changing cells', (dimOpacity) => {
    const { bind, cells } = setup();
    expect(() =>
      bind([{ type: 'highlight', data: { row: { product: 'A' } }, style: { dimOpacity } }]),
    ).toThrow('dimOpacity');
    expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
  });

  it('applies explicit appearance to selected cells without changing their content', () => {
    const { bind, cells } = setup();
    bind([
      {
        type: 'highlight',
        data: { row: { product: 'B' }, column: 'revenue' },
        style: { fill: '#123456', fillOpacity: 0.4, stroke: '#abcdef', lineWidth: 3 },
      },
    ]);
    expect(cells[7].style.background).toContain('#123456 40%');
    expect(cells[7].style.boxShadow).toBe('inset 0 -3px #abcdef');
  });
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
    expect(() =>
      bind([annotation as RendererAnnotation<Record<string, unknown>, 'table'>]),
    ).toThrow('Invalid annotation:');
    expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
  });

  it.each(['point', 'toString'])(
    'rejects unsupported type %s before highlighting any cells',
    (type) => {
      const { bind, cells } = setup();
      const annotations = [
        { type: 'highlight', data: { row: { product: 'A' } } },
        { type, data: { product: 'B' } },
      ] as RendererAnnotation<Record<string, unknown>, 'table'>[];
      expect(() => bind(annotations)).toThrow(`Unsupported table annotation type: ${type}.`);
      expect(cells.every((cell) => Object.keys(cell.style).length === 0)).toBe(true);
    },
  );
});
