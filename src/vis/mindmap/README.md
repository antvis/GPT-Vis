# Mindmap

思维导图（Mindmap），用于以树状分支结构可视化层级数据的图表。以中心主题为根节点，向四周延伸出各级子节点，直观呈现概念之间的从属与关联关系。适合用于知识梳理、头脑风暴和结构化分析。

## 适用场景

1. 知识体系梳理：将复杂的知识领域按层级分解，直观呈现各概念之间的从属与关联关系。
2. 头脑风暴与创意整理：围绕中心主题发散思维，快速捕捉并组织创意想法。
3. 项目规划与任务分解：以中心目标为根节点，逐层拆解子任务与工作项，清晰呈现工作结构。
4. 学习笔记结构化：将学习内容按主题归类整理，形成层次分明的知识框架，便于复习和记忆。

## 不适用场景

1. 不适合展示时间序列或趋势变化数据。
2. 不适合用于定量对比分析，如数值大小、占比等场景。
3. 当节点数量极多且层级较深时，建议拆分为多个独立的思维导图以保持可读性。

## 配置

| 属性                  | 类型     | 是否必填 | 默认值    | 说明                                                                                                                        |
| --------------------- | -------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| type                  | string   | 必填     | -         | 图表类型，值为 "mindmap"                                                                                                    |
| data                  | object   | 必填     | -         | 思维导图数据，树形节点结构，包含 name（string，必填）和 children（array，选填，每项递归包含相同的 { name, children } 结构） |
| title                 | string   | 选填     | -         | 图表标题                                                                                                                    |
| direction             | string   | 选填     | "H"       | 布局方向，可选值为 "H"（左右两侧展开） \| "LR"（从左到右） \| "RL"（从右到左）                                              |
| theme                 | string   | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark"                                                                         |
| style.backgroundColor | string   | 选填     | -         | 背景颜色，合法颜色值                                                                                                        |
| style.palette         | string[] | 选填     | -         | 颜色映射，合法颜色值数组                                                                                                    |

## 示例

### 展示项目规划思维导图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis mindmap
data
  name 项目规划
  children
    - name 调研
      children
        - name 市场调研
        - name 技术可行性
    - name 开发
      children
        - name 前端
        - name 后端
title 项目规划思维导图
`;

gptVis.render(visSyntax);
```
