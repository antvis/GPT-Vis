import { AreaChart } from 'lucide-react';

export const areaChartData = {
  id: 'area-chart',
  name: 'Area Chart',
  icon: AreaChart,
  galleryExamples:
    'vis area\ndata\n  - time 2018\n    value 201\n  - time 2019\n    value 221\n  - time 2020\n    value 307\n  - time 2021\n    value 460\n  - time 2022\n    value 620\n  - time 2023\n    value 830\n  - time 2024\n    value 1080\ntitle "Global Electric Vehicle Sales Trend"\naxisXTitle Year\naxisYTitle "Sales (10K Units)"',
  description:
    'An area chart is a statistical chart that reflects numerical changes as an ordered variable changes, similar in principle to a line chart. The distinctive feature of an area chart is that the area between the line and the independent variable axis is filled with color.',
  knowledge: {
    introduction:
      'An area chart is a statistical chart that reflects numerical changes as an ordered variable changes, similar in principle to a line chart. The distinctive feature of an area chart is that the area between the line and the independent variable axis is filled with color.',
    useCases: [
      'To show trend changes in data under a continuous independent variable while also observing changes in total data volume',
      'For example, displacement = velocity × time: s = v × t. If the x-axis is time t and the y-axis is velocity v at each moment, using an area chart allows you not only to observe the trend of velocity over time but also to perceive the change in displacement distance based on the size of the area',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "area".',
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
            description: 'Group name. Required when stacking is enabled.',
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
          {
            property: 'style.lineWidth',
            type: 'optional',
            valueType: 'number',
            description: 'Stroke width, value must be greater than or equal to 0.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Global Electric Vehicle Sales Trend',
      description: 'Global Electric Vehicle Sales Trend',
      code: 'vis area\ndata\n  - time 2018\n    value 201\n  - time 2019\n    value 221\n  - time 2020\n    value 307\n  - time 2021\n    value 460\n  - time 2022\n    value 620\n  - time 2023\n    value 830\n  - time 2024\n    value 1080\ntitle "Global Electric Vehicle Sales Trend"\naxisXTitle Year\naxisYTitle "Sales (10K Units)"',
    },
    {
      title: 'China Power Structure Change Trend, Custom Colors',
      description: 'China Power Structure Change Trend',
      code: 'vis area\ndata\n  - time 2018\n    value 3800\n    group Thermal\n  - time 2019\n    value 3750\n    group Thermal\n  - time 2020\n    value 3650\n    group Thermal\n  - time 2021\n    value 3600\n    group Thermal\n  - time 2022\n    value 3550\n    group Thermal\n  - time 2023\n    value 3480\n    group Thermal\n  - time 2024\n    value 3400\n    group Thermal\n  - time 2018\n    value 1200\n    group Hydro\n  - time 2019\n    value 1250\n    group Hydro\n  - time 2020\n    value 1300\n    group Hydro\n  - time 2021\n    value 1350\n    group Hydro\n  - time 2022\n    value 1380\n    group Hydro\n  - time 2023\n    value 1420\n    group Hydro\n  - time 2024\n    value 1450\n    group Hydro\n  - time 2018\n    value 500\n    group Nuclear\n  - time 2019\n    value 550\n    group Nuclear\n  - time 2020\n    value 600\n    group Nuclear\n  - time 2021\n    value 650\n    group Nuclear\n  - time 2022\n    value 700\n    group Nuclear\n  - time 2023\n    value 750\n    group Nuclear\n  - time 2024\n    value 800\n    group Nuclear\nstack true\ntitle "China Power Structure Change Trend"\naxisXTitle Year\naxisYTitle "Power Generation (TWh)"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Global Cloud Computing Market Size Trend, Custom Palette',
      description: 'Global Cloud Computing Market Size Trend',
      code: 'vis area\ndata\n  - time 2019\n    value 350\n    group IaaS\n  - time 2020\n    value 480\n    group IaaS\n  - time 2021\n    value 650\n    group IaaS\n  - time 2022\n    value 830\n    group IaaS\n  - time 2023\n    value 1050\n    group IaaS\n  - time 2024\n    value 1320\n    group IaaS\n  - time 2019\n    value 520\n    group SaaS\n  - time 2020\n    value 680\n    group SaaS\n  - time 2021\n    value 870\n    group SaaS\n  - time 2022\n    value 1100\n    group SaaS\n  - time 2023\n    value 1380\n    group SaaS\n  - time 2024\n    value 1700\n    group SaaS\n  - time 2019\n    value 180\n    group PaaS\n  - time 2020\n    value 250\n    group PaaS\n  - time 2021\n    value 340\n    group PaaS\n  - time 2022\n    value 440\n    group PaaS\n  - time 2023\n    value 560\n    group PaaS\n  - time 2024\n    value 700\n    group PaaS\ntitle "Global Cloud Computing Market Size Trend"\naxisXTitle Year\naxisYTitle "Market Size (100M USD)"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
