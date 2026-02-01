# Funnel

A funnel chart component for displaying multi-stage data flow and conversion rates, built with G2 5.0. Ideal for analyzing sales processes, user conversion, and activity participation.

## Usage

```ts
import { Funnel } from '@antv/gpt-vis/ai';

const funnel = Funnel({
  container: '#container',
  width: 600,
  height: 400,
});

funnel.render({
  data: [
    { category: '访问', value: 1000 },
    { category: '咨询', value: 600 },
    { category: '下单', value: 300 },
    { category: '成交', value: 120 },
  ],
});

funnel.destroy();
```

## Configuration

### Constructor Options (FunnelOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (FunnelConfig)

| Property | Type                             | Default   | Description               |
| -------- | -------------------------------- | --------- | ------------------------- |
| data     | FunnelDataItem[]                 | -         | Chart data array          |
| theme    | 'default' \| 'academy' \| 'dark' | 'default' | Color theme               |
| title    | string                           | -         | Chart title               |
| style    | object                           | -         | Chart style configuration |

### FunnelDataItem

```ts
type FunnelDataItem = {
  category: string; // Stage name
  value: number; // Stage value
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string;  // Background color
  palette?: string[];        // Color palette
}
```

## Examples

### Basic Funnel Chart

```ts
funnel.render({
  data: [
    { category: '访问', value: 1000 },
    { category: '咨询', value: 600 },
    { category: '下单', value: 300 },
    { category: '成交', value: 120 },
  ],
});
```

### With Title

```ts
funnel.render({
  data: [
    { category: '访问', value: 1000 },
    { category: '咨询', value: 600 },
    { category: '下单', value: 300 },
    { category: '成交', value: 120 },
  ],
  title: '销售漏斗',
});
```

### Academy Theme

```ts
funnel.render({
  data: [
    { category: '注册', value: 800 },
    { category: '激活', value: 500 },
    { category: '付费', value: 200 },
  ],
  theme: 'academy',
  title: '用户转化流程',
});
```

### Dark Theme

```ts
funnel.render({
  data: [
    { category: '访问', value: 1000 },
    { category: '咨询', value: 600 },
    { category: '下单', value: 300 },
    { category: '成交', value: 120 },
  ],
  theme: 'dark',
});
```

### Custom Styles

```ts
// Custom colors
funnel.render({
  data: [
    { category: '报名', value: 1500 },
    { category: '签到', value: 900 },
    { category: '参与', value: 700 },
  ],
  title: '活动参与漏斗',
  style: {
    palette: ['#FF7F50', '#87CEFA', '#32CD32'],
    backgroundColor: '#FFF8DC',
  },
});
```

## Methods

- `render(config: FunnelConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
