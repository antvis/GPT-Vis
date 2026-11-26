export const treemapData = {
  id: 'treemap',
  name: 'Treemap',
  galleryDsl:
    'vis treemap\ndata\n  - name Software\n    value 2800\n    children\n      - name Microsoft\n        value 1200\n      - name Oracle\n        value 500\n      - name SAP\n        value 400\n      - name Salesforce\n        value 700\n  - name Hardware\n    value 2200\n    children\n      - name Apple\n        value 1500\n      - name Dell\n        value 400\n      - name Lenovo\n        value 300\n  - name Semiconductors\n    value 1800\n    children\n      - name NVIDIA\n        value 900\n      - name TSMC\n        value 600\n      - name Intel\n        value 300\n  - name Internet\n    value 3200\n    children\n      - name Google\n        value 1100\n      - name Amazon\n        value 1200\n      - name Meta\n        value 900\ntitle "Tech Market Cap"',
  galleryJson: {
    type: 'treemap',
    data: [
      {
        name: 'Software',
        value: 2800,
        children: [
          { name: 'Microsoft', value: 1200 },
          { name: 'Oracle', value: 500 },
          { name: 'SAP', value: 400 },
          { name: 'Salesforce', value: 700 },
        ],
      },
      {
        name: 'Hardware',
        value: 2200,
        children: [
          { name: 'Apple', value: 1500 },
          { name: 'Dell', value: 400 },
          { name: 'Lenovo', value: 300 },
        ],
      },
      {
        name: 'Semiconductors',
        value: 1800,
        children: [
          { name: 'NVIDIA', value: 900 },
          { name: 'TSMC', value: 600 },
          { name: 'Intel', value: 300 },
        ],
      },
      {
        name: 'Internet',
        value: 3200,
        children: [
          { name: 'Google', value: 1100 },
          { name: 'Amazon', value: 1200 },
          { name: 'Meta', value: 900 },
        ],
      },
    ],
    title: 'Tech Market Cap',
  },
  description:
    "A treemap is a chart used to display hierarchical data structures. It visualizes hierarchical relationships by nesting data in rectangular areas. Each rectangle represents a category, and its size corresponds to the category's value. Treemaps are excellent for visualizing proportions across multiple categories, especially with large datasets, helping to quickly analyze the importance or weight of data.",
  knowledge: {
    introduction:
      "A treemap is a chart used to display hierarchical data structures. It visualizes hierarchical relationships by nesting data in rectangular areas. Each rectangle represents a category, and its size corresponds to the category's value. Treemaps are excellent for visualizing proportions across multiple categories, especially with large datasets, helping to quickly analyze the importance or weight of data.",
    useCases: [
      'Display data with hierarchical structures, such as corporate organization charts or directory file systems.',
      'Compare multiple categorical items and show the proportion of each category within the whole.',
      'Analyze relationships and proportions between categories, and the contribution of subcategories to parent categories.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "treemap".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: 'Chart data, array of objects containing nested objects.',
          },
          {
            property: 'data.name',
            type: 'required',
            valueType: 'string',
            description: 'Category name.',
          },
          {
            property: 'data.value',
            type: 'required',
            valueType: 'number',
            description: 'Category value.',
          },
          {
            property: 'data.children',
            type: 'optional',
            valueType: 'Object[]',
            description: 'Subcategory list.',
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
      title: 'Hierarchical part-to-whole comparison',
      description: 'Hierarchical part-to-whole comparison',
      json: {
        type: 'treemap',
        data: [
          {
            name: 'Software',
            value: 2800,
            children: [
              { name: 'Microsoft', value: 1200 },
              { name: 'Oracle', value: 500 },
              { name: 'SAP', value: 400 },
              { name: 'Salesforce', value: 700 },
            ],
          },
          {
            name: 'Hardware',
            value: 2200,
            children: [
              { name: 'Apple', value: 1500 },
              { name: 'Dell', value: 400 },
              { name: 'Lenovo', value: 300 },
            ],
          },
          {
            name: 'Semiconductors',
            value: 1800,
            children: [
              { name: 'NVIDIA', value: 900 },
              { name: 'TSMC', value: 600 },
              { name: 'Intel', value: 300 },
            ],
          },
          {
            name: 'Internet',
            value: 3200,
            children: [
              { name: 'Google', value: 1100 },
              { name: 'Amazon', value: 1200 },
              { name: 'Meta', value: 900 },
            ],
          },
        ],
        title: 'Tech Market Cap',
      },
      dsl: 'vis treemap\ndata\n  - name Software\n    value 2800\n    children\n      - name Microsoft\n        value 1200\n      - name Oracle\n        value 500\n      - name SAP\n        value 400\n      - name Salesforce\n        value 700\n  - name Hardware\n    value 2200\n    children\n      - name Apple\n        value 1500\n      - name Dell\n        value 400\n      - name Lenovo\n        value 300\n  - name Semiconductors\n    value 1800\n    children\n      - name NVIDIA\n        value 900\n      - name TSMC\n        value 600\n      - name Intel\n        value 300\n  - name Internet\n    value 3200\n    children\n      - name Google\n        value 1100\n      - name Amazon\n        value 1200\n      - name Meta\n        value 900\ntitle "Tech Market Cap"',
    },
  ],
};
