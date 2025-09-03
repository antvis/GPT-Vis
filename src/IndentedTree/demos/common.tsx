import { IndentedTree } from '@antv/gpt-vis';
import { Select } from 'antd';
import React, { useState } from 'react';

const data = {
  name: 'my-project',
  children: [
    {
      name: 'src',
      children: [
        {
          name: 'components',
          children: [
            {
              name: 'Header.tsx',
            },
            {
              name: 'Footer.tsx',
            },
          ],
        },
        {
          name: 'pages',
          children: [
            {
              name: 'Home.tsx',
            },
            {
              name: 'About.tsx',
            },
          ],
        },
        {
          name: 'App.tsx',
        },
        {
          name: 'index.tsx',
        },
      ],
    },
    {
      name: 'public',
      children: [
        {
          name: 'index.html',
        },
        {
          name: 'favicon.ico',
        },
      ],
    },
    {
      name: 'package.json',
    },
    {
      name: 'tsconfig.json',
    },
    {
      name: 'README.md',
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
      <IndentedTree data={data} theme={theme} />
    </div>
  );
};
