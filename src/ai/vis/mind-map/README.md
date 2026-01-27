# MindMap

思维导图 (Mind Map) - 以中心主题为核心，通过层级分支的形式组织和展示信息的图表。

## Usage

```ts
import { MindMap } from '@antv/gpt-vis/ai';

const mindMap = MindMap({
  container: '#container',
  width: 600,
  height: 400,
});

mindMap.render({
  type: 'mind-map',
  data: {
    name: '项目计划',
    children: [
      {
        name: '研究阶段',
        children: [{ name: '市场调研' }, { name: '技术可行性分析' }],
      },
      {
        name: '设计阶段',
        children: [{ name: '产品功能确定' }, { name: 'UI 设计' }],
      },
    ],
  },
  theme: 'default',
});

mindMap.destroy();
```

## Configuration

### Constructor Options (MindMapOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (MindMapConfig)

| Property | Type   | Default   | Description                     |
| -------- | ------ | --------- | ------------------------------- |
| type     | string | -         | Chart type, must be 'mind-map'  |
| data     | object | -         | Tree data structure             |
| theme    | string | 'default' | Theme: 'default' or 'academy'   |

### Data Structure

```ts
type MindMapDataItem = {
  name: string; // Node name (required)
  children?: MindMapDataItem[]; // Child nodes (optional)
};
```

## Examples

### Basic Example

```ts
mindMap.render({
  data: {
    name: '人工智能应用',
    children: [
      { name: '智能家居' },
      { name: '自动驾驶' },
      {
        name: '医疗保健',
        children: [{ name: '精准医疗' }, { name: '诊断辅助' }],
      },
    ],
  },
});
```

### With Academy Theme

```ts
mindMap.render({
  data: {
    name: 'Project Plan',
    children: [
      { name: 'Research', children: [{ name: 'Market Analysis' }] },
      { name: 'Design', children: [{ name: 'UI Design' }] },
    ],
  },
  theme: 'academy',
});
```

## Applicable Scenarios

- 内容围绕一个核心主题展开
- 内容可以按照逻辑层次进行分解
- 帮助提取并结构化关键信息

## Methods

- `render(config: MindMapConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
