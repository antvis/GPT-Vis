export const organizationChartData = {
  id: 'organization-chart',
  name: 'Organization Chart',
  galleryDsl:
    'vis organization-chart\ntitle "Tech Company Structure"\ndata\n  name CEO\n  description "Chief Executive"\n  children\n    - name CTO\n      description "Technology"\n      children\n        - name Frontend\n          description "UI"\n        - name Backend\n          description "API"\n    - name CFO\n      description "Finance"\n      children\n        - name Accounting\n          description "Audit"\n        - name Budget\n          description "Planning"',
  galleryJson: {
    type: 'organization-chart',
    title: 'Tech Company Structure',
    data: {
      name: 'CEO',
      description: 'Chief Executive',
      children: [
        {
          name: 'CTO',
          description: 'Technology',
          children: [
            { name: 'Frontend', description: 'UI' },
            { name: 'Backend', description: 'API' },
          ],
        },
        {
          name: 'CFO',
          description: 'Finance',
          children: [
            { name: 'Accounting', description: 'Audit' },
            { name: 'Budget', description: 'Planning' },
          ],
        },
      ],
    },
  },
  description:
    'An organization chart visually displays the hierarchical structure and departmental relationships within an organization. It uses nodes and edges to represent different positions, departments, and their reporting relationships. Each node represents a position or department, while edges represent reporting or peer relationships. Presented in a tree structure, the top level is the highest management, expanding downward level by level to individual departments and positions.',
  knowledge: {
    introduction:
      'An organization chart visually displays the hierarchical structure and departmental relationships within an organization. It uses nodes and edges to represent different positions, departments, and their reporting relationships. Each node represents a position or department, while edges represent reporting relationships. Presented in a tree structure, the top level is the highest management, expanding downward level by level to individual departments and positions.',
    useCases: [
      'Display company or team hierarchical structure, clarifying reporting relationships between positions and departments.',
      'Show employee positions and department distribution.',
      'Clarify team member roles and responsibilities in project management.',
      'Used for equity penetration, investment upstream/downstream company dependency analysis.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "organization-chart".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object',
            description: 'Tree data, root node containing name, description, and children fields.',
          },
          {
            property: 'data.name',
            type: 'required',
            valueType: 'string',
            description: 'Node name (position or department), must be unique.',
          },
          {
            property: 'data.description',
            type: 'optional',
            valueType: 'string',
            description: 'Node description, e.g. position responsibilities or department overview.',
          },
          {
            property: 'data.children',
            type: 'optional',
            valueType: 'Object[]',
            description: 'Child node array, representing subordinate positions or departments.',
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
            valueType: 'BuiltinThemeName | ThemeSpec',
            description:
              'Built-in theme name or custom theme object; default is "default". See Documentation → Custom Themes.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Hierarchical organization',
      description: 'Hierarchical organization',
      json: {
        type: 'organization-chart',
        data: {
          name: 'Alice Johnson',
          description: 'Chief Technology Officer',
          children: [
            {
              name: 'Bob Smith',
              description: 'Senior Software Engineer',
              children: [
                { name: 'Charlie Brown', description: 'Software Engineer' },
                { name: 'Diana White', description: 'Software Engineer' },
              ],
            },
            {
              name: 'Eve Black',
              description: 'IT Support Department Head',
              children: [
                { name: 'Frank Green', description: 'IT Support Specialist' },
                { name: 'Grace Blue', description: 'IT Support Specialist' },
              ],
            },
          ],
        },
      },
      dsl: 'vis organization-chart\ndata\n  name "Alice Johnson"\n  description "Chief Technology Officer"\n  children\n    - name "Bob Smith"\n      description "Senior Software Engineer"\n      children\n        - name "Charlie Brown"\n          description "Software Engineer"\n        - name "Diana White"\n          description "Software Engineer"\n    - name "Eve Black"\n      description "IT Support Department Head"\n      children\n        - name "Frank Green"\n          description "IT Support Specialist"\n        - name "Grace Blue"\n          description "IT Support Specialist"',
    },
    {
      title: 'Single direct report',
      description: 'Single direct report',
      json: {
        type: 'organization-chart',
        data: {
          name: 'Eric Joplin (Interim Chief Executive Officer & Acting President)',
          description:
            'Chief Executive Officer overseeing global operations, strategy, and cross-functional leadership across multiple regions',
          children: [
            {
              name: 'Linda Newland (Executive Assistant to the CEO, Board Liaison)',
              description:
                'Chief Executive Assistant responsible for calendar management, stakeholder communications, and confidential executive coordination',
            },
          ],
        },
      },
      dsl: 'vis organization-chart\ndata\n  name "Eric Joplin (Interim Chief Executive Officer & Acting President)"\n  description "Chief Executive Officer overseeing global operations, strategy, and cross-functional leadership across multiple regions"\n  children\n    - name "Linda Newland (Executive Assistant to the CEO, Board Liaison)"\n      description "Chief Executive Assistant responsible for calendar management, stakeholder communications, and confidential executive coordination"',
    },
  ],
};
