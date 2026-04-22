import { LayoutGrid } from 'lucide-react';
export const treemapData = {
  id: 'treemap',
  name: 'Treemap',
  icon: LayoutGrid,
  galleryExamples:
    'vis treemap\ndata\n  - name 软件\n    value 2800\n    children\n      - name Microsoft\n        value 1200\n      - name Oracle\n        value 500\n      - name SAP\n        value 400\n      - name Salesforce\n        value 700\n  - name 硬件\n    value 2200\n    children\n      - name Apple\n        value 1500\n      - name Dell\n        value 400\n      - name Lenovo\n        value 300\n  - name 半导体\n    value 1800\n    children\n      - name NVIDIA\n        value 900\n      - name TSMC\n        value 600\n      - name Intel\n        value 300\n  - name 互联网\n    value 3200\n    children\n      - name Google\n        value 1100\n      - name Amazon\n        value 1200\n      - name Meta\n        value 900\ntitle 全球科技市值分布',
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
      title: '展示全球科技行业市值分布, 涵盖软件、硬件、半导体和互联网四大板块。',
      description: '展示全球科技行业市值分布, 涵盖软件、硬件、半导体和互联网四大板块。',
      code: 'vis treemap\ndata\n  - name 软件\n    value 2800\n    children\n      - name Microsoft\n        value 1200\n      - name Oracle\n        value 500\n      - name SAP\n        value 400\n      - name Salesforce\n        value 700\n  - name 硬件\n    value 2200\n    children\n      - name Apple\n        value 1500\n      - name Dell\n        value 400\n      - name Lenovo\n        value 300\n  - name 半导体\n    value 1800\n    children\n      - name NVIDIA\n        value 900\n      - name TSMC\n        value 600\n      - name Intel\n        value 300\n  - name 互联网\n    value 3200\n    children\n      - name Google\n        value 1100\n      - name Amazon\n        value 1200\n      - name Meta\n        value 900\ntitle 全球科技市值分布',
    },
    {
      title: '展示中国互联网行业五大细分领域的市场分布，自定义颜色',
      description: '展示中国互联网行业五大细分领域的市场分布',
      code: 'vis treemap\ndata\n  - name 电商\n    value 3500\n    children\n      - name 阿里巴巴\n        value 1500\n      - name 京东\n        value 900\n      - name 拼多多\n        value 1100\n  - name 社交\n    value 2800\n    children\n      - name 腾讯\n        value 1800\n      - name 字节跳动\n        value 1000\n  - name 出行\n    value 1500\n    children\n      - name 滴滴\n        value 600\n      - name 美团\n        value 900\n  - name 教育\n    value 800\n    children\n      - name 新东方\n        value 350\n      - name 好未来\n        value 250\n      - name 猿辅导\n        value 200\n  - name 游戏\n    value 2200\n    children\n      - name 网易\n        value 800\n      - name 米哈游\n        value 700\n      - name 莉莉丝\n        value 400\n      - name 叠纸\n        value 300\ntitle 中国互联网行业细分\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '展示全球六大洲 GDP 分布，自定义配色',
      description: '展示全球六大洲 GDP 分布',
      code: 'vis treemap\ndata\n  - name 亚洲\n    value 38000\n    children\n      - name 中国\n        value 18000\n      - name 日本\n        value 5000\n      - name 印度\n        value 4000\n  - name 北美\n    value 28000\n    children\n      - name 美国\n        value 25000\n      - name 加拿大\n        value 2000\n      - name 墨西哥\n        value 1000\n  - name 欧洲\n    value 22000\n    children\n      - name 德国\n        value 5000\n      - name 英国\n        value 4000\n      - name 法国\n        value 3000\n  - name 南美\n    value 4500\n    children\n      - name 巴西\n        value 2500\n      - name 阿根廷\n        value 1000\n      - name 哥伦比亚\n        value 1000\n  - name 非洲\n    value 3000\n    children\n      - name 尼日利亚\n        value 1000\n      - name 南非\n        value 1000\n      - name 埃及\n        value 1000\n  - name 大洋洲\n    value 2000\n    children\n      - name 澳大利亚\n        value 1500\n      - name 新西兰\n        value 500\ntitle 全球 GDP 分布\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n    - "#8B9A46"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
