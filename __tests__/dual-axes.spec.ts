import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Dual Axes component tests', () => {
  test('dual-axes', async ({ page }) => {
    const spec = {
      type: 'dual-axes',
      title: 'This is a dual axes chart',
      axisXTitle: '时间',
      categories: [
        '2020-08-20',
        '2020-08-21',
        '2020-08-22',
        '2020-08-23',
        '2020-08-24',
        '2020-08-25',
        '2020-08-26',
        '2020-08-27',
        '2020-08-28',
        '2020-08-29',
      ],
      series: [
        {
          type: 'column',
          data: [10868, 8786, 10824, 7860, 13253, 17015, 19298, 13937, 11541, 15244],
          axisYTitle: '消耗时间',
        },
        {
          type: 'line',
          data: [
            649.483, 1053.7, 679.817, 638.117, 843.3, 1092.983, 1036.317, 1031.9, 803.467, 830.733,
          ],
          axisYTitle: '完成时间',
        },
      ],
      legendTypeList: ['smooth', 'rect'],
    };
    await renderChartAndSnapshot(page, spec, 'dual-axes.png');
  });

  test('dual-axes-required', async ({ page }) => {
    const spec = {
      type: 'dual-axes',
      categories: ['2020-08-20', '2020-08-21', '2020-08-22', '2020-08-23', '2020-08-24'],
      axisXTitle: '时间',
      series: [
        {
          type: 'column',
          data: [10868, 8786, 10824, 7860, 13253],
          axisYTitle: '消耗时间',
        },
        {
          type: 'line',
          data: [649.483, 1053.7, 679.817, 638.117, 843.3],
          axisYTitle: '完成时间',
        },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'dual-axes-required.png');
  });

  test('dual-axes-academy', async ({ page }) => {
    const spec = {
      theme: 'academy',
      type: 'dual-axes',
      title: 'This is a dual axes chart',
      axisXTitle: '时间',
      categories: ['2020-08-20', '2020-08-21', '2020-08-22', '2020-08-23', '2020-08-24'],
      series: [
        {
          type: 'line',
          data: [649.483, 1053.7, 679.817, 638.117, 843.3],
          axisYTitle: '完成时间',
        },
        {
          type: 'column',
          data: [10868, 8786, 10824, 7860, 13253],
          axisYTitle: '消耗时间',
        },
      ],
      legendTypeList: ['smooth', 'rect'],
    };
    await renderChartAndSnapshot(page, spec, 'dual-axes-academy.png');
  });

  test('dual-axes-custom-style', async ({ page }) => {
    const spec = {
      type: 'dual-axes',
      title: 'This is a dual axes chart',
      axisXTitle: '时间',
      categories: ['2020-08-20', '2020-08-21', '2020-08-22', '2020-08-23', '2020-08-24'],
      series: [
        {
          type: 'column',
          data: [10868, 8786, 10824, 7860, 13253],
          axisYTitle: '消耗时间',
        },
        {
          type: 'line',
          data: [649.483, 1053.7, 679.817, 638.117, 843.3],
          axisYTitle: '完成时间',
        },
      ],
      legendTypeList: ['smooth', 'rect'],
      theme: 'dark',
      style: {
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'dual-axes-custom-style.png');
  });
});
