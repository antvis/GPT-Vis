import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Funnel component tests', () => {
  test('funnel', async ({ page }) => {
    const spec = {
      title: '漏斗图',
      type: 'funnel',
      data: [
        { category: '浏览网站', value: 50000 },
        { category: '放入购物车', value: 35000 },
        { category: '生成订单', value: 25000 },
        { category: '支付订单', value: 15000 },
        { category: '完成交易', value: 8000 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'funnel.png');
  });

  test('funnel-academy', async ({ page }) => {
    const spec = {
      type: 'funnel',
      theme: 'academy',
      data: [
        { category: '浏览网站', value: 50000 },
        { category: '放入购物车', value: 35000 },
        { category: '生成订单', value: 25000 },
        { category: '支付订单', value: 15000 },
        { category: '完成交易', value: 8000 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'funnel-academy.png');
  });

  test('funnel-long-text', async ({ page }) => {
    const spec = {
      title: '漏斗图',
      type: 'funnel',
      data: [
        { category: 'show', value: 100 },
        { category: 'click', value: 80 },
        { category: 'visit', value: 60 },
        { category: 'inquiry', value: 40 },
        { category: 'order', value: 20 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'funnel-long-text.png');
  });

  test('funnel-style', async ({ page }) => {
    const spec = {
      title: '漏斗图',
      type: 'funnel',
      data: [
        { category: '浏览网站', value: 50000 },
        { category: '放入购物车', value: 35000 },
        { category: '生成订单', value: 25000 },
        { category: '支付订单', value: 15000 },
        { category: '完成交易', value: 8000 },
      ],
      style: {
        backgroundColor: 'gray',
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'funnel-style.png');
  });
});
