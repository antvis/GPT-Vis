import { CircleDot } from 'lucide-react';

export const vennDiagramData = {
  id: 'venn-diagram',
  name: 'Venn Diagram',
  icon: CircleDot,
  galleryExamples:
    'vis venn\ndata\n  - sets A\n    value 3500\n    label "Bought Phone"\n  - sets B\n    value 2800\n    label "Bought Earphones"\n  - sets C\n    value 2200\n    label "Bought Charger"\n  - sets A,B\n    value 1500\n  - sets A,C\n    value 1200\n  - sets B,C\n    value 800\n  - sets A,B,C\n    value 600',
  description:
    'A Venn diagram is a chart that uses overlapping circles to represent set relationships. Each circle represents a set, and the overlapping areas between circles represent the intersection of sets, while non-overlapping parts represent unique elements. Venn diagrams intuitively show intersections, unions, and complements between sets, and are commonly used in set operations, classification analysis, and similar scenarios.',
  knowledge: {
    introduction:
      'A Venn diagram is a chart that uses overlapping circles to represent set relationships. Each circle represents a set, and the overlapping areas between circles represent the intersection of sets, while non-overlapping parts represent unique elements. Venn diagrams intuitively show intersections, unions, and complements between sets, and are commonly used in set operations, classification analysis, and similar scenarios.',
    useCases: [
      'Used to show relationships between sets, such as data classification, attribute overlap, and user group intersections',
      'Suitable for analyzing intersections, unions, and complements of sets, commonly seen in mathematics, statistics, and market analysis',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: 'Chart type, required, string type, value must be "venn".',
          },
          {
            property: 'data',
            type: 'required',
            description: 'Data, required, array type, containing sets, value, and label fields.',
          },
          {
            property: 'data.sets',
            type: 'required',
            description:
              'Set identifier, required, string array type, indicates which set(s) the data item belongs to, can be a single set or a combination of multiple sets.',
          },
          {
            property: 'data.value',
            type: 'required',
            description:
              'Set size, required, numeric type, represents the size of the set or set intersection.',
          },
          {
            property: 'data.label',
            type: 'optional',
            description:
              'Set label, optional, string type, represents the name of the set or set intersection.',
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
            description:
              'Color palette, optional, array type, must be an array of valid color values.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        'User Purchase Behavior Intersection: Phone buyers (3500), Earphone buyers (2800), Charger buyers (2200)',
      description:
        'User Purchase Behavior Intersection: Phone buyers (3500), Earphone buyers (2800), Charger buyers (2200)',
      code: 'vis venn\ndata\n  - sets A\n    value 3500\n    label "Bought Phone"\n  - sets B\n    value 2800\n    label "Bought Earphones"\n  - sets C\n    value 2200\n    label "Bought Charger"\n  - sets A,B\n    value 1500\n  - sets A,C\n    value 1200\n  - sets B,C\n    value 800\n  - sets A,B,C\n    value 600\ntitle "User Purchase Behavior Intersection"',
    },
    {
      title:
        'Music Listener Intersection: Overlap of Radiohead, Kanye West, and Eminem fan bases from Last.fm listening records, Custom Colors',
      description:
        'Music Listener Intersection: Overlap of Radiohead, Kanye West, and Eminem fan bases from Last.fm listening records',
      code: 'vis venn\ndata\n  - sets A\n    value 77348\n    label Radiohead\n  - sets B\n    value 27053\n    label "Kanye West"\n  - sets C\n    value 19056\n    label Eminem\n  - sets A,B\n    value 6141\n  - sets A,C\n    value 2723\n  - sets B,C\n    value 5465\n  - sets A,B,C\n    value 715\ntitle "Music Listener Intersection"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title:
        'E-commerce 618 Sale: Overlap of Phone buyers (3500) and Earphone buyers (2800), Custom Palette',
      description: 'E-commerce 618 Sale: Overlap of Phone buyers (3500) and Earphone buyers (2800)',
      code: 'vis venn\ndata\n  - sets A\n    value 3500\n    label "Bought Phone"\n  - sets B\n    value 2800\n    label "Bought Earphones"\n  - sets A,B\n    value 1500\ntitle "618 Sale Phone & Earphone Buyer Overlap"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
