import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Pie component tests', () => {
  test('pie', async ({ page }) => {
    const spec = {
      type: 'pie',
      data: [
        { category: '分类一', value: 27 },
        { category: '分类二', value: 25 },
        { category: '分类三', value: 18 },
        { category: '分类四', value: 15 },
        { category: '分类五', value: 10 },
        { category: '其他', value: 5 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'pie.png');
  });

  test('pie-required', async ({ page }) => {
    const spec = {
      type: 'pie',
      data: [
        { category: '分类一', value: 27 },
        { category: '分类二', value: 25 },
        { category: '分类三', value: 18 },
        { category: '分类四', value: 15 },
        { category: '分类五', value: 10 },
        { category: '其他', value: 5 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'pie-required.png');
  });

  test('pie-academy', async ({ page }) => {
    const spec = {
      theme: 'academy',
      type: 'pie',
      data: [
        { category: '分类一', value: 27 },
        { category: '分类二', value: 25 },
        { category: '分类三', value: 18 },
        { category: '分类四', value: 15 },
        { category: '分类五', value: 10 },
        { category: '其他', value: 5 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'pie-academy.png');
  });

  test('pie-custom-style', async ({ page }) => {
    const spec = {
      type: 'pie',
      data: [
        { category: '分类一', value: 27 },
        { category: '分类二', value: 25 },
        { category: '分类三', value: 18 },
        { category: '分类四', value: 15 },
        { category: '分类五', value: 10 },
        { category: '其他', value: 5 },
      ],
      theme: 'dark',
      style: {
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'pie-custom-style.png');
  });

  test('pie-sort', async ({ page }) => {
    const spec = {
      type: 'pie',
      title: '分类占比',
      data: [
        { category: '其他', value: 5 },
        { category: '分类五', value: 10 },
        { category: '分类一', value: 27 },
        { category: '分类二', value: 25 },
        { category: '分类三', value: 13 },
        { category: '分类四', value: 25 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'pie-sort.png');
  });

  test('pie-label-collide', async ({ page }) => {
    const spec = {
      type: 'pie',
      data: [
        { category: '广东', value: 8.5 },
        { category: '浙江', value: 7.2 },
        { category: '江苏', value: 6.8 },
        { category: '福建', value: 5.5 },
        { category: '山东', value: 5.2 },
        { category: '四川', value: 4.9 },
        { category: '湖南', value: 4.7 },
        { category: '湖北', value: 4.5 },
        { category: '安徽', value: 4.2 },
        { category: '江西', value: 4.0 },
        { category: '广西', value: 3.8 },
        { category: '云南', value: 3.6 },
        { category: '贵州', value: 3.4 },
        { category: '河南', value: 3.2 },
        { category: '河北', value: 3.0 },
        { category: '山西', value: 2.8 },
        { category: '陕西', value: 2.6 },
        { category: '辽宁', value: 2.4 },
        { category: '吉林', value: 2.2 },
        { category: '黑龙江', value: 2.0 },
        { category: '内蒙古', value: 1.8 },
        { category: '新疆', value: 1.6 },
        { category: '甘肃', value: 1.4 },
        { category: '青海', value: 1.2 },
        { category: '宁夏', value: 1.0 },
        { category: '西藏', value: 0.8 },
        { category: '海南', value: 0.6 },
        { category: '台湾', value: 0.4 },
        { category: '香港', value: 0.2 },
        { category: '澳门', value: 0.1 },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'pie-label-collide.png');
  });

  test('pie-one-data', async ({ page }) => {
    const spec = {
      type: 'pie',
      innerRadius: 0.5,
      data: [{ category: 'ecs', value: 99.9 }],
    };
    await renderChartAndSnapshot(page, spec, 'pie-one-data.png');
  });
});
