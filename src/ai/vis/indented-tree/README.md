# IndentedTree

An indented tree visualization component for hierarchical data with a linear layout, built with G6 5.0.

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
        name: 'Child 1',
        children: [{ name: 'Grandchild 1.1' }, { name: 'Grandchild 1.2' }],
      },
      {
        name: 'Child 2',
        children: [{ name: 'Grandchild 2.1' }],
      },
    ],
  },
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

| Property | Type   | Default   | Description               |
| -------- | ------ | --------- | ------------------------- |
| data     | object | -         | Tree data structure       |
| theme    | string | 'default' | Color theme               |
| style    | object | -         | Chart style configuration |

### Data Structure

```ts
type IndentedTreeDataItem = {
  name: string;
  description?: string;
  children?: IndentedTreeDataItem[];
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
indentedTree.render({
  type: 'indented-tree',
  data: {
    name: 'Root',
    children: [
      {
        name: 'Level 1 - Item 1',
        children: [{ name: 'Level 2 - Item 1.1' }, { name: 'Level 2 - Item 1.2' }],
      },
      {
        name: 'Level 1 - Item 2',
      },
    ],
  },
});
```

### With Theme

```ts
indentedTree.render({
  type: 'indented-tree',
  data: {
    name: 'File System',
    children: [
      {
        name: 'Documents',
        children: [{ name: 'file1.txt' }, { name: 'file2.pdf' }],
      },
      {
        name: 'Pictures',
        children: [{ name: 'photo1.jpg' }],
      },
    ],
  },
  theme: 'academy',
});
```

### With Custom Styles

```ts
indentedTree.render({
  type: 'indented-tree',
  data: {
    name: 'Root',
    children: [{ name: 'Child' }],
  },
  style: {
    backgroundColor: '#f0f0f0',
  },
});
```

## Methods

- `render(config: IndentedTreeConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
