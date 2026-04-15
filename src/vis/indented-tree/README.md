# Indented Tree

缩进树图（Indented Tree），用于以水平缩进方式展示层次结构数据的图表。通过根节点向右延伸、子节点逐级缩进的布局，直观呈现数据的父子关系和层级深度。适合展示目录结构、组织层级、文件系统等树形数据。

## 适用场景

1. 文件目录与文档大纲展示：适合呈现文件系统目录结构或文档章节大纲，通过逐级缩进直观体现层级深度与父子关系。
2. 知识体系与分类管理：适合展示知识分类体系、学科目录、标签分类等具有明确层次结构的内容，便于快速定位节点位置。
3. 层级菜单与导航结构：适合呈现多级菜单、站点导航或系统功能模块的层级关系，帮助用户理解整体结构。
4. 项目分解结构（WBS）：适合展示项目任务的逐级拆解，清晰呈现任务从顶层目标到具体工作包的分解路径。

## 不适用场景

1. 不适合展示无层级关系的平铺数据。
2. 不适合用于展示网状或环状关联关系，建议使用网络图。
3. 当层级过深或节点数量极多时，建议考虑思维导图或组织架构图等替代方案。

## 配置

- type：图表类型，必填，文本类型，值为 "indented-tree"。
- data：缩进树图数据，必填，对象类型，树形节点结构，包含以下字段：
  - name：节点名称，必填，文本类型。
  - children：子节点列表，选填，数组类型，每项递归包含相同的节点结构。
- title：图表标题，选填，文本类型。
- direction：布局方向，选填，文本类型，可选值为 "LR" | "RL" | "H"，默认值为 "LR"。其中 "LR" 表示根节点居左，"RL" 表示根节点居右，"H" 表示根节点居中。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 示例

### 展示项目目录结构

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis indented-tree
data
  - name my-project
    children
      - name src
        children
          - name components
          - name pages
          - name utils
      - name public
      - name package.json
title 项目目录结构
`;

gptVis.render(visSyntax);
```
