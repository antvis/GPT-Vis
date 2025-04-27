import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('network-graph', async () => {
    const vis = await render({
      width: 600,
      height: 400,
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
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'network-graph', {
      maxError: Infinity,
    });
  });
});
