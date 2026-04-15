import { LayoutGrid } from 'lucide-react';
export const treemapData = {
  id: 'treemap',
  name: 'Treemap',
  icon: LayoutGrid,
  galleryExamples:
    'vis treemap\ndata\n  - name 技术部\n    value 100\n    children\n      - name 前端组\n        value 40\n      - name 后端组\n        value 35\n      - name 测试组\n        value 25\n  - name 产品部\n    value 80\n    children\n      - name 产品设计组\n        value 50\n      - name 用户研究组\n        value 30',
  description:
    '矩阵树图是一种用于显示数据分层结构的图表，它通过将数据分级嵌套在矩形区域中来展示层级关系。每个矩形代表一个类别，矩形的大小对应于该类别的数值大小。矩阵树图非常适合可视化多个类别之间的比例，尤其在数据量较大时，可以帮助快速分析数据的重要性或权重。',
  knowledge: {
    introduction:
      '矩阵树图是一种用于显示数据分层结构的图表，它通过将数据分级嵌套在矩形区域中来展示层级关系。每个矩形代表一个类别，矩形的大小对应于该类别的数值大小。矩阵树图非常适合可视化多个类别之间的比例，尤其在数据量较大时，可以帮助快速分析数据的重要性或权重。',
    useCases: [
      '显示具有层级结构的数据，例如公司组织结构、目录文件系统等。',
      '对多个分类项目进行对比，展示各类别在整体中的占比。',
      '分析各类目之间的关系、比例以及子类别对父类别的贡献。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "treemap"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组对象类型，包含多个嵌套对象；',
          },
          {
            property: 'data.name',
            type: 'required',
            description: '分类名称，必填，文本类型；',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '分类的数值大小，必填，数值类型；',
          },
          {
            property: 'data.children',
            type: 'optional',
            description: '子分类列表，可选，数组对象类型；',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表的标题，选填，文本类型。',
          },
          {
            property: 'theme',
            type: 'optional',
            description:
              '图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。',
          },
          {
            property: 'style',
            type: 'optional',
            description: '图表样式，选填，对象类型；',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            description: '背景颜色，选填，文本类型，值为合法的颜色值。',
          },
          {
            property: 'style.palette',
            type: 'optional',
            description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        '用矩阵树图展示某科技公司各部门员工人数：技术部 100 人（前端组 40 人、后端组 35 人、测试组 25 人），产品部 80 人（产品设计组 50 人、用户研究组 30 人）。',
      description:
        '用矩阵树图展示某科技公司各部门员工人数：技术部 100 人（前端组 40 人、后端组 35 人、测试组 25 人），产品部 80 人（产品设计组 50 人、用户研究组 30 人）。',
      code: 'vis treemap\ndata\n  - name 技术部\n    value 100\n    children\n      - name 前端组\n        value 40\n      - name 后端组\n        value 35\n      - name 测试组\n        value 25\n  - name 产品部\n    value 80\n    children\n      - name 产品设计组\n        value 50\n      - name 用户研究组\n        value 30',
    },
    {
      title:
        '用矩阵树图展示产品销售情况的数据 [{ "name": "产品 A", "sales": 500, "children": [{ "name": "子产品 A1", "sales": 200 }...',
      description:
        '用矩阵树图展示产品销售情况的数据 [{ "name": "产品 A", "sales": 500, "children": [{ "name": "子产品 A1", "sales": 200 }...',
      code: 'vis treemap\ndata\n  - name 产品A\n    value 500\n    children\n      - name 子产品A1\n        value 200\n      - name 子产品A2\n        value 300\n  - name 产品B\n    value 400',
    },
    {
      title:
        '采用矩阵树图展示各种水果销售量: [{ "苹果": 800, "children": [{ "红富士": 400 }, { "黄元帅": 400 }]}, { "橙子": 600 }, { "香...',
      description:
        '采用矩阵树图展示各种水果销售量: [{ "苹果": 800, "children": [{ "红富士": 400 }, { "黄元帅": 400 }]}, { "橙子": 600 }, { "香...',
      code: 'vis treemap\ndata\n  - name 苹果\n    value 800\n    children\n      - name 红富士\n        value 400\n      - name 黄元帅\n        value 400\n  - name 橙子\n    value 600\n  - name 香蕉\n    value 500',
    },
  ],
};
