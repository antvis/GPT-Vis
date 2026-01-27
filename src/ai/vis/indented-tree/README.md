# IndentedTree

缩进树图 (Indented Tree) - 以线性缩进的方式展示层级树状数据结构。

## Usage

```ts
import { IndentedTree } from '@antv/gpt-vis/ai';

const indentedTree = IndentedTree({
  container: '#container',
  width: 600,
  height: 400,
});

indentedTree.render({
  type: 'indented-tree',
  data: {
    name: 'Root',
    children: [
      {
        name: 'Documents',
        children: [
          { name: 'file1.txt' },
          { name: 'file2.pdf' },
        ],
      },
      {
        name: 'Pictures',
        children: [{ name: 'photo1.jpg' }],
      },
    ],
  },
  theme: 'default',
});

indentedTree.destroy();
```

## Configuration

### Constructor Options (IndentedTreeOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (IndentedTreeConfig)

| Property | Type   | Default   | Description                        |
| -------- | ------ | --------- | ---------------------------------- |
| type     | string | -         | Chart type, must be 'indented-tree'|
| data     | object | -         | Tree data structure                |
| theme    | string | 'default' | Theme: 'default' or 'academy'      |

### Data Structure

```ts
type IndentedTreeDataItem = {
  name: string; // Node name (required)
  children?: IndentedTreeDataItem[]; // Child nodes (optional)
};
```

## Examples

### Basic File System Example

```ts
indentedTree.render({
  data: {
    name: 'File System',
    children: [
      {
        name: 'Documents',
        children: [
          { name: 'file1.txt' },
          { name: 'file2.pdf' },
          {
            name: 'Reports',
            children: [
              { name: 'Q1_report.docx' },
              { name: 'Q2_report.docx' },
            ],
          },
        ],
      },
      {
        name: 'Pictures',
        children: [{ name: 'photo1.jpg' }, { name: 'photo2.png' }],
      },
    ],
  },
});
```

### With Academy Theme

```ts
indentedTree.render({
  data: {
    name: 'Company',
    children: [
      {
        name: 'Engineering',
        children: [{ name: 'Frontend Team' }, { name: 'Backend Team' }],
      },
      {
        name: 'Marketing',
        children: [{ name: 'Content Team' }],
      },
    ],
  },
  theme: 'academy',
});
```

## Applicable Scenarios

- 文件系统结构展示
- 组织架构的线性展示
- 层级分类目录
- 代码目录结构

## Methods

- `render(config: IndentedTreeConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
