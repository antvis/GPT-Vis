import { Share2 } from 'lucide-react';

export const networkGraphData = {
  id: 'network-graph',
  name: 'Network Graph',
  icon: Share2,
  galleryExamples:
    'vis network-graph\ntitle "Harry Potter Characters"\ndata\n  nodes\n    - name "Harry Potter"\n    - name "Hermione Granger"\n    - name "Ron Weasley"\n    - name "Voldemort"\n  edges\n    - source "Harry Potter"\n      target "Hermione Granger"\n      name "Friend"\n    - source "Harry Potter"\n      target "Ron Weasley"\n      name "Friend"\n    - source "Harry Potter"\n      target "Voldemort"\n      name "Enemy"\n    - source "Voldemort"\n      target "Harry Potter"\n      name "Attempted to Kill"',
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
            description: 'Array of nodes, each node must include a name field (unique identifier).',
          },
          {
            property: 'data.edges',
            type: 'required',
            valueType: 'Object[]',
            description: 'Array of edges, each edge must include source, target, and name fields.',
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
      code: 'vis network-graph\ndata\n  nodes\n    - name "Harry Potter"\n    - name "Hermione Granger"\n    - name "Ron Weasley"\n    - name "Voldemort"\n  edges\n    - source "Harry Potter"\n      target "Hermione Granger"\n      name "Friend"\n    - source "Harry Potter"\n      target "Ron Weasley"\n      name "Friend"\n    - source "Harry Potter"\n      target "Voldemort"\n      name "Enemy"\n    - source "Voldemort"\n      target "Harry Potter"\n      name "Attempted to Kill"\ntitle "Harry Potter Character Relationships"',
    },
    {
      title: 'Team Collaboration Flow',
      description: 'Team collaboration flow with dagre layout',
      code: 'vis network-graph\ndata\n  nodes\n    - name PM\n    - name Designer\n    - name Dev\n    - name QA\n  edges\n    - source PM\n      target Designer\n      name Req\n    - source Designer\n      target Dev\n      name Spec\n    - source Dev\n      target QA\n      name Test\nlayout dagre\ntitle "Team Collaboration Flow"',
    },
    {
      title:
        'Visualize the relationships between "Artificial Intelligence" related concepts in a knowledge graph using a network graph.',
      description:
        'Visualize the relationships between "Artificial Intelligence" related concepts in a knowledge graph using a network graph.',
      code: 'vis network-graph\ndata\n  nodes\n    - name "Artificial Intelligence"\n    - name "Machine Learning"\n    - name "Deep Learning"\n    - name "Neural Network"\n    - name "NLP"\n    - name "Computer Vision"\n  edges\n    - source "Artificial Intelligence"\n      target "Machine Learning"\n      name "Includes"\n    - source "Machine Learning"\n      target "Deep Learning"\n      name "Subfield"\n    - source "Deep Learning"\n      target "Neural Network"\n      name "Based On"\n    - source "Artificial Intelligence"\n      target "NLP"\n      name "Includes"\n    - source "Artificial Intelligence"\n      target "Computer Vision"\n      name "Includes"\nlayout force\ntheme academy\ntitle "AI Knowledge Graph"',
    },
  ],
};
