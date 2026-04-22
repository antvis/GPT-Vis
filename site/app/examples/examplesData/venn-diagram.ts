import { CircleDot } from 'lucide-react';

export const vennDiagramData = {
  id: 'venn-diagram',
  name: 'Venn Diagram',
  icon: CircleDot,
  galleryExamples:
    'vis venn\ndata\n  - sets A\n    value 3500\n    label 购买手机\n  - sets B\n    value 2800\n    label 购买耳机\n  - sets C\n    value 2200\n    label 购买充电器\n  - sets A,B\n    value 1500\n  - sets A,C\n    value 1200\n  - sets B,C\n    value 800\n  - sets A,B,C\n    value 600',
  description:
    '韦恩图是一种用多个交叠圆形表示集合关系的图表。每个圆代表一个集合，圆之间的重叠区域表示集合的交集，非重叠部分表示集合的独有元素。韦恩图直观展示集合之间的交集、并集和补集，常用于集合运算、分类分析等场景。',
  knowledge: {
    introduction:
      '韦恩图是一种用多个交叠圆形表示集合关系的图表。每个圆代表一个集合，圆之间的重叠区域表示集合的交集，非重叠部分表示集合的独有元素。韦恩图直观展示集合之间的交集、并集和补集，常用于集合运算、分类分析等场景。',
    useCases: [
      '用于展示集合之间的关系，如数据分类、属性重叠、用户群体交集等',
      '适合分析集合的交集、并集、补集等关系，常见于数学、统计、市场分析等领域',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表类型，必填，文本类型，值为 "venn"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '数据，必填，数组类型，包含 sets、value 以及 label 三个字段；',
          },
          {
            property: 'data.sets',
            type: 'required',
            description:
              '集合标识，必填，字符串数组类型，表示该数据项所属的集合，可以是单个集合或多个集合的组合。',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '集合大小，必填，数值类型，表示该集合或集合交集的大小。',
          },
          {
            property: 'data.label',
            type: 'optional',
            description: '集合标签，选填，文本类型，表示该集合或集合交集的名称。',
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
            property: 'style.backgroundColor',
            type: 'optional',
            description: '背景颜色，选填，文本类型，合法颜色值。',
          },
          {
            property: 'style.palette',
            type: 'optional',
            description: '颜色映射，选填，数组类型，合法颜色值数组。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        '用户购买行为交集：购买手机（3500人）、购买耳机（2800人）、购买充电器（2200人）三类用户的购买重叠关系。',
      description:
        '用户购买行为交集：购买手机（3500人）、购买耳机（2800人）、购买充电器（2200人）三类用户的购买重叠关系。',
      code: 'vis venn\ndata\n  - sets A\n    value 3500\n    label 购买手机\n  - sets B\n    value 2800\n    label 购买耳机\n  - sets C\n    value 2200\n    label 购买充电器\n  - sets A,B\n    value 1500\n  - sets A,C\n    value 1200\n  - sets B,C\n    value 800\n  - sets A,B,C\n    value 600\ntitle 用户购买行为交集',
    },
    {
      title:
        '音乐听众交集：Radiohead、Kanye West、Eminem 三位艺术家粉丝群体的重叠分布，数据来源于 Last.fm 收听记录，自定义颜色',
      description:
        '音乐听众交集：Radiohead、Kanye West、Eminem 三位艺术家粉丝群体的重叠分布，数据来源于 Last.fm 收听记录',
      code: 'vis venn\ndata\n  - sets A\n    value 77348\n    label Radiohead\n  - sets B\n    value 27053\n    label "Kanye West"\n  - sets C\n    value 19056\n    label Eminem\n  - sets A,B\n    value 6141\n  - sets A,C\n    value 2723\n  - sets B,C\n    value 5465\n  - sets A,B,C\n    value 715\ntitle 音乐听众交集\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title:
        '电商平台 618 大促活动中，购买手机（3500人）与购买耳机（2800人）用户群体的重叠情况，自定义配色',
      description:
        '电商平台 618 大促活动中，购买手机（3500人）与购买耳机（2800人）用户群体的重叠情况',
      code: 'vis venn\ndata\n  - sets A\n    value 3500\n    label 购买手机\n  - sets B\n    value 2800\n    label 购买耳机\n  - sets A,B\n    value 1500\ntitle 618大促手机与耳机购买用户重叠\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
