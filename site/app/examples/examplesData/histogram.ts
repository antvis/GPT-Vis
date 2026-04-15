import { BarChart3 } from 'lucide-react';

export const histogramData = {
  id: 'histogram',
  name: 'Histogram',
  icon: BarChart3,
  galleryExamples:
    'vis histogram\ndata\n  - 38\n  - 42\n  - 45\n  - 47\n  - 49\n  - 51\n  - 53\n  - 54\n  - 55\n  - 56\n  - 57\n  - 58\n  - 58\n  - 59\n  - 60\n  - 60\n  - 61\n  - 61\n  - 62\n  - 62\n  - 63\n  - 63\n  - 64\n  - 64\n  - 65\n  - 65\n  - 66\n  - 66\n  - 67\n  - 67\n  - 68\n  - 68\n  - 69\n  - 69\n  - 70\n  - 70\n  - 71\n  - 71\n  - 72\n  - 72\n  - 73\n  - 73\n  - 74\n  - 74\n  - 75\n  - 75\n  - 76\n  - 76\n  - 77\n  - 77\n  - 78\n  - 78\n  - 79\n  - 79\n  - 80\n  - 80\n  - 81\n  - 81\n  - 82\n  - 82\n  - 83\n  - 83\n  - 84\n  - 84\n  - 85\n  - 85\n  - 86\n  - 86\n  - 87\n  - 87\n  - 88\n  - 88\n  - 89\n  - 89\n  - 90\n  - 90\n  - 91\n  - 92\n  - 93\n  - 94\n  - 52\n  - 56\n  - 57\n  - 59\n  - 62\n  - 65\n  - 68\n  - 71\n  - 74\n  - 76\n  - 79\n  - 82\n  - 85\n  - 88\n  - 91\n  - 95\n  - 34\n  - 41\n  - 46\n  - 97\nbinNumber 10\naxisXTitle 分数\naxisYTitle 人数',
  description:
    '直方图是一种显示数据分布的图表，它通过柱形条表示某个范围内数据点的频率。每个柱形条的高度（或长度）表示数据点在特定区间内出现的次数，X 轴表示数据的取值范围，Y 轴表示频率或数量。直方图主要用于表示连续型变量的数据分布，并帮助分析数据的集中趋势、离散程度和形态。 直方图与柱状图的区别，直方图反映数据分布情况，柱状图只能对数值进行比较。从数据结构来说，柱状图需要一个分类变量，是离散的（如一班、二班、三班），因此柱子间有空隙。但直方图的数据均为连续的数值变量（如成绩），因此柱子间是没有空隙的。',
  knowledge: {
    introduction:
      '直方图是一种显示数据分布的图表，它通过柱形条表示某个范围内数据点的频率。每个柱形条的高度（或长度）表示数据点在特定区间内出现的次数，X 轴表示数据的取值范围，Y 轴表示频率或数量。直方图主要用于表示连续型变量的数据分布，并帮助分析数据的集中趋势、离散程度和形态。 直方图与柱状图的区别，直方图反映数据分布情况，柱状图只能对数值进行比较。从数据结构来说，柱状图需要一个分类变量，是离散的（如一班、二班、三班），因此柱子间有空隙。但直方图的数据均为连续的数值变量（如成绩），因此柱子间是没有空隙的。',
    useCases: [
      '观察数据的分布情况，例如正态分布、偏态分布等。',
      '识别数据的集中区域和极值点，帮助分析数据的变异性和集中性。',
      '处理连续型数据，将其划分为多个区间，并对每个区间的频率进行统计。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "histogram"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数值类型的数组。',
          },
          {
            property: 'binNumber',
            type: 'optional',
            description: '区间个数，可选，数值类型，用于定义直方图的区间数量。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表的标题，可选，文本类型，用于定义直方图的图表标题。',
          },
          {
            property: 'axisXTitle',
            type: 'optional',
            description: 'X 轴的轴标题文本，可选，文本类型。',
          },
          {
            property: 'axisXTitle',
            type: 'optional',
            description: 'Y 轴的轴标题文本，可选，文本类型。',
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
            description: '背景颜色，选填，文本类型，值为合法的颜色值。',
          },
          {
            property: 'style.palette',
            type: 'optional',
            description: '颜色映射，选填，数组类型，值为合法的 颜色值数组。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '用直方图展示100名学生考试成绩的分布，成绩范围34-100分，划分为10个区间',
      description: '用直方图展示100名学生考试成绩的分布，成绩范围34-100分，划分为10个区间',
      code: 'vis histogram\ndata\n  - 38\n  - 42\n  - 45\n  - 47\n  - 49\n  - 51\n  - 53\n  - 54\n  - 55\n  - 56\n  - 57\n  - 58\n  - 58\n  - 59\n  - 60\n  - 60\n  - 61\n  - 61\n  - 62\n  - 62\n  - 63\n  - 63\n  - 64\n  - 64\n  - 65\n  - 65\n  - 66\n  - 66\n  - 67\n  - 67\n  - 68\n  - 68\n  - 69\n  - 69\n  - 70\n  - 70\n  - 71\n  - 71\n  - 72\n  - 72\n  - 73\n  - 73\n  - 74\n  - 74\n  - 75\n  - 75\n  - 76\n  - 76\n  - 77\n  - 77\n  - 78\n  - 78\n  - 79\n  - 79\n  - 80\n  - 80\n  - 81\n  - 81\n  - 82\n  - 82\n  - 83\n  - 83\n  - 84\n  - 84\n  - 85\n  - 85\n  - 86\n  - 86\n  - 87\n  - 87\n  - 88\n  - 88\n  - 89\n  - 89\n  - 90\n  - 90\n  - 91\n  - 92\n  - 93\n  - 94\n  - 52\n  - 56\n  - 57\n  - 59\n  - 62\n  - 65\n  - 68\n  - 71\n  - 74\n  - 76\n  - 79\n  - 82\n  - 85\n  - 88\n  - 91\n  - 95\n  - 34\n  - 41\n  - 46\n  - 97\nbinNumber 10\ntitle 成绩分布\naxisXTitle 分数\naxisYTitle 人数',
    },
    {
      title: '某工厂50个产品重量分布，大部分集中在45-55克区间',
      description: '某工厂50个产品重量分布，大部分集中在45-55克区间',
      code: 'vis histogram\ndata\n  - 35\n  - 38\n  - 42\n  - 44\n  - 45\n  - 46\n  - 47\n  - 47\n  - 48\n  - 48\n  - 48\n  - 49\n  - 49\n  - 49\n  - 50\n  - 50\n  - 50\n  - 50\n  - 51\n  - 51\n  - 51\n  - 51\n  - 52\n  - 52\n  - 52\n  - 53\n  - 53\n  - 53\n  - 54\n  - 54\n  - 55\n  - 55\n  - 55\n  - 56\n  - 56\n  - 57\n  - 57\n  - 58\n  - 58\n  - 59\n  - 60\n  - 61\n  - 62\n  - 63\n  - 65\n  - 68\n  - 72\n  - 75\n  - 78\nbinNumber 8\ntitle 产品重量分布\naxisXTitle 重量(克)\naxisYTitle 数量',
    },
    {
      title: '鸢尾花花瓣长度分布：测量100朵鸢尾花，花瓣长度在1.2-6.9厘米之间呈双峰分布',
      description: '鸢尾花花瓣长度分布：测量100朵鸢尾花，花瓣长度在1.2-6.9厘米之间呈双峰分布',
      code: 'vis histogram\ndata\n  - 1.2\n  - 1.3\n  - 1.4\n  - 1.4\n  - 1.5\n  - 1.5\n  - 1.5\n  - 1.6\n  - 1.6\n  - 1.7\n  - 3.0\n  - 3.3\n  - 3.5\n  - 3.7\n  - 3.9\n  - 4.0\n  - 4.2\n  - 4.4\n  - 4.5\n  - 4.5\n  - 4.6\n  - 4.7\n  - 4.8\n  - 4.9\n  - 5.0\n  - 5.0\n  - 5.1\n  - 5.1\n  - 5.2\n  - 5.2\n  - 5.3\n  - 5.3\n  - 5.4\n  - 5.4\n  - 5.5\n  - 5.5\n  - 5.6\n  - 5.6\n  - 5.7\n  - 5.7\n  - 5.8\n  - 5.8\n  - 5.9\n  - 6.0\n  - 6.1\n  - 6.2\n  - 6.3\n  - 6.4\n  - 6.5\n  - 6.6\n  - 6.7\n  - 6.8\n  - 6.9\nbinNumber 12\ntitle 鸢尾花花瓣长度分布\naxisXTitle 花瓣长度(cm)\naxisYTitle 数量',
    },
  ],
};
