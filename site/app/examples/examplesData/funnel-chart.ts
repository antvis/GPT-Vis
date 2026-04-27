import { Filter } from 'lucide-react';

export const funnelChartData = {
  id: 'funnel-chart',
  name: 'Funnel Chart',
  icon: Filter,
  galleryExamples:
    'vis funnel\ndata\n  - category "Browse Products"\n    value 100\n  - category "Add to Cart"\n    value 45\n  - category "Complete Payment"\n    value 18',
  description:
    'A funnel chart is used to display the progressive loss or conversion of data across multiple stages. It typically uses a funnel shape to represent the data volume at each stage, wide at the top and narrow at the bottom, intuitively reflecting the quantity changes and conversion rates at each step. It is suitable for analyzing bottlenecks and optimization opportunities in processes.',
  knowledge: {
    introduction:
      'A funnel chart is used to display the progressive loss or conversion of data across multiple stages. It typically uses a funnel shape to represent the data volume at each stage, wide at the top and narrow at the bottom, intuitively reflecting the quantity changes and conversion rates at each step. It is suitable for analyzing bottlenecks and optimization opportunities in processes.',
    useCases: [
      'Used to display multi-stage data loss or conversion in sales processes, user conversion, event participation, etc.',
      'Suitable for highlighting the quantity distribution and conversion efficiency at each stage.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: 'Chart type, required, string type, value must be "funnel".',
          },
          {
            property: 'data',
            type: 'required',
            description:
              'Funnel chart data, required, array type, each item contains category (name) and value (numeric value).',
          },
          {
            property: 'data.category',
            type: 'required',
            description: 'Data name, required, string type.',
          },
          {
            property: 'data.value',
            type: 'required',
            description: 'Data value, required, numeric type.',
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
      title:
        'E-commerce user conversion funnel: from browsing products (100K) to confirming receipt (15K), analyzing conversion rates at each stage.',
      description:
        'E-commerce user conversion funnel: from browsing products (100K) to confirming receipt (15K), analyzing conversion rates at each stage.',
      code: 'vis funnel\ndata\n  - category "Browse Products"\n    value 100000\n  - category "Add to Cart"\n    value 45000\n  - category "Submit Order"\n    value 25000\n  - category "Complete Payment"\n    value 18000\n  - category "Confirm Receipt"\n    value 15000\ntitle "E-commerce User Conversion Funnel"',
    },
    {
      title:
        'SaaS product lifecycle funnel: from website visits (50K) to referrals (1,200), custom colors',
      description: 'SaaS product lifecycle funnel: from website visits (50K) to referrals (1,200)',
      code: 'vis funnel\ndata\n  - category "Website Visit"\n    value 50000\n  - category "Sign Up"\n    value 18000\n  - category "Activate Usage"\n    value 12000\n  - category "Paid Conversion"\n    value 5000\n  - category "Continuous Renewal"\n    value 3500\n  - category "Refer Others"\n    value 1200\ntitle "SaaS Product Lifecycle Funnel"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n    - "#FB923C"\n  backgroundColor "#f8f7ff"',
    },
    {
      title:
        'Recruitment process funnel: from resume submissions (2,800) to offers issued (65), custom colors',
      description:
        'Recruitment process funnel: from resume submissions (2,800) to offers issued (65)',
      code: 'vis funnel\ndata\n  - category "Submit Resume"\n    value 2800\n  - category "Initial Screening Pass"\n    value 850\n  - category "Written Test/Assessment"\n    value 420\n  - category "Interview Stage"\n    value 180\n  - category "Issue Offer"\n    value 65\ntitle "Recruitment Process Funnel"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
