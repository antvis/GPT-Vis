import { List } from 'lucide-react';

export const indentedTreeData = {
  id: 'indented-tree',
  name: 'Indented Tree',
  icon: List,
  galleryDsl:
    'vis indented-tree\ntitle "Project Directory Structure"\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json',
  galleryJson: {
    type: 'indented-tree',
    title: 'Project Directory Structure',
    data: {
      name: 'my-project',
      children: [
        { name: 'src', children: [{ name: 'components' }, { name: 'pages' }, { name: 'utils' }] },
        { name: 'public' },
        { name: 'package.json' },
      ],
    },
  },
  description:
    'An indented tree represents hierarchical relationships through horizontal indentation. Each element occupies one line, with child nodes indented below their parent, and the progressive indentation visually shows node depth and subordination. It is commonly used for file directory structures, knowledge classification systems, organizational hierarchies, and other scenarios that require a clear display of hierarchical relationships.',
  knowledge: {
    introduction:
      'An indented tree represents hierarchical relationships through horizontal indentation. Each element occupies one line, with child nodes indented below their parent, and the progressive indentation visually shows node depth and subordination. It is commonly used for file directory structures, knowledge classification systems, organizational hierarchies, and other scenarios that require a clear display of hierarchical relationships.',
    useCases: [
      'Display file directory structures, such as project file trees and disk directory browsing.',
      'Display classification systems, such as product categories, knowledge directories, and software feature module breakdowns.',
      'Display software package dependency or module reference relationships, clearly showing hierarchy depth.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "indented-tree".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object',
            description: 'Tree data, containing name and optional children fields.',
          },
          {
            property: 'data.name',
            type: 'required',
            valueType: 'string',
            description: 'Node name.',
          },
          {
            property: 'data.children',
            type: 'optional',
            valueType: 'Object[]',
            description:
              'Child node array, each child has the same structure, supporting multi-level nesting.',
          },
          {
            property: 'direction',
            type: 'optional',
            valueType: "'LR' | 'RL' | 'H'",
            description:
              'Layout direction. "LR" root on left (default), "RL" root on right, "H" root centered.',
          },
          {
            property: 'title',
            type: 'optional',
            valueType: 'string',
            description: 'Chart title.',
          },
          {
            property: 'theme',
            type: 'optional',
            valueType: "'default' | 'dark' | 'academy'",
            description: 'Chart theme, default is "default".',
          },
          {
            property: 'style',
            type: 'optional',
            valueType: 'Object',
            description: 'Chart style.',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            valueType: 'string',
            description: 'Must be a valid color value.',
          },
          {
            property: 'style.palette',
            type: 'optional',
            valueType: 'string[]',
            description: 'Must be a valid color array.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        'Display hierarchical classification of machine learning modeling methods using an indented tree (official example data structure).',
      description:
        'Display hierarchical classification of machine learning modeling methods using an indented tree (official example data structure).',
      json: {
        type: 'indented-tree',
        data: {
          name: 'Modeling Methods',
          children: [
            {
              name: 'Classification',
              children: [
                { name: 'Logistic regression' },
                { name: 'Linear discriminant analysis' },
                { name: 'Rules' },
                { name: 'Decision trees' },
                { name: 'Naive Bayes' },
                { name: 'K nearest neighbor' },
                { name: 'Probabilistic neural network' },
                { name: 'Support vector machine' },
              ],
            },
            {
              name: 'Consensus',
              children: [
                {
                  name: 'Models diversity',
                  children: [
                    { name: 'Different initializations' },
                    { name: 'Different parameter choices' },
                    { name: 'Different architectures' },
                    { name: 'Different modeling methods' },
                    { name: 'Different training sets' },
                    { name: 'Different feature sets' },
                  ],
                },
                {
                  name: 'Methods',
                  children: [{ name: 'Classifier selection' }, { name: 'Classifier fusion' }],
                },
                {
                  name: 'Common',
                  children: [{ name: 'Bagging' }, { name: 'Boosting' }, { name: 'AdaBoost' }],
                },
              ],
            },
            {
              name: 'Regression',
              children: [
                { name: 'Multiple linear regression' },
                { name: 'Partial least squares' },
                { name: 'Multi-layer feed forward neural network' },
                { name: 'General regression neural network' },
                { name: 'Support vector regression' },
              ],
            },
          ],
        },
        title: 'Modeling Methods',
      },
      dsl: 'vis indented-tree\ndata\n  name "Modeling Methods"\n  children\n    - name Classification\n      children\n        - name "Logistic regression"\n        - name "Linear discriminant analysis"\n        - name Rules\n        - name "Decision trees"\n        - name "Naive Bayes"\n        - name "K nearest neighbor"\n        - name "Probabilistic neural network"\n        - name "Support vector machine"\n    - name Consensus\n      children\n        - name "Models diversity"\n          children\n            - name "Different initializations"\n            - name "Different parameter choices"\n            - name "Different architectures"\n            - name "Different modeling methods"\n            - name "Different training sets"\n            - name "Different feature sets"\n        - name Methods\n          children\n            - name "Classifier selection"\n            - name "Classifier fusion"\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name "Multiple linear regression"\n        - name "Partial least squares"\n        - name "Multi-layer feed forward neural network"\n        - name "General regression neural network"\n        - name "Support vector regression"\ntitle "Modeling Methods"',
    },
    {
      title:
        'Display a front-end project directory structure using an indented tree, including src, public, and package.json, with components, pages, and utils folders under src.',
      description:
        'Display a front-end project directory structure using an indented tree, including src, public, and package.json, with components, pages, and utils folders under src.',
      json: {
        type: 'indented-tree',
        data: {
          name: 'my-project',
          children: [
            {
              name: 'src',
              children: [{ name: 'components' }, { name: 'pages' }, { name: 'utils' }],
            },
            { name: 'public' },
            { name: 'package.json' },
          ],
        },
        title: 'Project Directory Structure',
      },
      dsl: 'vis indented-tree\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json\ntitle "Project Directory Structure"',
    },
    {
      title:
        'Display the AI knowledge system classification using an indented tree, including machine learning and deep learning branches and their subcategories.',
      description:
        'Display the AI knowledge system classification using an indented tree, including machine learning and deep learning branches and their subcategories.',
      json: {
        type: 'indented-tree',
        data: {
          name: 'Artificial Intelligence',
          children: [
            {
              name: 'Machine Learning',
              children: [
                { name: 'Supervised Learning' },
                { name: 'Unsupervised Learning' },
                { name: 'Reinforcement Learning' },
              ],
            },
            {
              name: 'Deep Learning',
              children: [
                { name: 'Convolutional Neural Network' },
                { name: 'Recurrent Neural Network' },
              ],
            },
          ],
        },
        title: 'AI Knowledge System',
      },
      dsl: 'vis indented-tree\ndata\n  name "Artificial Intelligence"\n  children\n    - name "Machine Learning"\n      children\n        - name "Supervised Learning"\n        - name "Unsupervised Learning"\n        - name "Reinforcement Learning"\n    - name "Deep Learning"\n      children\n        - name "Convolutional Neural Network"\n        - name "Recurrent Neural Network"\ntitle "AI Knowledge System"',
    },
    {
      title:
        'Display company department hierarchy using an indented tree: the company has a Technology Department (with Front-End, Back-End, and QA teams) and a Product Department.',
      description:
        'Display company department hierarchy using an indented tree: the company has a Technology Department (with Front-End, Back-End, and QA teams) and a Product Department.',
      json: {
        type: 'indented-tree',
        data: {
          name: 'Company',
          children: [
            {
              name: 'Technology Department',
              children: [
                { name: 'Front-End Team' },
                { name: 'Back-End Team' },
                { name: 'QA Team' },
              ],
            },
            {
              name: 'Product Department',
              children: [{ name: 'Product Design Team' }, { name: 'User Research Team' }],
            },
          ],
        },
        title: 'Company Department Hierarchy',
        theme: 'academy',
      },
      dsl: 'vis indented-tree\ndata\n  name Company\n  children\n    - name "Technology Department"\n      children\n        - name "Front-End Team"\n        - name "Back-End Team"\n        - name "QA Team"\n    - name "Product Department"\n      children\n        - name "Product Design Team"\n        - name "User Research Team"\ntitle "Company Department Hierarchy"\ntheme academy',
    },
  ],
};
