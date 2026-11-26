export const fishboneDiagramData = {
  id: 'fishbone-diagram',
  name: 'Fishbone diagram',
  galleryDsl:
    'vis fishbone-diagram\ntitle "Low Production Efficiency"\ndata\n  name "Low Production Efficiency"\n  children\n    - name "Equipment Issues"\n      children\n        - name "Aging Equipment"\n    - name "Staff Issues"\n      children\n        - name "Insufficient Skills"\n    - name "Process Issues"\n      children\n        - name "Cumbersome Processes"',
  galleryJson: {
    type: 'fishbone-diagram',
    title: 'Low Production Efficiency',
    data: {
      name: 'Low Production Efficiency',
      children: [
        { name: 'Equipment Issues', children: [{ name: 'Aging Equipment' }] },
        { name: 'Staff Issues', children: [{ name: 'Insufficient Skills' }] },
        { name: 'Process Issues', children: [{ name: 'Cumbersome Processes' }] },
      ],
    },
  },
  description:
    'A professional chart that displays root causes of problems through a tree structure',
  knowledge: {
    introduction:
      'A fishbone diagram (also known as a cause-and-effect diagram or Ishikawa diagram) systematically analyzes the causes of a problem, breaking down complex issues into multiple manageable factors',
    useCases: [
      'Production quality issue analysis',
      'Business process bottleneck diagnosis',
      'Project risk identification and management',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "fishbone-diagram".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object',
            description: 'Root node (core problem) of the fishbone diagram.',
          },
          {
            property: 'data.name',
            type: 'required',
            valueType: 'string',
            description: 'Root node name, i.e., the core problem description.',
          },
          {
            property: 'data.children',
            type: 'required',
            valueType: 'Object[]',
            description: 'Cause category list (fishbone main branches).',
          },
          {
            property: 'data.children.name',
            type: 'required',
            valueType: 'string',
            description: 'Category name, i.e., the major cause category.',
          },
          {
            property: 'data.children.children',
            type: 'optional',
            valueType: 'Object[]',
            description: 'Specific cause list (fishbone sub-branches).',
          },
          {
            property: 'data.children.children.name',
            type: 'required',
            valueType: 'string',
            description: 'Specific cause name.',
          },
          {
            property: 'theme',
            type: 'optional',
            valueType: 'BuiltinThemeName | ThemeSpec',
            description:
              'Built-in theme name or custom theme object; default is "default". See Documentation → Custom Themes.',
          },
          {
            property: 'title',
            type: 'optional',
            valueType: 'string',
            description: 'Chart title.',
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
          {
            property: 'style.texture',
            type: 'optional',
            valueType: "'rough' | 'default'",
            description: 'Node rendering style, default is "default".',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Cause-and-effect analysis',
      description: 'Cause-and-effect analysis',
      json: {
        type: 'fishbone-diagram',
        title: 'Product Profit Below Target',
        data: {
          name: 'Product Profit Below Target',
          children: [
            {
              name: 'Problem Description & Analysis',
              children: [
                { name: 'Brand Sales Analysis' },
                { name: 'Market Size Assessment' },
                { name: 'Brand Market Share Analysis' },
                { name: 'Total Contribution Margin Calculation' },
              ],
            },
            {
              name: 'Brand Positioning Strategy',
              children: [
                { name: 'Packaging Design' },
                { name: 'Brand Name Selection' },
                { name: 'Pricing Strategy' },
                { name: 'Product Specification Definition' },
              ],
            },
            {
              name: 'Distribution Channel Management',
              children: [
                { name: 'Regional Distribution' },
                { name: 'Channel Selection' },
                { name: 'Customer Type Classification' },
                { name: 'Sales Staff Coverage' },
              ],
            },
            {
              name: 'Market Awareness Improvement',
              children: [
                { name: 'Regional Weight Analysis' },
                { name: 'Media Mix Strategy' },
                { name: 'Advertising Budget' },
                { name: 'Quality Awareness Enhancement' },
              ],
            },
            {
              name: 'Trial Purchase Strategy',
              children: [
                { name: 'In-Store Display Effect' },
                { name: 'Promotion Format Design' },
                { name: 'Promotion Timing Selection' },
                { name: 'Supply Assurance Measures' },
              ],
            },
            {
              name: 'Repeat Purchase Strategy',
              children: [
                { name: 'Consumer Profile Management' },
                { name: 'Usage Occasion Analysis' },
                { name: 'Usage Frequency Tracking' },
                { name: 'Product-Related Return Handling' },
              ],
            },
          ],
        },
      },
      dsl: 'vis fishbone-diagram\ntitle "Product Profit Below Target"\ndata\n  name "Product Profit Below Target"\n  children\n    - name "Problem Description & Analysis"\n      children\n        - name "Brand Sales Analysis"\n        - name "Market Size Assessment"\n        - name "Brand Market Share Analysis"\n        - name "Total Contribution Margin Calculation"\n    - name "Brand Positioning Strategy"\n      children\n        - name "Packaging Design"\n        - name "Brand Name Selection"\n        - name "Pricing Strategy"\n        - name "Product Specification Definition"\n    - name "Distribution Channel Management"\n      children\n        - name "Regional Distribution"\n        - name "Channel Selection"\n        - name "Customer Type Classification"\n        - name "Sales Staff Coverage"\n    - name "Market Awareness Improvement"\n      children\n        - name "Regional Weight Analysis"\n        - name "Media Mix Strategy"\n        - name "Advertising Budget"\n        - name "Quality Awareness Enhancement"\n    - name "Trial Purchase Strategy"\n      children\n        - name "In-Store Display Effect"\n        - name "Promotion Format Design"\n        - name "Promotion Timing Selection"\n        - name "Supply Assurance Measures"\n    - name "Repeat Purchase Strategy"\n      children\n        - name "Consumer Profile Management"\n        - name "Usage Occasion Analysis"\n        - name "Usage Frequency Tracking"\n        - name "Product-Related Return Handling"',
    },
  ],
};
