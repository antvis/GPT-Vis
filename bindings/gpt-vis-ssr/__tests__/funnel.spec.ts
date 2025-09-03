import { render } from '../src';
import { PALETTE } from './constant';
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

  it('funnel-rough', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      title: 'Funnel Chart',
      type: 'funnel',
      data: [
        { category: 'View Website', value: 50000 },
        { category: 'Add to Cart', value: 35000 },
        { category: 'Generate Order', value: 25000 },
        { category: 'Pay Order', value: 15000 },
        { category: 'Complete Transaction', value: 8000 },
      ],
      style: {
        texture: 'rough',
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'funnel-rough');
  });

  it('funnel-academy', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'funnel',
      theme: 'academy',
      data: [
        { category: '浏览网站', value: 50000 },
        { category: '放入购物车', value: 35000 },
        { category: '生成订单', value: 25000 },
        { category: '支付订单', value: 15000 },
        { category: '完成交易', value: 8000 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'funnel-academy');
  });

  it('funnel-long-text', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      title: '漏斗图',
      type: 'funnel',
      data: [
        { category: 'show', value: 100 },
        { category: 'click', value: 80 },
        { category: 'visit', value: 60 },
        { category: 'inquiry', value: 40 },
        { category: 'order', value: 20 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'funnel-long-text');
  });

  it('funnel-style', async () => {
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
      style: {
        backgroundColor: 'gray',
        palette: PALETTE,
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'funnel-style');
  });
});
