# Sankey

A sankey chart component for visualizing flow, energy, fund transfer relationships between nodes, built with G2 5.0.

## Usage

```ts
import { Sankey } from '@antv/gpt-vis/ai';

const sankey = Sankey({
  container: '#container',
  width: 600,
  height: 400,
});

sankey.render({
  data: [
    { source: '煤炭', target: '发电厂', value: 120 },
    { source: '天然气', target: '发电厂', value: 80 },
    { source: '发电厂', target: '工业', value: 100 },
    { source: '发电厂', target: '居民', value: 60 },
    { source: '发电厂', target: '商业', value: 40 },
  ],
});

sankey.destroy();
```

## Configuration

### Constructor Options (SankeyOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (SankeyConfig)

| Property  | Type   | Default   | Description                                                |
| --------- | ------ | --------- | ---------------------------------------------------------- |
| data      | Array  | -         | Chart data array                                           |
| nodeAlign | string | 'center'  | Node alignment: 'left' \| 'center' \| 'right' \| 'justify' |
| theme     | string | 'default' | Color theme: 'default' \| 'academy' \| 'dark'              |
| title     | string | -         | Chart title                                                |
| style     | object | -         | Chart style configuration                                  |

### Data Structure

```ts
type SankeyDataItem = {
  source: string; // Source node name
  target: string; // Target node name
  value: number; // Flow value
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

### Basic Example

```ts
sankey.render({
  data: [
    { source: '煤炭', target: '发电厂', value: 120 },
    { source: '天然气', target: '发电厂', value: 80 },
    { source: '发电厂', target: '工业', value: 100 },
  ],
});
```

### With Title and Node Alignment

```ts
sankey.render({
  data: [
    { source: '煤炭', target: '发电厂', value: 120 },
    { source: '天然气', target: '发电厂', value: 80 },
    { source: '发电厂', target: '工业', value: 100 },
  ],
  title: '能源流动关系',
  nodeAlign: 'justify',
});
```

### With Academy Theme

```ts
sankey.render({
  data: [
    { source: '投资人', target: '创业公司', value: 200 },
    { source: '创业公司', target: '市场营销', value: 80 },
    { source: '创业公司', target: '研发', value: 120 },
  ],
  theme: 'academy',
  title: '资金流转路径',
});
```

### With Dark Theme

```ts
sankey.render({
  data: [
    { source: '投资人', target: '创业公司', value: 200 },
    { source: '创业公司', target: '市场营销', value: 80 },
    { source: '创业公司', target: '研发', value: 120 },
  ],
  theme: 'dark',
  title: '资金流转路径',
});
```

### With Custom Styles

```ts
sankey.render({
  data: [
    { source: '首页', target: '产品页', value: 300 },
    { source: '产品页', target: '购物车', value: 150 },
    { source: '购物车', target: '结算页', value: 100 },
  ],
  title: '用户行为路径',
  style: {
    palette: ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16', '#7262FD'],
    backgroundColor: '#f0f2f5',
  },
});
```

## Methods

- `render(config: SankeyConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
