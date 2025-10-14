import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Liquid component tests', () => {
  test('liquid', async ({ page }) => {
    const spec = {
      type: 'liquid',
      percent: 0.725,
      title: 'Liquid Chart Example',
      animation: false,
    };
    await renderChartAndSnapshot(page, spec, 'liquid.png');
  });

  test('liquid-academy', async ({ page }) => {
    const spec = {
      type: 'liquid',
      percent: 0.725,
      theme: 'academy',
      title: 'Liquid Chart Example',
      animation: false,
    };
    await renderChartAndSnapshot(page, spec, 'liquid-academy.png');
  });

  test('liquid-style', async ({ page }) => {
    const spec = {
      type: 'liquid',
      percent: 0.725,
      title: 'Liquid Chart Example',
      // 禁用动画以确保测试稳定性
      animation: false,
      style: {
        backgroundColor: 'gray',
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'liquid-style.png');
  });
});
