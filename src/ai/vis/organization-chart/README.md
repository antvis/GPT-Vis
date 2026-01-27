# OrganizationChart

组织架构图 (Organization Chart) - 用于直观地展示组织内部的层级结构和部门关系。

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
    name: 'Alice Johnson',
    description: 'Chief Technology Officer',
    children: [
      {
        name: 'Bob Smith',
        description: 'Senior Software Engineer',
        children: [
          { name: 'Charlie Brown', description: 'Software Engineer' },
        ],
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

| Property | Type   | Default | Description                              |
| -------- | ------ | ------- | ---------------------------------------- |
| type     | string | -       | Chart type, must be 'organization-chart' |
| data     | object | -       | Tree data structure                      |

### Data Structure

```ts
type OrganizationChartDataItem = {
  name: string; // Node name (required)
  description?: string; // Job title or description (optional)
  children?: OrganizationChartDataItem[]; // Child nodes (optional)
};
```

## Examples

### Basic Example

```ts
orgChart.render({
  data: {
    name: 'Eric Joplin',
    description: 'Chief Executive Officer',
    children: [
      {
        name: 'Linda Newland',
        description: 'Chief Executive Assistant',
      },
    ],
  },
});
```

### Multi-level Structure

```ts
orgChart.render({
  data: {
    name: 'CEO',
    description: 'Chief Executive Officer',
    children: [
      {
        name: 'CTO',
        description: 'Chief Technology Officer',
        children: [
          { name: 'Engineering Manager', description: 'Engineering' },
          { name: 'QA Manager', description: 'Quality Assurance' },
        ],
      },
      {
        name: 'CFO',
        description: 'Chief Financial Officer',
      },
    ],
  },
});
```

## Applicable Scenarios

- 展示公司或团队的层级结构
- 明确各个职位和部门的上下级关系
- 项目管理时，明确项目团队的成员和职责分工
- 股权穿透、投资上下游公司等依赖分析

## Methods

- `render(config: OrganizationChartConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
