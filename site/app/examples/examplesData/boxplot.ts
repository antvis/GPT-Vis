import { BarChart3 } from 'lucide-react';
export const boxplotData = {
  id: 'boxplot',
  name: 'Boxplot',
  icon: BarChart3,
  galleryExamples:
    'vis boxplot\ndata\n  - category Math\n    value 72\n  - category Math\n    value 85\n  - category Math\n    value 68\n  - category Math\n    value 91\n  - category Math\n    value 76\n  - category Math\n    value 83\n  - category Math\n    value 65\n  - category Math\n    value 88\n  - category Math\n    value 79\n  - category Math\n    value 94\n  - category Math\n    value 70\n  - category Math\n    value 82\n  - category Math\n    value 86\n  - category Math\n    value 74\n  - category Math\n    value 90\n  - category Math\n    value 67\n  - category Math\n    value 78\n  - category Math\n    value 84\n  - category Math\n    value 73\n  - category Math\n    value 89\n  - category History\n    value 78\n  - category History\n    value 82\n  - category History\n    value 75\n  - category History\n    value 88\n  - category History\n    value 80\n  - category History\n    value 85\n  - category History\n    value 72\n  - category History\n    value 90\n  - category History\n    value 77\n  - category History\n    value 83\n  - category History\n    value 79\n  - category History\n    value 86\n  - category History\n    value 74\n  - category History\n    value 91\n  - category History\n    value 76\n  - category History\n    value 84\n  - category History\n    value 81\n  - category History\n    value 73\n  - category History\n    value 87\n  - category English\n    value 65\n  - category English\n    value 78\n  - category English\n    value 82\n  - category English\n    value 70\n  - category English\n    value 86\n  - category English\n    value 74\n  - category English\n    value 80\n  - category English\n    value 68\n  - category English\n    value 84\n  - category English\n    value 72\n  - category English\n    value 88\n  - category English\n    value 76\n  - category English\n    value 81\n  - category English\n    value 67\n  - category English\n    value 85\n  - category English\n    value 73\n  - category English\n    value 79\n  - category English\n    value 83\n  - category English\n    value 71\n  - category English\n    value 77\n  - category Physics\n    value 58\n  - category Physics\n    value 72\n  - category Physics\n    value 85\n  - category Physics\n    value 63\n  - category Physics\n    value 90\n  - category Physics\n    value 68\n  - category Physics\n    value 78\n  - category Physics\n    value 55\n  - category Physics\n    value 82\n  - category Physics\n    value 70\n  - category Physics\n    value 92\n  - category Physics\n    value 65\n  - category Physics\n    value 76\n  - category Physics\n    value 60\n  - category Physics\n    value 88\n  - category Physics\n    value 74\n  - category Physics\n    value 80\n  - category Physics\n    value 67\n  - category Physics\n    value 83\n  - category Physics\n    value 62\n  - category Physics\n    value 75\ntitle "Exam Scores by Subject"\naxisXTitle Subject\naxisYTitle Score',
  description:
    'A boxplot is a statistical chart used to display data distribution, central tendency, and outliers. The box represents the interquartile range, the whiskers represent the range of data extremes, and outliers are marked individually. It is well-suited for visually comparing the distribution characteristics of different groups of data.',
  knowledge: {
    introduction:
      'A boxplot is a statistical chart used to display data distribution, central tendency, and outliers. The box represents the interquartile range, the whiskers represent the range of data extremes, and outliers are marked individually. It is well-suited for visually comparing the distribution characteristics of different groups of data.',
    useCases: [
      'Used to display the distribution of one or more groups of data, such as score distributions, experimental results, financial data, etc.',
      'Suitable for highlighting the median, range, and outliers of data',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "boxplot".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: 'Chart data.',
          },
          {
            property: 'data.category',
            type: 'required',
            valueType: 'string',
            description: 'Category name.',
          },
          {
            property: 'data.value',
            type: 'required',
            valueType: 'number',
            description: 'Data value.',
          },
          {
            property: 'data.group',
            type: 'optional',
            valueType: 'string',
            description: 'Group name, used for multi-group data comparison.',
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
            description: 'Color palette.',
          },
          {
            property: 'style.startAtZero',
            type: 'optional',
            valueType: 'boolean',
            description: 'Whether the Y-axis starts from zero, default is false.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        'Four-Subject Exam Score Distribution: Score distribution comparison of 20 students each in Math, History, English, and Physics.',
      description:
        'Four-Subject Exam Score Distribution: Score distribution comparison of 20 students each in Math, History, English, and Physics.',
      code: 'vis boxplot\ndata\n  - category Math\n    value 72\n  - category Math\n    value 85\n  - category Math\n    value 68\n  - category Math\n    value 91\n  - category Math\n    value 76\n  - category Math\n    value 83\n  - category Math\n    value 65\n  - category Math\n    value 88\n  - category Math\n    value 79\n  - category Math\n    value 94\n  - category Math\n    value 70\n  - category Math\n    value 82\n  - category Math\n    value 86\n  - category Math\n    value 74\n  - category Math\n    value 90\n  - category Math\n    value 67\n  - category Math\n    value 78\n  - category Math\n    value 84\n  - category Math\n    value 73\n  - category Math\n    value 89\n  - category History\n    value 78\n  - category History\n    value 82\n  - category History\n    value 75\n  - category History\n    value 88\n  - category History\n    value 80\n  - category History\n    value 85\n  - category History\n    value 72\n  - category History\n    value 90\n  - category History\n    value 77\n  - category History\n    value 83\n  - category History\n    value 79\n  - category History\n    value 86\n  - category History\n    value 74\n  - category History\n    value 91\n  - category History\n    value 76\n  - category History\n    value 84\n  - category History\n    value 81\n  - category History\n    value 73\n  - category History\n    value 87\n  - category English\n    value 65\n  - category English\n    value 78\n  - category English\n    value 82\n  - category English\n    value 70\n  - category English\n    value 86\n  - category English\n    value 74\n  - category English\n    value 80\n  - category English\n    value 68\n  - category English\n    value 84\n  - category English\n    value 72\n  - category English\n    value 88\n  - category English\n    value 76\n  - category English\n    value 81\n  - category English\n    value 67\n  - category English\n    value 85\n  - category English\n    value 73\n  - category English\n    value 79\n  - category English\n    value 83\n  - category English\n    value 71\n  - category English\n    value 77\n  - category Physics\n    value 58\n  - category Physics\n    value 72\n  - category Physics\n    value 85\n  - category Physics\n    value 63\n  - category Physics\n    value 90\n  - category Physics\n    value 68\n  - category Physics\n    value 78\n  - category Physics\n    value 55\n  - category Physics\n    value 82\n  - category Physics\n    value 70\n  - category Physics\n    value 92\n  - category Physics\n    value 65\n  - category Physics\n    value 76\n  - category Physics\n    value 60\n  - category Physics\n    value 88\n  - category Physics\n    value 74\n  - category Physics\n    value 80\n  - category Physics\n    value 67\n  - category Physics\n    value 83\n  - category Physics\n    value 62\n  - category Physics\n    value 75\ntitle "Exam Scores by Subject"\naxisXTitle Subject\naxisYTitle Score',
    },
    {
      title: 'Penguin Flipper Length Distribution (Grouped by Species and Sex, Custom Colors)',
      description:
        'Penguin Flipper Length Distribution (Grouped by Species and Sex): Comparison of male and female flipper length (mm) across Adelie, Chinstrap, and Gentoo penguins.',
      code: 'vis boxplot\ndata\n  - category Adelie\n    group MALE\n    value 195\n  - category Adelie\n    group MALE\n    value 191\n  - category Adelie\n    group MALE\n    value 198\n  - category Adelie\n    group MALE\n    value 197\n  - category Adelie\n    group MALE\n    value 194\n  - category Adelie\n    group MALE\n    value 185\n  - category Adelie\n    group MALE\n    value 200\n  - category Adelie\n    group MALE\n    value 210\n  - category Adelie\n    group FEMALE\n    value 181\n  - category Adelie\n    group FEMALE\n    value 186\n  - category Adelie\n    group FEMALE\n    value 182\n  - category Adelie\n    group FEMALE\n    value 174\n  - category Adelie\n    group FEMALE\n    value 189\n  - category Adelie\n    group FEMALE\n    value 187\n  - category Adelie\n    group FEMALE\n    value 190\n  - category Chinstrap\n    group MALE\n    value 196\n  - category Chinstrap\n    group MALE\n    value 197\n  - category Chinstrap\n    group MALE\n    value 201\n  - category Chinstrap\n    group MALE\n    value 205\n  - category Chinstrap\n    group MALE\n    value 210\n  - category Chinstrap\n    group MALE\n    value 212\n  - category Chinstrap\n    group FEMALE\n    value 192\n  - category Chinstrap\n    group FEMALE\n    value 188\n  - category Chinstrap\n    group FEMALE\n    value 195\n  - category Chinstrap\n    group FEMALE\n    value 181\n  - category Chinstrap\n    group FEMALE\n    value 187\n  - category Chinstrap\n    group FEMALE\n    value 190\n  - category Gentoo\n    group MALE\n    value 230\n  - category Gentoo\n    group MALE\n    value 221\n  - category Gentoo\n    group MALE\n    value 225\n  - category Gentoo\n    group MALE\n    value 231\n  - category Gentoo\n    group MALE\n    value 228\n  - category Gentoo\n    group FEMALE\n    value 211\n  - category Gentoo\n    group FEMALE\n    value 210\n  - category Gentoo\n    group FEMALE\n    value 214\n  - category Gentoo\n    group FEMALE\n    value 213\n  - category Gentoo\n    group FEMALE\n    value 219\ntitle "Penguin Flipper Length Distribution (by Species and Sex)"\naxisYTitle "Flipper Length (mm)"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title:
        'Air Quality Index Distribution of Five Cities: 25 AQI samples each from Beijing, Shanghai, Guangzhou, Chengdu, and Shenzhen, Custom Palette',
      description:
        'Air Quality Index Distribution of Five Cities: 25 AQI samples each from Beijing, Shanghai, Guangzhou, Chengdu, and Shenzhen.',
      code: 'vis boxplot\ndata\n  - category Beijing\n    value 85\n  - category Beijing\n    value 120\n  - category Beijing\n    value 95\n  - category Beijing\n    value 150\n  - category Beijing\n    value 78\n  - category Beijing\n    value 110\n  - category Beijing\n    value 88\n  - category Beijing\n    value 135\n  - category Beijing\n    value 72\n  - category Beijing\n    value 105\n  - category Beijing\n    value 92\n  - category Beijing\n    value 125\n  - category Beijing\n    value 68\n  - category Beijing\n    value 115\n  - category Beijing\n    value 82\n  - category Beijing\n    value 140\n  - category Beijing\n    value 76\n  - category Beijing\n    value 100\n  - category Beijing\n    value 90\n  - category Beijing\n    value 130\n  - category Beijing\n    value 65\n  - category Beijing\n    value 108\n  - category Beijing\n    value 86\n  - category Beijing\n    value 145\n  - category Beijing\n    value 74\n  - category Shanghai\n    value 62\n  - category Shanghai\n    value 85\n  - category Shanghai\n    value 70\n  - category Shanghai\n    value 95\n  - category Shanghai\n    value 58\n  - category Shanghai\n    value 80\n  - category Shanghai\n    value 68\n  - category Shanghai\n    value 90\n  - category Shanghai\n    value 55\n  - category Shanghai\n    value 75\n  - category Shanghai\n    value 72\n  - category Shanghai\n    value 88\n  - category Shanghai\n    value 52\n  - category Shanghai\n    value 82\n  - category Shanghai\n    value 65\n  - category Shanghai\n    value 92\n  - category Shanghai\n    value 60\n  - category Shanghai\n    value 78\n  - category Shanghai\n    value 70\n  - category Shanghai\n    value 86\n  - category Shanghai\n    value 50\n  - category Shanghai\n    value 76\n  - category Shanghai\n    value 64\n  - category Guangzhou\n    value 45\n  - category Guangzhou\n    value 68\n  - category Guangzhou\n    value 55\n  - category Guangzhou\n    value 78\n  - category Guangzhou\n    value 42\n  - category Guangzhou\n    value 62\n  - category Guangzhou\n    value 50\n  - category Guangzhou\n    value 72\n  - category Guangzhou\n    value 38\n  - category Guangzhou\n    value 58\n  - category Guangzhou\n    value 52\n  - category Guangzhou\n    value 70\n  - category Guangzhou\n    value 40\n  - category Guangzhou\n    value 65\n  - category Guangzhou\n    value 48\n  - category Guangzhou\n    value 75\n  - category Guangzhou\n    value 44\n  - category Guangzhou\n    value 60\n  - category Guangzhou\n    value 53\n  - category Guangzhou\n    value 68\n  - category Guangzhou\n    value 36\n  - category Guangzhou\n    value 56\n  - category Guangzhou\n    value 46\n  - category Guangzhou\n    value 72\n  - category Guangzhou\n    value 50\n  - category Chengdu\n    value 70\n  - category Chengdu\n    value 95\n  - category Chengdu\n    value 80\n  - category Chengdu\n    value 110\n  - category Chengdu\n    value 65\n  - category Chengdu\n    value 88\n  - category Chengdu\n    value 75\n  - category Chengdu\n    value 100\n  - category Chengdu\n    value 60\n  - category Chengdu\n    value 82\n  - category Chengdu\n    value 78\n  - category Chengdu\n    value 92\n  - category Chengdu\n    value 58\n  - category Chengdu\n    value 85\n  - category Chengdu\n    value 72\n  - category Chengdu\n    value 105\n  - category Chengdu\n    value 68\n  - category Chengdu\n    value 90\n  - category Chengdu\n    value 76\n  - category Chengdu\n    value 98\n  - category Chengdu\n    value 55\n  - category Chengdu\n    value 82\n  - category Chengdu\n    value 70\n  - category Chengdu\n    value 108\n  - category Chengdu\n    value 64\n  - category Shenzhen\n    value 40\n  - category Shenzhen\n    value 60\n  - category Shenzhen\n    value 48\n  - category Shenzhen\n    value 70\n  - category Shenzhen\n    value 35\n  - category Shenzhen\n    value 55\n  - category Shenzhen\n    value 45\n  - category Shenzhen\n    value 65\n  - category Shenzhen\n    value 32\n  - category Shenzhen\n    value 52\n  - category Shenzhen\n    value 48\n  - category Shenzhen\n    value 62\n  - category Shenzhen\n    value 38\n  - category Shenzhen\n    value 58\n  - category Shenzhen\n    value 42\n  - category Shenzhen\n    value 68\n  - category Shenzhen\n    value 36\n  - category Shenzhen\n    value 50\n  - category Shenzhen\n    value 46\n  - category Shenzhen\n    value 60\n  - category Shenzhen\n    value 30\n  - category Shenzhen\n    value 55\n  - category Shenzhen\n    value 44\n  - category Shenzhen\n    value 65\n  - category Shenzhen\n    value 40\ntitle "Air Quality Index Distribution of Five Cities"\naxisXTitle City\naxisYTitle AQI\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
