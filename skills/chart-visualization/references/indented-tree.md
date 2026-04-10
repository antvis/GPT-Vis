## 图表属性

- 名称：缩进树
- 别名：层级树、目录树，英文名：Indented Tree
- 形状：树形
- 图表类别：关系图
- 图表功能：通过水平缩进展示树节点的层级关系

## 基础概念

缩进树通过水平方向的缩进量来表示树节点层级的布局方式。每个元素占据一行，父节点在上方，子节点以缩进的方式排列在下方，层层缩进直观地展示出节点的深度和从属关系。常用于文件目录结构、组织层级、分类体系等需要清晰展示层级关系的场景。

## 适用场景

- 展示文件目录结构，如项目文件树、磁盘目录浏览。
- 展示分类体系，如产品分类、知识体系目录。
- 展示组织层级关系，侧重于展示层级的深度和数量。
- 展示软件包依赖关系或模块引用关系。
- 需要在有限宽度内展示较深层级的树形数据。

## 不适用场景

1. 节点之间存在交叉引用（非树形结构），更推荐使用网络图。
2. 需要对比节点间数量大小关系，更推荐使用柱状图或树图。
3. 数据层级超过 10 层，视觉效果会很拥挤。
4. 需要展示以核心主题为中心双向辐射的层级，更推荐使用思维导图。

## 图表用法

### 图表属性

```typescript
type IndentedTreeData = {
  name: string;
  children?: IndentedTreeData[];
};

type IndentedTree = {
  type: 'indented-tree';
  data: IndentedTreeData;
  direction?: 'LR' | 'RL' | 'H';
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "indented-tree"。
- data：图表的数据，必填，`IndentedTreeData` 对象类型，包含以下字段：
  - name：节点的名称，必填，字符串类型；
  - children：当前节点的子节点集合，选填，数组对象类型。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `IndentedTreeData` 对象，可以递归构建多层次的树状结构；
- direction：布局方向，选填，文本类型，可选值为 "LR"（根节点在左，向右展开，默认）、"RL"（根在右，向左展开）、"H"（根在中间，双向展开）。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - palette：颜色映射，选填，数组类型，合法颜色值数组。
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。

## 使用示例

1. 前端项目的目录结构，包含 src、public、package.json，其中 src 下有 components、pages、utils 三个文件夹。

```
vis indented-tree
data
  name my-project
  children
    - name src
      children
        - name components
          children
            - name Button
            - name Modal
        - name pages
          children
            - name Home
            - name About
        - name utils
    - name public
    - name package.json
title 项目目录结构
```

2. 人工智能知识体系分类，从根节点向右展开，包含机器学习和深度学习两大分支。

```
vis indented-tree
data
  name 人工智能
  children
    - name 机器学习
      children
        - name 监督学习
        - name 无监督学习
        - name 强化学习
    - name 深度学习
      children
        - name 卷积神经网络
        - name 循环神经网络
direction LR
title 人工智能知识体系
```

3. 公司部门层级结构，双向展开，dark 主题，自定义配色。

```
vis indented-tree
data
  name 公司
  children
    - name 技术部
      children
        - name 前端组
        - name 后端组
        - name 测试组
    - name 产品部
      children
        - name 产品设计组
        - name 用户研究组
    - name 运营部
      children
        - name 市场推广组
        - name 用户运营组
direction H
theme dark
style
  palette #5B8FF9 #61DDAA #65789B #F6BD16 #7262FD
```
