import { render } from '../src';
import './utils/matcher';

describe('SSR render spreadsheet', () => {
  // 交叉表测试
  describe('pivot table mode (with rows/values)', () => {
    it('spreadsheet-pivot-basic', async () => {
      const vis = await render({
        type: 'spreadsheet',
        width: 600,
        height: 400,
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '杭州', type: '纸张', price: 20 },
          { province: '浙江', city: '宁波', type: '笔', price: 15 },
          { province: '浙江', city: '宁波', type: '纸张', price: 25 },
          { province: '江苏', city: '南京', type: '笔', price: 12 },
          { province: '江苏', city: '南京', type: '纸张', price: 22 },
        ],
        rows: ['province', 'city'],
        columns: ['type'],
        values: ['price'],
      });

      expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'spreadsheet-pivot-basic');
      vis.destroy();
    });

    it('spreadsheet-pivot-dark', async () => {
      const vis = await render({
        type: 'spreadsheet',
        width: 600,
        height: 400,
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '杭州', type: '纸张', price: 20 },
          { province: '浙江', city: '宁波', type: '笔', price: 15 },
          { province: '浙江', city: '宁波', type: '纸张', price: 25 },
        ],
        rows: ['province', 'city'],
        columns: ['type'],
        values: ['price'],
        theme: 'dark',
      });

      expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'spreadsheet-pivot-dark');
      vis.destroy();
    });

    it('spreadsheet-pivot-no-columns', async () => {
      const vis = await render({
        type: 'spreadsheet',
        width: 600,
        height: 300,
        data: [
          { province: '浙江', city: '杭州', price: 10, cost: 5 },
          { province: '浙江', city: '宁波', price: 15, cost: 8 },
          { province: '江苏', city: '南京', price: 12, cost: 6 },
        ],
        rows: ['province', 'city'],
        values: ['price', 'cost'],
      });

      expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'spreadsheet-pivot-no-columns');
      vis.destroy();
    });
  });

  // 普通表格测试
  describe('table mode (without rows/values)', () => {
    it('spreadsheet-table-basic', async () => {
      const vis = await render({
        type: 'spreadsheet',
        width: 500,
        height: 300,
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '宁波', type: '纸张', price: 20 },
          { province: '江苏', city: '南京', type: '笔', price: 15 },
          { province: '江苏', city: '苏州', type: '纸张', price: 25 },
        ],
        columns: ['province', 'city', 'type', 'price'],
      });

      expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'spreadsheet-table-basic');
      vis.destroy();
    });

    it('spreadsheet-table-dark', async () => {
      const vis = await render({
        type: 'spreadsheet',
        width: 500,
        height: 300,
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '宁波', type: '纸张', price: 20 },
          { province: '江苏', city: '南京', type: '笔', price: 15 },
        ],
        columns: ['province', 'city', 'type', 'price'],
        theme: 'dark',
      });

      expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'spreadsheet-table-dark');
      vis.destroy();
    });

    it('spreadsheet-table-no-columns', async () => {
      // 不指定 columns，按数据字段顺序自动生成列
      const vis = await render({
        type: 'spreadsheet',
        width: 500,
        height: 300,
        data: [
          { province: '浙江', city: '杭州', type: '笔', price: 10 },
          { province: '浙江', city: '宁波', type: '纸张', price: 20 },
          { province: '江苏', city: '南京', type: '笔', price: 15 },
        ],
      });

      expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'spreadsheet-table-no-columns');
      vis.destroy();
    });
  });
});
