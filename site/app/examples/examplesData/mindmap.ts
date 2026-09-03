import { Network } from 'lucide-react';

export const mindmapData = {
  id: 'mindmap',
  name: 'Mind Map',
  icon: Network,
  galleryDsl:
    'vis mindmap\ntitle "Project Plan"\ndata\n  name "Project Plan"\n  children\n    - name "Research Phase"\n      children\n        - name "Market Research"\n        - name "Technical Feasibility Analysis"\n    - name "Design Phase"\n      children\n        - name "Product Feature Definition"\n        - name "UI Design"\n    - name "Development Phase"\n      children\n        - name "Write Code"\n        - name "Unit Testing"\n    - name "Testing Phase"\n      children\n        - name "Functional Testing"\n        - name "Performance Testing"',
  galleryJson: {
    type: 'mindmap',
    title: 'Project Plan',
    data: {
      name: 'Project Plan',
      children: [
        {
          name: 'Research Phase',
          children: [{ name: 'Market Research' }, { name: 'Technical Feasibility Analysis' }],
        },
        {
          name: 'Design Phase',
          children: [{ name: 'Product Feature Definition' }, { name: 'UI Design' }],
        },
        { name: 'Development Phase', children: [{ name: 'Write Code' }, { name: 'Unit Testing' }] },
        {
          name: 'Testing Phase',
          children: [{ name: 'Functional Testing' }, { name: 'Performance Testing' }],
        },
      ],
    },
  },
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
            valueType: 'string',
            description: 'Value must be "mindmap".',
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
            valueType: "'H' | 'LR' | 'RL'",
            description:
              'Layout direction. "H" root centered (default), "LR" root on left, "RL" root on right.',
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
        'Display the hierarchical classification of machine learning modeling methods as a mind map, branching out from the central theme to both sides.',
      description:
        'Display the hierarchical classification of machine learning modeling methods as a mind map, branching out from the central theme to both sides.',
      json: {
        type: 'mindmap',
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
      dsl: 'vis mindmap\ndata\n  name "Modeling Methods"\n  children\n    - name Classification\n      children\n        - name "Logistic regression"\n        - name "Linear discriminant analysis"\n        - name Rules\n        - name "Decision trees"\n        - name "Naive Bayes"\n        - name "K nearest neighbor"\n        - name "Probabilistic neural network"\n        - name "Support vector machine"\n    - name Consensus\n      children\n        - name "Models diversity"\n          children\n            - name "Different initializations"\n            - name "Different parameter choices"\n            - name "Different architectures"\n            - name "Different modeling methods"\n            - name "Different training sets"\n            - name "Different feature sets"\n        - name Methods\n          children\n            - name "Classifier selection"\n            - name "Classifier fusion"\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name "Multiple linear regression"\n        - name "Partial least squares"\n        - name "Multi-layer feed forward neural network"\n        - name "General regression neural network"\n        - name "Support vector regression"\ntitle "Modeling Methods"',
    },
    {
      title:
        'Create a project plan using a mind map, divided into research, design, development, and testing phases, each with specific tasks.',
      description:
        'Create a project plan using a mind map, divided into research, design, development, and testing phases, each with specific tasks.',
      json: {
        type: 'mindmap',
        data: {
          name: 'Project Plan',
          children: [
            {
              name: 'Research Phase',
              children: [{ name: 'Market Research' }, { name: 'Technical Feasibility Analysis' }],
            },
            {
              name: 'Design Phase',
              children: [{ name: 'Product Feature Definition' }, { name: 'UI Design' }],
            },
            {
              name: 'Development Phase',
              children: [{ name: 'Write Code' }, { name: 'Unit Testing' }],
            },
            {
              name: 'Testing Phase',
              children: [{ name: 'Functional Testing' }, { name: 'Performance Testing' }],
            },
          ],
        },
        title: 'Project Plan',
        direction: 'LR',
      },
      dsl: 'vis mindmap\ndata\n  name "Project Plan"\n  children\n    - name "Research Phase"\n      children\n        - name "Market Research"\n        - name "Technical Feasibility Analysis"\n    - name "Design Phase"\n      children\n        - name "Product Feature Definition"\n        - name "UI Design"\n    - name "Development Phase"\n      children\n        - name "Write Code"\n        - name "Unit Testing"\n    - name "Testing Phase"\n      children\n        - name "Functional Testing"\n        - name "Performance Testing"\ntitle "Project Plan"\ndirection LR',
    },
    {
      title: 'Typhoon Formation Factors, Custom Palette',
      description: 'Typhoon formation factors with custom palette.',
      json: {
        type: 'mindmap',
        data: {
          name: 'Typhoon Formation',
          children: [
            {
              name: 'Weather',
              children: [
                { name: 'Warm Ocean' },
                { name: 'Pressure' },
                { name: 'Humidity' },
                { name: 'Wind Shear' },
              ],
            },
            {
              name: 'Geography',
              children: [
                { name: 'Shelf Depth' },
                { name: 'Warm Currents' },
                { name: 'Tropical Climate' },
                { name: 'Islands' },
              ],
            },
          ],
        },
        title: 'Typhoon Formation',
        theme: 'academy',
        style: { palette: ['#C45B42', '#7D8C6E'], backgroundColor: '#FBF8F4' },
      },
      dsl: 'vis mindmap\ndata\n  name "Typhoon Formation"\n  children\n    - name "Weather"\n      children\n        - name "Warm Ocean"\n        - name "Pressure"\n        - name "Humidity"\n        - name "Wind Shear"\n    - name "Geography"\n      children\n        - name "Shelf Depth"\n        - name "Warm Currents"\n        - name "Tropical Climate"\n        - name "Islands"\ntitle "Typhoon Formation"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
