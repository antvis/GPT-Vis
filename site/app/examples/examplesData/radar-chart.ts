import { Radar } from 'lucide-react';

export const radarChartData = {
  id: 'radar-chart',
  name: 'Radar Chart',
  icon: Radar,
  galleryExamples:
    'vis radar\ndata\n  - name Performance\n    value 85\n  - name Ecosystem\n    value 92\n  - name "Learning Curve"\n    value 78\n  - name "Community Activity"\n    value 88\n  - name Engineering\n    value 90',
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
            description: 'Chart type, required, string type, value must be "radar".',
          },
          {
            property: 'data',
            type: 'required',
            description: 'Chart data, required, array of objects.',
          },
          {
            property: 'data.name',
            type: 'required',
            description: 'Category name, required, string type.',
          },
          {
            property: 'data.value',
            type: 'required',
            description: 'Category value, required, numeric type.',
          },
          {
            property: 'data.group',
            type: 'optional',
            description: 'Group name, optional, string type.',
          },
          {
            property: 'title',
            type: 'optional',
            description: 'Chart title, optional, string type.',
          },
          {
            property: 'align',
            type: 'optional',
            description:
              '是否对齐各维度比例尺，选填，布尔类型，默认值为 false。为 true 时所有维度共享同一比例尺（最大值对齐），便于直观比较绝对数值大小；为 false 时每个维度独立缩放，适合突出各维度内部的相对差异。',
          },
          {
            property: 'theme',
            type: 'optional',
            description:
              'Chart theme, optional, string type, available values are "default" | "dark" | "academy", default is "default".',
          },
          {
            property: 'style',
            type: 'optional',
            description: 'Chart style, optional, object type.',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            description: 'Background color, optional, string type, value is a valid color.',
          },
          {
            property: 'style.palette',
            type: 'optional',
            description:
              'Color palette, optional, array type, must be an array of valid color values.',
          },
          {
            property: 'style.lineWidth',
            type: 'optional',
            description: 'Stroke width, optional, numeric type, must be a value greater than 0.',
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
      title: '各维度统一比例尺（align: true）',
      description: '各维度统一比例尺，所有轴共享同一最大值，便于直观比较绝对数值差异',
      code: 'vis radar\nalign true\ndata\n  - name 睡眠质量\n    value 80\n    group 甲\n  - name 运动频率\n    value 30\n    group 甲\n  - name 饮食均衡\n    value 70\n    group 甲\n  - name 压力管理\n    value 50\n    group 甲\n  - name 社交活跃\n    value 60\n    group 甲\n  - name 睡眠质量\n    value 60\n    group 乙\n  - name 运动频率\n    value 90\n    group 乙\n  - name 饮食均衡\n    value 40\n    group 乙\n  - name 压力管理\n    value 75\n    group 乙\n  - name 社交活跃\n    value 85\n    group 乙\ntitle 健康生活方式评估（统一比例尺）',
    },
  ],
};
