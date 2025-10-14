import { test } from '@playwright/test';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Flow Diagram component tests', () => {
  test('flow-diagram', async ({ page }) => {
    const spec = {
      type: 'flow-diagram',
      data: {
        nodes: [
          { name: '客户咨询' },
          { name: '判断问题类型' },
          { name: '技术问题' },
          { name: '售后问题' },
          { name: '咨询产品信息' },
          { name: '转接技术部门' },
          { name: '转接售后部门' },
          { name: '提供产品信息' },
          { name: '客户是否满意' },
          { name: '满意' },
          { name: '不满意' },
          { name: '记录反馈' },
        ],
        edges: [
          { source: '客户咨询', target: '判断问题类型' },
          { source: '判断问题类型', target: '技术问题', name: '技术问题' },
          { source: '判断问题类型', target: '售后问题', name: '售后问题' },
          { source: '判断问题类型', target: '咨询产品信息', name: '产品咨询' },
          { source: '技术问题', target: '转接技术部门' },
          { source: '售后问题', target: '转接售后部门' },
          { source: '咨询产品信息', target: '提供产品信息' },
          { source: '转接技术部门', target: '客户是否满意' },
          { source: '转接售后部门', target: '客户是否满意' },
          { source: '提供产品信息', target: '客户是否满意' },
          { source: '客户是否满意', target: '满意', name: '满意' },
          { source: '客户是否满意', target: '不满意', name: '不满意' },
          { source: '不满意', target: '记录反馈' },
        ],
      },
    };
    await renderChartAndSnapshot(page, spec, 'flow-diagram.png');
  });

  test('flow-diagram-required', async ({ page }) => {
    const spec = {
      type: 'flow-diagram',
      data: {
        nodes: [
          { name: '客户咨询' },
          { name: '判断问题类型' },
          { name: '技术问题' },
          { name: '售后问题' },
          { name: '咨询产品信息' },
          { name: '转接技术部门' },
          { name: '转接售后部门' },
          { name: '提供产品信息' },
          { name: '客户是否满意' },
          { name: '满意' },
          { name: '不满意' },
          { name: '记录反馈' },
        ],
        edges: [
          { source: '客户咨询', target: '判断问题类型' },
          { source: '判断问题类型', target: '技术问题', name: '技术问题' },
          { source: '判断问题类型', target: '售后问题', name: '售后问题' },
          { source: '判断问题类型', target: '咨询产品信息', name: '产品咨询' },
          { source: '技术问题', target: '转接技术部门' },
          { source: '售后问题', target: '转接售后部门' },
          { source: '咨询产品信息', target: '提供产品信息' },
          { source: '转接技术部门', target: '客户是否满意' },
          { source: '转接售后部门', target: '客户是否满意' },
          { source: '提供产品信息', target: '客户是否满意' },
          { source: '客户是否满意', target: '满意', name: '满意' },
          { source: '客户是否满意', target: '不满意', name: '不满意' },
          { source: '不满意', target: '记录反馈' },
        ],
      },
    };
    await renderChartAndSnapshot(page, spec, 'flow-diagram-required.png');
  });

  test('flow-diagram-academy', async ({ page }) => {
    const spec = {
      type: 'flow-diagram',
      theme: 'academy',
      data: {
        nodes: [
          { name: '客户咨询' },
          { name: '判断问题类型' },
          { name: '技术问题' },
          { name: '售后问题' },
          { name: '咨询产品信息' },
          { name: '转接技术部门' },
          { name: '转接售后部门' },
          { name: '提供产品信息' },
          { name: '客户是否满意' },
          { name: '满意' },
          { name: '不满意' },
          { name: '记录反馈' },
        ],
        edges: [
          { source: '客户咨询', target: '判断问题类型' },
          { source: '判断问题类型', target: '技术问题', name: '技术问题' },
          { source: '判断问题类型', target: '售后问题', name: '售后问题' },
          { source: '判断问题类型', target: '咨询产品信息', name: '产品咨询' },
          { source: '技术问题', target: '转接技术部门' },
          { source: '售后问题', target: '转接售后部门' },
          { source: '咨询产品信息', target: '提供产品信息' },
          { source: '转接技术部门', target: '客户是否满意' },
          { source: '转接售后部门', target: '客户是否满意' },
          { source: '提供产品信息', target: '客户是否满意' },
          { source: '客户是否满意', target: '满意', name: '满意' },
          { source: '客户是否满意', target: '不满意', name: '不满意' },
          { source: '不满意', target: '记录反馈' },
        ],
      },
    };
    await renderChartAndSnapshot(page, spec, 'flow-diagram-academy.png');
  });

  test('flow-diagram-text-ellipsis', async ({ page }) => {
    const spec = {
      type: 'flow-diagram',
      theme: 'academy',
      data: {
        nodes: [
          { name: '客户咨询客户咨询客户咨询客户咨询客户咨询客户咨询客户咨询客户咨询客户咨询' },
          { name: '判断问题类型' },
          { name: '技术问题' },
          { name: '售后问题' },
          { name: '咨询产品信息' },
          { name: '转接技术部门' },
          { name: '转接售后部门' },
          { name: '提供产品信息' },
          { name: '客户是否满意' },
          { name: '满意' },
          { name: '不满意' },
          { name: '记录反馈' },
        ],
        edges: [
          {
            source: '客户咨询客户咨询客户咨询客户咨询客户咨询客户咨询客户咨询客户咨询客户咨询',
            target: '判断问题类型',
          },
          { source: '判断问题类型', target: '技术问题', name: '技术问题' },
          { source: '判断问题类型', target: '售后问题', name: '售后问题' },
          { source: '判断问题类型', target: '咨询产品信息', name: '产品咨询' },
          { source: '技术问题', target: '转接技术部门' },
          { source: '售后问题', target: '转接售后部门' },
          { source: '咨询产品信息', target: '提供产品信息' },
          { source: '转接技术部门', target: '客户是否满意' },
          { source: '转接售后部门', target: '客户是否满意' },
          { source: '提供产品信息', target: '客户是否满意' },
          { source: '客户是否满意', target: '满意', name: '满意' },
          { source: '客户是否满意', target: '不满意', name: '不满意' },
          { source: '不满意', target: '记录反馈' },
        ],
      },
    };
    await renderChartAndSnapshot(page, spec, 'flow-diagram-text-ellipsis.png');
  });
});
