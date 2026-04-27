import { Share2 } from 'lucide-react';

export const networkGraphData = {
  id: 'network-graph',
  name: 'Network Graph',
  icon: Share2,
  galleryExamples:
    'vis network-graph\ndata\n  nodes\n    - name "Harry Potter"\n    - name "Hermione Granger"\n    - name "Ron Weasley"\n    - name "Voldemort"\n  edges\n    - source "Harry Potter"\n      target "Hermione Granger"\n      name "Friend"\n    - source "Harry Potter"\n      target "Ron Weasley"\n      name "Friend"\n    - source "Harry Potter"\n      target "Voldemort"\n      name "Enemy"\n    - source "Voldemort"\n      target "Harry Potter"\n      name "Attempted to Kill"',
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
            description: 'Chart type, required, string type, value must be "network-graph".',
          },
          {
            property: 'data',
            type: 'required',
            description: 'Chart data, required, object type, containing nodes and edges fields.',
          },
          {
            property: 'data.nodes',
            type: 'required',
            description:
              'Array of nodes in the network graph, each node must include a name field (unique identifier).',
          },
          {
            property: 'data.edges',
            type: 'required',
            description:
              'Array of edges in the network graph, each edge must include source (start point), target (end point), and name (relationship name) fields.',
          },
          {
            property: 'layout',
            type: 'optional',
            description:
              'Layout algorithm, optional, available values are "force" | "circular" | "grid" | "radial" | "concentric" | "dagre", default is "force".',
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
      title:
        'Visualize company internal collaboration with a network graph: the product manager passes requirements to the designer, the designer delivers design specs to the developer, and the developer submits for testing to the QA engineer.',
      description:
        'Visualize company internal collaboration with a network graph: the product manager passes requirements to the designer, the designer delivers design specs to the developer, and the developer submits for testing to the QA engineer.',
      code: 'vis network-graph\ndata\n  nodes\n    - name "Product Manager"\n    - name "Designer"\n    - name "Developer"\n    - name "QA Engineer"\n  edges\n    - source "Product Manager"\n      target "Designer"\n      name "Requirements Delivery"\n    - source "Designer"\n      target "Developer"\n      name "Design Specs"\n    - source "Developer"\n      target "QA Engineer"\n      name "Submit for Testing"\nlayout dagre\ntitle "Team Collaboration Flow"',
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
