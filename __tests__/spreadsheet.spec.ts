import { test } from '@playwright/test';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 800, height: 600 } });

test.describe('Spreadsheet component tests', () => {
  test('spreadsheet-table', async ({ page }) => {
    const spec = {
      type: 'spreadsheet',
      data: [
        { 省份: '浙江', 城市: '杭州', 类型: '笔', 价格: 1 },
        { 省份: '浙江', 城市: '杭州', 类型: '纸张', 价格: 2 },
        { 省份: '浙江', 城市: '舟山', 类型: '笔', 价格: 17 },
        { 省份: '浙江', 城市: '舟山', 类型: '纸张', 价格: 6 },
      ],
      title: '销售明细表',
    };
    await renderChartAndSnapshot(page, spec, 'spreadsheet-table.png');
  });

  test('spreadsheet-pivot', async ({ page }) => {
    const spec = {
      type: 'spreadsheet',
      data: [
        { 省份: '浙江', 城市: '杭州', 类型: '笔', 价格: 1 },
        { 省份: '浙江', 城市: '杭州', 类型: '纸张', 价格: 2 },
        { 省份: '浙江', 城市: '舟山', 类型: '笔', 价格: 17 },
        { 省份: '浙江', 城市: '舟山', 类型: '纸张', 价格: 6 },
        { 省份: '吉林', 城市: '长春', 类型: '笔', 价格: 8 },
        { 省份: '吉林', 城市: '长春', 类型: '纸张', 价格: 3 },
      ],
      rows: ['省份', '城市'],
      columns: ['类型'],
      values: ['价格'],
      title: '销售透视表',
    };
    await renderChartAndSnapshot(page, spec, 'spreadsheet-pivot.png');
  });

  test('spreadsheet-dark-theme', async ({ page }) => {
    const spec = {
      type: 'spreadsheet',
      data: [
        { 地区: '华东', 产品: '电脑', 销售额: 50000, 利润: 8000 },
        { 地区: '华东', 产品: '手机', 销售额: 35000, 利润: 5500 },
        { 地区: '华北', 产品: '电脑', 销售额: 42000, 利润: 6800 },
        { 地区: '华北', 产品: '手机', 销售额: 28000, 利润: 4200 },
      ],
      rows: ['地区'],
      columns: ['产品'],
      values: ['销售额', '利润'],
      theme: 'dark',
      title: '区域产品销售分析',
    };
    await renderChartAndSnapshot(page, spec, 'spreadsheet-dark-theme.png');
  });

  test('spreadsheet-simple-data', async ({ page }) => {
    const spec = {
      type: 'spreadsheet',
      data: [
        { 姓名: '张三', 年龄: 25, 部门: '技术部' },
        { 姓名: '李四', 年龄: 30, 部门: '市场部' },
        { 姓名: '王五', 年龄: 28, 部门: '财务部' },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'spreadsheet-simple-data.png');
  });
});
