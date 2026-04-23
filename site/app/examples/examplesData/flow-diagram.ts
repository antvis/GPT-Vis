import { GitBranch } from 'lucide-react';

export const flowDiagramData = {
  id: 'flow-diagram',
  name: 'Flow Diagram',
  icon: GitBranch,
  galleryExamples:
    'vis flow-diagram\ndata\n  nodes\n    - name 客户下单\n    - name 仓库拣货\n    - name 物流配送\n  edges\n    - source 客户下单\n      target 仓库拣货\n    - source 仓库拣货\n      target 物流配送',
  description:
    '流程图，用于直观地表示过程或系统的步骤和决策点。它展示了从开始到结束的整个流程。每个节点代表一个特定的步骤或决策点，边则表示步骤之间的顺序和关系。只有在有分支表意的情况下，边才需要命名。',
  knowledge: {
    introduction:
      '流程图，用于直观地表示过程或系统的步骤和决策点。它展示了从开始到结束的整个流程。每个节点代表一个特定的步骤或决策点，边则表示步骤之间的顺序和关系。只有在有分支表意的情况下，边才需要命名。',
    useCases: [
      '适用于需要展示线性流程或步骤的场景。',
      '规划和跟踪项目进度，明确任务的先后顺序和依赖关系。',
      '构建决策树，展示不同决策点和路径的场景。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "flow-diagram"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，对象类型，包含 nodes 和 edges。',
          },
          {
            property: 'data.nodes',
            type: 'required',
            description: '节点数组，每个节点表示一个步骤，必填，数组对象类型。',
          },
          {
            property: 'data.nodes.name',
            type: 'required',
            description: '节点的名称，必须唯一，必填，文本类型。',
          },
          {
            property: 'data.edges',
            type: 'required',
            description: '边数组，每条边表示两个节点之间的关系，必填，数组对象类型。',
          },
          {
            property: 'data.edges.source',
            type: 'required',
            description: '边的起始节点名称，指向节点的 name 属性，必填，文本类型。',
          },
          {
            property: 'data.edges.target',
            type: 'required',
            description: '边的目标节点名称，指向节点的 name 属性，必填，文本类型。',
          },
          {
            property: 'data.edges.name',
            type: 'optional',
            description: '边的名称，用于标识边（分支场景），选填，文本类型。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表标题，选填，文本类型。',
          },
          {
            property: 'theme',
            type: 'optional',
            description:
              '图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。',
          },
          {
            property: 'style',
            type: 'optional',
            description: '图表样式，选填，对象类型。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '性能诊断流程图，展示从 I/O 检查到问题定位和解决方案的决策流程。',
      description: '性能诊断流程图，展示从 I/O 检查到问题定位和解决方案的决策流程。',
      code: 'vis flow-diagram\ntitle 性能诊断流程\ndata\n  nodes\n    - name "Check I/O wait (top)"\n    - name "Check swap (free-m)"\n    - name "Check % CPU (top)"\n    - name "RAM PROBLEM"\n    - name I/O\n    - name "APP PROBLEM"\n    - name "CPU PROBLEM"\n    - name "What\'s hogging RAM? (top)"\n    - name "Check history - Is the usage an anomaly?"\n    - name "Kill processes (memory)"\n    - name "Infrastructure problem - add RAM"\n    - name "What\'s hogging IO? (lotop)"\n    - name "Look for an external dependency"\n    - name "Confirm by checking CPU % user time (top)"\n    - name "Check list of processes (top)"\n    - name "Check-history - Is the usage an anomaly?"\n    - name "Kill processes (CPU)"\n    - name "Infrastructure problem - add cores"\n  edges\n    - source "Check I/O wait (top)"\n      target "Check swap (free-m)"\n      name HIGH\n    - source "Check I/O wait (top)"\n      target "Check % CPU (top)"\n      name LOW\n    - source "Check swap (free-m)"\n      target "RAM PROBLEM"\n      name HIGH\n    - source "Check swap (free-m)"\n      target I/O\n      name LOW\n    - source "Check % CPU (top)"\n      target "APP PROBLEM"\n      name HIGH\n    - source "Check % CPU (top)"\n      target "CPU PROBLEM"\n      name LOW\n    - source "RAM PROBLEM"\n      target "What\'s hogging RAM? (top)"\n    - source "What\'s hogging RAM? (top)"\n      target "Check history - Is the usage an anomaly?"\n    - source "Check history - Is the usage an anomaly?"\n      target "Kill processes (memory)"\n      name YES\n    - source "Check history - Is the usage an anomaly?"\n      target "Infrastructure problem - add RAM"\n      name NO\n    - source I/O\n      target "What\'s hogging IO? (lotop)"\n    - source "APP PROBLEM"\n      target "Look for an external dependency"\n    - source "CPU PROBLEM"\n      target "Confirm by checking CPU % user time (top)"\n    - source "Confirm by checking CPU % user time (top)"\n      target "Check list of processes (top)"\n    - source "Check list of processes (top)"\n      target "Check-history - Is the usage an anomaly?"\n    - source "Check-history - Is the usage an anomaly?"\n      target "Kill processes (CPU)"\n      name YES\n    - source "Check-history - Is the usage an anomaly?"\n      target "Infrastructure problem - add cores"\n      name NO',
    },
    {
      title:
        '用户注册流程（dark 主题）：用户访问注册页面，填写注册表单并提交，系统验证用户信息，创建账户或提示修改，发送验证邮件，用户验证后注册成功。',
      description:
        '用户注册流程（dark 主题）：用户访问注册页面，填写注册表单并提交，系统验证用户信息，创建账户或提示修改，发送验证邮件，用户验证后注册成功。',
      code: 'vis flow-diagram\ntitle 用户注册流程\ndata\n  nodes\n    - name 访问注册页面\n    - name 填写并提交注册表单\n    - name 验证用户信息\n    - name 创建新用户账户\n    - name 提示修改错误信息\n    - name 发送验证邮件\n    - name 点击验证链接\n    - name 注册成功，跳转到登录页面\n  edges\n    - source 访问注册页面\n      target 填写并提交注册表单\n    - source 填写并提交注册表单\n      target 验证用户信息\n    - source 验证用户信息\n      target 创建新用户账户\n      name 信息无误\n    - source 验证用户信息\n      target 提示修改错误信息\n      name 信息有误\n    - source 创建新用户账户\n      target 发送验证邮件\n    - source 发送验证邮件\n      target 点击验证链接\n    - source 点击验证链接\n      target 注册成功，跳转到登录页面\ntheme dark',
    },
    {
      title: '订单配送流程：客户下单、系统生成订单、仓库拣货、仓库打包、物流配送、客户收货。',
      description: '订单配送流程：客户下单、系统生成订单、仓库拣货、仓库打包、物流配送、客户收货。',
      code: 'vis flow-diagram\ntitle 订单配送流程\ndata\n  nodes\n    - name 客户下单\n    - name 系统生成订单\n    - name 仓库拣货\n    - name 仓库打包\n    - name 物流配送\n    - name 客户收货\n  edges\n    - source 客户下单\n      target 系统生成订单\n    - source 系统生成订单\n      target 仓库拣货\n    - source 仓库拣货\n      target 仓库打包\n    - source 仓库打包\n      target 物流配送\n    - source 物流配送\n      target 客户收货',
    },
  ],
};
