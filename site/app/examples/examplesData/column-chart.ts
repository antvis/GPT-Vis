import { BarChart2 } from 'lucide-react';

export const columnChartData = {
  id: 'column-chart',
  name: 'Column Chart',
  icon: BarChart2,
  galleryExamples:
    'vis column\ndata\n  - category Jan\n    value 820\n  - category Feb\n    value 650\n  - category Mar\n    value 780\n  - category Apr\n    value 860\n  - category May\n    value 920\n  - category Jun\n    value 1350\n  - category Jul\n    value 890\n  - category Aug\n    value 850\n  - category Sep\n    value 960\n  - category Oct\n    value 1100\n  - category Nov\n    value 2180\n  - category Dec\n    value 1250\ntitle "2024 E-commerce Monthly GMV"\naxisXTitle Month\naxisYTitle "GMV (100M CNY)"',
  description:
    'A column chart is a statistical chart that uses vertical bars to compare numerical values across different categories. The most basic column chart requires one categorical variable and one numerical variable. In a column chart, each entity of the categorical variable is represented as a rectangle (commonly called a "bar"), and the numerical value determines the height of the bar.',
  knowledge: {
    introduction:
      'A column chart is a statistical chart that uses vertical bars to compare numerical values across different categories. The most basic column chart requires one categorical variable and one numerical variable. In a column chart, each entity of the categorical variable is represented as a rectangle (commonly called a "bar"), and the numerical value determines the height of the bar.',
    useCases: [
      'Column charts are best suited for comparing categorical data',
      'Especially when values are close, since human perception of height is more accurate than other visual elements (such as area, angle, etc.), column charts are more appropriate',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "column".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: 'Chart data.',
          },
          {
            property: 'data.category',
            type: 'required',
            valueType: 'string',
            description: 'Category name.',
          },
          {
            property: 'data.value',
            type: 'required',
            valueType: 'number',
            description: 'Data value.',
          },
          {
            property: 'data.group',
            type: 'optional',
            valueType: 'string',
            description: 'Group name. Required when grouping or stacking is enabled.',
          },
          {
            property: 'group',
            type: 'optional',
            valueType: 'boolean',
            description: 'Whether to enable grouping.',
          },
          {
            property: 'stack',
            type: 'optional',
            valueType: 'boolean',
            description: 'Whether to enable stacking.',
          },
          {
            property: 'title',
            type: 'optional',
            valueType: 'string',
            description: 'Chart title.',
          },
          {
            property: 'axisXTitle',
            type: 'optional',
            valueType: 'string',
            description: 'X-axis title.',
          },
          {
            property: 'axisYTitle',
            type: 'optional',
            valueType: 'string',
            description: 'Y-axis title.',
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
      title: '2024 E-commerce Monthly GMV',
      description: '2024 E-commerce Monthly GMV',
      code: 'vis column\ndata\n  - category Jan\n    value 820\n  - category Feb\n    value 650\n  - category Mar\n    value 780\n  - category Apr\n    value 860\n  - category May\n    value 920\n  - category Jun\n    value 1350\n  - category Jul\n    value 890\n  - category Aug\n    value 850\n  - category Sep\n    value 960\n  - category Oct\n    value 1100\n  - category Nov\n    value 2180\n  - category Dec\n    value 1250\ntitle "2024 E-commerce Monthly GMV"\naxisXTitle Month\naxisYTitle "GMV (100M CNY)"',
    },
    {
      title: 'Six-Country GDP Growth Comparison, Custom Colors',
      description: 'Six-Country GDP Growth Comparison',
      code: 'vis column\ndata\n  - category China\n    value 5.2\n    group 2023\n  - category China\n    value 5.0\n    group 2024\n  - category USA\n    value 2.5\n    group 2023\n  - category USA\n    value 2.8\n    group 2024\n  - category Japan\n    value 1.9\n    group 2023\n  - category Japan\n    value 1.2\n    group 2024\n  - category Germany\n    value -0.3\n    group 2023\n  - category Germany\n    value 0.4\n    group 2024\n  - category India\n    value 7.2\n    group 2023\n  - category India\n    value 6.8\n    group 2024\n  - category "South Korea"\n    value 1.4\n    group 2023\n  - category "South Korea"\n    value 2.2\n    group 2024\ngroup true\ntitle "Six-Country GDP Growth Comparison"\naxisXTitle Country\naxisYTitle "GDP Growth (%)"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Quarterly Expenditure by Department, Custom Palette',
      description: 'Quarterly Expenditure by Department',
      code: 'vis column\ndata\n  - category R&D\n    value 380\n    group Q1\n  - category R&D\n    value 420\n    group Q2\n  - category R&D\n    value 450\n    group Q3\n  - category R&D\n    value 500\n    group Q4\n  - category Marketing\n    value 250\n    group Q1\n  - category Marketing\n    value 300\n    group Q2\n  - category Marketing\n    value 280\n    group Q3\n  - category Marketing\n    value 350\n    group Q4\n  - category Operations\n    value 200\n    group Q1\n  - category Operations\n    value 220\n    group Q2\n  - category Operations\n    value 240\n    group Q3\n  - category Operations\n    value 260\n    group Q4\n  - category HR\n    value 180\n    group Q1\n  - category HR\n    value 190\n    group Q2\n  - category HR\n    value 200\n    group Q3\n  - category HR\n    value 210\n    group Q4\nstack true\ntitle "Quarterly Expenditure by Department"\naxisXTitle Department\naxisYTitle "Expenditure (10K CNY)"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
