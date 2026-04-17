import { BarChart3 } from 'lucide-react';
export const boxplotData = {
  id: 'boxplot',
  name: 'Boxplot',
  icon: BarChart3,
  galleryExamples:
    'vis boxplot\ndata\n  - category Adelie\n    value 181\n  - category Adelie\n    value 190\n  - category Adelie\n    value 195\n  - category Adelie\n    value 191\n  - category Adelie\n    value 198\n  - category Adelie\n    value 197\n  - category Adelie\n    value 194\n  - category Adelie\n    value 180\n  - category Adelie\n    value 185\n  - category Adelie\n    value 183\n  - category Adelie\n    value 178\n  - category Adelie\n    value 184\n  - category Adelie\n    value 196\n  - category Adelie\n    value 188\n  - category Adelie\n    value 200\n  - category Adelie\n    value 192\n  - category Adelie\n    value 210\n  - category Chinstrap\n    value 196\n  - category Chinstrap\n    value 193\n  - category Chinstrap\n    value 197\n  - category Chinstrap\n    value 198\n  - category Chinstrap\n    value 194\n  - category Chinstrap\n    value 201\n  - category Chinstrap\n    value 205\n  - category Chinstrap\n    value 195\n  - category Chinstrap\n    value 210\n  - category Chinstrap\n    value 203\n  - category Chinstrap\n    value 212\n  - category Chinstrap\n    value 187\n  - category Chinstrap\n    value 207\n  - category Gentoo\n    value 218\n  - category Gentoo\n    value 215\n  - category Gentoo\n    value 219\n  - category Gentoo\n    value 221\n  - category Gentoo\n    value 222\n  - category Gentoo\n    value 230\n  - category Gentoo\n    value 220\n  - category Gentoo\n    value 225\n  - category Gentoo\n    value 216\n  - category Gentoo\n    value 231\n  - category Gentoo\n    value 228\n  - category Gentoo\n    value 213\n  - category Gentoo\n    value 209\naxisYTitle 翼长（mm）',
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
      title: '企鹅翼长分布（按种类分组）：Adelie、Chinstrap、Gentoo 三种企鹅的翼长（mm）分布对比。',
      description:
        '企鹅翼长分布（按种类分组）：Adelie、Chinstrap、Gentoo 三种企鹅的翼长（mm）分布对比。',
      code: 'vis boxplot\ndata\n  - category Adelie\n    value 181\n  - category Adelie\n    value 190\n  - category Adelie\n    value 195\n  - category Adelie\n    value 191\n  - category Adelie\n    value 198\n  - category Adelie\n    value 197\n  - category Adelie\n    value 194\n  - category Adelie\n    value 180\n  - category Adelie\n    value 185\n  - category Adelie\n    value 183\n  - category Adelie\n    value 178\n  - category Adelie\n    value 184\n  - category Adelie\n    value 196\n  - category Adelie\n    value 188\n  - category Adelie\n    value 200\n  - category Adelie\n    value 192\n  - category Adelie\n    value 210\n  - category Chinstrap\n    value 196\n  - category Chinstrap\n    value 193\n  - category Chinstrap\n    value 197\n  - category Chinstrap\n    value 198\n  - category Chinstrap\n    value 194\n  - category Chinstrap\n    value 201\n  - category Chinstrap\n    value 205\n  - category Chinstrap\n    value 195\n  - category Chinstrap\n    value 210\n  - category Chinstrap\n    value 203\n  - category Chinstrap\n    value 212\n  - category Chinstrap\n    value 187\n  - category Chinstrap\n    value 207\n  - category Gentoo\n    value 218\n  - category Gentoo\n    value 215\n  - category Gentoo\n    value 219\n  - category Gentoo\n    value 221\n  - category Gentoo\n    value 222\n  - category Gentoo\n    value 230\n  - category Gentoo\n    value 220\n  - category Gentoo\n    value 225\n  - category Gentoo\n    value 216\n  - category Gentoo\n    value 231\n  - category Gentoo\n    value 228\n  - category Gentoo\n    value 213\n  - category Gentoo\n    value 209\ntitle 企鹅翼长分布（按种类）\naxisYTitle 翼长（mm）',
    },
    {
      title:
        '企鹅翼长分布（按种类和性别分组）：Adelie、Chinstrap、Gentoo 三种企鹅雌雄翼长（mm）差异对比，主题为 dark。',
      description:
        '企鹅翼长分布（按种类和性别分组）：Adelie、Chinstrap、Gentoo 三种企鹅雌雄翼长（mm）差异对比，主题为 dark。',
      code: 'vis boxplot\ndata\n  - category Adelie\n    group MALE\n    value 195\n  - category Adelie\n    group MALE\n    value 191\n  - category Adelie\n    group MALE\n    value 198\n  - category Adelie\n    group MALE\n    value 197\n  - category Adelie\n    group MALE\n    value 194\n  - category Adelie\n    group MALE\n    value 185\n  - category Adelie\n    group MALE\n    value 200\n  - category Adelie\n    group MALE\n    value 210\n  - category Adelie\n    group FEMALE\n    value 181\n  - category Adelie\n    group FEMALE\n    value 186\n  - category Adelie\n    group FEMALE\n    value 182\n  - category Adelie\n    group FEMALE\n    value 174\n  - category Adelie\n    group FEMALE\n    value 189\n  - category Adelie\n    group FEMALE\n    value 187\n  - category Adelie\n    group FEMALE\n    value 190\n  - category Chinstrap\n    group MALE\n    value 196\n  - category Chinstrap\n    group MALE\n    value 197\n  - category Chinstrap\n    group MALE\n    value 201\n  - category Chinstrap\n    group MALE\n    value 205\n  - category Chinstrap\n    group MALE\n    value 210\n  - category Chinstrap\n    group MALE\n    value 212\n  - category Chinstrap\n    group FEMALE\n    value 192\n  - category Chinstrap\n    group FEMALE\n    value 188\n  - category Chinstrap\n    group FEMALE\n    value 195\n  - category Chinstrap\n    group FEMALE\n    value 181\n  - category Chinstrap\n    group FEMALE\n    value 187\n  - category Chinstrap\n    group FEMALE\n    value 190\n  - category Gentoo\n    group MALE\n    value 230\n  - category Gentoo\n    group MALE\n    value 221\n  - category Gentoo\n    group MALE\n    value 225\n  - category Gentoo\n    group MALE\n    value 231\n  - category Gentoo\n    group MALE\n    value 228\n  - category Gentoo\n    group FEMALE\n    value 211\n  - category Gentoo\n    group FEMALE\n    value 210\n  - category Gentoo\n    group FEMALE\n    value 214\n  - category Gentoo\n    group FEMALE\n    value 213\n  - category Gentoo\n    group FEMALE\n    value 219\ntitle 企鹅翼长分布（按种类和性别）\naxisYTitle 翼长（mm）\ntheme dark',
    },
    {
      title:
        '企鹅体重分布（按种类分组）：Adelie、Chinstrap、Gentoo 三种企鹅体重（g）分布，自定义配色和背景色。',
      description:
        '企鹅体重分布（按种类分组）：Adelie、Chinstrap、Gentoo 三种企鹅体重（g）分布，自定义配色和背景色。',
      code: 'vis boxplot\ndata\n  - category Adelie\n    value 3750\n  - category Adelie\n    value 3800\n  - category Adelie\n    value 3250\n  - category Adelie\n    value 3450\n  - category Adelie\n    value 3650\n  - category Adelie\n    value 3625\n  - category Adelie\n    value 4675\n  - category Adelie\n    value 3475\n  - category Adelie\n    value 4250\n  - category Adelie\n    value 3300\n  - category Adelie\n    value 3700\n  - category Adelie\n    value 3200\n  - category Chinstrap\n    value 3500\n  - category Chinstrap\n    value 3900\n  - category Chinstrap\n    value 3650\n  - category Chinstrap\n    value 3525\n  - category Chinstrap\n    value 3725\n  - category Chinstrap\n    value 3950\n  - category Chinstrap\n    value 3250\n  - category Chinstrap\n    value 3750\n  - category Chinstrap\n    value 4150\n  - category Chinstrap\n    value 3700\n  - category Chinstrap\n    value 3800\n  - category Gentoo\n    value 4950\n  - category Gentoo\n    value 5500\n  - category Gentoo\n    value 5700\n  - category Gentoo\n    value 4650\n  - category Gentoo\n    value 5550\n  - category Gentoo\n    value 4750\n  - category Gentoo\n    value 5200\n  - category Gentoo\n    value 5850\n  - category Gentoo\n    value 5050\n  - category Gentoo\n    value 5100\n  - category Gentoo\n    value 4800\ntitle 企鹅体重分布（按种类）\naxisYTitle 体重（g）\nstyle\n  palette\n    - #FF9800\n    - #2196F3\n    - #4CAF50\n  backgroundColor #F5F5F5',
    },
  ],
};
