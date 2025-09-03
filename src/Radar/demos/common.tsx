import { Radar } from '@antv/gpt-vis';
import { Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { name: '沟通能力', value: 2 },
  { name: '协作能力', value: 3 },
  { name: '领导能力', value: 2 },
  { name: '学习能力', value: 5 },
  { name: '创新能力', value: 6 },
  { name: '技术能力', value: 9 },
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
      <Radar data={data} containerStyle={{ height: 300 }} theme={theme} />
    </div>
  );
};
