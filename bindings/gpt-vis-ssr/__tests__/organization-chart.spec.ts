import { render } from '../src';
import './utils/matcher';

const DATA = {
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

describe('SSR render', () => {
  it('organization-chart', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'organization-chart',
      data: DATA,
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'organization-chart');
  });

  it('organization-chart-rough', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'organization-chart',
      data: DATA,
      style: {
        texture: 'rough',
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'organization-chart-rough');
  });

  it('organization-chart horizontal', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'organization-chart',
      data: DATA,
      orient: 'horizontal',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'organization-chart-horizontal');
  });

  it('organization-chart academy', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'organization-chart',
      theme: 'academy',
      data: DATA,
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'organization-chart-academy');
  });
});
