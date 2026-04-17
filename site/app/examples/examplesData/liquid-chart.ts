import { Droplets } from 'lucide-react';

export const liquidChartData = {
  id: 'liquid-chart',
  name: 'Liquid Chart',
  icon: Droplets,
  galleryExamples: 'vis liquid\npercent 0.75',
  description:
    '水波图是一种用液体填充效果表现数值占比的图表。通常以圆形容器为载体，通过液面高度和波动动态，直观展示某个指标的当前进度或占比。液体的高度代表数值的百分比，波动效果增强视觉表现力，适合展示单一指标的完成度或状态。',
  knowledge: {
    introduction:
      '水波图是一种用液体填充效果表现数值占比的图表。通常以圆形容器为载体，通过液面高度和波动动态，直观展示某个指标的当前进度或占比。液体的高度代表数值的百分比，波动效果增强视觉表现力，适合展示单一指标的完成度或状态。',
    useCases: [
      '用于展示某项指标的进度、占比，如任务完成度、资源使用率、KPI 达成率等',
      '适合突出单一数值的当前状态',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表类型，必填，文本类型，值为 "liquid"。',
          },
          {
            property: 'percent',
            type: 'required',
            description: '填充百分比，必填，数值类型，取值范围 0~1。',
          },
          {
            property: 'shape',
            type: 'optional',
            description:
              '图表形状，选填，文本类型，可选值为 "rect" | "circle" | "pin" | "triangle"，默认值为 "circle"。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表标题，选填，文本类型。',
          },
          {
            property: 'theme',
            type: 'optional',
            description:
              '图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。',
          },
          {
            property: 'style',
            type: 'optional',
            description: '图表样式，选填，对象类型；',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            description: '背景颜色，选填，文本类型，合法颜色值。',
          },
          {
            property: 'style.palette',
            type: 'optional',
            description: '颜色映射，选填，数组类型，合法颜色值数组。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '展示某任务完成度为 75%。',
      description: '展示某任务完成度为 75%。',
      code: 'vis liquid\npercent 0.75\ntitle 任务完成度',
    },
    {
      title: '展示服务器资源使用率为 60%，主题为 dark。',
      description: '展示服务器资源使用率为 60%，主题为 dark。',
      code: 'vis liquid\npercent 0.6\ntitle 资源使用率\ntheme dark',
    },
    {
      title: '展示 KPI 达成率为 92%，自定义水波图形状为三角形，以及水波图颜色和背景色。',
      description: '展示 KPI 达成率为 92%，自定义水波图形状为三角形，以及水波图颜色和背景色。',
      code: 'vis liquid\npercent 0.92\ntitle "KPI 达成率"\nshape triangle\nstyle\n  palette\n    - #00BFFF\n  backgroundColor #F0F0F0',
    },
  ],
};
