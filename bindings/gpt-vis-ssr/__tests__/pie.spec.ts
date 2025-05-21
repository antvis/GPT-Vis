import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('pie', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'pie',
      data: [
        { category: '分类一', value: 27 },
        { category: '分类二', value: 25 },
        { category: '分类三', value: 18 },
        { category: '分类四', value: 15 },
        { category: '分类五', value: 10 },
        { category: '其他', value: 5 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'pie');
  });

  it('pie-academy', async () => {
    const vis = await render({
      theme: 'academy',
      width: 600,
      height: 400,
      type: 'pie',
      data: [
        { category: '分类一', value: 27 },
        { category: '分类二', value: 25 },
        { category: '分类三', value: 18 },
        { category: '分类四', value: 15 },
        { category: '分类五', value: 10 },
        { category: '其他', value: 5 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'pie-academy');
  });
});
