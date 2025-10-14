import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Word Cloud component tests', () => {
  test('word-cloud', async ({ page }) => {
    const spec = {
      type: 'word-cloud',
      data: [
        { text: 'JavaScript', value: 25 },
        { text: 'TypeScript', value: 20 },
        { text: 'React', value: 18 },
        { text: 'Vue', value: 15 },
        { text: 'Angular', value: 12 },
        { text: 'Node.js', value: 10 },
        { text: 'Python', value: 8 },
        { text: 'Java', value: 6 },
        { text: 'C++', value: 5 },
        { text: 'Go', value: 3 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'word-cloud.png');
  });

  test('word-cloud-academy', async ({ page }) => {
    const spec = {
      type: 'word-cloud',
      theme: 'academy',
      data: [
        { text: 'JavaScript', value: 25 },
        { text: 'TypeScript', value: 20 },
        { text: 'React', value: 18 },
        { text: 'Vue', value: 15 },
        { text: 'Angular', value: 12 },
        { text: 'Node.js', value: 10 },
        { text: 'Python', value: 8 },
        { text: 'Java', value: 6 },
        { text: 'C++', value: 5 },
        { text: 'Go', value: 3 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'word-cloud-academy.png');
  });

  test('word-cloud-style', async ({ page }) => {
    const spec = {
      type: 'word-cloud',
      data: [
        { text: 'JavaScript', value: 25 },
        { text: 'TypeScript', value: 20 },
        { text: 'React', value: 18 },
        { text: 'Vue', value: 15 },
        { text: 'Angular', value: 12 },
        { text: 'Node.js', value: 10 },
        { text: 'Python', value: 8 },
        { text: 'Java', value: 6 },
        { text: 'C++', value: 5 },
        { text: 'Go', value: 3 },
      ],
      style: {
        backgroundColor: 'gray',
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'word-cloud-style.png');
  });
});
