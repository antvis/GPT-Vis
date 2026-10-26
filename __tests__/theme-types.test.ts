import { describe, expectTypeOf, it } from 'vitest';

import type { ThemeInput, ThemeSeedTokens, ThemeSpec, ThemeStyle } from '../src';

const theme = {
  version: '1',
  id: 'type-test',
  label: 'Type test',
  tokens: {
    colorDefault: '#315ee7',
    colorBackground: '#f8faff',
    colorSurface: '#ffffff',
    colorText: '#172033',
    colorTextSecondary: '#64748b',
    colorTextInverse: '#ffffff',
    colorStroke: '#dbe3f0',
    colorPositive: '#16a34a',
    colorNegative: '#dc2626',
    colorNeutral: '#64748b',
    category10: ['#315ee7', '#00a6a6', '#f08c46'],
    category20: ['#315ee7', '#00a6a6', '#f08c46', '#8b6fe8'],
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 20,
    padding1: 8,
    padding2: 12,
    lineWidth: 2,
    radius: 8,
  },
  style: {
    mark: {
      line: { shape: 'smooth', lineWidth: 3 },
    },
    node: { fillOpacity: 0.9 },
  },
  charts: {
    area: {
      style: {
        mark: {
          area: { shape: 'smooth' },
          line: { shape: 'smooth' },
          point: { shape: 'circle' },
        },
      },
    },
    pie: {
      style: {
        mark: { interval: { radius: 6 } },
      },
    },
    'network-graph': {
      style: {
        node: { type: 'rect', radius: 8, labelFontSize: 12 },
        edge: {
          type: 'polyline',
          lineDash: [4, 4],
        },
      },
    },
    table: {
      style: {
        table: {
          header: { backgroundColor: '#f5f5f5', fontWeight: 600 },
          border: { color: '#e5e7eb', width: 1 },
        },
      },
    },
    summary: {
      style: {
        summary: {
          colorBase: '#334155',
          colorMetricValue: '#2563eb',
          colorPositive: '#16a34a',
          colorNegative: '#dc2626',
        },
      },
    },
  },
} satisfies ThemeSpec;

describe('theme type architecture', () => {
  it('exposes the theme authoring contract without renderer-specific wrappers', () => {
    expectTypeOf(theme).toMatchTypeOf<ThemeSpec>();
    expectTypeOf<ThemeInput>().toEqualTypeOf<
      ThemeSpec | 'default' | 'light' | 'dark' | 'academy'
    >();
    expectTypeOf<NonNullable<ThemeSpec['tokens']>>().toEqualTypeOf<ThemeSeedTokens>();
    expectTypeOf<NonNullable<ThemeSpec['style']>>().toEqualTypeOf<ThemeStyle>();
    expectTypeOf<NonNullable<NonNullable<ThemeSpec['charts']>['pie']>['style']>().toEqualTypeOf<
      ThemeStyle | undefined
    >();
  });
});
