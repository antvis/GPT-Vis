import { BarChartHorizontal } from 'lucide-react';
export const barChartData = {
  id: 'bar-chart',
  name: 'Bar Chart',
  icon: BarChartHorizontal,
  galleryExamples:
    'vis bar\ndata\n  - category Python\n    value 28.1\n  - category JavaScript\n    value 18.5\n  - category Java\n    value 15.6\n  - category "C/C++"\n    value 12.3\n  - category TypeScript\n    value 8.2\n  - category Go\n    value 5.7\n  - category Rust\n    value 3.8\n  - category Kotlin\n    value 2.9\ntitle "2024 Global Programming Language Popularity"\naxisXTitle "Popularity Index"\naxisYTitle "Programming Language"',
  description:
    'A bar chart is a statistical chart that uses horizontal rectangular bars to compare numerical values across different categories. Unlike column charts, bar chart bars are arranged from left to right rather than from bottom to top. A bar chart also requires a categorical variable and a numerical variable. In a bar chart, each entity of the categorical variable is represented as a horizontal rectangular bar, and the numerical value determines the length of the bar.',
  knowledge: {
    introduction:
      'A bar chart is a statistical chart that uses horizontal rectangular bars to compare numerical values across different categories. Unlike column charts, bar chart bars are arranged from left to right rather than from bottom to top. A bar chart also requires a categorical variable and a numerical variable. In a bar chart, each entity of the categorical variable is represented as a horizontal rectangular bar, and the numerical value determines the length of the bar.',
    useCases: [
      'Bar charts are suitable for comparing categorical data, especially when category names are long or when there are many categories, as the horizontal arrangement of bar charts makes it easier to display these categories',
      'Additionally, bar charts are better suited for horizontal comparison',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: 'Chart type, required, string type, value must be "bar".',
          },
          {
            property: 'data',
            type: 'required',
            description: 'Chart data, required, array of objects.',
          },
          {
            property: 'data.category',
            type: 'required',
            description: 'Data category name, required, string or numeric type.',
          },
          {
            property: 'data.value',
            type: 'required',
            description: 'Data category value, required, numeric type.',
          },
          {
            property: 'data.group',
            type: 'optional',
            description: 'Data group name, optional, string type.',
          },
          {
            property: 'group',
            type: 'optional',
            description:
              'Whether to enable grouping; grouped bar charts require the group field in data, optional, boolean type.',
          },
          {
            property: 'stack',
            type: 'optional',
            description:
              'Whether to enable stacking; stacked bar charts require the group field in data, optional, boolean type.',
          },
          {
            property: 'title',
            type: 'optional',
            description: 'Chart title, optional, string type.',
          },
          {
            property: 'axisXTitle',
            type: 'optional',
            description: 'X-axis title, optional, string type.',
          },
          {
            property: 'axisYTitle',
            type: 'optional',
            description: 'Y-axis title, optional, string type.',
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
              'Color palette, optional, array type, value is an array of valid color values.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '2024 Global Programming Language Popularity',
      description: '2024 Global Programming Language Popularity',
      code: 'vis bar\ndata\n  - category Python\n    value 28.1\n  - category JavaScript\n    value 18.5\n  - category Java\n    value 15.6\n  - category "C/C++"\n    value 12.3\n  - category TypeScript\n    value 8.2\n  - category Go\n    value 5.7\n  - category Rust\n    value 3.8\n  - category Kotlin\n    value 2.9\ntitle "2024 Global Programming Language Popularity"\naxisXTitle "Popularity Index"\naxisYTitle "Programming Language"',
    },
    {
      title: 'Five Industries Quarterly Revenue Comparison, Custom Colors',
      description: 'Five Industries Quarterly Revenue Comparison',
      code: 'vis bar\ndata\n  - category Technology\n    value 320\n    group Q1\n  - category Technology\n    value 380\n    group Q2\n  - category Technology\n    value 420\n    group Q3\n  - category Technology\n    value 490\n    group Q4\n  - category Finance\n    value 280\n    group Q1\n  - category Finance\n    value 310\n    group Q2\n  - category Finance\n    value 350\n    group Q3\n  - category Finance\n    value 370\n    group Q4\n  - category Healthcare\n    value 200\n    group Q1\n  - category Healthcare\n    value 230\n    group Q2\n  - category Healthcare\n    value 260\n    group Q3\n  - category Healthcare\n    value 290\n    group Q4\n  - category Education\n    value 150\n    group Q1\n  - category Education\n    value 170\n    group Q2\n  - category Education\n    value 190\n    group Q3\n  - category Education\n    value 210\n    group Q4\n  - category Energy\n    value 250\n    group Q1\n  - category Energy\n    value 240\n    group Q2\n  - category Energy\n    value 260\n    group Q3\n  - category Energy\n    value 280\n    group Q4\ngroup true\ntitle "Five Industries Quarterly Revenue Comparison"\naxisXTitle "Revenue (100M CNY)"\naxisYTitle Industry\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Regional Product Line Sales, Custom Palette',
      description: 'Regional Product Line Sales',
      code: 'vis bar\ndata\n  - category "East China"\n    value 450\n    group Electronics\n  - category "East China"\n    value 320\n    group Clothing\n  - category "East China"\n    value 280\n    group Food\n  - category "East China"\n    value 180\n    group Home\n  - category "East China"\n    value 120\n    group Sports\n  - category "South China"\n    value 380\n    group Electronics\n  - category "South China"\n    value 290\n    group Clothing\n  - category "South China"\n    value 350\n    group Food\n  - category "South China"\n    value 150\n    group Home\n  - category "South China"\n    value 200\n    group Sports\n  - category "North China"\n    value 420\n    group Electronics\n  - category "North China"\n    value 250\n    group Clothing\n  - category "North China"\n    value 300\n    group Food\n  - category "North China"\n    value 200\n    group Home\n  - category "North China"\n    value 160\n    group Sports\nstack true\ntitle "Regional Product Line Sales"\naxisXTitle "Sales (10k CNY)"\naxisYTitle Region\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
