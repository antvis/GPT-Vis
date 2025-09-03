import { Treemap } from '@antv/gpt-vis';
import { Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { name: '分类 1', value: 560 },
  { name: '分类 2', value: 500 },
  { name: '分类 3', value: 150 },
  { name: '分类 4', value: 140 },
  { name: '分类 5', value: 115 },
  { name: '分类 6', value: 95 },
  { name: '分类 7', value: 90 },
  { name: '分类 8', value: 75 },
  { name: '分类 9', value: 98 },
  { name: '分类 10', value: 60 },
  { name: '分类 11', value: 45 },
  { name: '分类 12', value: 40 },
  { name: '分类 13', value: 40 },
  { name: '分类 14', value: 35 },
  { name: '分类 15', value: 40 },
  { name: '分类 16', value: 40 },
  { name: '分类 17', value: 40 },
  { name: '分类 18', value: 30 },
  { name: '分类 19', value: 28 },
  { name: '分类 20', value: 16 },
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
      <Treemap data={data} theme={theme} />
    </div>
  );
};
