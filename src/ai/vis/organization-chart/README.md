# OrganizationChart

An organization chart for visualizing hierarchical organizational structures, built with G6.

## Usage

```ts
import { OrganizationChart } from '@antv/gpt-vis/ai';

const orgChart = OrganizationChart({
  container: '#container',
  width: 600,
  height: 400,
});

orgChart.render({
  type: 'organization-chart',
  data: {
    name: 'CEO',
    description: 'Chief Executive Officer',
    children: [
      { name: 'CTO', description: 'Chief Technology Officer' },
      { name: 'CFO', description: 'Chief Financial Officer' },
    ],
  },
});

orgChart.destroy();
```

## Configuration

### Constructor Options (OrganizationChartOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (OrganizationChartConfig)

| Property | Type                  | Default              | Description               |
| -------- | --------------------- | -------------------- | ------------------------- |
| type     | string                | 'organization-chart' | Component type identifier |
| data     | OrganizationChartData | -                    | Organization chart data   |

### Data Structure

```ts
type OrganizationChartData = {
  name: string;
  description?: string;
  children?: OrganizationChartData[];
};
```

## Examples

### Basic Organization Chart

```ts
orgChart.render({
  type: 'organization-chart',
  data: {
    name: 'CEO',
    description: 'Chief Executive Officer',
    children: [
      {
        name: 'CTO',
        description: 'Chief Technology Officer',
        children: [
          { name: 'Dev Manager', description: 'Development Manager' },
          { name: 'QA Manager', description: 'Quality Assurance Manager' },
        ],
      },
      {
        name: 'CFO',
        description: 'Chief Financial Officer',
        children: [{ name: 'Accountant', description: 'Senior Accountant' }],
      },
    ],
  },
});
```

## Methods

- `render(config: OrganizationChartConfig): void` - Render or update the organization chart
- `destroy(): void` - Destroy the organization chart instance and clean up resources
