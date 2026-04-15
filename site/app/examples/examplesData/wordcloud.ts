import { Cloud } from 'lucide-react';

export const wordcloudData = {
  id: 'wordcloud',
  name: 'Word Cloud',
  icon: Cloud,
  galleryExamples:
    'vis word-cloud\ndata\n  - text 积木\n    value 21.62\n  - text 事物\n    value 34.46\n  - text 感官\n    value 27.89\n  - text 万事万物\n    value 21.21\n  - text 上帝\n    value 22.44\n  - text 阶段\n    value 26.61\n  - text 潜意识\n    value 19.90\n  - text 物质\n    value 17.08\n  - text 启示\n    value 16.58\n  - text 大自然\n    value 16.21\n  - text 心灵\n    value 15.52\n  - text 信仰\n    value 14.52\n  - text 哲学家\n    value 14.95\n  - text 物体\n    value 14.36\n  - text 地球\n    value 12.58\n  - text 太阳\n    value 12.46\n  - text 元素\n    value 13.69\n  - text 模式\n    value 12.06\n  - text 明辨是非\n    value 11.70\n  - text 永恒不变\n    value 10.72\n  - text 理性\n    value 13.82\n  - text 因果律\n    value 12.51\n  - text 自然法则\n    value 10.68\n  - text 精神\n    value 11.24\n  - text 世界\n    value 13.10\n  - text 宇宙\n    value 7.37\n  - text 存在\n    value 9.14\n  - text 认知\n    value 8.71\n  - text 原子\n    value 7.15\n  - text 粒子\n    value 7.69',
  description:
    '词云图是一种用于展示文本数据中词语出现频率或权重的可视化方法，通过不同大小的文字来表示词频。词云图可以帮助快速识别文本数据中最常用或最重要的词语。 每个词的大小通常与其出现频率成正比，通常较大的字体代表更频繁出现或更重要的词，使用户可以直观地看到某个词在文本中出现的频繁程度。这种视觉化方式使得用户能够快速抓住文本的主要内容和核心主题。',
  knowledge: {
    introduction:
      '词云图是一种用于展示文本数据中词语出现频率或权重的可视化方法，通过不同大小的文字来表示词频。词云图可以帮助快速识别文本数据中最常用或最重要的词语。 每个词的大小通常与其出现频率成正比，通常较大的字体代表更频繁出现或更重要的词，使用户可以直观地看到某个词在文本中出现的频繁程度。这种视觉化方式使得用户能够快速抓住文本的主要内容和核心主题。',
    useCases: [
      '分析社交媒体、评论或反馈中常用的词语。',
      '文字分析中识别关键词或主题。',
      '在需要突出显示某些词汇的重要性时非常有用，比如新闻报道摘要、市场调研结果等场合。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "word-cloud"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组对象类型；',
          },
          {
            property: 'data.text',
            type: 'required',
            description: '代表将要在词云中显示的具体词汇，必填，字符串类型；',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '表示这个词汇的重要性分数（可以是频次、权重等），必填，数值类型；',
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
        '对西方哲学史文本进行关键词提取，生成哲学主题词云，展示"事物"、"感官"、"上帝"、"物质"等核心概念的词频权重分布。',
      description:
        '对西方哲学史文本进行关键词提取，生成哲学主题词云，展示"事物"、"感官"、"上帝"、"物质"等核心概念的词频权重分布。',
      code: 'vis word-cloud\ndata\n  - text 积木\n    value 21.62\n  - text 事物\n    value 34.46\n  - text 感官\n    value 27.89\n  - text 万事万物\n    value 21.21\n  - text 上帝\n    value 22.44\n  - text 阶段\n    value 26.61\n  - text 潜意识\n    value 19.90\n  - text 物质\n    value 17.08\n  - text 启示\n    value 16.58\n  - text 大自然\n    value 16.21\n  - text 心灵\n    value 15.52\n  - text 信仰\n    value 14.52\n  - text 哲学家\n    value 14.95\n  - text 物体\n    value 14.36\n  - text 地球\n    value 12.58\n  - text 太阳\n    value 12.46\n  - text 元素\n    value 13.69\n  - text 模式\n    value 12.06\n  - text 明辨是非\n    value 11.70\n  - text 永恒不变\n    value 10.72\n  - text 理性\n    value 13.82\n  - text 因果律\n    value 12.51\n  - text 自然法则\n    value 10.68\n  - text 精神\n    value 11.24\n  - text 世界\n    value 13.10\n  - text 宇宙\n    value 7.37\n  - text 存在\n    value 9.14\n  - text 认知\n    value 8.71\n  - text 原子\n    value 7.15\n  - text 粒子\n    value 7.69\ntitle 西方哲学史关键词词云',
    },
    {
      title:
        '数据可视化技术生态词云：对 AntV 相关技术文档进行词频统计，展示 G2、G6、F2 等可视化框架及"数据可视化"、"Grammar"等核心概念的权重分布。',
      description:
        '数据可视化技术生态词云：对 AntV 相关技术文档进行词频统计，展示 G2、G6、F2 等可视化框架及"数据可视化"、"Grammar"等核心概念的权重分布。',
      code: 'vis word-cloud\ndata\n  - text AntV\n    value 9\n  - text F2\n    value 8\n  - text G2\n    value 8\n  - text G6\n    value 8\n  - text DataSet\n    value 8\n  - text 墨者学院\n    value 8\n  - text Analysis\n    value 6\n  - text "Data Mining"\n    value 6\n  - text "Data Vis"\n    value 6\n  - text Design\n    value 6\n  - text Grammar\n    value 6\n  - text Graphics\n    value 6\n  - text Graph\n    value 6\n  - text Hierarchy\n    value 6\n  - text Labeling\n    value 6\n  - text Layout\n    value 6\n  - text Quantitative\n    value 6\n  - text Relation\n    value 6\n  - text Statistics\n    value 6\n  - text 可视化\n    value 6\n  - text 数据\n    value 6\n  - text 数据可视化\n    value 6\ntitle 数据可视化技术词云',
    },
    {
      title:
        '分析一篇关于环保的文章，提取关键词及其频率，结果为：["环保": 10, "气候变化": 8, "可再生能源": 6, "碳排放": 5, "绿色生活": 4]。用词云图可视化。',
      description:
        '分析一篇关于环保的文章，提取关键词及其频率，结果为：["环保": 10, "气候变化": 8, "可再生能源": 6, "碳排放": 5, "绿色生活": 4]。用词云图可视化。',
      code: 'vis word-cloud\ndata\n  - text 环保\n    value 10\n  - text 气候变化\n    value 8\n  - text 可再生能源\n    value 6\n  - text 碳排放\n    value 5\n  - text 绿色生活\n    value 4',
    },
  ],
};
