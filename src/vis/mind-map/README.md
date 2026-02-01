# MindMap

A mind map for hierarchical information organization, built with @ant-design/graphs.

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
      {
        name: '开发阶段',
        children: [{ name: '编写代码' }, { name: '单元测试' }],
      },
      {
        name: '测试阶段',
        children: [{ name: '功能测试' }, { name: '性能测试' }],
      },
    ],
  },
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

| Property | Type   | Default    | Description               |
| -------- | ------ | ---------- | ------------------------- |
| type     | string | 'mind-map' | Component type identifier |
| data     | object | -          | Mind map data             |
| theme    | string | 'default'  | Color theme               |

**Theme Options:**

- `'default'` - Default color scheme
- `'academy'` - Academy color scheme

### Data Structure

```ts
type MindMapData = {
  name: string;
  children?: MindMapData[];
};
```

**Fields:**

- `name` (required): Node name displayed in the mind map
- `children` (optional): Array of child nodes, creating a hierarchical tree structure

## Examples

### Basic Example

```ts
mindMap.render({
  type: 'mind-map',
  data: {
    name: '人工智能应用',
    children: [
      { name: '智能家居' },
      { name: '自动驾驶' },
      {
        name: '医疗保健',
        children: [{ name: '精准医疗' }, { name: '诊断辅助' }],
      },
      { name: '金融服务' },
    ],
  },
});
```

### With Academy Theme

```ts
mindMap.render({
  type: 'mind-map',
  data: {
    name: '台风形成的因素',
    children: [
      {
        name: '气象条件',
        children: [
          { name: '温暖的海水' },
          { name: '气压分布' },
          { name: '湿度水平' },
          { name: '风的切变' },
        ],
      },
      {
        name: '地理环境',
        children: [
          { name: '大陆架的形状与深度' },
          { name: '海洋暖流的分布' },
          { name: '热带地区的气候特征' },
          { name: '岛屿的影响' },
        ],
      },
    ],
  },
  theme: 'academy',
});
```

## Features

- **Interactive Navigation**: Supports drag-canvas for panning around the mind map
- **Collapse/Expand**: Click on nodes to collapse or expand their children
- **Automatic Layout**: Uses boxed layout that distributes nodes on both sides of the root
- **Zoom Controls**: Zoom range from 0.1x to 5x
- **Auto Fit**: Automatically fits the entire graph into the view
- **Color-Coded Branches**: Each main branch has a distinct color for easy identification

## Methods

- `render(config: MindMapConfig): void` - Render or update the mind map
- `destroy(): void` - Destroy the mind map instance and clean up resources

## Use Cases

Mind maps are ideal for:

- Project planning and task breakdown
- Knowledge organization and note-taking
- Brainstorming and idea mapping
- Hierarchical information presentation
- Content structuring

## Not Suitable For

- Continuous narratives or stories
- Pure numerical or statistical data
- Unstructured or themeless information
- Precise operational steps or instructions
