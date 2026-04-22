import { BarChart3 } from 'lucide-react';
export const boxplotData = {
  id: 'boxplot',
  name: 'Boxplot',
  icon: BarChart3,
  galleryExamples:
    'vis boxplot\ndata\n  - category 数学\n    value 72\n  - category 数学\n    value 85\n  - category 数学\n    value 68\n  - category 数学\n    value 91\n  - category 数学\n    value 76\n  - category 数学\n    value 83\n  - category 数学\n    value 65\n  - category 数学\n    value 88\n  - category 数学\n    value 79\n  - category 数学\n    value 94\n  - category 数学\n    value 70\n  - category 数学\n    value 82\n  - category 数学\n    value 86\n  - category 数学\n    value 74\n  - category 数学\n    value 90\n  - category 数学\n    value 67\n  - category 数学\n    value 78\n  - category 数学\n    value 84\n  - category 数学\n    value 73\n  - category 数学\n    value 89\n  - category 语文\n    value 78\n  - category 语文\n    value 82\n  - category 语文\n    value 75\n  - category 语文\n    value 88\n  - category 语文\n    value 80\n  - category 语文\n    value 85\n  - category 语文\n    value 72\n  - category 语文\n    value 90\n  - category 语文\n    value 77\n  - category 语文\n    value 83\n  - category 语文\n    value 79\n  - category 语文\n    value 86\n  - category 语文\n    value 74\n  - category 语文\n    value 91\n  - category 语文\n    value 76\n  - category 语文\n    value 84\n  - category 语文\n    value 81\n  - category 语文\n    value 73\n  - category 语文\n    value 87\n  - category 英语\n    value 65\n  - category 英语\n    value 78\n  - category 英语\n    value 82\n  - category 英语\n    value 70\n  - category 英语\n    value 86\n  - category 英语\n    value 74\n  - category 英语\n    value 80\n  - category 英语\n    value 68\n  - category 英语\n    value 84\n  - category 英语\n    value 72\n  - category 英语\n    value 88\n  - category 英语\n    value 76\n  - category 英语\n    value 81\n  - category 英语\n    value 67\n  - category 英语\n    value 85\n  - category 英语\n    value 73\n  - category 英语\n    value 79\n  - category 英语\n    value 83\n  - category 英语\n    value 71\n  - category 英语\n    value 77\n  - category 物理\n    value 58\n  - category 物理\n    value 72\n  - category 物理\n    value 85\n  - category 物理\n    value 63\n  - category 物理\n    value 90\n  - category 物理\n    value 68\n  - category 物理\n    value 78\n  - category 物理\n    value 55\n  - category 物理\n    value 82\n  - category 物理\n    value 70\n  - category 物理\n    value 92\n  - category 物理\n    value 65\n  - category 物理\n    value 76\n  - category 物理\n    value 60\n  - category 物理\n    value 88\n  - category 物理\n    value 74\n  - category 物理\n    value 80\n  - category 物理\n    value 67\n  - category 物理\n    value 83\n  - category 物理\n    value 62\n  - category 物理\n    value 75\ntitle 四学科考试成绩分布\naxisXTitle 科目\naxisYTitle 分数',
  description:
    '箱线图是一种用于展示数据分布、集中趋势及离群值的统计图表。通过盒体表示数据的四分位数区间，上下须表示数据的极值范围，异常点以单独标记。适合直观比较不同组数据的分布特征。',
  knowledge: {
    introduction:
      '箱线图是一种用于展示数据分布、集中趋势及离群值的统计图表。通过盒体表示数据的四分位数区间，上下须表示数据的极值范围，异常点以单独标记。适合直观比较不同组数据的分布特征。',
    useCases: [
      '用于展示一组或多组数据的分布情况，如成绩分布、实验结果、金融数据等',
      '适合突出数据的中位数、分布范围及异常值',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表类型，必填，文本类型，值为 "boxplot"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '箱线数据，必填，数组类型。',
          },
          {
            property: 'data.category',
            type: 'required',
            description: '数据分类名称，必填，文本类型。',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '数据分类值，必填，数值类型。',
          },
          {
            property: 'data.group',
            type: 'optional',
            description: '数据分组名称，选填，文本类型，用于多组数据对比。',
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
            description: '自定义配色，选填，字符串数组类型。',
          },
          {
            property: 'style.startAtZero',
            type: 'optional',
            description: 'Y轴是否从零开始，选填，布尔类型，默认值为 false。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '四学科考试成绩分布：数学、语文、英语、物理四科各 20 名学生的分数分布对比。',
      description: '四学科考试成绩分布：数学、语文、英语、物理四科各 20 名学生的分数分布对比。',
      code: 'vis boxplot\ndata\n  - category 数学\n    value 72\n  - category 数学\n    value 85\n  - category 数学\n    value 68\n  - category 数学\n    value 91\n  - category 数学\n    value 76\n  - category 数学\n    value 83\n  - category 数学\n    value 65\n  - category 数学\n    value 88\n  - category 数学\n    value 79\n  - category 数学\n    value 94\n  - category 数学\n    value 70\n  - category 数学\n    value 82\n  - category 数学\n    value 86\n  - category 数学\n    value 74\n  - category 数学\n    value 90\n  - category 数学\n    value 67\n  - category 数学\n    value 78\n  - category 数学\n    value 84\n  - category 数学\n    value 73\n  - category 数学\n    value 89\n  - category 语文\n    value 78\n  - category 语文\n    value 82\n  - category 语文\n    value 75\n  - category 语文\n    value 88\n  - category 语文\n    value 80\n  - category 语文\n    value 85\n  - category 语文\n    value 72\n  - category 语文\n    value 90\n  - category 语文\n    value 77\n  - category 语文\n    value 83\n  - category 语文\n    value 79\n  - category 语文\n    value 86\n  - category 语文\n    value 74\n  - category 语文\n    value 91\n  - category 语文\n    value 76\n  - category 语文\n    value 84\n  - category 语文\n    value 81\n  - category 语文\n    value 73\n  - category 语文\n    value 87\n  - category 英语\n    value 65\n  - category 英语\n    value 78\n  - category 英语\n    value 82\n  - category 英语\n    value 70\n  - category 英语\n    value 86\n  - category 英语\n    value 74\n  - category 英语\n    value 80\n  - category 英语\n    value 68\n  - category 英语\n    value 84\n  - category 英语\n    value 72\n  - category 英语\n    value 88\n  - category 英语\n    value 76\n  - category 英语\n    value 81\n  - category 英语\n    value 67\n  - category 英语\n    value 85\n  - category 英语\n    value 73\n  - category 英语\n    value 79\n  - category 英语\n    value 83\n  - category 英语\n    value 71\n  - category 英语\n    value 77\n  - category 物理\n    value 58\n  - category 物理\n    value 72\n  - category 物理\n    value 85\n  - category 物理\n    value 63\n  - category 物理\n    value 90\n  - category 物理\n    value 68\n  - category 物理\n    value 78\n  - category 物理\n    value 55\n  - category 物理\n    value 82\n  - category 物理\n    value 70\n  - category 物理\n    value 92\n  - category 物理\n    value 65\n  - category 物理\n    value 76\n  - category 物理\n    value 60\n  - category 物理\n    value 88\n  - category 物理\n    value 74\n  - category 物理\n    value 80\n  - category 物理\n    value 67\n  - category 物理\n    value 83\n  - category 物理\n    value 62\n  - category 物理\n    value 75\ntitle 四学科考试成绩分布\naxisXTitle 科目\naxisYTitle 分数',
    },
    {
      title: '企鹅翼长分布（按种类和性别分组，自定义颜色）',
      description:
        '企鹅翼长分布（按种类和性别分组）：Adelie、Chinstrap、Gentoo 三种企鹅雌雄翼长（mm）差异对比。',
      code: 'vis boxplot\ndata\n  - category Adelie\n    group MALE\n    value 195\n  - category Adelie\n    group MALE\n    value 191\n  - category Adelie\n    group MALE\n    value 198\n  - category Adelie\n    group MALE\n    value 197\n  - category Adelie\n    group MALE\n    value 194\n  - category Adelie\n    group MALE\n    value 185\n  - category Adelie\n    group MALE\n    value 200\n  - category Adelie\n    group MALE\n    value 210\n  - category Adelie\n    group FEMALE\n    value 181\n  - category Adelie\n    group FEMALE\n    value 186\n  - category Adelie\n    group FEMALE\n    value 182\n  - category Adelie\n    group FEMALE\n    value 174\n  - category Adelie\n    group FEMALE\n    value 189\n  - category Adelie\n    group FEMALE\n    value 187\n  - category Adelie\n    group FEMALE\n    value 190\n  - category Chinstrap\n    group MALE\n    value 196\n  - category Chinstrap\n    group MALE\n    value 197\n  - category Chinstrap\n    group MALE\n    value 201\n  - category Chinstrap\n    group MALE\n    value 205\n  - category Chinstrap\n    group MALE\n    value 210\n  - category Chinstrap\n    group MALE\n    value 212\n  - category Chinstrap\n    group FEMALE\n    value 192\n  - category Chinstrap\n    group FEMALE\n    value 188\n  - category Chinstrap\n    group FEMALE\n    value 195\n  - category Chinstrap\n    group FEMALE\n    value 181\n  - category Chinstrap\n    group FEMALE\n    value 187\n  - category Chinstrap\n    group FEMALE\n    value 190\n  - category Gentoo\n    group MALE\n    value 230\n  - category Gentoo\n    group MALE\n    value 221\n  - category Gentoo\n    group MALE\n    value 225\n  - category Gentoo\n    group MALE\n    value 231\n  - category Gentoo\n    group MALE\n    value 228\n  - category Gentoo\n    group FEMALE\n    value 211\n  - category Gentoo\n    group FEMALE\n    value 210\n  - category Gentoo\n    group FEMALE\n    value 214\n  - category Gentoo\n    group FEMALE\n    value 213\n  - category Gentoo\n    group FEMALE\n    value 219\ntitle 企鹅翼长分布（按种类和性别）\naxisYTitle 翼长（mm）\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '五城市空气质量指数分布：北京、上海、广州、成都、深圳各 25 个 AQI 样本，自定义配色',
      description: '五城市空气质量指数分布：北京、上海、广州、成都、深圳各 25 个 AQI 样本。',
      code: 'vis boxplot\ndata\n  - category 北京\n    value 85\n  - category 北京\n    value 120\n  - category 北京\n    value 95\n  - category 北京\n    value 150\n  - category 北京\n    value 78\n  - category 北京\n    value 110\n  - category 北京\n    value 88\n  - category 北京\n    value 135\n  - category 北京\n    value 72\n  - category 北京\n    value 105\n  - category 北京\n    value 92\n  - category 北京\n    value 125\n  - category 北京\n    value 68\n  - category 北京\n    value 115\n  - category 北京\n    value 82\n  - category 北京\n    value 140\n  - category 北京\n    value 76\n  - category 北京\n    value 100\n  - category 北京\n    value 90\n  - category 北京\n    value 130\n  - category 北京\n    value 65\n  - category 北京\n    value 108\n  - category 北京\n    value 86\n  - category 北京\n    value 145\n  - category 北京\n    value 74\n  - category 上海\n    value 62\n  - category 上海\n    value 85\n  - category 上海\n    value 70\n  - category 上海\n    value 95\n  - category 上海\n    value 58\n  - category 上海\n    value 80\n  - category 上海\n    value 68\n  - category 上海\n    value 90\n  - category 上海\n    value 55\n  - category 上海\n    value 75\n  - category 上海\n    value 72\n  - category 上海\n    value 88\n  - category 上海\n    value 52\n  - category 上海\n    value 82\n  - category 上海\n    value 65\n  - category 上海\n    value 92\n  - category 上海\n    value 60\n  - category 上海\n    value 78\n  - category 上海\n    value 70\n  - category 上海\n    value 86\n  - category 上海\n    value 50\n  - category 上海\n    value 76\n  - category 上海\n    value 64\n  - category 广州\n    value 45\n  - category 广州\n    value 68\n  - category 广州\n    value 55\n  - category 广州\n    value 78\n  - category 广州\n    value 42\n  - category 广州\n    value 62\n  - category 广州\n    value 50\n  - category 广州\n    value 72\n  - category 广州\n    value 38\n  - category 广州\n    value 58\n  - category 广州\n    value 52\n  - category 广州\n    value 70\n  - category 广州\n    value 40\n  - category 广州\n    value 65\n  - category 广州\n    value 48\n  - category 广州\n    value 75\n  - category 广州\n    value 44\n  - category 广州\n    value 60\n  - category 广州\n    value 53\n  - category 广州\n    value 68\n  - category 广州\n    value 36\n  - category 广州\n    value 56\n  - category 广州\n    value 46\n  - category 广州\n    value 72\n  - category 广州\n    value 50\n  - category 成都\n    value 70\n  - category 成都\n    value 95\n  - category 成都\n    value 80\n  - category 成都\n    value 110\n  - category 成都\n    value 65\n  - category 成都\n    value 88\n  - category 成都\n    value 75\n  - category 成都\n    value 100\n  - category 成都\n    value 60\n  - category 成都\n    value 82\n  - category 成都\n    value 78\n  - category 成都\n    value 92\n  - category 成都\n    value 58\n  - category 成都\n    value 85\n  - category 成都\n    value 72\n  - category 成都\n    value 105\n  - category 成都\n    value 68\n  - category 成都\n    value 90\n  - category 成都\n    value 76\n  - category 成都\n    value 98\n  - category 成都\n    value 55\n  - category 成都\n    value 82\n  - category 成都\n    value 70\n  - category 成都\n    value 108\n  - category 成都\n    value 64\n  - category 深圳\n    value 40\n  - category 深圳\n    value 60\n  - category 深圳\n    value 48\n  - category 深圳\n    value 70\n  - category 深圳\n    value 35\n  - category 深圳\n    value 55\n  - category 深圳\n    value 45\n  - category 深圳\n    value 65\n  - category 深圳\n    value 32\n  - category 深圳\n    value 52\n  - category 深圳\n    value 48\n  - category 深圳\n    value 62\n  - category 深圳\n    value 38\n  - category 深圳\n    value 58\n  - category 深圳\n    value 42\n  - category 深圳\n    value 68\n  - category 深圳\n    value 36\n  - category 深圳\n    value 50\n  - category 深圳\n    value 46\n  - category 深圳\n    value 60\n  - category 深圳\n    value 30\n  - category 深圳\n    value 55\n  - category 深圳\n    value 44\n  - category 深圳\n    value 65\n  - category 深圳\n    value 40\ntitle 五城市空气质量指数分布\naxisXTitle 城市\naxisYTitle AQI\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
