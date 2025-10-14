import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Bar component tests', () => {
  test('bar', async ({ page }) => {
    const spec = {
      type: 'bar',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
    };
    await renderChartAndSnapshot(page, spec, 'bar.png');
  });

  test('bar-required', async ({ page }) => {
    const spec = {
      type: 'bar',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'bar-required.png');
  });

  test('bar-grouped', async ({ page }) => {
    const spec = {
      type: 'bar',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      group: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    };
    await renderChartAndSnapshot(page, spec, 'bar-grouped.png');
  });

  test('bar-stacked', async ({ page }) => {
    const spec = {
      type: 'bar',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      stack: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    };
    await renderChartAndSnapshot(page, spec, 'bar-stacked.png');
  });

  test('bar-group-academy', async ({ page }) => {
    const spec = {
      theme: 'academy',
      type: 'bar',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      group: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    };
    await renderChartAndSnapshot(page, spec, 'bar-group-academy.png');
  });

  test('bar-stacked-academy', async ({ page }) => {
    const spec = {
      theme: 'academy',
      type: 'bar',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      stack: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    };
    await renderChartAndSnapshot(page, spec, 'bar-stacked-academy.png');
  });

  test('bar-custom-style', async ({ page }) => {
    const spec = {
      type: 'bar',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
      style: {
        backgroundColor: '#aaa',
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'bar-custom-style.png');
  });

  test('bar-grouped-custom-style', async ({ page }) => {
    const spec = {
      type: 'bar',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      stack: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
      theme: 'dark',
    };
    await renderChartAndSnapshot(page, spec, 'bar-grouped-custom-style.png');
  });

  test('bar-data-no-group-grouped', async ({ page }) => {
    const spec = {
      type: 'bar',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
      group: true,
    };
    await renderChartAndSnapshot(page, spec, 'bar-data-no-group-grouped.png');
  });

  test('bar-data-no-group-stacked', async ({ page }) => {
    const spec = {
      type: 'bar',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
      stack: true,
    };
    await renderChartAndSnapshot(page, spec, 'bar-data-no-group-stacked.png');
  });
});
