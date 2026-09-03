import { Share2 } from 'lucide-react';

export const networkGraphData = {
  id: 'network-graph',
  name: 'Network Graph',
  icon: Share2,
  galleryDsl:
    'vis network-graph\ntitle "Harry Potter Characters"\ndata\n  nodes\n    - name "Harry Potter"\n    - name "Hermione Granger"\n    - name "Ron Weasley"\n    - name "Voldemort"\n  edges\n    - source "Harry Potter"\n      target "Hermione Granger"\n      name "Friend"\n    - source "Harry Potter"\n      target "Ron Weasley"\n      name "Friend"\n    - source "Harry Potter"\n      target "Voldemort"\n      name "Enemy"\n    - source "Voldemort"\n      target "Harry Potter"\n      name "Attempted to Kill"',
  galleryJson: {
    type: 'network-graph',
    title: 'Harry Potter Characters',
    data: {
      nodes: [
        { name: 'Harry Potter' },
        { name: 'Hermione Granger' },
        { name: 'Ron Weasley' },
        { name: 'Voldemort' },
      ],
      edges: [
        { source: 'Harry Potter', target: 'Hermione Granger', name: 'Friend' },
        { source: 'Harry Potter', target: 'Ron Weasley', name: 'Friend' },
        { source: 'Harry Potter', target: 'Voldemort', name: 'Enemy' },
        { source: 'Voldemort', target: 'Harry Potter', name: 'Attempted to Kill' },
      ],
    },
  },
  description:
    'A network graph is a diagram that displays relationships (edges) between entities (nodes). Through the connections of nodes and edges, it intuitively represents complex network structures. Each node represents an entity, and each edge represents a relationship or connection between two nodes.',
  knowledge: {
    introduction:
      'A network graph is a diagram that displays relationships (edges) between entities (nodes). Through the connections of nodes and edges, it intuitively represents complex network structures. Each node represents an entity, and each edge represents a relationship or connection between two nodes.',
    useCases: [
      'Display interpersonal relationships in social networks, such as friendships and following relationships.',
      'Show concept associations in knowledge graphs, displaying complex relationships between entities.',
      'Analyze patterns in complex network structures, such as node connectivity in communication networks.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "network-graph".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object',
            description: 'Chart data, containing nodes and edges fields.',
          },
          {
            property: 'data.nodes',
            type: 'required',
            valueType: 'Object[]',
            description: 'Node array, each node represents an entity.',
          },
          {
            property: 'data.nodes.name',
            type: 'required',
            valueType: 'string',
            description: 'Node name, used as the unique identifier.',
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
            description: 'Edge label, used to describe the relationship between two nodes.',
          },
          {
            property: 'layout',
            type: 'optional',
            valueType: "'force' | 'circular' | 'grid' | 'radial' | 'concentric' | 'dagre'",
            description: 'Layout algorithm, default is "force".',
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
        "In the Harry Potter series, Harry Potter's two best friends are Hermione Granger and Ron Weasley, and Voldemort is Harry's main enemy who attempted to kill Harry. Visualize with a network graph.",
      description:
        "In the Harry Potter series, Harry Potter's two best friends are Hermione Granger and Ron Weasley, and Voldemort is Harry's main enemy who attempted to kill Harry. Visualize with a network graph.",
      json: {
        type: 'network-graph',
        data: {
          nodes: [
            { name: 'Harry Potter' },
            { name: 'Hermione Granger' },
            { name: 'Ron Weasley' },
            { name: 'Voldemort' },
          ],
          edges: [
            { source: 'Harry Potter', target: 'Hermione Granger', name: 'Friend' },
            { source: 'Harry Potter', target: 'Ron Weasley', name: 'Friend' },
            { source: 'Harry Potter', target: 'Voldemort', name: 'Enemy' },
            { source: 'Voldemort', target: 'Harry Potter', name: 'Attempted to Kill' },
          ],
        },
        title: 'Harry Potter Character Relationships',
      },
      dsl: 'vis network-graph\ndata\n  nodes\n    - name "Harry Potter"\n    - name "Hermione Granger"\n    - name "Ron Weasley"\n    - name "Voldemort"\n  edges\n    - source "Harry Potter"\n      target "Hermione Granger"\n      name "Friend"\n    - source "Harry Potter"\n      target "Ron Weasley"\n      name "Friend"\n    - source "Harry Potter"\n      target "Voldemort"\n      name "Enemy"\n    - source "Voldemort"\n      target "Harry Potter"\n      name "Attempted to Kill"\ntitle "Harry Potter Character Relationships"',
    },
    {
      title: 'Team Collaboration Flow',
      description: 'Team collaboration flow with dagre layout',
      json: {
        type: 'network-graph',
        data: {
          nodes: [{ name: 'PM' }, { name: 'Designer' }, { name: 'Dev' }, { name: 'QA' }],
          edges: [
            { source: 'PM', target: 'Designer', name: 'Req' },
            { source: 'Designer', target: 'Dev', name: 'Spec' },
            { source: 'Dev', target: 'QA', name: 'Test' },
          ],
        },
        layout: 'dagre',
        title: 'Team Collaboration Flow',
      },
      dsl: 'vis network-graph\ndata\n  nodes\n    - name PM\n    - name Designer\n    - name Dev\n    - name QA\n  edges\n    - source PM\n      target Designer\n      name Req\n    - source Designer\n      target Dev\n      name Spec\n    - source Dev\n      target QA\n      name Test\nlayout dagre\ntitle "Team Collaboration Flow"',
    },
    {
      title:
        'Visualize the relationships between "Artificial Intelligence" related concepts in a knowledge graph using a network graph.',
      description:
        'Visualize the relationships between "Artificial Intelligence" related concepts in a knowledge graph using a network graph.',
      json: {
        type: 'network-graph',
        data: {
          nodes: [
            { name: 'Artificial Intelligence' },
            { name: 'Machine Learning' },
            { name: 'Deep Learning' },
            { name: 'Neural Network' },
            { name: 'NLP' },
            { name: 'Computer Vision' },
          ],
          edges: [
            { source: 'Artificial Intelligence', target: 'Machine Learning', name: 'Includes' },
            { source: 'Machine Learning', target: 'Deep Learning', name: 'Subfield' },
            { source: 'Deep Learning', target: 'Neural Network', name: 'Based On' },
            { source: 'Artificial Intelligence', target: 'NLP', name: 'Includes' },
            { source: 'Artificial Intelligence', target: 'Computer Vision', name: 'Includes' },
          ],
        },
        layout: 'force',
        theme: 'academy',
        title: 'AI Knowledge Graph',
      },
      dsl: 'vis network-graph\ndata\n  nodes\n    - name "Artificial Intelligence"\n    - name "Machine Learning"\n    - name "Deep Learning"\n    - name "Neural Network"\n    - name "NLP"\n    - name "Computer Vision"\n  edges\n    - source "Artificial Intelligence"\n      target "Machine Learning"\n      name "Includes"\n    - source "Machine Learning"\n      target "Deep Learning"\n      name "Subfield"\n    - source "Deep Learning"\n      target "Neural Network"\n      name "Based On"\n    - source "Artificial Intelligence"\n      target "NLP"\n      name "Includes"\n    - source "Artificial Intelligence"\n      target "Computer Vision"\n      name "Includes"\nlayout force\ntheme academy\ntitle "AI Knowledge Graph"',
    },
  ],
};
