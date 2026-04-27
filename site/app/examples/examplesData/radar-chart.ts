import { Radar } from 'lucide-react';

export const radarChartData = {
  id: 'radar-chart',
  name: 'Radar Chart',
  icon: Radar,
  galleryExamples:
    'vis radar\ndata\n  - name Performance\n    value 85\n  - name Ecosystem\n    value 92\n  - name "Learning Curve"\n    value 78\n  - name "Community Activity"\n    value 88\n  - name Engineering\n    value 90\ntitle "Frontend Framework Evaluation"',
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
            description: 'Must be a value greater than 0.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Frontend Framework Comprehensive Evaluation (6 Dimensions, Single Series)',
      description: 'Frontend Framework Comprehensive Evaluation (6 Dimensions, Single Series)',
      code: 'vis radar\ndata\n  - name Performance\n    value 85\n  - name Ecosystem\n    value 92\n  - name "Learning Curve"\n    value 78\n  - name "Community Activity"\n    value 88\n  - name Engineering\n    value 90\n  - name "Mobile Support"\n    value 82\ntitle "Frontend Framework Comprehensive Evaluation"',
    },
    {
      title: 'Three Flagship Phones Multi-Dimensional Rating, Custom Colors',
      description: 'Three Flagship Phones Multi-Dimensional Rating',
      code: 'vis radar\ndata\n  - name Performance\n    value 95\n    group "iPhone 16"\n  - name Camera\n    value 92\n    group "iPhone 16"\n  - name "Battery Life"\n    value 78\n    group "iPhone 16"\n  - name Display\n    value 88\n    group "iPhone 16"\n  - name "Price-Performance"\n    value 65\n    group "iPhone 16"\n  - name Ecosystem\n    value 96\n    group "iPhone 16"\n  - name Performance\n    value 93\n    group "Galaxy S24"\n  - name Camera\n    value 90\n    group "Galaxy S24"\n  - name "Battery Life"\n    value 82\n    group "Galaxy S24"\n  - name Display\n    value 92\n    group "Galaxy S24"\n  - name "Price-Performance"\n    value 78\n    group "Galaxy S24"\n  - name Ecosystem\n    value 80\n    group "Galaxy S24"\n  - name Performance\n    value 90\n    group "Mate 60"\n  - name Camera\n    value 88\n    group "Mate 60"\n  - name "Battery Life"\n    value 85\n    group "Mate 60"\n  - name Display\n    value 86\n    group "Mate 60"\n  - name "Price-Performance"\n    value 82\n    group "Mate 60"\n  - name Ecosystem\n    value 75\n    group "Mate 60"\ntitle "Three Flagship Phones Multi-Dimensional Rating"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Team Capability Quarterly Evaluation, Custom Palette',
      description: 'Team Capability Quarterly Evaluation',
      code: 'vis radar\ndata\n  - name "Technical Skills"\n    value 78\n    group Q1\n  - name "Collaboration Efficiency"\n    value 72\n    group Q1\n  - name "Innovation Index"\n    value 65\n    group Q1\n  - name "Delivery Quality"\n    value 80\n    group Q1\n  - name "Customer Satisfaction"\n    value 75\n    group Q1\n  - name "Technical Skills"\n    value 85\n    group Q2\n  - name "Collaboration Efficiency"\n    value 80\n    group Q2\n  - name "Innovation Index"\n    value 72\n    group Q2\n  - name "Delivery Quality"\n    value 86\n    group Q2\n  - name "Customer Satisfaction"\n    value 82\n    group Q2\n  - name "Technical Skills"\n    value 90\n    group Q3\n  - name "Collaboration Efficiency"\n    value 85\n    group Q3\n  - name "Innovation Index"\n    value 80\n    group Q3\n  - name "Delivery Quality"\n    value 92\n    group Q3\n  - name "Customer Satisfaction"\n    value 88\n    group Q3\ntitle "Team Capability Quarterly Evaluation"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"\n  lineWidth 3',
    },
    {
      title: 'Unified Axis Scale (align: true)',
      description:
        'Unified axis scale with all axes sharing the same maximum value for direct absolute value comparison',
      code: 'vis radar\nalign true\ndata\n  - name "Sleep Quality"\n    value 80\n    group A\n  - name "Exercise Frequency"\n    value 30\n    group A\n  - name "Balanced Diet"\n    value 70\n    group A\n  - name "Stress Management"\n    value 50\n    group A\n  - name "Social Activity"\n    value 60\n    group A\n  - name "Sleep Quality"\n    value 60\n    group B\n  - name "Exercise Frequency"\n    value 90\n    group B\n  - name "Balanced Diet"\n    value 40\n    group B\n  - name "Stress Management"\n    value 75\n    group B\n  - name "Social Activity"\n    value 85\n    group B\ntitle "Healthy Lifestyle Assessment (Unified Scale)"',
    },
  ],
};
