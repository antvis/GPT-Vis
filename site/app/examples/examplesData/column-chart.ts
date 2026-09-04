export const columnChartData = {
  id: 'column-chart',
  name: 'Column Chart',
  galleryDsl:
    'vis column\ndata\n  - category Jan\n    value 820\n  - category Feb\n    value 650\n  - category Mar\n    value 780\n  - category Apr\n    value 860\n  - category May\n    value 920\n  - category Jun\n    value 1350\n  - category Jul\n    value 890\n  - category Aug\n    value 850\n  - category Sep\n    value 960\n  - category Oct\n    value 1100\n  - category Nov\n    value 2180\n  - category Dec\n    value 1250\ntitle "E-commerce Monthly GMV"\naxisXTitle Month\naxisYTitle "GMV (100M)"',
  galleryJson: {
    type: 'column',
    data: [
      { category: 'Jan', value: 820 },
      { category: 'Feb', value: 650 },
      { category: 'Mar', value: 780 },
      { category: 'Apr', value: 860 },
      { category: 'May', value: 920 },
      { category: 'Jun', value: 1350 },
      { category: 'Jul', value: 890 },
      { category: 'Aug', value: 850 },
      { category: 'Sep', value: 960 },
      { category: 'Oct', value: 1100 },
      { category: 'Nov', value: 2180 },
      { category: 'Dec', value: 1250 },
    ],
    title: 'E-commerce Monthly GMV',
    axisXTitle: 'Month',
    axisYTitle: 'GMV (100M)',
  },
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
      json: {
        type: 'column',
        data: [
          { category: 'Jan', value: 820 },
          { category: 'Feb', value: 650 },
          { category: 'Mar', value: 780 },
          { category: 'Apr', value: 860 },
          { category: 'May', value: 920 },
          { category: 'Jun', value: 1350 },
          { category: 'Jul', value: 890 },
          { category: 'Aug', value: 850 },
          { category: 'Sep', value: 960 },
          { category: 'Oct', value: 1100 },
          { category: 'Nov', value: 2180 },
          { category: 'Dec', value: 1250 },
        ],
        title: 'E-commerce Monthly GMV',
        axisXTitle: 'Month',
        axisYTitle: 'GMV (100M)',
      },
      dsl: 'vis column\ndata\n  - category Jan\n    value 820\n  - category Feb\n    value 650\n  - category Mar\n    value 780\n  - category Apr\n    value 860\n  - category May\n    value 920\n  - category Jun\n    value 1350\n  - category Jul\n    value 890\n  - category Aug\n    value 850\n  - category Sep\n    value 960\n  - category Oct\n    value 1100\n  - category Nov\n    value 2180\n  - category Dec\n    value 1250\ntitle "E-commerce Monthly GMV"\naxisXTitle Month\naxisYTitle "GMV (100M)"',
    },
    {
      title: 'Six-Country GDP Growth Comparison, Custom Colors',
      description: 'Six-Country GDP Growth Comparison',
      json: {
        type: 'column',
        data: [
          { category: 'China', value: 5.2, group: 2023 },
          { category: 'China', value: 5, group: 2024 },
          { category: 'USA', value: 2.5, group: 2023 },
          { category: 'USA', value: 2.8, group: 2024 },
          { category: 'Japan', value: 1.9, group: 2023 },
          { category: 'Japan', value: 1.2, group: 2024 },
          { category: 'Germany', value: -0.3, group: 2023 },
          { category: 'Germany', value: 0.4, group: 2024 },
          { category: 'India', value: 7.2, group: 2023 },
          { category: 'India', value: 6.8, group: 2024 },
          { category: 'South Korea', value: 1.4, group: 2023 },
          { category: 'South Korea', value: 2.2, group: 2024 },
        ],
        group: true,
        title: 'Six-Country GDP Growth Comparison',
        axisXTitle: 'Country',
        axisYTitle: 'GDP Growth (%)',
        style: { palette: ['#A855F7', '#38BDF8'], backgroundColor: '#f8f7ff' },
      },
      dsl: 'vis column\ndata\n  - category China\n    value 5.2\n    group 2023\n  - category China\n    value 5.0\n    group 2024\n  - category USA\n    value 2.5\n    group 2023\n  - category USA\n    value 2.8\n    group 2024\n  - category Japan\n    value 1.9\n    group 2023\n  - category Japan\n    value 1.2\n    group 2024\n  - category Germany\n    value -0.3\n    group 2023\n  - category Germany\n    value 0.4\n    group 2024\n  - category India\n    value 7.2\n    group 2023\n  - category India\n    value 6.8\n    group 2024\n  - category "South Korea"\n    value 1.4\n    group 2023\n  - category "South Korea"\n    value 2.2\n    group 2024\ngroup true\ntitle "Six-Country GDP Growth Comparison"\naxisXTitle Country\naxisYTitle "GDP Growth (%)"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Quarterly Expenditure by Department, Custom Palette',
      description: 'Quarterly Expenditure by Department',
      json: {
        type: 'column',
        data: [
          { category: 'R&D', value: 380, group: 'Q1' },
          { category: 'R&D', value: 420, group: 'Q2' },
          { category: 'R&D', value: 450, group: 'Q3' },
          { category: 'R&D', value: 500, group: 'Q4' },
          { category: 'Marketing', value: 250, group: 'Q1' },
          { category: 'Marketing', value: 300, group: 'Q2' },
          { category: 'Marketing', value: 280, group: 'Q3' },
          { category: 'Marketing', value: 350, group: 'Q4' },
          { category: 'Operations', value: 200, group: 'Q1' },
          { category: 'Operations', value: 220, group: 'Q2' },
          { category: 'Operations', value: 240, group: 'Q3' },
          { category: 'Operations', value: 260, group: 'Q4' },
          { category: 'HR', value: 180, group: 'Q1' },
          { category: 'HR', value: 190, group: 'Q2' },
          { category: 'HR', value: 200, group: 'Q3' },
          { category: 'HR', value: 210, group: 'Q4' },
        ],
        stack: true,
        title: 'Quarterly Expenditure by Department',
        axisXTitle: 'Department',
        axisYTitle: 'Expenditure (10K CNY)',
        theme: 'academy',
        style: {
          palette: ['#C45B42', '#7D8C6E', '#D4A373', '#E9C46A'],
          backgroundColor: '#FBF8F4',
        },
      },
      dsl: 'vis column\ndata\n  - category R&D\n    value 380\n    group Q1\n  - category R&D\n    value 420\n    group Q2\n  - category R&D\n    value 450\n    group Q3\n  - category R&D\n    value 500\n    group Q4\n  - category Marketing\n    value 250\n    group Q1\n  - category Marketing\n    value 300\n    group Q2\n  - category Marketing\n    value 280\n    group Q3\n  - category Marketing\n    value 350\n    group Q4\n  - category Operations\n    value 200\n    group Q1\n  - category Operations\n    value 220\n    group Q2\n  - category Operations\n    value 240\n    group Q3\n  - category Operations\n    value 260\n    group Q4\n  - category HR\n    value 180\n    group Q1\n  - category HR\n    value 190\n    group Q2\n  - category HR\n    value 200\n    group Q3\n  - category HR\n    value 210\n    group Q4\nstack true\ntitle "Quarterly Expenditure by Department"\naxisXTitle Department\naxisYTitle "Expenditure (10K CNY)"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n  backgroundColor "#FBF8F4"',
    },
    {
      title: 'Revenue by Detailed Product Category (Automatic Label Layout)',
      description:
        'Long and dense category labels are rotated automatically; hover a column to highlight its category.',
      json: {
        type: 'column',
        data: [
          { category: 'Consumer Electronics', value: 186 },
          { category: 'Home and Kitchen', value: 142 },
          { category: 'Beauty and Personal Care', value: 128 },
          { category: 'Sports and Outdoors', value: 116 },
          { category: 'Books and Learning', value: 94 },
          { category: 'Pet Supplies', value: 83 },
          { category: 'Automotive Accessories', value: 76 },
          { category: 'Office Equipment', value: 68 },
        ],
        title: 'Revenue by Detailed Product Category',
        axisXTitle: 'Product Category',
        axisYTitle: 'Revenue (10K USD)',
      },
      dsl: `vis column
data
  - category "Consumer Electronics"
    value 186
  - category "Home and Kitchen"
    value 142
  - category "Beauty and Personal Care"
    value 128
  - category "Sports and Outdoors"
    value 116
  - category "Books and Learning"
    value 94
  - category "Pet Supplies"
    value 83
  - category "Automotive Accessories"
    value 76
  - category "Office Equipment"
    value 68
title "Revenue by Detailed Product Category"
axisXTitle "Product Category"
axisYTitle "Revenue (10K USD)"`,
    },
  ],
};
