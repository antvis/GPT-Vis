import { List } from 'lucide-react';

export const indentedTreeData = {
  id: 'indented-tree',
  name: 'Indented Tree',
  icon: List,
  galleryExamples:
    'vis indented-tree\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json',
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
            description: 'Chart type, required, string type, value must be "indented-tree".',
          },
          {
            property: 'data',
            type: 'required',
            description:
              'Chart data, required, tree object type, containing name and children fields.',
          },
          {
            property: 'data.name',
            type: 'required',
            description: 'Node name, required, string type.',
          },
          {
            property: 'data.children',
            type: 'optional',
            description:
              'Child node array, optional, array of objects type, each child node has the same structure as the parent node, supporting multi-level nesting.',
          },
          {
            property: 'direction',
            type: 'optional',
            description:
              'Layout direction, optional, string type, available values are "LR" (default, root on left expanding right) | "RL" (root on right expanding left) | "H" (root centered expanding both directions).',
          },
          {
            property: 'title',
            type: 'optional',
            description: 'Chart title, optional, string type.',
          },
          {
            property: 'theme',
            type: 'optional',
            description:
              'Chart theme, optional, string type, available values are "default" | "dark" | "academy", default is "default".',
          },
          {
            property: 'style',
            type: 'optional',
            description: 'Chart style, optional, object type.',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            description: 'Background color, optional, string type, value is a valid color.',
          },
          {
            property: 'style.palette',
            type: 'optional',
            description: 'Color palette, optional, array type, value is a valid color array.',
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
      code: 'vis indented-tree\ndata\n  name "Modeling Methods"\n  children\n    - name Classification\n      children\n        - name "Logistic regression"\n        - name "Linear discriminant analysis"\n        - name Rules\n        - name "Decision trees"\n        - name "Naive Bayes"\n        - name "K nearest neighbor"\n        - name "Probabilistic neural network"\n        - name "Support vector machine"\n    - name Consensus\n      children\n        - name "Models diversity"\n          children\n            - name "Different initializations"\n            - name "Different parameter choices"\n            - name "Different architectures"\n            - name "Different modeling methods"\n            - name "Different training sets"\n            - name "Different feature sets"\n        - name Methods\n          children\n            - name "Classifier selection"\n            - name "Classifier fusion"\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name "Multiple linear regression"\n        - name "Partial least squares"\n        - name "Multi-layer feed forward neural network"\n        - name "General regression neural network"\n        - name "Support vector regression"\ntitle "Modeling Methods"',
    },
    {
      title:
        'Display a front-end project directory structure using an indented tree, including src, public, and package.json, with components, pages, and utils folders under src.',
      description:
        'Display a front-end project directory structure using an indented tree, including src, public, and package.json, with components, pages, and utils folders under src.',
      code: 'vis indented-tree\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json\ntitle "Project Directory Structure"',
    },
    {
      title:
        'Display the AI knowledge system classification using an indented tree, including machine learning and deep learning branches and their subcategories.',
      description:
        'Display the AI knowledge system classification using an indented tree, including machine learning and deep learning branches and their subcategories.',
      code: 'vis indented-tree\ndata\n  name "Artificial Intelligence"\n  children\n    - name "Machine Learning"\n      children\n        - name "Supervised Learning"\n        - name "Unsupervised Learning"\n        - name "Reinforcement Learning"\n    - name "Deep Learning"\n      children\n        - name "Convolutional Neural Network"\n        - name "Recurrent Neural Network"\ntitle "AI Knowledge System"',
    },
    {
      title:
        'Display company department hierarchy using an indented tree: the company has a Technology Department (with Front-End, Back-End, and QA teams) and a Product Department.',
      description:
        'Display company department hierarchy using an indented tree: the company has a Technology Department (with Front-End, Back-End, and QA teams) and a Product Department.',
      code: 'vis indented-tree\ndata\n  name Company\n  children\n    - name "Technology Department"\n      children\n        - name "Front-End Team"\n        - name "Back-End Team"\n        - name "QA Team"\n    - name "Product Department"\n      children\n        - name "Product Design Team"\n        - name "User Research Team"\ntitle "Company Department Hierarchy"\ntheme academy',
    },
  ],
};
