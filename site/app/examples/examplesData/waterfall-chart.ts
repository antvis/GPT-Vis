import { TrendingDown } from 'lucide-react';
export const waterfallChartData = {
  id: 'waterfall-chart',
  name: 'Waterfall Chart',
  icon: TrendingDown,
  galleryExamples:
    'vis waterfall\ndata\n  - category "Q1"\n    value 120000000\n  - category "Q2"\n    value 569000000\n  - category "Q3"\n    value 231000000\n  - category "Q1-Q3 Subtotal"\n    isIntermediateTotal true\n  - category "Q4"\n    value 185000000\n  - category "Adjustments"\n    value -142000000\n  - category "Grand Total"\n    isTotal true',
  description:
    'A waterfall chart visualizes the incremental changes from a starting value to an ending result, clearly breaking down positive and negative contributions. By showing an initial value, multiple increases and decreases, and a final total, it helps analyze the impact of each step on the overall result. It is commonly used in financial statements, budget comparisons, and phased metric breakdowns.',
  knowledge: {
    introduction:
      'A waterfall chart visualizes the incremental changes from a starting value to an ending result, clearly breaking down positive and negative contributions. By showing an initial value, multiple increases and decreases, and a final total, it helps analyze the impact of each step on the overall result. It is commonly used in financial statements, budget comparisons, and phased metric breakdowns.',
    useCases: [
      'Show the incremental increases and decreases in financial data such as revenue and costs',
      'Compare budget vs. actuals and analyze the contribution of each variance',
      'Display phased changes in project progress or key metrics',
      'Analyze the impact of channels, regions, or departments on overall metrics',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: 'Chart type, required, string type, value must be "waterfall"',
          },
          {
            property: 'data',
            type: 'required',
            description: 'Chart data, required, array type, each element contains:',
          },
          {
            property: 'data.category',
            type: 'required',
            description: 'Step name or category name, required, string type',
          },
          {
            property: 'data.value',
            type: 'optional',
            description:
              'Increase or decrease for the step, optional, numeric type (positive for increase, negative for decrease)',
          },
          {
            property: 'data.isIntermediateTotal',
            type: 'optional',
            description:
              'Whether this is an intermediate total bar, optional, boolean type, default is false',
          },
          {
            property: 'data.isTotal',
            type: 'optional',
            description: 'Whether this is a total bar, optional, boolean type, default is false',
          },
          {
            property: 'title',
            type: 'optional',
            description: 'Chart title, optional, string type.',
          },
          {
            property: 'axisXTitle',
            type: 'optional',
            description: 'X-axis title, optional, string type.',
          },
          {
            property: 'axisYTitle',
            type: 'optional',
            description: 'Y-axis title, optional, string type.',
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
              'Palette array, optional, array type, order is [positive color, negative color, total color], default is ["#FF4D4F", "#2EBB59", "#1783FF"].',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        'Quarterly Revenue Waterfall: Shows revenue changes across quarters with Q1-Q3 subtotal and year-end adjustments.',
      description:
        'Quarterly Revenue Waterfall: Shows revenue changes across quarters with Q1-Q3 subtotal and year-end adjustments.',
      code: 'vis waterfall\ndata\n  - category "Q1"\n    value 120000000\n  - category "Q2"\n    value 569000000\n  - category "Q3"\n    value 231000000\n  - category "Q1-Q3 Subtotal"\n    isIntermediateTotal true\n  - category "Q4"\n    value 185000000\n  - category "Adjustments"\n    value -142000000\n  - category "Grand Total"\n    isTotal true\ntitle "Quarterly Revenue Waterfall"',
    },
    {
      title:
        'Annual Expense Change Analysis: 8 expense items, labor costs and R&D investment as major increases, includes annual total, custom colors',
      description:
        'Annual Expense Change Analysis: 8 expense items, labor costs and R&D investment as major increases, includes annual total',
      code: 'vis waterfall\ndata\n  - category "Labor Costs"\n    value 380\n  - category "R&D Investment"\n    value 250\n  - category "Marketing Expenses"\n    value -80\n  - category "Administrative Expenses"\n    value -45\n  - category "Equipment Procurement"\n    value 120\n  - category "Training Expenses"\n    value 60\n  - category "Travel Expenses"\n    value -35\n  - category "Other"\n    value 20\n  - category "Annual Total"\n    isTotal true\ntitle "Annual Expense Change Analysis"\naxisXTitle "Expense Items"\naxisYTitle "Amount (10K CNY)"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title:
        'Quarterly Revenue Change Waterfall: 4 quarters of revenue vs. cost comparison, with quarterly profit subtotals and annual net profit total, custom palette',
      description:
        'Quarterly Revenue Change Waterfall: 4 quarters of revenue vs. cost comparison, with quarterly profit subtotals and annual net profit total',
      code: 'vis waterfall\ndata\n  - category "Q1 Revenue"\n    value 850\n  - category "Q1 Cost"\n    value -520\n  - category "Q1 Profit"\n    isIntermediateTotal true\n  - category "Q2 Revenue"\n    value 920\n  - category "Q2 Cost"\n    value -480\n  - category "Q2 Profit"\n    isIntermediateTotal true\n  - category "Q3 Revenue"\n    value 780\n  - category "Q3 Cost"\n    value -450\n  - category "Q3 Profit"\n    isIntermediateTotal true\n  - category "Q4 Revenue"\n    value 1100\n  - category "Q4 Cost"\n    value -550\n  - category "Q4 Profit"\n    isIntermediateTotal true\n  - category "Annual Net Profit"\n    isTotal true\ntitle "Quarterly Revenue Change Waterfall"\naxisXTitle "Quarter"\naxisYTitle "Amount (10K CNY)"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
