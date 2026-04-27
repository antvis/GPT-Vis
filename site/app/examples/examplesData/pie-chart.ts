import { PieChart } from 'lucide-react';

export const pieChartData = {
  id: 'pie-chart',
  name: 'Pie Chart',
  icon: PieChart,
  galleryExamples:
    'vis pie\ndata\n  - category Android\n    value 72\n  - category iOS\n    value 27\n  - category Others\n    value 1\ntitle "Mobile OS Market Share"',
  description:
    'A pie chart is a circular statistical chart divided into several sectors. In a pie chart, the arc length (as well as the central angle and area) of each sector represents the proportion of that category to the whole, and these sectors together form a complete circle. The most prominent function of a pie chart is to show proportions. Conventionally, people also use pie charts to compare the sizes of sectors to gain an understanding of the data. However, since humans are less perceptive of angles than lengths, pie charts are often inadequate when exact values need to be expressed (especially when values are close or numerous); bar charts are recommended instead. In terms of data, a pie chart generally requires one categorical data field and one continuous data field. It is worth noting that the data in the categorical field should, in the context of the chart, constitute a whole (e.g., Product A, Product B, and Product C make up the entire product line), rather than being independent and unrelated.',
  knowledge: {
    introduction:
      'A pie chart is a circular statistical chart divided into several sectors. In a pie chart, the arc length (as well as the central angle and area) of each sector represents the proportion of that category to the whole, and these sectors together form a complete circle. The most prominent function of a pie chart is to show proportions. Conventionally, people also use pie charts to compare the sizes of sectors to gain an understanding of the data. However, since humans are less perceptive of angles than lengths, pie charts are often inadequate when exact values need to be expressed (especially when values are close or numerous); bar charts are recommended instead. In terms of data, a pie chart generally requires one categorical data field and one continuous data field. It is worth noting that the data in the categorical field should, in the context of the chart, constitute a whole (e.g., Product A, Product B, and Product C make up the entire product line), rather than being independent and unrelated.',
    useCases: [
      'Used to show the proportion of components, such as market share, budget allocation, etc.',
      'To highlight the proportion of a specific part within the whole',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "pie".',
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
            description: 'Data value. Percentage values cannot be used.',
          },
          {
            property: 'innerRadius',
            type: 'optional',
            valueType: 'number',
            description: 'Set to 0.6 to enable donut chart mode.',
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
      title: '2024 Global Mobile OS Market Share',
      description: '2024 Global Mobile OS Market Share',
      code: 'vis pie\ndata\n  - category Android\n    value 71.8\n  - category iOS\n    value 27.2\n  - category HarmonyOS\n    value 0.6\n  - category Others\n    value 0.4\ntitle "2024 Global Mobile OS Market Share"',
    },
    {
      title: 'Enterprise IT Budget Allocation (Donut Chart, Custom Colors)',
      description: 'Enterprise IT Budget Allocation (Donut Chart)',
      code: 'vis pie\ndata\n  - category "Cloud Services"\n    value 35\n  - category Cybersecurity\n    value 22\n  - category "Software Licenses"\n    value 20\n  - category "Hardware Maintenance"\n    value 15\n  - category "Tech Support"\n    value 8\ninnerRadius 0.6\ntitle "Enterprise IT Budget Allocation"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Global Energy Consumption Structure, Custom Palette',
      description: 'Global Energy Consumption Structure',
      code: 'vis pie\ndata\n  - category Oil\n    value 31\n  - category "Natural Gas"\n    value 24\n  - category Coal\n    value 27\n  - category Nuclear\n    value 4\n  - category Hydro\n    value 7\n  - category Wind\n    value 4\n  - category Solar\n    value 3\ntitle "Global Energy Consumption Structure"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n    - "#8B9A46"\n    - "#CB997E"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
