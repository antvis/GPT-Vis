import { OrganizationChart } from '@antv/gpt-vis';
import React from 'react';

const data = {
  name: 'Alice Johnson',
  description: 'Chief Technology Officer',
  children: [
    {
      name: 'Bob Smith',
      description: 'Senior Software Engineer',
      children: [
        {
          name: 'Charlie Brown',
          description: 'Software Engineer',
        },
        {
          name: 'Diana White',
          description: 'Software Engineer',
        },
      ],
    },
    {
      name: 'Eve Black',
      description: 'IT Support Department Head',
      children: [
        {
          name: 'Frank Green',
          description: 'IT Support Specialist',
        },
        {
          name: 'Grace Blue',
          description: 'IT Support Specialist',
        },
      ],
    },
  ],
};

export default () => <OrganizationChart data={data} containerStyle={{ height: 300 }} />;
