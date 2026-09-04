export const lineChartData = {
  id: 'line-chart',
  name: 'Line Chart',
  galleryDsl:
    'vis line\ndata\n  - time 2015\n    value 0.87\n  - time 2016\n    value 0.99\n  - time 2017\n    value 0.91\n  - time 2018\n    value 0.83\n  - time 2019\n    value 0.98\n  - time 2020\n    value 1.02\n  - time 2021\n    value 0.85\n  - time 2022\n    value 0.89\n  - time 2023\n    value 1.17\n  - time 2024\n    value 1.29\ntitle "Temperature Anomaly Trend"\naxisXTitle Year\naxisYTitle "Anomaly (°C)"',
  galleryJson: {
    type: 'line',
    data: [
      { time: 2015, value: 0.87 },
      { time: 2016, value: 0.99 },
      { time: 2017, value: 0.91 },
      { time: 2018, value: 0.83 },
      { time: 2019, value: 0.98 },
      { time: 2020, value: 1.02 },
      { time: 2021, value: 0.85 },
      { time: 2022, value: 0.89 },
      { time: 2023, value: 1.17 },
      { time: 2024, value: 1.29 },
    ],
    title: 'Temperature Anomaly Trend',
    axisXTitle: 'Year',
    axisYTitle: 'Anomaly (°C)',
  },
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
      json: {
        type: 'line',
        data: [
          { time: 2015, value: 0.87 },
          { time: 2016, value: 0.99 },
          { time: 2017, value: 0.91 },
          { time: 2018, value: 0.83 },
          { time: 2019, value: 0.98 },
          { time: 2020, value: 1.02 },
          { time: 2021, value: 0.85 },
          { time: 2022, value: 0.89 },
          { time: 2023, value: 1.17 },
          { time: 2024, value: 1.29 },
        ],
        title: 'Temperature Anomaly Trend',
        axisXTitle: 'Year',
        axisYTitle: 'Anomaly (°C)',
      },
      dsl: 'vis line\ndata\n  - time 2015\n    value 0.87\n  - time 2016\n    value 0.99\n  - time 2017\n    value 0.91\n  - time 2018\n    value 0.83\n  - time 2019\n    value 0.98\n  - time 2020\n    value 1.02\n  - time 2021\n    value 0.85\n  - time 2022\n    value 0.89\n  - time 2023\n    value 1.17\n  - time 2024\n    value 1.29\ntitle "Temperature Anomaly Trend"\naxisXTitle Year\naxisYTitle "Anomaly (°C)"',
    },
    {
      title: 'Monthly Average Temperature Comparison of Four Cities, Custom Colors',
      description: 'Monthly Average Temperature Comparison of Four Cities',
      json: {
        type: 'line',
        data: [
          { time: 'Jan', value: 2, group: 'Beijing' },
          { time: 'Feb', value: 5, group: 'Beijing' },
          { time: 'Mar', value: 12, group: 'Beijing' },
          { time: 'Apr', value: 20, group: 'Beijing' },
          { time: 'May', value: 26, group: 'Beijing' },
          { time: 'Jun', value: 30, group: 'Beijing' },
          { time: 'Jul', value: 31, group: 'Beijing' },
          { time: 'Aug', value: 30, group: 'Beijing' },
          { time: 'Sep', value: 25, group: 'Beijing' },
          { time: 'Oct', value: 18, group: 'Beijing' },
          { time: 'Nov', value: 9, group: 'Beijing' },
          { time: 'Dec', value: 3, group: 'Beijing' },
          { time: 'Jan', value: 8, group: 'Shanghai' },
          { time: 'Feb', value: 9, group: 'Shanghai' },
          { time: 'Mar', value: 13, group: 'Shanghai' },
          { time: 'Apr', value: 18, group: 'Shanghai' },
          { time: 'May', value: 23, group: 'Shanghai' },
          { time: 'Jun', value: 27, group: 'Shanghai' },
          { time: 'Jul', value: 32, group: 'Shanghai' },
          { time: 'Aug', value: 32, group: 'Shanghai' },
          { time: 'Sep', value: 27, group: 'Shanghai' },
          { time: 'Oct', value: 22, group: 'Shanghai' },
          { time: 'Nov', value: 16, group: 'Shanghai' },
          { time: 'Dec', value: 10, group: 'Shanghai' },
          { time: 'Jan', value: 15, group: 'Guangzhou' },
          { time: 'Feb', value: 16, group: 'Guangzhou' },
          { time: 'Mar', value: 19, group: 'Guangzhou' },
          { time: 'Apr', value: 23, group: 'Guangzhou' },
          { time: 'May', value: 27, group: 'Guangzhou' },
          { time: 'Jun', value: 29, group: 'Guangzhou' },
          { time: 'Jul', value: 30, group: 'Guangzhou' },
          { time: 'Aug', value: 30, group: 'Guangzhou' },
          { time: 'Sep', value: 28, group: 'Guangzhou' },
          { time: 'Oct', value: 25, group: 'Guangzhou' },
          { time: 'Nov', value: 21, group: 'Guangzhou' },
          { time: 'Dec', value: 17, group: 'Guangzhou' },
          { time: 'Jan', value: -4, group: 'Harbin' },
          { time: 'Feb', value: 0, group: 'Harbin' },
          { time: 'Mar', value: 8, group: 'Harbin' },
          { time: 'Apr', value: 16, group: 'Harbin' },
          { time: 'May', value: 22, group: 'Harbin' },
          { time: 'Jun', value: 27, group: 'Harbin' },
          { time: 'Jul', value: 29, group: 'Harbin' },
          { time: 'Aug', value: 27, group: 'Harbin' },
          { time: 'Sep', value: 20, group: 'Harbin' },
          { time: 'Oct', value: 11, group: 'Harbin' },
          { time: 'Nov', value: 1, group: 'Harbin' },
          { time: 'Dec', value: -6, group: 'Harbin' },
        ],
        title: 'Monthly Average Temperature Comparison of Four Cities',
        axisXTitle: 'Month',
        axisYTitle: 'Temperature (°C)',
        style: {
          palette: ['#A855F7', '#38BDF8', '#F9A8D4', '#34D399'],
          backgroundColor: '#f8f7ff',
        },
      },
      dsl: 'vis line\ndata\n  - time Jan\n    value 2\n    group Beijing\n  - time Feb\n    value 5\n    group Beijing\n  - time Mar\n    value 12\n    group Beijing\n  - time Apr\n    value 20\n    group Beijing\n  - time May\n    value 26\n    group Beijing\n  - time Jun\n    value 30\n    group Beijing\n  - time Jul\n    value 31\n    group Beijing\n  - time Aug\n    value 30\n    group Beijing\n  - time Sep\n    value 25\n    group Beijing\n  - time Oct\n    value 18\n    group Beijing\n  - time Nov\n    value 9\n    group Beijing\n  - time Dec\n    value 3\n    group Beijing\n  - time Jan\n    value 8\n    group Shanghai\n  - time Feb\n    value 9\n    group Shanghai\n  - time Mar\n    value 13\n    group Shanghai\n  - time Apr\n    value 18\n    group Shanghai\n  - time May\n    value 23\n    group Shanghai\n  - time Jun\n    value 27\n    group Shanghai\n  - time Jul\n    value 32\n    group Shanghai\n  - time Aug\n    value 32\n    group Shanghai\n  - time Sep\n    value 27\n    group Shanghai\n  - time Oct\n    value 22\n    group Shanghai\n  - time Nov\n    value 16\n    group Shanghai\n  - time Dec\n    value 10\n    group Shanghai\n  - time Jan\n    value 15\n    group Guangzhou\n  - time Feb\n    value 16\n    group Guangzhou\n  - time Mar\n    value 19\n    group Guangzhou\n  - time Apr\n    value 23\n    group Guangzhou\n  - time May\n    value 27\n    group Guangzhou\n  - time Jun\n    value 29\n    group Guangzhou\n  - time Jul\n    value 30\n    group Guangzhou\n  - time Aug\n    value 30\n    group Guangzhou\n  - time Sep\n    value 28\n    group Guangzhou\n  - time Oct\n    value 25\n    group Guangzhou\n  - time Nov\n    value 21\n    group Guangzhou\n  - time Dec\n    value 17\n    group Guangzhou\n  - time Jan\n    value -4\n    group Harbin\n  - time Feb\n    value 0\n    group Harbin\n  - time Mar\n    value 8\n    group Harbin\n  - time Apr\n    value 16\n    group Harbin\n  - time May\n    value 22\n    group Harbin\n  - time Jun\n    value 27\n    group Harbin\n  - time Jul\n    value 29\n    group Harbin\n  - time Aug\n    value 27\n    group Harbin\n  - time Sep\n    value 20\n    group Harbin\n  - time Oct\n    value 11\n    group Harbin\n  - time Nov\n    value 1\n    group Harbin\n  - time Dec\n    value -6\n    group Harbin\ntitle "Monthly Average Temperature Comparison of Four Cities"\naxisXTitle Month\naxisYTitle "Temperature (°C)"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Global Renewable Energy Installed Capacity Trend, Custom Palette',
      description: 'Global Renewable Energy Installed Capacity Trend',
      json: {
        type: 'line',
        data: [
          { time: 2018, value: 480, group: 'Wind Power' },
          { time: 2019, value: 540, group: 'Wind Power' },
          { time: 2020, value: 620, group: 'Wind Power' },
          { time: 2021, value: 730, group: 'Wind Power' },
          { time: 2022, value: 840, group: 'Wind Power' },
          { time: 2023, value: 960, group: 'Wind Power' },
          { time: 2024, value: 1100, group: 'Wind Power' },
          { time: 2018, value: 400, group: 'Solar PV' },
          { time: 2019, value: 500, group: 'Solar PV' },
          { time: 2020, value: 650, group: 'Solar PV' },
          { time: 2021, value: 850, group: 'Solar PV' },
          { time: 2022, value: 1050, group: 'Solar PV' },
          { time: 2023, value: 1300, group: 'Solar PV' },
          { time: 2024, value: 1600, group: 'Solar PV' },
          { time: 2018, value: 180, group: 'Biomass' },
          { time: 2019, value: 200, group: 'Biomass' },
          { time: 2020, value: 220, group: 'Biomass' },
          { time: 2021, value: 245, group: 'Biomass' },
          { time: 2022, value: 270, group: 'Biomass' },
          { time: 2023, value: 300, group: 'Biomass' },
          { time: 2024, value: 330, group: 'Biomass' },
        ],
        title: 'Global Renewable Energy Installed Capacity Trend',
        axisXTitle: 'Year',
        axisYTitle: 'Installed Capacity (GW)',
        theme: 'academy',
        style: {
          palette: ['#C45B42', '#7D8C6E', '#D4A373'],
          backgroundColor: '#FBF8F4',
          lineWidth: 3,
        },
      },
      dsl: 'vis line\ndata\n  - time 2018\n    value 480\n    group "Wind Power"\n  - time 2019\n    value 540\n    group "Wind Power"\n  - time 2020\n    value 620\n    group "Wind Power"\n  - time 2021\n    value 730\n    group "Wind Power"\n  - time 2022\n    value 840\n    group "Wind Power"\n  - time 2023\n    value 960\n    group "Wind Power"\n  - time 2024\n    value 1100\n    group "Wind Power"\n  - time 2018\n    value 400\n    group "Solar PV"\n  - time 2019\n    value 500\n    group "Solar PV"\n  - time 2020\n    value 650\n    group "Solar PV"\n  - time 2021\n    value 850\n    group "Solar PV"\n  - time 2022\n    value 1050\n    group "Solar PV"\n  - time 2023\n    value 1300\n    group "Solar PV"\n  - time 2024\n    value 1600\n    group "Solar PV"\n  - time 2018\n    value 180\n    group Biomass\n  - time 2019\n    value 200\n    group Biomass\n  - time 2020\n    value 220\n    group Biomass\n  - time 2021\n    value 245\n    group Biomass\n  - time 2022\n    value 270\n    group Biomass\n  - time 2023\n    value 300\n    group Biomass\n  - time 2024\n    value 330\n    group Biomass\ntitle "Global Renewable Energy Installed Capacity Trend"\naxisXTitle Year\naxisYTitle "Installed Capacity (GW)"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"\n  lineWidth 3',
    },
    {
      title: 'Monthly Traffic by Channel (Shared Crosshair and Dense Axis)',
      description:
        'Move across the chart to compare both channels at the same month; dense month labels are arranged automatically.',
      json: {
        type: 'line',
        data: [
          { time: '2026-01', value: 42.8, group: 'Organic' },
          { time: '2026-02', value: 45.6, group: 'Organic' },
          { time: '2026-03', value: 48.1, group: 'Organic' },
          { time: '2026-04', value: 51.4, group: 'Organic' },
          { time: '2026-05', value: 54.2, group: 'Organic' },
          { time: '2026-06', value: 58.7, group: 'Organic' },
          { time: '2026-07', value: 61.5, group: 'Organic' },
          { time: '2026-08', value: 64.9, group: 'Organic' },
          { time: '2026-09', value: 68.3, group: 'Organic' },
          { time: '2026-10', value: 72.1, group: 'Organic' },
          { time: '2026-11', value: 75.8, group: 'Organic' },
          { time: '2026-12', value: 79.4, group: 'Organic' },
          { time: '2026-01', value: 31.2, group: 'Paid' },
          { time: '2026-02', value: 34.5, group: 'Paid' },
          { time: '2026-03', value: 39.8, group: 'Paid' },
          { time: '2026-04', value: 43.1, group: 'Paid' },
          { time: '2026-05', value: 47.6, group: 'Paid' },
          { time: '2026-06', value: 52.3, group: 'Paid' },
          { time: '2026-07', value: 49.7, group: 'Paid' },
          { time: '2026-08', value: 55.4, group: 'Paid' },
          { time: '2026-09', value: 59.2, group: 'Paid' },
          { time: '2026-10', value: 63.8, group: 'Paid' },
          { time: '2026-11', value: 67.1, group: 'Paid' },
          { time: '2026-12', value: 70.6, group: 'Paid' },
        ],
        title: 'Monthly Traffic by Channel',
        axisXTitle: 'Month',
        axisYTitle: 'Visits (10K)',
      },
      dsl: `vis line
data
  - time 2026-01
    value 42.8
    group Organic
  - time 2026-02
    value 45.6
    group Organic
  - time 2026-03
    value 48.1
    group Organic
  - time 2026-04
    value 51.4
    group Organic
  - time 2026-05
    value 54.2
    group Organic
  - time 2026-06
    value 58.7
    group Organic
  - time 2026-07
    value 61.5
    group Organic
  - time 2026-08
    value 64.9
    group Organic
  - time 2026-09
    value 68.3
    group Organic
  - time 2026-10
    value 72.1
    group Organic
  - time 2026-11
    value 75.8
    group Organic
  - time 2026-12
    value 79.4
    group Organic
  - time 2026-01
    value 31.2
    group Paid
  - time 2026-02
    value 34.5
    group Paid
  - time 2026-03
    value 39.8
    group Paid
  - time 2026-04
    value 43.1
    group Paid
  - time 2026-05
    value 47.6
    group Paid
  - time 2026-06
    value 52.3
    group Paid
  - time 2026-07
    value 49.7
    group Paid
  - time 2026-08
    value 55.4
    group Paid
  - time 2026-09
    value 59.2
    group Paid
  - time 2026-10
    value 63.8
    group Paid
  - time 2026-11
    value 67.1
    group Paid
  - time 2026-12
    value 70.6
    group Paid
title "Monthly Traffic by Channel"
axisXTitle Month
axisYTitle "Visits (10K)"`,
    },
  ],
};
