import { MindMap } from '@antv/gpt-vis';
import React from 'react';

const data = {
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
};

export default () => <MindMap data={data} containerStyle={{ height: 300 }} />;
