import { describe, expect, it } from 'vitest';
import { getThemeObject } from '../../src/theme/table';

const base = { id: 'test', label: 'Test' } as const;

describe('Table theme adapter', () => {
  it.each(['default', 'light', 'dark', 'academy'] as const)(
    'keeps the default table borders for the %s theme',
    (theme) => {
      expect(getThemeObject('table', theme).border).toEqual({ table: {}, cell: {} });
    },
  );

  it('keeps default borders when custom themes only change text or colors', () => {
    const appearance = getThemeObject('table', {
      ...base,
      tokens: { colorText: '#334155', colorSurface: '#f8fafc' },
      style: { table: { border: {} } },
    });
    expect(appearance.border).toEqual({ table: {}, cell: {} });
    expect(appearance.cell).toMatchObject({ color: '#334155', backgroundColor: '#f8fafc' });
  });

  it('preserves explicit zero-width borders', () => {
    const appearance = getThemeObject('table', base, { table: { border: { width: 0 } } });
    expect(appearance.border.table.borderWidth).toBe('0px');
    expect(appearance.border.cell.borderBottomWidth).toBe('0px');
  });

  it('adapts table styles to safe DOM declarations', () => {
    const appearance = getThemeObject('table', base, {
      title: {
        align: 'right',
        titleFill: '#111827',
        spacing: 10,
        subtitleFill: '#64748b',
        subtitleFontSize: 12,
      },
      table: {
        cell: { fill: '#334155', padding: [8, 12], fontSize: 14 },
        border: { color: '#cbd5e1', radius: 8 },
      },
    });
    expect(appearance.title).toEqual({ color: '#111827', textAlign: 'right' });
    expect(appearance.cell).toEqual({ color: '#334155', padding: '8px 12px', fontSize: '14px' });
    expect(appearance.border).toEqual({
      table: {
        borderColor: '#cbd5e1',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '8px',
      },
      cell: { borderBottomColor: '#cbd5e1', borderBottomWidth: '1px', borderBottomStyle: 'solid' },
    });
    expect(appearance.subtitle).toEqual({
      color: '#64748b',
      fontSize: '12px',
      marginTop: '10px',
      textAlign: 'right',
    });
  });
});
