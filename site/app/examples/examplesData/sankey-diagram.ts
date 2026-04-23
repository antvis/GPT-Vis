import { Workflow } from 'lucide-react';

export const sankeyDiagramData = {
  id: 'sankey-diagram',
  name: 'Sankey Diagram',
  icon: Workflow,
  galleryExamples:
    'vis sankey\ndata\n  - source 煤炭\n    target 电力\n    value 320\n  - source 天然气\n    target 供暖\n    value 160\n  - source 水电\n    target 电力\n    value 180\nnodeAlign justify\ntitle 能源流向',
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
      title: '展示全球能源从一次能源到终端使用的流向关系。',
      description: '展示全球能源从一次能源到终端使用的流向关系。',
      code: 'vis sankey\ndata\n  - source 煤炭\n    target 电力\n    value 320\n  - source 煤炭\n    target 钢铁\n    value 180\n  - source 煤炭\n    target 化工\n    value 120\n  - source 石油\n    target 交通运输\n    value 280\n  - source 石油\n    target 化工\n    value 150\n  - source 天然气\n    target 电力\n    value 200\n  - source 天然气\n    target 供暖\n    value 160\n  - source 天然气\n    target 化工\n    value 80\n  - source 水电\n    target 电力\n    value 180\n  - source 核能\n    target 电力\n    value 100\n  - source 风能\n    target 电力\n    value 90\n  - source 太阳能\n    target 电力\n    value 60\nnodeAlign justify\ntitle 全球能源流向',
    },
    {
      title: '展示用户从首页到完成支付的行为路径分析，自定义颜色',
      description: '展示用户从首页到完成支付的行为路径分析',
      code: 'vis sankey\ndata\n  - source 首页\n    target 商品列表\n    value 4500\n  - source 首页\n    target 搜索\n    value 3200\n  - source 首页\n    target 活动\n    value 1800\n  - source 商品列表\n    target 商品详情\n    value 2800\n  - source 搜索\n    target 商品详情\n    value 2400\n  - source 活动\n    target 商品详情\n    value 1200\n  - source 商品详情\n    target 加入购物车\n    value 3200\n  - source 商品详情\n    target 直接购买\n    value 800\n  - source 加入购物车\n    target 提交订单\n    value 1800\n  - source 提交订单\n    target 完成支付\n    value 1500\nnodeAlign center\ntitle 用户行为路径分析\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '展示供应链从原材料到消费者的资金流向，自定义配色',
      description: '展示供应链从原材料到消费者的资金流向',
      code: 'vis sankey\ndata\n  - source 原材料\n    target 制造A\n    value 500\n  - source 原材料\n    target 制造B\n    value 300\n  - source 零部件\n    target 制造A\n    value 200\n  - source 零部件\n    target 制造B\n    value 400\n  - source 制造A\n    target 组装\n    value 650\n  - source 制造B\n    target 组装\n    value 350\n  - source 制造A\n    target 直销\n    value 50\n  - source 组装\n    target 品牌商\n    value 800\n  - source 组装\n    target 经销商\n    value 200\n  - source 品牌商\n    target 零售商\n    value 500\n  - source 品牌商\n    target 电商\n    value 300\n  - source 经销商\n    target 零售商\n    value 150\n  - source 经销商\n    target 电商\n    value 50\n  - source 直销\n    target 消费者\n    value 50\nnodeAlign left\ntitle 供应链资金流向\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n    - "#8B9A46"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
