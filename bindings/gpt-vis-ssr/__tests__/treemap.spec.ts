import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('treemap', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'treemap',
      data: [
        { name: '分类 1', value: 560 },
        { name: '分类 2', value: 500 },
        { name: '分类 3', value: 150 },
        { name: '分类 4', value: 140 },
        { name: '分类 5', value: 115 },
        { name: '分类 6', value: 95 },
        { name: '分类 7', value: 90 },
        { name: '分类 8', value: 75 },
        { name: '分类 9', value: 98 },
        { name: '分类 10', value: 60 },
        { name: '分类 11', value: 45 },
        { name: '分类 12', value: 40 },
        { name: '分类 13', value: 40 },
        { name: '分类 14', value: 35 },
        { name: '分类 15', value: 40 },
        { name: '分类 16', value: 40 },
        { name: '分类 17', value: 40 },
        { name: '分类 18', value: 30 },
        { name: '分类 19', value: 28 },
        { name: '分类 20', value: 16 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'treemap');
  });

  it('treemap-academy', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'treemap',
      theme: 'academy',
      data: [
        { name: '分类 1', value: 560 },
        { name: '分类 2', value: 500 },
        { name: '分类 3', value: 150 },
        { name: '分类 4', value: 140 },
        { name: '分类 5', value: 115 },
        { name: '分类 6', value: 95 },
        { name: '分类 7', value: 90 },
        { name: '分类 8', value: 75 },
        { name: '分类 9', value: 98 },
        { name: '分类 10', value: 60 },
        { name: '分类 11', value: 45 },
        { name: '分类 12', value: 40 },
        { name: '分类 13', value: 40 },
        { name: '分类 14', value: 35 },
        { name: '分类 15', value: 40 },
        { name: '分类 16', value: 40 },
        { name: '分类 17', value: 40 },
        { name: '分类 18', value: 30 },
        { name: '分类 19', value: 28 },
        { name: '分类 20', value: 16 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'treemap-academy');
  });
});
