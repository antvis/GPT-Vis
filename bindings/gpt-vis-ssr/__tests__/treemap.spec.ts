import { render } from '../src';
import { PALETTE } from './constant';
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

  it('treemap-required', async () => {
    const vis = await render({
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

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'treemap-required');
  });

  it('treemap-rough', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'treemap',
      style: {
        texture: 'rough',
      },
      data: [
        { name: 'Category 1', value: 560 },
        { name: 'Category 2', value: 500 },
        { name: 'Category 3', value: 150 },
        { name: 'Category 4', value: 140 },
        { name: 'Category 5', value: 115 },
        { name: 'Category 6', value: 95 },
        { name: 'Category 7', value: 90 },
        { name: 'Category 8', value: 75 },
        { name: 'Category 9', value: 98 },
        { name: 'Category 10', value: 60 },
        { name: 'Category 11', value: 45 },
        { name: 'Category 12', value: 40 },
        { name: 'Category 13', value: 40 },
        { name: 'Category 14', value: 35 },
        { name: 'Category 15', value: 40 },
        { name: 'Category 16', value: 40 },
        { name: 'Category 17', value: 40 },
        { name: 'Category 18', value: 30 },
        { name: 'Category 19', value: 28 },
        { name: 'Category 20', value: 16 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'treemap-rough');
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

  it('treemap-style', async () => {
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
      style: {
        backgroundColor: 'gray',
        palette: PALETTE,
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'treemap-style');
  });
});
