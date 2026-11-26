export const dualAxesData = {
  id: 'dual-axes',
  name: 'Dual Axes Chart',
  galleryDsl:
    'vis dual-axes\ncategories\n  - Jan\n  - Feb\n  - Mar\n  - Apr\n  - May\n  - Jun\n  - Jul\n  - Aug\n  - Sep\n  - Oct\n  - Nov\n  - Dec\nseries\n  - type column\n    axisYTitle "Sales (10K)"\n    data\n      - 820\n      - 650\n      - 780\n      - 860\n      - 920\n      - 1350\n      - 890\n      - 850\n      - 960\n      - 1100\n      - 2180\n      - 1250\n  - type line\n    axisYTitle "Profit (%)"\n    data\n      - 12\n      - 10\n      - 13\n      - 14\n      - 15\n      - 18\n      - 14\n      - 13\n      - 15\n      - 16\n      - 22\n      - 17\ntitle "Monthly Sales & Profit Rate"\naxisXTitle Month',
  galleryJson: {
    type: 'dual-axes',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    series: [
      {
        type: 'column',
        axisYTitle: 'Sales (10K)',
        data: [820, 650, 780, 860, 920, 1350, 890, 850, 960, 1100, 2180, 1250],
      },
      {
        type: 'line',
        axisYTitle: 'Profit (%)',
        data: [12, 10, 13, 14, 15, 18, 14, 13, 15, 16, 22, 17],
      },
    ],
    title: 'Monthly Sales & Profit Rate',
    axisXTitle: 'Month',
  },
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
          {
            property: 'style.startAtZero',
            type: 'optional',
            valueType: 'boolean',
            description: 'Whether the Y-axis starts from zero, default is false.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Column and line on separate axes',
      description: 'Column and line on separate axes',
      json: {
        type: 'dual-axes',
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        series: [
          {
            type: 'column',
            axisYTitle: 'Sales (10K)',
            data: [820, 650, 780, 860, 920, 1350, 890, 850, 960, 1100, 2180, 1250],
          },
          {
            type: 'line',
            axisYTitle: 'Profit (%)',
            data: [12, 10, 13, 14, 15, 18, 14, 13, 15, 16, 22, 17],
          },
        ],
        title: 'Monthly Sales & Profit Rate',
        axisXTitle: 'Month',
      },
      dsl: 'vis dual-axes\ncategories\n  - Jan\n  - Feb\n  - Mar\n  - Apr\n  - May\n  - Jun\n  - Jul\n  - Aug\n  - Sep\n  - Oct\n  - Nov\n  - Dec\nseries\n  - type column\n    axisYTitle "Sales (10K)"\n    data\n      - 820\n      - 650\n      - 780\n      - 860\n      - 920\n      - 1350\n      - 890\n      - 850\n      - 960\n      - 1100\n      - 2180\n      - 1250\n  - type line\n    axisYTitle "Profit (%)"\n    data\n      - 12\n      - 10\n      - 13\n      - 14\n      - 15\n      - 18\n      - 14\n      - 13\n      - 15\n      - 16\n      - 22\n      - 17\ntitle "Monthly Sales & Profit Rate"\naxisXTitle Month',
    },
    {
      title: 'One column series and two line series',
      description: 'One column series and two line series',
      json: {
        type: 'dual-axes',
        categories: [
          '2023Q1',
          '2023Q2',
          '2023Q3',
          '2023Q4',
          '2024Q1',
          '2024Q2',
          '2024Q3',
          '2024Q4',
        ],
        series: [
          {
            type: 'column',
            axisYTitle: 'Revenue (100M CNY)',
            data: [850, 920, 780, 1100, 950, 1020, 880, 1250],
          },
          { type: 'line', axisYTitle: 'Profit (%)', data: [15, 18, 14, 22, 16, 19, 15, 24] },
          { type: 'line', axisYTitle: 'Cost Rate (%)', data: [72, 68, 74, 65, 70, 67, 73, 62] },
        ],
        title: 'Quarterly Revenue & Profit Rate Trends',
        axisXTitle: 'Quarter',
      },
      dsl: 'vis dual-axes\ncategories\n  - 2023Q1\n  - 2023Q2\n  - 2023Q3\n  - 2023Q4\n  - 2024Q1\n  - 2024Q2\n  - 2024Q3\n  - 2024Q4\nseries\n  - type column\n    axisYTitle "Revenue (100M CNY)"\n    data\n      - 850\n      - 920\n      - 780\n      - 1100\n      - 950\n      - 1020\n      - 880\n      - 1250\n  - type line\n    axisYTitle "Profit (%)"\n    data\n      - 15\n      - 18\n      - 14\n      - 22\n      - 16\n      - 19\n      - 15\n      - 24\n  - type line\n    axisYTitle "Cost Rate (%)"\n    data\n      - 72\n      - 68\n      - 74\n      - 65\n      - 70\n      - 67\n      - 73\n      - 62\ntitle "Quarterly Revenue & Profit Rate Trends"\naxisXTitle Quarter',
    },
  ],
};
