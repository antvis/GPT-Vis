import { test } from '@playwright/test';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Network Graph component tests', () => {
  test('network-graph', async ({ page }) => {
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
    await renderChartAndSnapshot(page, spec, 'network-graph.png');
  });

  test('network-graph-required', async ({ page }) => {
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
    await renderChartAndSnapshot(page, spec, 'network-graph-required.png');
  });
});
