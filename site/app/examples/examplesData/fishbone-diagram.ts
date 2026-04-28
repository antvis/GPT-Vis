import { Fish } from 'lucide-react';

export const fishboneDiagramData = {
  id: 'fishbone-diagram',
  name: 'Fishbone diagram',
  icon: Fish,
  galleryExamples:
    'vis fishbone-diagram\ntitle "Low Production Efficiency"\ndata\n  name "Low Production Efficiency"\n  children\n    - name "Equipment Issues"\n      children\n        - name "Aging Equipment"\n    - name "Staff Issues"\n      children\n        - name "Insufficient Skills"\n    - name "Process Issues"\n      children\n        - name "Cumbersome Processes"',
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
            valueType: "'default' | 'dark' | 'academy'",
            description: 'Chart theme, default is "default".',
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
      title: 'Product Profit Below Target (default theme)',
      description:
        'Multi-dimensional breakdown of root causes for product profit below target, default theme',
      code: 'vis fishbone-diagram\ntitle "Product Profit Below Target"\ndata\n  name "Product Profit Below Target"\n  children\n    - name "Problem Description & Analysis"\n      children\n        - name "Brand Sales Analysis"\n        - name "Market Size Assessment"\n        - name "Brand Market Share Analysis"\n        - name "Total Contribution Margin Calculation"\n    - name "Brand Positioning Strategy"\n      children\n        - name "Packaging Design"\n        - name "Brand Name Selection"\n        - name "Pricing Strategy"\n        - name "Product Specification Definition"\n    - name "Distribution Channel Management"\n      children\n        - name "Regional Distribution"\n        - name "Channel Selection"\n        - name "Customer Type Classification"\n        - name "Sales Staff Coverage"\n    - name "Market Awareness Improvement"\n      children\n        - name "Regional Weight Analysis"\n        - name "Media Mix Strategy"\n        - name "Advertising Budget"\n        - name "Quality Awareness Enhancement"\n    - name "Trial Purchase Strategy"\n      children\n        - name "In-Store Display Effect"\n        - name "Promotion Format Design"\n        - name "Promotion Timing Selection"\n        - name "Supply Assurance Measures"\n    - name "Repeat Purchase Strategy"\n      children\n        - name "Consumer Profile Management"\n        - name "Usage Occasion Analysis"\n        - name "Usage Frequency Tracking"\n        - name "Product-Related Return Handling"\ntheme default',
    },
    {
      title: 'Low Production Efficiency (academy theme)',
      description:
        'Analyzing causes of low production efficiency from equipment, staff, and process dimensions, academy theme',
      code: 'vis fishbone-diagram\ntitle "Low Production Efficiency"\ndata\n  name "Low Production Efficiency"\n  children\n    - name "Equipment Issues"\n      children\n        - name "Aging Equipment"\n        - name "Delayed Maintenance"\n    - name "Staff Issues"\n      children\n        - name "Insufficient Skills"\n        - name "Poor Work Attitude"\n    - name "Process Issues"\n      children\n        - name "Cumbersome Processes"\n        - name "Lack of Standardization"\ntheme academy',
    },
    {
      title: 'Slow Website Response, Custom Palette',
      description:
        'Analyzing root causes of slow page loading from front-end, back-end, and network perspectives, custom palette',
      code: 'vis fishbone-diagram\ntitle "Slow Website Response"\ndata\n  name "Excessive Page Load Time"\n  children\n    - name "Front-End Factors"\n      children\n        - name "Uncompressed Resources"\n        - name "Too Many Third-Party Scripts"\n    - name "Back-End Factors"\n      children\n        - name "Unoptimized Database Queries"\n        - name "Slow API Response"\n    - name "Network Factors"\n      children\n        - name "Improper CDN Configuration"\n        - name "Insufficient Bandwidth"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
