import { render } from '../src';
import './utils/matcher';

describe('SSR render table-sheet', () => {
  it('table-sheet-basic', async () => {
    const vis = await render({
      type: 'table-sheet',
      width: 500,
      height: 300,
      dataCfg: {
        fields: {
          columns: ['province', 'city', 'type', 'price'],
        },
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '宁波', type: '纸张', price: 20 },
          { province: '江苏', city: '南京', type: '笔', price: 15 },
          { province: '江苏', city: '苏州', type: '纸张', price: 25 },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'table-sheet-basic');
    vis.destroy();
  });

  it('table-sheet-dark', async () => {
    const vis = await render({
      type: 'table-sheet',
      width: 500,
      height: 300,
      dataCfg: {
        fields: {
          columns: ['province', 'city', 'type', 'price'],
        },
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '宁波', type: '纸张', price: 20 },
          { province: '江苏', city: '南京', type: '笔', price: 15 },
        ],
      },
      themeCfg: {
        name: 'dark',
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'table-sheet-dark');
    vis.destroy();
  });

  it('table-sheet-colorful', async () => {
    const vis = await render({
      type: 'table-sheet',
      width: 500,
      height: 300,
      dataCfg: {
        fields: {
          columns: ['province', 'city', 'type', 'price'],
        },
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '宁波', type: '纸张', price: 20 },
          { province: '江苏', city: '南京', type: '笔', price: 15 },
        ],
      },
      themeCfg: {
        name: 'colorful',
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'table-sheet-colorful');
    vis.destroy();
  });
});
