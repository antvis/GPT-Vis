import { test } from '@playwright/test';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

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

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Organization Chart component tests', () => {
  test('organization-chart', async ({ page }) => {
    const spec = {
      type: 'organization-chart',
      data: DATA,
    };
    await renderChartAndSnapshot(page, spec, 'organization-chart.png');
  });
});
