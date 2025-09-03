import { Pie } from '@antv/gpt-vis';
import { Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { category: '分类一', value: 27 },
  { category: '分类二', value: 25 },
  { category: '分类三', value: 18 },
  { category: '分类四', value: 15 },
  { category: '分类五', value: 10 },
  { category: '其他', value: 5 },
];

const themes = ['default', 'academy', 'dark'] as const;

export default () => {
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');

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
      <Pie data={data} containerStyle={{ height: 300 }} theme={theme} />
    </div>
  );
};
