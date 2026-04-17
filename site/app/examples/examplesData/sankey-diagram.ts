import { Workflow } from 'lucide-react';

export const sankeyDiagramData = {
  id: 'sankey-diagram',
  name: 'Sankey Diagram',
  icon: Workflow,
  galleryExamples:
    'vis sankey\ndata\n  - source 煤炭\n    target 发电厂\n    value 120\n  - source 天然气\n    target 发电厂\n    value 80\n  - source 发电厂\n    target 工业\n    value 100\n  - source 发电厂\n    target 居民\n    value 60\n  - source 发电厂\n    target 商业\n    value 40\nnodeAlign justify',
  description:
    '桑基图是一种用于可视化流量、能量、资金等在不同节点间流动关系的图表。通过带宽表示流量大小，节点和流向线条直观展示各部分的流向和分布，常用于能量流、资金流、用户路径等分析场景。',
  knowledge: {
    introduction:
      '桑基图是一种用于可视化流量、能量、资金等在不同节点间流动关系的图表。通过带宽表示流量大小，节点和流向线条直观展示各部分的流向和分布，常用于能量流、资金流、用户路径等分析场景。',
    useCases: [
      '适合展示各类流量分布和流向关系，如能源流动、资金流转、用户行为路径、供应链流动等',
      '突出流量的分布结构和流向路径',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表类型，必填，文本类型，值为 "sankey"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '桑基图数据，必填，数组类型。',
          },
          {
            property: 'data.source',
            type: 'required',
            description: '源节点名称，必填，文本类型。',
          },
          {
            property: 'data.target',
            type: 'required',
            description: '目标节点名称，必填，文本类型。',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '流量值，必填，数值类型。',
          },
          {
            property: 'nodeAlign',
            type: 'optional',
            description:
              '节点对齐方式，选填，文本类型，可选值为 "left" | "center" | "right" | "justify"，默认值为 "center"。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表标题，选填，文本类型。',
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
            property: 'style.palette',
            type: 'optional',
            description: '颜色映射，选填，数组类型，合法颜色值数组。',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            description: '背景颜色，选填，文本类型，合法颜色值。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '展示能源流动关系。',
      description: '展示能源流动关系。',
      code: 'vis sankey\ndata\n  - source 煤炭\n    target 发电厂\n    value 120\n  - source 天然气\n    target 发电厂\n    value 80\n  - source 发电厂\n    target 工业\n    value 100\n  - source 发电厂\n    target 居民\n    value 60\n  - source 发电厂\n    target 商业\n    value 40\nnodeAlign justify\ntitle 能源流动关系',
    },
    {
      title: '展示资金流转路径, 主题为 dark。',
      description: '展示资金流转路径, 主题为 dark。',
      code: 'vis sankey\ndata\n  - source 投资人\n    target 创业公司\n    value 200\n  - source 创业公司\n    target 市场营销\n    value 80\n  - source 创业公司\n    target 研发\n    value 120\n  - source 市场营销\n    target 客户\n    value 70\n  - source 研发\n    target 客户\n    value 50\nnodeAlign center\ntitle 资金流转路径\ntheme dark',
    },
    {
      title: '展示用户行为路径, 自定义配色。',
      description: '展示用户行为路径, 自定义配色。',
      code: 'vis sankey\ndata\n  - source 首页\n    target 产品页\n    value 300\n  - source 产品页\n    target 购物车\n    value 150\n  - source 购物车\n    target 结算页\n    value 100\n  - source 结算页\n    target 支付成功\n    value 80\n  - source 结算页\n    target 支付失败\n    value 20\nnodeAlign left\ntitle 用户行为路径\nstyle\n  palette\n    - #5B8FF9\n    - #61DDAA\n    - #65789B\n    - #F6BD16\n    - #7262FD\n  backgroundColor #f0f2f5',
    },
  ],
};
