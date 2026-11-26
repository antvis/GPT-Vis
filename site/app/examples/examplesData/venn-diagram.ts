export const vennDiagramData = {
  id: 'venn-diagram',
  name: 'Venn Diagram',
  galleryDsl:
    'vis venn\ndata\n  - sets A\n    value 3500\n    label Phone\n  - sets B\n    value 2800\n    label Earphones\n  - sets C\n    value 2200\n    label Charger\n  - sets A,B\n    value 1500\n  - sets A,C\n    value 1200\n  - sets B,C\n    value 800\n  - sets A,B,C\n    value 600\ntitle "User Purchase Behavior Overlap"',
  galleryJson: {
    type: 'venn',
    data: [
      { sets: 'A', value: 3500, label: 'Phone' },
      { sets: 'B', value: 2800, label: 'Earphones' },
      { sets: 'C', value: 2200, label: 'Charger' },
      { sets: 'A,B', value: 1500 },
      { sets: 'A,C', value: 1200 },
      { sets: 'B,C', value: 800 },
      { sets: 'A,B,C', value: 600 },
    ],
    title: 'User Purchase Behavior Overlap',
  },
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
            valueType: 'string',
            description: 'Value must be "venn".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: 'Data array, each item contains sets, value, and optional label.',
          },
          {
            property: 'data.sets',
            type: 'required',
            valueType: 'string[] | string',
            description:
              'Set identifier, indicates which set(s) the item belongs to. Can be a single set, combination, or comma-separated string.',
          },
          {
            property: 'data.value',
            type: 'required',
            valueType: 'number',
            description: 'Represents the size of the set or set intersection.',
          },
          {
            property: 'data.label',
            type: 'optional',
            valueType: 'string',
            description: 'Name of the set or set intersection.',
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
      title: 'Three-set intersections',
      description: 'Three-set intersections',
      json: {
        type: 'venn',
        data: [
          { sets: 'A', value: 3500, label: 'Bought Phone' },
          { sets: 'B', value: 2800, label: 'Bought Earphones' },
          { sets: 'C', value: 2200, label: 'Bought Charger' },
          { sets: 'A,B', value: 1500 },
          { sets: 'A,C', value: 1200 },
          { sets: 'B,C', value: 800 },
          { sets: 'A,B,C', value: 600 },
        ],
        title: 'User Purchase Behavior Intersection',
      },
      dsl: 'vis venn\ndata\n  - sets A\n    value 3500\n    label "Bought Phone"\n  - sets B\n    value 2800\n    label "Bought Earphones"\n  - sets C\n    value 2200\n    label "Bought Charger"\n  - sets A,B\n    value 1500\n  - sets A,C\n    value 1200\n  - sets B,C\n    value 800\n  - sets A,B,C\n    value 600\ntitle "User Purchase Behavior Intersection"',
    },
    {
      title: 'Two-set intersection',
      description: 'Two-set intersection',
      json: {
        type: 'venn',
        data: [
          { sets: 'A', value: 3500, label: 'Bought Phone' },
          { sets: 'B', value: 2800, label: 'Bought Earphones' },
          { sets: 'A,B', value: 1500 },
        ],
        title: '618 Sale Phone & Earphone Buyer Overlap',
      },
      dsl: 'vis venn\ndata\n  - sets A\n    value 3500\n    label "Bought Phone"\n  - sets B\n    value 2800\n    label "Bought Earphones"\n  - sets A,B\n    value 1500\ntitle "618 Sale Phone & Earphone Buyer Overlap"',
    },
  ],
};
