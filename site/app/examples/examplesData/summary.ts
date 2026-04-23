import { FileText } from 'lucide-react';

export const summaryData = {
  id: 'summary',
  name: 'Summary',
  icon: FileText,
  galleryExamples: `# Q4 销售报告

[总收入](metric_name)达到[¥520万](metric_value, origin=5200000)，增长[18%](ratio_value, origin=0.18, assessment="positive")。[北美地区](dim_value)占比[40%](contribute_ratio, origin=0.40)。`,
  description:
    '叙述文本可视化组件，基于 AntV T8 构建，用于将数据洞察以自然语言叙述形式呈现，支持在段落文本中嵌入带语义标注的数据实体和内嵌迷你图表。',
  knowledge: {
    introduction:
      '叙述文本可视化组件（Summary）是一种将数据转化为结构化叙述文本的可视化形式。它使用 T8 语法——一种类 Markdown 的声明式语言，通过语义标注在自然语言中嵌入指标名称、数值、趋势描述等数据实体，并支持排名、差异、异常、关联、分布、季节性等高级分析实体，渲染为内嵌迷你图表，使数据叙事更加直观生动。与传统图表不同，Summary 通过自然语言叙述传递洞察，适合生成数据解读报告和经营分析摘要。',
    useCases: [
      'AI 生成数据报告：适合在 AIGC 场景中，由大语言模型自动生成数据分析报告，以自然语言叙述形式呈现数据结论',
      '业务洞察文字呈现：用于展示业务摘要、经营分析等需要以段落叙述传达复杂洞察的场景',
      '数据结论配语义标注：在叙述文本中嵌入带语义标注的数据实体和内嵌迷你图表，增强数据表达的可读性与视觉层次',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'content',
            type: 'required',
            description:
              'T8 语法字符串，包含叙述文本和语义标注实体。不以 vis 开头，直接以 Markdown 标题或正文开始',
          },
          {
            property: 'theme',
            type: 'optional',
            description:
              '主题，文本类型，可选值为 "light" 或 "dark"，默认值为 "light"。也可在内容末尾使用 theme dark 指令指定',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Q4 销售报告：核心指标与地区分析',
      description: 'Q4 销售报告：核心指标与地区分析',
      code: `# Q4 销售报告

## 概述

在[2024年Q4](time_desc)，[总收入](metric_name)达到[¥520万](metric_value, origin=5200000)，相比Q3增长了[¥80万](delta_value, origin=800000, assessment="positive")，增长率为[18%](ratio_value, origin=0.18, assessment="positive")。[客单价](other_metric_value)为[¥328](metric_value, origin=328)。

## 各地区表现

### 北美地区

[北美地区](dim_value)以[¥210万](metric_value, origin=2100000)领先，占总收入的[40%](contribute_ratio, origin=0.40, assessment="positive")。该地区在所有市场中[排名第一](rank, detail=[2100000, 1800000, 1300000])。

### 欧洲地区

[欧洲](dim_value)呈现[强劲势头](trend_desc, assessment="positive")，[近一半](proportion, origin=0.48)的销售额来自新客户。与北美的[90万差距](difference, detail=[210, 195, 180, 170])正在逐季缩小。

## 业绩评估

1. **北美地区**表现最优，贡献最大份额
2. 欧洲市场增势良好，新客户占比高
3. 亚太市场有进一步增长空间`,
    },
    {
      title: '用户行为分析：分布、异常与关联',
      description: '用户行为分析：分布、异常与关联',
      code: `# 用户行为分析报告

## 流量趋势

[2024年](time_desc)，[月活跃用户](metric_name)达到[1,200万](metric_value, origin=12000000)，同比增长[22%](ratio_value, origin=0.22, assessment="positive")，整体呈现[持续上升](trend_desc, assessment="positive")趋势。

## 用户分布

用户年龄[呈钟形分布](distribution, detail=[5, 15, 35, 30, 15])，主要集中在25-35岁区间。[一线城市](dim_value)用户呈现[明显季节性](seasonality, detail={"data":[80, 95, 110, 150], "range":[0, 200]})，每年Q4达到峰值。

## 异常与关联

[华南地区](dim_value)出现[异常流量集中](anomaly, detail=[12, 15, 14, 58, 16])，需进一步排查。分析发现用户活跃度与推送频次之间存在[强正相关](association, detail=[{"x":1,"y":20},{"x":3,"y":55},{"x":5,"y":90}])。

**关键发现：**

1. _新用户_留存率低于预期，需优化引导流程
2. 用户活跃度与推送频次正相关，适度增加推送可提升活跃
3. Q4季节性高峰可用于营销活动规划

> 详细分析请参考[数据报表](https://example.com/report)`,
    },
    {
      title: '运营数据看板（深色主题）',
      description: '运营数据看板（深色主题）',
      code: `# 运营数据看板

## 核心指标

[本季度](time_desc)，[GMV](metric_name)达到[3.8亿](metric_value, origin=380000000)，环比增长[12.5%](ratio_value, origin=0.125, assessment="positive")。[退货率](other_metric_value)降至[3.2%](ratio_value, origin=0.032, assessment="positive")，创历史新低。

## 渠道分析

1. [自营渠道](dim_value)贡献[65%](contribute_ratio, origin=0.65, assessment="positive")，稳居[第一](rank, detail=[6500, 2800, 1200, 800])
2. [直播电商](dim_value)增长[45%](ratio_value, origin=0.45, assessment="positive")，呈现[爆发态势](trend_desc, assessment="positive")
3. [线下门店](dim_value)出现[下滑趋势](trend_desc, assessment="negative")，同比下降[8%](ratio_value, origin=-0.08, assessment="negative")

## 消费洞察

用户消费金额[呈正态分布](distribution, detail=[8, 22, 40, 22, 8])，[VIP客户](dim_value)贡献了[近四分之三](proportion, origin=0.73)的营收。[华东区域](dim_value)出现[数据异常](anomaly, detail=[45, 48, 42, 95, 50])，疑似促销活动导致。

自营与直播渠道的[差距逐步缩小](difference, detail=[380, 350, 320, 290])，多元化渠道格局正在形成。

theme dark`,
    },
  ],
};
