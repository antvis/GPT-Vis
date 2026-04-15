import { List } from 'lucide-react';

export const indentedTreeData = {
  id: 'indented-tree',
  name: 'Indented Tree',
  icon: List,
  galleryExamples:
    'vis indented-tree\ndata\n  name Modeling Methods\n  children\n    - name Classification\n      children\n        - name Logistic regression\n        - name Linear discriminant analysis\n        - name Rules\n        - name Decision trees\n        - name Naive Bayes\n        - name K nearest neighbor\n        - name Probabilistic neural network\n        - name Support vector machine\n    - name Consensus\n      children\n        - name Models diversity\n          children\n            - name Different initializations\n            - name Different parameter choices\n            - name Different architectures\n            - name Different modeling methods\n            - name Different training sets\n            - name Different feature sets\n        - name Methods\n          children\n            - name Classifier selection\n            - name Classifier fusion\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name Multiple linear regression\n        - name Partial least squares\n        - name Multi-layer feed forward neural network\n        - name General regression neural network\n        - name Support vector regression',
  description:
    '缩进树通过水平方向的缩进量来表示树节点层级关系。每个元素占据一行，子节点以缩进方式排列在父节点下方，层层缩进直观地展示出节点的深度和从属关系。常用于文件目录结构、知识体系分类、组织层级等需要清晰展示层级关系的场景。',
  knowledge: {
    introduction:
      '缩进树通过水平方向的缩进量来表示树节点层级关系。每个元素占据一行，子节点以缩进方式排列在父节点下方，层层缩进直观地展示出节点的深度和从属关系。常用于文件目录结构、知识体系分类、组织层级等需要清晰展示层级关系的场景。',
    useCases: [
      '展示文件目录结构，如项目文件树、磁盘目录浏览。',
      '展示分类体系，如产品分类、知识体系目录、软件功能模块划分。',
      '展示软件包依赖关系或模块引用关系，清晰展示层级深度。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "indented-tree"。',
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
              '布局方向，选填，文本类型，可选值为 "LR"（默认，根节点在左向右展开）| "RL"（根节点在右向左展开）| "H"（根节点居中双向展开）。',
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
      title: '用缩进树展示机器学习建模方法的层级分类（官方示例数据结构）。',
      description: '用缩进树展示机器学习建模方法的层级分类（官方示例数据结构）。',
      code: 'vis indented-tree\ndata\n  name Modeling Methods\n  children\n    - name Classification\n      children\n        - name Logistic regression\n        - name Linear discriminant analysis\n        - name Rules\n        - name Decision trees\n        - name Naive Bayes\n        - name K nearest neighbor\n        - name Probabilistic neural network\n        - name Support vector machine\n    - name Consensus\n      children\n        - name Models diversity\n          children\n            - name Different initializations\n            - name Different parameter choices\n            - name Different architectures\n            - name Different modeling methods\n            - name Different training sets\n            - name Different feature sets\n        - name Methods\n          children\n            - name Classifier selection\n            - name Classifier fusion\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name Multiple linear regression\n        - name Partial least squares\n        - name Multi-layer feed forward neural network\n        - name General regression neural network\n        - name Support vector regression\ntitle Modeling Methods',
    },
    {
      title:
        '用缩进树展示一个前端项目的目录结构，包含 src、public、package.json，其中 src 下有 components、pages、utils 三个文件夹。',
      description:
        '用缩进树展示一个前端项目的目录结构，包含 src、public、package.json，其中 src 下有 components、pages、utils 三个文件夹。',
      code: 'vis indented-tree\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json\ntitle 项目目录结构',
    },
    {
      title: '用缩进树展示人工智能的知识体系分类，包含机器学习和深度学习两大分支及其子类别。',
      description: '用缩进树展示人工智能的知识体系分类，包含机器学习和深度学习两大分支及其子类别。',
      code: 'vis indented-tree\ndata\n  name 人工智能\n  children\n    - name 机器学习\n      children\n        - name 监督学习\n        - name 无监督学习\n        - name 强化学习\n    - name 深度学习\n      children\n        - name 卷积神经网络\n        - name 循环神经网络\ntitle AI 知识体系',
    },
    {
      title: '用缩进树展示公司的部门层级：公司下有技术部（含前端组、后端组、测试组）和产品部。',
      description:
        '用缩进树展示公司的部门层级：公司下有技术部（含前端组、后端组、测试组）和产品部。',
      code: 'vis indented-tree\ndata\n  name 公司\n  children\n    - name 技术部\n      children\n        - name 前端组\n        - name 后端组\n        - name 测试组\n    - name 产品部\n      children\n        - name 产品设计组\n        - name 用户研究组\ntitle 企业部门层级\ntheme academy',
    },
  ],
};
