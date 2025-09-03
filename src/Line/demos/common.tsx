import { Line } from '@antv/gpt-vis';
import { Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { time: '1991', value: 3 },
  { time: '1992', value: 4 },
  { time: '1993', value: 3.5 },
  { time: '1994', value: 5 },
  { time: '1995', value: 4.9 },
  { time: '1996', value: 6 },
  { time: '1997', value: 7 },
  { time: '1998', value: 9 },
  { time: '1999', value: 13 },
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
      <Line
        data={data}
        axisXTitle="year"
        axisYTitle="growth"
        containerStyle={{ height: 300 }}
        theme={theme}
      />
    </div>
  );
};
