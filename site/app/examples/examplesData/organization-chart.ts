import { Users } from 'lucide-react';

export const organizationChartData = {
  id: 'organization-chart',
  name: 'Organization Chart',
  icon: Users,
  galleryExamples:
    'vis organization-chart\ntitle "Tech Company Structure"\ndata\n  name CEO\n  description "Chief Executive"\n  children\n    - name CTO\n      description "Technology"\n      children\n        - name Frontend\n          description "UI"\n        - name Backend\n          description "API"\n    - name CFO\n      description "Finance"\n      children\n        - name Accounting\n          description "Audit"\n        - name Budget\n          description "Planning"',
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
            valueType: "'default' | 'dark' | 'academy'",
            description: 'Chart theme, default is "default".',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        "Alice Johnson is the company's Chief Technology Officer. Her team includes Senior Software Engineer Bob Smith and IT Support Department Head Eve Black. Bob Smith leads the software engineering team, with team members including Software Engineers Charlie Brown and Diana White. Eve Black heads the IT Support department, with team members including IT Support Specialists Frank Green and Grace Blue.",
      description:
        "Alice Johnson is the company's Chief Technology Officer. Her team includes Senior Software Engineer Bob Smith and IT Support Department Head Eve Black.",
      code: 'vis organization-chart\ndata\n  name "Alice Johnson"\n  description "Chief Technology Officer"\n  children\n    - name "Bob Smith"\n      description "Senior Software Engineer"\n      children\n        - name "Charlie Brown"\n          description "Software Engineer"\n        - name "Diana White"\n          description "Software Engineer"\n    - name "Eve Black"\n      description "IT Support Department Head"\n      children\n        - name "Frank Green"\n          description "IT Support Specialist"\n        - name "Grace Blue"\n          description "IT Support Specialist"',
    },
    {
      title:
        'Visualize the following data using an organization chart: Eric Joplin is the Chief Executive Officer, with Linda Newland (Chief Executive Assistant) as a direct report.',
      description:
        'For verification: when node content overflows, it is truncated with an ellipsis; hover to display the full content.',
      code: 'vis organization-chart\ndata\n  name "Eric Joplin (Interim Chief Executive Officer & Acting President)"\n  description "Chief Executive Officer overseeing global operations, strategy, and cross-functional leadership across multiple regions"\n  children\n    - name "Linda Newland (Executive Assistant to the CEO, Board Liaison)"\n      description "Chief Executive Assistant responsible for calendar management, stakeholder communications, and confidential executive coordination"',
    },
    {
      title:
        "Display a tech company's department structure using an organization chart: CEO has three executives — CTO, CFO, and COO. The CTO oversees the Front-End Team and Back-End Team.",
      description:
        "Display a tech company's three-level department structure using an organization chart.",
      code: 'vis organization-chart\ndata\n  name CEO\n  description "Chief Executive Officer"\n  children\n    - name CTO\n      description "Chief Technology Officer"\n      children\n        - name "Front-End Team"\n          description "Lead: Zhang"\n        - name "Back-End Team"\n          description "Lead: Li"\n    - name CFO\n      description "Chief Financial Officer"\n    - name COO\n      description "Chief Operating Officer"\ntitle "Tech Company Organization Chart"\ntheme academy',
    },
  ],
};
