import { LayoutGrid } from 'lucide-react';
export const treemapData = {
  id: 'treemap',
  name: 'Treemap',
  icon: LayoutGrid,
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
        'Global Tech Industry Market Cap Distribution, Covering Software, Hardware, Semiconductors, and Internet',
      description:
        'Global Tech Industry Market Cap Distribution, Covering Software, Hardware, Semiconductors, and Internet',
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
    {
      title: 'China Internet Industry Market Distribution by Segment, Custom Colors',
      description: 'China Internet Industry Market Distribution by Segment',
      json: {
        type: 'treemap',
        data: [
          {
            name: 'E-commerce',
            value: 3500,
            children: [
              { name: 'Alibaba', value: 1500 },
              { name: 'JD.com', value: 900 },
              { name: 'Pinduoduo', value: 1100 },
            ],
          },
          {
            name: 'Social',
            value: 2800,
            children: [
              { name: 'Tencent', value: 1800 },
              { name: 'ByteDance', value: 1000 },
            ],
          },
          {
            name: 'Ride-hailing',
            value: 1500,
            children: [
              { name: 'Didi', value: 600 },
              { name: 'Meituan', value: 900 },
            ],
          },
          {
            name: 'Education',
            value: 800,
            children: [
              { name: 'New Oriental', value: 350 },
              { name: 'TAL', value: 250 },
              { name: 'Yuanfudao', value: 200 },
            ],
          },
          {
            name: 'Gaming',
            value: 2200,
            children: [
              { name: 'NetEase', value: 800 },
              { name: 'miHoYo', value: 700 },
              { name: 'Lilith', value: 400 },
              { name: 'Papergames', value: 300 },
            ],
          },
        ],
        title: 'China Internet Industry Segments',
        style: {
          palette: ['#A855F7', '#38BDF8', '#F9A8D4', '#34D399', '#818CF8'],
          backgroundColor: '#f8f7ff',
        },
      },
      dsl: 'vis treemap\ndata\n  - name E-commerce\n    value 3500\n    children\n      - name Alibaba\n        value 1500\n      - name JD.com\n        value 900\n      - name Pinduoduo\n        value 1100\n  - name Social\n    value 2800\n    children\n      - name Tencent\n        value 1800\n      - name ByteDance\n        value 1000\n  - name Ride-hailing\n    value 1500\n    children\n      - name Didi\n        value 600\n      - name Meituan\n        value 900\n  - name Education\n    value 800\n    children\n      - name "New Oriental"\n        value 350\n      - name TAL\n        value 250\n      - name Yuanfudao\n        value 200\n  - name Gaming\n    value 2200\n    children\n      - name NetEase\n        value 800\n      - name miHoYo\n        value 700\n      - name Lilith\n        value 400\n      - name Papergames\n        value 300\ntitle "China Internet Industry Segments"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Global GDP Distribution by Continent, Custom Palette',
      description: 'Global GDP Distribution by Continent',
      json: {
        type: 'treemap',
        data: [
          {
            name: 'Asia',
            value: 38000,
            children: [
              { name: 'China', value: 18000 },
              { name: 'Japan', value: 5000 },
              { name: 'India', value: 4000 },
            ],
          },
          {
            name: 'North America',
            value: 28000,
            children: [
              { name: 'USA', value: 25000 },
              { name: 'Canada', value: 2000 },
              { name: 'Mexico', value: 1000 },
            ],
          },
          {
            name: 'Europe',
            value: 22000,
            children: [
              { name: 'Germany', value: 5000 },
              { name: 'UK', value: 4000 },
              { name: 'France', value: 3000 },
            ],
          },
          {
            name: 'South America',
            value: 4500,
            children: [
              { name: 'Brazil', value: 2500 },
              { name: 'Argentina', value: 1000 },
              { name: 'Colombia', value: 1000 },
            ],
          },
          {
            name: 'Africa',
            value: 3000,
            children: [
              { name: 'Nigeria', value: 1000 },
              { name: 'South Africa', value: 1000 },
              { name: 'Egypt', value: 1000 },
            ],
          },
          {
            name: 'Oceania',
            value: 2000,
            children: [
              { name: 'Australia', value: 1500 },
              { name: 'New Zealand', value: 500 },
            ],
          },
        ],
        title: 'Global GDP Distribution',
        theme: 'academy',
        style: {
          palette: ['#C45B42', '#7D8C6E', '#D4A373', '#E9C46A', '#A98467', '#8B9A46'],
          backgroundColor: '#FBF8F4',
        },
      },
      dsl: 'vis treemap\ndata\n  - name Asia\n    value 38000\n    children\n      - name China\n        value 18000\n      - name Japan\n        value 5000\n      - name India\n        value 4000\n  - name "North America"\n    value 28000\n    children\n      - name USA\n        value 25000\n      - name Canada\n        value 2000\n      - name Mexico\n        value 1000\n  - name Europe\n    value 22000\n    children\n      - name Germany\n        value 5000\n      - name UK\n        value 4000\n      - name France\n        value 3000\n  - name "South America"\n    value 4500\n    children\n      - name Brazil\n        value 2500\n      - name Argentina\n        value 1000\n      - name Colombia\n        value 1000\n  - name Africa\n    value 3000\n    children\n      - name Nigeria\n        value 1000\n      - name "South Africa"\n        value 1000\n      - name Egypt\n        value 1000\n  - name Oceania\n    value 2000\n    children\n      - name Australia\n        value 1500\n      - name "New Zealand"\n        value 500\ntitle "Global GDP Distribution"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n    - "#8B9A46"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
