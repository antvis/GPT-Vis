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

  // 检查页面是否正确加载
  await expect(page.locator('#container')).toBeVisible();

  // 对于 G6 图表类型（使用 React 组件节点），需要更长的等待时间来确保 React 组件节点渲染完成
  // 这些图表使用了 @ant-design/graphs 的 React 组件节点（如 TextNode, RCNode 等）
  // React 组件需要通过复杂的渲染流程才能绘制到 Canvas 上，包括：
  // 1. React 组件挂载和渲染
  // 2. 组件内容转换为 Canvas 绘制指令
  // 3. G6 执行布局计算
  // 4. 最终绘制到 Canvas
  // 如果等待时间不足，截图时只能看到 edges（线条）而看不到 nodes（节点）
  if (
    spec.type === 'mind-map' ||
    spec.type === 'flow-diagram' ||
    spec.type === 'organization-chart' ||
    spec.type === 'fishbone-diagram'
  ) {
    // 等待 Canvas 渲染完成
    await page.waitForTimeout(8000);
    // 多次检查确保渲染稳定
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(1000);
    }
  } else {
    // 等待图表渲染完成
    await page.waitForTimeout(6000);
  }

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
    maxDiffPixels: 10000,
  });
}
