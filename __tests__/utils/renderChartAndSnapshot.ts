import { expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function renderChartAndSnapshot(page: any, spec: any, snapshotName: string) {
  const htmlPath = path.join(__dirname, '..', 'fixtures', 'gpt-vis.html');
  // 将 spec 编码为 URL 参数
  const encodedSpec = encodeURIComponent(JSON.stringify(spec));
  await page.goto(`file://${htmlPath}?spec=${encodedSpec}`);

  // 等待图表渲染完成
  await page.waitForTimeout(6000);

  // 检查页面是否正确加载
  await expect(page.locator('#container')).toBeVisible();

  // 对于 liquid 类型的图表，需要额外等待以确保动画完全停止
  if (spec.type === 'liquid') {
    // 禁用所有可能的动画和交互
    await page.addStyleTag({
      content: `
        * {
          animation: none !important;
          transition: none !important;
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
        canvas {
          image-rendering: pixelated !important;
        }
      `,
    });

    // 额外等待时间让液体动画完全静止
    await page.waitForTimeout(3000);
    await page.emulateMedia({ colorScheme: 'light' });
    await page.addInitScript(() => {
      window.devicePixelRatio = 1;
    });

    // 多次检查页面稳定性
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(1000);
    }
  }

  // 生成快照
  await expect(page).toHaveScreenshot(snapshotName, {
    threshold: 0.5,
    maxDiffPixels: 5000,
  });
}
