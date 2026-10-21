# 层级与流向

## `treemap`

```ts
type TreemapNode = {
  name: string;
  value: number;
  children?: TreemapNode[];
};

{ type: 'treemap'; data: TreemapNode[] }
```

父节点和叶节点均可提供 `value`；同一层级的值应使用一致单位。

## `sankey`

```ts
{
  type: 'sankey';
  data: { source: string; target: string; value: number }[];
  nodeAlign?: 'left' | 'center' | 'right' | 'justify';
}
```

每条边必须包含权重 `value`。

## `flow-diagram` / `network-graph`

```ts
type GraphData = {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
};

{ type: 'flow-diagram'; data: GraphData }

{
  type: 'network-graph';
  data: GraphData;
  layout?: 'force' | 'circular' | 'grid' | 'radial' | 'concentric' | 'dagre';
}
```

`source` 和 `target` 必须引用 `nodes[].name`。流程依赖优先使用 `flow-diagram`；一般关系网络使用 `network-graph`。

## `mindmap`

```ts
type MindmapNode = {
  name: string;
  children?: MindmapNode[];
};

{
  type: 'mindmap';
  data: MindmapNode;
  direction?: 'H' | 'LR' | 'RL';
}
```

默认方向为 `H`。

## `indented-tree`

```ts
type IndentedTreeNode = {
  name: string;
  children?: IndentedTreeNode[];
};

{
  type: 'indented-tree';
  data: IndentedTreeNode;
  direction?: 'LR' | 'RL' | 'H';
}
```

默认方向为 `LR`。

## `organization-chart`

```ts
type OrganizationNode = {
  name: string;
  description?: string;
  children?: OrganizationNode[];
};

{
  type: 'organization-chart';
  data: OrganizationNode;
}
```

`description` 适合职位、部门或职责说明。

## `fishbone-diagram`

```ts
type FishboneNode = {
  name: string;
  children?: FishboneNode[];
};

{
  type: 'fishbone-diagram';
  data: FishboneNode;
  style?: CommonStyle & { texture?: 'rough' | 'default' };
}
```

根节点表示待分析的问题，一级子节点表示主要原因类别。
