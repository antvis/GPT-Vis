# OrganizationChart

An organization chart visualization component for hierarchical organizational structures, built with G6 5.0.

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
      {
        name: 'CTO',
        description: 'Chief Technology Officer',
        children: [{ name: 'Engineering Manager', description: 'Engineering' }],
      },
      {
        name: 'CFO',
        description: 'Chief Financial Officer',
      },
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

| Property | Type   | Default    | Description                                    |
| -------- | ------ | ---------- | ---------------------------------------------- |
| data     | object | -          | Tree data structure                            |
| theme    | string | 'default'  | Color theme                                    |
| orient   | string | 'vertical' | Chart orientation ('vertical' or 'horizontal') |
| style    | object | -          | Chart style configuration                      |

### Data Structure

```ts
type OrganizationChartDataItem = {
  name: string;
  description?: string;
  children?: OrganizationChartDataItem[];
  [key: string]: any;
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string; // Background color
}
```

## Examples

### Basic Example

```ts
orgChart.render({
  type: 'organization-chart',
  data: {
    name: 'CEO',
    description: 'Chief Executive Officer',
    children: [
      { name: 'CTO', description: 'Technology' },
      { name: 'CFO', description: 'Finance' },
    ],
  },
});
```

### With Horizontal Orientation

```ts
orgChart.render({
  type: 'organization-chart',
  data: {
    name: 'CEO',
    children: [{ name: 'Manager' }],
  },
  orient: 'horizontal',
});
```

### With Theme

```ts
orgChart.render({
  type: 'organization-chart',
  data: {
    name: 'CEO',
    children: [{ name: 'CTO' }],
  },
  theme: 'academy',
});
```

### With Custom Styles

```ts
orgChart.render({
  type: 'organization-chart',
  data: {
    name: 'CEO',
    children: [{ name: 'CTO' }],
  },
  style: {
    backgroundColor: '#f0f0f0',
  },
});
```

## Methods

- `render(config: OrganizationChartConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
