import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Table } from '../../src/vis/table';
import { MockElement } from '../helpers/renderers';

vi.mock('measury', () => ({ measureText: () => ({ width: 40 }) }));

describe('render - table theme', () => {
  beforeEach(() => {
    vi.stubGlobal('Element', MockElement);
    vi.stubGlobal('document', {
      createElement: () => new MockElement(),
      head: new MockElement(),
      querySelector: () => null,
    });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it('maps table title, cell, border and background styles to DOM styles', () => {
    const container = new MockElement();
    Table({ container: container as unknown as HTMLElement }).render({
      data: [{ Name: 'GPT-Vis', Value: 1 }],
      title: 'Report',
      subtitle: 'Theme test',
      style: {
        backgroundColor: '#fff4df',
        title: {
          titleFill: '#dc2626',
          subtitleFill: '#2563eb',
          spacing: 10,
        },
        table: {
          header: { fill: '#111827', backgroundColor: '#f8fafc', padding: [8, 12] },
          cell: { fill: '#475569', fontSize: 14 },
          border: { color: '#cbd5e1', width: 2, radius: 8 },
        },
      },
    });

    const wrapper = container.children[0];
    expect(wrapper.style).toMatchObject({ backgroundColor: '#fff4df' });
    expect(wrapper.querySelector('.table-title').style).toMatchObject({ color: '#dc2626' });
    expect(wrapper.querySelector('.table-subtitle').style).toMatchObject({
      color: '#2563eb',
      marginTop: '10px',
    });
    expect(wrapper.querySelectorAll('th')[0].style).toMatchObject({
      color: '#111827',
      backgroundColor: '#f8fafc',
      padding: '8px 12px',
    });
    expect(wrapper.querySelectorAll('td')[0].style).toMatchObject({
      color: '#475569',
      fontSize: '14px',
    });
    expect(wrapper.querySelector('table').style).toMatchObject({
      borderColor: '#cbd5e1',
      borderWidth: '2px',
      borderRadius: '8px',
    });
  });
});
