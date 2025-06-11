import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('funnel', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      title: '漏斗图',
      type: 'funnel',
      data: [
        { category: '浏览网站', value: 50000 },
        { category: '放入购物车', value: 35000 },
        { category: '生成订单', value: 25000 },
        { category: '支付订单', value: 15000 },
        { category: '完成交易', value: 8000 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'funnel');
  });

  it('funnel-academy', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'funnel',
      theme: 'academy',
      data: [
        { type: '浏览网站', value: 50000 },
        { type: '放入购物车', value: 35000 },
        { type: '生成订单', value: 25000 },
        { type: '支付订单', value: 15000 },
        { type: '完成交易', value: 8000 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'funnel-academy');
  });
});
