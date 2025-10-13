import { expect, test } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Area component tests', () => {
  test('area chart', async ({ page }) => {
    const htmlPath = path.join(__dirname, 'fixtures', 'gpt-vis.html');

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

    // 将 spec 编码为 URL 参数
    const encodedSpec = encodeURIComponent(JSON.stringify(spec));
    await page.goto(`file://${htmlPath}?spec=${encodedSpec}`);

    // 等待图表渲染完成
    await page.waitForTimeout(3000);

    // 检查页面是否正确加载
    await expect(page.locator('#container')).toBeVisible();

    // 生成整页快照并与已存在的照片进行对比，不一致则报错
    await expect(page).toHaveScreenshot('area.png');
  });

  test('stacked area chart', async ({ page }) => {
    const htmlPath = path.join(__dirname, 'fixtures', 'gpt-vis.html');
    const stackedSpec = {
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

    const encodedSpec = encodeURIComponent(JSON.stringify(stackedSpec));
    await page.goto(`file://${htmlPath}?spec=${encodedSpec}`);

    await page.waitForTimeout(3000);
    await expect(page.locator('#container')).toBeVisible();
    await expect(page).toHaveScreenshot('area-stacked.png');
  });
});
