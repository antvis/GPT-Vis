import { describe, expect, it } from 'vitest';

import {
  adaptG2CartesianAxis,
  adaptG2ColorLegend,
  adaptG2DataLabels,
  adaptG2MarkStyle,
  adaptG2Title,
  adaptG6ElementStyle,
  adaptG6Title,
  adaptTableBorderStyle,
  adaptTableCellStyle,
  adaptTableSubtitleStyle,
  adaptTableTitleStyle,
  getG6TitlePadding,
} from '../src/theme';

describe('theme renderer adapters', () => {
  it('moves G2 shape and size channels out of mark style', () => {
    expect(
      adaptG2MarkStyle(
        'point',
        {},
        {
          shape: 'circle',
          size: 8,
          stroke: '#6d8cff',
          lineWidth: 2,
        },
      ),
    ).toEqual({
      encode: { shape: 'circle', size: 8 },
      style: { stroke: '#6d8cff', lineWidth: 2 },
    });

    expect(
      adaptG2MarkStyle('interval', {}, { lineWidth: 3, inset: 12, cursor: 'crosshair' }),
    ).toEqual({
      encode: {},
      style: { lineWidth: 3 },
    });
  });

  it('combines G2 title content with subtitle and visual styles', () => {
    expect(
      adaptG2Title('Revenue', 'FY 2026', {
        spacing: 12,
        subtitleFill: '#64748b',
      }),
    ).toEqual({
      title: 'Revenue',
      subtitle: 'FY 2026',
      spacing: 12,
      subtitleFill: '#64748b',
    });
  });

  it('lets an authored interval radius replace chart corner defaults', () => {
    const defaults = { radiusTopLeft: 4, radiusTopRight: 4, fill: '#123456' };
    expect(adaptG2MarkStyle('interval', defaults).style).toEqual(defaults);
    expect(adaptG2MarkStyle('interval', defaults, { radius: 0 }).style).toEqual({
      fill: '#123456',
      radius: 0,
    });
    expect(adaptG2MarkStyle('interval', defaults, { radius: 14, radiusTopLeft: 2 }).style).toEqual({
      fill: '#123456',
      radius: 14,
      radiusTopLeft: 2,
    });
  });

  it('combines chart axis defaults with one shared visual style', () => {
    expect(
      adaptG2CartesianAxis({
        axisXTitle: 'Time',
        axisYTitle: 'Value',
        defaults: { x: { labelAutoRotate: false }, y: { grid: true } },
        style: { labelFill: '#94a3b8' },
      }),
    ).toEqual({
      x: { labelAutoRotate: false, title: 'Time', labelFill: '#94a3b8' },
      y: { grid: true, title: 'Value', labelFill: '#94a3b8' },
    });
  });

  it('preserves G2 legend visibility and optional titles', () => {
    expect(adaptG2ColorLegend(true, { itemLabelFill: '#f8fafc' }, 'Series')).toEqual({
      color: { title: 'Series', itemLabelFill: '#f8fafc' },
    });
    expect(adaptG2ColorLegend(false, { itemLabelFill: '#f8fafc' })).toBe(false);
  });

  it('keeps label placement chart-owned while adapting visibility and visual styles', () => {
    expect(
      adaptG2DataLabels({
        style: {
          fill: '#f8fafc',
          fontSize: 13,
          position: 'outside',
          transform: [{ type: 'overlapHide' }],
        } as any,
        visible: true,
        text: 'value',
        position: 'top',
        dx: -4,
        dy: 0,
      }),
    ).toEqual([
      {
        text: 'value',
        position: 'top',
        dx: -4,
        dy: 0,
        fill: '#f8fafc',
        fontSize: 13,
      },
    ]);
    expect(adaptG2DataLabels({ visible: false, text: 'value', position: 'top' })).toEqual([]);
    expect(
      adaptG2DataLabels({
        defaultVisible: true,
        text: 'value',
        position: 'inside',
        contrast: 'inside',
        tokens: { colorText: '#111827', colorTextInverse: '#ffffff' },
      }),
    ).toEqual([
      {
        text: 'value',
        position: 'inside',
        transform: [{ type: 'contrastReverse', palette: ['#111827', '#ffffff'] }],
        fill: '#ffffff',
      },
    ]);
    expect(
      adaptG2DataLabels({
        style: { fill: '#f8fafc' },
        text: 'value',
        position: 'top',
      }),
    ).toBeUndefined();
    expect(adaptG2DataLabels({ text: 'value', position: 'top' })).toBeUndefined();
  });

  it('separates G6 element type from renderer visual style', () => {
    expect(
      adaptG6ElementStyle(
        'node',
        {},
        {
          type: 'diamond',
          fill: '#6d8cff',
          lineWidth: 3,
          cursor: 'crosshair',
        },
      ),
    ).toEqual({
      type: 'diamond',
      style: { fill: '#6d8cff', lineWidth: 3 },
    });
  });

  it('adapts shared title styles to the G6 title plugin', () => {
    expect(
      adaptG6Title(
        'Revenue',
        'FY 2026',
        { align: 'center', titleFontSize: 20 },
        { titleFill: '#111827' },
      ),
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
    expect(adaptG6Title(undefined, undefined)).toEqual([]);
  });

  it('reserves title canvas and graph space for large G6 typography', () => {
    const style = { titleFontSize: 40, subtitleFontSize: 20, spacing: 20 };
    const plugins = adaptG6Title('Revenue', 'FY 2026', style) as Record<string, any>[];
    const size = plugins[0].size;
    const padding = getG6TitlePadding('Revenue', 'FY 2026', style) as number[];

    expect(size).toBeGreaterThanOrEqual(80);
    expect(padding[0]).toBeGreaterThanOrEqual(size + 16);
    expect(getG6TitlePadding(undefined, undefined, style)).toBe(20);
    expect(getG6TitlePadding('Revenue', undefined)).toEqual([46, 20, 20, 20]);
  });

  it('adapts table styles to safe DOM declarations', () => {
    expect(adaptTableTitleStyle({ align: 'right', titleFill: '#111827' })).toEqual({
      color: '#111827',
      textAlign: 'right',
    });
    expect(
      adaptTableCellStyle({
        fill: '#334155',
        padding: [8, 12],
        fontSize: 14,
      }),
    ).toEqual({
      color: '#334155',
      padding: '8px 12px',
      fontSize: '14px',
    });
    expect(adaptTableBorderStyle({ color: '#cbd5e1', radius: 8 })).toEqual({
      table: {
        borderColor: '#cbd5e1',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '8px',
      },
      cell: {
        borderBottomColor: '#cbd5e1',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
      },
    });
    expect(
      adaptTableSubtitleStyle({
        align: 'center',
        spacing: 10,
        subtitleFill: '#64748b',
        subtitleFontSize: 12,
      }),
    ).toEqual({
      color: '#64748b',
      fontSize: '12px',
      marginTop: '10px',
      textAlign: 'center',
    });
  });
});
