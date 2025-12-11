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
        { category: '总计', isTotal: true },
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
        { category: 'Total', isTotal: true },
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
        { category: 'Total', isTotal: true },
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
        { category: 'Total', isTotal: true },
      ],
      axisXTitle: 'Quarter',
      axisYTitle: 'Amount',
      theme: 'dark',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'waterfall-theme-dark');
    vis.destroy();
  });

  it('waterfall-custom-color', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'waterfall',
      data: [
        { category: 'Q1', value: 6200000 },
        { category: 'Q2', value: -2600000 },
        { category: 'Q3', value: 4100000 },
        { category: 'Q4', value: 3700000 },
        { category: 'Total', isTotal: true },
      ],
      axisXTitle: 'Quarter',
      axisYTitle: 'Amount',
      positiveColor: '#00FF00',
      negativeColor: '#FF0000',
      totalColor: '#0000FF',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'waterfall-custom-color');
    vis.destroy();
  });

  test('waterfall-total', async () => {
    const vis = await render({
      type: 'waterfall',
      data: [
        { category: '第一季度', value: 6200000 },
        { category: '第二季度', value: 2600000 },
        { category: '统计', value: 8800000, isTotal: true },
        { category: '第三季度', value: 4100000 },
        { category: '第四季度', value: -3700000 },
        { category: '总计', isTotal: true },
      ],
      axisXTitle: 'Quarter',
      axisYTitle: 'Amount',
    });
    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'waterfall-total');
    vis.destroy();
  });

  test('waterfall-intermediate-total', async () => {
    const vis = await render({
      type: 'waterfall',
      data: [
        { category: '第一季度', value: 120000000 },
        { category: '第二季度', value: 569000000 },
        { category: '第三季度', value: 231000000 },
        { category: '前三季度总计', isIntermediateTotal: true },
        { category: '第四季度', value: -342000000 },
        { category: '第五季度', value: -232000000 },
        { category: '四五季度总计', isIntermediateTotal: true },
        { category: '总计', isTotal: true },
      ],
      axisXTitle: 'Quarter',
      axisYTitle: 'Amount',
    });
    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'waterfall-intermediate-total');
    vis.destroy();
  });
});
