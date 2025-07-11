import { GPTVisLite, withDefaultChartCode } from '@antv/gpt-vis';
import React from 'react';

const components = {
  code: withDefaultChartCode(),
};

const content = [
  `二、残余流量分析和处理
##### 2.1 残余流量汇总
\`\`\`vis-chart
{
  "type": "flow-diagram",
  "data": {
    "nodes": [
      { "name": "残余机器数核查" },
      { "name": "流量类型检测" },
      { "name": "定时任务分析" },
      { "name": "域名流量检测" },
      { "name": "RPC流量溯源" },
      { "name": "消息队列检查" }
    ],
    "edges": [
      { "source": "残余机器数核查", "target": "流量类型检测", "name": "发现5台残余机器" },
      { "source": "流量类型检测", "target": "RPC流量溯源", "name": "识别9154次/天服务调用" },
      { "source": "流量类型检测", "target": "定时任务分析", "name": "定时任务零风险" },
      { "source": "流量类型检测", "target": "域名流量检测", "name": "无PV流量" },
      { "source": "RPC流量溯源", "target": "mobilemock应用追踪", "name": "上游未完成迁移" }
    ]
  }
}

\`\`\`
`,
];

export default () => <GPTVisLite components={components}>{content[0]}</GPTVisLite>;
