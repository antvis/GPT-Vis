import { ChartType, Column, FlowDiagram, GPTVisLite, MindMap, withChartCode } from '@antv/gpt-vis';
import type { FC } from 'react';
import React from 'react';
import type { ErrorRender } from '../type';

// 默认错误渲染示例
const defaultErrorMarkdown = `
#### 默认数据解析错误渲染
\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "第一产业", "value": 7200.0 }
  // JSON 解析错误示例
\`\`\`
`;

// 示例一 - JSON解析错误
const example1Markdown = `
#### 自定义 JSON解析错误 渲染示例一
\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "第一产业", "value": 7200.0 }
  // JSON 解析错误示例
\`\`\`
`;

// 示例二 - 不支持的图表类型
const example2Markdown = `
#### 自定义 JSON解析错误 渲染示例二
\`\`\`vis-chart
{
  "type": "unsupported-chart",
  "data": [{ "category": "测试", "value": 100 }]
}
\`\`\`
`;

// 示例 - 图表渲染错误
const example5Markdown = `
#### 图表渲染错误抛错
\`\`\`vis-chart
{
  "type": "mind-map",
  "data": {
    "name": "Transformer 模型",
    "children": [
      {
        "name": "概述",
        "children": [
          {
            "name": "定义与背景",
            "children": [
              {
                "name": "2017年 Vaswani 等人提出"
              },
              {
                "name": "自然语言处理任务"
              }
            ]
          },
          {
            "name": "主要特点",
            "children": [
              {
                "name": "无需循环结构"
              },
              {
                "name": "依赖自注意力机制"
              },
              {
                "name": "可并行处理"
              }
            ]
          },
          {
            "name": "应用领域",
            "children": [
              {
                "name": "机器翻译"
              },
              {
                "name": "文本摘要"
              },
              {
                "name": "问答系统"
              },
              {
                "name": "语音处理"
              }
            ]
          }
        ]
      },
      {
        "name": "核心组件",
        "children": [
          {
            "name": "自注意力机制",
            "children": [
              {
                "name": "机制原理",
                "children": [
                  {
                    "name": "每个词关注其他词"
                  },
                  {
                    "name": "计算注意力权重"
                  }
                ]
              },
              {
                "name": "优点",
                "children": [
                  {
                    "name": "捕捉长距离依赖"
                  },
                  {
                    "name": "可并行计算"
                  }
                ]
              }
            ]
          },
          {
            "name": "多头自注意力",
            "children": [
              {
                "name": "多个注意力头并行计算"
              },
              {
                "name": "拼接与线性变换"
              }
            ]
          },
          {
            "name": "位置编码",
            "children": [
              {
                "name": "作用",
                "children": [
                  {
                    "name": "提供序列顺序信息"
                  }
                ]
              },
              {
                "name": "实现方式",
                "children": [
                  {
                    "name": "正弦/余弦函数"
                  },
                  {
                    "name": "可学习的嵌入"
                  }
                ]
              }
            ]
          },
          {
            "name": "前馈网络",
            "children": [
              {
                "name": "两层全连接网络"
              },
              {
                "name": "每个位置独立处理"
              }
            ]
          },
          {
            "name": "残差连接与层归一化",
            "children": [
              {
                "name": "缓解梯度消失"
              },
              {
                "name": "加速训练"
              }
            ]
          }
        ]
      },
      {
        "name": "架构",
        "children": [
          {
            "name": "编码器",
            "children": [
              {
                "name": "多层结构"
              },
              {
                "name": "每层组成",
                "children": [
                  {
                    "name": "自注意力"
                  },
                  {
                    "name": "前馈网络"
                  }
                ]
              }
            ]
          },
          {
            "name": "解码器",
            "children": [
              {
                "name": "多层结构"
              },
              {
                "name": "每层组成",
                "children": [
                  {
                    "name": "自注意力"
                  },
                  {
                    "name": "编码器-解码器注意力"
                  },
                  {
                    "name": "前馈网络"
                  }
                ]
              }
            ]
          },
          {
            "name": "输入输出嵌入",
            "children": [
              {
                "name": "词向量转换"
              },
              {
                "name": "与位置编码结合"
              }
            ]
          }
        ]
      },
      {
        "name": "计算复杂度与优化",
        "children": [
          {
            "name": "自注意力复杂度",
            "children": [
              {
                "name": "O(N²)"
              }
            ]
          },
          {
            "name": "改进方案",
            "children": [
              {
                "name": "Set Transformer - 诱导点降低复杂度"
              },
              {
                "name": "Reformer - 局部注意力和哈希"
              },
              {
                "name": "Linformer - 降低注意力矩阵维度"
              },
              {
                "name": "Longformer - 长序列局部/全局注意力"
              },
              {
                "name": "Charformer - 字符级高效表示"
              }
            ]
          }
        ]
      },
      {
        "name": "应用与扩展",
        "children": [
          {
            "name": "自然语言处理",
            "children": [
              {
                "name": "BERT、GPT 等"
              }
            ]
          },
          {
            "name": "计算机视觉",
            "children": [
              {
                "name": "Vision Transformer (ViT)"
              }
            ]
          },
          {
            "name": "语音处理",
            "children": [
              {
                "name": "Transformer 语音识别"
              }
            ]
          },
          {
            "name": "强化学习",
            "children": [
              {
                "name": "状态关系建模"
              }
            ]
          }
        ]
      },
      {
        "name": "总结",
        "children": [
          {
            "name": "优势",
            "children": [
              {
                "name": "高效并行"
              },
              {
                "name": "长距离依赖捕捉"
              }
            ]
          },
          {
            "name": "挑战",
            "children": [
              {
                "name": "大型模型计算开销"
              },
              {
                "name": "需要大量训练数据"
              }
            ]
          }
        ]
      }
    ]
  }
}
`;

const example3Markdown = `
#### 默认图表渲染错误
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
`;

const example4Markdown = `
#### 自定义图表渲染错误
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
`;

// 自定义错误渲染组件 - 示例一（卡片式设计）
const CustomErrorRender1: FC<{
  errorInfo: ErrorRender;
}> = ({ errorInfo }) => {
  const { error, content } = errorInfo;

  return (
    <div
      style={{
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        padding: '24px',
        margin: '8px 0',
        backgroundColor: '#fafafa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid #e8e8e8',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#ff7875',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          !
        </div>
        <div>
          <h4 style={{ margin: '0', fontSize: '16px', color: '#262626' }}>解析错误</h4>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#8c8c8c' }}>
            自定义错误渲染 - 卡片式设计
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', color: '#595959', marginBottom: '8px' }}>
          <strong>错误信息</strong>
        </div>
        <div
          style={{
            backgroundColor: '#fff2f0',
            border: '1px solid #ffccc7',
            borderRadius: '6px',
            padding: '12px',
            fontSize: '13px',
            color: '#a8071a',
            fontFamily: 'monospace',
          }}
        >
          {error?.message || '未知错误'}
        </div>
      </div>

      <details>
        <summary
          style={{
            cursor: 'pointer',
            fontSize: '14px',
            color: '#1890ff',
            userSelect: 'none',
            outline: 'none',
          }}
        >
          查看原始代码
        </summary>
        <div
          style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            padding: '16px',
            marginTop: '8px',
            fontSize: '12px',
            fontFamily: 'Consolas, Monaco, monospace',
            lineHeight: '1.5',
            color: '#262626',
          }}
        >
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{content}</pre>
        </div>
      </details>
    </div>
  );
};

// 自定义错误渲染组件 - 示例二（终端/控制台风格）
const CustomErrorRender2: FC<{
  errorInfo: ErrorRender;
}> = ({ errorInfo }) => {
  const { content, error } = errorInfo;
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div
      style={{
        backgroundColor: '#1e1e1e',
        color: '#00ff00',
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        fontSize: '13px',
        padding: '20px',
        borderRadius: '0',
        border: '2px solid #333',
        margin: '8px 0',
        lineHeight: '1.4',
      }}
    >
      <div
        style={{
          borderBottom: '1px solid #333',
          paddingBottom: '8px',
          marginBottom: '12px',
          color: '#888',
        }}
      >
        GPT-Vis Terminal v1.0 - {currentTime}
      </div>

      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: '#ff6b6b' }}>ERROR</span>
        <span style={{ color: '#4ecdc4' }}> [CHART_TYPE_NOT_SUPPORTED]</span>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: '#888' }}>$</span>
        <span style={{ color: '#ffd93d' }}> chart.render()</span>
      </div>

      <div style={{ marginBottom: '12px', paddingLeft: '20px' }}>
        <div style={{ color: '#ff6b6b' }}>✗ {error ? error.message || error.toString() : ''}</div>
        <div style={{ color: '#888', fontSize: '12px' }}>
          └── Available types: column, pie, line, bar, area, scatter...
        </div>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ color: '#4ecdc4' }}>📊 PAYLOAD:</div>
        <div
          style={{
            backgroundColor: '#2d2d2d',
            padding: '8px',
            marginTop: '4px',
            borderLeft: '3px solid #4ecdc4',
            color: '#e6e6e6',
          }}
        >
          <pre style={{ margin: 0, fontSize: '11px' }}>{content}</pre>
        </div>
      </div>

      <div style={{ color: '#888', fontSize: '11px' }}>
        <span style={{ color: '#ffd93d' }}>TIP:</span> Use errorRender for custom error handling
      </div>
    </div>
  );
};

// 默认数据错误渲染
const DefaultErrorCode = withChartCode({
  components: { [ChartType.Column]: Column },
});

// 自定义数据错误渲染 - 示例一
const CustomErrorCode1 = withChartCode({
  components: { [ChartType.Column]: Column },
  errorRender: (errorInfo: ErrorRender) => <CustomErrorRender1 errorInfo={errorInfo} />,
});

// 自定义数据错误渲染 - 示例二
const CustomErrorCode2 = withChartCode({
  components: { [ChartType.Column]: Column },
  errorRender: (errorInfo: ErrorRender) => <CustomErrorRender2 errorInfo={errorInfo} />,
});

// 默认图表渲染错误
const DefaultChartError = withChartCode({
  components: { [ChartType.FlowDiagram]: FlowDiagram, [ChartType.MindMap]: MindMap },
});

const CustomChartError = withChartCode({
  components: { [ChartType.FlowDiagram]: FlowDiagram },
  componentErrorRender: ({ error }) => {
    return (
      <div
        style={{
          height: '100px',
          color: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {error ? error.message || error.toString() : ''}
      </div>
    );
  },
});

export default () => {
  return (
    <div>
      <div>
        <GPTVisLite components={{ code: DefaultErrorCode }}>{defaultErrorMarkdown}</GPTVisLite>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <GPTVisLite components={{ code: CustomErrorCode1 }}>{example1Markdown}</GPTVisLite>
      </div>

      <div>
        <GPTVisLite components={{ code: CustomErrorCode2 }}>{example2Markdown}</GPTVisLite>
      </div>

      <div>
        <GPTVisLite components={{ code: DefaultChartError }}>{example3Markdown}</GPTVisLite>
      </div>

      <div>
        <GPTVisLite components={{ code: DefaultChartError }}>{example5Markdown}</GPTVisLite>
      </div>

      <div>
        <GPTVisLite components={{ code: CustomChartError }}>{example4Markdown}</GPTVisLite>
      </div>
    </div>
  );
};
