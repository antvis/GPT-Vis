import { TrendingUp } from 'lucide-react';

export const dualAxesData = {
  id: 'dual-axes',
  name: 'Dual Axes Chart',
  icon: TrendingUp,
  galleryExamples:
    'vis dual-axes\ncategories\n  - Jan\n  - Feb\n  - Mar\n  - Apr\n  - May\n  - Jun\n  - Jul\n  - Aug\n  - Sep\n  - Oct\n  - Nov\n  - Dec\nseries\n  - type column\n    axisYTitle "Sales (10K CNY)"\n    data\n      - 820\n      - 650\n      - 780\n      - 860\n      - 920\n      - 1350\n      - 890\n      - 850\n      - 960\n      - 1100\n      - 2180\n      - 1250\n  - type line\n    axisYTitle "Profit Rate (%)"\n    data\n      - 12\n      - 10\n      - 13\n      - 14\n      - 15\n      - 18\n      - 14\n      - 13\n      - 15\n      - 16\n      - 22\n      - 17\ntitle "Monthly Sales & Profit Rate"\naxisXTitle Month',
  description:
    'A dual-axes chart is a combination chart that combines two different chart types, typically displaying a column chart and a line chart together. By using two vertical Y-axes (left and right) in one chart, it corresponds to different numerical dimensions. The column chart shows the magnitude or quantity of one set of data, while the line chart shows the trend of another set of data. Dual-axes charts are ideal for simultaneously displaying trends of different types of data.',
  knowledge: {
    introduction:
      'A dual-axes chart is a combination chart that combines two different chart types, typically displaying a column chart and a line chart together. By using two vertical Y-axes (left and right) in one chart, it corresponds to different numerical dimensions. The column chart shows the magnitude or quantity of one set of data, while the line chart shows the trend of another set of data. Dual-axes charts are ideal for simultaneously displaying trends of different types of data.',
    useCases: [
      'Simultaneously display two data series with different magnitudes, such as sales and growth rate.',
      'Compare the relative trend changes of two sets of variables, such as simultaneously observing sales volume and profit rate over a time period.',
      'Data dimensions differ but share a common X-axis (e.g., time, category).',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "dual-axes".',
          },
          {
            property: 'categories',
            type: 'required',
            valueType: 'string[]',
            description: 'X-axis categories.',
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
            property: 'series',
            type: 'required',
            valueType: 'Object[]',
            description: 'Chart composition, each object represents a basic chart.',
          },
          {
            property: 'series.type',
            type: 'required',
            valueType: "'column' | 'line'",
            description: '"column" for column chart, "line" for line chart.',
          },
          {
            property: 'series.data',
            type: 'required',
            valueType: 'number[]',
            description: 'Basic chart data.',
          },
          {
            property: 'series.axisYTitle',
            type: 'optional',
            valueType: 'string',
            description: 'Y-axis title for this series.',
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
      title: 'Show the correlated trend of monthly sales (column) and profit rate (line).',
      description: 'Show the correlated trend of monthly sales (column) and profit rate (line).',
      code: 'vis dual-axes\ncategories\n  - Jan\n  - Feb\n  - Mar\n  - Apr\n  - May\n  - Jun\n  - Jul\n  - Aug\n  - Sep\n  - Oct\n  - Nov\n  - Dec\nseries\n  - type column\n    axisYTitle "Sales (10K CNY)"\n    data\n      - 820\n      - 650\n      - 780\n      - 860\n      - 920\n      - 1350\n      - 890\n      - 850\n      - 960\n      - 1100\n      - 2180\n      - 1250\n  - type line\n    axisYTitle "Profit Rate (%)"\n    data\n      - 12\n      - 10\n      - 13\n      - 14\n      - 15\n      - 18\n      - 14\n      - 13\n      - 15\n      - 16\n      - 22\n      - 17\ntitle "Monthly Sales & Profit Rate"\naxisXTitle Month',
    },
    {
      title: 'Show weekly active users (column) and growth rate (line) trends, with custom colors.',
      description: 'Show weekly active users (column) and growth rate (line) trends.',
      code: 'vis dual-axes\ncategories\n  - W1\n  - W2\n  - W3\n  - W4\n  - W5\n  - W6\n  - W7\n  - W8\n  - W9\n  - W10\n  - W11\n  - W12\nseries\n  - type column\n    axisYTitle "Active Users (10K)"\n    data\n      - 120\n      - 135\n      - 142\n      - 138\n      - 155\n      - 162\n      - 170\n      - 165\n      - 178\n      - 185\n      - 192\n      - 205\n  - type line\n    axisYTitle "Growth Rate (%)"\n    data\n      - 5\n      - 12\n      - 5\n      - -3\n      - 12\n      - 5\n      - 5\n      - -3\n      - 8\n      - 4\n      - 4\n      - 7\ntitle "Weekly Active Users & Growth Rate"\naxisXTitle Week\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title:
        'Show quarterly revenue (column) and profit rate, cost rate (dual lines) trends, with custom colors',
      description: 'Show quarterly revenue (column) and profit rate, cost rate (dual lines) trends',
      code: 'vis dual-axes\ncategories\n  - 2023Q1\n  - 2023Q2\n  - 2023Q3\n  - 2023Q4\n  - 2024Q1\n  - 2024Q2\n  - 2024Q3\n  - 2024Q4\nseries\n  - type column\n    axisYTitle "Revenue (100M CNY)"\n    data\n      - 850\n      - 920\n      - 780\n      - 1100\n      - 950\n      - 1020\n      - 880\n      - 1250\n  - type line\n    axisYTitle "Profit Rate (%)"\n    data\n      - 15\n      - 18\n      - 14\n      - 22\n      - 16\n      - 19\n      - 15\n      - 24\n  - type line\n    axisYTitle "Cost Rate (%)"\n    data\n      - 72\n      - 68\n      - 74\n      - 65\n      - 70\n      - 67\n      - 73\n      - 62\ntitle "Quarterly Revenue & Profit Rate Trends"\naxisXTitle Quarter\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
