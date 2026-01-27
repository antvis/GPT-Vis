# FishboneDiagram

鱼骨图 (Fishbone Diagram / Ishikawa Diagram) - 以核心问题为鱼头，通过鱼骨分支的形式分析和展示问题原因或结果的图表。

## Usage

```ts
import { FishboneDiagram } from '@antv/gpt-vis/ai';

const fishbone = FishboneDiagram({
  container: '#container',
  width: 600,
  height: 400,
});

fishbone.render({
  type: 'fishbone-diagram',
  data: {
    name: '产品销量下降',
    children: [
      {
        name: '市场推广',
        children: [{ name: '广告投入减少' }, { name: '促销活动不足' }],
      },
      {
        name: '产品质量',
        children: [{ name: '产品缺陷' }, { name: '品质不稳定' }],
      },
    ],
  },
  theme: 'default',
});

fishbone.destroy();
```

## Configuration

### Constructor Options (FishboneDiagramOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (FishboneDiagramConfig)

| Property | Type   | Default   | Description                           |
| -------- | ------ | --------- | ------------------------------------- |
| type     | string | -         | Chart type, must be 'fishbone-diagram'|
| data     | object | -         | Tree data structure                   |
| theme    | string | 'default' | Theme: 'default' or 'academy'         |

### Data Structure

```ts
type FishboneDiagramDataItem = {
  name: string; // Node name (required)
  children?: FishboneDiagramDataItem[]; // Child nodes (optional)
};
```

## Examples

### Basic Cause Analysis

```ts
fishbone.render({
  data: {
    name: '生产效率低',
    children: [
      {
        name: '设备问题',
        children: [{ name: '设备老化' }, { name: '维护不及时' }],
      },
      {
        name: '员工问题',
        children: [{ name: '技能不足' }, { name: '工作态度差' }],
      },
      {
        name: '流程问题',
        children: [{ name: '流程繁琐' }, { name: '缺乏标准化' }],
      },
    ],
  },
});
```

### With Academy Theme

```ts
fishbone.render({
  data: {
    name: 'Problem',
    children: [
      {
        name: 'Category A',
        children: [{ name: 'Cause A1' }, { name: 'Cause A2' }],
      },
      {
        name: 'Category B',
        children: [{ name: 'Cause B1' }],
      },
    ],
  },
  theme: 'academy',
});
```

## Applicable Scenarios

- 问题根本原因分析 (Root Cause Analysis)
- 质量管理中的因果关系分析
- 生产流程问题诊断
- 多因素问题分解
- 项目风险分析

## Methods

- `render(config: FishboneDiagramConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
