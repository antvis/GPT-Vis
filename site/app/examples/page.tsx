'use client';

import { GPTVis } from '@antv/gpt-vis';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import VersionSwitcher from '../components/VersionSwitcher';

// Chart Preview Component
function ChartPreview({ visSyntax, chartId }: { visSyntax: string; chartId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setError(null);

      // Clear container for re-render
      const container = containerRef.current;
      while (container.firstChild) {
        container.firstChild.remove();
      }
      try {
        const gptVis = new GPTVis({
          container,
          wrapper: true,
        });
        gptVis.render(visSyntax);
      } catch (err) {
        console.error(`Chart render error for ${chartId}:`, err);
        setError(err instanceof Error ? err.message : 'Failed to render chart');
      }
    }
  }, [visSyntax, chartId]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500 text-sm p-4">
        <div className="text-center">
          <p className="font-semibold">Render Error</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: '400px' }} />;
}

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/gpt-vis-logo.png"
              alt="GPT-Vis Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold text-gray-900">GPT-Vis</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/docs" className="text-gray-600 hover:text-[#691eff] transition-colors">
              Documentation
            </Link>
            <Link href="/examples" className="text-[#691eff] font-medium">
              Examples
            </Link>
            <a
              href="https://github.com/antvis/GPT-Vis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#691eff] transition-colors"
            >
              GitHub
            </a>
            <VersionSwitcher />
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 flex gap-8">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-2">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Chart Types</h2>
              <nav className="space-y-1">
                {chartTypes.map((chart) => (
                  <a
                    key={chart.id}
                    href={`#${chart.id}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#691eff] hover:bg-[#691eff]/5 px-3 py-2 rounded-lg transition-colors"
                  >
                    <span className="text-lg">{chart.icon}</span>
                    <span>{chart.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">Examples Gallery</h1>
            <p className="text-xl text-gray-600 mb-12">
              Explore 21 AI-friendly chart types with comprehensive knowledge base and live examples
            </p>

            {/* Chart Sections */}
            <div className="space-y-16">
              {chartTypes.map((chart) => (
                <section key={chart.id} id={chart.id} className="scroll-mt-20">
                  {/* Chart Header */}
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-200">
                    <div className="text-5xl">{chart.icon}</div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{chart.name}</h2>
                      <p className="text-gray-600 mt-1">{chart.description.split('\n')[0]}</p>
                    </div>
                  </div>

                  {/* Knowledge Base */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-8 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Knowledge Base</h3>

                    {/* Introduction */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Introduction</h4>
                      <p className="text-gray-700 whitespace-pre-line">
                        {chart.knowledge.introduction}
                      </p>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Use Cases</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {chart.knowledge.useCases.map((useCase, idx) => (
                          <li key={idx}>{useCase}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Configuration Table */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Configuration Options</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                          <thead className="bg-[#691eff] text-white">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold">Property</th>
                              <th className="px-4 py-3 text-left font-semibold">Type</th>
                              <th className="px-4 py-3 text-left font-semibold">Description</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {chart.knowledge.config.slice(0, 10).map((config, idx) => (
                              <tr key={idx} className="border-t border-gray-200">
                                <td className="px-4 py-3 font-mono text-[#691eff]">
                                  {config.property}
                                </td>
                                <td className="px-4 py-3 text-gray-600">{config.type}</td>
                                <td className="px-4 py-3 text-gray-700">{config.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Examples Section */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Examples</h3>
                    <div className="space-y-6">
                      {(chart.id === 'indented-tree'
                        ? chart.examples.slice(0, 4)
                        : chart.examples.slice(0, 3)
                      ).map((example, exIdx) => (
                        <div
                          key={exIdx}
                          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#691eff] transition-colors"
                        >
                          {/* Example Header */}
                          <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                            <h4 className="font-semibold text-gray-900">
                              {example.title.substring(0, 80)}
                              {example.title.length > 80 ? '...' : ''}
                            </h4>
                          </div>

                          <ChartPreview visSyntax={example.code} chartId={`${chart.id}-${exIdx}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-20 bg-gradient-to-br from-[#691eff] to-[#8e5aff] rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-white/90">
                Check out our documentation to integrate GPT-Vis into your project
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/docs"
                  className="px-8 py-4 bg-white text-[#691eff] rounded-full hover:bg-gray-100 transition-all shadow-xl font-medium"
                >
                  Read Documentation
                </Link>
                <a
                  href="https://github.com/antvis/GPT-Vis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-transparent text-white rounded-full hover:bg-white/10 transition-all border-2 border-white font-medium"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const chartTypes = [
  {
    id: 'flow-diagram',
    name: 'Flow Diagram',
    icon: '🔀',
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
    examples: [
      {
        title: '性能诊断流程图，展示从 I/O 检查到问题定位和解决方案的决策流程。',
        description: '性能诊断流程图，展示从 I/O 检查到问题定位和解决方案的决策流程。',
        code: 'vis flow-diagram\ndata\n  nodes\n    - name "Check I/O wait (top)"\n    - name "Check swap (free-m)"\n    - name "Check % CPU (top)"\n    - name "RAM PROBLEM"\n    - name I/O\n    - name "APP PROBLEM"\n    - name "CPU PROBLEM"\n    - name "What\'s hogging RAM? (top)"\n    - name "Check history - Is the usage an anomaly?"\n    - name "Kill processes (memory)"\n    - name "Infrastructure problem - add RAM"\n    - name "What\'s hogging IO? (lotop)"\n    - name "Look for an external dependency"\n    - name "Confirm by checking CPU % user time (top)"\n    - name "Check list of processes (top)"\n    - name "Check-history - Is the usage an anomaly?"\n    - name "Kill processes (CPU)"\n    - name "Infrastructure problem - add cores"\n  edges\n    - source "Check I/O wait (top)"\n      target "Check swap (free-m)"\n      name HIGH\n    - source "Check I/O wait (top)"\n      target "Check % CPU (top)"\n      name LOW\n    - source "Check swap (free-m)"\n      target "RAM PROBLEM"\n      name HIGH\n    - source "Check swap (free-m)"\n      target I/O\n      name LOW\n    - source "Check % CPU (top)"\n      target "APP PROBLEM"\n      name HIGH\n    - source "Check % CPU (top)"\n      target "CPU PROBLEM"\n      name LOW\n    - source "RAM PROBLEM"\n      target "What\'s hogging RAM? (top)"\n    - source "What\'s hogging RAM? (top)"\n      target "Check history - Is the usage an anomaly?"\n    - source "Check history - Is the usage an anomaly?"\n      target "Kill processes (memory)"\n      name YES\n    - source "Check history - Is the usage an anomaly?"\n      target "Infrastructure problem - add RAM"\n      name NO\n    - source I/O\n      target "What\'s hogging IO? (lotop)"\n    - source "APP PROBLEM"\n      target "Look for an external dependency"\n    - source "CPU PROBLEM"\n      target "Confirm by checking CPU % user time (top)"\n    - source "Confirm by checking CPU % user time (top)"\n      target "Check list of processes (top)"\n    - source "Check list of processes (top)"\n      target "Check-history - Is the usage an anomaly?"\n    - source "Check-history - Is the usage an anomaly?"\n      target "Kill processes (CPU)"\n      name YES\n    - source "Check-history - Is the usage an anomaly?"\n      target "Infrastructure problem - add cores"\n      name NO',
      },
      {
        title:
          '用户注册流程（dark 主题）：用户访问注册页面，填写注册表单并提交，系统验证用户信息，创建账户或提示修改，发送验证邮件，用户验证后注册成功。',
        description:
          '用户注册流程（dark 主题）：用户访问注册页面，填写注册表单并提交，系统验证用户信息，创建账户或提示修改，发送验证邮件，用户验证后注册成功。',
        code: 'vis flow-diagram\ndata\n  nodes\n    - name 访问注册页面\n    - name 填写并提交注册表单\n    - name 验证用户信息\n    - name 创建新用户账户\n    - name 提示修改错误信息\n    - name 发送验证邮件\n    - name 点击验证链接\n    - name 注册成功，跳转到登录页面\n  edges\n    - source 访问注册页面\n      target 填写并提交注册表单\n    - source 填写并提交注册表单\n      target 验证用户信息\n    - source 验证用户信息\n      target 创建新用户账户\n      name 信息无误\n    - source 验证用户信息\n      target 提示修改错误信息\n      name 信息有误\n    - source 创建新用户账户\n      target 发送验证邮件\n    - source 发送验证邮件\n      target 点击验证链接\n    - source 点击验证链接\n      target 注册成功，跳转到登录页面\ntheme dark',
      },
      {
        title: '订单配送流程：客户下单、系统生成订单、仓库拣货、仓库打包、物流配送、客户收货。',
        description:
          '订单配送流程：客户下单、系统生成订单、仓库拣货、仓库打包、物流配送、客户收货。',
        code: 'vis flow-diagram\ndata\n  nodes\n    - name 客户下单\n    - name 系统生成订单\n    - name 仓库拣货\n    - name 仓库打包\n    - name 物流配送\n    - name 客户收货\n  edges\n    - source 客户下单\n      target 系统生成订单\n    - source 系统生成订单\n      target 仓库拣货\n    - source 仓库拣货\n      target 仓库打包\n    - source 仓库打包\n      target 物流配送\n    - source 物流配送\n      target 客户收货',
      },
    ],
  },
  {
    id: 'dual-axes',
    name: 'Dual Axes Chart',
    icon: '📊',
    description:
      '双轴图是一种结合两个不同图表类型的组合图表，通常是将柱状图与折线图结合起来显示。双轴图通过在一个图表中使用两个垂直 Y 轴（左侧和右侧），分别对应不同的数值维度。柱状图用于展示一组数据的大小或数量，而折线图则展示另一组数据的趋势。双轴图非常适合同时展示不同类型的数据变化趋势。',
    knowledge: {
      introduction:
        '双轴图是一种结合两个不同图表类型的组合图表，通常是将柱状图与折线图结合起来显示。双轴图通过在一个图表中使用两个垂直 Y 轴（左侧和右侧），分别对应不同的数值维度。柱状图用于展示一组数据的大小或数量，而折线图则展示另一组数据的趋势。双轴图非常适合同时展示不同类型的数据变化趋势。',
      useCases: [
        '同时展示两个具有不同数量级的数据，例如销售额和增长率。',
        '比较两组变量的相对变化趋势，如同时观察某时间段内的销量和利润率。',
        '数据维度不同且具有共同的 X 轴（例如时间、类别）。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "dual-axes"。',
        },
        {
          property: 'categories',
          type: 'required',
          description: '图表的 X 轴的数组，必填，数组文本类型。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
        },
        {
          property: 'axisXTitle',
          type: 'optional',
          description: '图表的 X 轴的标题，选填，文本类型。',
        },
        {
          property: 'series',
          type: 'required',
          description: '图表详细组合，必填，数组对象类型，每个对象代表一个基础图表，包含：',
        },
        {
          property: 'series.type',
          type: 'required',
          description: '基础图表的类型，必填，"column"表示柱状图，"line"表示折线图；',
        },
        {
          property: 'series.data',
          type: 'required',
          description: '基础图表的数据，必填，数组数值类型；',
        },
        {
          property: 'series.axisYTitle',
          type: 'optional',
          description: '基础图表的 Y 轴标题，选填，文本类型；',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的 颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '用双轴图展示某公司的年销售额与利润率，2018 年至 2022 年的销售额分别为 91.9 亿、99.1 亿、101.6 亿、114.4 亿、121 亿，利润率分别为 5.5%、6.0%、6.2...',
        description:
          '用双轴图展示某公司的年销售额与利润率，2018 年至 2022 年的销售额分别为 91.9 亿、99.1 亿、101.6 亿、114.4 亿、121 亿，利润率分别为 5.5%、6.0%、6.2...',
        code: 'vis dual-axes\ncategories\n  - 2018\n  - 2019\n  - 2020\n  - 2021\n  - 2022\ntitle 2018-2022销售额与利润率\naxisXTitle 年份\nseries\n  - type column\n    axisYTitle 销售额\n    data\n      - 91.9\n      - 99.1\n      - 101.6\n      - 114.4\n      - 121\n  - type line\n    axisYTitle 利润率\n    data\n      - 0.055\n      - 0.06\n      - 0.062\n      - 0.07\n      - 0.075',
      },
      {
        title:
          '某软件项目 2020 年 9 月每日任务消耗时间（秒）与完成时间（秒）双轴图，展示每日工作量与效率的联动关系。',
        description:
          '某软件项目 2020 年 9 月每日任务消耗时间（秒）与完成时间（秒）双轴图，展示每日工作量与效率的联动关系。',
        code: 'vis dual-axes\ncategories\n  - 09-01\n  - 09-02\n  - 09-03\n  - 09-04\n  - 09-05\n  - 09-06\n  - 09-07\n  - 09-08\n  - 09-09\n  - 09-10\n  - 09-11\n  - 09-12\ntitle 2020年9月项目日任务消耗与完成时间\naxisXTitle 日期\nseries\n  - type column\n    axisYTitle 消耗时间（秒）\n    data\n      - 10440\n      - 9345\n      - 18459\n      - 9763\n      - 11074\n      - 11770\n      - 12206\n      - 11434\n      - 16218\n      - 11914\n      - 16781\n      - 10555\n  - type line\n    axisYTitle 完成时间（秒）\n    data\n      - 696.4\n      - 692.9\n      - 936.0\n      - 782.9\n      - 653.8\n      - 856.7\n      - 777.2\n      - 773.3\n      - 833.3\n      - 793.5\n      - 894.5\n      - 725.6',
      },
      {
        title: '某地区 2023 年全年月度新增用户数与环比增长率双轴图，展示用户增长的季节性规律。',
        description:
          '某地区 2023 年全年月度新增用户数与环比增长率双轴图，展示用户增长的季节性规律。',
        code: 'vis dual-axes\ncategories\n  - Jan\n  - Feb\n  - Mar\n  - Apr\n  - May\n  - Jun\n  - Jul\n  - Aug\n  - Sep\n  - Oct\n  - Nov\n  - Dec\ntitle 2023年月度新增用户数与增长率\naxisXTitle 月份\nseries\n  - type column\n    axisYTitle 新增用户数（万人）\n    data\n      - 26\n      - 59\n      - 90\n      - 264\n      - 287\n      - 707\n      - 1756\n      - 1822\n      - 487\n      - 188\n      - 60\n      - 23\n  - type line\n    axisYTitle A渠道增长率（%）\n    data\n      - 2.6\n      - 5.9\n      - 9.0\n      - 26.4\n      - 28.7\n      - 70.7\n      - 175.6\n      - 182.2\n      - 48.7\n      - 18.8\n      - 6.0\n      - 2.3\n  - type line\n    axisYTitle B渠道增长率（%）\n    data\n      - 2.0\n      - 2.2\n      - 3.3\n      - 4.5\n      - 6.3\n      - 10.2\n      - 20.3\n      - 23.4\n      - 23.0\n      - 16.5\n      - 12.0\n      - 6.2',
      },
    ],
  },
  {
    id: 'violin-chart',
    name: 'Violin Chart',
    icon: '🎻',
    description:
      '小提琴图是一种用于展示数据分布和概率密度的统计图表。通过对称的密度曲线展示数据的分布形态，同时可结合箱线图元素显示中位数和四分位数。适合直观比较不同组数据的分布和密度特征。',
    knowledge: {
      introduction:
        '小提琴图是一种用于展示数据分布和概率密度的统计图表。通过对称的密度曲线展示数据的分布形态，同时可结合箱线图元素显示中位数和四分位数。适合直观比较不同组数据的分布和密度特征。',
      useCases: [
        '用于展示一组或多组数据的分布和密度情况，如成绩分布、实验结果、金融数据等',
        '适合突出数据的分布形态、集中趋势及异常值',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表类型，必填，文本类型，值为 "violin"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '小提琴图数据，必填，数组类型。',
        },
        {
          property: 'data.category',
          type: 'required',
          description: '数据分类名称，必填，文本类型。',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '数据分类值，必填，数值类型。',
        },
        {
          property: 'data.group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型，用于多组数据对比。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.plette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，合法颜色值数组。',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
      ],
    },
    examples: [
      {
        title:
          '鸢尾花萼片长度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花萼片长度（cm）分布对比。',
        description:
          '鸢尾花萼片长度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花萼片长度（cm）分布对比。',
        code: 'vis violin\ndata\n  - category "I. setosa"\n    value 5.1\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 4.7\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 4.4\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.3\n  - category "I. setosa"\n    value 5.8\n  - category "I. versicolor"\n    value 7.0\n  - category "I. versicolor"\n    value 6.4\n  - category "I. versicolor"\n    value 6.9\n  - category "I. versicolor"\n    value 5.5\n  - category "I. versicolor"\n    value 6.5\n  - category "I. versicolor"\n    value 5.7\n  - category "I. versicolor"\n    value 6.3\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 6.6\n  - category "I. versicolor"\n    value 5.2\n  - category "I. versicolor"\n    value 5.0\n  - category "I. versicolor"\n    value 5.9\n  - category "I. versicolor"\n    value 6.0\n  - category "I. versicolor"\n    value 6.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 7.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 7.6\n  - category "I. virginica"\n    value 4.9\n  - category "I. virginica"\n    value 7.3\n  - category "I. virginica"\n    value 6.7\n  - category "I. virginica"\n    value 7.2\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 6.4\n  - category "I. virginica"\n    value 6.8\n  - category "I. virginica"\n    value 5.7\ntitle 鸢尾花萼片长度分布\naxisYTitle 萼片长度（cm）',
      },
      {
        title:
          '鸢尾花花瓣长度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花花瓣长度（cm）分布对比，主题为 dark。',
        description:
          '鸢尾花花瓣长度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花花瓣长度（cm）分布对比，主题为 dark。',
        code: 'vis violin\ndata\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.3\n  - category "I. setosa"\n    value 1.5\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.7\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.5\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.5\n  - category "I. setosa"\n    value 1.5\n  - category "I. setosa"\n    value 1.6\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.1\n  - category "I. setosa"\n    value 1.2\n  - category "I. versicolor"\n    value 4.7\n  - category "I. versicolor"\n    value 4.5\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 4.0\n  - category "I. versicolor"\n    value 4.6\n  - category "I. versicolor"\n    value 4.5\n  - category "I. versicolor"\n    value 4.7\n  - category "I. versicolor"\n    value 3.3\n  - category "I. versicolor"\n    value 4.6\n  - category "I. versicolor"\n    value 3.9\n  - category "I. versicolor"\n    value 3.5\n  - category "I. versicolor"\n    value 4.2\n  - category "I. versicolor"\n    value 4.0\n  - category "I. versicolor"\n    value 4.7\n  - category "I. virginica"\n    value 6.0\n  - category "I. virginica"\n    value 5.1\n  - category "I. virginica"\n    value 5.9\n  - category "I. virginica"\n    value 5.6\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 6.6\n  - category "I. virginica"\n    value 4.5\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 6.1\n  - category "I. virginica"\n    value 5.1\n  - category "I. virginica"\n    value 5.3\n  - category "I. virginica"\n    value 5.5\n  - category "I. virginica"\n    value 5.0\ntitle 鸢尾花花瓣长度分布\naxisYTitle 花瓣长度（cm）\ntheme dark',
      },
      {
        title:
          '鸢尾花花瓣宽度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花花瓣宽度（cm）分布，自定义调色板和背景色。',
        description:
          '鸢尾花花瓣宽度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花花瓣宽度（cm）分布，自定义调色板和背景色。',
        code: 'vis violin\ndata\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.4\n  - category "I. setosa"\n    value 0.3\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.1\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.3\n  - category "I. versicolor"\n    value 1.4\n  - category "I. versicolor"\n    value 1.5\n  - category "I. versicolor"\n    value 1.5\n  - category "I. versicolor"\n    value 1.3\n  - category "I. versicolor"\n    value 1.5\n  - category "I. versicolor"\n    value 1.3\n  - category "I. versicolor"\n    value 1.6\n  - category "I. versicolor"\n    value 1.0\n  - category "I. versicolor"\n    value 1.3\n  - category "I. versicolor"\n    value 1.4\n  - category "I. versicolor"\n    value 1.0\n  - category "I. versicolor"\n    value 1.5\n  - category "I. virginica"\n    value 2.5\n  - category "I. virginica"\n    value 1.9\n  - category "I. virginica"\n    value 2.1\n  - category "I. virginica"\n    value 1.8\n  - category "I. virginica"\n    value 2.2\n  - category "I. virginica"\n    value 2.1\n  - category "I. virginica"\n    value 1.7\n  - category "I. virginica"\n    value 1.8\n  - category "I. virginica"\n    value 1.8\n  - category "I. virginica"\n    value 2.5\n  - category "I. virginica"\n    value 2.0\n  - category "I. virginica"\n    value 1.9\ntitle 鸢尾花花瓣宽度分布\naxisYTitle 花瓣宽度（cm）\nstyle\n  palette #FF9800 #2196F3 #4CAF50\n  backgroundColor #1a1a2e',
      },
    ],
  },

  {
    id: 'line-chart',
    name: 'Line Chart',
    icon: '📈',
    description:
      '折线图是是一个由笛卡尔坐标系（直角坐标系），一些点和线组成的统计图表，常用来表示数值随连续时间间隔或有序类别的变化。在折线图中，x 轴通常用作连续时间间隔或有序类别。y 轴用于量化的数据，如果为负值则绘制于 y 轴下方。连线用于连接两个相邻的数据点。 折线图用于分析事物随时间或有序类别而变化的趋势。从数据上来说，折线图需要一个连续时间字段或一个分类字段和至少一个连续数据字段。',
    knowledge: {
      introduction:
        '折线图是是一个由笛卡尔坐标系（直角坐标系），一些点和线组成的统计图表，常用来表示数值随连续时间间隔或有序类别的变化。在折线图中，x 轴通常用作连续时间间隔或有序类别。y 轴用于量化的数据，如果为负值则绘制于 y 轴下方。连线用于连接两个相邻的数据点。 折线图用于分析事物随时间或有序类别而变化的趋势。从数据上来说，折线图需要一个连续时间字段或一个分类字段和至少一个连续数据字段。',
      useCases: [
        '同一变量随时间或有序类别的变化，比如 2000 到 2016 年苹果电脑销售额在苹果利润的占比的变化趋势',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "line"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组对象类型；',
        },
        {
          property: 'data.time',
          type: 'required',
          description: '数据的时序名称 ，必填，文本或数值类型；',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '数据的值，必填，数值类型；',
        },
        {
          property: 'data.group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型；',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
        },
        {
          property: 'axisXTitle',
          type: 'optional',
          description: 'x 轴的标题，选填，文本类型。',
        },
        {
          property: 'axisYTitle',
          type: 'optional',
          description: 'y 轴的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
        {
          property: 'style.lineWidth',
          type: 'optional',
          description: '图形描边的宽度，选填，数值类型，值为大于 0 的数值。',
        },
      ],
    },
    examples: [
      {
        title:
          '我国出生人口，2015 年出生人口 1655 万人，2016 年出生人口 1786 万人，2017 年出生人口 1723 万人。用折线图可视化。',
        description:
          '我国出生人口，2015 年出生人口 1655 万人，2016 年出生人口 1786 万人，2017 年出生人口 1723 万人。用折线图可视化。',
        code: 'vis line\ndata\n  - time "2015 年"\n    value 1655\n  - time "2016 年"\n    value 1786\n  - time "2017 年"\n    value 1723\ntitle 出生人口变化\naxisXTitle 年份\naxisYTitle 出生人口（万人）',
      },
      {
        title:
          '我国出生人口与死亡人口，2015 年分别是 1655 万人与 975 万人，2016 年分别是出生人口 1786 万人与 977 万人，2017 年分别是出生人口 1723 万人与 986 万人...',
        description:
          '我国出生人口与死亡人口，2015 年分别是 1655 万人与 975 万人，2016 年分别是出生人口 1786 万人与 977 万人，2017 年分别是出生人口 1723 万人与 986 万人。',
        code: 'vis line\ndata\n  - time "2015 年"\n    value 1655\n    group 出生人口\n  - time "2015 年"\n    value 975\n    group 死亡人口\n  - time "2016 年"\n    value 1786\n    group 出生人口\n  - time "2016 年"\n    value 977\n    group 死亡人口\n  - time "2017 年"\n    value 1723\n    group 出生人口\n  - time "2017 年"\n    value 986\n    group 死亡人口\ntitle 出生人口与死亡人口变化\naxisXTitle 年份\naxisYTitle 人口（万人）',
      },
      {
        title:
          '用折线图可视化我的数据 [{ "year": 2015,"industrial": 7200.0 },{ "year": 2016, "industrial": 3660.0 },{ "year...',
        description:
          '用折线图可视化我的数据 [{ "year": 2015,"industrial": 7200.0 },{ "year": 2016, "industrial": 3660.0 },{ "year...',
        code: 'vis line\ndata\n  - time 2015\n    value 7200.0\n  - time 2016\n    value 3660.0\n  - time 2017\n    value 4100.0\naxisXTitle year\naxisYTitle industrial',
      },
    ],
  },
  {
    id: 'scatter-chart',
    name: 'Scatter Chart',
    icon: '⚫',
    description:
      '散点图是一种显示两个变量之间关系的图表。通过将每个数据点表示为图上的一个点，散点图能够展示两个变量（通常是数值变量）之间的相关性或分布趋势。每个点的水平和垂直位置由该数据点的两个数值变量决定，X 轴和 Y 轴分别代表两个变量。',
    knowledge: {
      introduction:
        '散点图是一种显示两个变量之间关系的图表。通过将每个数据点表示为图上的一个点，散点图能够展示两个变量（通常是数值变量）之间的相关性或分布趋势。每个点的水平和垂直位置由该数据点的两个数值变量决定，X 轴和 Y 轴分别代表两个变量。',
      useCases: [
        '发现两个变量之间的关系或趋势，例如相关性强度。',
        '显示数据的分布模式，检测异常值。',
        '数据点数量较大时，散点图能够有效呈现整体分布情况。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "scatter"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组对象类型：',
        },
        {
          property: 'data.x',
          type: 'required',
          description: 'X 轴上的数值变量，必填，数值类型。',
        },
        {
          property: 'data.y',
          type: 'required',
          description: 'Y 轴上的数值变量，必填，数值类型。',
        },
        {
          property: 'data.group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型；',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '身高体重关系分析：展示人体身高与体重的相关性分布',
        description:
          '身高体重关系分析：展示人体身高与体重的相关性分布',
        code: 'vis scatter\ndata\n  - x 161.2\n    y 51.6\n  - x 167.5\n    y 59\n  - x 159.5\n    y 49.2\n  - x 157\n    y 63\n  - x 155.8\n    y 53.6\n  - x 170\n    y 59\n  - x 159.1\n    y 47.6\n  - x 166\n    y 69.8\n  - x 176.2\n    y 66.8\n  - x 160.2\n    y 75.2\n  - x 172.5\n    y 55.2\n  - x 170.9\n    y 54.2\n  - x 172.9\n    y 62.5\n  - x 153.4\n    y 42\n  - x 160\n    y 50\n  - x 147.2\n    y 49.8\n  - x 168.2\n    y 49.2\n  - x 175\n    y 73.2\n  - x 157\n    y 47.8\n  - x 167.6\n    y 68.8\n  - x 159.5\n    y 50.6\n  - x 175\n    y 82.5\n  - x 166.8\n    y 57.2\n  - x 176.5\n    y 87.8\n  - x 170.2\n    y 72.8\n  - x 174\n    y 54.5\n  - x 173\n    y 59.8\n  - x 179.9\n    y 67.3\n  - x 170.5\n    y 67.8\n  - x 160\n    y 47\n  - x 154.4\n    y 46.2\n  - x 162\n    y 55\n  - x 176.5\n    y 83\n  - x 160\n    y 54.4\n  - x 152\n    y 45.8\n  - x 162.1\n    y 53.6\n  - x 170\n    y 73.2\n  - x 160.2\n    y 52.1\n  - x 161.3\n    y 67.9\n  - x 166.4\n    y 56.6\n  - x 168.9\n    y 62.3\n  - x 163.8\n    y 58.5\n  - x 167.6\n    y 54.5\n  - x 160\n    y 50.2\n  - x 161.3\n    y 60.3\n  - x 167.6\n    y 58.3\n  - x 165.1\n    y 56.2\n  - x 160\n    y 50.2\n  - x 170\n    y 72.9\n  - x 157.5\n    y 59.8\n  - x 167.6\n    y 61\n  - x 160.7\n    y 69.1\n  - x 163.2\n    y 55.9\n  - x 152.4\n    y 46.5\n  - x 157.5\n    y 54.3\n  - x 168.3\n    y 54.8\n  - x 180.3\n    y 60.7\n  - x 165.5\n    y 60\n  - x 165\n    y 62\n  - x 164.5\n    y 60.3\n  - x 156\n    y 52.7\n  - x 160\n    y 74.3\n  - x 163\n    y 62\n  - x 165.7\n    y 73.1\n  - x 161\n    y 80\n  - x 162\n    y 54.7\n  - x 166\n    y 53.2\n  - x 174\n    y 75.7\n  - x 172.7\n    y 61.1\n  - x 167.6\n    y 55.7\n  - x 151.1\n    y 48.7\n  - x 164.5\n    y 52.3\n  - x 163.5\n    y 50\n  - x 152\n    y 59.3\n  - x 169\n    y 62.5\n  - x 164\n    y 55.7\n  - x 161.2\n    y 54.8\n  - x 155\n    y 45.9\n  - x 170\n    y 70.6\n  - x 176.2\n    y 67.2\n  - x 170\n    y 69.4\n  - x 162.5\n    y 58.2\n  - x 170.3\n    y 64.8\n  - x 164.1\n    y 71.6\n  - x 169.5\n    y 52.8\n  - x 163.2\n    y 59.8\n  - x 154.5\n    y 49\n  - x 159.8\n    y 50\n  - x 173.2\n    y 69.2\n  - x 170\n    y 55.9\n  - x 161.4\n    y 63.4\n  - x 169\n    y 58.2\n  - x 166.2\n    y 58.6\n  - x 159.4\n    y 45.7\n  - x 162.5\n    y 52.2\n  - x 159\n    y 48.6\n  - x 162.8\n    y 57.8\n  - x 159\n    y 55.6\n  - x 179.8\n    y 66.8\n  - x 162.9\n    y 59.4\n  - x 161\n    y 53.6\n  - x 151.1\n    y 73.2\n  - x 168.2\n    y 53.4\n  - x 168.9\n    y 69\n  - x 173.2\n    y 58.4\n  - x 171.8\n    y 56.2\n  - x 178\n    y 70.6\n  - x 164.3\n    y 59.8\n  - x 163\n    y 72\n  - x 168.5\n    y 65.2\n  - x 166.8\n    y 56.6\n  - x 172.7\n    y 105.2\n  - x 163.5\n    y 51.8\n  - x 169.4\n    y 63.4\n  - x 167.8\n    y 59\n  - x 159.5\n    y 47.6\n  - x 167.6\n    y 63\n  - x 161.2\n    y 55.2\n  - x 160\n    y 45\n  - x 163.2\n    y 54\n  - x 162.2\n    y 50.2\n  - x 161.3\n    y 60.2\n  - x 149.5\n    y 44.8\n  - x 157.5\n    y 58.8\n  - x 163.2\n    y 56.4\n  - x 172.7\n    y 62\n  - x 155\n    y 49.2\n  - x 156.5\n    y 67.2\n  - x 164\n    y 53.8\n  - x 160.9\n    y 54.4\n  - x 162.8\n    y 58\n  - x 167\n    y 59.8\n  - x 160\n    y 54.8\n  - x 160\n    y 43.2\n  - x 168.9\n    y 60.5\n  - x 158.2\n    y 46.4\n  - x 156\n    y 64.4\n  - x 160\n    y 48.8\n  - x 167.1\n    y 62.2\n  - x 158\n    y 55.5\n  - x 167.6\n    y 57.8\n  - x 156\n    y 54.6\n  - x 162.1\n    y 59.2\n  - x 173.4\n    y 52.7\n  - x 159.8\n    y 53.2\n  - x 170.5\n    y 64.5\n  - x 159.2\n    y 51.8\n  - x 157.5\n    y 56\n  - x 161.3\n    y 63.6\n  - x 162.6\n    y 63.2\n  - x 160\n    y 59.5\n  - x 168.9\n    y 56.8\n  - x 165.1\n    y 64.1\n  - x 162.6\n    y 50\n  - x 165.1\n    y 72.3\n  - x 166.4\n    y 55\n  - x 160\n    y 55.9\n  - x 152.4\n    y 60.4\n  - x 170.2\n    y 69.1\n  - x 162.6\n    y 84.5\n  - x 170.2\n    y 55.9\n  - x 158.8\n    y 55.5\n  - x 172.7\n    y 69.5\n  - x 167.6\n    y 76.4\n  - x 162.6\n    y 61.4\n  - x 167.6\n    y 65.9\n  - x 156.2\n    y 58.6\n  - x 175.2\n    y 66.8\n  - x 172.1\n    y 56.6\n  - x 162.6\n    y 58.6\n  - x 160\n    y 55.9\n  - x 165.1\n    y 59.1\n  - x 182.9\n    y 81.8\n  - x 166.4\n    y 70.7\n  - x 165.1\n    y 56.8\n  - x 177.8\n    y 60\n  - x 165.1\n    y 58.2\n  - x 175.3\n    y 72.7\n  - x 154.9\n    y 54.1\n  - x 158.8\n    y 49.1\n  - x 172.7\n    y 75.9\n  - x 168.9\n    y 55\n  - x 161.3\n    y 57.3\n  - x 167.6\n    y 55\n  - x 165.1\n    y 65.5\n  - x 175.3\n    y 65.5\n  - x 157.5\n    y 48.6\n  - x 163.8\n    y 58.6\n  - x 167.6\n    y 63.6\n  - x 165.1\n    y 55.2\n  - x 165.1\n    y 62.7\n  - x 168.9\n    y 56.6\n  - x 162.6\n    y 53.9\n  - x 164.5\n    y 63.2\n  - x 176.5\n    y 73.6\n  - x 168.9\n    y 62\n  - x 175.3\n    y 63.6\n  - x 159.4\n    y 53.2\n  - x 160\n    y 53.4\n  - x 170.2\n    y 55\n  - x 162.6\n    y 70.5\n  - x 167.6\n    y 54.5\n  - x 162.6\n    y 54.5\n  - x 160.7\n    y 55.9\n  - x 160\n    y 59\n  - x 157.5\n    y 63.6\n  - x 162.6\n    y 54.5\n  - x 152.4\n    y 47.3\n  - x 170.2\n    y 67.7\n  - x 165.1\n    y 80.9\n  - x 172.7\n    y 70.5\n  - x 165.1\n    y 60.9\n  - x 170.2\n    y 63.6\n  - x 170.2\n    y 54.5\n  - x 170.2\n    y 59.1\n  - x 161.3\n    y 70.5\n  - x 167.6\n    y 52.7\n  - x 167.6\n    y 62.7\n  - x 165.1\n    y 86.3\n  - x 162.6\n    y 66.4\n  - x 152.4\n    y 67.3\n  - x 168.9\n    y 63\n  - x 170.2\n    y 73.6\n  - x 175.2\n    y 62.3\n  - x 175.2\n    y 57.7\n  - x 160\n    y 55.4\n  - x 165.1\n    y 104.1\n  - x 174\n    y 55.5\n  - x 170.2\n    y 77.3\n  - x 160\n    y 80.5\n  - x 167.6\n    y 64.5\n  - x 167.6\n    y 72.3\n  - x 167.6\n    y 61.4\n  - x 154.9\n    y 58.2\n  - x 162.6\n    y 81.8\n  - x 175.3\n    y 63.6\n  - x 171.4\n    y 53.4\n  - x 157.5\n    y 54.5\n  - x 165.1\n    y 53.6\n  - x 160\n    y 60\n  - x 174\n    y 73.6\n  - x 162.6\n    y 61.4\n  - x 174\n    y 55.5\n  - x 162.6\n    y 63.6\n  - x 161.3\n    y 60.9\n  - x 156.2\n    y 60\n  - x 149.9\n    y 46.8\n  - x 169.5\n    y 57.3\n  - x 160\n    y 64.1\n  - x 175.3\n    y 63.6\n  - x 169.5\n    y 67.3\n  - x 160\n    y 75.5\n  - x 172.7\n    y 68.2\n  - x 162.6\n    y 61.4\n  - x 157.5\n    y 76.8\n  - x 176.5\n    y 71.8\n  - x 164.4\n    y 55.5\n  - x 160.7\n    y 48.6\n  - x 174\n    y 66.4\n  - x 163.8\n    y 67.3\n  - x 174\n    y 65.6\n  - x 175.3\n    y 71.8\n  - x 193.5\n    y 80.7\n  - x 186.5\n    y 72.6\n  - x 187.2\n    y 78.8\n  - x 181.5\n    y 74.8\n  - x 184\n    y 86.4\n  - x 184.5\n    y 78.4\n  - x 175\n    y 62\n  - x 184\n    y 81.6\n  - x 180\n    y 76.6\n  - x 177.8\n    y 83.6\n  - x 192\n    y 90\n  - x 176\n    y 74.6\n  - x 174\n    y 71\n  - x 184\n    y 79.6\n  - x 192.7\n    y 93.8\n  - x 171.5\n    y 70\n  - x 173\n    y 72.4\n  - x 176\n    y 85.9\n  - x 176\n    y 78.8\n  - x 180.5\n    y 77.8\n  - x 172.7\n    y 66.2\n  - x 176\n    y 86.4\n  - x 173.5\n    y 81.8\n  - x 178\n    y 89.6\n  - x 180.3\n    y 82.8\n  - x 180.3\n    y 76.4\n  - x 164.5\n    y 63.2\n  - x 173\n    y 60.9\n  - x 183.5\n    y 74.8\n  - x 175.5\n    y 70\n  - x 188\n    y 72.4\n  - x 189.2\n    y 84.1\n  - x 172.8\n    y 69.1\n  - x 170\n    y 59.5\n  - x 182\n    y 67.2\n  - x 170\n    y 61.3\n  - x 177.8\n    y 68.6\n  - x 184.2\n    y 80.1\n  - x 186.7\n    y 87.8\n  - x 171.4\n    y 84.7\n  - x 172.7\n    y 73.4\n  - x 175.3\n    y 72.1\n  - x 180.3\n    y 82.6\n  - x 182.9\n    y 88.7\n  - x 188\n    y 84.1\n  - x 177.2\n    y 94.1\n  - x 172.1\n    y 74.9\n  - x 167\n    y 59.1\n  - x 169.5\n    y 75.6\n  - x 174\n    y 86.2\n  - x 172.7\n    y 75.3\n  - x 182.2\n    y 87.1\n  - x 164.1\n    y 55.2\n  - x 163\n    y 57\n  - x 171.5\n    y 61.4\n  - x 184.2\n    y 76.8\n  - x 174\n    y 86.8\n  - x 174\n    y 72.2\n  - x 177\n    y 71.6\n  - x 186\n    y 84.8\n  - x 167\n    y 68.2\n  - x 171.8\n    y 66.1\n  - x 182\n    y 72\n  - x 167\n    y 64.6\n  - x 177.8\n    y 74.8\n  - x 164.5\n    y 70\n  - x 192\n    y 101.6\n  - x 175.5\n    y 63.2\n  - x 171.2\n    y 79.1\n  - x 181.6\n    y 78.9\n  - x 167.4\n    y 67.7\n  - x 181.1\n    y 66\n  - x 177\n    y 68.2\n  - x 174.5\n    y 63.9\n  - x 177.5\n    y 72\n  - x 170.5\n    y 56.8\n  - x 182.4\n    y 74.5\n  - x 197.1\n    y 90.9\n  - x 180.1\n    y 93\n  - x 175.5\n    y 80.9\n  - x 180.6\n    y 72.7\n  - x 184.4\n    y 68\n  - x 175.5\n    y 70.9\n  - x 180.6\n    y 72.5\n  - x 177\n    y 72.5\n  - x 177.1\n    y 83.4\n  - x 181.6\n    y 75.5\n  - x 176.5\n    y 73\n  - x 175\n    y 70.2\n  - x 174\n    y 73.4\n  - x 165.1\n    y 70.5\n  - x 177\n    y 68.9\n  - x 192\n    y 102.3\n  - x 176.5\n    y 68.4\n  - x 169.4\n    y 65.9\n  - x 182.1\n    y 75.7\n  - x 179.8\n    y 84.5\n  - x 175.3\n    y 87.7\n  - x 184.9\n    y 86.4\n  - x 177.3\n    y 73.2\n  - x 167.4\n    y 53.9\n  - x 178.1\n    y 72\n  - x 168.9\n    y 55.5\n  - x 157.2\n    y 58.4\n  - x 180.3\n    y 83.2\n  - x 170.2\n    y 72.7\n  - x 177.8\n    y 64.1\n  - x 172.7\n    y 72.3\n  - x 165.1\n    y 65\n  - x 186.7\n    y 86.4\n  - x 165.1\n    y 65\n  - x 174\n    y 88.6\n  - x 175.3\n    y 84.1\n  - x 185.4\n    y 66.8\n  - x 177.8\n    y 75.5\n  - x 180.3\n    y 93.2\n  - x 180.3\n    y 82.7\n  - x 177.8\n    y 58\n  - x 177.8\n    y 79.5\n  - x 177.8\n    y 78.6\n  - x 177.8\n    y 71.8\n  - x 177.8\n    y 116.4\n  - x 163.8\n    y 72.2\n  - x 188\n    y 83.6\n  - x 198.1\n    y 85.5\n  - x 175.3\n    y 90.9\n  - x 166.4\n    y 85.9\n  - x 190.5\n    y 89.1\n  - x 166.4\n    y 75\n  - x 177.8\n    y 77.7\n  - x 179.7\n    y 86.4\n  - x 172.7\n    y 90.9\n  - x 190.5\n    y 73.6\n  - x 185.4\n    y 76.4\n  - x 168.9\n    y 69.1\n  - x 167.6\n    y 84.5\n  - x 175.3\n    y 64.5\n  - x 170.2\n    y 69.1\n  - x 190.5\n    y 108.6\n  - x 177.8\n    y 86.4\n  - x 190.5\n    y 80.9\n  - x 177.8\n    y 87.7\n  - x 184.2\n    y 94.5\n  - x 176.5\n    y 80.2\n  - x 177.8\n    y 72\n  - x 180.3\n    y 71.4\n  - x 171.4\n    y 72.7\n  - x 172.7\n    y 84.1\n  - x 172.7\n    y 76.8\n  - x 177.8\n    y 63.6\n  - x 177.8\n    y 80.9\n  - x 182.9\n    y 80.9\n  - x 170.2\n    y 85.5\n  - x 167.6\n    y 68.6\n  - x 175.3\n    y 67.7\n  - x 165.1\n    y 66.4\n  - x 185.4\n    y 102.3\n  - x 181.6\n    y 70.5\n  - x 172.7\n    y 95.9\n  - x 190.5\n    y 84.1\n  - x 179.1\n    y 87.3\n  - x 175.3\n    y 71.8\n  - x 170.2\n    y 65.9\n  - x 193\n    y 95.9\n  - x 171.4\n    y 91.4\n  - x 177.8\n    y 81.8\n  - x 177.8\n    y 96.8\n  - x 167.6\n    y 69.1\n  - x 167.6\n    y 82.7\n  - x 180.3\n    y 75.5\n  - x 182.9\n    y 79.5\n  - x 176.5\n    y 73.6\n  - x 186.7\n    y 91.8\n  - x 188\n    y 84.1\n  - x 188\n    y 85.9\n  - x 177.8\n    y 81.8\n  - x 174\n    y 82.5\n  - x 177.8\n    y 80.5\n  - x 171.4\n    y 70\n  - x 185.4\n    y 81.8\n  - x 185.4\n    y 84.1\n  - x 188\n    y 90.5\n  - x 188\n    y 91.4\n  - x 182.9\n    y 89.1\n  - x 176.5\n    y 85\n  - x 175.3\n    y 69.1\n  - x 175.3\n    y 73.6\n  - x 188\n    y 80.5\n  - x 188\n    y 82.7\n  - x 175.3\n    y 86.4\n  - x 170.5\n    y 67.7\n  - x 179.1\n    y 92.7\n  - x 177.8\n    y 93.6\n  - x 175.3\n    y 70.9\n  - x 182.9\n    y 75\n  - x 170.8\n    y 93.2\n  - x 188\n    y 93.2\n  - x 180.3\n    y 77.7\n  - x 177.8\n    y 61.4\n  - x 185.4\n    y 94.1\n  - x 168.9\n    y 75\n  - x 185.4\n    y 83.6\n  - x 180.3\n    y 85.5\n  - x 174\n    y 73.9\n  - x 167.6\n    y 66.8\n  - x 182.9\n    y 87.3\n  - x 160\n    y 72.3\n  - x 180.3\n    y 88.6\n  - x 167.6\n    y 75.5\n  - x 186.7\n    y 101.4\n  - x 175.3\n    y 91.1\n  - x 175.3\n    y 67.3\n  - x 175.9\n    y 77.7\n  - x 175.3\n    y 81.8\n  - x 179.1\n    y 75.5\n  - x 181.6\n    y 84.5\n  - x 177.8\n    y 76.6\n  - x 182.9\n    y 85\n  - x 177.8\n    y 102.5\n  - x 184.2\n    y 77.3\n  - x 179.1\n    y 71.8\n  - x 176.5\n    y 87.9\n  - x 188\n    y 94.3\n  - x 174\n    y 70.9\n  - x 167.6\n    y 64.5\n  - x 170.2\n    y 77.3\n  - x 167.6\n    y 72.3\n  - x 188\n    y 87.3\n  - x 174\n    y 80\n  - x 176.5\n    y 82.3\n  - x 180.3\n    y 73.6\n  - x 167.6\n    y 74.1\n  - x 188\n    y 85.9\n  - x 180.3\n    y 73.2\n  - x 167.6\n    y 76.3\n  - x 183\n    y 65.9\n  - x 183\n    y 90.9\n  - x 179.1\n    y 89.1\n  - x 170.2\n    y 62.3\n  - x 177.8\n    y 82.7\n  - x 179.1\n    y 79.1\n  - x 190.5\n    y 98.2\n  - x 177.8\n    y 84.1\n  - x 180.3\n    y 83.2\n  - x 180.3\n    y 83.2\naxisXTitle 身高(cm)\naxisYTitle 体重(kg)\ntitle 身高体重关系分布',
      },
      {
        title:
          '年龄与收入关系分析：展示年龄与收入的正相关性（深色模式）',
        description:
          '年龄与收入关系分析：展示年龄与收入的正相关性（深色模式）',
        code: 'vis scatter\ndata\n  - x 22\n    y 3000\n  - x 23\n    y 3200\n  - x 24\n    y 3100\n  - x 25\n    y 3500\n  - x 26\n    y 3300\n  - x 27\n    y 3600\n  - x 28\n    y 4000\n  - x 29\n    y 3900\n  - x 30\n    y 4200\n  - x 31\n    y 4100\n  - x 32\n    y 4500\n  - x 33\n    y 4700\n  - x 34\n    y 4600\n  - x 35\n    y 4800\n  - x 36\n    y 5000\n  - x 37\n    y 5200\n  - x 38\n    y 5100\n  - x 39\n    y 5500\n  - x 40\n    y 5300\n  - x 41\n    y 5700\n  - x 42\n    y 5600\n  - x 43\n    y 5900\n  - x 44\n    y 5800\n  - x 45\n    y 6000\n  - x 46\n    y 6100\n  - x 47\n    y 6500\n  - x 48\n    y 6300\n  - x 49\n    y 6700\n  - x 50\n    y 6400\n  - x 51\n    y 6800\n  - x 52\n    y 6900\n  - x 53\n    y 7100\n  - x 54\n    y 7000\n  - x 55\n    y 7300\n  - x 56\n    y 7200\n  - x 57\n    y 7500\n  - x 58\n    y 7400\n  - x 59\n    y 7600\n  - x 60\n    y 7700\n  - x 61\n    y 7900\n  - x 62\n    y 7800\n  - x 63\n    y 8000\n  - x 64\n    y 8100\n  - x 65\n    y 8200\n  - x 66\n    y 8300\n  - x 67\n    y 8500\n  - x 68\n    y 8400\n  - x 69\n    y 8600\n  - x 70\n    y 8700\naxisXTitle 年龄\naxisYTitle 收入(元)\ntitle 年龄与收入关系\ntheme dark',
      },
      {
        title:
          '身高体重分组数据：按性别分组的散点图',
        description:
          '身高体重分组数据：按性别分组的散点图',
        code: 'vis scatter\ndata\n  - x 161.2\n    y 51.6\n    group FEMALE\n  - x 167.5\n    y 59\n    group FEMALE\n  - x 159.5\n    y 49.2\n    group FEMALE\n  - x 157\n    y 63\n    group MALE\n  - x 155.8\n    y 53.6\n    group MALE\n  - x 170\n    y 59\n    group FEMALE\n  - x 159.1\n    y 47.6\n    group FEMALE\n  - x 166\n    y 69.8\n    group MALE\n  - x 176.2\n    y 66.8\n    group FEMALE\n  - x 160.2\n    y 75.2\n    group MALE\n  - x 172.5\n    y 55.2\n    group FEMALE\n  - x 170.9\n    y 54.2\n    group FEMALE\n  - x 172.9\n    y 62.5\n    group FEMALE\n  - x 153.4\n    y 42\n    group FEMALE\n  - x 160\n    y 50\n    group FEMALE\n  - x 147.2\n    y 49.8\n    group MALE\n  - x 168.2\n    y 49.2\n    group FEMALE\n  - x 175\n    y 73.2\n    group MALE\n  - x 157\n    y 47.8\n    group FEMALE\n  - x 167.6\n    y 68.8\n    group MALE\n  - x 159.5\n    y 50.6\n    group FEMALE\n  - x 175\n    y 82.5\n    group MALE\n  - x 166.8\n    y 57.2\n    group FEMALE\n  - x 176.5\n    y 87.8\n    group MALE\n  - x 170.2\n    y 72.8\n    group MALE\n  - x 174\n    y 54.5\n    group FEMALE\n  - x 173\n    y 59.8\n    group FEMALE\n  - x 179.9\n    y 67.3\n    group FEMALE\n  - x 170.5\n    y 67.8\n    group MALE\n  - x 160\n    y 47\n    group FEMALE\n  - x 154.4\n    y 46.2\n    group FEMALE\n  - x 162\n    y 55\n    group FEMALE\n  - x 176.5\n    y 83\n    group MALE\n  - x 160\n    y 54.4\n    group FEMALE\n  - x 152\n    y 45.8\n    group FEMALE\n  - x 162.1\n    y 53.6\n    group FEMALE\n  - x 170\n    y 73.2\n    group MALE\n  - x 160.2\n    y 52.1\n    group FEMALE\n  - x 161.3\n    y 67.9\n    group MALE\n  - x 166.4\n    y 56.6\n    group FEMALE\n  - x 168.9\n    y 62.3\n    group FEMALE\n  - x 163.8\n    y 58.5\n    group FEMALE\n  - x 167.6\n    y 54.5\n    group FEMALE\n  - x 160\n    y 50.2\n    group FEMALE\n  - x 161.3\n    y 60.3\n    group MALE\n  - x 167.6\n    y 58.3\n    group FEMALE\n  - x 165.1\n    y 56.2\n    group FEMALE\n  - x 160\n    y 50.2\n    group FEMALE\n  - x 170\n    y 72.9\n    group MALE\n  - x 157.5\n    y 59.8\n    group MALE\n  - x 167.6\n    y 61\n    group FEMALE\n  - x 160.7\n    y 69.1\n    group MALE\n  - x 163.2\n    y 55.9\n    group FEMALE\n  - x 152.4\n    y 46.5\n    group FEMALE\n  - x 157.5\n    y 54.3\n    group FEMALE\n  - x 168.3\n    y 54.8\n    group FEMALE\n  - x 180.3\n    y 60.7\n    group FEMALE\n  - x 165.5\n    y 60\n    group FEMALE\n  - x 165\n    y 62\n    group MALE\n  - x 164.5\n    y 60.3\n    group MALE\n  - x 156\n    y 52.7\n    group FEMALE\n  - x 160\n    y 74.3\n    group MALE\n  - x 163\n    y 62\n    group MALE\n  - x 165.7\n    y 73.1\n    group MALE\n  - x 161\n    y 80\n    group MALE\n  - x 162\n    y 54.7\n    group FEMALE\n  - x 166\n    y 53.2\n    group FEMALE\n  - x 174\n    y 75.7\n    group MALE\n  - x 172.7\n    y 61.1\n    group FEMALE\n  - x 167.6\n    y 55.7\n    group FEMALE\n  - x 151.1\n    y 48.7\n    group FEMALE\n  - x 164.5\n    y 52.3\n    group FEMALE\n  - x 163.5\n    y 50\n    group FEMALE\n  - x 152\n    y 59.3\n    group MALE\n  - x 169\n    y 62.5\n    group FEMALE\n  - x 164\n    y 55.7\n    group FEMALE\n  - x 161.2\n    y 54.8\n    group FEMALE\n  - x 155\n    y 45.9\n    group FEMALE\n  - x 170\n    y 70.6\n    group MALE\n  - x 176.2\n    y 67.2\n    group FEMALE\n  - x 170\n    y 69.4\n    group MALE\n  - x 162.5\n    y 58.2\n    group MALE\n  - x 170.3\n    y 64.8\n    group MALE\n  - x 164.1\n    y 71.6\n    group MALE\n  - x 169.5\n    y 52.8\n    group FEMALE\n  - x 163.2\n    y 59.8\n    group MALE\n  - x 154.5\n    y 49\n    group FEMALE\n  - x 159.8\n    y 50\n    group FEMALE\n  - x 173.2\n    y 69.2\n    group MALE\n  - x 170\n    y 55.9\n    group FEMALE\n  - x 161.4\n    y 63.4\n    group MALE\n  - x 169\n    y 58.2\n    group FEMALE\n  - x 166.2\n    y 58.6\n    group FEMALE\n  - x 159.4\n    y 45.7\n    group FEMALE\n  - x 162.5\n    y 52.2\n    group FEMALE\n  - x 159\n    y 48.6\n    group FEMALE\n  - x 162.8\n    y 57.8\n    group FEMALE\n  - x 159\n    y 55.6\n    group FEMALE\n  - x 179.8\n    y 66.8\n    group FEMALE\n  - x 162.9\n    y 59.4\n    group MALE\n  - x 161\n    y 53.6\n    group FEMALE\n  - x 151.1\n    y 73.2\n    group MALE\n  - x 168.2\n    y 53.4\n    group FEMALE\n  - x 168.9\n    y 69\n    group MALE\n  - x 173.2\n    y 58.4\n    group FEMALE\n  - x 171.8\n    y 56.2\n    group FEMALE\n  - x 178\n    y 70.6\n    group MALE\n  - x 164.3\n    y 59.8\n    group MALE\n  - x 163\n    y 72\n    group MALE\n  - x 168.5\n    y 65.2\n    group MALE\n  - x 166.8\n    y 56.6\n    group FEMALE\n  - x 172.7\n    y 105.2\n    group MALE\n  - x 163.5\n    y 51.8\n    group FEMALE\n  - x 169.4\n    y 63.4\n    group MALE\n  - x 167.8\n    y 59\n    group FEMALE\n  - x 159.5\n    y 47.6\n    group FEMALE\n  - x 167.6\n    y 63\n    group MALE\n  - x 161.2\n    y 55.2\n    group FEMALE\n  - x 160\n    y 45\n    group FEMALE\n  - x 163.2\n    y 54\n    group FEMALE\n  - x 162.2\n    y 50.2\n    group FEMALE\n  - x 161.3\n    y 60.2\n    group MALE\n  - x 149.5\n    y 44.8\n    group FEMALE\n  - x 157.5\n    y 58.8\n    group MALE\n  - x 163.2\n    y 56.4\n    group FEMALE\n  - x 172.7\n    y 62\n    group FEMALE\n  - x 155\n    y 49.2\n    group FEMALE\n  - x 156.5\n    y 67.2\n    group MALE\n  - x 164\n    y 53.8\n    group FEMALE\n  - x 160.9\n    y 54.4\n    group FEMALE\n  - x 162.8\n    y 58\n    group FEMALE\n  - x 167\n    y 59.8\n    group FEMALE\n  - x 160\n    y 54.8\n    group FEMALE\n  - x 160\n    y 43.2\n    group FEMALE\n  - x 168.9\n    y 60.5\n    group FEMALE\n  - x 158.2\n    y 46.4\n    group FEMALE\n  - x 156\n    y 64.4\n    group MALE\n  - x 160\n    y 48.8\n    group FEMALE\n  - x 167.1\n    y 62.2\n    group MALE\n  - x 158\n    y 55.5\n    group MALE\n  - x 167.6\n    y 57.8\n    group FEMALE\n  - x 156\n    y 54.6\n    group MALE\n  - x 162.1\n    y 59.2\n    group MALE\n  - x 173.4\n    y 52.7\n    group FEMALE\n  - x 159.8\n    y 53.2\n    group FEMALE\n  - x 170.5\n    y 64.5\n    group MALE\n  - x 159.2\n    y 51.8\n    group FEMALE\n  - x 157.5\n    y 56\n    group MALE\n  - x 161.3\n    y 63.6\n    group MALE\n  - x 162.6\n    y 63.2\n    group MALE\n  - x 160\n    y 59.5\n    group MALE\n  - x 168.9\n    y 56.8\n    group FEMALE\n  - x 165.1\n    y 64.1\n    group MALE\n  - x 162.6\n    y 50\n    group FEMALE\n  - x 165.1\n    y 72.3\n    group MALE\n  - x 166.4\n    y 55\n    group FEMALE\n  - x 160\n    y 55.9\n    group FEMALE\n  - x 152.4\n    y 60.4\n    group MALE\n  - x 170.2\n    y 69.1\n    group MALE\n  - x 162.6\n    y 84.5\n    group MALE\n  - x 170.2\n    y 55.9\n    group FEMALE\n  - x 158.8\n    y 55.5\n    group MALE\n  - x 172.7\n    y 69.5\n    group MALE\n  - x 167.6\n    y 76.4\n    group MALE\n  - x 162.6\n    y 61.4\n    group MALE\n  - x 167.6\n    y 65.9\n    group MALE\n  - x 156.2\n    y 58.6\n    group MALE\n  - x 175.2\n    y 66.8\n    group FEMALE\n  - x 172.1\n    y 56.6\n    group FEMALE\n  - x 162.6\n    y 58.6\n    group MALE\n  - x 160\n    y 55.9\n    group FEMALE\n  - x 165.1\n    y 59.1\n    group FEMALE\n  - x 182.9\n    y 81.8\n    group MALE\n  - x 166.4\n    y 70.7\n    group MALE\n  - x 165.1\n    y 56.8\n    group FEMALE\n  - x 177.8\n    y 60\n    group FEMALE\n  - x 165.1\n    y 58.2\n    group FEMALE\n  - x 175.3\n    y 72.7\n    group MALE\n  - x 154.9\n    y 54.1\n    group MALE\n  - x 158.8\n    y 49.1\n    group FEMALE\n  - x 172.7\n    y 75.9\n    group MALE\n  - x 168.9\n    y 55\n    group FEMALE\n  - x 161.3\n    y 57.3\n    group MALE\n  - x 167.6\n    y 55\n    group FEMALE\n  - x 165.1\n    y 65.5\n    group MALE\n  - x 175.3\n    y 65.5\n    group FEMALE\n  - x 157.5\n    y 48.6\n    group FEMALE\n  - x 163.8\n    y 58.6\n    group FEMALE\n  - x 167.6\n    y 63.6\n    group MALE\n  - x 165.1\n    y 55.2\n    group FEMALE\n  - x 165.1\n    y 62.7\n    group MALE\n  - x 168.9\n    y 56.6\n    group FEMALE\n  - x 162.6\n    y 53.9\n    group FEMALE\n  - x 164.5\n    y 63.2\n    group MALE\n  - x 176.5\n    y 73.6\n    group MALE\n  - x 168.9\n    y 62\n    group FEMALE\n  - x 175.3\n    y 63.6\n    group FEMALE\n  - x 159.4\n    y 53.2\n    group FEMALE\n  - x 160\n    y 53.4\n    group FEMALE\n  - x 170.2\n    y 55\n    group FEMALE\n  - x 162.6\n    y 70.5\n    group MALE\n  - x 167.6\n    y 54.5\n    group FEMALE\n  - x 162.6\n    y 54.5\n    group FEMALE\n  - x 160.7\n    y 55.9\n    group FEMALE\n  - x 160\n    y 59\n    group MALE\n  - x 157.5\n    y 63.6\n    group MALE\n  - x 162.6\n    y 54.5\n    group FEMALE\n  - x 152.4\n    y 47.3\n    group FEMALE\n  - x 170.2\n    y 67.7\n    group MALE\n  - x 165.1\n    y 80.9\n    group MALE\n  - x 172.7\n    y 70.5\n    group MALE\n  - x 165.1\n    y 60.9\n    group MALE\n  - x 170.2\n    y 63.6\n    group FEMALE\n  - x 170.2\n    y 54.5\n    group FEMALE\n  - x 170.2\n    y 59.1\n    group FEMALE\n  - x 161.3\n    y 70.5\n    group MALE\n  - x 167.6\n    y 52.7\n    group FEMALE\n  - x 167.6\n    y 62.7\n    group MALE\n  - x 165.1\n    y 86.3\n    group MALE\n  - x 162.6\n    y 66.4\n    group MALE\n  - x 152.4\n    y 67.3\n    group MALE\n  - x 168.9\n    y 63\n    group MALE\n  - x 170.2\n    y 73.6\n    group MALE\n  - x 175.2\n    y 62.3\n    group FEMALE\n  - x 175.2\n    y 57.7\n    group FEMALE\n  - x 160\n    y 55.4\n    group FEMALE\n  - x 165.1\n    y 104.1\n    group MALE\n  - x 174\n    y 55.5\n    group FEMALE\n  - x 170.2\n    y 77.3\n    group MALE\n  - x 160\n    y 80.5\n    group MALE\n  - x 167.6\n    y 64.5\n    group MALE\n  - x 167.6\n    y 72.3\n    group MALE\n  - x 167.6\n    y 61.4\n    group FEMALE\n  - x 154.9\n    y 58.2\n    group MALE\n  - x 162.6\n    y 81.8\n    group MALE\n  - x 175.3\n    y 63.6\n    group FEMALE\n  - x 171.4\n    y 53.4\n    group FEMALE\n  - x 157.5\n    y 54.5\n    group FEMALE\n  - x 165.1\n    y 53.6\n    group FEMALE\n  - x 160\n    y 60\n    group MALE\n  - x 174\n    y 73.6\n    group MALE\n  - x 162.6\n    y 61.4\n    group MALE\n  - x 174\n    y 55.5\n    group FEMALE\n  - x 162.6\n    y 63.6\n    group MALE\n  - x 161.3\n    y 60.9\n    group MALE\n  - x 156.2\n    y 60\n    group MALE\n  - x 149.9\n    y 46.8\n    group FEMALE\n  - x 169.5\n    y 57.3\n    group FEMALE\n  - x 160\n    y 64.1\n    group MALE\n  - x 175.3\n    y 63.6\n    group FEMALE\n  - x 169.5\n    y 67.3\n    group MALE\n  - x 160\n    y 75.5\n    group MALE\n  - x 172.7\n    y 68.2\n    group MALE\n  - x 162.6\n    y 61.4\n    group MALE\n  - x 157.5\n    y 76.8\n    group MALE\n  - x 176.5\n    y 71.8\n    group MALE\n  - x 164.4\n    y 55.5\n    group FEMALE\n  - x 160.7\n    y 48.6\n    group FEMALE\n  - x 174\n    y 66.4\n    group FEMALE\n  - x 163.8\n    y 67.3\n    group MALE\n  - x 174\n    y 65.6\n    group FEMALE\n  - x 175.3\n    y 71.8\n    group MALE\n  - x 193.5\n    y 80.7\n    group FEMALE\n  - x 186.5\n    y 72.6\n    group FEMALE\n  - x 187.2\n    y 78.8\n    group MALE\n  - x 181.5\n    y 74.8\n    group MALE\n  - x 184\n    y 86.4\n    group MALE\n  - x 184.5\n    y 78.4\n    group MALE\n  - x 175\n    y 62\n    group FEMALE\n  - x 184\n    y 81.6\n    group MALE\n  - x 180\n    y 76.6\n    group MALE\n  - x 177.8\n    y 83.6\n    group MALE\n  - x 192\n    y 90\n    group MALE\n  - x 176\n    y 74.6\n    group MALE\n  - x 174\n    y 71\n    group MALE\n  - x 184\n    y 79.6\n    group MALE\n  - x 192.7\n    y 93.8\n    group MALE\n  - x 171.5\n    y 70\n    group MALE\n  - x 173\n    y 72.4\n    group MALE\n  - x 176\n    y 85.9\n    group MALE\n  - x 176\n    y 78.8\n    group MALE\n  - x 180.5\n    y 77.8\n    group MALE\n  - x 172.7\n    y 66.2\n    group MALE\n  - x 176\n    y 86.4\n    group MALE\n  - x 173.5\n    y 81.8\n    group MALE\n  - x 178\n    y 89.6\n    group MALE\n  - x 180.3\n    y 82.8\n    group MALE\n  - x 180.3\n    y 76.4\n    group MALE\n  - x 164.5\n    y 63.2\n    group MALE\n  - x 173\n    y 60.9\n    group FEMALE\n  - x 183.5\n    y 74.8\n    group MALE\n  - x 175.5\n    y 70\n    group MALE\n  - x 188\n    y 72.4\n    group FEMALE\n  - x 189.2\n    y 84.1\n    group MALE\n  - x 172.8\n    y 69.1\n    group MALE\n  - x 170\n    y 59.5\n    group FEMALE\n  - x 182\n    y 67.2\n    group FEMALE\n  - x 170\n    y 61.3\n    group FEMALE\n  - x 177.8\n    y 68.6\n    group FEMALE\n  - x 184.2\n    y 80.1\n    group MALE\n  - x 186.7\n    y 87.8\n    group MALE\n  - x 171.4\n    y 84.7\n    group MALE\n  - x 172.7\n    y 73.4\n    group MALE\n  - x 175.3\n    y 72.1\n    group MALE\n  - x 180.3\n    y 82.6\n    group MALE\n  - x 182.9\n    y 88.7\n    group MALE\n  - x 188\n    y 84.1\n    group MALE\n  - x 177.2\n    y 94.1\n    group MALE\n  - x 172.1\n    y 74.9\n    group MALE\n  - x 167\n    y 59.1\n    group FEMALE\n  - x 169.5\n    y 75.6\n    group MALE\n  - x 174\n    y 86.2\n    group MALE\n  - x 172.7\n    y 75.3\n    group MALE\n  - x 182.2\n    y 87.1\n    group MALE\n  - x 164.1\n    y 55.2\n    group FEMALE\n  - x 163\n    y 57\n    group FEMALE\n  - x 171.5\n    y 61.4\n    group FEMALE\n  - x 184.2\n    y 76.8\n    group MALE\n  - x 174\n    y 86.8\n    group MALE\n  - x 174\n    y 72.2\n    group MALE\n  - x 177\n    y 71.6\n    group MALE\n  - x 186\n    y 84.8\n    group MALE\n  - x 167\n    y 68.2\n    group MALE\n  - x 171.8\n    y 66.1\n    group MALE\n  - x 182\n    y 72\n    group FEMALE\n  - x 167\n    y 64.6\n    group MALE\n  - x 177.8\n    y 74.8\n    group MALE\n  - x 164.5\n    y 70\n    group MALE\n  - x 192\n    y 101.6\n    group MALE\n  - x 175.5\n    y 63.2\n    group FEMALE\n  - x 171.2\n    y 79.1\n    group MALE\n  - x 181.6\n    y 78.9\n    group MALE\n  - x 167.4\n    y 67.7\n    group MALE\n  - x 181.1\n    y 66\n    group FEMALE\n  - x 177\n    y 68.2\n    group FEMALE\n  - x 174.5\n    y 63.9\n    group FEMALE\n  - x 177.5\n    y 72\n    group MALE\n  - x 170.5\n    y 56.8\n    group FEMALE\n  - x 182.4\n    y 74.5\n    group MALE\n  - x 197.1\n    y 90.9\n    group MALE\n  - x 180.1\n    y 93\n    group MALE\n  - x 175.5\n    y 80.9\n    group MALE\n  - x 180.6\n    y 72.7\n    group MALE\n  - x 184.4\n    y 68\n    group FEMALE\n  - x 175.5\n    y 70.9\n    group MALE\n  - x 180.6\n    y 72.5\n    group MALE\n  - x 177\n    y 72.5\n    group MALE\n  - x 177.1\n    y 83.4\n    group MALE\n  - x 181.6\n    y 75.5\n    group MALE\n  - x 176.5\n    y 73\n    group MALE\n  - x 175\n    y 70.2\n    group MALE\n  - x 174\n    y 73.4\n    group MALE\n  - x 165.1\n    y 70.5\n    group MALE\n  - x 177\n    y 68.9\n    group FEMALE\n  - x 192\n    y 102.3\n    group MALE\n  - x 176.5\n    y 68.4\n    group FEMALE\n  - x 169.4\n    y 65.9\n    group MALE\n  - x 182.1\n    y 75.7\n    group MALE\n  - x 179.8\n    y 84.5\n    group MALE\n  - x 175.3\n    y 87.7\n    group MALE\n  - x 184.9\n    y 86.4\n    group MALE\n  - x 177.3\n    y 73.2\n    group MALE\n  - x 167.4\n    y 53.9\n    group FEMALE\n  - x 178.1\n    y 72\n    group MALE\n  - x 168.9\n    y 55.5\n    group FEMALE\n  - x 157.2\n    y 58.4\n    group MALE\n  - x 180.3\n    y 83.2\n    group MALE\n  - x 170.2\n    y 72.7\n    group MALE\n  - x 177.8\n    y 64.1\n    group FEMALE\n  - x 172.7\n    y 72.3\n    group MALE\n  - x 165.1\n    y 65\n    group MALE\n  - x 186.7\n    y 86.4\n    group MALE\n  - x 165.1\n    y 65\n    group MALE\n  - x 174\n    y 88.6\n    group MALE\n  - x 175.3\n    y 84.1\n    group MALE\n  - x 185.4\n    y 66.8\n    group FEMALE\n  - x 177.8\n    y 75.5\n    group MALE\n  - x 180.3\n    y 93.2\n    group MALE\n  - x 180.3\n    y 82.7\n    group MALE\n  - x 177.8\n    y 58\n    group FEMALE\n  - x 177.8\n    y 79.5\n    group MALE\n  - x 177.8\n    y 78.6\n    group MALE\n  - x 177.8\n    y 71.8\n    group MALE\n  - x 177.8\n    y 116.4\n    group MALE\n  - x 163.8\n    y 72.2\n    group MALE\n  - x 188\n    y 83.6\n    group MALE\n  - x 198.1\n    y 85.5\n    group FEMALE\n  - x 175.3\n    y 90.9\n    group MALE\n  - x 166.4\n    y 85.9\n    group MALE\n  - x 190.5\n    y 89.1\n    group MALE\n  - x 166.4\n    y 75\n    group MALE\n  - x 177.8\n    y 77.7\n    group MALE\n  - x 179.7\n    y 86.4\n    group MALE\n  - x 172.7\n    y 90.9\n    group MALE\n  - x 190.5\n    y 73.6\n    group FEMALE\n  - x 185.4\n    y 76.4\n    group MALE\n  - x 168.9\n    y 69.1\n    group MALE\n  - x 167.6\n    y 84.5\n    group MALE\n  - x 175.3\n    y 64.5\n    group FEMALE\n  - x 170.2\n    y 69.1\n    group MALE\n  - x 190.5\n    y 108.6\n    group MALE\n  - x 177.8\n    y 86.4\n    group MALE\n  - x 190.5\n    y 80.9\n    group MALE\n  - x 177.8\n    y 87.7\n    group MALE\n  - x 184.2\n    y 94.5\n    group MALE\n  - x 176.5\n    y 80.2\n    group MALE\n  - x 177.8\n    y 72\n    group MALE\n  - x 180.3\n    y 71.4\n    group FEMALE\n  - x 171.4\n    y 72.7\n    group MALE\n  - x 172.7\n    y 84.1\n    group MALE\n  - x 172.7\n    y 76.8\n    group MALE\n  - x 177.8\n    y 63.6\n    group FEMALE\n  - x 177.8\n    y 80.9\n    group MALE\n  - x 182.9\n    y 80.9\n    group MALE\n  - x 170.2\n    y 85.5\n    group MALE\n  - x 167.6\n    y 68.6\n    group MALE\n  - x 175.3\n    y 67.7\n    group MALE\n  - x 165.1\n    y 66.4\n    group MALE\n  - x 185.4\n    y 102.3\n    group MALE\n  - x 181.6\n    y 70.5\n    group FEMALE\n  - x 172.7\n    y 95.9\n    group MALE\n  - x 190.5\n    y 84.1\n    group MALE\n  - x 179.1\n    y 87.3\n    group MALE\n  - x 175.3\n    y 71.8\n    group MALE\n  - x 170.2\n    y 65.9\n    group MALE\n  - x 193\n    y 95.9\n    group MALE\n  - x 171.4\n    y 91.4\n    group MALE\n  - x 177.8\n    y 81.8\n    group MALE\n  - x 177.8\n    y 96.8\n    group MALE\n  - x 167.6\n    y 69.1\n    group MALE\n  - x 167.6\n    y 82.7\n    group MALE\n  - x 180.3\n    y 75.5\n    group MALE\n  - x 182.9\n    y 79.5\n    group MALE\n  - x 176.5\n    y 73.6\n    group MALE\n  - x 186.7\n    y 91.8\n    group MALE\n  - x 188\n    y 84.1\n    group MALE\n  - x 188\n    y 85.9\n    group MALE\n  - x 177.8\n    y 81.8\n    group MALE\n  - x 174\n    y 82.5\n    group MALE\n  - x 177.8\n    y 80.5\n    group MALE\n  - x 171.4\n    y 70\n    group MALE\n  - x 185.4\n    y 81.8\n    group MALE\n  - x 185.4\n    y 84.1\n    group MALE\n  - x 188\n    y 90.5\n    group MALE\n  - x 188\n    y 91.4\n    group MALE\n  - x 182.9\n    y 89.1\n    group MALE\n  - x 176.5\n    y 85\n    group MALE\n  - x 175.3\n    y 69.1\n    group MALE\n  - x 175.3\n    y 73.6\n    group MALE\n  - x 188\n    y 80.5\n    group MALE\n  - x 188\n    y 82.7\n    group MALE\n  - x 175.3\n    y 86.4\n    group MALE\n  - x 170.5\n    y 67.7\n    group MALE\n  - x 179.1\n    y 92.7\n    group MALE\n  - x 177.8\n    y 93.6\n    group MALE\n  - x 175.3\n    y 70.9\n    group MALE\n  - x 182.9\n    y 75\n    group MALE\n  - x 170.8\n    y 93.2\n    group MALE\n  - x 188\n    y 93.2\n    group MALE\n  - x 180.3\n    y 77.7\n    group MALE\n  - x 177.8\n    y 61.4\n    group FEMALE\n  - x 185.4\n    y 94.1\n    group MALE\n  - x 168.9\n    y 75\n    group MALE\n  - x 185.4\n    y 83.6\n    group MALE\n  - x 180.3\n    y 85.5\n    group MALE\n  - x 174\n    y 73.9\n    group MALE\n  - x 167.6\n    y 66.8\n    group MALE\n  - x 182.9\n    y 87.3\n    group MALE\n  - x 160\n    y 72.3\n    group MALE\n  - x 180.3\n    y 88.6\n    group MALE\n  - x 167.6\n    y 75.5\n    group MALE\n  - x 186.7\n    y 101.4\n    group MALE\n  - x 175.3\n    y 91.1\n    group MALE\n  - x 175.3\n    y 67.3\n    group FEMALE\n  - x 175.9\n    y 77.7\n    group MALE\n  - x 175.3\n    y 81.8\n    group MALE\n  - x 179.1\n    y 75.5\n    group MALE\n  - x 181.6\n    y 84.5\n    group MALE\n  - x 177.8\n    y 76.6\n    group MALE\n  - x 182.9\n    y 85\n    group MALE\n  - x 177.8\n    y 102.5\n    group MALE\n  - x 184.2\n    y 77.3\n    group MALE\n  - x 179.1\n    y 71.8\n    group MALE\n  - x 176.5\n    y 87.9\n    group MALE\n  - x 188\n    y 94.3\n    group MALE\n  - x 174\n    y 70.9\n    group MALE\n  - x 167.6\n    y 64.5\n    group MALE\n  - x 170.2\n    y 77.3\n    group MALE\n  - x 167.6\n    y 72.3\n    group MALE\n  - x 188\n    y 87.3\n    group MALE\n  - x 174\n    y 80\n    group MALE\n  - x 176.5\n    y 82.3\n    group MALE\n  - x 180.3\n    y 73.6\n    group MALE\n  - x 167.6\n    y 74.1\n    group MALE\n  - x 188\n    y 85.9\n    group MALE\n  - x 180.3\n    y 73.2\n    group MALE\n  - x 167.6\n    y 76.3\n    group MALE\n  - x 183\n    y 65.9\n    group FEMALE\n  - x 183\n    y 90.9\n    group MALE\n  - x 179.1\n    y 89.1\n    group MALE\n  - x 170.2\n    y 62.3\n    group FEMALE\n  - x 177.8\n    y 82.7\n    group MALE\n  - x 179.1\n    y 79.1\n    group MALE\n  - x 190.5\n    y 98.2\n    group MALE\n  - x 177.8\n    y 84.1\n    group MALE\n  - x 180.3\n    y 83.2\n    group MALE\n  - x 180.3\n    y 83.2\n    group MALE\naxisXTitle 身高(cm)\naxisYTitle 体重(kg)\ntitle 身高体重分组分布',
      },
    ],
  },
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    icon: '📊',
    description:
      '条形图是一种使用水平矩形条对不同类别进行数值比较的统计图表。与柱状图不同的是，条形图的矩形条是从左到右排列的，而不是从下到上。条形图同样需要一个分类变量和一个数值变量。在条形图上，分类变量的每个实体被表示为一个水平矩形条，而数值决定了矩形条的长度。',
    knowledge: {
      introduction:
        '条形图是一种使用水平矩形条对不同类别进行数值比较的统计图表。与柱状图不同的是，条形图的矩形条是从左到右排列的，而不是从下到上。条形图同样需要一个分类变量和一个数值变量。在条形图上，分类变量的每个实体被表示为一个水平矩形条，而数值决定了矩形条的长度。',
      useCases: [
        '条形图适合对分类数据进行比较，尤其是在分类名称较长，或当分类项数量较多的情况下，由于条形图的水平排列更便于显示这些类别',
        '此外，条形图也更适合横向对比',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "bar"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组对象类型；',
        },
        {
          property: 'data.category',
          type: 'required',
          description: '数据分类名称，必填，文本或数值类型；',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '数据分类值，必填，数值类型；',
        },
        {
          property: 'data.group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型；',
        },
        {
          property: 'group',
          type: 'optional',
          description: '是否开启分组，开启分组条形图需数据中含有 group 字段 ，选填，布尔类型。',
        },
        {
          property: 'stack',
          type: 'optional',
          description: '是否开启堆叠，开启堆叠条形图需数据中含有 group 字段，选填，布尔类型。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
        },
        {
          property: 'axisXTitle',
          type: 'optional',
          description: 'x 轴的标题，选填，文本类型。',
        },
        {
          property: 'axisYTitle',
          type: 'optional',
          description: 'y 轴的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用条形图可视化。',
        description:
          '海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用条形图可视化。',
        code: 'vis bar\ndata\n  - category "2015 年"\n    value 80\n  - category "2016 年"\n    value 140\n  - category "2017 年"\n    value 220\ntitle 海底捞公司外卖收入\naxisXTitle 年份\naxisYTitle "金额 （百万元）"',
      },
      {
        title:
          '用条形图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ ...',
        description:
          '用条形图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ ...',
        code: 'vis bar\ndata\n  - category 第一产业\n    value 7200.0\n  - category 第二产业\n    value 36600.0\n  - category 第三产业\n    value 41000.0\naxisXTitle name\naxisYTitle industrial',
      },
      {
        title:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976...',
        description:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976...',
        code: 'vis bar\ndata\n  - category 北京\n    value 825.6\n    group 油车\n  - category 北京\n    value 60.2\n    group 新能源汽车\n  - category 上海\n    value 450\n    group 油车\n  - category 上海\n    value 95\n    group 新能源汽车\n  - category 深圳\n    value 506\n    group 油车\n  - category 深圳\n    value 76.7\n    group 新能源汽车\n  - category 广州\n    value 976.6\n    group 油车\n  - category 广州\n    value 97.2\n    group 新能源汽车\n  - category 杭州\n    value 651.2\n    group 油车\n  - category 杭州\n    value 62\n    group 新能源汽车\ngroup true\ntitle 油车与新能源汽车售卖量\naxisXTitle 城市\naxisYTitle "售卖量 （万辆）"',
      },
    ],
  },
  {
    id: 'column-chart',
    name: 'Column Chart',
    icon: '📊',
    description:
      '柱状图，是一种使用柱形条，对不同类别进行数值比较的统计图表。最基础的柱形图，需要一个分类变量和一个数值变量。在柱状图上，分类变量的每个实体都被表示为一个矩形（通俗讲即为“柱子”），而数值则决定了柱子的高度。',
    knowledge: {
      introduction:
        '柱状图，是一种使用柱形条，对不同类别进行数值比较的统计图表。最基础的柱形图，需要一个分类变量和一个数值变量。在柱状图上，分类变量的每个实体都被表示为一个矩形（通俗讲即为“柱子”），而数值则决定了柱子的高度。',
      useCases: [
        '柱状图最适合对分类的数据进行比较',
        '尤其是当数值比较接近时，由于人眼对于高度的感知优于其他视觉元素（如面积、角度等），因此，使用柱状图更加合适',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "column"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组对象类型；',
        },
        {
          property: 'data.category',
          type: 'required',
          description: '数据分类名称，必填，文本类型；',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '数据分类值，必填，数值类型；',
        },
        {
          property: 'data.group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型；',
        },
        {
          property: 'group',
          type: 'optional',
          description: '是否开启分组，开启分组柱形图需数据中含有 group 字段 ，选填，布尔类型。',
        },
        {
          property: 'stack',
          type: 'optional',
          description: '是否开启堆叠，开启堆叠柱形图需数据中含有 group 字段，选填，布尔类型。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
        },
        {
          property: 'axisXTitle',
          type: 'optional',
          description: 'x 轴的标题，选填，文本类型。',
        },
        {
          property: 'axisYTitle',
          type: 'optional',
          description: 'y 轴的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用柱形图可视化。',
        description:
          '海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用柱形图可视化。',
        code: 'vis column\ndata\n  - category "2015 年"\n    value 80\n  - category "2016 年"\n    value 140\n  - category "2017 年"\n    value 220\ntitle 海底捞公司外卖收入\naxisXTitle 年份\naxisYTitle "金额 （百万元）"',
      },
      {
        title:
          '用柱形图可视化我的数据 [{ "title": "第一产业","industrial": 7200.0 },{ "title": "第二产业", "industrial": 36600.0 },...',
        description:
          '用柱形图可视化我的数据 [{ "title": "第一产业","industrial": 7200.0 },{ "title": "第二产业", "industrial": 36600.0 },...',
        code: 'vis column\ndata\n  - category 第一产业\n    value 7200.0\n  - category 第二产业\n    value 36600.0\n  - category 第三产业\n    value 41000.0\naxisXTitle title\naxisYTitle industrial',
      },
      {
        title:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976...',
        description:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976...',
        code: 'vis column\ndata\n  - category 北京\n    value 825.6\n    group 油车\n  - category 北京\n    value 60.2\n    group 新能源汽车\n  - category 上海\n    value 450\n    group 油车\n  - category 上海\n    value 95\n    group 新能源汽车\n  - category 深圳\n    value 506\n    group 油车\n  - category 深圳\n    value 76.7\n    group 新能源汽车\n  - category 广州\n    value 976.6\n    group 油车\n  - category 广州\n    value 97.2\n    group 新能源汽车\n  - category 杭州\n    value 651.2\n    group 油车\n  - category 杭州\n    value 62\n    group 新能源汽车\ngroup true\ntitle 油车与新能源汽车售卖量\naxisXTitle 城市\naxisYTitle "售卖量 （万辆）"',
      },
    ],
  },
  {
    id: 'sankey-diagram',
    name: 'Sankey Diagram',
    icon: '🌊',
    description:
      '桑基图是一种用于可视化流量、能量、资金等在不同节点间流动关系的图表。通过带宽表示流量大小，节点和流向线条直观展示各部分的流向和分布，常用于能量流、资金流、用户路径等分析场景。',
    knowledge: {
      introduction:
        '桑基图是一种用于可视化流量、能量、资金等在不同节点间流动关系的图表。通过带宽表示流量大小，节点和流向线条直观展示各部分的流向和分布，常用于能量流、资金流、用户路径等分析场景。',
      useCases: [
        '适合展示各类流量分布和流向关系，如能源流动、资金流转、用户行为路径、供应链流动等',
        '突出流量的分布结构和流向路径',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表类型，必填，文本类型，值为 "sankey"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '桑基图数据，必填，数组类型。',
        },
        {
          property: 'data.source',
          type: 'required',
          description: '源节点名称，必填，文本类型。',
        },
        {
          property: 'data.target',
          type: 'required',
          description: '目标节点名称，必填，文本类型。',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '流量值，必填，数值类型。',
        },
        {
          property: 'nodeAlign',
          type: 'optional',
          description:
            '节点对齐方式，选填，文本类型，可选值为 "left" | "center" | "right" | "justify"，默认值为 "center"。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，合法颜色值数组。',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
      ],
    },
    examples: [
      {
        title: '展示能源流动关系。',
        description: '展示能源流动关系。',
        code: 'vis sankey\ndata\n  - source 煤炭\n    target 发电厂\n    value 120\n  - source 天然气\n    target 发电厂\n    value 80\n  - source 发电厂\n    target 工业\n    value 100\n  - source 发电厂\n    target 居民\n    value 60\n  - source 发电厂\n    target 商业\n    value 40\nnodeAlign justify\ntitle 能源流动关系',
      },
      {
        title: '展示资金流转路径, 主题为 dark。',
        description: '展示资金流转路径, 主题为 dark。',
        code: 'vis sankey\ndata\n  - source 投资人\n    target 创业公司\n    value 200\n  - source 创业公司\n    target 市场营销\n    value 80\n  - source 创业公司\n    target 研发\n    value 120\n  - source 市场营销\n    target 客户\n    value 70\n  - source 研发\n    target 客户\n    value 50\nnodeAlign center\ntitle 资金流转路径\ntheme dark',
      },
      {
        title: '展示用户行为路径, 自定义配色。',
        description: '展示用户行为路径, 自定义配色。',
        code: 'vis sankey\ndata\n  - source 首页\n    target 产品页\n    value 300\n  - source 产品页\n    target 购物车\n    value 150\n  - source 购物车\n    target 结算页\n    value 100\n  - source 结算页\n    target 支付成功\n    value 80\n  - source 结算页\n    target 支付失败\n    value 20\nnodeAlign left\ntitle 用户行为路径\nstyle\n  palette #5B8FF9 #61DDAA #65789B #F6BD16 #7262FD\n  backgroundColor #f0f2f5',
      },
    ],
  },
  {
    id: 'liquid-chart',
    name: 'Liquid Chart',
    icon: '💧',
    description:
      '水波图是一种用液体填充效果表现数值占比的图表。通常以圆形容器为载体，通过液面高度和波动动态，直观展示某个指标的当前进度或占比。液体的高度代表数值的百分比，波动效果增强视觉表现力，适合展示单一指标的完成度或状态。',
    knowledge: {
      introduction:
        '水波图是一种用液体填充效果表现数值占比的图表。通常以圆形容器为载体，通过液面高度和波动动态，直观展示某个指标的当前进度或占比。液体的高度代表数值的百分比，波动效果增强视觉表现力，适合展示单一指标的完成度或状态。',
      useCases: [
        '用于展示某项指标的进度、占比，如任务完成度、资源使用率、KPI 达成率等',
        '适合突出单一数值的当前状态',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表类型，必填，文本类型，值为 "liquid"。',
        },
        {
          property: 'percent',
          type: 'required',
          description: '填充百分比，必填，数值类型，取值范围 0~1。',
        },
        {
          property: 'shape',
          type: 'optional',
          description:
            '图表形状，选填，文本类型，可选值为 "rect" | "circle" | "pin" | "triangle"，默认值为 "circle"。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，合法颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title: '展示某任务完成度为 75%。',
        description: '展示某任务完成度为 75%。',
        code: 'vis liquid\npercent 0.75\ntitle 任务完成度',
      },
      {
        title: '展示服务器资源使用率为 60%，主题为 dark。',
        description: '展示服务器资源使用率为 60%，主题为 dark。',
        code: 'vis liquid\npercent 0.6\ntitle 资源使用率\ntheme dark',
      },
      {
        title: '展示 KPI 达成率为 92%，自定义水波图形状为三角形，以及水波图颜色和背景色。',
        description: '展示 KPI 达成率为 92%，自定义水波图形状为三角形，以及水波图颜色和背景色。',
        code: 'vis liquid\npercent 0.92\ntitle "KPI 达成率"\nshape triangle\nstyle\n  palette #00BFFF\n  backgroundColor #F0F0F0',
      },
    ],
  },

  {
    id: 'funnel-chart',
    name: 'Funnel Chart',
    icon: '🔻',
    description:
      '漏斗图是一种用于展示数据在多个阶段逐步流失或转化的图表。通常以漏斗形状表现各阶段的数据量，顶部宽底部窄，直观反映每个环节的数量变化和转化率。适合分析流程中的瓶颈和优化空间。',
    knowledge: {
      introduction:
        '漏斗图是一种用于展示数据在多个阶段逐步流失或转化的图表。通常以漏斗形状表现各阶段的数据量，顶部宽底部窄，直观反映每个环节的数量变化和转化率。适合分析流程中的瓶颈和优化空间。',
      useCases: [
        '用于展示销售流程、用户转化、活动参与等多阶段数据流失或转化情况',
        '适合突出各阶段的数量分布和转化效率',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表类型，必填，文本类型，值为 "funnel"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '漏斗图数据，必填，数组类型，每项包含 category（名称）和 value（数值）。',
        },
        {
          property: 'data.category',
          type: 'required',
          description: '数据名称，必填，文本类型。',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '数据数值，必填，数值类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，合法颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '电商平台用户购买转化漏斗：从浏览网站（50000人）到完成交易（8000人），分析各环节转化瓶颈。',
        description:
          '电商平台用户购买转化漏斗：从浏览网站（50000人）到完成交易（8000人），分析各环节转化瓶颈。',
        code: 'vis funnel\ndata\n  - category 浏览网站\n    value 50000\n  - category 放入购物车\n    value 35000\n  - category 生成订单\n    value 25000\n  - category 支付订单\n    value 15000\n  - category 完成交易\n    value 8000\ntitle 电商平台购买转化漏斗',
      },
      {
        title:
          'SaaS 产品用户生命周期转化漏斗（主题 dark）：从注册（12400人）到成为付费用户（1860人）的各阶段留存情况。',
        description:
          'SaaS 产品用户生命周期转化漏斗（主题 dark）：从注册（12400人）到成为付费用户（1860人）的各阶段留存情况。',
        code: 'vis funnel\ndata\n  - category 注册用户\n    value 12400\n  - category 完成新手引导\n    value 8370\n  - category 7日活跃\n    value 5240\n  - category 30日活跃\n    value 3180\n  - category 付费用户\n    value 1860\ntitle SaaS产品用户转化漏斗\ntheme dark',
      },
      {
        title:
          '2024年"双11"大促活动参与漏斗：从收到推送（180000人）到完成分享（52000人），自定义颜色。',
        description:
          '2024年"双11"大促活动参与漏斗：从收到推送（180000人）到完成分享（52000人），自定义颜色。',
        code: 'vis funnel\ndata\n  - category 收到活动推送\n    value 180000\n  - category 点击进入活动页\n    value 124000\n  - category 参与互动游戏\n    value 89300\n  - category 完成分享任务\n    value 52000\ntitle 双11大促活动参与漏斗\nstyle\n  palette #FF7F50 #87CEFA #32CD32 #FFD700\n  backgroundColor #FFF8DC',
      },
    ],
  },
  {
    id: 'waterfall-chart',
    name: 'Waterfall Chart',
    icon: '💧',
    description:
      '瀑布图用于展示数值从起点到终点的逐步变化过程，清晰地分解增量和减量的贡献。通过起始值、多个正负变化值和最终结果，帮助分析各环节对总体的影响，常用于财务报表、预算对比和阶段性指标拆解。',
    knowledge: {
      introduction:
        '瀑布图用于展示数值从起点到终点的逐步变化过程，清晰地分解增量和减量的贡献。通过起始值、多个正负变化值和最终结果，帮助分析各环节对总体的影响，常用于财务报表、预算对比和阶段性指标拆解。',
      useCases: [
        '展示营收、成本等财务数据的逐步增减过程',
        '对比预算与实际，分析各项差异的贡献',
        '展示项目进度或关键指标的阶段性变化',
        '分析渠道/地域/部门对总体指标的影响',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "waterfall"',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组类型，每个元素包含：',
        },
        {
          property: 'data.category',
          type: 'required',
          description: '步骤名称或类别名称，必填，字符串类型',
        },
        {
          property: 'data.value',
          type: 'optional',
          description: '该步骤的增量或减量，选填，数值类型（正数表示增加，负数表示减少）',
        },
        {
          property: 'data.isIntermediateTotal',
          type: 'optional',
          description: '是否为中间总计栏，选填，布尔类型，默认为 false',
        },
        {
          property: 'data.isTotal',
          type: 'optional',
          description: '是否为总计栏，选填，布尔类型，默认为 false',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
        },
        {
          property: 'axisXTitle',
          type: 'optional',
          description: 'x 轴的标题，选填，文本类型。',
        },
        {
          property: 'axisYTitle',
          type: 'optional',
          description: 'y 轴的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，对象类型。',
        },
        {
          property: 'style.positiveColor',
          type: 'optional',
          description: '正向颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'style.negativeColor',
          type: 'optional',
          description: '负向颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'style.totalColor',
          type: 'optional',
          description: '总计颜色，选填，文本类型，合法颜色值。',
        },
      ],
    },
    examples: [
      {
        title:
          '季度收益瀑布图：展示各季度收益变化，包含前三季度总计和四五季度总计两个中间小计节点。',
        description:
          '季度收益瀑布图：展示各季度收益变化，包含前三季度总计和四五季度总计两个中间小计节点。',
        code: 'vis waterfall\ndata\n  - category 第一季度\n    value 120000000\n  - category 第二季度\n    value 569000000\n  - category 第三季度\n    value 231000000\n  - category 前三季度总计\n    isIntermediateTotal true\n  - category 第四季度\n    value -342000000\n  - category 第五季度\n    value -232000000\n  - category 四五季度总计\n    isIntermediateTotal true\n  - category 总计\n    isTotal true\ntitle 季度收益瀑布图',
      },
      {
        title:
          '季度收益瀑布图：展示四个季度的收益变化，第一季度 620 万，第二季度减少 260 万，第三季度增加 410 万，第四季度增加 370 万，总计 1140 万。',
        description:
          '季度收益瀑布图：展示四个季度的收益变化，第一季度 620 万，第二季度减少 260 万，第三季度增加 410 万，第四季度增加 370 万，总计 1140 万。',
        code: 'vis waterfall\ndata\n  - category 第一季度\n    value 6200000\n  - category 第二季度\n    value -2600000\n  - category 第三季度\n    value 4100000\n  - category 第四季度\n    value 3700000\n  - category 总计\n    value 11400000\n    isTotal true\ntitle 季度收益瀑布图',
      },
    ],
  },
  {
    id: 'histogram',
    name: 'Histogram',
    icon: '📊',
    description:
      '直方图是一种显示数据分布的图表，它通过柱形条表示某个范围内数据点的频率。每个柱形条的高度（或长度）表示数据点在特定区间内出现的次数，X 轴表示数据的取值范围，Y 轴表示频率或数量。直方图主要用于表示连续型变量的数据分布，并帮助分析数据的集中趋势、离散程度和形态。 直方图与柱状图的区别，直方图反映数据分布情况，柱状图只能对数值进行比较。从数据结构来说，柱状图需要一个分类变量，是离散的（如一班、二班、三班），因此柱子间有空隙。但直方图的数据均为连续的数值变量（如成绩），因此柱子间是没有空隙的。',
    knowledge: {
      introduction:
        '直方图是一种显示数据分布的图表，它通过柱形条表示某个范围内数据点的频率。每个柱形条的高度（或长度）表示数据点在特定区间内出现的次数，X 轴表示数据的取值范围，Y 轴表示频率或数量。直方图主要用于表示连续型变量的数据分布，并帮助分析数据的集中趋势、离散程度和形态。 直方图与柱状图的区别，直方图反映数据分布情况，柱状图只能对数值进行比较。从数据结构来说，柱状图需要一个分类变量，是离散的（如一班、二班、三班），因此柱子间有空隙。但直方图的数据均为连续的数值变量（如成绩），因此柱子间是没有空隙的。',
      useCases: [
        '观察数据的分布情况，例如正态分布、偏态分布等。',
        '识别数据的集中区域和极值点，帮助分析数据的变异性和集中性。',
        '处理连续型数据，将其划分为多个区间，并对每个区间的频率进行统计。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "histogram"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数值类型的数组。',
        },
        {
          property: 'binNumber',
          type: 'optional',
          description: '区间个数，可选，数值类型，用于定义直方图的区间数量。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，可选，文本类型，用于定义直方图的图表标题。',
        },
        {
          property: 'axisXTitle',
          type: 'optional',
          description: 'X 轴的轴标题文本，可选，文本类型。',
        },
        {
          property: 'axisXTitle',
          type: 'optional',
          description: 'Y 轴的轴标题文本，可选，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的 颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '用直方图展示100名学生考试成绩的分布，成绩范围34-100分，划分为10个区间',
        description:
          '用直方图展示100名学生考试成绩的分布，成绩范围34-100分，划分为10个区间',
        code: 'vis histogram\ndata\n  - 38\n  - 42\n  - 45\n  - 47\n  - 49\n  - 51\n  - 53\n  - 54\n  - 55\n  - 56\n  - 57\n  - 58\n  - 58\n  - 59\n  - 60\n  - 60\n  - 61\n  - 61\n  - 62\n  - 62\n  - 63\n  - 63\n  - 64\n  - 64\n  - 65\n  - 65\n  - 66\n  - 66\n  - 67\n  - 67\n  - 68\n  - 68\n  - 69\n  - 69\n  - 70\n  - 70\n  - 71\n  - 71\n  - 72\n  - 72\n  - 73\n  - 73\n  - 74\n  - 74\n  - 75\n  - 75\n  - 76\n  - 76\n  - 77\n  - 77\n  - 78\n  - 78\n  - 79\n  - 79\n  - 80\n  - 80\n  - 81\n  - 81\n  - 82\n  - 82\n  - 83\n  - 83\n  - 84\n  - 84\n  - 85\n  - 85\n  - 86\n  - 86\n  - 87\n  - 87\n  - 88\n  - 88\n  - 89\n  - 89\n  - 90\n  - 90\n  - 91\n  - 92\n  - 93\n  - 94\n  - 52\n  - 56\n  - 57\n  - 59\n  - 62\n  - 65\n  - 68\n  - 71\n  - 74\n  - 76\n  - 79\n  - 82\n  - 85\n  - 88\n  - 91\n  - 95\n  - 34\n  - 41\n  - 46\n  - 97\nbinNumber 10\ntitle 成绩分布\naxisXTitle 分数\naxisYTitle 人数',
      },
      {
        title:
          '某工厂50个产品重量分布，大部分集中在45-55克区间',
        description:
          '某工厂50个产品重量分布，大部分集中在45-55克区间',
        code: 'vis histogram\ndata\n  - 35\n  - 38\n  - 42\n  - 44\n  - 45\n  - 46\n  - 47\n  - 47\n  - 48\n  - 48\n  - 48\n  - 49\n  - 49\n  - 49\n  - 50\n  - 50\n  - 50\n  - 50\n  - 51\n  - 51\n  - 51\n  - 51\n  - 52\n  - 52\n  - 52\n  - 53\n  - 53\n  - 53\n  - 54\n  - 54\n  - 55\n  - 55\n  - 55\n  - 56\n  - 56\n  - 57\n  - 57\n  - 58\n  - 58\n  - 59\n  - 60\n  - 61\n  - 62\n  - 63\n  - 65\n  - 68\n  - 72\n  - 75\n  - 78\nbinNumber 8\ntitle 产品重量分布\naxisXTitle 重量(克)\naxisYTitle 数量',
      },
      {
        title:
          '鸢尾花花瓣长度分布：测量100朵鸢尾花，花瓣长度在1.2-6.9厘米之间呈双峰分布',
        description:
          '鸢尾花花瓣长度分布：测量100朵鸢尾花，花瓣长度在1.2-6.9厘米之间呈双峰分布',
        code: 'vis histogram\ndata\n  - 1.2\n  - 1.3\n  - 1.4\n  - 1.4\n  - 1.5\n  - 1.5\n  - 1.5\n  - 1.6\n  - 1.6\n  - 1.7\n  - 3.0\n  - 3.3\n  - 3.5\n  - 3.7\n  - 3.9\n  - 4.0\n  - 4.2\n  - 4.4\n  - 4.5\n  - 4.5\n  - 4.6\n  - 4.7\n  - 4.8\n  - 4.9\n  - 5.0\n  - 5.0\n  - 5.1\n  - 5.1\n  - 5.2\n  - 5.2\n  - 5.3\n  - 5.3\n  - 5.4\n  - 5.4\n  - 5.5\n  - 5.5\n  - 5.6\n  - 5.6\n  - 5.7\n  - 5.7\n  - 5.8\n  - 5.8\n  - 5.9\n  - 6.0\n  - 6.1\n  - 6.2\n  - 6.3\n  - 6.4\n  - 6.5\n  - 6.6\n  - 6.7\n  - 6.8\n  - 6.9\nbinNumber 12\ntitle 鸢尾花花瓣长度分布\naxisXTitle 花瓣长度(cm)\naxisYTitle 数量',
      },
    ],
  },
  {
    id: 'treemap',
    name: 'Treemap',
    icon: '🗺️',
    description:
      '矩阵树图是一种用于显示数据分层结构的图表，它通过将数据分级嵌套在矩形区域中来展示层级关系。每个矩形代表一个类别，矩形的大小对应于该类别的数值大小。矩阵树图非常适合可视化多个类别之间的比例，尤其在数据量较大时，可以帮助快速分析数据的重要性或权重。',
    knowledge: {
      introduction:
        '矩阵树图是一种用于显示数据分层结构的图表，它通过将数据分级嵌套在矩形区域中来展示层级关系。每个矩形代表一个类别，矩形的大小对应于该类别的数值大小。矩阵树图非常适合可视化多个类别之间的比例，尤其在数据量较大时，可以帮助快速分析数据的重要性或权重。',
      useCases: [
        '显示具有层级结构的数据，例如公司组织结构、目录文件系统等。',
        '对多个分类项目进行对比，展示各类别在整体中的占比。',
        '分析各类目之间的关系、比例以及子类别对父类别的贡献。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "treemap"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组对象类型，包含多个嵌套对象；',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '分类名称，必填，文本类型；',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '分类的数值大小，必填，数值类型；',
        },
        {
          property: 'data.children',
          type: 'optional',
          description: '子分类列表，可选，数组对象类型；',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '用矩阵树图展示某科技公司各部门员工人数：技术部 100 人（前端组 40 人、后端组 35 人、测试组 25 人），产品部 80 人（产品设计组 50 人、用户研究组 30 人）。',
        description:
          '用矩阵树图展示某科技公司各部门员工人数：技术部 100 人（前端组 40 人、后端组 35 人、测试组 25 人），产品部 80 人（产品设计组 50 人、用户研究组 30 人）。',
        code: 'vis treemap\ndata\n  - name 技术部\n    value 100\n    children\n      - name 前端组\n        value 40\n      - name 后端组\n        value 35\n      - name 测试组\n        value 25\n  - name 产品部\n    value 80\n    children\n      - name 产品设计组\n        value 50\n      - name 用户研究组\n        value 30',
      },
      {
        title:
          '用矩阵树图展示产品销售情况的数据 [{ "name": "产品 A", "sales": 500, "children": [{ "name": "子产品 A1", "sales": 200 }...',
        description:
          '用矩阵树图展示产品销售情况的数据 [{ "name": "产品 A", "sales": 500, "children": [{ "name": "子产品 A1", "sales": 200 }...',
        code: 'vis treemap\ndata\n  - name 产品A\n    value 500\n    children\n      - name 子产品A1\n        value 200\n      - name 子产品A2\n        value 300\n  - name 产品B\n    value 400',
      },
      {
        title:
          '采用矩阵树图展示各种水果销售量: [{ "苹果": 800, "children": [{ "红富士": 400 }, { "黄元帅": 400 }]}, { "橙子": 600 }, { "香...',
        description:
          '采用矩阵树图展示各种水果销售量: [{ "苹果": 800, "children": [{ "红富士": 400 }, { "黄元帅": 400 }]}, { "橙子": 600 }, { "香...',
        code: 'vis treemap\ndata\n  - name 苹果\n    value 800\n    children\n      - name 红富士\n        value 400\n      - name 黄元帅\n        value 400\n  - name 橙子\n    value 600\n  - name 香蕉\n    value 500',
      },
    ],
  },
  {
    id: 'boxplot',
    name: 'Boxplot',
    icon: '📦',
    description:
      '箱线图是一种用于展示数据分布、集中趋势及离群值的统计图表。通过盒体表示数据的四分位数区间，上下须表示数据的极值范围，异常点以单独标记。适合直观比较不同组数据的分布特征。',
    knowledge: {
      introduction:
        '箱线图是一种用于展示数据分布、集中趋势及离群值的统计图表。通过盒体表示数据的四分位数区间，上下须表示数据的极值范围，异常点以单独标记。适合直观比较不同组数据的分布特征。',
      useCases: [
        '用于展示一组或多组数据的分布情况，如成绩分布、实验结果、金融数据等',
        '适合突出数据的中位数、分布范围及异常值',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表类型，必填，文本类型，值为 "boxplot"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '箱线数据，必填，数组类型。',
        },
        {
          property: 'data.category',
          type: 'required',
          description: '数据分类名称，必填，文本类型。',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '数据分类值，必填，数值类型。',
        },
        {
          property: 'data.group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型，用于多组数据对比。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.boxColor',
          type: 'optional',
          description: '盒体颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'style.whiskerColor',
          type: 'optional',
          description: '须线颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'style.outlierColor',
          type: 'optional',
          description: '异常值颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
      ],
    },
    examples: [
      {
        title:
          '企鹅翼长分布（按种类分组）：Adelie、Chinstrap、Gentoo 三种企鹅的翼长（mm）分布对比。',
        description:
          '企鹅翼长分布（按种类分组）：Adelie、Chinstrap、Gentoo 三种企鹅的翼长（mm）分布对比。',
        code: 'vis boxplot\ndata\n  - category Adelie\n    value 181\n  - category Adelie\n    value 190\n  - category Adelie\n    value 195\n  - category Adelie\n    value 191\n  - category Adelie\n    value 198\n  - category Adelie\n    value 197\n  - category Adelie\n    value 194\n  - category Adelie\n    value 180\n  - category Adelie\n    value 185\n  - category Adelie\n    value 183\n  - category Adelie\n    value 178\n  - category Adelie\n    value 184\n  - category Adelie\n    value 196\n  - category Adelie\n    value 188\n  - category Adelie\n    value 200\n  - category Adelie\n    value 192\n  - category Adelie\n    value 210\n  - category Chinstrap\n    value 196\n  - category Chinstrap\n    value 193\n  - category Chinstrap\n    value 197\n  - category Chinstrap\n    value 198\n  - category Chinstrap\n    value 194\n  - category Chinstrap\n    value 201\n  - category Chinstrap\n    value 205\n  - category Chinstrap\n    value 195\n  - category Chinstrap\n    value 210\n  - category Chinstrap\n    value 203\n  - category Chinstrap\n    value 212\n  - category Chinstrap\n    value 187\n  - category Chinstrap\n    value 207\n  - category Gentoo\n    value 218\n  - category Gentoo\n    value 215\n  - category Gentoo\n    value 219\n  - category Gentoo\n    value 221\n  - category Gentoo\n    value 222\n  - category Gentoo\n    value 230\n  - category Gentoo\n    value 220\n  - category Gentoo\n    value 225\n  - category Gentoo\n    value 216\n  - category Gentoo\n    value 231\n  - category Gentoo\n    value 228\n  - category Gentoo\n    value 213\n  - category Gentoo\n    value 209\ntitle 企鹅翼长分布（按种类）\naxisYTitle 翼长（mm）',
      },
      {
        title:
          '企鹅翼长分布（按种类和性别分组）：Adelie、Chinstrap、Gentoo 三种企鹅雌雄翼长（mm）差异对比，主题为 dark。',
        description:
          '企鹅翼长分布（按种类和性别分组）：Adelie、Chinstrap、Gentoo 三种企鹅雌雄翼长（mm）差异对比，主题为 dark。',
        code: 'vis boxplot\ndata\n  - category Adelie\n    group MALE\n    value 195\n  - category Adelie\n    group MALE\n    value 191\n  - category Adelie\n    group MALE\n    value 198\n  - category Adelie\n    group MALE\n    value 197\n  - category Adelie\n    group MALE\n    value 194\n  - category Adelie\n    group MALE\n    value 185\n  - category Adelie\n    group MALE\n    value 200\n  - category Adelie\n    group MALE\n    value 210\n  - category Adelie\n    group FEMALE\n    value 181\n  - category Adelie\n    group FEMALE\n    value 186\n  - category Adelie\n    group FEMALE\n    value 182\n  - category Adelie\n    group FEMALE\n    value 174\n  - category Adelie\n    group FEMALE\n    value 189\n  - category Adelie\n    group FEMALE\n    value 187\n  - category Adelie\n    group FEMALE\n    value 190\n  - category Chinstrap\n    group MALE\n    value 196\n  - category Chinstrap\n    group MALE\n    value 197\n  - category Chinstrap\n    group MALE\n    value 201\n  - category Chinstrap\n    group MALE\n    value 205\n  - category Chinstrap\n    group MALE\n    value 210\n  - category Chinstrap\n    group MALE\n    value 212\n  - category Chinstrap\n    group FEMALE\n    value 192\n  - category Chinstrap\n    group FEMALE\n    value 188\n  - category Chinstrap\n    group FEMALE\n    value 195\n  - category Chinstrap\n    group FEMALE\n    value 181\n  - category Chinstrap\n    group FEMALE\n    value 187\n  - category Chinstrap\n    group FEMALE\n    value 190\n  - category Gentoo\n    group MALE\n    value 230\n  - category Gentoo\n    group MALE\n    value 221\n  - category Gentoo\n    group MALE\n    value 225\n  - category Gentoo\n    group MALE\n    value 231\n  - category Gentoo\n    group MALE\n    value 228\n  - category Gentoo\n    group FEMALE\n    value 211\n  - category Gentoo\n    group FEMALE\n    value 210\n  - category Gentoo\n    group FEMALE\n    value 214\n  - category Gentoo\n    group FEMALE\n    value 213\n  - category Gentoo\n    group FEMALE\n    value 219\ntitle 企鹅翼长分布（按种类和性别）\naxisYTitle 翼长（mm）\ntheme dark',
      },
      {
        title:
          '企鹅体重分布（按种类分组）：Adelie、Chinstrap、Gentoo 三种企鹅体重（g）分布，自定义盒体和须线颜色。',
        description:
          '企鹅体重分布（按种类分组）：Adelie、Chinstrap、Gentoo 三种企鹅体重（g）分布，自定义盒体和须线颜色。',
        code: 'vis boxplot\ndata\n  - category Adelie\n    value 3750\n  - category Adelie\n    value 3800\n  - category Adelie\n    value 3250\n  - category Adelie\n    value 3450\n  - category Adelie\n    value 3650\n  - category Adelie\n    value 3625\n  - category Adelie\n    value 4675\n  - category Adelie\n    value 3475\n  - category Adelie\n    value 4250\n  - category Adelie\n    value 3300\n  - category Adelie\n    value 3700\n  - category Adelie\n    value 3200\n  - category Chinstrap\n    value 3500\n  - category Chinstrap\n    value 3900\n  - category Chinstrap\n    value 3650\n  - category Chinstrap\n    value 3525\n  - category Chinstrap\n    value 3725\n  - category Chinstrap\n    value 3950\n  - category Chinstrap\n    value 3250\n  - category Chinstrap\n    value 3750\n  - category Chinstrap\n    value 4150\n  - category Chinstrap\n    value 3700\n  - category Chinstrap\n    value 3800\n  - category Gentoo\n    value 4950\n  - category Gentoo\n    value 5500\n  - category Gentoo\n    value 5700\n  - category Gentoo\n    value 4650\n  - category Gentoo\n    value 5550\n  - category Gentoo\n    value 4750\n  - category Gentoo\n    value 5200\n  - category Gentoo\n    value 5850\n  - category Gentoo\n    value 5050\n  - category Gentoo\n    value 5100\n  - category Gentoo\n    value 4800\ntitle 企鹅体重分布（按种类）\naxisYTitle 体重（g）\nstyle\n  boxColor #FF9800\n  whiskerColor #2196F3\n  backgroundColor #F5F5F5',
      },
    ],
  },

  {
    id: 'table',
    name: 'Table',
    icon: '📋',
    description:
      '表格是一种以行和列组织数据的结构化展示方式。每一行代表一个数据实体，每一列代表一个属性或字段。表格能够清晰地展示大量数据，便于用户进行查找、比较和分析。表格通常用于展示结构化数据，如财务报表、成绩单、产品列表等。 表格的核心优势在于对齐和比较。用户可以快速定位某一行或某一列的数据，进行横向或纵向的对比。表格也支持排序、筛选等操作，提升数据的可用性和交互性。',
    knowledge: {
      introduction:
        '表格是一种以行和列组织数据的结构化展示方式。每一行代表一个数据实体，每一列代表一个属性或字段。表格能够清晰地展示大量数据，便于用户进行查找、比较和分析。表格通常用于展示结构化数据，如财务报表、成绩单、产品列表等。 表格的核心优势在于对齐和比较。用户可以快速定位某一行或某一列的数据，进行横向或纵向的对比。表格也支持排序、筛选等操作，提升数据的可用性和交互性。',
      useCases: [
        '展示结构化数据，如明细、清单、报表等。',
        '需要对数据进行查找、排序、筛选、对比时。',
        '数据量较大，且每条数据有多个属性。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表类型，必填，文本类型，值为 "table"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '表格数据，必填，数组对象类型，每个对象的字段需与表头对应。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '表格标题，选填，文本类型。',
        },
      ],
    },
    examples: [
      {
        title: '展示餐饮业营收额数据表。',
        description: '展示餐饮业营收额数据表。',
        code: 'vis table\ndata\n  - 类别 火锅\n    营收额占比(%) 22\n  - 类别 自助餐\n    营收额占比(%) 12\n  - 类别 小吃快餐\n    营收额占比(%) 8\n  - 类别 西餐\n    营收额占比(%) 6\n  - 类别 其它\n    营收额占比(%) 44\ntitle 餐饮业营收额数据表',
      },
      {
        title: '展示全国人口居住分布数据表。',
        description: '展示全国人口居住分布数据表。',
        code: 'vis table\ndata\n  - 人口类型 城镇人口\n    数量(万人) 63.89\n  - 人口类型 乡村人口\n    数量(万人) 36.11\ntitle 全国人口居住分布',
      },
      {
        title: '展示产业结构数据表。',
        description: '展示产业结构数据表。',
        code: 'vis table\ndata\n  - 产业类型 第一产业\n    产值(亿元) 7200.0\n  - 产业类型 第二产业\n    产值(亿元) 36600.0\n  - 产业类型 第三产业\n    产值(亿元) 41000.0',
      },
    ],
  },
  {
    id: 'summary',
    name: 'Summary',
    icon: '📄',
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
  },
  {
    id: 'wordcloud',
    name: 'Word Cloud',
    icon: '☁️',
    description:
      '词云图是一种用于展示文本数据中词语出现频率或权重的可视化方法，通过不同大小的文字来表示词频。词云图可以帮助快速识别文本数据中最常用或最重要的词语。 每个词的大小通常与其出现频率成正比，通常较大的字体代表更频繁出现或更重要的词，使用户可以直观地看到某个词在文本中出现的频繁程度。这种视觉化方式使得用户能够快速抓住文本的主要内容和核心主题。',
    knowledge: {
      introduction:
        '词云图是一种用于展示文本数据中词语出现频率或权重的可视化方法，通过不同大小的文字来表示词频。词云图可以帮助快速识别文本数据中最常用或最重要的词语。 每个词的大小通常与其出现频率成正比，通常较大的字体代表更频繁出现或更重要的词，使用户可以直观地看到某个词在文本中出现的频繁程度。这种视觉化方式使得用户能够快速抓住文本的主要内容和核心主题。',
      useCases: [
        '分析社交媒体、评论或反馈中常用的词语。',
        '文字分析中识别关键词或主题。',
        '在需要突出显示某些词汇的重要性时非常有用，比如新闻报道摘要、市场调研结果等场合。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "word-cloud"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组对象类型；',
        },
        {
          property: 'data.text',
          type: 'required',
          description: '代表将要在词云中显示的具体词汇，必填，字符串类型；',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '表示这个词汇的重要性分数（可以是频次、权重等），必填，数值类型；',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '对西方哲学史文本进行关键词提取，生成哲学主题词云，展示”事物”、”感官”、”上帝”、”物质”等核心概念的词频权重分布。',
        description:
          '对西方哲学史文本进行关键词提取，生成哲学主题词云，展示”事物”、”感官”、”上帝”、”物质”等核心概念的词频权重分布。',
        code: 'vis word-cloud\ndata\n  - text 积木\n    value 21.62\n  - text 事物\n    value 34.46\n  - text 感官\n    value 27.89\n  - text 万事万物\n    value 21.21\n  - text 上帝\n    value 22.44\n  - text 阶段\n    value 26.61\n  - text 潜意识\n    value 19.90\n  - text 物质\n    value 17.08\n  - text 启示\n    value 16.58\n  - text 大自然\n    value 16.21\n  - text 心灵\n    value 15.52\n  - text 信仰\n    value 14.52\n  - text 哲学家\n    value 14.95\n  - text 物体\n    value 14.36\n  - text 地球\n    value 12.58\n  - text 太阳\n    value 12.46\n  - text 元素\n    value 13.69\n  - text 模式\n    value 12.06\n  - text 明辨是非\n    value 11.70\n  - text 永恒不变\n    value 10.72\n  - text 理性\n    value 13.82\n  - text 因果律\n    value 12.51\n  - text 自然法则\n    value 10.68\n  - text 精神\n    value 11.24\n  - text 世界\n    value 13.10\n  - text 宇宙\n    value 7.37\n  - text 存在\n    value 9.14\n  - text 认知\n    value 8.71\n  - text 原子\n    value 7.15\n  - text 粒子\n    value 7.69\ntitle 西方哲学史关键词词云',
      },
      {
        title:
          '数据可视化技术生态词云：对 AntV 相关技术文档进行词频统计，展示 G2、G6、F2 等可视化框架及”数据可视化”、”Grammar”等核心概念的权重分布。',
        description:
          '数据可视化技术生态词云：对 AntV 相关技术文档进行词频统计，展示 G2、G6、F2 等可视化框架及”数据可视化”、”Grammar”等核心概念的权重分布。',
        code: 'vis word-cloud\ndata\n  - text AntV\n    value 9\n  - text F2\n    value 8\n  - text G2\n    value 8\n  - text G6\n    value 8\n  - text DataSet\n    value 8\n  - text 墨者学院\n    value 8\n  - text Analysis\n    value 6\n  - text "Data Mining"\n    value 6\n  - text "Data Vis"\n    value 6\n  - text Design\n    value 6\n  - text Grammar\n    value 6\n  - text Graphics\n    value 6\n  - text Graph\n    value 6\n  - text Hierarchy\n    value 6\n  - text Labeling\n    value 6\n  - text Layout\n    value 6\n  - text Quantitative\n    value 6\n  - text Relation\n    value 6\n  - text Statistics\n    value 6\n  - text 可视化\n    value 6\n  - text 数据\n    value 6\n  - text 数据可视化\n    value 6\ntitle 数据可视化技术词云',
      },
      {
        title:
          '分析一篇关于环保的文章，提取关键词及其频率，结果为：["环保": 10, "气候变化": 8, "可再生能源": 6, "碳排放": 5, "绿色生活": 4]。用词云图可视化。',
        description:
          '分析一篇关于环保的文章，提取关键词及其频率，结果为：["环保": 10, "气候变化": 8, "可再生能源": 6, "碳排放": 5, "绿色生活": 4]。用词云图可视化。',
        code: 'vis word-cloud\ndata\n  - text 环保\n    value 10\n  - text 气候变化\n    value 8\n  - text 可再生能源\n    value 6\n  - text 碳排放\n    value 5\n  - text 绿色生活\n    value 4',
      },
    ],
  },
  {
    id: 'radar-chart',
    name: 'Radar Chart',
    icon: '🕸️',
    description:
      '雷达图是一种显示多变量数据的图。通常从表同一中心点开始等角度间隔地射出三个以上的轴，每个轴代表一个定量变量，各轴上的点依次连接成线或几何图形。雷达图可以用来在变量间进行对比，或者查看变量中有没有异常值。另外，多幅雷达图之间或者雷达图的多层数据线之间，还可以进行总体数值情况的对比。',
    knowledge: {
      introduction:
        '雷达图是一种显示多变量数据的图。通常从表同一中心点开始等角度间隔地射出三个以上的轴，每个轴代表一个定量变量，各轴上的点依次连接成线或几何图形。雷达图可以用来在变量间进行对比，或者查看变量中有没有异常值。另外，多幅雷达图之间或者雷达图的多层数据线之间，还可以进行总体数值情况的对比。',
      useCases: [
        '某一数据对象由多个特征类别构成，比如食品的营养成分（糖、维生素、矿物质、脂肪、水）。',
        '数据特征类别是有限的，并且都可以进行归一化或者能被离散化。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "radar"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组对象类型；',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '数据分类名称，必填，文本类型；',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '分类的数值大小，必填，数值类型；',
        },
        {
          property: 'data.group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型；',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填 ，数组类型，值为合法的颜色值数组。',
        },
        {
          property: 'style.lineWidth',
          type: 'optional',
          description: '图形描边的宽度，选填，数值类型，值为大于 0 的数值。',
        },
      ],
    },
    examples: [
      {
        title:
          '小明对自己进行能力评估：沟通能力 2 分、协作能力 3 分、领导能力 2 分、学习能力 5 分、创新能力 6 分、技术能力 9 分，用雷达图可视化：',
        description:
          '小明对自己进行能力评估：沟通能力 2 分、协作能力 3 分、领导能力 2 分、学习能力 5 分、创新能力 6 分、技术能力 9 分，用雷达图可视化：',
        code: 'vis radar\ndata\n  - name 沟通能力\n    value 2\n  - name 协作能力\n    value 3\n  - name 领导能力\n    value 2\n  - name 学习能力\n    value 5\n  - name 创新能力\n    value 6\n  - name 技术能力\n    value 9',
      },
      {
        title:
          '某中学进行了第一次模拟考，三年级中 3 个班级的平均成绩为，一班语文 95，数学 96，外语 85，物理 63，化学 91；二班语文 75，数学 93，外语 66，物理 85，化学 88；三班语...',
        description:
          '某中学进行了第一次模拟考，三年级中 3 个班级的平均成绩为，一班语文 95，数学 96，外语 85，物理 63，化学 91；二班语文 75，数学 93，外语 66，物理 85，化学 88；三班语...',
        code: 'vis radar\ndata\n  - name 语文\n    value 95\n    group 一班\n  - name 数学\n    value 96\n    group 一班\n  - name 外语\n    value 85\n    group 一班\n  - name 物理\n    value 63\n    group 一班\n  - name 化学\n    value 91\n    group 一班\n  - name 语文\n    value 75\n    group 二班\n  - name 数学\n    value 93\n    group 二班\n  - name 外语\n    value 66\n    group 二班\n  - name 物理\n    value 85\n    group 二班\n  - name 化学\n    value 88\n    group 二班\n  - name 语文\n    value 86\n    group 三班\n  - name 数学\n    value 76\n    group 三班\n  - name 外语\n    value 96\n    group 三班\n  - name 物理\n    value 93\n    group 三班\n  - name 化学\n    value 67\n    group 三班',
      },
      {
        title:
          '用雷达图可视化我的数据 `[ { "nutrient": "Vitamin C", "score": 7 }, { "nutrient": "Fiber", "score": 6 }, { "n...',
        description:
          '用雷达图可视化我的数据 `[ { "nutrient": "Vitamin C", "score": 7 }, { "nutrient": "Fiber", "score": 6 }, { "n...',
        code: 'vis radar\ndata\n  - name "Vitamin C"\n    value 7\n  - name Fiber\n    value 6\n  - name Sugar\n    value 5\n  - name Protein\n    value 4\n  - name Iron\n    value 3\n  - name Calcium\n    value 2',
      },
    ],
  },
  {
    id: 'area-chart',
    name: 'Area Chart',
    icon: '🌊',
    description:
      '面积图，或称区域图，是一种随有序变量的变化，反映数值变化的统计图表，原理与折线图相似。而面积图的特点在于，折线与自变量坐标轴之间的区域，会由颜色填充。',
    knowledge: {
      introduction:
        '面积图，或称区域图，是一种随有序变量的变化，反映数值变化的统计图表，原理与折线图相似。而面积图的特点在于，折线与自变量坐标轴之间的区域，会由颜色填充。',
      useCases: [
        '想要体现在连续自变量下，数据的趋势变化，同时也能够观察到数据总量的变化趋势',
        '例如，位移=速度（平均速度或微速度）x 时间：s=v\\*t; 那么如果我们的 x 轴是时间 t，y 轴是每个时刻的速度 v，使用面积图，不仅可以观察速度随时间变化的趋势，还可以根据面积大小来感受位移距离的长度变化',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "area"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组对象类型；',
        },
        {
          property: 'data.time',
          type: 'required',
          description: '数据的时序名称，必填，文本或数值类型；',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '数据的值，必填，数值类型；',
        },
        {
          property: 'data.group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型；',
        },
        {
          property: 'stack',
          type: 'optional',
          description: '是否开启堆叠，开启堆叠面积图需数据中含有 group 字段，选填，布尔类型。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
        },
        {
          property: 'axisXTitle',
          type: 'optional',
          description: 'x 轴的标题，选填，文本类型。',
        },
        {
          property: 'axisYTitle',
          type: 'optional',
          description: 'y 轴的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
        {
          property: 'style.lineWidth',
          type: 'optional',
          description: '图形描边的宽度，选填，数值类型，值为大于等于 0 的数值。',
        },
      ],
    },
    examples: [
      {
        title:
          'GDP 年度趋势面积图：展示 2013-2022 年 GDP 变化趋势，从 59.3 万亿增长至 121 万亿。',
        description:
          'GDP 年度趋势面积图：展示 2013-2022 年 GDP 变化趋势，从 59.3 万亿增长至 121 万亿。',
        code: 'vis area\ndata\n  - time 2013\n    value 59.3\n  - time 2014\n    value 64.4\n  - time 2015\n    value 68.9\n  - time 2016\n    value 74.4\n  - time 2017\n    value 82.7\n  - time 2018\n    value 91.9\n  - time 2019\n    value 99.1\n  - time 2020\n    value 101.6\n  - time 2021\n    value 114.4\n  - time 2022\n    value 121\ntitle GDP年度趋势\naxisXTitle 年份\naxisYTitle GDP(万亿)',
      },
      {
        title:
          '在某项研究中，2019 年到 2023 年中三个城市的空气污染指数变化如下：北京分别为 150，160，145，155，165；广州分别为 100，110，105，115，120；上海分别为 9...',
        description:
          '在某项研究中，2019 年到 2023 年中三个城市的空气污染指数变化如下：北京分别为 150，160，145，155，165；广州分别为 100，110，105，115，120；上海分别为 9...',
        code: 'vis area\ndata\n  - time 2019年\n    value 150\n    group 北京\n  - time 2020年\n    value 160\n    group 北京\n  - time 2021年\n    value 145\n    group 北京\n  - time 2022年\n    value 155\n    group 北京\n  - time 2023年\n    value 165\n    group 北京\n  - time 2019年\n    value 100\n    group 广州\n  - time 2020年\n    value 110\n    group 广州\n  - time 2021年\n    value 105\n    group 广州\n  - time 2022年\n    value 115\n    group 广州\n  - time 2023年\n    value 120\n    group 广州\n  - time 2019年\n    value 90\n    group 上海\n  - time 2020年\n    value 85\n    group 上海\n  - time 2021年\n    value 80\n    group 上海\n  - time 2022年\n    value 75\n    group 上海\n  - time 2023年\n    value 70\n    group 上海\nstack true\ntitle 城市空气污染指数变化\naxisXTitle 年份\naxisYTitle 空气污染指数',
      },
      {
        title:
          '用面积图可视化我的数据 [{ "year": 2015,"value": 7200.0 },{ "year": 2016, "value": 3660.0 },{ "year": 2017 ,"...',
        description:
          '用面积图可视化我的数据 [{ "year": 2015,"value": 7200.0 },{ "year": 2016, "value": 3660.0 },{ "year": 2017 ,"...',
        code: 'vis area\ndata\n  - time 2015\n    value 7200.0\n  - time 2016\n    value 3660.0\n  - time 2017\n    value 4100.0\naxisXTitle year\naxisYTitle value',
      },
    ],
  },
  {
    id: 'venn-diagram',
    name: 'Venn Diagram',
    icon: '⭕',
    description:
      '韦恩图是一种用多个交叠圆形表示集合关系的图表。每个圆代表一个集合，圆之间的重叠区域表示集合的交集，非重叠部分表示集合的独有元素。韦恩图直观展示集合之间的交集、并集和补集，常用于集合运算、分类分析等场景。',
    knowledge: {
      introduction:
        '韦恩图是一种用多个交叠圆形表示集合关系的图表。每个圆代表一个集合，圆之间的重叠区域表示集合的交集，非重叠部分表示集合的独有元素。韦恩图直观展示集合之间的交集、并集和补集，常用于集合运算、分类分析等场景。',
      useCases: [
        '用于展示集合之间的关系，如数据分类、属性重叠、用户群体交集等',
        '适合分析集合的交集、并集、补集等关系，常见于数学、统计、市场分析等领域',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表类型，必填，文本类型，值为 "venn"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '数据，必填，数组类型，包含 sets、value 以及 label 三个字段；',
        },
        {
          property: 'data.sets',
          type: 'required',
          description:
            '集合标识，必填，字符串数组类型，表示该数据项所属的集合，可以是单个集合或多个集合的组合。',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '集合大小，必填，数值类型，表示该集合或集合交集的大小。',
        },
        {
          property: 'data.label',
          type: 'optional',
          description: '集合标签，选填，文本类型，表示该集合或集合交集的名称。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，合法颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '用户购买行为交集：购买手机（3500人）、购买耳机（2800人）、购买充电器（2200人）三类用户的购买重叠关系。',
        description:
          '用户购买行为交集：购买手机（3500人）、购买耳机（2800人）、购买充电器（2200人）三类用户的购买重叠关系。',
        code: 'vis venn\ndata\n  - sets A\n    value 3500\n    label 购买手机\n  - sets B\n    value 2800\n    label 购买耳机\n  - sets C\n    value 2200\n    label 购买充电器\n  - sets A,B\n    value 1500\n  - sets A,C\n    value 1200\n  - sets B,C\n    value 800\n  - sets A,B,C\n    value 600\ntitle 用户购买行为交集',
      },
      {
        title:
          '音乐听众交集（主题 dark）：Radiohead、Kanye West、Eminem 三位艺术家粉丝群体的重叠分布，数据来源于 Last.fm 收听记录。',
        description:
          '音乐听众交集（主题 dark）：Radiohead、Kanye West、Eminem 三位艺术家粉丝群体的重叠分布，数据来源于 Last.fm 收听记录。',
        code: 'vis venn\ndata\n  - sets A\n    value 77348\n    label Radiohead\n  - sets B\n    value 27053\n    label "Kanye West"\n  - sets C\n    value 19056\n    label Eminem\n  - sets A,B\n    value 6141\n  - sets A,C\n    value 2723\n  - sets B,C\n    value 5465\n  - sets A,B,C\n    value 715\ntitle 音乐听众交集\ntheme dark',
      },
      {
        title:
          '电商平台 618 大促活动中，购买手机（3500人）与购买耳机（2800人）用户群体的重叠情况，自定义配色。',
        description:
          '电商平台 618 大促活动中，购买手机（3500人）与购买耳机（2800人）用户群体的重叠情况，自定义配色。',
        code: 'vis venn\ndata\n  - sets A\n    value 3500\n    label 购买手机\n  - sets B\n    value 2800\n    label 购买耳机\n  - sets A,B\n    value 1500\ntitle 618大促手机与耳机购买用户重叠\nstyle\n  palette #FFB6C1 #87CEFA\n  backgroundColor #F8F8FF',
      },
    ],
  },
  {
    id: 'pie-chart',
    name: 'Pie Chart',
    icon: '🥧',
    description:
      '饼图，是一个划分为几个扇形的圆形统计图表。在饼图中，每个扇形的弧长（以及圆心角和面积）大小，表示该种类占总体的比例，且这些扇形合在一起刚好是一个完全的圆形。 饼图最显著的功能在于表现“占比”。习惯上，人们也用饼图来比较扇形的大小，从而获得对数据的认知。但是，由于人类对“角度”的感知力并不如“长度”，在需要准确的表达数值（尤其是当数值接近、或数值很多）时，饼图常常不能胜任，建议用柱状图代替。 从数据来看，饼图一般需要一个分类数据字段、一个连续数据字段。值得注意的是，分类字段的数据，在图表使用的语境下，应当构成一个整体（例如一班、二班、三班，构成了整个高一年级），而不能是独立、无关的。',
    knowledge: {
      introduction:
        '饼图，是一个划分为几个扇形的圆形统计图表。在饼图中，每个扇形的弧长（以及圆心角和面积）大小，表示该种类占总体的比例，且这些扇形合在一起刚好是一个完全的圆形。 饼图最显著的功能在于表现“占比”。习惯上，人们也用饼图来比较扇形的大小，从而获得对数据的认知。但是，由于人类对“角度”的感知力并不如“长度”，在需要准确的表达数值（尤其是当数值接近、或数值很多）时，饼图常常不能胜任，建议用柱状图代替。 从数据来看，饼图一般需要一个分类数据字段、一个连续数据字段。值得注意的是，分类字段的数据，在图表使用的语境下，应当构成一个整体（例如一班、二班、三班，构成了整个高一年级），而不能是独立、无关的。',
      useCases: [
        '用于显示组成部分的比例，如市场份额、预算分配等',
        '想要突出表示某个部分在整体中所占比例',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "pie"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，数组对象类型；',
        },
        {
          property: 'data.category',
          type: 'required',
          description: '数据分类的名称，必填，文本类型；',
        },
        {
          property: 'data.value',
          type: 'required',
          description: '数据的值，必填，数值类型，不可以使用百分比数字；',
        },
        {
          property: 'innerRadius',
          type: 'optional',
          description: '将饼图设置为环图，选填，数值类型，当需要开启为环图时，可设置值为 0.6。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '我国的餐饮业营收额中，火锅占到 22%，其次是自助餐（12%）、川菜（8%）、小吃快餐（8%）、西餐（6%）、其它（44%）。用饼图可视化。',
        description:
          '我国的餐饮业营收额中，火锅占到 22%，其次是自助餐（12%）、川菜（8%）、小吃快餐（8%）、西餐（6%）、其它（44%）。用饼图可视化。',
        code: 'vis pie\ndata\n  - category 火锅\n    value 22\n  - category 自助餐\n    value 12\n  - category 小吃快餐\n    value 8\n  - category 西餐\n    value 6\n  - category 其它\n    value 44\ntitle 餐饮业营收额占比',
      },
      {
        title:
          '全国人口中居住在城镇的人口占比为 63.89%，居住在乡村的人口占比为 36.11%。用环图可视化。',
        description:
          '全国人口中居住在城镇的人口占比为 63.89%，居住在乡村的人口占比为 36.11%。用环图可视化。',
        code: 'vis pie\ndata\n  - category 城镇人口\n    value 63.89\n  - category 乡村人口\n    value 36.11\ninnerRadius 0.6\ntitle 全国人口居住对比',
      },
      {
        title:
          '用饼图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "...',
        description:
          '用饼图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "...',
        code: 'vis pie\ndata\n  - category 第一产业\n    value 7200.0\n  - category 第二产业\n    value 36600.0\n  - category 第三产业\n    value 41000.0',
      },
    ],
  },
  {
    id: 'network-graph',
    name: 'Network Graph',
    icon: '🕸️',
    description:
      '网络图（Network Graph）是一种展示实体（节点）之间的关系（边）的图。通过节点和边的连接，直观地表示复杂的网络结构。每个节点代表一个实体，而每条边则表示两个节点之间的关系或连接。',
    knowledge: {
      introduction:
        '网络图（Network Graph）是一种展示实体（节点）之间的关系（边）的图。通过节点和边的连接，直观地表示复杂的网络结构。每个节点代表一个实体，而每条边则表示两个节点之间的关系或连接。',
      useCases: [
        '社交网络中的人际关系展示，例如朋友关系、关注关系等。',
        '知识图谱中的概念关联，展示实体之间的复杂关系。',
        '分析复杂网络结构中的模式，例如通信网络中的节点连接情况。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "network-graph"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，对象类型，包含 nodes 和 edges 两个字段。',
        },
        {
          property: 'data.nodes',
          type: 'required',
          description: '网络图中的节点数组，每个节点需包含 name 字段（唯一标识）。',
        },
        {
          property: 'data.edges',
          type: 'required',
          description:
            '网络图中的边数组，每条边需包含 source（起点）、target（终点）、name（关系名称）字段。',
        },
        {
          property: 'layout',
          type: 'optional',
          description:
            '布局算法，选填，可选值为 "force" | "circular" | "grid" | "radial" | "concentric" | "dagre"，默认为 "force"。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
        },
        {
          property: 'theme',
          type: 'optional',
          description:
            '图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。',
        },
      ],
    },
    examples: [
      {
        title:
          '在《哈利波特》系列中，哈利·波特的两个好友是赫敏·格兰杰和罗恩·韦斯莱，伏地魔是哈利的主要敌人并曾试图杀死哈利。用网络图可视化。',
        description:
          '在《哈利波特》系列中，哈利·波特的两个好友是赫敏·格兰杰和罗恩·韦斯莱，伏地魔是哈利的主要敌人并曾试图杀死哈利。用网络图可视化。',
        code: 'vis network-graph\ndata\n  nodes\n    - name 哈利·波特\n    - name 赫敏·格兰杰\n    - name 罗恩·韦斯莱\n    - name 伏地魔\n  edges\n    - source 哈利·波特\n      target 赫敏·格兰杰\n      name 朋友\n    - source 哈利·波特\n      target 罗恩·韦斯莱\n      name 朋友\n    - source 哈利·波特\n      target 伏地魔\n      name 敌人\n    - source 伏地魔\n      target 哈利·波特\n      name 试图杀死\ntitle 哈利波特人物关系',
      },
      {
        title:
          '用网络图展示公司内部的协作关系：产品经理将需求传递给设计师，设计师输出设计稿给开发者，开发者提测给测试员。',
        description:
          '用网络图展示公司内部的协作关系：产品经理将需求传递给设计师，设计师输出设计稿给开发者，开发者提测给测试员。',
        code: 'vis network-graph\ndata\n  nodes\n    - name 产品经理\n    - name 设计师\n    - name 开发者\n    - name 测试员\n  edges\n    - source 产品经理\n      target 设计师\n      name 需求传递\n    - source 设计师\n      target 开发者\n      name 设计稿\n    - source 开发者\n      target 测试员\n      name 提测\nlayout dagre\ntitle 团队协作流程',
      },
      {
        title: '用网络图展示知识图谱中"人工智能"相关概念的关联关系。',
        description: '用网络图展示知识图谱中"人工智能"相关概念的关联关系。',
        code: 'vis network-graph\ndata\n  nodes\n    - name 人工智能\n    - name 机器学习\n    - name 深度学习\n    - name 神经网络\n    - name 自然语言处理\n    - name 计算机视觉\n  edges\n    - source 人工智能\n      target 机器学习\n      name 包含\n    - source 机器学习\n      target 深度学习\n      name 子领域\n    - source 深度学习\n      target 神经网络\n      name 基于\n    - source 人工智能\n      target 自然语言处理\n      name 包含\n    - source 人工智能\n      target 计算机视觉\n      name 包含\nlayout force\ntheme academy\ntitle AI 知识图谱',
      },
    ],
  },
  {
    id: 'organization-chart',
    name: 'Organization Chart',
    icon: '🏢',
    description:
      '组织架构图用于直观地展示组织内部的层级结构和部门关系。它通过节点和边表示不同的职位、部门及其上下级关系。每个节点代表一个职位或部门，边则表示上下级或平级关系。以树状结构呈现，顶层为最高管理层，逐层向下展开，直至各个部门和职位。',
    knowledge: {
      introduction:
        '组织架构图用于直观地展示组织内部的层级结构和部门关系。它通过节点和边表示不同的职位、部门及其上下级关系。每个节点代表一个职位或部门，边则表示上下级关系。以树状结构呈现，顶层为最高管理层，逐层向下展开，直至各个部门和职位。',
      useCases: [
        '展示公司或团队的层级结构，明确各个职位和部门的上下级关系。',
        '展示员工的职位和部门分布。',
        '项目管理时，明确项目团队的成员和职责分工。',
        '用于股权穿透、投资上下游公司等依赖分析。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "organization-chart"。',
        },
        {
          property: 'data',
          type: 'required',
          description:
            '图表的数据，必填，树形对象类型，根节点包含 name、description（可选）、children（可选）字段。',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '节点的名称，表示职位或部门的名称，必须唯一，必填，字符串类型。',
        },
        {
          property: 'data.description',
          type: 'optional',
          description: '节点的描述信息，可以包含职位职责或部门简介等，选填，字符串类型。',
        },
        {
          property: 'data.children',
          type: 'optional',
          description:
            '子节点数组，表示下级职位或部门，每个子节点本身也是一个树形对象，选填，数组类型。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
        },
        {
          property: 'theme',
          type: 'optional',
          description:
            '图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。',
        },
      ],
    },
    examples: [
      {
        title:
          'Alice Johnson 是公司的首席技术官，她的团队包括资深软件工程师 Bob Smith 和 IT 支持部门负责人 Eve Black。Bob Smith 负责带领软件工程团队，团队成员包括软件工程师 Charlie Brown 和 Diana White。Eve Black 负责 IT 支持部门，团队成员包括 IT 支持专家 Frank Green 和 Grace Blue。',
        description:
          'Alice Johnson 是公司的首席技术官，她的团队包括资深软件工程师 Bob Smith 和 IT 支持部门负责人 Eve Black。',
        code: 'vis organization-chart\ndata\n  name Alice Johnson\n  description Chief Technology Officer\n  children\n    - name Bob Smith\n      description Senior Software Engineer\n      children\n        - name Charlie Brown\n          description Software Engineer\n        - name Diana White\n          description Software Engineer\n    - name Eve Black\n      description IT Support Department Head\n      children\n        - name Frank Green\n          description IT Support Specialist\n        - name Grace Blue\n          description IT Support Specialist',
      },
      {
        title:
          '用组织架构图可视化以下数据：Eric Joplin 是首席执行官，其直属下级为 Linda Newland（首席执行助理）。',
        description: '用于验证：节点内容超出时省略号显示，hover 展示完整内容。',
        code: 'vis organization-chart\ndata\n  name Eric Joplin (Interim Chief Executive Officer & Acting President)\n  description Chief Executive Officer overseeing global operations, strategy, and cross-functional leadership across multiple regions\n  children\n    - name Linda Newland (Executive Assistant to the CEO, Board Liaison)\n      description Chief Executive Assistant responsible for calendar management, stakeholder communications, and confidential executive coordination',
      },
      {
        title:
          '用组织架构图展示一家科技公司的部门结构：CEO 下设 CTO、CFO、COO 三位高管，CTO 下设前端团队和后端团队。',
        description: '用组织架构图展示科技公司三层部门结构。',
        code: 'vis organization-chart\ndata\n  name CEO\n  description 首席执行官\n  children\n    - name CTO\n      description 首席技术官\n      children\n        - name 前端团队\n          description 负责人：张工\n        - name 后端团队\n          description 负责人：李工\n    - name CFO\n      description 首席财务官\n    - name COO\n      description 首席运营官\ntitle 科技公司组织架构\ntheme academy',
      },
    ],
  },
  {
    id: 'indented-tree',
    name: 'Indented Tree',
    icon: '🌲',
    description:
      '缩进树通过水平方向的缩进量来表示树节点层级关系。每个元素占据一行，子节点以缩进方式排列在父节点下方，层层缩进直观地展示出节点的深度和从属关系。常用于文件目录结构、知识体系分类、组织层级等需要清晰展示层级关系的场景。',
    knowledge: {
      introduction:
        '缩进树通过水平方向的缩进量来表示树节点层级关系。每个元素占据一行，子节点以缩进方式排列在父节点下方，层层缩进直观地展示出节点的深度和从属关系。常用于文件目录结构、知识体系分类、组织层级等需要清晰展示层级关系的场景。',
      useCases: [
        '展示文件目录结构，如项目文件树、磁盘目录浏览。',
        '展示分类体系，如产品分类、知识体系目录、软件功能模块划分。',
        '展示软件包依赖关系或模块引用关系，清晰展示层级深度。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "indented-tree"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，树形对象类型，包含 name、children 字段。',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '节点名称，必填，文本类型。',
        },
        {
          property: 'data.children',
          type: 'optional',
          description: '子节点数组，选填，数组对象类型，每个子节点结构与父节点相同，支持多层嵌套。',
        },
        {
          property: 'direction',
          type: 'optional',
          description:
            '布局方向，选填，文本类型，可选值为 "LR"（默认，根节点在左向右展开）| "RL"（根节点在右向左展开）| "H"（根节点居中双向展开）。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
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
          description: '图表样式，选填，对象类型；',
        },
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title: '用缩进树展示机器学习建模方法的层级分类（官方示例数据结构）。',
        description: '用缩进树展示机器学习建模方法的层级分类（官方示例数据结构）。',
        code: 'vis indented-tree\ndata\n  name Modeling Methods\n  children\n    - name Classification\n      children\n        - name Logistic regression\n        - name Linear discriminant analysis\n        - name Rules\n        - name Decision trees\n        - name Naive Bayes\n        - name K nearest neighbor\n        - name Probabilistic neural network\n        - name Support vector machine\n    - name Consensus\n      children\n        - name Models diversity\n          children\n            - name Different initializations\n            - name Different parameter choices\n            - name Different architectures\n            - name Different modeling methods\n            - name Different training sets\n            - name Different feature sets\n        - name Methods\n          children\n            - name Classifier selection\n            - name Classifier fusion\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name Multiple linear regression\n        - name Partial least squares\n        - name Multi-layer feed forward neural network\n        - name General regression neural network\n        - name Support vector regression\ntitle Modeling Methods',
      },
      {
        title:
          '用缩进树展示一个前端项目的目录结构，包含 src、public、package.json，其中 src 下有 components、pages、utils 三个文件夹。',
        description:
          '用缩进树展示一个前端项目的目录结构，包含 src、public、package.json，其中 src 下有 components、pages、utils 三个文件夹。',
        code: 'vis indented-tree\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json\ntitle 项目目录结构',
      },
      {
        title: '用缩进树展示人工智能的知识体系分类，包含机器学习和深度学习两大分支及其子类别。',
        description:
          '用缩进树展示人工智能的知识体系分类，包含机器学习和深度学习两大分支及其子类别。',
        code: 'vis indented-tree\ndata\n  name 人工智能\n  children\n    - name 机器学习\n      children\n        - name 监督学习\n        - name 无监督学习\n        - name 强化学习\n    - name 深度学习\n      children\n        - name 卷积神经网络\n        - name 循环神经网络\ntitle AI 知识体系',
      },
      {
        title: '用缩进树展示公司的部门层级：公司下有技术部（含前端组、后端组、测试组）和产品部。',
        description:
          '用缩进树展示公司的部门层级：公司下有技术部（含前端组、后端组、测试组）和产品部。',
        code: 'vis indented-tree\ndata\n  name 公司\n  children\n    - name 技术部\n      children\n        - name 前端组\n        - name 后端组\n        - name 测试组\n    - name 产品部\n      children\n        - name 产品设计组\n        - name 用户研究组\ntitle 企业部门层级\ntheme academy',
      },
    ],
  },
  {
    id: 'mindmap',
    name: 'Mind Map',
    icon: '🧠',
    description:
      '思维导图以中心主题为核心，通过层级分支的形式组织和展示信息。使用中心点两侧分布，合理利用空间，并能清晰呈现主干与分支的所属分层关系。当文本内容复杂时，思维导图可以帮助提取并结构化关键信息，明确主要主题与子主题之间的关系。',
    knowledge: {
      introduction:
        '思维导图以中心主题为核心，通过层级分支的形式组织和展示信息。使用中心点两侧分布，合理利用空间，并能清晰呈现主干与分支的所属分层关系。当文本内容复杂时，思维导图可以帮助提取并结构化关键信息，明确主要主题与子主题之间的关系。',
      useCases: [
        '内容围绕一个核心主题展开，按照逻辑层次进行分解，如知识体系、项目计划。',
        '展示分类体系，如产品分类、技术栈分类、学科知识体系。',
        '头脑风暴和创意整理，将想法按层级组织。',
        '读书笔记、课程总结等信息的结构化提取。',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "mindmap"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，树形对象类型，包含 name、children 字段。',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '节点名称，必填，文本类型。',
        },
        {
          property: 'data.children',
          type: 'optional',
          description: '子节点数组，选填，数组对象类型，每个子节点结构与父节点相同，支持多层嵌套。',
        },
        {
          property: 'direction',
          type: 'optional',
          description:
            '布局方向，选填，文本类型，可选值为 "H"（默认，根节点居中双向展开）| "LR"（根节点在左向右展开）| "RL"（根节点在右向左展开）。',
        },
        {
          property: 'title',
          type: 'optional',
          description: '图表的标题，选填，文本类型。',
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
        {
          property: 'style.backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'style.palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title: '用思维导图展示机器学习建模方法的层级分类，从中心主题向两侧分支展开。',
        description: '用思维导图展示机器学习建模方法的层级分类，从中心主题向两侧分支展开。',
        code: 'vis mindmap\ndata\n  name Modeling Methods\n  children\n    - name Classification\n      children\n        - name Logistic regression\n        - name Linear discriminant analysis\n        - name Rules\n        - name Decision trees\n        - name Naive Bayes\n        - name K nearest neighbor\n        - name Probabilistic neural network\n        - name Support vector machine\n    - name Consensus\n      children\n        - name Models diversity\n          children\n            - name Different initializations\n            - name Different parameter choices\n            - name Different architectures\n            - name Different modeling methods\n            - name Different training sets\n            - name Different feature sets\n        - name Methods\n          children\n            - name Classifier selection\n            - name Classifier fusion\n        - name Common\n          children\n            - name Bagging\n            - name Boosting\n            - name AdaBoost\n    - name Regression\n      children\n        - name Multiple linear regression\n        - name Partial least squares\n        - name Multi-layer feed forward neural network\n        - name General regression neural network\n        - name Support vector regression\ntitle Modeling Methods',
      },
      {
        title: '用思维导图制定项目计划，分为研究、设计、开发和测试四个阶段，每个阶段包含具体任务。',
        description:
          '用思维导图制定项目计划，分为研究、设计、开发和测试四个阶段，每个阶段包含具体任务。',
        code: 'vis mindmap\ndata\n  name 项目计划\n  children\n    - name 研究阶段\n      children\n        - name 市场调研\n        - name 技术可行性分析\n    - name 设计阶段\n      children\n        - name 产品功能确定\n        - name UI 设计\n    - name 开发阶段\n      children\n        - name 编写代码\n        - name 单元测试\n    - name 测试阶段\n      children\n        - name 功能测试\n        - name 性能测试\ntitle 项目计划\ndirection LR',
      },
      {
        title: '用思维导图展示台风形成的因素，包含气象条件和地理环境两大分支，使用暗色主题。',
        description: '用思维导图展示台风形成的因素，暗色主题。',
        code: 'vis mindmap\ndata\n  name 台风形成的因素\n  children\n    - name 气象条件\n      children\n        - name 温暖的海水\n        - name 气压分布\n        - name 湿度水平\n        - name 风的切变\n    - name 地理环境\n      children\n        - name 大陆架的形状与深度\n        - name 海洋暖流的分布\n        - name 热带地区的气候特征\n        - name 岛屿的影响\ntitle 台风形成因素\ntheme dark',
      },
    ],
  },
];
