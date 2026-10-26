import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { getBuiltInThemeValues } from '../../src/theme/shared';
import type { ThemeInput } from '../../src/types';
import { Liquid } from '../../src/vis/liquid';
import { chartOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - liquid chart', () => {
  it('should parse basic liquid chart', () => {
    const result = parse(`
vis liquid
percent 0.75
title 任务完成度
    `);

    expect(result).toEqual({
      type: 'liquid',
      percent: 0.75,
      title: '任务完成度',
    });
  });

  it('should parse liquid chart with theme', () => {
    const result = parse(`
vis liquid
percent 0.6
title 资源使用率
theme dark
    `);

    expect(result.theme).toBe('dark');
    expect(result.percent).toBe(0.6);
  });

  it('should parse liquid chart with shape', () => {
    const result = parse(`
vis liquid
percent 0.92
title KPI达成率
shape triangle
    `);

    expect(result.shape).toBe('triangle');
    expect(result.percent).toBe(0.92);
  });

  it('should parse liquid chart with style', () => {
    const result = parse(`
vis liquid
percent 0.8
title 进度
style
  palette
    - #00BFFF
  backgroundColor #F0F0F0
    `);

    expect(result.style).toEqual({
      palette: ['#00BFFF'],
      backgroundColor: '#F0F0F0',
    });
  });
});

describe('render - liquid theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('applies theme text colors and lets local content styles override them', () => {
    const theme: ThemeInput = {
      version: '1',
      id: 'composite-text',
      label: 'Composite text',
      baseTheme: 'dark',
      tokens: { colorText: '#facc15' },
    };

    Liquid(options).render({ percent: 0.72, theme });

    expect(chartOptions.at(-1).style).toMatchObject({ contentFill: '#facc15', waveCount: 2 });

    Liquid(options).render({
      percent: 0.72,
      theme,
      style: { mark: { liquid: { shape: 'pin', contentFill: '#dc2626' } } },
    });

    expect(chartOptions.at(-1).style).toMatchObject({ shape: 'pin', contentFill: '#dc2626' });
  });

  it.each(['default', 'dark'] as const)('uses %s built-in colors for internal text', (theme) => {
    Liquid(options).render({ percent: 0.72, theme });
    expect(chartOptions.at(-1).style.contentFill).toBe(getBuiltInThemeValues(theme).textPrimary);
  });
});
