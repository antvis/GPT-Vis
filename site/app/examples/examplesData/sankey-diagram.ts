import { Workflow } from 'lucide-react';

export const sankeyDiagramData = {
  id: 'sankey-diagram',
  name: 'Sankey Diagram',
  icon: Workflow,
  galleryExamples:
    'vis sankey\ndata\n  - source Coal\n    target Electricity\n    value 320\n  - source "Natural Gas"\n    target Heating\n    value 160\n  - source Hydro\n    target Electricity\n    value 180\nnodeAlign justify\ntitle "Energy Flow"',
  description:
    'A Sankey diagram is a chart used to visualize the flow of resources such as energy, money, or materials between different nodes. It uses bandwidth to represent flow magnitude, with nodes and flow lines intuitively showing the direction and distribution of each part. It is commonly used in energy flow, fund flow, user path analysis, and other scenarios.',
  knowledge: {
    introduction:
      'A Sankey diagram is a chart used to visualize the flow of resources such as energy, money, or materials between different nodes. It uses bandwidth to represent flow magnitude, with nodes and flow lines intuitively showing the direction and distribution of each part. It is commonly used in energy flow, fund flow, user path analysis, and other scenarios.',
    useCases: [
      'Suitable for showing flow distribution and direction relationships, such as energy flow, fund flow, user behavior paths, supply chain flow, etc.',
      'Highlight the distribution structure and flow paths of traffic.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "sankey".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: 'Sankey diagram data.',
          },
          {
            property: 'data.source',
            type: 'required',
            valueType: 'string',
            description: 'Source node name.',
          },
          {
            property: 'data.target',
            type: 'required',
            valueType: 'string',
            description: 'Target node name.',
          },
          {
            property: 'data.value',
            type: 'required',
            valueType: 'number',
            description: 'Flow value.',
          },
          {
            property: 'nodeAlign',
            type: 'optional',
            valueType: "'left' | 'center' | 'right' | 'justify'",
            description: 'Node alignment, default is "center".',
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
            property: 'style.palette',
            type: 'optional',
            valueType: 'string[]',
            description: 'Must be an array of valid color values.',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            valueType: 'string',
            description: 'Must be a valid color value.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Global energy flow from primary sources to end use.',
      description: 'Global energy flow from primary sources to end use.',
      code: 'vis sankey\ndata\n  - source Coal\n    target Electricity\n    value 320\n  - source Coal\n    target Steel\n    value 180\n  - source Coal\n    target Chemicals\n    value 120\n  - source Oil\n    target Transportation\n    value 280\n  - source Oil\n    target Chemicals\n    value 150\n  - source "Natural Gas"\n    target Electricity\n    value 200\n  - source "Natural Gas"\n    target Heating\n    value 160\n  - source "Natural Gas"\n    target Chemicals\n    value 80\n  - source Hydro\n    target Electricity\n    value 180\n  - source Nuclear\n    target Electricity\n    value 100\n  - source Wind\n    target Electricity\n    value 90\n  - source Solar\n    target Electricity\n    value 60\nnodeAlign justify\ntitle "Global Energy Flow"',
    },
    {
      title: 'User behavior path analysis from homepage to payment completion, custom colors',
      description: 'User behavior path analysis from homepage to payment completion',
      code: 'vis sankey\ndata\n  - source Homepage\n    target "Product List"\n    value 4500\n  - source Homepage\n    target Search\n    value 3200\n  - source Homepage\n    target Promotions\n    value 1800\n  - source "Product List"\n    target "Product Details"\n    value 2800\n  - source Search\n    target "Product Details"\n    value 2400\n  - source Promotions\n    target "Product Details"\n    value 1200\n  - source "Product Details"\n    target "Add to Cart"\n    value 3200\n  - source "Product Details"\n    target "Direct Purchase"\n    value 800\n  - source "Add to Cart"\n    target "Submit Order"\n    value 1800\n  - source "Submit Order"\n    target "Payment Complete"\n    value 1500\nnodeAlign center\ntitle "User Behavior Path Analysis"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Supply chain fund flow from raw materials to consumers, custom palette',
      description: 'Supply chain fund flow from raw materials to consumers',
      code: 'vis sankey\ndata\n  - source "Raw Materials"\n    target "Manufacturing A"\n    value 500\n  - source "Raw Materials"\n    target "Manufacturing B"\n    value 300\n  - source Components\n    target "Manufacturing A"\n    value 200\n  - source Components\n    target "Manufacturing B"\n    value 400\n  - source "Manufacturing A"\n    target Assembly\n    value 650\n  - source "Manufacturing B"\n    target Assembly\n    value 350\n  - source "Manufacturing A"\n    target "Direct Sales"\n    value 50\n  - source Assembly\n    target Brand\n    value 800\n  - source Assembly\n    target Distributor\n    value 200\n  - source Brand\n    target Retailer\n    value 500\n  - source Brand\n    target "E-commerce"\n    value 300\n  - source Distributor\n    target Retailer\n    value 150\n  - source Distributor\n    target "E-commerce"\n    value 50\n  - source "Direct Sales"\n    target Consumer\n    value 50\nnodeAlign left\ntitle "Supply Chain Fund Flow"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n    - "#8B9A46"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
