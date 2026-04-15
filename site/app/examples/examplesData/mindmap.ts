import { Network } from 'lucide-react';

export const mindmapData = {
  id: 'mindmap',
  name: 'Mind Map',
  icon: Network,
  galleryExamples:
    'vis mindmap\ndata\n  name Modeling Methods\n  children\n    - name Classification\n      children\n        - name Logistic regression\n        - name Linear discriminant analysis\n        - name Rules\n        - name Decision trees\n        - name Naive Bayes\n        - name K nearest neighbor\n        - name Probabilistic neural network\n        - name Support vector machine\n    - name Consensus\n      children\n        - name Models diversity\n          children\n            - name Different initializations\n            - name Different parameter choices\n            - name Different architectures\n            - name Different modeling methods\n            - name Different training sets\n            - name Different feature sets\n        - name Methods\n          children\n            - name Classifier selection\n            - name Classifier fusion\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name Multiple linear regression\n        - name Partial least squares\n        - name Multi-layer feed forward neural network\n        - name General regression neural network\n        - name Support vector regression',
  description:
    '思维导图以中心主题为核心，通过层级分支的形式组织和展示信息。使用中心点两侧分布，合理利用空间，并能清晰呈现主干与分支的所属分层关系。当文本内容复杂时，思维导图可以帮助提取并结构化关键信息，明确主要主题与子主题之间的关系。',
  knowledge: {
    introduction:
      '思维导图以中心主题为核心，通过层级分支的形式组织和展示信息。使用中心点两侧分布，合理利用空间，并能清晰呈现主干与分支的所属分层关系。当文本内容复杂时，思维导图可以帮助提取并结构化关键信息，明确主要主题与子主题之间的关系。',
    useCases: [
      '内容围绕一个核心主题展开，按照逻辑层次进行分解，如知识体系、项目计划。',
      '展示分类体系，如产品分类、技术栈分类、学科知识体系。',
      '头脑风暴和创意整理，将想法按层级组织。',
      '读书笔记、课程总结等信息的结构化提取。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "mindmap"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，树形对象类型，包含 name、children 字段。',
          },
          {
            property: 'data.name',
            type: 'required',
            description: '节点名称，必填，文本类型。',
          },
          {
            property: 'data.children',
            type: 'optional',
            description:
              '子节点数组，选填，数组对象类型，每个子节点结构与父节点相同，支持多层嵌套。',
          },
          {
            property: 'direction',
            type: 'optional',
            description:
              '布局方向，选填，文本类型，可选值为 "H"（默认，根节点居中双向展开）| "LR"（根节点在左向右展开）| "RL"（根节点在右向左展开）。',
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
            description: '图表样式，选填，对象类型。',
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
      title: '用思维导图展示机器学习建模方法的层级分类，从中心主题向两侧分支展开。',
      description: '用思维导图展示机器学习建模方法的层级分类，从中心主题向两侧分支展开。',
      code: 'vis mindmap\ndata\n  name Modeling Methods\n  children\n    - name Classification\n      children\n        - name Logistic regression\n        - name Linear discriminant analysis\n        - name Rules\n        - name Decision trees\n        - name Naive Bayes\n        - name K nearest neighbor\n        - name Probabilistic neural network\n        - name Support vector machine\n    - name Consensus\n      children\n        - name Models diversity\n          children\n            - name Different initializations\n            - name Different parameter choices\n            - name Different architectures\n            - name Different modeling methods\n            - name Different training sets\n            - name Different feature sets\n        - name Methods\n          children\n            - name Classifier selection\n            - name Classifier fusion\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name Multiple linear regression\n        - name Partial least squares\n        - name Multi-layer feed forward neural network\n        - name General regression neural network\n        - name Support vector regression\ntitle Modeling Methods',
    },
    {
      title: '用思维导图制定项目计划，分为研究、设计、开发和测试四个阶段，每个阶段包含具体任务。',
      description:
        '用思维导图制定项目计划，分为研究、设计、开发和测试四个阶段，每个阶段包含具体任务。',
      code: 'vis mindmap\ndata\n  name 项目计划\n  children\n    - name 研究阶段\n      children\n        - name 市场调研\n        - name 技术可行性分析\n    - name 设计阶段\n      children\n        - name 产品功能确定\n        - name UI 设计\n    - name 开发阶段\n      children\n        - name 编写代码\n        - name 单元测试\n    - name 测试阶段\n      children\n        - name 功能测试\n        - name 性能测试\ntitle 项目计划\ndirection LR',
    },
    {
      title: '用思维导图展示台风形成的因素，包含气象条件和地理环境两大分支，使用暗色主题。',
      description: '用思维导图展示台风形成的因素，暗色主题。',
      code: 'vis mindmap\ndata\n  name 台风形成的因素\n  children\n    - name 气象条件\n      children\n        - name 温暖的海水\n        - name 气压分布\n        - name 湿度水平\n        - name 风的切变\n    - name 地理环境\n      children\n        - name 大陆架的形状与深度\n        - name 海洋暖流的分布\n        - name 热带地区的气候特征\n        - name 岛屿的影响\ntitle 台风形成因素\ntheme dark',
    },
  ],
};
