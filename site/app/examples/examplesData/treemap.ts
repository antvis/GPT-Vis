import { LayoutGrid } from 'lucide-react';
export const treemapData = {
  id: 'treemap',
  name: 'Treemap',
  icon: LayoutGrid,
  galleryExamples:
    'vis treemap\ndata\n  - name Software\n    value 2800\n    children\n      - name Microsoft\n        value 1200\n      - name Oracle\n        value 500\n      - name SAP\n        value 400\n      - name Salesforce\n        value 700\n  - name Hardware\n    value 2200\n    children\n      - name Apple\n        value 1500\n      - name Dell\n        value 400\n      - name Lenovo\n        value 300\n  - name Semiconductors\n    value 1800\n    children\n      - name NVIDIA\n        value 900\n      - name TSMC\n        value 600\n      - name Intel\n        value 300\n  - name Internet\n    value 3200\n    children\n      - name Google\n        value 1100\n      - name Amazon\n        value 1200\n      - name Meta\n        value 900\ntitle "Global Tech Market Cap Distribution"',
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
            description: 'Chart type, required, string type, value must be "treemap".',
          },
          {
            property: 'data',
            type: 'required',
            description: 'Chart data, required, array of objects containing nested objects.',
          },
          {
            property: 'data.name',
            type: 'required',
            description: 'Category name, required, string type.',
          },
          {
            property: 'data.value',
            type: 'required',
            description: 'Category value, required, numeric type.',
          },
          {
            property: 'data.children',
            type: 'optional',
            description: 'Subcategory list, optional, array of objects.',
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
        'Global Tech Industry Market Cap Distribution, Covering Software, Hardware, Semiconductors, and Internet',
      description:
        'Global Tech Industry Market Cap Distribution, Covering Software, Hardware, Semiconductors, and Internet',
      code: 'vis treemap\ndata\n  - name Software\n    value 2800\n    children\n      - name Microsoft\n        value 1200\n      - name Oracle\n        value 500\n      - name SAP\n        value 400\n      - name Salesforce\n        value 700\n  - name Hardware\n    value 2200\n    children\n      - name Apple\n        value 1500\n      - name Dell\n        value 400\n      - name Lenovo\n        value 300\n  - name Semiconductors\n    value 1800\n    children\n      - name NVIDIA\n        value 900\n      - name TSMC\n        value 600\n      - name Intel\n        value 300\n  - name Internet\n    value 3200\n    children\n      - name Google\n        value 1100\n      - name Amazon\n        value 1200\n      - name Meta\n        value 900\ntitle "Global Tech Market Cap Distribution"',
    },
    {
      title: 'China Internet Industry Market Distribution by Segment, Custom Colors',
      description: 'China Internet Industry Market Distribution by Segment',
      code: 'vis treemap\ndata\n  - name E-commerce\n    value 3500\n    children\n      - name Alibaba\n        value 1500\n      - name JD.com\n        value 900\n      - name Pinduoduo\n        value 1100\n  - name Social\n    value 2800\n    children\n      - name Tencent\n        value 1800\n      - name ByteDance\n        value 1000\n  - name Ride-hailing\n    value 1500\n    children\n      - name Didi\n        value 600\n      - name Meituan\n        value 900\n  - name Education\n    value 800\n    children\n      - name "New Oriental"\n        value 350\n      - name TAL\n        value 250\n      - name Yuanfudao\n        value 200\n  - name Gaming\n    value 2200\n    children\n      - name NetEase\n        value 800\n      - name miHoYo\n        value 700\n      - name Lilith\n        value 400\n      - name Papergames\n        value 300\ntitle "China Internet Industry Segments"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Global GDP Distribution by Continent, Custom Palette',
      description: 'Global GDP Distribution by Continent',
      code: 'vis treemap\ndata\n  - name Asia\n    value 38000\n    children\n      - name China\n        value 18000\n      - name Japan\n        value 5000\n      - name India\n        value 4000\n  - name "North America"\n    value 28000\n    children\n      - name USA\n        value 25000\n      - name Canada\n        value 2000\n      - name Mexico\n        value 1000\n  - name Europe\n    value 22000\n    children\n      - name Germany\n        value 5000\n      - name UK\n        value 4000\n      - name France\n        value 3000\n  - name "South America"\n    value 4500\n    children\n      - name Brazil\n        value 2500\n      - name Argentina\n        value 1000\n      - name Colombia\n        value 1000\n  - name Africa\n    value 3000\n    children\n      - name Nigeria\n        value 1000\n      - name "South Africa"\n        value 1000\n      - name Egypt\n        value 1000\n  - name Oceania\n    value 2000\n    children\n      - name Australia\n        value 1500\n      - name "New Zealand"\n        value 500\ntitle "Global GDP Distribution"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n    - "#8B9A46"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
