import { TrendingDown } from 'lucide-react';
export const waterfallChartData = {
  id: 'waterfall-chart',
  name: 'Waterfall Chart',
  icon: TrendingDown,
  galleryDsl:
    'vis waterfall\ndata\n  - category Q1\n    value 120000000\n  - category Q2\n    value 569000000\n  - category Q3\n    value 231000000\n  - category Q4\n    value 185000000\n  - category Total\n    isTotal true\ntitle "Quarterly Revenue Waterfall"',
  galleryJson: {
    type: 'waterfall',
    data: [
      { category: 'Q1', value: 120000000 },
      { category: 'Q2', value: 569000000 },
      { category: 'Q3', value: 231000000 },
      { category: 'Q4', value: 185000000 },
      { category: 'Total', isTotal: true },
    ],
    title: 'Quarterly Revenue Waterfall',
  },
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
            valueType: 'string',
            description: 'Value must be "waterfall".',
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
            description: 'Step name or category name.',
          },
          {
            property: 'data.value',
            type: 'optional',
            valueType: 'number',
            description:
              'Increase or decrease for the step (positive for increase, negative for decrease).',
          },
          {
            property: 'data.isIntermediateTotal',
            type: 'optional',
            valueType: 'boolean',
            description: 'Whether this is an intermediate total bar, default is false.',
          },
          {
            property: 'data.isTotal',
            type: 'optional',
            valueType: 'boolean',
            description: 'Whether this is a total bar, default is false.',
          },
          {
            property: 'title',
            type: 'optional',
            valueType: 'string',
            description: 'Chart title.',
          },
          {
            property: 'axisXTitle',
            type: 'optional',
            valueType: 'string',
            description: 'X-axis title.',
          },
          {
            property: 'axisYTitle',
            type: 'optional',
            valueType: 'string',
            description: 'Y-axis title.',
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
            description:
              'Order is [positive color, negative color, total color], default is ["#FF4D4F", "#2EBB59", "#1783FF"].',
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
      json: {
        type: 'waterfall',
        data: [
          { category: 'Q1', value: 120000000 },
          { category: 'Q2', value: 569000000 },
          { category: 'Q3', value: 231000000 },
          { category: 'Q1-Q3 Subtotal', isIntermediateTotal: true },
          { category: 'Q4', value: 185000000 },
          { category: 'Adjustments', value: -142000000 },
          { category: 'Grand Total', isTotal: true },
        ],
        title: 'Quarterly Revenue Waterfall',
      },
      dsl: 'vis waterfall\ndata\n  - category "Q1"\n    value 120000000\n  - category "Q2"\n    value 569000000\n  - category "Q3"\n    value 231000000\n  - category "Q1-Q3 Subtotal"\n    isIntermediateTotal true\n  - category "Q4"\n    value 185000000\n  - category "Adjustments"\n    value -142000000\n  - category "Grand Total"\n    isTotal true\ntitle "Quarterly Revenue Waterfall"',
    },
    {
      title:
        'Annual Expense Change Analysis: 8 expense items, labor costs and R&D investment as major increases, includes annual total, custom colors',
      description:
        'Annual Expense Change Analysis: 8 expense items, labor costs and R&D investment as major increases, includes annual total',
      json: {
        type: 'waterfall',
        data: [
          { category: 'Labor Costs', value: 380 },
          { category: 'R&D Investment', value: 250 },
          { category: 'Marketing Expenses', value: -80 },
          { category: 'Administrative Expenses', value: -45 },
          { category: 'Equipment Procurement', value: 120 },
          { category: 'Training Expenses', value: 60 },
          { category: 'Travel Expenses', value: -35 },
          { category: 'Other', value: 20 },
          { category: 'Annual Total', isTotal: true },
        ],
        title: 'Annual Expense Change Analysis',
        axisXTitle: 'Expense Items',
        axisYTitle: 'Amount (10K CNY)',
        style: { palette: ['#A855F7', '#38BDF8', '#34D399'], backgroundColor: '#f8f7ff' },
      },
      dsl: 'vis waterfall\ndata\n  - category "Labor Costs"\n    value 380\n  - category "R&D Investment"\n    value 250\n  - category "Marketing Expenses"\n    value -80\n  - category "Administrative Expenses"\n    value -45\n  - category "Equipment Procurement"\n    value 120\n  - category "Training Expenses"\n    value 60\n  - category "Travel Expenses"\n    value -35\n  - category "Other"\n    value 20\n  - category "Annual Total"\n    isTotal true\ntitle "Annual Expense Change Analysis"\naxisXTitle "Expense Items"\naxisYTitle "Amount (10K CNY)"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title:
        'Quarterly Revenue Change Waterfall: 4 quarters of revenue vs. cost comparison, with quarterly profit subtotals and annual net profit total, custom palette',
      description:
        'Quarterly Revenue Change Waterfall: 4 quarters of revenue vs. cost comparison, with quarterly profit subtotals and annual net profit total',
      json: {
        type: 'waterfall',
        data: [
          { category: 'Q1 Revenue', value: 850 },
          { category: 'Q1 Cost', value: -520 },
          { category: 'Q1 Profit', isIntermediateTotal: true },
          { category: 'Q2 Revenue', value: 920 },
          { category: 'Q2 Cost', value: -480 },
          { category: 'Q2 Profit', isIntermediateTotal: true },
          { category: 'Q3 Revenue', value: 780 },
          { category: 'Q3 Cost', value: -450 },
          { category: 'Q3 Profit', isIntermediateTotal: true },
          { category: 'Q4 Revenue', value: 1100 },
          { category: 'Q4 Cost', value: -550 },
          { category: 'Q4 Profit', isIntermediateTotal: true },
          { category: 'Annual Net Profit', isTotal: true },
        ],
        title: 'Quarterly Revenue Change Waterfall',
        axisXTitle: 'Quarter',
        axisYTitle: 'Amount (10K CNY)',
        theme: 'academy',
        style: { palette: ['#C45B42', '#7D8C6E', '#D4A373'], backgroundColor: '#FBF8F4' },
      },
      dsl: 'vis waterfall\ndata\n  - category "Q1 Revenue"\n    value 850\n  - category "Q1 Cost"\n    value -520\n  - category "Q1 Profit"\n    isIntermediateTotal true\n  - category "Q2 Revenue"\n    value 920\n  - category "Q2 Cost"\n    value -480\n  - category "Q2 Profit"\n    isIntermediateTotal true\n  - category "Q3 Revenue"\n    value 780\n  - category "Q3 Cost"\n    value -450\n  - category "Q3 Profit"\n    isIntermediateTotal true\n  - category "Q4 Revenue"\n    value 1100\n  - category "Q4 Cost"\n    value -550\n  - category "Q4 Profit"\n    isIntermediateTotal true\n  - category "Annual Net Profit"\n    isTotal true\ntitle "Quarterly Revenue Change Waterfall"\naxisXTitle "Quarter"\naxisYTitle "Amount (10K CNY)"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
