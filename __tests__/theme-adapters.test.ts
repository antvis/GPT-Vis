import { describe, expect, it } from 'vitest';
import { getThemeObject } from '../src/theme';

const base = { version: '1', id: 'test', label: 'Test' } as const;

describe('theme renderer adapters', () => {
  it('moves G2 shape and size channels out of mark style and filters unknown fields', () => {
    const appearance = getThemeObject('scatter', base, {
      style: { mark: { point: { shape: 'circle', size: 8, stroke: '#6d8cff', lineWidth: 2 } } },
    });
    expect(appearance.mark.point).toEqual({
      encode: { shape: 'circle', size: 8 },
      style: { stroke: '#6d8cff', lineWidth: 2, fillOpacity: 0.88 },
    });
    expect(
      getThemeObject('column', base, {
        style: { mark: { interval: { lineWidth: 3, inset: 12, cursor: 'crosshair' } as any } },
      }).mark.interval,
    ).toMatchObject({ encode: {}, style: { lineWidth: 3 } });
    const interval = getThemeObject('column', base, {
      style: { mark: { interval: { cursor: 'crosshair', inset: 12 } as any } },
    }).mark.interval.style;
    expect(interval).not.toHaveProperty('cursor');
    expect(interval).not.toHaveProperty('inset');
  });

  it('combines G2 title content with subtitle and visual styles', () => {
    expect(
      getThemeObject('line', base, {
        title: 'Revenue',
        subtitle: 'FY 2026',
        style: { title: { spacing: 12, subtitleFill: '#64748b' } },
      }).title,
    ).toEqual({ title: 'Revenue', subtitle: 'FY 2026', spacing: 12, subtitleFill: '#64748b' });
  });

  it('lets an authored interval radius replace chart corner defaults', () => {
    expect(getThemeObject('column', base).mark.interval.style).toMatchObject({
      radiusTopLeft: 4,
      radiusTopRight: 4,
    });
    expect(
      getThemeObject('column', base, { style: { mark: { interval: { radius: 0 } } } }).mark.interval
        .style,
    ).toEqual({ fill: '#5B6CFF', radius: 0, columnWidthRatio: 0.64 });
    expect(
      getThemeObject('column', base, {
        style: { mark: { interval: { radius: 14, radiusTopLeft: 2 } } },
      }).mark.interval.style,
    ).toEqual({ fill: '#5B6CFF', radius: 14, radiusTopLeft: 2, columnWidthRatio: 0.64 });
  });

  it('combines chart axis defaults with one shared visual style', () => {
    expect(
      getThemeObject('line', base, {
        defaults: {
          axis: {
            axisXTitle: 'Time',
            axisYTitle: 'Value',
            defaults: { x: { labelAutoRotate: false }, y: { grid: true } },
          },
        },
        style: { axis: { labelFill: '#94a3b8' } },
      }).axis,
    ).toEqual({
      x: { labelAutoRotate: false, title: 'Time', labelFill: '#94a3b8' },
      y: { grid: true, title: 'Value', labelFill: '#94a3b8' },
    });
  });

  it('preserves G2 legend visibility and optional titles', () => {
    expect(
      getThemeObject('line', base, {
        defaults: { legend: { visible: true, title: 'Series' } },
        style: { legend: { itemLabelFill: '#f8fafc' } },
      }).legend,
    ).toEqual({ color: { title: 'Series', itemLabelFill: '#f8fafc' } });
    expect(
      getThemeObject('line', base, {
        defaults: { legend: { visible: false } },
        style: { legend: { itemLabelFill: '#f8fafc' } },
      }).legend,
    ).toBe(false);
  });

  it('keeps label placement chart-owned while adapting visibility and visual styles', () => {
    expect(
      getThemeObject('column', base, {
        style: {
          label: {
            fill: '#f8fafc',
            fontSize: 13,
            position: 'outside',
            transform: [{ type: 'overlapHide' }],
          } as any,
        },
        defaults: { labels: { visible: true, text: 'value', position: 'top', dx: -4, dy: 0 } },
      }).labels,
    ).toEqual([{ text: 'value', position: 'top', dx: -4, dy: 0, fill: '#f8fafc', fontSize: 13 }]);
    expect(
      getThemeObject('column', base, {
        defaults: { labels: { visible: false, text: 'value', position: 'top' } },
      }).labels,
    ).toEqual([]);
    expect(
      getThemeObject(
        'column',
        { ...base, tokens: { colorText: '#111827', colorTextInverse: '#ffffff' } },
        {
          defaults: {
            labels: { defaultVisible: true, text: 'value', position: 'inside', contrast: 'inside' },
          },
        },
      ).labels,
    ).toEqual([
      {
        text: 'value',
        position: 'inside',
        transform: [{ type: 'contrastReverse', palette: ['#111827', '#ffffff'] }],
        fill: '#ffffff',
      },
    ]);
    expect(
      getThemeObject('column', base, {
        style: { label: { fill: '#f8fafc' } },
        defaults: { labels: { text: 'value', position: 'top' } },
      }).labels,
    ).toBeUndefined();
    expect(
      getThemeObject('column', base, { defaults: { labels: { text: 'value', position: 'top' } } })
        .labels,
    ).toBeUndefined();
  });

  it('separates G6 element type from renderer visual style', () => {
    expect(
      getThemeObject('network-graph', base, {
        style: {
          node: { type: 'diamond', fill: '#6d8cff', lineWidth: 3, cursor: 'crosshair' } as any,
        },
      }).node,
    ).toEqual({ type: 'diamond', style: { fill: '#6d8cff', lineWidth: 3 } });
  });

  it('adapts shared title styles to the G6 title plugin', () => {
    expect(
      getThemeObject('network-graph', base, {
        title: 'Revenue',
        subtitle: 'FY 2026',
        style: { title: { align: 'center', titleFontSize: 20, titleFill: '#111827' } },
      }).plugins,
    ).toMatchObject([
      {
        key: 'title',
        type: 'title',
        title: 'Revenue',
        subtitle: 'FY 2026',
        titleFill: '#111827',
        align: 'center',
        titleFontSize: 20,
      },
    ]);
    expect(getThemeObject('network-graph', base).plugins).toEqual([]);
  });

  it('reserves title canvas and graph space for large G6 typography', () => {
    const appearance = getThemeObject('network-graph', base, {
      title: 'Revenue',
      subtitle: 'FY 2026',
      style: { title: { titleFontSize: 40, subtitleFontSize: 20, spacing: 20 } },
    });
    const size = (appearance.plugins as Record<string, any>[])[0].size;
    expect(size).toBeGreaterThanOrEqual(80);
    expect((appearance.padding as number[])[0]).toBeGreaterThanOrEqual(size + 16);
    expect(getThemeObject('network-graph', base).padding).toBe(20);
    expect(getThemeObject('network-graph', base, { title: 'Revenue' }).padding).toEqual([
      46, 20, 20, 20,
    ]);
  });

  it('adapts table styles to safe DOM declarations', () => {
    const appearance = getThemeObject('table', base, {
      style: {
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
