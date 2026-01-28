# IndentedTree

An indented tree for visualizing hierarchical data with a linear layout, built with G6.

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
    children: [{ name: 'Child 1' }, { name: 'Child 2', children: [{ name: 'Grandchild' }] }],
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

| Property | Type             | Default         | Description                          |
| -------- | ---------------- | --------------- | ------------------------------------ |
| type     | string           | 'indented-tree' | Component type identifier            |
| data     | IndentedTreeData | -               | Indented tree data                   |
| theme    | string           | 'default'       | Color theme ('default' or 'academy') |

### Data Structure

```ts
type IndentedTreeData = {
  name: string;
  children?: IndentedTreeData[];
};
```

## Examples

### Basic Indented Tree

```ts
indentedTree.render({
  type: 'indented-tree',
  data: {
    name: 'Project',
    children: [
      {
        name: 'Frontend',
        children: [{ name: 'Components' }, { name: 'Styles' }],
      },
      {
        name: 'Backend',
        children: [{ name: 'API' }, { name: 'Database' }],
      },
    ],
  },
});
```

### With Academy Theme

```ts
indentedTree.render({
  type: 'indented-tree',
  data: {
    name: 'Root',
    children: [{ name: 'Child 1' }, { name: 'Child 2' }],
  },
  theme: 'academy',
});
```

## Methods

- `render(config: IndentedTreeConfig): void` - Render or update the indented tree
- `destroy(): void` - Destroy the indented tree instance and clean up resources
