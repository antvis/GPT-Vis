import { IndentedTree } from '@antv/gpt-vis';
import React from 'react';

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

export default () => <IndentedTree data={data} />;
