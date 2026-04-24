import { Radar } from 'lucide-react';

export const radarChartData = {
  id: 'radar-chart',
  name: 'Radar Chart',
  icon: Radar,
  galleryExamples:
    'vis radar\ndata\n  - name 性能\n    value 85\n  - name 生态\n    value 92\n  - name 学习成本\n    value 78\n  - name 社区活跃度\n    value 88\n  - name 工程化\n    value 90',
  description:
    '雷达图是一种显示多变量数据的图。通常从表同一中心点开始等角度间隔地射出三个以上的轴，每个轴代表一个定量变量，各轴上的点依次连接成线或几何图形。雷达图可以用来在变量间进行对比，或者查看变量中有没有异常值。另外，多幅雷达图之间或者雷达图的多层数据线之间，还可以进行总体数值情况的对比。',
  knowledge: {
    introduction:
      '雷达图是一种显示多变量数据的图。通常从表同一中心点开始等角度间隔地射出三个以上的轴，每个轴代表一个定量变量，各轴上的点依次连接成线或几何图形。雷达图可以用来在变量间进行对比，或者查看变量中有没有异常值。另外，多幅雷达图之间或者雷达图的多层数据线之间，还可以进行总体数值情况的对比。',
    useCases: [
      '某一数据对象由多个特征类别构成，比如食品的营养成分（糖、维生素、矿物质、脂肪、水）。',
      '数据特征类别是有限的，并且都可以进行归一化或者能被离散化。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "radar"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组对象类型；',
          },
          {
            property: 'data.name',
            type: 'required',
            description: '数据分类名称，必填，文本类型；',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '分类的数值大小，必填，数值类型；',
          },
          {
            property: 'data.group',
            type: 'optional',
            description: '数据分组名称，选填，文本类型；',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表的标题，选填，文本类型。',
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
            description: '颜色映射，选填 ，数组类型，值为合法的颜色值数组。',
          },
          {
            property: 'style.lineWidth',
            type: 'optional',
            description: '图形描边的宽度，选填，数值类型，值为大于 0 的数值。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '前端框架综合评估（6 维度单系列）',
      description: '前端框架综合评估（6 维度单系列）',
      code: 'vis radar\ndata\n  - name 性能\n    value 85\n  - name 生态\n    value 92\n  - name 学习成本\n    value 78\n  - name 社区活跃度\n    value 88\n  - name 工程化\n    value 90\n  - name 移动端支持\n    value 82\ntitle 前端框架综合评估',
    },
    {
      title: '三款旗舰手机多维度评分，自定义颜色',
      description: '三款旗舰手机多维度评分',
      code: 'vis radar\ndata\n  - name 性能\n    value 95\n    group iPhone 16\n  - name 拍照\n    value 92\n    group iPhone 16\n  - name 续航\n    value 78\n    group iPhone 16\n  - name 屏幕\n    value 88\n    group iPhone 16\n  - name 性价比\n    value 65\n    group iPhone 16\n  - name 生态\n    value 96\n    group iPhone 16\n  - name 性能\n    value 93\n    group "Galaxy S24"\n  - name 拍照\n    value 90\n    group "Galaxy S24"\n  - name 续航\n    value 82\n    group "Galaxy S24"\n  - name 屏幕\n    value 92\n    group "Galaxy S24"\n  - name 性价比\n    value 78\n    group "Galaxy S24"\n  - name 生态\n    value 80\n    group "Galaxy S24"\n  - name 性能\n    value 90\n    group "Mate 60"\n  - name 拍照\n    value 88\n    group "Mate 60"\n  - name 续航\n    value 85\n    group "Mate 60"\n  - name 屏幕\n    value 86\n    group "Mate 60"\n  - name 性价比\n    value 82\n    group "Mate 60"\n  - name 生态\n    value 75\n    group "Mate 60"\ntitle 三款旗舰手机多维度评分\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '团队能力季度评估，自定义配色',
      description: '团队能力季度评估',
      code: 'vis radar\ndata\n  - name 技术能力\n    value 78\n    group Q1\n  - name 协作效率\n    value 72\n    group Q1\n  - name 创新指数\n    value 65\n    group Q1\n  - name 交付质量\n    value 80\n    group Q1\n  - name 客户满意度\n    value 75\n    group Q1\n  - name 技术能力\n    value 85\n    group Q2\n  - name 协作效率\n    value 80\n    group Q2\n  - name 创新指数\n    value 72\n    group Q2\n  - name 交付质量\n    value 86\n    group Q2\n  - name 客户满意度\n    value 82\n    group Q2\n  - name 技术能力\n    value 90\n    group Q3\n  - name 协作效率\n    value 85\n    group Q3\n  - name 创新指数\n    value 80\n    group Q3\n  - name 交付质量\n    value 92\n    group Q3\n  - name 客户满意度\n    value 88\n    group Q3\ntitle 团队能力季度评估\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"\n  lineWidth 3',
    },
    {
      title: '各维度统一比例尺（align: true）',
      description: '各维度统一比例尺，所有轴共享同一最大值，便于直观比较绝对数值差异',
      code: 'vis radar\nalign true\ndata\n  - name 睡眠质量\n    value 80\n    group 甲\n  - name 运动频率\n    value 30\n    group 甲\n  - name 饮食均衡\n    value 70\n    group 甲\n  - name 压力管理\n    value 50\n    group 甲\n  - name 社交活跃\n    value 60\n    group 甲\n  - name 睡眠质量\n    value 60\n    group 乙\n  - name 运动频率\n    value 90\n    group 乙\n  - name 饮食均衡\n    value 40\n    group 乙\n  - name 压力管理\n    value 75\n    group 乙\n  - name 社交活跃\n    value 85\n    group 乙\ntitle 健康生活方式评估（统一比例尺）',
    },
  ],
};
