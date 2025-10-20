import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Radar component tests', () => {
  test('radar', async ({ page }) => {
    const spec = {
      type: 'radar',
      data: [
        { name: '沟通能力', value: 2 },
        { name: '协作能力', value: 3 },
        { name: '领导能力', value: 2 },
        { name: '学习能力', value: 5 },
        { name: '创新能力', value: 6 },
        { name: '技术能力', value: 9 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'radar.png');
  });

  test('radar-required', async ({ page }) => {
    const spec = {
      type: 'radar',
      data: [
        { name: '沟通能力', value: 2 },
        { name: '协作能力', value: 3 },
        { name: '领导能力', value: 2 },
        { name: '学习能力', value: 5 },
        { name: '创新能力', value: 6 },
        { name: '技术能力', value: 9 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'radar-required.png');
  });

  test('radar-academy', async ({ page }) => {
    const spec = {
      type: 'radar',
      theme: 'academy',
      data: [
        { name: '沟通能力', value: 2 },
        { name: '协作能力', value: 3 },
        { name: '领导能力', value: 2 },
        { name: '学习能力', value: 5 },
        { name: '创新能力', value: 6 },
        { name: '技术能力', value: 9 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'radar-academy.png');
  });

  test('radar-grouped', async ({ page }) => {
    const spec = {
      type: 'radar',
      data: [
        { name: 'Design', group: 'a', value: 70 },
        { name: 'Design', group: 'b', value: 30 },
        { name: 'Development', group: 'a', value: 60 },
        { name: 'Development', group: 'b', value: 70 },
        { name: 'Marketing', group: 'a', value: 50 },
        { name: 'Marketing', group: 'b', value: 60 },
        { name: 'Users', group: 'a', value: 40 },
        { name: 'Users', group: 'b', value: 50 },
        { name: 'Test', group: 'a', value: 60 },
        { name: 'Test', group: 'b', value: 70 },
        { name: 'Language', group: 'a', value: 70 },
        { name: 'Language', group: 'b', value: 50 },
        { name: 'Technology', group: 'a', value: 50 },
        { name: 'Technology', group: 'b', value: 40 },
        { name: 'Support', group: 'a', value: 30 },
        { name: 'Support', group: 'b', value: 40 },
        { name: 'Sales', group: 'a', value: 60 },
        { name: 'Sales', group: 'b', value: 40 },
        { name: 'UX', group: 'a', value: 50 },
        { name: 'UX', group: 'b', value: 60 },
      ],
      group: true,
    };
    await renderChartAndSnapshot(page, spec, 'radar-grouped.png');
  });

  test('radar-grouped-academy', async ({ page }) => {
    const spec = {
      type: 'radar',
      theme: 'academy',
      data: [
        { name: 'Design', group: 'a', value: 70 },
        { name: 'Design', group: 'b', value: 30 },
        { name: 'Development', group: 'a', value: 60 },
        { name: 'Development', group: 'b', value: 70 },
        { name: 'Marketing', group: 'a', value: 50 },
        { name: 'Marketing', group: 'b', value: 60 },
        { name: 'Users', group: 'a', value: 40 },
        { name: 'Users', group: 'b', value: 50 },
        { name: 'Test', group: 'a', value: 60 },
        { name: 'Test', group: 'b', value: 70 },
        { name: 'Language', group: 'a', value: 70 },
        { name: 'Language', group: 'b', value: 50 },
        { name: 'Technology', group: 'a', value: 50 },
        { name: 'Technology', group: 'b', value: 40 },
        { name: 'Support', group: 'a', value: 30 },
        { name: 'Support', group: 'b', value: 40 },
        { name: 'Sales', group: 'a', value: 60 },
        { name: 'Sales', group: 'b', value: 40 },
        { name: 'UX', group: 'a', value: 50 },
        { name: 'UX', group: 'b', value: 60 },
      ],
      group: true,
    };
    await renderChartAndSnapshot(page, spec, 'radar-grouped-academy.png');
  });

  test('radar-custom-style', async ({ page }) => {
    const spec = {
      type: 'radar',
      data: [
        { name: '沟通能力', value: 2 },
        { name: '协作能力', value: 3 },
        { name: '领导能力', value: 2 },
        { name: '学习能力', value: 5 },
        { name: '创新能力', value: 6 },
        { name: '技术能力', value: 9 },
      ],
      theme: 'dark',
      style: {
        backgroundColor: '#333',
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'radar-custom-style.png');
  });
});
