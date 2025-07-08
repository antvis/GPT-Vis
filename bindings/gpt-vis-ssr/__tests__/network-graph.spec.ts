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

  it('network-graph-required', async () => {
    const vis = await render({
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

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'network-graph-required', {
      maxError: Infinity,
    });
  });

  it('network-graph-rough', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'network-graph',
      texture: 'rough',
      data: {
        nodes: [
          { name: 'Harry Potter' },
          { name: 'Hermione Granger' },
          { name: 'Ron Weasley' },
          { name: 'Voldemort' },
        ],
        edges: [
          { source: 'Harry Potter', target: 'Hermione Granger', name: 'friend' },
          { source: 'Harry Potter', target: 'Ron Weasley', name: 'friend' },
          { source: 'Harry Potter', target: 'Voldemort', name: 'enemy' },
          { source: 'Voldemort', target: 'Harry Potter', name: 'try to kill' },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'network-graph-rough', {
      maxError: Infinity,
    });
  });

  it('network-graph-academy', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'network-graph',
      theme: 'academy',
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

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'network-graph-academy', {
      maxError: Infinity,
    });
  });
});
