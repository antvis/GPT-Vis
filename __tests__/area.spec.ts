import { expect, test } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Area component tests', () => {
  test('area chart snapshot test', async ({ page }) => {
    // 使用本地 HTML 文件
    const htmlPath = path.join(__dirname, 'fixtures', 'area.html');

    await page.goto(`file://${htmlPath}`);
    // 等待图表渲染完成
    await page.waitForTimeout(3000);
    // 检查页面是否正确加载
    await expect(page.locator('#container')).toBeVisible();

    // 生成整页快照
    await expect(page).toHaveScreenshot('area-container.png');
  });
});
