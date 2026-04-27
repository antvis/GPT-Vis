import { Network } from 'lucide-react';

export const mindmapData = {
  id: 'mindmap',
  name: 'Mind Map',
  icon: Network,
  galleryExamples:
    'vis mindmap\ndata\n  name "Project Plan"\n  children\n    - name "Research Phase"\n      children\n        - name "Market Research"\n        - name "Technical Feasibility Analysis"\n    - name "Design Phase"\n      children\n        - name "Product Feature Definition"\n        - name "UI Design"\n    - name "Development Phase"\n      children\n        - name "Write Code"\n        - name "Unit Testing"\n    - name "Testing Phase"\n      children\n        - name "Functional Testing"\n        - name "Performance Testing"',
  description:
    'A mind map uses a central theme as its core, organizing and presenting information through hierarchical branches. It distributes content on both sides of the center point, making efficient use of space while clearly showing the hierarchical relationship between main branches and sub-branches. When text content is complex, mind maps help extract and structure key information, clarifying the relationships between main topics and subtopics.',
  knowledge: {
    introduction:
      'A mind map uses a central theme as its core, organizing and presenting information through hierarchical branches. It distributes content on both sides of the center point, making efficient use of space while clearly showing the hierarchical relationship between main branches and sub-branches. When text content is complex, mind maps help extract and structure key information, clarifying the relationships between main topics and subtopics.',
    useCases: [
      'Content centered around a core theme, broken down by logical hierarchy, such as knowledge systems and project plans.',
      'Display classification systems, such as product categories, tech stack classifications, and academic knowledge systems.',
      'Brainstorming and idea organization, arranging thoughts by hierarchy.',
      'Structured extraction of reading notes, course summaries, and other information.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: 'Chart type, required, string type, value must be "mindmap".',
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
              'Layout direction, optional, string type, available values are "H" (default, root centered expanding both directions) | "LR" (root on left expanding right) | "RL" (root on right expanding left).',
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
        'Display the hierarchical classification of machine learning modeling methods as a mind map, branching out from the central theme to both sides.',
      description:
        'Display the hierarchical classification of machine learning modeling methods as a mind map, branching out from the central theme to both sides.',
      code: 'vis mindmap\ndata\n  name "Modeling Methods"\n  children\n    - name Classification\n      children\n        - name "Logistic regression"\n        - name "Linear discriminant analysis"\n        - name Rules\n        - name "Decision trees"\n        - name "Naive Bayes"\n        - name "K nearest neighbor"\n        - name "Probabilistic neural network"\n        - name "Support vector machine"\n    - name Consensus\n      children\n        - name "Models diversity"\n          children\n            - name "Different initializations"\n            - name "Different parameter choices"\n            - name "Different architectures"\n            - name "Different modeling methods"\n            - name "Different training sets"\n            - name "Different feature sets"\n        - name Methods\n          children\n            - name "Classifier selection"\n            - name "Classifier fusion"\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name "Multiple linear regression"\n        - name "Partial least squares"\n        - name "Multi-layer feed forward neural network"\n        - name "General regression neural network"\n        - name "Support vector regression"\ntitle "Modeling Methods"',
    },
    {
      title:
        'Create a project plan using a mind map, divided into research, design, development, and testing phases, each with specific tasks.',
      description:
        'Create a project plan using a mind map, divided into research, design, development, and testing phases, each with specific tasks.',
      code: 'vis mindmap\ndata\n  name "Project Plan"\n  children\n    - name "Research Phase"\n      children\n        - name "Market Research"\n        - name "Technical Feasibility Analysis"\n    - name "Design Phase"\n      children\n        - name "Product Feature Definition"\n        - name "UI Design"\n    - name "Development Phase"\n      children\n        - name "Write Code"\n        - name "Unit Testing"\n    - name "Testing Phase"\n      children\n        - name "Functional Testing"\n        - name "Performance Testing"\ntitle "Project Plan"\ndirection LR',
    },
    {
      title:
        'Display the factors of typhoon formation using a mind map, including meteorological conditions and geographical environment branches, custom palette.',
      description: 'Display the factors of typhoon formation using a mind map, custom palette.',
      code: 'vis mindmap\ndata\n  name "Typhoon Formation Factors"\n  children\n    - name "Meteorological Conditions"\n      children\n        - name "Warm Ocean Water"\n        - name "Atmospheric Pressure Distribution"\n        - name "Humidity Levels"\n        - name "Wind Shear"\n    - name "Geographical Environment"\n      children\n        - name "Continental Shelf Shape and Depth"\n        - name "Ocean Warm Current Distribution"\n        - name "Tropical Climate Characteristics"\n        - name "Island Influence"\ntitle "Typhoon Formation Factors"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
