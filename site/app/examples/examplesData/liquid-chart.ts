export const liquidChartData = {
  id: 'liquid-chart',
  name: 'Liquid Chart',
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
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Circle shape',
      description: 'Circle shape',
      json: { type: 'liquid', percent: 0.72, shape: 'circle', title: 'Server CPU Usage' },
      dsl: 'vis liquid\npercent 0.72\nshape circle\ntitle "Server CPU Usage"',
    },
    {
      title: 'Pin shape',
      description: 'Pin shape',
      json: {
        type: 'liquid',
        percent: 0.88,
        shape: 'pin',
        title: 'Project Completion Progress',
      },
      dsl: 'vis liquid\npercent 0.88\nshape pin\ntitle "Project Completion Progress"',
    },
    {
      title: 'Rectangle shape',
      description: 'Rectangle shape',
      json: {
        type: 'liquid',
        percent: 0.999,
        shape: 'rect',
        title: 'System Availability',
      },
      dsl: 'vis liquid\npercent 0.999\nshape rect\ntitle "System Availability"',
    },
  ],
};
