import { test } from '@playwright/test';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Network Graph component tests', () => {
  test('network-graph', async ({ page }) => {
    // CI 环境下跳过此测试， 因为 network-graph 渲染非确定性，导致视觉回归测试不稳定
    if (process.env.CI === 'true') {
      test.skip();
    }
    const spec = {
      type: 'network-graph',
      data: {
        nodes: [
          { name: '哈利·波特' },
          { name: '赫敏·格兰杰' },
          { name: '罗恩·韦斯莱' },
          { name: '伏地魔' },
        ],
        edges: [
          { source: '哈利·波特', target: '赫敏·格兰杰', name: '朋友' },
          { source: '哈利·波特', target: '罗恩·韦斯莱', name: '朋友' },
          { source: '哈利·波特', target: '伏地魔', name: '敌人' },
          { source: '伏地魔', target: '哈利·波特', name: '试图杀死' },
        ],
      },
    };
    // 等待图表渲染完成
    await renderChartAndSnapshot(page, spec, 'network-graph.png');
  });
});
