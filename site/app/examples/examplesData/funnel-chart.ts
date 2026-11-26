export const funnelChartData = {
  id: 'funnel-chart',
  name: 'Funnel Chart',
  galleryDsl:
    'vis funnel\ndata\n  - category "Browse Products"\n    value 100\n  - category "Add to Cart"\n    value 45\n  - category "Complete Payment"\n    value 18\ntitle "E-commerce Conversion Funnel"',
  galleryJson: {
    type: 'funnel',
    data: [
      { category: 'Browse Products', value: 100 },
      { category: 'Add to Cart', value: 45 },
      { category: 'Complete Payment', value: 18 },
    ],
    title: 'E-commerce Conversion Funnel',
  },
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
            valueType: 'string',
            description: 'Value must be "funnel".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: 'Chart data, each item contains category and value.',
          },
          {
            property: 'data.category',
            type: 'required',
            valueType: 'string',
            description: 'Stage name.',
          },
          {
            property: 'data.value',
            type: 'required',
            valueType: 'number',
            description: 'Stage value.',
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
            valueType: 'BuiltinThemeName | ThemeSpec',
            description:
              'Built-in theme name or custom theme object; default is "default". See Documentation → Custom Themes.',
          },
          {
            property: 'locale',
            type: 'optional',
            valueType: "'en-US' | 'zh-CN'",
            description:
              'Locale for values and built-in metric labels. Defaults to the visualization locale.',
          },
          {
            property: 'conversionRateLabel',
            type: 'optional',
            valueType: 'string',
            description: 'Custom label used for stage and overall conversion-rate annotations.',
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
            description: 'Must be an array of valid color values.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Conversion through stages',
      description: 'Conversion through stages',
      json: {
        type: 'funnel',
        data: [
          { category: 'Browse Products', value: 100000 },
          { category: 'Add to Cart', value: 45000 },
          { category: 'Submit Order', value: 25000 },
          { category: 'Complete Payment', value: 18000 },
          { category: 'Confirm Receipt', value: 15000 },
        ],
        title: 'E-commerce User Conversion Funnel',
      },
      dsl: 'vis funnel\ndata\n  - category "Browse Products"\n    value 100000\n  - category "Add to Cart"\n    value 45000\n  - category "Submit Order"\n    value 25000\n  - category "Complete Payment"\n    value 18000\n  - category "Confirm Receipt"\n    value 15000\ntitle "E-commerce User Conversion Funnel"',
    },
    {
      title: 'Localized conversion labels',
      description: 'Localized conversion labels',
      json: {
        type: 'funnel',
        data: [
          { category: '访问落地页', value: 128000 },
          { category: '提交线索', value: 43600 },
          { category: '完成演示', value: 18200 },
          { category: '进入试用', value: 9700 },
          { category: '付费签约', value: 3480 },
        ],
        title: '企业服务销售转化漏斗',
        locale: 'zh-CN',
        conversionRateLabel: '转化效率',
      },
      dsl: 'vis funnel\ndata\n  - category "访问落地页"\n    value 128000\n  - category "提交线索"\n    value 43600\n  - category "完成演示"\n    value 18200\n  - category "进入试用"\n    value 9700\n  - category "付费签约"\n    value 3480\ntitle "企业服务销售转化漏斗"\nlocale zh-CN\nconversionRateLabel "转化效率"',
    },
    {
      title: 'Inverted funnel',
      description: 'Inverted funnel',
      json: {
        type: 'funnel',
        data: [
          { category: '<50m', value: 7 },
          { category: '50-100m', value: 16 },
          { category: '100-200m', value: 59 },
          { category: '200-300m', value: 53 },
          { category: '>300m', value: 312 },
        ],
        title: 'Asset Size Distribution',
      },
      dsl: 'vis funnel\ndata\n  - category "<50m"\n    value 7\n  - category "50-100m"\n    value 16\n  - category "100-200m"\n    value 59\n  - category "200-300m"\n    value 53\n  - category ">300m"\n    value 312\ntitle "Asset Size Distribution"',
    },
  ],
};
