import { Activity } from 'lucide-react';

export const violinChartData = {
  id: 'violin-chart',
  name: 'Violin Chart',
  icon: Activity,
  galleryExamples:
    'vis violin\ndata\n  - category "I. setosa"\n    value 5.1\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 4.7\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 4.4\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.3\n  - category "I. setosa"\n    value 5.8\n  - category "I. versicolor"\n    value 7.0\n  - category "I. versicolor"\n    value 6.4\n  - category "I. versicolor"\n    value 6.9\n  - category "I. versicolor"\n    value 5.5\n  - category "I. versicolor"\n    value 6.5\n  - category "I. versicolor"\n    value 5.7\n  - category "I. versicolor"\n    value 6.3\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 6.6\n  - category "I. versicolor"\n    value 5.2\n  - category "I. versicolor"\n    value 5.0\n  - category "I. versicolor"\n    value 5.9\n  - category "I. versicolor"\n    value 6.0\n  - category "I. versicolor"\n    value 6.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 7.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 7.6\n  - category "I. virginica"\n    value 4.9\n  - category "I. virginica"\n    value 7.3\n  - category "I. virginica"\n    value 6.7\n  - category "I. virginica"\n    value 7.2\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 6.4\n  - category "I. virginica"\n    value 6.8\n  - category "I. virginica"\n    value 5.7\naxisYTitle "Sepal Length (cm)"',
  description:
    'A violin chart is a statistical chart used to display data distribution and probability density. It uses symmetric density curves to show the distribution shape of data, and can combine boxplot elements to display median and quartiles. It is suitable for intuitively comparing the distribution and density characteristics of different groups of data.',
  knowledge: {
    introduction:
      'A violin chart is a statistical chart used to display data distribution and probability density. It uses symmetric density curves to show the distribution shape of data, and can combine boxplot elements to display median and quartiles. It is suitable for intuitively comparing the distribution and density characteristics of different groups of data.',
    useCases: [
      'Used to display the distribution and density of one or more groups of data, such as score distributions, experimental results, financial data, etc.',
      'Suitable for highlighting data distribution shapes, central tendencies, and outliers',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: 'Chart type, required, string type, value must be "violin".',
          },
          {
            property: 'data',
            type: 'required',
            description: 'Violin chart data, required, array type.',
          },
          {
            property: 'data.category',
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
            description: 'Group name, optional, string type, used for multi-group data comparison.',
          },
          {
            property: 'title',
            type: 'optional',
            description: 'Chart title, optional, string type.',
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
            property: 'style.palette',
            type: 'optional',
            description:
              'Color palette, optional, array type, must be an array of valid color values.',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            description: 'Background color, optional, string type, value is a valid color.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Iris Sepal Length Distribution (Grouped by Species)',
      description:
        'Iris Sepal Length Distribution (Grouped by Species): Comparison of sepal length (cm) across I. setosa, I. versicolor, and I. virginica.',
      code: 'vis violin\ndata\n  - category "I. setosa"\n    value 5.1\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 4.7\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 4.4\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.3\n  - category "I. setosa"\n    value 5.8\n  - category "I. versicolor"\n    value 7.0\n  - category "I. versicolor"\n    value 6.4\n  - category "I. versicolor"\n    value 6.9\n  - category "I. versicolor"\n    value 5.5\n  - category "I. versicolor"\n    value 6.5\n  - category "I. versicolor"\n    value 5.7\n  - category "I. versicolor"\n    value 6.3\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 6.6\n  - category "I. versicolor"\n    value 5.2\n  - category "I. versicolor"\n    value 5.0\n  - category "I. versicolor"\n    value 5.9\n  - category "I. versicolor"\n    value 6.0\n  - category "I. versicolor"\n    value 6.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 7.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 7.6\n  - category "I. virginica"\n    value 4.9\n  - category "I. virginica"\n    value 7.3\n  - category "I. virginica"\n    value 6.7\n  - category "I. virginica"\n    value 7.2\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 6.4\n  - category "I. virginica"\n    value 6.8\n  - category "I. virginica"\n    value 5.7\ntitle "Iris Sepal Length Distribution"\naxisYTitle "Sepal Length (cm)"',
    },
    {
      title:
        'Temperature Distribution of Four Cities: Beijing, Shanghai, Guangzhou, Harbin (30 samples each), Custom Colors',
      description:
        'Temperature Distribution of Four Cities: Beijing, Shanghai, Guangzhou, Harbin (30 samples each)',
      code: 'vis violin\ndata\n  - category Beijing\n    value -2\n  - category Beijing\n    value 5\n  - category Beijing\n    value 15\n  - category Beijing\n    value 25\n  - category Beijing\n    value 30\n  - category Beijing\n    value 28\n  - category Beijing\n    value 20\n  - category Beijing\n    value 10\n  - category Beijing\n    value 0\n  - category Beijing\n    value -5\n  - category Beijing\n    value 8\n  - category Beijing\n    value 18\n  - category Beijing\n    value 26\n  - category Beijing\n    value 32\n  - category Beijing\n    value 22\n  - category Beijing\n    value 12\n  - category Beijing\n    value 3\n  - category Beijing\n    value -3\n  - category Beijing\n    value 16\n  - category Beijing\n    value 27\n  - category Beijing\n    value 29\n  - category Beijing\n    value 14\n  - category Beijing\n    value 6\n  - category Beijing\n    value -1\n  - category Beijing\n    value 24\n  - category Beijing\n    value 19\n  - category Beijing\n    value 9\n  - category Beijing\n    value 1\n  - category Beijing\n    value 31\n  - category Beijing\n    value 21\n  - category Shanghai\n    value 5\n  - category Shanghai\n    value 10\n  - category Shanghai\n    value 18\n  - category Shanghai\n    value 25\n  - category Shanghai\n    value 30\n  - category Shanghai\n    value 28\n  - category Shanghai\n    value 22\n  - category Shanghai\n    value 15\n  - category Shanghai\n    value 8\n  - category Shanghai\n    value 2\n  - category Shanghai\n    value 12\n  - category Shanghai\n    value 20\n  - category Shanghai\n    value 27\n  - category Shanghai\n    value 32\n  - category Shanghai\n    value 24\n  - category Shanghai\n    value 16\n  - category Shanghai\n    value 7\n  - category Shanghai\n    value 3\n  - category Shanghai\n    value 19\n  - category Shanghai\n    value 26\n  - category Shanghai\n    value 29\n  - category Shanghai\n    value 14\n  - category Shanghai\n    value 9\n  - category Shanghai\n    value 4\n  - category Shanghai\n    value 23\n  - category Shanghai\n    value 21\n  - category Shanghai\n    value 11\n  - category Shanghai\n    value 6\n  - category Shanghai\n    value 31\n  - category Shanghai\n    value 17\n  - category Guangzhou\n    value 15\n  - category Guangzhou\n    value 18\n  - category Guangzhou\n    value 22\n  - category Guangzhou\n    value 27\n  - category Guangzhou\n    value 30\n  - category Guangzhou\n    value 29\n  - category Guangzhou\n    value 25\n  - category Guangzhou\n    value 20\n  - category Guangzhou\n    value 16\n  - category Guangzhou\n    value 12\n  - category Guangzhou\n    value 19\n  - category Guangzhou\n    value 23\n  - category Guangzhou\n    value 28\n  - category Guangzhou\n    value 31\n  - category Guangzhou\n    value 26\n  - category Guangzhou\n    value 21\n  - category Guangzhou\n    value 17\n  - category Guangzhou\n    value 13\n  - category Guangzhou\n    value 24\n  - category Guangzhou\n    value 27\n  - category Guangzhou\n    value 30\n  - category Guangzhou\n    value 20\n  - category Guangzhou\n    value 16\n  - category Guangzhou\n    value 14\n  - category Guangzhou\n    value 25\n  - category Guangzhou\n    value 22\n  - category Guangzhou\n    value 18\n  - category Guangzhou\n    value 15\n  - category Guangzhou\n    value 32\n  - category Guangzhou\n    value 19\n  - category Harbin\n    value -18\n  - category Harbin\n    value -10\n  - category Harbin\n    value 0\n  - category Harbin\n    value 12\n  - category Harbin\n    value 22\n  - category Harbin\n    value 25\n  - category Harbin\n    value 18\n  - category Harbin\n    value 5\n  - category Harbin\n    value -8\n  - category Harbin\n    value -20\n  - category Harbin\n    value -5\n  - category Harbin\n    value 8\n  - category Harbin\n    value 15\n  - category Harbin\n    value 24\n  - category Harbin\n    value 20\n  - category Harbin\n    value 2\n  - category Harbin\n    value -12\n  - category Harbin\n    value -15\n  - category Harbin\n    value 10\n  - category Harbin\n    value 23\n  - category Harbin\n    value 26\n  - category Harbin\n    value 16\n  - category Harbin\n    value -3\n  - category Harbin\n    value -8\n  - category Harbin\n    value -22\n  - category Harbin\n    value 14\n  - category Harbin\n    value 6\n  - category Harbin\n    value -2\n  - category Harbin\n    value 19\n  - category Harbin\n    value 21\n  - category Harbin\n    value 3\ntitle "Four-City Temperature Distribution"\naxisYTitle "Temperature (°C)"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Crop Yield Distribution: Rice, Wheat, Corn (25 samples each), Custom Palette',
      description: 'Crop Yield Distribution: Rice, Wheat, Corn (25 samples each)',
      code: 'vis violin\ndata\n  - category Rice\n    value 680\n  - category Rice\n    value 720\n  - category Rice\n    value 750\n  - category Rice\n    value 690\n  - category Rice\n    value 710\n  - category Rice\n    value 760\n  - category Rice\n    value 700\n  - category Rice\n    value 730\n  - category Rice\n    value 670\n  - category Rice\n    value 740\n  - category Rice\n    value 690\n  - category Rice\n    value 720\n  - category Rice\n    value 770\n  - category Rice\n    value 680\n  - category Rice\n    value 710\n  - category Rice\n    value 750\n  - category Rice\n    value 660\n  - category Rice\n    value 730\n  - category Rice\n    value 700\n  - category Rice\n    value 760\n  - category Rice\n    value 690\n  - category Rice\n    value 720\n  - category Rice\n    value 740\n  - category Rice\n    value 680\n  - category Rice\n    value 710\n  - category Wheat\n    value 520\n  - category Wheat\n    value 550\n  - category Wheat\n    value 580\n  - category Wheat\n    value 510\n  - category Wheat\n    value 540\n  - category Wheat\n    value 590\n  - category Wheat\n    value 530\n  - category Wheat\n    value 560\n  - category Wheat\n    value 500\n  - category Wheat\n    value 570\n  - category Wheat\n    value 520\n  - category Wheat\n    value 550\n  - category Wheat\n    value 600\n  - category Wheat\n    value 510\n  - category Wheat\n    value 540\n  - category Wheat\n    value 580\n  - category Wheat\n    value 490\n  - category Wheat\n    value 560\n  - category Wheat\n    value 530\n  - category Wheat\n    value 590\n  - category Wheat\n    value 510\n  - category Wheat\n    value 550\n  - category Wheat\n    value 570\n  - category Wheat\n    value 500\n  - category Wheat\n    value 540\n  - category Corn\n    value 620\n  - category Corn\n    value 660\n  - category Corn\n    value 700\n  - category Corn\n    value 610\n  - category Corn\n    value 650\n  - category Corn\n    value 710\n  - category Corn\n    value 630\n  - category Corn\n    value 670\n  - category Corn\n    value 600\n  - category Corn\n    value 680\n  - category Corn\n    value 620\n  - category Corn\n    value 660\n  - category Corn\n    value 720\n  - category Corn\n    value 610\n  - category Corn\n    value 650\n  - category Corn\n    value 700\n  - category Corn\n    value 590\n  - category Corn\n    value 670\n  - category Corn\n    value 640\n  - category Corn\n    value 710\n  - category Corn\n    value 620\n  - category Corn\n    value 660\n  - category Corn\n    value 690\n  - category Corn\n    value 600\n  - category Corn\n    value 650\ntitle "Crop Yield Distribution"\naxisYTitle "Yield (kg/acre)"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
