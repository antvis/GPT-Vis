import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../src/syntax/parser';
import { Funnel } from '../src/vis/funnel';
import { chartOptions } from './helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('./helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - funnel chart', () => {
  it('should parse basic funnel chart', () => {
    const result = parse(`
vis funnel
data
  - category 访问
    value 1000
  - category 咨询
    value 600
  - category 下单
    value 300
  - category 成交
    value 120
title 销售漏斗
    `);

    expect(result.type).toBe('funnel');
    expect(result.data).toEqual([
      { category: '访问', value: 1000 },
      { category: '咨询', value: 600 },
      { category: '下单', value: 300 },
      { category: '成交', value: 120 },
    ]);
    expect(result.title).toBe('销售漏斗');
  });

  it('should parse funnel chart with theme', () => {
    const result = parse(`
vis funnel
data
  - category 注册
    value 800
  - category 激活
    value 500
  - category 付费
    value 200
title 用户转化流程
theme dark
    `);

    expect(result.theme).toBe('dark');
    expect(result.title).toBe('用户转化流程');
  });

  it('should parse funnel chart with custom style', () => {
    const result = parse(`
vis funnel
data
  - category 报名
    value 1500
  - category 签到
    value 900
  - category 参与
    value 700
title 活动参与漏斗
style
  palette
    - #FF7F50
    - #87CEFA
    - #32CD32
  backgroundColor #FFF8DC
    `);

    expect(result.style).toEqual({
      palette: ['#FF7F50', '#87CEFA', '#32CD32'],
      backgroundColor: '#FFF8DC',
    });
  });
});

describe('render - funnel theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('applies chart-specific mark styles', () => {
    Funnel(options).render({
      data: [
        { category: 'Visit', value: 100 },
        { category: 'Buy', value: 30 },
      ],
      style: {
        mark: {
          interval: { fillOpacity: 0.5 },
          connector: { lineWidth: 4 },
        },
      },
    });

    expect(chartOptions.at(-1).children).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'interval',
          style: expect.objectContaining({ fillOpacity: 0.5 }),
        }),
        expect.objectContaining({
          type: 'connector',
          style: expect.objectContaining({ lineWidth: 4 }),
        }),
      ]),
    );
  });
});
