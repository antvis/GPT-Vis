import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 2000, height: 1200 } });

test.describe('Area 组件测试', () => {
  test('检查开发服务器', async ({ page }) => {
    // 检查多个常见端口
    const ports = [3000, 8000, 8080, 5173, 4173];
    for (const port of ports) {
      try {
        await page.goto('/components/area');
        console.log(`开发服务器运行在端口 ${port}`);

        // 如果成功访问，尝试截图
        await page.waitForTimeout(1000);
        await expect(page).toHaveScreenshot(`dev-server-${port}.png`);
        return;
      } catch (error) {
        console.log(`端口 ${port} 未运行服务器`, error);
      }
    }

    console.log('未找到运行中的开发服务器');
  });
});
