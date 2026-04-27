import { LineChart } from 'lucide-react';

export const lineChartData = {
  id: 'line-chart',
  name: 'Line Chart',
  icon: LineChart,
  galleryExamples:
    'vis line\ndata\n  - time 2015\n    value 0.87\n  - time 2016\n    value 0.99\n  - time 2017\n    value 0.91\n  - time 2018\n    value 0.83\n  - time 2019\n    value 0.98\n  - time 2020\n    value 1.02\n  - time 2021\n    value 0.85\n  - time 2022\n    value 0.89\n  - time 2023\n    value 1.17\n  - time 2024\n    value 1.29\ntitle "Global Average Temperature Anomaly"\naxisXTitle Year\naxisYTitle "Temperature Anomaly (°C)"',
  description:
    'A line chart is a statistical chart composed of points and lines in a Cartesian coordinate system, commonly used to represent changes in values over continuous time intervals or ordered categories. In a line chart, the x-axis is typically used for continuous time intervals or ordered categories, while the y-axis is used for quantitative data — negative values are plotted below the x-axis. Lines connect adjacent data points. Line charts are used to analyze trends of things changing over time or ordered categories. Data-wise, a line chart requires a continuous time field or a categorical field and at least one continuous data field.',
  knowledge: {
    introduction:
      'A line chart is a statistical chart composed of points and lines in a Cartesian coordinate system, commonly used to represent changes in values over continuous time intervals or ordered categories. In a line chart, the x-axis is typically used for continuous time intervals or ordered categories, while the y-axis is used for quantitative data — negative values are plotted below the x-axis. Lines connect adjacent data points. Line charts are used to analyze trends of things changing over time or ordered categories. Data-wise, a line chart requires a continuous time field or a categorical field and at least one continuous data field.',
    useCases: [
      'Changes in the same variable over time or ordered categories, such as the trend of Apple computer sales as a proportion of Apple profit from 2000 to 2016',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "line".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: 'Chart data.',
          },
          {
            property: 'data.time',
            type: 'required',
            valueType: 'string | number',
            description: 'Time series name.',
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
            description: 'Group name.',
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
          {
            property: 'style.lineWidth',
            type: 'optional',
            valueType: 'number',
            description: 'Value must be greater than 0.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Global Average Temperature Anomaly',
      description: 'Global Average Temperature Anomaly',
      code: 'vis line\ndata\n  - time 2015\n    value 0.87\n  - time 2016\n    value 0.99\n  - time 2017\n    value 0.91\n  - time 2018\n    value 0.83\n  - time 2019\n    value 0.98\n  - time 2020\n    value 1.02\n  - time 2021\n    value 0.85\n  - time 2022\n    value 0.89\n  - time 2023\n    value 1.17\n  - time 2024\n    value 1.29\ntitle "Global Average Temperature Anomaly"\naxisXTitle Year\naxisYTitle "Temperature Anomaly (°C)"',
    },
    {
      title: 'Monthly Average Temperature Comparison of Four Cities, Custom Colors',
      description: 'Monthly Average Temperature Comparison of Four Cities',
      code: 'vis line\ndata\n  - time Jan\n    value 2\n    group Beijing\n  - time Feb\n    value 5\n    group Beijing\n  - time Mar\n    value 12\n    group Beijing\n  - time Apr\n    value 20\n    group Beijing\n  - time May\n    value 26\n    group Beijing\n  - time Jun\n    value 30\n    group Beijing\n  - time Jul\n    value 31\n    group Beijing\n  - time Aug\n    value 30\n    group Beijing\n  - time Sep\n    value 25\n    group Beijing\n  - time Oct\n    value 18\n    group Beijing\n  - time Nov\n    value 9\n    group Beijing\n  - time Dec\n    value 3\n    group Beijing\n  - time Jan\n    value 8\n    group Shanghai\n  - time Feb\n    value 9\n    group Shanghai\n  - time Mar\n    value 13\n    group Shanghai\n  - time Apr\n    value 18\n    group Shanghai\n  - time May\n    value 23\n    group Shanghai\n  - time Jun\n    value 27\n    group Shanghai\n  - time Jul\n    value 32\n    group Shanghai\n  - time Aug\n    value 32\n    group Shanghai\n  - time Sep\n    value 27\n    group Shanghai\n  - time Oct\n    value 22\n    group Shanghai\n  - time Nov\n    value 16\n    group Shanghai\n  - time Dec\n    value 10\n    group Shanghai\n  - time Jan\n    value 15\n    group Guangzhou\n  - time Feb\n    value 16\n    group Guangzhou\n  - time Mar\n    value 19\n    group Guangzhou\n  - time Apr\n    value 23\n    group Guangzhou\n  - time May\n    value 27\n    group Guangzhou\n  - time Jun\n    value 29\n    group Guangzhou\n  - time Jul\n    value 30\n    group Guangzhou\n  - time Aug\n    value 30\n    group Guangzhou\n  - time Sep\n    value 28\n    group Guangzhou\n  - time Oct\n    value 25\n    group Guangzhou\n  - time Nov\n    value 21\n    group Guangzhou\n  - time Dec\n    value 17\n    group Guangzhou\n  - time Jan\n    value -4\n    group Harbin\n  - time Feb\n    value 0\n    group Harbin\n  - time Mar\n    value 8\n    group Harbin\n  - time Apr\n    value 16\n    group Harbin\n  - time May\n    value 22\n    group Harbin\n  - time Jun\n    value 27\n    group Harbin\n  - time Jul\n    value 29\n    group Harbin\n  - time Aug\n    value 27\n    group Harbin\n  - time Sep\n    value 20\n    group Harbin\n  - time Oct\n    value 11\n    group Harbin\n  - time Nov\n    value 1\n    group Harbin\n  - time Dec\n    value -6\n    group Harbin\ntitle "Monthly Average Temperature Comparison of Four Cities"\naxisXTitle Month\naxisYTitle "Temperature (°C)"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Global Renewable Energy Installed Capacity Trend, Custom Palette',
      description: 'Global Renewable Energy Installed Capacity Trend',
      code: 'vis line\ndata\n  - time 2018\n    value 480\n    group "Wind Power"\n  - time 2019\n    value 540\n    group "Wind Power"\n  - time 2020\n    value 620\n    group "Wind Power"\n  - time 2021\n    value 730\n    group "Wind Power"\n  - time 2022\n    value 840\n    group "Wind Power"\n  - time 2023\n    value 960\n    group "Wind Power"\n  - time 2024\n    value 1100\n    group "Wind Power"\n  - time 2018\n    value 400\n    group "Solar PV"\n  - time 2019\n    value 500\n    group "Solar PV"\n  - time 2020\n    value 650\n    group "Solar PV"\n  - time 2021\n    value 850\n    group "Solar PV"\n  - time 2022\n    value 1050\n    group "Solar PV"\n  - time 2023\n    value 1300\n    group "Solar PV"\n  - time 2024\n    value 1600\n    group "Solar PV"\n  - time 2018\n    value 180\n    group Biomass\n  - time 2019\n    value 200\n    group Biomass\n  - time 2020\n    value 220\n    group Biomass\n  - time 2021\n    value 245\n    group Biomass\n  - time 2022\n    value 270\n    group Biomass\n  - time 2023\n    value 300\n    group Biomass\n  - time 2024\n    value 330\n    group Biomass\ntitle "Global Renewable Energy Installed Capacity Trend"\naxisXTitle Year\naxisYTitle "Installed Capacity (GW)"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"\n  lineWidth 3',
    },
  ],
};
