import { test } from '@playwright/test';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Waterfall component tests', () => {
  test('waterfall', async ({ page }) => {
    const spec = {
      type: 'waterfall',
      data: [
        { category: '第一季度', value: 6200000 },
        { category: '第二季度', value: -2600000 },
        { category: '第三季度', value: 4100000 },
        { category: '第四季度', value: 3700000 },
        { category: '总计', value: 11400000, isTotal: true },
      ],
      axisXTitle: '季度',
      axisYTitle: '金额',
      title: 'Waterfall Chart',
    };
    await renderChartAndSnapshot(page, spec, 'waterfall.png');
  });

  test('waterfall-required', async ({ page }) => {
    const spec = {
      type: 'waterfall',
      data: [
        { category: 'Q1', value: 5000000 },
        { category: 'Q2', value: -1000000 },
        { category: 'Q3', value: 3000000 },
        { category: 'Q4', value: 2000000 },
        { category: 'Total', value: 9000000, isTotal: true },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'waterfall-required.png');
  });

  test('waterfall-theme-dark', async ({ page }) => {
    const spec = {
      type: 'waterfall',
      data: [
        { category: 'Q1', value: 6200000 },
        { category: 'Q2', value: -2600000 },
        { category: 'Q3', value: 4100000 },
        { category: 'Q4', value: 3700000 },
        { category: 'Total', value: 11400000, isTotal: true },
      ],
      axisXTitle: 'Quarter',
      axisYTitle: 'Amount',
      theme: 'dark',
    };
    await renderChartAndSnapshot(page, spec, 'waterfall-theme-dark.png');
  });

  test('waterfall-custom-palette', async ({ page }) => {
    const spec = {
      type: 'waterfall',
      data: [
        { category: 'Q1', value: 6200000 },
        { category: 'Q2', value: -2600000 },
        { category: 'Q3', value: 4100000 },
        { category: 'Q4', value: 3700000 },
        { category: 'Total', value: 11400000, isTotal: true },
      ],
      axisXTitle: 'Quarter',
      axisYTitle: 'Amount',
      style: {
        palette: ['#8459fc', '#ff89bd', '#1677ff'],
      },
    };
    await renderChartAndSnapshot(page, spec, 'waterfall-custom-palette.png');
  });
});
