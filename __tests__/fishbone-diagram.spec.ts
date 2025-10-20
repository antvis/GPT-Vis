import { test } from '@playwright/test';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Fishbone Diagram component tests', () => {
  test('fishbone-diagram', async ({ page }) => {
    const spec = {
      type: 'fishbone-diagram',
      data: {
        name: '生产效率低',
        children: [
          {
            name: '设备问题',
            children: [{ name: '设备老化' }, { name: '维护不及时' }],
          },
          {
            name: '员工问题',
            children: [{ name: '技能不足' }, { name: '工作态度差' }],
          },
          {
            name: '流程问题',
            children: [{ name: '流程繁琐' }, { name: '缺乏标准化' }],
          },
        ],
      },
    };
    await renderChartAndSnapshot(page, spec, 'fishbone-diagram.png');
  });

  test('fishbone-diagram-required', async ({ page }) => {
    const spec = {
      type: 'fishbone-diagram',
      data: {
        name: '生产效率低',
        children: [
          {
            name: '设备问题',
            children: [{ name: '设备老化' }, { name: '维护不及时' }],
          },
          {
            name: '员工问题',
            children: [{ name: '技能不足' }, { name: '工作态度差' }],
          },
          {
            name: '流程问题',
            children: [{ name: '流程繁琐' }, { name: '缺乏标准化' }],
          },
        ],
      },
    };
    await renderChartAndSnapshot(page, spec, 'fishbone-diagram-required.png');
  });

  test('fishbone-diagram-academy', async ({ page }) => {
    const spec = {
      type: 'fishbone-diagram',
      theme: 'academy',
      data: {
        name: '生产效率低',
        children: [
          {
            name: '设备问题',
            children: [{ name: '设备老化' }, { name: '维护不及时' }],
          },
          {
            name: '员工问题',
            children: [{ name: '技能不足' }, { name: '工作态度差' }],
          },
          {
            name: '流程问题',
            children: [{ name: '流程繁琐' }, { name: '缺乏标准化' }],
          },
        ],
      },
    };
    await renderChartAndSnapshot(page, spec, 'fishbone-diagram-academy.png');
  });
});
