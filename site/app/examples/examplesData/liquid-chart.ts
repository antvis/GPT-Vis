import { Droplets } from 'lucide-react';

export const liquidChartData = {
  id: 'liquid-chart',
  name: 'Liquid Chart',
  icon: Droplets,
  galleryDsl: 'vis liquid\npercent 0.72\nshape circle\ntitle "Server CPU Usage"',
  galleryJson: { type: 'liquid', percent: 0.72, shape: 'circle', title: 'Server CPU Usage' },
  description:
    'A liquid chart is a visualization that uses a liquid fill effect to represent a numerical proportion. Typically using a circular container as the carrier, it intuitively displays the current progress or proportion of a metric through the liquid level height and wave animation. The liquid height represents the percentage value, and the wave effect enhances visual appeal. It is well-suited for displaying the completion or status of a single metric.',
  knowledge: {
    introduction:
      'A liquid chart is a visualization that uses a liquid fill effect to represent a numerical proportion. Typically using a circular container as the carrier, it intuitively displays the current progress or proportion of a metric through the liquid level height and wave animation. The liquid height represents the percentage value, and the wave effect enhances visual appeal. It is well-suited for displaying the completion or status of a single metric.',
    useCases: [
      'Used to display the progress or proportion of a metric, such as task completion, resource usage, KPI achievement rate, etc.',
      'Suitable for highlighting the current status of a single value',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "liquid".',
          },
          {
            property: 'percent',
            type: 'required',
            valueType: 'number',
            description: 'Fill percentage, range 0~1.',
          },
          {
            property: 'shape',
            type: 'optional',
            valueType: "'rect' | 'circle' | 'pin' | 'triangle'",
            description: 'Chart shape, default is "circle".',
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
      title: 'Server CPU Usage at 72%, Circle Liquid Chart',
      description: 'Server CPU Usage at 72%, Circle Liquid Chart',
      json: { type: 'liquid', percent: 0.72, shape: 'circle', title: 'Server CPU Usage' },
      dsl: 'vis liquid\npercent 0.72\nshape circle\ntitle "Server CPU Usage"',
    },
    {
      title: 'Project Completion Progress 88%, Pin Shape, Custom Colors',
      description: 'Project Completion Progress 88%, Pin Shape',
      json: {
        type: 'liquid',
        percent: 0.88,
        shape: 'pin',
        title: 'Project Completion Progress',
        style: { palette: ['#A855F7', '#38BDF8'], backgroundColor: '#f8f7ff' },
      },
      dsl: 'vis liquid\npercent 0.88\nshape pin\ntitle "Project Completion Progress"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'System Availability 99.9%, Rectangle Liquid Chart, Custom Palette',
      description: 'System Availability 99.9%, Rectangle Liquid Chart',
      json: {
        type: 'liquid',
        percent: 0.999,
        shape: 'rect',
        title: 'System Availability',
        theme: 'academy',
        style: { palette: ['#C45B42', '#D4A373'], backgroundColor: '#FBF8F4' },
      },
      dsl: 'vis liquid\npercent 0.999\nshape rect\ntitle "System Availability"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
