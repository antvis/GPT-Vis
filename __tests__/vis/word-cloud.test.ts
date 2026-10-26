import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { WordCloud } from '../../src/vis/word-cloud';
import { chartOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - word-cloud chart', () => {
  it('should parse basic word-cloud chart', () => {
    const result = parse(`
vis word-cloud
data
  - text 环境
    value 20
  - text 保护
    value 15
  - text 可持续发展
    value 10
    `);

    expect(result.type).toBe('word-cloud');
    expect(result.data).toEqual([
      { text: '环境', value: 20 },
      { text: '保护', value: 15 },
      { text: '可持续发展', value: 10 },
    ]);
  });

  it('should parse word-cloud chart from product reviews', () => {
    const result = parse(`
vis word-cloud
data
  - text 质量好
    value 30
  - text 价格合理
    value 20
  - text 服务差
    value 5
    `);

    expect(result.data).toEqual([
      { text: '质量好', value: 30 },
      { text: '价格合理', value: 20 },
      { text: '服务差', value: 5 },
    ]);
  });

  it('should parse word-cloud chart with title', () => {
    const result = parse(`
vis word-cloud
data
  - text 数据
    value 50
  - text 分析
    value 40
  - text 结果
    value 30
title 文章关键词分析
    `);

    expect(result.title).toBe('文章关键词分析');
  });

  it('should parse word-cloud chart with theme and style', () => {
    const result = parse(`
vis word-cloud
data
  - text 环保
    value 10
  - text 气候变化
    value 8
theme academy
style
  backgroundColor #f5f5f5
  palette
    - #5B8FF9
    - #61DDAA
    `);

    expect(result.theme).toBe('academy');
    expect(result.style).toEqual({
      backgroundColor: '#f5f5f5',
      palette: ['#5B8FF9', '#61DDAA'],
    });
  });
});

describe('render - word-cloud theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('maps word-cloud typography without exposing layout controls', () => {
    WordCloud(options).render({
      data: [{ text: 'Theme', value: 10 }],
      theme: {
        id: 'word-cloud-test',
        label: 'Word cloud test',
        charts: {
          'word-cloud': {
            style: { mark: { wordCloud: { fontFamily: 'Georgia, serif' } } },
          },
        },
      },
    });

    expect(chartOptions.at(-1)).toMatchObject({
      layout: { padding: 2, font: 'Georgia, serif' },
      style: { fontFamily: 'Georgia, serif' },
    });
  });
});
