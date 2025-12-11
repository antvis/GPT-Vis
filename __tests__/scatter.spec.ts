import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

const DATA = [
  { x: 161.2, y: 51.6 },
  { x: 167.5, y: 59 },
  { x: 159.5, y: 49.2 },
  { x: 157, y: 63 },
  { x: 155.8, y: 53.6 },
  { x: 170, y: 59 },
  { x: 159.1, y: 47.6 },
  { x: 166, y: 69.8 },
  { x: 176.2, y: 66.8 },
  { x: 160.2, y: 75.2 },
  { x: 172.5, y: 55.2 },
  { x: 170.9, y: 54.2 },
  { x: 172.9, y: 62.5 },
  { x: 153.4, y: 42 },
  { x: 160, y: 50 },
  { x: 147.2, y: 49.8 },
  { x: 168.2, y: 49.2 },
  { x: 175, y: 73.2 },
  { x: 157, y: 47.8 },
  { x: 167.6, y: 68.8 },
];

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Scatter component tests', () => {
  test('scatter', async ({ page }) => {
    const spec = {
      type: 'scatter',
      data: DATA,
      axisXTitle: 'X',
      axisYTitle: 'Y',
    };
    await renderChartAndSnapshot(page, spec, 'scatter.png');
  });

  test('scatter-required', async ({ page }) => {
    const spec = {
      type: 'scatter',
      data: DATA,
    };
    await renderChartAndSnapshot(page, spec, 'scatter-required.png');
  });

  test('scatter-academy', async ({ page }) => {
    const spec = {
      type: 'scatter',
      theme: 'academy',
      data: DATA,
      axisXTitle: 'X',
      axisYTitle: 'Y',
    };
    await renderChartAndSnapshot(page, spec, 'scatter-academy.png');
  });

  test('scatter-style', async ({ page }) => {
    const spec = {
      type: 'scatter',
      data: DATA,
      axisXTitle: 'X',
      axisYTitle: 'Y',
      style: {
        backgroundColor: 'gray',
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'scatter-style.png');
  });

  test('scatter-group', async ({ page }) => {
    const spec = {
      type: 'scatter',
      data: [
        { x: 161.2, y: 51.6, group: 'FEMALE' },
        { x: 167.5, y: 59, group: 'FEMALE' },
        { x: 159.5, y: 49.2, group: 'FEMALE' },
        { x: 157, y: 63, group: 'MALE' },
        { x: 155.8, y: 53.6, group: 'MALE' },
        { x: 170, y: 59, group: 'FEMALE' },
        { x: 159.1, y: 47.6, group: 'FEMALE' },
        { x: 166, y: 69.8, group: 'MALE' },
        { x: 176.2, y: 66.8, group: 'FEMALE' },
        { x: 160.2, y: 75.2, group: 'MALE' },
      ],
      axisXTitle: '身高',
      axisYTitle: '体重',
    };
    await renderChartAndSnapshot(page, spec, 'scatter-group.png');
  });
});
