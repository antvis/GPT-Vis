import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Area component tests', () => {
  test('area', async ({ page }) => {
    const spec = {
      type: 'area',
      data: [
        { time: '1991', value: 3 },
        { time: '1992', value: 4 },
        { time: '1993', value: 3.5 },
        { time: '1994', value: 5 },
        { time: '1995', value: 4.9 },
        { time: '1996', value: 6 },
        { time: '1997', value: 7 },
        { time: '1998', value: 9 },
        { time: '1999', value: 13 },
      ],
      axisXTitle: 'Time',
      axisYTitle: 'Value',
      title: 'Area Chart',
      style: {
        backgroundColor: '#aaa',
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'area.png');
  });

  test('area-required', async ({ page }) => {
    const spec = {
      type: 'area',
      data: [
        { time: '1991', value: 3 },
        { time: '1992', value: 4 },
        { time: '1993', value: 3.5 },
        { time: '1994', value: 5 },
        { time: '1995', value: 4.9 },
        { time: '1996', value: 6 },
        { time: '1997', value: 7 },
        { time: '1998', value: 9 },
        { time: '1999', value: 13 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'area-required.png');
  });

  test('area-academy', async ({ page }) => {
    const spec = {
      type: 'area',
      theme: 'academy',
      data: [
        { time: '1991', value: 3 },
        { time: '1992', value: 4 },
        { time: '1993', value: 3.5 },
        { time: '1994', value: 5 },
        { time: '1995', value: 4.9 },
        { time: '1996', value: 6 },
        { time: '1997', value: 7 },
        { time: '1998', value: 9 },
        { time: '1999', value: 13 },
      ],
      axisXTitle: 'Time',
      axisYTitle: 'Value',
      title: 'Area Chart',
    };
    await renderChartAndSnapshot(page, spec, 'area-academy.png');
  });

  test('area-stacked', async ({ page }) => {
    const spec = {
      type: 'area',
      data: [
        { time: 'Jan', group: 'Tokyo', value: 7 },
        { time: 'Jan', group: 'London', value: 3.9 },
        { time: 'Feb', group: 'Tokyo', value: 6.9 },
        { time: 'Feb', group: 'London', value: 4.2 },
        { time: 'Mar', group: 'Tokyo', value: 9.5 },
        { time: 'Mar', group: 'London', value: 5.7 },
        { time: 'Apr', group: 'Tokyo', value: 14.5 },
        { time: 'Apr', group: 'London', value: 8.5 },
        { time: 'May', group: 'Tokyo', value: 18.4 },
        { time: 'May', group: 'London', value: 11.9 },
        { time: 'Jun', group: 'Tokyo', value: 21.5 },
        { time: 'Jun', group: 'London', value: 15.2 },
        { time: 'Jul', group: 'Tokyo', value: 25.2 },
        { time: 'Jul', group: 'London', value: 17 },
        { time: 'Aug', group: 'Tokyo', value: 26.5 },
        { time: 'Aug', group: 'London', value: 16.6 },
        { time: 'Sep', group: 'Tokyo', value: 23.3 },
        { time: 'Sep', group: 'London', value: 14.2 },
        { time: 'Oct', group: 'Tokyo', value: 18.3 },
        { time: 'Oct', group: 'London', value: 10.3 },
        { time: 'Nov', group: 'Tokyo', value: 13.9 },
        { time: 'Nov', group: 'London', value: 6.6 },
        { time: 'Dec', group: 'Tokyo', value: 9.6 },
        { time: 'Dec', group: 'London', value: 4.8 },
      ],
      stack: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
      title: 'Area Chart',
      theme: 'academy',
    };
    await renderChartAndSnapshot(page, spec, 'area-stacked-academy.png');
  });

  test('area-stacked-academy', async ({ page }) => {
    const spec = {
      theme: 'academy',
      type: 'area',
      data: [
        { time: 'Jan', group: 'Tokyo', value: 7 },
        { time: 'Jan', group: 'London', value: 3.9 },
        { time: 'Feb', group: 'Tokyo', value: 6.9 },
        { time: 'Feb', group: 'London', value: 4.2 },
        { time: 'Mar', group: 'Tokyo', value: 9.5 },
        { time: 'Mar', group: 'London', value: 5.7 },
        { time: 'Apr', group: 'Tokyo', value: 14.5 },
        { time: 'Apr', group: 'London', value: 8.5 },
        { time: 'May', group: 'Tokyo', value: 18.4 },
        { time: 'May', group: 'London', value: 11.9 },
        { time: 'Jun', group: 'Tokyo', value: 21.5 },
        { time: 'Jun', group: 'London', value: 15.2 },
        { time: 'Jul', group: 'Tokyo', value: 25.2 },
        { time: 'Jul', group: 'London', value: 17 },
        { time: 'Aug', group: 'Tokyo', value: 26.5 },
        { time: 'Aug', group: 'London', value: 16.6 },
        { time: 'Sep', group: 'Tokyo', value: 23.3 },
        { time: 'Sep', group: 'London', value: 14.2 },
        { time: 'Oct', group: 'Tokyo', value: 18.3 },
        { time: 'Oct', group: 'London', value: 10.3 },
        { time: 'Nov', group: 'Tokyo', value: 13.9 },
        { time: 'Nov', group: 'London', value: 6.6 },
        { time: 'Dec', group: 'Tokyo', value: 9.6 },
        { time: 'Dec', group: 'London', value: 4.8 },
      ],
      stack: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
      title: 'Area Chart',
    };
    await renderChartAndSnapshot(page, spec, 'area-grouped-academy.png');
  });

  test('area-start-at-zero', async ({ page }) => {
    const spec = {
      type: 'area',
      data: [
        { time: '1991', value: 13 },
        { time: '1992', value: 14 },
        { time: '1993', value: 13.5 },
        { time: '1994', value: 15 },
        { time: '1995', value: 14.9 },
        { time: '1996', value: 16 },
        { time: '1997', value: 17 },
        { time: '1998', value: 19 },
        { time: '1999', value: 23 },
      ],
      axisXTitle: 'Time',
      axisYTitle: 'Value',
      style: {
        startAtZero: true,
      },
    };
    await renderChartAndSnapshot(page, spec, 'area-start-at-zero.png');
  });
});
