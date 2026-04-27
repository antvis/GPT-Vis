import { BarChart3 } from 'lucide-react';

export const histogramData = {
  id: 'histogram',
  name: 'Histogram',
  icon: BarChart3,
  galleryExamples:
    'vis histogram\ndata\n  - 68\n  - 72\n  - 85\n  - 56\n  - 91\n  - 74\n  - 63\n  - 88\n  - 79\n  - 67\n  - 82\n  - 95\n  - 58\n  - 76\n  - 84\n  - 71\n  - 93\n  - 65\n  - 78\n  - 87\n  - 52\n  - 73\n  - 81\n  - 69\n  - 90\n  - 62\n  - 75\n  - 86\n  - 59\n  - 77\n  - 83\n  - 70\n  - 94\n  - 66\n  - 80\n  - 89\n  - 55\n  - 72\n  - 85\n  - 64\n  - 92\n  - 68\n  - 76\n  - 83\n  - 57\n  - 88\n  - 74\n  - 81\n  - 67\n  - 95\n  - 61\n  - 79\n  - 86\n  - 53\n  - 91\n  - 70\n  - 78\n  - 84\n  - 63\n  - 87\n  - 75\n  - 82\n  - 69\n  - 93\n  - 58\n  - 73\n  - 80\n  - 66\n  - 89\n  - 54\n  - 77\n  - 85\n  - 62\n  - 90\n  - 71\n  - 79\n  - 83\n  - 65\n  - 94\n  - 60\n  - 76\n  - 88\n  - 56\n  - 92\n  - 68\n  - 81\n  - 74\n  - 86\n  - 64\n  - 78\n  - 84\n  - 72\n  - 87\n  - 59\n  - 75\n  - 82\n  - 67\n  - 91\n  - 55\n  - 80\n  - 85\n  - 63\n  - 89\n  - 70\n  - 77\n  - 83\n  - 66\n  - 93\n  - 61\n  - 79\n  - 88\n  - 57\n  - 90\n  - 73\n  - 82\n  - 68\n  - 86\n  - 54\n  - 76\n  - 84\n  - 62\n  - 95\n  - 69\n  - 78\n  - 81\n  - 65\n  - 87\n  - 58\n  - 74\n  - 83\n  - 71\n  - 92\n  - 60\n  - 80\n  - 85\n  - 67\n  - 89\n  - 53\n  - 77\n  - 82\n  - 64\n  - 91\n  - 72\n  - 79\n  - 86\n  - 56\n  - 94\n  - 68\n  - 75\n  - 83\n  - 63\n  - 88\n  - 70\n  - 81\n  - 85\n  - 59\n  - 90\n  - 66\n  - 78\n  - 84\n  - 74\n  - 87\n  - 55\n  - 76\n  - 82\n  - 62\n  - 93\n  - 69\n  - 80\n  - 86\n  - 65\n  - 89\n  - 51\n  - 73\n  - 83\n  - 71\n  - 92\n  - 60\n  - 79\n  - 85\n  - 67\n  - 88\n  - 57\n  - 77\n  - 81\n  - 64\n  - 91\n  - 72\n  - 78\n  - 84\n  - 68\n  - 86\n  - 54\n  - 75\n  - 82\n  - 63\n  - 90\n  - 70\n  - 80\n  - 87\n  - 59\n  - 94\n  - 66\n  - 76\n  - 83\n  - 61\n  - 89\n  - 52\n  - 74\n  - 85\n  - 67\n  - 93\n  - 58\n  - 79\n  - 81\n  - 65\n  - 88\n  - 73\n  - 78\n  - 84\n  - 69\n  - 91\n  - 55\n  - 82\n  - 86\n  - 62\n  - 77\n  - 71\n  - 80\n  - 83\n  - 64\n  - 90\n  - 68\n  - 76\n  - 85\n  - 56\n  - 87\n  - 72\n  - 79\n  - 82\n  - 63\n  - 95\nbinNumber 10\ntitle "Student Exam Score Distribution"\naxisXTitle Score\naxisYTitle Count',
  description:
    'A histogram is a chart that displays data distribution, using bars to represent the frequency of data points within a certain range. The height (or length) of each bar represents the number of data points falling within a specific interval, the X-axis represents the range of data values, and the Y-axis represents the frequency or count. Histograms are primarily used to represent the distribution of continuous variables and help analyze the central tendency, dispersion, and shape of data. The difference between a histogram and a bar chart: a histogram reflects data distribution, while a bar chart only compares values. In terms of data structure, a bar chart requires a categorical variable that is discrete (e.g., Class 1, Class 2, Class 3), so there are gaps between bars. But histogram data consists of continuous numerical variables (e.g., scores), so there are no gaps between bars.',
  knowledge: {
    introduction:
      'A histogram is a chart that displays data distribution, using bars to represent the frequency of data points within a certain range. The height (or length) of each bar represents the number of data points falling within a specific interval, the X-axis represents the range of data values, and the Y-axis represents the frequency or count. Histograms are primarily used to represent the distribution of continuous variables and help analyze the central tendency, dispersion, and shape of data. The difference between a histogram and a bar chart: a histogram reflects data distribution, while a bar chart only compares values. In terms of data structure, a bar chart requires a categorical variable that is discrete (e.g., Class 1, Class 2, Class 3), so there are gaps between bars. But histogram data consists of continuous numerical variables (e.g., scores), so there are no gaps between bars.',
    useCases: [
      'Observe data distribution patterns, such as normal distribution, skewed distribution, etc.',
      'Identify central regions and extreme values in data, helping analyze data variability and centrality.',
      'Process continuous data by dividing it into multiple intervals and counting the frequency of each interval.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: 'Chart type, required, string type, value must be "histogram".',
          },
          {
            property: 'data',
            type: 'required',
            description: 'Chart data, required, array of numeric type.',
          },
          {
            property: 'binNumber',
            type: 'optional',
            description:
              'Number of intervals, optional, numeric type, used to define the number of bins in the histogram.',
          },
          {
            property: 'title',
            type: 'optional',
            description:
              'Chart title, optional, string type, used to define the histogram chart title.',
          },
          {
            property: 'axisXTitle',
            type: 'optional',
            description: 'X-axis title text, optional, string type.',
          },
          {
            property: 'axisYTitle',
            type: 'optional',
            description: 'Y-axis title text, optional, string type.',
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
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Distribution of 200 students exam scores (normal distribution)',
      description: 'Distribution of 200 students exam scores (normal distribution)',
      code: 'vis histogram\ndata\n  - 68\n  - 72\n  - 85\n  - 56\n  - 91\n  - 74\n  - 63\n  - 88\n  - 79\n  - 67\n  - 82\n  - 95\n  - 58\n  - 76\n  - 84\n  - 71\n  - 93\n  - 65\n  - 78\n  - 87\n  - 52\n  - 73\n  - 81\n  - 69\n  - 90\n  - 62\n  - 75\n  - 86\n  - 59\n  - 77\n  - 83\n  - 70\n  - 94\n  - 66\n  - 80\n  - 89\n  - 55\n  - 72\n  - 85\n  - 64\n  - 92\n  - 68\n  - 76\n  - 83\n  - 57\n  - 88\n  - 74\n  - 81\n  - 67\n  - 95\n  - 61\n  - 79\n  - 86\n  - 53\n  - 91\n  - 70\n  - 78\n  - 84\n  - 63\n  - 87\n  - 75\n  - 82\n  - 69\n  - 93\n  - 58\n  - 73\n  - 80\n  - 66\n  - 89\n  - 54\n  - 77\n  - 85\n  - 62\n  - 90\n  - 71\n  - 79\n  - 83\n  - 65\n  - 94\n  - 60\n  - 76\n  - 88\n  - 56\n  - 92\n  - 68\n  - 81\n  - 74\n  - 86\n  - 64\n  - 78\n  - 84\n  - 72\n  - 87\n  - 59\n  - 75\n  - 82\n  - 67\n  - 91\n  - 55\n  - 80\n  - 85\n  - 63\n  - 89\n  - 70\n  - 77\n  - 83\n  - 66\n  - 93\n  - 61\n  - 79\n  - 88\n  - 57\n  - 90\n  - 73\n  - 82\n  - 68\n  - 86\n  - 54\n  - 76\n  - 84\n  - 62\n  - 95\n  - 69\n  - 78\n  - 81\n  - 65\n  - 87\n  - 58\n  - 74\n  - 83\n  - 71\n  - 92\n  - 60\n  - 80\n  - 85\n  - 67\n  - 89\n  - 53\n  - 77\n  - 82\n  - 64\n  - 91\n  - 72\n  - 79\n  - 86\n  - 56\n  - 94\n  - 68\n  - 75\n  - 83\n  - 63\n  - 88\n  - 70\n  - 81\n  - 85\n  - 59\n  - 90\n  - 66\n  - 78\n  - 84\n  - 74\n  - 87\n  - 55\n  - 76\n  - 82\n  - 62\n  - 93\n  - 69\n  - 80\n  - 86\n  - 65\n  - 89\n  - 51\n  - 73\n  - 83\n  - 71\n  - 92\n  - 60\n  - 79\n  - 85\n  - 67\n  - 88\n  - 57\n  - 77\n  - 81\n  - 64\n  - 91\n  - 72\n  - 78\n  - 84\n  - 68\n  - 86\n  - 54\n  - 75\n  - 82\n  - 63\n  - 90\n  - 70\n  - 80\n  - 87\n  - 59\n  - 94\n  - 66\n  - 76\n  - 83\n  - 61\n  - 89\n  - 52\n  - 74\n  - 85\n  - 67\n  - 93\n  - 58\n  - 79\n  - 81\n  - 65\n  - 88\n  - 73\n  - 78\n  - 84\n  - 69\n  - 91\n  - 55\n  - 82\n  - 86\n  - 62\n  - 77\n  - 71\n  - 80\n  - 83\n  - 64\n  - 90\n  - 68\n  - 76\n  - 85\n  - 56\n  - 87\n  - 72\n  - 79\n  - 82\n  - 63\n  - 95\nbinNumber 10\ntitle "Student Exam Score Distribution"\naxisXTitle Score\naxisYTitle Count',
    },
    {
      title: 'Product weight distribution (150 samples), custom colors',
      description: 'Product weight distribution (150 samples)',
      code: 'vis histogram\ndata\n  - 485\n  - 492\n  - 501\n  - 508\n  - 497\n  - 515\n  - 489\n  - 503\n  - 495\n  - 510\n  - 482\n  - 498\n  - 506\n  - 491\n  - 518\n  - 487\n  - 504\n  - 496\n  - 512\n  - 480\n  - 499\n  - 507\n  - 493\n  - 516\n  - 484\n  - 502\n  - 494\n  - 511\n  - 486\n  - 505\n  - 497\n  - 513\n  - 481\n  - 500\n  - 509\n  - 490\n  - 517\n  - 483\n  - 501\n  - 495\n  - 514\n  - 488\n  - 506\n  - 492\n  - 510\n  - 479\n  - 498\n  - 504\n  - 489\n  - 519\n  - 485\n  - 503\n  - 496\n  - 512\n  - 482\n  - 500\n  - 508\n  - 491\n  - 515\n  - 487\n  - 505\n  - 494\n  - 511\n  - 483\n  - 502\n  - 497\n  - 513\n  - 486\n  - 507\n  - 493\n  - 518\n  - 480\n  - 499\n  - 505\n  - 490\n  - 516\n  - 484\n  - 503\n  - 495\n  - 510\n  - 488\n  - 501\n  - 509\n  - 492\n  - 514\n  - 481\n  - 498\n  - 506\n  - 494\n  - 512\n  - 485\n  - 504\n  - 496\n  - 511\n  - 483\n  - 500\n  - 507\n  - 491\n  - 517\n  - 487\n  - 502\n  - 495\n  - 513\n  - 479\n  - 499\n  - 508\n  - 490\n  - 515\n  - 482\n  - 505\n  - 493\n  - 510\n  - 486\n  - 503\n  - 497\n  - 512\n  - 484\n  - 501\n  - 509\n  - 494\n  - 516\n  - 488\n  - 506\n  - 492\n  - 514\n  - 480\n  - 498\n  - 504\n  - 491\n  - 518\n  - 485\n  - 502\n  - 496\n  - 511\n  - 483\n  - 500\n  - 507\n  - 489\n  - 513\n  - 487\n  - 505\n  - 495\n  - 510\n  - 481\n  - 499\n  - 508\n  - 493\n  - 517\n  - 484\n  - 503\n  - 497\n  - 512\n  - 486\n  - 501\n  - 506\n  - 490\n  - 515\n  - 482\n  - 504\n  - 494\n  - 509\n  - 488\n  - 500\n  - 507\n  - 491\n  - 514\n  - 485\n  - 502\n  - 496\n  - 511\n  - 479\n  - 498\n  - 505\n  - 493\n  - 516\n  - 483\n  - 503\n  - 497\n  - 510\n  - 487\n  - 508\n  - 492\n  - 513\n  - 480\n  - 499\n  - 504\n  - 490\n  - 518\n  - 484\n  - 501\n  - 495\n  - 512\n  - 486\n  - 506\n  - 494\n  - 509\n  - 482\n  - 500\n  - 507\n  - 491\n  - 515\n  - 488\n  - 503\n  - 496\n  - 511\n  - 485\n  - 502\n  - 498\n  - 514\n  - 481\n  - 505\n  - 493\n  - 510\n  - 487\n  - 508\n  - 497\n  - 512\n  - 483\n  - 499\n  - 504\n  - 490\n  - 517\n  - 486\n  - 501\n  - 495\n  - 509\n  - 479\n  - 506\n  - 492\n  - 513\n  - 484\n  - 500\n  - 507\n  - 494\n  - 516\n  - 488\n  - 503\n  - 496\n  - 511\n  - 482\n  - 498\n  - 505\n  - 491\n  - 515\n  - 485\n  - 502\n  - 497\n  - 510\nbinNumber 15\ntitle "Product Weight Distribution"\naxisXTitle "Weight (g)"\naxisYTitle Frequency\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Bimodal distribution data, custom colors',
      description: 'Bimodal distribution data',
      code: 'vis histogram\ndata\n  - 32\n  - 35\n  - 38\n  - 33\n  - 36\n  - 40\n  - 34\n  - 37\n  - 31\n  - 39\n  - 35\n  - 33\n  - 36\n  - 38\n  - 34\n  - 37\n  - 32\n  - 40\n  - 35\n  - 39\n  - 33\n  - 36\n  - 38\n  - 34\n  - 37\n  - 31\n  - 35\n  - 40\n  - 32\n  - 36\n  - 39\n  - 33\n  - 37\n  - 34\n  - 38\n  - 35\n  - 41\n  - 30\n  - 36\n  - 33\n  - 37\n  - 34\n  - 39\n  - 32\n  - 35\n  - 38\n  - 36\n  - 40\n  - 31\n  - 37\n  - 72\n  - 75\n  - 78\n  - 73\n  - 76\n  - 80\n  - 74\n  - 77\n  - 71\n  - 79\n  - 75\n  - 73\n  - 76\n  - 78\n  - 74\n  - 77\n  - 72\n  - 80\n  - 75\n  - 79\n  - 73\n  - 76\n  - 78\n  - 74\n  - 77\n  - 71\n  - 75\n  - 80\n  - 72\n  - 76\n  - 79\n  - 73\n  - 77\n  - 74\n  - 78\n  - 75\n  - 81\n  - 70\n  - 76\n  - 73\n  - 77\n  - 74\n  - 79\n  - 72\n  - 75\n  - 78\n  - 76\n  - 80\n  - 71\n  - 77\n  - 50\n  - 55\n  - 60\n  - 45\n  - 52\n  - 58\n  - 48\n  - 54\n  - 62\n  - 46\n  - 53\n  - 57\n  - 49\n  - 56\n  - 61\n  - 47\n  - 51\n  - 59\n  - 44\n  - 63\n  - 32\n  - 35\n  - 38\n  - 34\n  - 37\n  - 36\n  - 33\n  - 39\n  - 31\n  - 40\n  - 35\n  - 37\n  - 34\n  - 38\n  - 36\n  - 32\n  - 39\n  - 33\n  - 41\n  - 30\n  - 72\n  - 75\n  - 78\n  - 74\n  - 77\n  - 76\n  - 73\n  - 79\n  - 71\n  - 80\n  - 75\n  - 77\n  - 74\n  - 78\n  - 76\n  - 72\n  - 79\n  - 73\n  - 81\n  - 70\n  - 35\n  - 38\n  - 34\n  - 36\n  - 33\n  - 39\n  - 37\n  - 40\n  - 32\n  - 31\n  - 36\n  - 38\n  - 34\n  - 37\n  - 35\n  - 33\n  - 39\n  - 40\n  - 32\n  - 36\n  - 75\n  - 78\n  - 74\n  - 76\n  - 73\n  - 79\n  - 77\n  - 80\n  - 72\n  - 71\n  - 76\n  - 78\n  - 74\n  - 77\n  - 75\n  - 73\n  - 79\n  - 80\n  - 72\n  - 76\n  - 50\n  - 55\n  - 60\n  - 48\n  - 53\n  - 57\n  - 46\n  - 52\n  - 58\n  - 49\n  - 54\n  - 62\n  - 47\n  - 56\n  - 61\n  - 51\n  - 59\n  - 45\n  - 63\n  - 44\n  - 35\n  - 37\n  - 34\n  - 38\n  - 36\n  - 33\n  - 39\n  - 40\n  - 32\n  - 31\n  - 36\n  - 35\n  - 37\n  - 34\n  - 38\n  - 33\n  - 39\n  - 41\n  - 30\n  - 40\n  - 75\n  - 77\n  - 74\n  - 78\n  - 76\n  - 73\n  - 79\n  - 80\n  - 72\n  - 71\n  - 76\n  - 75\n  - 77\n  - 74\n  - 78\n  - 73\n  - 79\n  - 81\n  - 70\n  - 80\n  - 50\n  - 52\n  - 58\n  - 48\n  - 55\n  - 60\n  - 46\n  - 53\n  - 57\n  - 49\n  - 54\n  - 62\n  - 47\n  - 51\n  - 59\n  - 45\n  - 56\n  - 61\n  - 44\n  - 63\n  - 35\n  - 34\n  - 38\n  - 36\n  - 37\n  - 33\n  - 39\n  - 40\n  - 32\n  - 31\n  - 36\n  - 35\n  - 37\n  - 34\n  - 38\n  - 36\n  - 39\n  - 41\n  - 30\n  - 40\n  - 33\n  - 75\n  - 74\n  - 78\n  - 76\n  - 77\n  - 73\n  - 79\n  - 80\n  - 72\n  - 71\n  - 76\n  - 75\n  - 77\n  - 74\n  - 78\n  - 76\n  - 79\n  - 81\n  - 70\n  - 80\n  - 73\n  - 50\n  - 55\n  - 58\n  - 48\n  - 52\n  - 60\n  - 46\n  - 53\n  - 57\n  - 49\n  - 54\n  - 62\n  - 47\n  - 51\n  - 59\n  - 45\n  - 56\n  - 61\n  - 44\n  - 63\nbinNumber 20\ntitle "Bimodal Distribution Data"\naxisXTitle Value\naxisYTitle Frequency\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
