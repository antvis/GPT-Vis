export const radarChartData = {
  id: 'radar-chart',
  name: 'Radar Chart',
  galleryDsl:
    'vis radar\ndata\n  - name Performance\n    value 85\n  - name Ecosystem\n    value 92\n  - name "Learning Curve"\n    value 78\n  - name "Community Activity"\n    value 88\n  - name Engineering\n    value 90\ntitle "Frontend Framework Evaluation"',
  galleryJson: {
    type: 'radar',
    data: [
      { name: 'Performance', value: 85 },
      { name: 'Ecosystem', value: 92 },
      { name: 'Learning Curve', value: 78 },
      { name: 'Community Activity', value: 88 },
      { name: 'Engineering', value: 90 },
    ],
    title: 'Frontend Framework Evaluation',
  },
  description:
    'A radar chart is a chart that displays multivariate data. It typically has three or more axes radiating from the same center point at equal angular intervals, with each axis representing a quantitative variable, and the points on each axis connected in sequence to form lines or geometric shapes. Radar charts can be used to compare variables or to check for outliers. Additionally, overall numerical comparisons can be made between multiple radar charts or between multiple data layers within a radar chart.',
  knowledge: {
    introduction:
      'A radar chart is a chart that displays multivariate data. It typically has three or more axes radiating from the same center point at equal angular intervals, with each axis representing a quantitative variable, and the points on each axis connected in sequence to form lines or geometric shapes. Radar charts can be used to compare variables or to check for outliers. Additionally, overall numerical comparisons can be made between multiple radar charts or between multiple data layers within a radar chart.',
    useCases: [
      'A data object composed of multiple feature categories, such as nutritional components of food (sugar, vitamins, minerals, fat, water).',
      'Feature categories are limited and can be normalized or discretized.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "radar".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: 'Chart data.',
          },
          {
            property: 'data.name',
            type: 'required',
            valueType: 'string',
            description: 'Category name.',
          },
          {
            property: 'data.value',
            type: 'required',
            valueType: 'number',
            description: 'Category value.',
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
            property: 'align',
            type: 'optional',
            valueType: 'boolean',
            description:
              'When true, all dimensions share the same scale for direct absolute value comparison; when false, each dimension scales independently. Default is false.',
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
            property: 'style.lineWidth',
            type: 'optional',
            valueType: 'number',
            description: 'Must be a value greater than 0.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Single-series radar',
      description: 'Single-series radar',
      json: {
        type: 'radar',
        data: [
          { name: 'Performance', value: 85 },
          { name: 'Ecosystem', value: 92 },
          { name: 'Learning Curve', value: 78 },
          { name: 'Community Activity', value: 88 },
          { name: 'Engineering', value: 90 },
          { name: 'Mobile Support', value: 82 },
        ],
        title: 'Frontend Framework Comprehensive Evaluation',
      },
      dsl: 'vis radar\ndata\n  - name Performance\n    value 85\n  - name Ecosystem\n    value 92\n  - name "Learning Curve"\n    value 78\n  - name "Community Activity"\n    value 88\n  - name Engineering\n    value 90\n  - name "Mobile Support"\n    value 82\ntitle "Frontend Framework Comprehensive Evaluation"',
    },
    {
      title: 'Compare multiple profiles',
      description: 'Compare multiple profiles',
      json: {
        type: 'radar',
        data: [
          { name: 'Performance', value: 95, group: 'iPhone 16' },
          { name: 'Camera', value: 92, group: 'iPhone 16' },
          { name: 'Battery Life', value: 78, group: 'iPhone 16' },
          { name: 'Display', value: 88, group: 'iPhone 16' },
          { name: 'Price-Performance', value: 65, group: 'iPhone 16' },
          { name: 'Ecosystem', value: 96, group: 'iPhone 16' },
          { name: 'Performance', value: 93, group: 'Galaxy S24' },
          { name: 'Camera', value: 90, group: 'Galaxy S24' },
          { name: 'Battery Life', value: 82, group: 'Galaxy S24' },
          { name: 'Display', value: 92, group: 'Galaxy S24' },
          { name: 'Price-Performance', value: 78, group: 'Galaxy S24' },
          { name: 'Ecosystem', value: 80, group: 'Galaxy S24' },
          { name: 'Performance', value: 90, group: 'Mate 60' },
          { name: 'Camera', value: 88, group: 'Mate 60' },
          { name: 'Battery Life', value: 85, group: 'Mate 60' },
          { name: 'Display', value: 86, group: 'Mate 60' },
          { name: 'Price-Performance', value: 82, group: 'Mate 60' },
          { name: 'Ecosystem', value: 75, group: 'Mate 60' },
        ],
        title: 'Three Flagship Phones Multi-Dimensional Rating',
      },
      dsl: 'vis radar\ndata\n  - name Performance\n    value 95\n    group "iPhone 16"\n  - name Camera\n    value 92\n    group "iPhone 16"\n  - name "Battery Life"\n    value 78\n    group "iPhone 16"\n  - name Display\n    value 88\n    group "iPhone 16"\n  - name "Price-Performance"\n    value 65\n    group "iPhone 16"\n  - name Ecosystem\n    value 96\n    group "iPhone 16"\n  - name Performance\n    value 93\n    group "Galaxy S24"\n  - name Camera\n    value 90\n    group "Galaxy S24"\n  - name "Battery Life"\n    value 82\n    group "Galaxy S24"\n  - name Display\n    value 92\n    group "Galaxy S24"\n  - name "Price-Performance"\n    value 78\n    group "Galaxy S24"\n  - name Ecosystem\n    value 80\n    group "Galaxy S24"\n  - name Performance\n    value 90\n    group "Mate 60"\n  - name Camera\n    value 88\n    group "Mate 60"\n  - name "Battery Life"\n    value 85\n    group "Mate 60"\n  - name Display\n    value 86\n    group "Mate 60"\n  - name "Price-Performance"\n    value 82\n    group "Mate 60"\n  - name Ecosystem\n    value 75\n    group "Mate 60"\ntitle "Three Flagship Phones Multi-Dimensional Rating"',
    },
    {
      title: 'Unified axis scales',
      description: 'Unified axis scales',
      json: {
        type: 'radar',
        align: true,
        data: [
          { name: 'Sleep Quality', value: 80, group: 'A' },
          { name: 'Exercise Frequency', value: 30, group: 'A' },
          { name: 'Balanced Diet', value: 70, group: 'A' },
          { name: 'Stress Management', value: 50, group: 'A' },
          { name: 'Social Activity', value: 60, group: 'A' },
          { name: 'Sleep Quality', value: 60, group: 'B' },
          { name: 'Exercise Frequency', value: 90, group: 'B' },
          { name: 'Balanced Diet', value: 40, group: 'B' },
          { name: 'Stress Management', value: 75, group: 'B' },
          { name: 'Social Activity', value: 85, group: 'B' },
        ],
        title: 'Healthy Lifestyle Assessment (Unified Scale)',
      },
      dsl: 'vis radar\nalign true\ndata\n  - name "Sleep Quality"\n    value 80\n    group A\n  - name "Exercise Frequency"\n    value 30\n    group A\n  - name "Balanced Diet"\n    value 70\n    group A\n  - name "Stress Management"\n    value 50\n    group A\n  - name "Social Activity"\n    value 60\n    group A\n  - name "Sleep Quality"\n    value 60\n    group B\n  - name "Exercise Frequency"\n    value 90\n    group B\n  - name "Balanced Diet"\n    value 40\n    group B\n  - name "Stress Management"\n    value 75\n    group B\n  - name "Social Activity"\n    value 85\n    group B\ntitle "Healthy Lifestyle Assessment (Unified Scale)"',
    },
  ],
};
