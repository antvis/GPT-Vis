import { describe, expect, it } from 'vitest';
import { getThemeObject } from '../../src/theme/g2';
import { getDataLabels } from '../../src/util/components';

const base = { id: 'test', label: 'Test' } as const;

describe('G2 theme mapping', () => {
  it('maps visual mark fields without exposing data, layout or behavior', () => {
    const { mark } = getThemeObject('scatter', base, {
      mark: {
        point: { shape: 'diamond', size: 8, stroke: '#6d8cff', lineWidth: 0, cursor: 'pointer' },
      },
    });
    expect(mark.point).toEqual({ shape: 'diamond', size: 8, stroke: '#6d8cff', lineWidth: 0 });
    const { theme } = getThemeObject('column', base, {
      axis: { grid: false, labelFormatter: 'ignored' },
    });
    expect(theme.axis.grid).toBe(false);
    expect(theme.axis).not.toHaveProperty('labelFormatter');
    expect(theme).not.toHaveProperty('enter');
    expect(theme).not.toHaveProperty('elementHoverScale');
  });

  it('themes tooltips without mutating the next chart’s built-in defaults', () => {
    const baseline = structuredClone(getThemeObject('line', 'dark').theme.tooltip);
    const { theme } = getThemeObject('line', {
      ...base,
      baseTheme: 'dark',
      tokens: {
        colorSurface: '#14242e',
        colorText: '#eefaff',
        colorTextSecondary: '#a1c5d6',
        colorStroke: '#426579',
        fontFamily: 'monospace',
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 24,
        spacingSmall: 0,
        spacingMedium: 14,
        radius: 0,
        lineWidth: 0,
      },
    });
    const css = theme.tooltip!.css as Record<string, Record<string, string>>;
    expect(css['.g2-tooltip']).toMatchObject({
      'background-color': '#14242e',
      color: '#a1c5d6',
      border: '0px solid #426579',
      'border-radius': '0px',
      padding: '0px 14px',
      'font-family': 'monospace',
      'font-size': '15px',
      'font-weight': '500',
      'line-height': '24px',
    });
    expect(css['.g2-tooltip-title']).toMatchObject({
      color: '#a1c5d6',
      'border-bottom': '0px solid #426579',
    });
    expect(css['.g2-tooltip-list-item-value']).toMatchObject({ color: '#eefaff' });
    expect(getThemeObject('line', 'dark').theme.tooltip).toEqual(baseline);
  });

  it('keeps label content and placement chart-owned while preserving theme contrast', () => {
    const { theme } = getThemeObject('column', {
      ...base,
      tokens: { colorText: '#111827', colorTextInverse: '#ffffff' },
      style: { label: { fontSize: 13, position: 'outside', transform: [{ type: 'overlapHide' }] } },
    });
    expect(
      getDataLabels(theme, {
        defaultVisible: true,
        text: 'value',
        position: 'inside',
        contrast: 'inside',
      }),
    ).toEqual([
      {
        text: 'value',
        position: 'inside',
        transform: [{ type: 'contrastReverse', palette: ['#111827', '#ffffff'] }],
        fill: '#ffffff',
        fontSize: 13,
      },
    ]);
    expect(getDataLabels(theme, { visible: false, text: 'value' })).toEqual([]);
    expect(getDataLabels(theme, { text: 'value' })).toBeUndefined();
    const explicit = getThemeObject('column', base, { label: { fill: '#f8fafc' } }).theme;
    expect(getDataLabels(explicit, { visible: true, text: 'value', contrast: 'inside' })).toEqual([
      { text: 'value', fill: '#f8fafc' },
    ]);
  });
});
