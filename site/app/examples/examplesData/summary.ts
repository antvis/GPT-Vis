import { FileText } from 'lucide-react';

export const summaryData = {
  id: 'summary',
  name: 'Summary',
  icon: FileText,
  galleryExamples: `# Q4 Sales Report

[Total Revenue](metric_name) reached [¥5.2M](metric_value, origin=5200000), growth [18%](ratio_value, origin=0.18, assessment="positive"). [North America](dim_value) accounts for [40%](contribute_ratio, origin=0.40).`,
  description:
    'A narrative text visualization component built on AntV T8, used to present data insights in the form of natural language narratives, supporting data entities with semantic annotations and inline mini charts embedded in paragraph text.',
  knowledge: {
    introduction:
      'The narrative text visualization component (Summary) is a visualization form that transforms data into structured narrative text. It uses T8 syntax — a Markdown-like declarative language — to embed data entities such as metric names, values, and trend descriptions with semantic annotations in natural language, and supports advanced analytical entities like ranking, difference, anomaly, association, distribution, and seasonality, rendered as inline mini charts, making data narratives more intuitive and vivid. Unlike traditional charts, Summary conveys insights through natural language narratives, making it suitable for generating data interpretation reports and business analysis summaries.',
    useCases: [
      'AI-generated data reports: suitable for AIGC scenarios where large language models automatically generate data analysis reports presented in natural language narrative form',
      'Business insight text presentation: used to display business summaries, operational analysis, and other scenarios where complex insights need to be conveyed through paragraph narratives',
      'Data conclusions with semantic annotations: embedding data entities with semantic annotations and inline mini charts in narrative text to enhance data readability and visual hierarchy',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'content',
            type: 'required',
            description:
              'T8 syntax string containing narrative text and semantically annotated entities. Does not start with vis, begins directly with a Markdown heading or body text',
          },
          {
            property: 'theme',
            type: 'optional',
            description:
              'Chart theme, optional, string type, available values are "light" | "dark", default is "light".',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Q4 Sales Report: Key Metrics and Regional Analysis',
      description: 'Q4 Sales Report: Key Metrics and Regional Analysis',
      code: `# Q4 Sales Report

## Overview

In [Q4 2024](time_desc), [Total Revenue](metric_name) reached [¥5.2M](metric_value, origin=5200000), an increase of [¥800K](delta_value, origin=800000, assessment="positive") compared to Q3, with a growth rate of [18%](ratio_value, origin=0.18, assessment="positive"). [Average Order Value](other_metric_value) is [¥328](metric_value, origin=328).

## Regional Performance

### North America

[North America](dim_value) leads with [¥2.1M](metric_value, origin=2100000), accounting for [40%](contribute_ratio, origin=0.40, assessment="positive") of total revenue. This region [ranks first](rank, detail=[2100000, 1800000, 1300000]) among all markets.

### Europe

[Europe](dim_value) shows [strong momentum](trend_desc, assessment="positive"), with [nearly half](proportion, origin=0.48) of sales coming from new customers. The [¥900K gap](difference, detail=[210, 195, 180, 170]) with North America is narrowing quarter by quarter.

## Performance Assessment

1. **North America** performed best, contributing the largest share
2. European market shows strong growth with a high proportion of new customers
3. Asia-Pacific market has room for further growth`,
    },
    {
      title: 'User Behavior Analysis: Distribution, Anomalies, and Associations',
      description: 'User Behavior Analysis: Distribution, Anomalies, and Associations',
      code: `# User Behavior Analysis Report

## Traffic Trends

In [2024](time_desc), [Monthly Active Users](metric_name) reached [12M](metric_value, origin=12000000), a year-over-year increase of [22%](ratio_value, origin=0.22, assessment="positive"), showing an overall [continuous upward](trend_desc, assessment="positive") trend.

## User Distribution

User age [shows a bell-shaped distribution](distribution, detail=[5, 15, 35, 30, 15]), mainly concentrated in the 25-35 age range. Users in [Tier-1 Cities](dim_value) exhibit [obvious seasonality](seasonality, detail={"data":[80, 95, 110, 150], "range":[0, 200]}), peaking every Q4.

## Anomalies and Associations

The [South China region](dim_value) shows [abnormal traffic concentration](anomaly, detail=[12, 15, 14, 58, 16]), requiring further investigation. Analysis found a [strong positive correlation](association, detail=[{"x":1,"y":20},{"x":3,"y":55},{"x":5,"y":90}]) between user activity and push notification frequency.

**Key Findings:**

1. _New user_ retention rate is below expectations, onboarding process needs optimization
2. User activity is positively correlated with push frequency; moderate increase in pushes can boost engagement
3. Q4 seasonal peaks can be leveraged for marketing campaign planning

> For detailed analysis, please refer to the [data report](https://example.com/report)`,
    },
    {
      title: 'Operations Dashboard (Dark Theme)',
      description: 'Operations Dashboard (Dark Theme)',
      code: `# Operations Dashboard

## Key Metrics

[This quarter](time_desc), [GMV](metric_name) reached [380M](metric_value, origin=380000000), a quarter-over-quarter increase of [12.5%](ratio_value, origin=0.125, assessment="positive"). [Return Rate](other_metric_value) dropped to [3.2%](ratio_value, origin=0.032, assessment="positive"), a record low.

## Channel Analysis

1. [Direct Channel](dim_value) contributes [65%](contribute_ratio, origin=0.65, assessment="positive"), firmly [ranked first](rank, detail=[6500, 2800, 1200, 800])
2. [Live Commerce](dim_value) grew [45%](ratio_value, origin=0.45, assessment="positive"), showing [explosive momentum](trend_desc, assessment="positive")
3. [Offline Stores](dim_value) show a [declining trend](trend_desc, assessment="negative"), with a year-over-year decrease of [8%](ratio_value, origin=-0.08, assessment="negative")

## Consumer Insights

User spending amounts [show a normal distribution](distribution, detail=[8, 22, 40, 22, 8]), with [VIP Customers](dim_value) contributing [nearly three-quarters](proportion, origin=0.73) of revenue. [East China region](dim_value) shows [data anomalies](anomaly, detail=[45, 48, 42, 95, 50]), likely caused by promotional activities.

The [gap between direct and live commerce channels is gradually narrowing](difference, detail=[380, 350, 320, 290]), and a diversified channel landscape is taking shape.

theme dark`,
    },
  ],
};
