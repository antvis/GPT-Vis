import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

const DATA = [
  { name: '分类 1', value: 560 },
  { name: '分类 2', value: 500 },
  { name: '分类 3', value: 150 },
  { name: '分类 4', value: 140 },
  { name: '分类 5', value: 115 },
  { name: '分类 6', value: 95 },
  { name: '分类 7', value: 90 },
  { name: '分类 8', value: 75 },
  { name: '分类 9', value: 98 },
  { name: '分类 10', value: 60 },
  { name: '分类 11', value: 45 },
  { name: '分类 12', value: 40 },
  { name: '分类 13', value: 40 },
  { name: '分类 14', value: 35 },
  { name: '分类 15', value: 40 },
  { name: '分类 16', value: 40 },
  { name: '分类 17', value: 40 },
  { name: '分类 18', value: 30 },
  { name: '分类 19', value: 28 },
  { name: '分类 20', value: 16 },
];

test.describe('Treemap component tests', () => {
  test('treemap', async ({ page }) => {
    const spec = {
      type: 'treemap',
      data: DATA,
    };
    await renderChartAndSnapshot(page, spec, 'treemap.png');
  });

  test('treemap-academy', async ({ page }) => {
    const spec = {
      type: 'treemap',
      theme: 'academy',
      data: DATA,
    };
    await renderChartAndSnapshot(page, spec, 'treemap-academy.png');
  });

  test('treemap-style', async ({ page }) => {
    const spec = {
      type: 'treemap',
      data: DATA,
      style: {
        backgroundColor: 'gray',
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'treemap-style.png');
  });
});
