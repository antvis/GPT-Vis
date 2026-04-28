import { GitBranch } from 'lucide-react';

export const flowDiagramData = {
  id: 'flow-diagram',
  name: 'Flow Diagram',
  icon: GitBranch,
  galleryExamples:
    'vis flow-diagram\ntitle "Order Delivery Flow"\ndata\n  nodes\n    - name "Customer Places Order"\n    - name "Warehouse Picks Goods"\n    - name "Logistics Delivery"\n  edges\n    - source "Customer Places Order"\n      target "Warehouse Picks Goods"\n    - source "Warehouse Picks Goods"\n      target "Logistics Delivery"',
  description:
    'A flow diagram visually represents the steps and decision points of a process or system. It shows the entire flow from start to finish. Each node represents a specific step or decision point, while edges represent the sequence and relationships between steps. Edges only need to be named when they represent branching conditions.',
  knowledge: {
    introduction:
      'A flow diagram visually represents the steps and decision points of a process or system. It shows the entire flow from start to finish. Each node represents a specific step or decision point, while edges represent the sequence and relationships between steps. Edges only need to be named when they represent branching conditions.',
    useCases: [
      'Suitable for scenarios that need to display linear processes or steps.',
      'Planning and tracking project progress, clarifying task sequences and dependencies.',
      'Building decision trees that show different decision points and paths.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "flow-diagram".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object',
            description: 'Chart data, containing nodes and edges.',
          },
          {
            property: 'data.nodes',
            type: 'required',
            valueType: 'Object[]',
            description: 'Node array, each node represents a step.',
          },
          {
            property: 'data.nodes.name',
            type: 'required',
            valueType: 'string',
            description: 'Node name, must be unique.',
          },
          {
            property: 'data.edges',
            type: 'required',
            valueType: 'Object[]',
            description: 'Edge array, each edge represents a relationship between two nodes.',
          },
          {
            property: 'data.edges.source',
            type: 'required',
            valueType: 'string',
            description: 'Source node name, pointing to the name property of a node.',
          },
          {
            property: 'data.edges.target',
            type: 'required',
            valueType: 'string',
            description: 'Target node name, pointing to the name property of a node.',
          },
          {
            property: 'data.edges.name',
            type: 'optional',
            valueType: 'string',
            description: 'Edge label, used in branching scenarios.',
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
            description: 'Must be an array of valid color values.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        'Performance Diagnosis Flow: Shows the decision flow from I/O check to problem identification and solutions.',
      description:
        'Performance Diagnosis Flow: Shows the decision flow from I/O check to problem identification and solutions.',
      code: 'vis flow-diagram\ntitle "Performance Diagnosis Flow"\ndata\n  nodes\n    - name "Check I/O wait (top)"\n    - name "Check swap (free-m)"\n    - name "Check % CPU (top)"\n    - name "RAM PROBLEM"\n    - name I/O\n    - name "APP PROBLEM"\n    - name "CPU PROBLEM"\n    - name "What\'s hogging RAM? (top)"\n    - name "Check history - Is the usage an anomaly?"\n    - name "Kill processes (memory)"\n    - name "Infrastructure problem - add RAM"\n    - name "What\'s hogging IO? (lotop)"\n    - name "Look for an external dependency"\n    - name "Confirm by checking CPU % user time (top)"\n    - name "Check list of processes (top)"\n    - name "Check-history - Is the usage an anomaly?"\n    - name "Kill processes (CPU)"\n    - name "Infrastructure problem - add cores"\n  edges\n    - source "Check I/O wait (top)"\n      target "Check swap (free-m)"\n      name HIGH\n    - source "Check I/O wait (top)"\n      target "Check % CPU (top)"\n      name LOW\n    - source "Check swap (free-m)"\n      target "RAM PROBLEM"\n      name HIGH\n    - source "Check swap (free-m)"\n      target I/O\n      name LOW\n    - source "Check % CPU (top)"\n      target "APP PROBLEM"\n      name HIGH\n    - source "Check % CPU (top)"\n      target "CPU PROBLEM"\n      name LOW\n    - source "RAM PROBLEM"\n      target "What\'s hogging RAM? (top)"\n    - source "What\'s hogging RAM? (top)"\n      target "Check history - Is the usage an anomaly?"\n    - source "Check history - Is the usage an anomaly?"\n      target "Kill processes (memory)"\n      name YES\n    - source "Check history - Is the usage an anomaly?"\n      target "Infrastructure problem - add RAM"\n      name NO\n    - source I/O\n      target "What\'s hogging IO? (lotop)"\n    - source "APP PROBLEM"\n      target "Look for an external dependency"\n    - source "CPU PROBLEM"\n      target "Confirm by checking CPU % user time (top)"\n    - source "Confirm by checking CPU % user time (top)"\n      target "Check list of processes (top)"\n    - source "Check list of processes (top)"\n      target "Check-history - Is the usage an anomaly?"\n    - source "Check-history - Is the usage an anomaly?"\n      target "Kill processes (CPU)"\n      name YES\n    - source "Check-history - Is the usage an anomaly?"\n      target "Infrastructure problem - add cores"\n      name NO',
    },
    {
      title:
        'User Registration Flow (dark theme): User visits registration page, fills in and submits registration form, system validates user info, creates account or prompts corrections, sends verification email, user verifies and registration is complete.',
      description:
        'User Registration Flow (dark theme): User visits registration page, fills in and submits registration form, system validates user info, creates account or prompts corrections, sends verification email, user verifies and registration is complete.',
      code: 'vis flow-diagram\ntitle "User Registration Flow"\ndata\n  nodes\n    - name "Visit Registration Page"\n    - name "Fill and Submit Registration Form"\n    - name "Validate User Information"\n    - name "Create New User Account"\n    - name "Prompt to Correct Errors"\n    - name "Send Verification Email"\n    - name "Click Verification Link"\n    - name "Registration Successful, Redirect to Login Page"\n  edges\n    - source "Visit Registration Page"\n      target "Fill and Submit Registration Form"\n    - source "Fill and Submit Registration Form"\n      target "Validate User Information"\n    - source "Validate User Information"\n      target "Create New User Account"\n      name "Information Valid"\n    - source "Validate User Information"\n      target "Prompt to Correct Errors"\n      name "Information Invalid"\n    - source "Create New User Account"\n      target "Send Verification Email"\n    - source "Send Verification Email"\n      target "Click Verification Link"\n    - source "Click Verification Link"\n      target "Registration Successful, Redirect to Login Page"\ntheme dark',
    },
    {
      title:
        'Order Delivery Flow: Customer places order, system generates order, warehouse picks goods, warehouse packs goods, logistics delivery, customer receives goods.',
      description:
        'Order Delivery Flow: Customer places order, system generates order, warehouse picks goods, warehouse packs goods, logistics delivery, customer receives goods.',
      code: 'vis flow-diagram\ntitle "Order Delivery Flow"\ndata\n  nodes\n    - name "Customer Places Order"\n    - name "System Generates Order"\n    - name "Warehouse Picks Goods"\n    - name "Warehouse Packs Goods"\n    - name "Logistics Delivery"\n    - name "Customer Receives Goods"\n  edges\n    - source "Customer Places Order"\n      target "System Generates Order"\n    - source "System Generates Order"\n      target "Warehouse Picks Goods"\n    - source "Warehouse Picks Goods"\n      target "Warehouse Packs Goods"\n    - source "Warehouse Packs Goods"\n      target "Logistics Delivery"\n    - source "Logistics Delivery"\n      target "Customer Receives Goods"',
    },
  ],
};
