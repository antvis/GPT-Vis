import { MindMap } from '@antv/gpt-vis';
import { Select } from 'antd';
import React, { useState } from 'react';

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

const themes = ['default', 'academy'];

export default () => {
  const [theme, setTheme] = useState<'default' | 'academy'>('default');

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="theme-select" style={{ marginRight: 8, fontSize: '14px' }}>
          Theme:
        </label>
        <Select
          id="theme-select"
          value={theme}
          onChange={(value) => setTheme(value)}
          style={{ width: 120 }}
          options={themes.map((t) => ({
            label: t,
            value: t,
          }))}
        />
      </div>
      <MindMap data={data} containerStyle={{ height: 300 }} theme={theme} />
    </div>
  );
};
