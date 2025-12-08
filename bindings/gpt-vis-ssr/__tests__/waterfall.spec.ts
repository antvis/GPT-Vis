import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('waterfall', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'waterfall',
      data: [
        { category: '第一季度', value: 6200000 },
        { category: '第二季度', value: -2600000 },
        { category: '第三季度', value: 4100000 },
        { category: '第四季度', value: 3700000 },
        { category: '总计', value: 11400000, isTotal: true },
      ],
      axisXTitle: '季度',
      axisYTitle: '金额',
      title: 'Waterfall Chart',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'waterfall');
    vis.destroy();
  });

  it('waterfall-required', async () => {
    const vis = await render({
      type: 'waterfall',
      data: [
        { category: 'Q1', value: 5000000 },
        { category: 'Q2', value: -1000000 },
        { category: 'Q3', value: 3000000 },
        { category: 'Q4', value: 2000000 },
        { category: 'Total', value: 9000000, isTotal: true },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'waterfall-required');
    vis.destroy();
  });

  it('waterfall-rough', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'waterfall',
      data: [
        { category: 'Q1', value: 6200000 },
        { category: 'Q2', value: -2600000 },
        { category: 'Q3', value: 4100000 },
        { category: 'Q4', value: 3700000 },
        { category: 'Total', value: 11400000, isTotal: true },
      ],
      axisXTitle: 'Quarter',
      axisYTitle: 'Amount',
      style: {
        texture: 'rough',
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'waterfall-rough');
    vis.destroy();
  });

  it('waterfall-theme-dark', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'waterfall',
      data: [
        { category: 'Q1', value: 6200000 },
        { category: 'Q2', value: -2600000 },
        { category: 'Q3', value: 4100000 },
        { category: 'Q4', value: 3700000 },
        { category: 'Total', value: 11400000, isTotal: true },
      ],
      axisXTitle: 'Quarter',
      axisYTitle: 'Amount',
      theme: 'dark',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'waterfall-theme-dark');
    vis.destroy();
  });

  it('waterfall-custom-palette', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'waterfall',
      data: [
        { category: 'Q1', value: 6200000 },
        { category: 'Q2', value: -2600000 },
        { category: 'Q3', value: 4100000 },
        { category: 'Q4', value: 3700000 },
        { category: 'Total', value: 11400000, isTotal: true },
      ],
      axisXTitle: 'Quarter',
      axisYTitle: 'Amount',
      style: {
        palette: ['#8459fc', '#ff89bd', '#1677ff'],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'waterfall-custom-palette');
    vis.destroy();
  });
});
