import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('mind-map', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'mind-map',
      data: {
        name: '项目计划',
        children: [
          {
            name: '研究阶段',
            children: [{ name: '市场调研' }, { name: '技术可行性分析' }],
          },
          {
            name: '设计阶段',
            children: [{ name: '产品功能确定' }, { name: 'UI 设计' }],
          },
          {
            name: '开发阶段',
            children: [{ name: '编写代码' }, { name: '单元测试' }],
          },
          {
            name: '测试阶段',
            children: [{ name: '功能测试' }, { name: '性能测试' }],
          },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'mind-map');
  });

  it('mind-map-required', async () => {
    const vis = await render({
      type: 'mind-map',
      data: {
        name: '项目计划',
        children: [
          {
            name: '研究阶段',
            children: [{ name: '市场调研' }, { name: '技术可行性分析' }],
          },
          {
            name: '设计阶段',
            children: [{ name: '产品功能确定' }, { name: 'UI 设计' }],
          },
          {
            name: '开发阶段',
            children: [{ name: '编写代码' }, { name: '单元测试' }],
          },
          {
            name: '测试阶段',
            children: [{ name: '功能测试' }, { name: '性能测试' }],
          },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'mind-map-required');
  });

  it('mind-map-multidata', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'mind-map',
      data: {
        name: '10天前端学习路线',
        children: [
          {
            name: 'Day 1: HTML基础',
            children: [
              { name: 'HTML语法与语义化' },
              { name: '常用标签与表单元素' },
              { name: 'SEO基础' },
            ],
          },
          {
            name: 'Day 2: CSS基础',
            children: [
              { name: '选择器与盒模型' },
              { name: 'Flex布局基础' },
              { name: '动画与过渡' },
            ],
          },
          {
            name: 'Day 3: 响应式设计',
            children: [{ name: '媒体查询' }, { name: 'Grid布局' }, { name: '移动优先原则' }],
          },
          {
            name: 'Day 4: JavaScript基础',
            children: [{ name: '语法基础' }, { name: 'DOM操作' }, { name: '事件处理' }],
          },
          {
            name: 'Day 5: ES6+',
            children: [{ name: '箭头函数' }, { name: 'Promise/Async' }, { name: '模块化开发' }],
          },
          {
            name: 'Day 6: 前端框架基础',
            children: [{ name: 'React/Vue基础' }, { name: '组件化开发' }, { name: '生命周期' }],
          },
          {
            name: 'Day 7: 状态管理',
            children: [{ name: 'Redux/Vuex' }, { name: 'Context API' }, { name: '数据流管理' }],
          },
          {
            name: 'Day 8: 构建工具',
            children: [{ name: 'Webpack基础' }, { name: 'Babel配置' }, { name: '代码优化' }],
          },
          {
            name: 'Day 9: 工程化实践',
            children: [{ name: '单元测试' }, { name: 'CI/CD基础' }, { name: '性能优化' }],
          },
          {
            name: 'Day 10: 综合项目',
            children: [{ name: '项目架构设计' }, { name: '代码规范实践' }, { name: '部署上线' }],
          },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'mind-map-multidata');
  });

  it('mind-map-multidata-academy', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'mind-map',
      theme: 'academy',
      data: {
        name: '10天前端学习路线',
        children: [
          {
            name: 'Day 1: HTML基础',
            children: [
              { name: 'HTML语法与语义化' },
              { name: '常用标签与表单元素' },
              { name: 'SEO基础' },
            ],
          },
          {
            name: 'Day 2: CSS基础',
            children: [
              { name: '选择器与盒模型' },
              { name: 'Flex布局基础' },
              { name: '动画与过渡' },
            ],
          },
          {
            name: 'Day 3: 响应式设计',
            children: [{ name: '媒体查询' }, { name: 'Grid布局' }, { name: '移动优先原则' }],
          },
          {
            name: 'Day 4: JavaScript基础',
            children: [{ name: '语法基础' }, { name: 'DOM操作' }, { name: '事件处理' }],
          },
          {
            name: 'Day 5: ES6+',
            children: [{ name: '箭头函数' }, { name: 'Promise/Async' }, { name: '模块化开发' }],
          },
          {
            name: 'Day 6: 前端框架基础',
            children: [{ name: 'React/Vue基础' }, { name: '组件化开发' }, { name: '生命周期' }],
          },
          {
            name: 'Day 7: 状态管理',
            children: [{ name: 'Redux/Vuex' }, { name: 'Context API' }, { name: '数据流管理' }],
          },
          {
            name: 'Day 8: 构建工具',
            children: [{ name: 'Webpack基础' }, { name: 'Babel配置' }, { name: '代码优化' }],
          },
          {
            name: 'Day 9: 工程化实践',
            children: [{ name: '单元测试' }, { name: 'CI/CD基础' }, { name: '性能优化' }],
          },
          {
            name: 'Day 10: 综合项目',
            children: [{ name: '项目架构设计' }, { name: '代码规范实践' }, { name: '部署上线' }],
          },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'mind-map-multidata-academy');
  });

  it('mind-map-text-ellipsis', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'mind-map',
      theme: 'academy',
      data: {
        name: '10天前端学习路线',
        children: [
          {
            name: 'Day 1: HTML基础: Day 1: HTML基础: Day 1: HTML基础',
            children: [
              { name: 'HTML语法与语义化' },
              { name: '常用标签与表单元素' },
              { name: 'SEO基础' },
            ],
          },
          {
            name: 'Day 2: CSS基础',
            children: [
              { name: '选择器与盒模型' },
              { name: 'Flex布局基础' },
              { name: '动画与过渡' },
            ],
          },
          {
            name: 'Day 3: 响应式设计',
            children: [{ name: '媒体查询' }, { name: 'Grid布局' }, { name: '移动优先原则' }],
          },
          {
            name: 'Day 4: JavaScript基础',
            children: [{ name: '语法基础' }, { name: 'DOM操作' }, { name: '事件处理' }],
          },
          {
            name: 'Day 5: ES6+',
            children: [{ name: '箭头函数' }, { name: 'Promise/Async' }, { name: '模块化开发' }],
          },
          {
            name: 'Day 6: 前端框架基础',
            children: [{ name: 'React/Vue基础' }, { name: '组件化开发' }, { name: '生命周期' }],
          },
          {
            name: 'Day 7: 状态管理',
            children: [{ name: 'Redux/Vuex' }, { name: 'Context API' }, { name: '数据流管理' }],
          },
          {
            name: 'Day 8: 构建工具',
            children: [{ name: 'Webpack基础' }, { name: 'Babel配置' }, { name: '代码优化' }],
          },
          {
            name: 'Day 9: 工程化实践',
            children: [{ name: '单元测试' }, { name: 'CI/CD基础' }, { name: '性能优化' }],
          },
          {
            name: 'Day 10: 综合项目',
            children: [{ name: '项目架构设计' }, { name: '代码规范实践' }, { name: '部署上线' }],
          },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'mind-map-text-ellipsis');
  });
});
