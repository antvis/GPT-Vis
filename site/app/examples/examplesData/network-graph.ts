import { Share2 } from 'lucide-react';

export const networkGraphData = {
  id: 'network-graph',
  name: 'Network Graph',
  icon: Share2,
  galleryExamples:
    'vis network-graph\ndata\n  nodes\n    - name 哈利·波特\n    - name 赫敏·格兰杰\n    - name 罗恩·韦斯莱\n    - name 伏地魔\n  edges\n    - source 哈利·波特\n      target 赫敏·格兰杰\n      name 朋友\n    - source 哈利·波特\n      target 罗恩·韦斯莱\n      name 朋友\n    - source 哈利·波特\n      target 伏地魔\n      name 敌人\n    - source 伏地魔\n      target 哈利·波特\n      name 试图杀死',
  description:
    '网络图（Network Graph）是一种展示实体（节点）之间的关系（边）的图。通过节点和边的连接，直观地表示复杂的网络结构。每个节点代表一个实体，而每条边则表示两个节点之间的关系或连接。',
  knowledge: {
    introduction:
      '网络图（Network Graph）是一种展示实体（节点）之间的关系（边）的图。通过节点和边的连接，直观地表示复杂的网络结构。每个节点代表一个实体，而每条边则表示两个节点之间的关系或连接。',
    useCases: [
      '社交网络中的人际关系展示，例如朋友关系、关注关系等。',
      '知识图谱中的概念关联，展示实体之间的复杂关系。',
      '分析复杂网络结构中的模式，例如通信网络中的节点连接情况。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "network-graph"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，对象类型，包含 nodes 和 edges 两个字段。',
          },
          {
            property: 'data.nodes',
            type: 'required',
            description: '网络图中的节点数组，每个节点需包含 name 字段（唯一标识）。',
          },
          {
            property: 'data.edges',
            type: 'required',
            description:
              '网络图中的边数组，每条边需包含 source（起点）、target（终点）、name（关系名称）字段。',
          },
          {
            property: 'layout',
            type: 'optional',
            description:
              '布局算法，选填，可选值为 "force" | "circular" | "grid" | "radial" | "concentric" | "dagre"，默认为 "force"。',
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
        ],
      },
    ],
  },
  examples: [
    {
      title:
        '在《哈利波特》系列中，哈利·波特的两个好友是赫敏·格兰杰和罗恩·韦斯莱，伏地魔是哈利的主要敌人并曾试图杀死哈利。用网络图可视化。',
      description:
        '在《哈利波特》系列中，哈利·波特的两个好友是赫敏·格兰杰和罗恩·韦斯莱，伏地魔是哈利的主要敌人并曾试图杀死哈利。用网络图可视化。',
      code: 'vis network-graph\ndata\n  nodes\n    - name 哈利·波特\n    - name 赫敏·格兰杰\n    - name 罗恩·韦斯莱\n    - name 伏地魔\n  edges\n    - source 哈利·波特\n      target 赫敏·格兰杰\n      name 朋友\n    - source 哈利·波特\n      target 罗恩·韦斯莱\n      name 朋友\n    - source 哈利·波特\n      target 伏地魔\n      name 敌人\n    - source 伏地魔\n      target 哈利·波特\n      name 试图杀死\ntitle 哈利波特人物关系',
    },
    {
      title:
        '用网络图展示公司内部的协作关系：产品经理将需求传递给设计师，设计师输出设计稿给开发者，开发者提测给测试员。',
      description:
        '用网络图展示公司内部的协作关系：产品经理将需求传递给设计师，设计师输出设计稿给开发者，开发者提测给测试员。',
      code: 'vis network-graph\ndata\n  nodes\n    - name 产品经理\n    - name 设计师\n    - name 开发者\n    - name 测试员\n  edges\n    - source 产品经理\n      target 设计师\n      name 需求传递\n    - source 设计师\n      target 开发者\n      name 设计稿\n    - source 开发者\n      target 测试员\n      name 提测\nlayout dagre\ntitle 团队协作流程',
    },
    {
      title: '用网络图展示知识图谱中"人工智能"相关概念的关联关系。',
      description: '用网络图展示知识图谱中"人工智能"相关概念的关联关系。',
      code: 'vis network-graph\ndata\n  nodes\n    - name 人工智能\n    - name 机器学习\n    - name 深度学习\n    - name 神经网络\n    - name 自然语言处理\n    - name 计算机视觉\n  edges\n    - source 人工智能\n      target 机器学习\n      name 包含\n    - source 机器学习\n      target 深度学习\n      name 子领域\n    - source 深度学习\n      target 神经网络\n      name 基于\n    - source 人工智能\n      target 自然语言处理\n      name 包含\n    - source 人工智能\n      target 计算机视觉\n      name 包含\nlayout force\ntheme academy\ntitle AI 知识图谱',
    },
  ],
};
