import { render } from '../src';
import './utils/matcher';

describe('SSR render pivot-table', () => {
  it('pivot-table-basic', async () => {
    const vis = await render({
      type: 'pivot-table',
      width: 600,
      height: 400,
      dataCfg: {
        fields: {
          rows: ['province', 'city'],
          columns: ['type'],
          values: ['price'],
        },
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '杭州', type: '纸张', price: 20 },
          { province: '浙江', city: '宁波', type: '笔', price: 15 },
          { province: '浙江', city: '宁波', type: '纸张', price: 25 },
          { province: '江苏', city: '南京', type: '笔', price: 12 },
          { province: '江苏', city: '南京', type: '纸张', price: 22 },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'pivot-table-basic');
    vis.destroy();
  });

  it('pivot-table-dark', async () => {
    const vis = await render({
      type: 'pivot-table',
      width: 600,
      height: 400,
      dataCfg: {
        fields: {
          rows: ['province', 'city'],
          columns: ['type'],
          values: ['price'],
        },
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '杭州', type: '纸张', price: 20 },
          { province: '浙江', city: '宁波', type: '笔', price: 15 },
          { province: '浙江', city: '宁波', type: '纸张', price: 25 },
        ],
      },
      themeCfg: {
        name: 'dark',
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'pivot-table-dark');
    vis.destroy();
  });

  it('pivot-table-colorful', async () => {
    const vis = await render({
      type: 'pivot-table',
      width: 600,
      height: 400,
      dataCfg: {
        fields: {
          rows: ['province', 'city'],
          columns: ['type'],
          values: ['price'],
        },
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '杭州', type: '纸张', price: 20 },
          { province: '浙江', city: '宁波', type: '笔', price: 15 },
          { province: '浙江', city: '宁波', type: '纸张', price: 25 },
        ],
      },
      themeCfg: {
        name: 'colorful',
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'pivot-table-colorful');
    vis.destroy();
  });

  it('pivot-table-no-columns', async () => {
    const vis = await render({
      type: 'pivot-table',
      width: 600,
      height: 300,
      dataCfg: {
        fields: {
          rows: ['province', 'city'],
          values: ['price', 'cost'],
        },
        data: [
          { province: '浙江', city: '杭州', price: 10, cost: 5 },
          { province: '浙江', city: '宁波', price: 15, cost: 8 },
          { province: '江苏', city: '南京', price: 12, cost: 6 },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'pivot-table-no-columns');
    vis.destroy();
  });
});
