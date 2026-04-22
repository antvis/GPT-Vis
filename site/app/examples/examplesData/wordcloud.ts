import { Cloud } from 'lucide-react';

export const wordcloudData = {
  id: 'wordcloud',
  name: 'Word Cloud',
  icon: Cloud,
  galleryExamples:
    'vis word-cloud\ndata\n  - text 机器学习\n    value 100\n  - text 深度学习\n    value 95\n  - text 自然语言处理\n    value 88\n  - text 计算机视觉\n    value 85\n  - text 大模型\n    value 92\n  - text 强化学习\n    value 72\n  - text 知识图谱\n    value 65\n  - text 数据挖掘\n    value 70\n  - text 神经网络\n    value 80\n  - text 迁移学习\n    value 60\n  - text 生成式AI\n    value 90\n  - text 对抗网络\n    value 55\n  - text 注意力机制\n    value 75\n  - text 预训练\n    value 82\n  - text 微调\n    value 68\n  - text 多模态\n    value 86\n  - text 向量数据库\n    value 58\n  - text 提示工程\n    value 78\n  - text 智能体\n    value 84\n  - text 图神经网络\n    value 50\n  - text 贝叶斯\n    value 45\n  - text 联邦学习\n    value 48\n  - text 自动驾驶\n    value 76\n  - text 语音识别\n    value 62\n  - text 推荐系统\n    value 66\n  - text 异常检测\n    value 42\n  - text 时间序列\n    value 52\n  - text 文本分类\n    value 40\n  - text 目标检测\n    value 58\n  - text 语义分割\n    value 46\ntitle AI 技术关键词',
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
      title: '展示 AI 技术领域关键词的权重分布。',
      description: '展示 AI 技术领域关键词的权重分布。',
      code: 'vis word-cloud\ndata\n  - text 机器学习\n    value 100\n  - text 深度学习\n    value 95\n  - text 自然语言处理\n    value 88\n  - text 计算机视觉\n    value 85\n  - text 大模型\n    value 92\n  - text 强化学习\n    value 72\n  - text 知识图谱\n    value 65\n  - text 数据挖掘\n    value 70\n  - text 神经网络\n    value 80\n  - text 迁移学习\n    value 60\n  - text 生成式AI\n    value 90\n  - text 对抗网络\n    value 55\n  - text 注意力机制\n    value 75\n  - text 预训练\n    value 82\n  - text 微调\n    value 68\n  - text 多模态\n    value 86\n  - text 向量数据库\n    value 58\n  - text 提示工程\n    value 78\n  - text 智能体\n    value 84\n  - text 图神经网络\n    value 50\n  - text 贝叶斯\n    value 45\n  - text 联邦学习\n    value 48\n  - text 自动驾驶\n    value 76\n  - text 语音识别\n    value 62\n  - text 推荐系统\n    value 66\n  - text 异常检测\n    value 42\n  - text 时间序列\n    value 52\n  - text 文本分类\n    value 40\n  - text 目标检测\n    value 58\n  - text 语义分割\n    value 46\ntitle AI 技术关键词',
    },
    {
      title: '展示前端开发技术栈关键词权重，自定义颜色',
      description: '展示前端开发技术栈关键词权重',
      code: 'vis word-cloud\ndata\n  - text React\n    value 100\n  - text Vue\n    value 92\n  - text TypeScript\n    value 88\n  - text Next.js\n    value 80\n  - text Webpack\n    value 65\n  - text Vite\n    value 78\n  - text CSS\n    value 85\n  - text Tailwind\n    value 75\n  - text Node.js\n    value 82\n  - text GraphQL\n    value 55\n  - text REST\n    value 60\n  - text Svelte\n    value 50\n  - text Angular\n    value 58\n  - text Redux\n    value 52\n  - text Zustand\n    value 45\n  - text ESLint\n    value 62\n  - text Prettier\n    value 48\n  - text Jest\n    value 56\n  - text Cypress\n    value 42\n  - text Storybook\n    value 40\n  - text Docker\n    value 68\n  - text SSR\n    value 70\n  - text SSG\n    value 55\n  - text PWA\n    value 38\n  - text WebAssembly\n    value 35\n  - text Three.js\n    value 44\n  - text D3.js\n    value 46\n  - text Framer Motion\n    value 40\n  - text React Query\n    value 52\n  - text SWR\n    value 36\ntitle 前端开发技术栈\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n    - "#FB923C"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '展示数据科学领域术语关键词权重，自定义配色',
      description: '展示数据科学领域术语关键词权重',
      code: 'vis word-cloud\ndata\n  - text 统计分析\n    value 95\n  - text 回归分析\n    value 88\n  - text 假设检验\n    value 72\n  - text 方差分析\n    value 55\n  - text 主成分分析\n    value 65\n  - text 聚类分析\n    value 78\n  - text 特征工程\n    value 85\n  - text 交叉验证\n    value 60\n  - text 正则化\n    value 52\n  - text 梯度下降\n    value 75\n  - text 损失函数\n    value 68\n  - text 过拟合\n    value 62\n  - text 数据清洗\n    value 80\n  - text 可视化\n    value 90\n  - text A/B测试\n    value 70\n  - text 置信区间\n    value 48\n  - text 决策树\n    value 58\n  - text 随机森林\n    value 72\n  - text 支持向量机\n    value 50\n  - text 降维\n    value 45\n  - text 采样\n    value 42\n  - text 归一化\n    value 55\n  - text 编码\n    value 40\n  - text 管道\n    value 46\n  - text 超参数\n    value 52\n  - text 集成学习\n    value 65\n  - text 交叉熵\n    value 38\n  - text 评价指标\n    value 58\n  - text 混淆矩阵\n    value 44\n  - text ROC曲线\n    value 48\ntitle 数据科学术语\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n    - "#8B9A46"\n    - "#CB997E"\n    - "#6B705C"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
