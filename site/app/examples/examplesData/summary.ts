import { FileText } from 'lucide-react';

export const summaryData = {
  id: 'summary',
  name: 'Summary',
  icon: FileText,
  galleryExamples: `# Q4 Sales Report

  ## Overview
  Total [revenue](metric_name) reached [¥5,234,567](metric_value, origin=5234567),
  representing a [15.2% increase](ratio_value, origin=0.152, assessment="positive")
  compared to Q3.

  ## Key Metrics
  - New customers: [1,234](metric_value, origin=1234)
  - Retention rate: [89.5%](ratio_value, origin=0.895)
  - Average order: [¥4,567](metric_value, origin=4567)`,
  description:
    'A narrative text visualization component for creating data interpretation reports and summaries with semantic entity annotations, built with AntV T8.',
  knowledge: {
    introduction:
      'Summary is a text visualization component that transforms data into structured narrative text using T8 Syntax - a declarative Markdown-like language for creating data narratives. Instead of traditional charts, Summary presents insights through natural language with semantically annotated data entities.',
    useCases: [
      'Creating data interpretation reports and summaries with natural language',
      'Presenting insights through text with semantically annotated data entities',
      'Building professional, report-quality data narratives with consistent styling',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: 'Component type, must be "summary".',
          },
          {
            property: 'content',
            type: 'required',
            description: 'T8 Syntax string containing narrative text with entity annotations.',
          },
          {
            property: 'theme',
            type: 'optional',
            description: 'Visual theme, either "light" or "dark", defaults to "light".',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Q4 Sales Report with metrics and percentages',
      description: 'Q4 Sales Report with metrics and percentages',
      code: `# Q4 Sales Report

  ## Overview
  Total [revenue](metric_name) reached [¥5,234,567](metric_value, origin=5234567),
  representing a [15.2% increase](ratio_value, origin=0.152, assessment="positive")
  compared to Q3.

  ## Key Metrics
  - New customers: [1,234](metric_value, origin=1234)
  - Retention rate: [89.5%](ratio_value, origin=0.895)
  - Average order: [¥4,567](metric_value, origin=4567)`,
    },
    {
      title: 'Market Analysis with regional performance',
      description: 'Market Analysis with regional performance',
      code: `# Market Analysis Report

  ## Executive Summary
  [Global smartphone shipments](metric_name) reached [1.2 billion units](metric_value, origin=1200000000)
  in [2024](time_desc), showing a [modest decline of 2.1%](ratio_value, origin=-0.021, assessment="negative").

  ## Regional Performance

  ### Asia-Pacific
  [Asia-Pacific](dim_value) remains the largest market with [680M units](metric_value, origin=680000000),
  accounting for [56.7%](contribute_ratio, origin=0.567) of global sales.

  ### North America
  [North America](dim_value) showed [steady growth](trend_desc, assessment="positive")
  with [220M units](metric_value, origin=220000000).`,
    },
    {
      title: 'Sales Performance with dark theme',
      description: 'Sales Performance with dark theme',
      code: `# Sales Performance
  Revenue reached [¥2.5M](metric_value, origin=2500000), up [18%](ratio_value, origin=0.18, assessment="positive").
theme dark`,
    },
  ],
};
