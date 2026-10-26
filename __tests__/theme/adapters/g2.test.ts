import { stdlib } from '@antv/g2';
import { describe, expect, it } from 'vitest';
import { getThemeObject } from '../../../src/theme';
import { G2_BUILT_IN_MARK_SHAPES } from '../../../src/theme/adapters/g2';

const base = { version: '1', id: 'test', label: 'Test' } as const;
const sorted = (values: readonly string[]) => [...values].sort();

describe('G2 theme adapter', () => {
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

  it('matches the registered G2 shapes exposed by stdlib', () => {
    const library = stdlib();

    for (const mark of [
      'line',
      'area',
      'point',
      'interval',
      'box',
      'text',
      'path',
      'density',
      'link',
      'connector',
    ] as const) {
      expect(sorted(G2_BUILT_IN_MARK_SHAPES[mark])).toEqual(
        sorted(Object.keys(library[`mark.${mark}`].props!.shape!)),
      );
    }
  });
});
