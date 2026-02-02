'use client';

import { GPTVis } from '@antv/gpt-vis';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 flex gap-8">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
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
              Explore 20 AI-friendly chart types with comprehensive knowledge base and live examples
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
                      {chart.examples.slice(0, 3).map((example, exIdx) => (
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
          '用双轴图可视化我的数据 [{ "year": 2020, "revenue": 500, "growth_rate": 10 }, { "year": 2021, "revenue": 600,...',
        description:
          '用双轴图可视化我的数据 [{ "year": 2020, "revenue": 500, "growth_rate": 10 }, { "year": 2021, "revenue": 600,...',
        code: 'vis dual-axes\ncategories\n  - 2020\n  - 2021\n  - 2022\ntitle "2020-2022 Income and Growth Rate"\naxisXTitle Year\nseries\n  - type column\n    axisYTitle Income\n    data\n      - 500\n      - 600\n      - 700\n  - type line\n    axisYTitle "Growth Rate"\n    data\n      - 10\n      - 12\n      - 15',
      },
      {
        title:
          '用组合图可视化我的数据 [{ "day": "20240501", "cnt": 1000, "growth_rate": 10 }, { "day": "20240502", "cnt": 1...',
        description:
          '用组合图可视化我的数据 [{ "day": "20240501", "cnt": 1000, "growth_rate": 10 }, { "day": "20240502", "cnt": 1...',
        code: 'vis dual-axes\ncategories\n  - 20240501\n  - 20240502\n  - 20240503\ntitle 五一期间景区人流量\naxisXTitle 日期\nseries\n  - type column\n    axisYTitle 人数\n    data\n      - 1000\n      - 1500\n      - 1200\n  - type line\n    axisYTitle 增长率\n    data\n      - 0\n      - 50\n      - 20',
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
        title: '展示一组成绩分布。',
        description: '展示一组成绩分布。',
        code: 'vis violin\ndata\n  - category 班级A\n    value 15\n  - category 班级A\n    value 18\n  - category 班级A\n    value 22\n  - category 班级A\n    value 27\n  - category 班级A\n    value 35\n  - category 班级B\n    value 10\n  - category 班级B\n    value 14\n  - category 班级B\n    value 19\n  - category 班级B\n    value 23\n  - category 班级B\n    value 30\ntitle 成绩分布',
      },
      {
        title: '展示三组实验数据分布，主题为 dark。',
        description: '展示三组实验数据分布，主题为 dark。',
        code: 'vis violin\ndata\n  - category 实验组1\n    value 12\n  - category 实验组1\n    value 15\n  - category 实验组1\n    value 20\n  - category 实验组1\n    value 25\n  - category 实验组1\n    value 30\n  - category 实验组2\n    value 18\n  - category 实验组2\n    value 22\n  - category 实验组2\n    value 28\n  - category 实验组2\n    value 35\n  - category 实验组2\n    value 40\n  - category 实验组3\n    value 14\n  - category 实验组3\n    value 19\n  - category 实验组3\n    value 24\n  - category 实验组3\n    value 29\n  - category 实验组3\n    value 34\ntitle 实验数据分布\ntheme dark',
      },
      {
        title: '展示金融数据分布，使用自定义调色板和背景色。',
        description: '展示金融数据分布，使用自定义调色板和背景色。',
        code: 'vis violin\ndata\n  - category 股票A\n    value 50\n  - category 股票A\n    value 55\n  - category 股票A\n    value 60\n  - category 股票A\n    value 65\n  - category 股票A\n    value 70\n  - category 股票B\n    value 45\n  - category 股票B\n    value 50\n  - category 股票B\n    value 55\n  - category 股票B\n    value 60\n  - category 股票B\n    value 65\ntitle 金融数据分布\nstyle\n  palette #FF9800 #2196F3 #F5F5F5\n  backgroundColor #333333',
      },
    ],
  },
  {
    id: 'mind-map',
    name: 'Mind Map',
    icon: '🧠',
    description:
      '思维导图，是一种以中心主题为核心，通过层级分支的形式组织和展示信息的图表。使用中心点两侧分布，合理利用空间，并能清晰呈现主干与分支的所属分层关系。 它以节点为单位，逐层展开，以便将概念、任务或想法分类。当文本内容复杂时，思维导图可以帮助提取并结构化关键信息，明确主要主题与子主题之间的关系。',
    knowledge: {
      introduction:
        '思维导图，是一种以中心主题为核心，通过层级分支的形式组织和展示信息的图表。使用中心点两侧分布，合理利用空间，并能清晰呈现主干与分支的所属分层关系。 它以节点为单位，逐层展开，以便将概念、任务或想法分类。当文本内容复杂时，思维导图可以帮助提取并结构化关键信息，明确主要主题与子主题之间的关系。',
      useCases: ['内容围绕一个核心主题展开，内容可以按照逻辑层次进行分解'],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "mind-map"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，`MindMapData` 对象类型，包含以下字段：',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '节点的名称，用于显示在思维导图的节点，必填，字符串类型；',
        },
        {
          property: 'data.children',
          type: 'optional',
          description:
            '当前节点的子节点集合选填，数组对象类型。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `MindMapData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构；',
        },
      ],
    },
    examples: [
      {
        title:
          '我想制定一个项目计划，分为几个阶段：研究、设计、开发和测试。在研究阶段，需要进行市场调研和技术可行性分析；设计阶段需要确定产品功能和 UI 设计；开发阶段要写代码并进行单元测试；测试阶段需要进行...',
        description:
          '我想制定一个项目计划，分为几个阶段：研究、设计、开发和测试。在研究阶段，需要进行市场调研和技术可行性分析；设计阶段需要确定产品功能和 UI 设计；开发阶段要写代码并进行单元测试；测试阶段需要进行...',
        code: 'vis mind-map\ndata\n  - name 项目计划\n    children\n      - name 研究阶段\n        children\n          - name 市场调研\n          - name 技术可行性分析\n      - name 设计阶段\n        children\n          - name 产品功能确定\n          - name UI设计\n      - name 开发阶段\n        children\n          - name 编写代码\n          - name 单元测试\n      - name 测试阶段\n        children\n          - name 功能测试\n          - name 性能测试',
      },
      {
        title:
          '用思维导图来可视化我的数据 { "人工智能应用": ["智能家居", "自动驾驶", "医疗保健", "金融服务"], "医疗保健": ["精准医疗", "诊断辅助"] }。',
        description:
          '用思维导图来可视化我的数据 { "人工智能应用": ["智能家居", "自动驾驶", "医疗保健", "金融服务"], "医疗保健": ["精准医疗", "诊断辅助"] }。',
        code: 'vis mind-map\ndata\n  - name 人工智能应用\n    children\n      - name 智能家居\n      - name 自动驾驶\n      - name 医疗保健\n        children\n          - name 精准医疗\n          - name 诊断辅助\n      - name 金融服务',
      },
      {
        title:
          '用思维导图来可视化我的数据 [{ "id": 1, "name": "台风形成的因素", "parent": null },{ "id": 2, "name": "气象条件", "parent"...',
        description:
          '用思维导图来可视化我的数据 [{ "id": 1, "name": "台风形成的因素", "parent": null },{ "id": 2, "name": "气象条件", "parent"...',
        code: 'vis mind-map\ndata\n  - name 台风形成的因素\n    children\n      - name 气象条件\n        children\n          - name 温暖的海水\n          - name 气压分布\n          - name 湿度水平\n          - name 风的切变\n      - name 地理环境\n        children\n          - name 大陆架的形状与深度\n          - name 海洋暖流的分布\n          - name 热带地区的气候特征\n          - name 岛屿的影响',
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
          '我国出生人口，2015 年出生人口 1700 万人，2016 年出生人口 1500 万人，2017 年出生人口 1200 万人。用折线图可视化。',
        description:
          '我国出生人口，2015 年出生人口 1700 万人，2016 年出生人口 1500 万人，2017 年出生人口 1200 万人。用折线图可视化。',
        code: 'vis line\ndata\n  - time "2015 年"\n    value 1700\n  - time "2016 年"\n    value 1500\n  - time "2017 年"\n    value 1200\ntitle 出生人口变化\naxisXTitle 年份\naxisYTitle 出生人口（万人）',
      },
      {
        title:
          '我国出生人口与死亡人口，2015 年分别是 1700 万人与 965 万人，2016 年分别是出生人口 1500 万人与 846 万人，2017 年分别是出生人口 1200 万人与 782 万人...',
        description:
          '我国出生人口与死亡人口，2015 年分别是 1700 万人与 965 万人，2016 年分别是出生人口 1500 万人与 846 万人，2017 年分别是出生人口 1200 万人与 782 万人...',
        code: 'vis line\ndata\n  - time "2015 年"\n    value 1700\n    group 出生人口\n  - time "2015 年"\n    value 965\n    group 死亡人口\n  - time "2016 年"\n    value 1500\n    group 出生人口\n  - time "2016 年"\n    value 846\n    group 死亡人口\n  - time "2017 年"\n    value 1200\n    group 出生人口\n  - time "2017 年"\n    value 782\n    group 死亡人口\ntitle 出生人口与死亡人口变化\naxisXTitle 年份\naxisYTitle 人口（万人）',
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
          '研究广告支出与销售额之间的关系，广告支出（单位：千元）为 10, 20, 30, 40，销售额（单位：万元）分别为 15, 25, 35, 45。用散点图可视化我的数据。',
        description:
          '研究广告支出与销售额之间的关系，广告支出（单位：千元）为 10, 20, 30, 40，销售额（单位：万元）分别为 15, 25, 35, 45。用散点图可视化我的数据。',
        code: 'vis scatter\ndata\n  - x 10\n    y 15\n  - x 20\n    y 25\n  - x 30\n    y 35\n  - x 40\n    y 45',
      },
      {
        title:
          '用散点图可视化我的数据 [{ "age": 25, "income": 5000, "size": 55 }, { "age": 35, "income": 7000, "size": 65 }...',
        description:
          '用散点图可视化我的数据 [{ "age": 25, "income": 5000, "size": 55 }, { "age": 35, "income": 7000, "size": 65 }...',
        code: 'vis scatter\ndata\n  - x 25\n    y 5000\n  - x 35\n    y 7000\n  - x 45\n    y 10000',
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
    id: 'flow-diagram',
    name: 'Flow Diagram',
    icon: '🔄',
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
          description: '图表的数据，必填，对象类型，包含以下字段：',
        },
        {
          property: 'data.nodes',
          type: 'required',
          description: '网络图中的节点数组，每个节点表示一个实体，必填，数组对象类型；',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '节点的名称，必须唯一，用于标识节点，必填，文本类型；',
        },
        {
          property: 'data.edges',
          type: 'required',
          description: '网络图中的边数组，每条边表示两个节点之间的关系，必填，数组对象类型；',
        },
        {
          property: 'data.source',
          type: 'required',
          description: '边的起始节点名称，指向节点的 `name` 属性，必填，文本类型；',
        },
        {
          property: 'data.target',
          type: 'required',
          description: '边的目标节点名称，指向节点的 `name` 属性，必填，文本类型；',
        },
        {
          property: 'data.name',
          type: 'optional',
          description: '边的名称，用于标识边，选填，文本类型；',
        },
      ],
    },
    examples: [
      {
        title:
          '用户注册流程包括以下步骤：用户访问注册页面，填写注册表单并提交，系统验证用户信息（无误则创建账户，有误则提示修改），系统发送验证邮件，用户点击邮件中的链接完成验证，系统提示注册成功并跳转到登录页...',
        description:
          '用户注册流程包括以下步骤：用户访问注册页面，填写注册表单并提交，系统验证用户信息（无误则创建账户，有误则提示修改），系统发送验证邮件，用户点击邮件中的链接完成验证，系统提示注册成功并跳转到登录页...',
        code: 'vis flow-diagram\ndata\n  - source 访问注册页面\n    target 填写并提交注册表单\n  - source 填写并提交注册表单\n    target 验证用户信息\n  - source 验证用户信息\n    target 创建新用户账户\n    name 信息无误\n  - source 验证用户信息\n    target 提示修改错误信息\n    name 信息有误\n  - source 创建新用户账户\n    target 发送验证邮件\n  - source 发送验证邮件\n    target 点击验证链接\n  - source 点击验证链接\n    target 注册成功，跳转到登录页面',
      },
      {
        title:
          "用流程图来可视化一下我的数据 `['客户下单', '系统生成订单', '仓库拣货', '仓库打包', '物流配送', '客户收货']`。",
        description:
          "用流程图来可视化一下我的数据 `['客户下单', '系统生成订单', '仓库拣货', '仓库打包', '物流配送', '客户收货']`。",
        code: 'vis flow-diagram\ndata\n  - source 客户下单\n    target 系统生成订单\n  - source 系统生成订单\n    target 仓库拣货\n  - source 仓库拣货\n    target 仓库打包\n  - source 仓库打包\n    target 物流配送\n  - source 物流配送\n    target 客户收货',
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
        title: '展示销售漏斗各阶段数据。',
        description: '展示销售漏斗各阶段数据。',
        code: 'vis funnel\ndata\n  - category 访问\n    value 1000\n  - category 咨询\n    value 600\n  - category 下单\n    value 300\n  - category 成交\n    value 120\ntitle 销售漏斗',
      },
      {
        title: '展示用户转化流程，主题为 dark。',
        description: '展示用户转化流程，主题为 dark。',
        code: 'vis funnel\ndata\n  - category 注册\n    value 800\n  - category 激活\n    value 500\n  - category 付费\n    value 200\ntitle 用户转化流程\ntheme dark',
      },
      {
        title: '展示活动参与漏斗，自定义颜色。',
        description: '展示活动参与漏斗，自定义颜色。',
        code: 'vis funnel\ndata\n  - category 报名\n    value 1500\n  - category 签到\n    value 900\n  - category 参与\n    value 700\ntitle 活动参与漏斗\nstyle\n  palette #FF7F50 #87CEFA #32CD32\n  backgroundColor #FFF8DC',
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
          '展示公司从期初到期末的利润变化：期初利润 100，销售收入增加 80，运营成本减少 -50，税费减少 -20，得到期末利润。',
        description:
          '展示公司从期初到期末的利润变化：期初利润 100，销售收入增加 80，运营成本减少 -50，税费减少 -20，得到期末利润。',
        code: 'vis waterfall\ndata\n  - category 期初利润\n    value 100\n  - category 销售收入\n    value 80\n  - category 运营成本\n    value -50\n  - category 税费\n    value -20\n  - category 总计\n    isTotal true',
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
          '用直方图展示考试成绩的分布，成绩在 0-100 之间，将其划分为 5 个区间，数据如下：[78 , 88, 60, 100, 95]，并设置标题为“成绩分布”',
        description:
          '用直方图展示考试成绩的分布，成绩在 0-100 之间，将其划分为 5 个区间，数据如下：[78 , 88, 60, 100, 95]，并设置标题为“成绩分布”',
        code: 'vis histogram\ndata\n  - 78\n  - 88\n  - 60\n  - 100\n  - 95\nbinNumber 5\ntitle 成绩分布',
      },
      {
        title:
          '用直方图可视化我的数据：[{ "value": 20 }, { "value": 25 }, { "value": 30 }, { "value": 35 }]',
        description:
          '用直方图可视化我的数据：[{ "value": 20 }, { "value": 25 }, { "value": 30 }, { "value": 35 }]',
        code: 'vis histogram\ndata\n  - 20\n  - 25\n  - 30\n  - 35',
      },
      {
        title:
          '用直方图展示花瓣大小的分布情况，并显示 x 轴标题为“花瓣大小分布”，y 轴标题为“花瓣分布数量”数据如下：[',
        description:
          '用直方图展示花瓣大小的分布情况，并显示 x 轴标题为“花瓣大小分布”，y 轴标题为“花瓣分布数量”数据如下：[',
        code: 'vis histogram\ndata\n  - 1.2\n  - 3.4\n  - 3.7\n  - 4.3\n  - 5.2\n  - 5.8\n  - 6.1\naxisXTitle 花瓣大小分布\naxisYTitle 花瓣分布数量',
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
          '用矩阵树图展示一个公司的部门及其员工人数，如公司有两个部门，A 部门 100 人，B 部门 80 人，A 部门分为 A1、A2、A3 三个小组，人数分别为 40、30 和 30；B 部门分为 B...',
        description:
          '用矩阵树图展示一个公司的部门及其员工人数，如公司有两个部门，A 部门 100 人，B 部门 80 人，A 部门分为 A1、A2、A3 三个小组，人数分别为 40、30 和 30；B 部门分为 B...',
        code: 'vis treemap\ndata\n  - name A\n    value 100\n    children\n      - name A1\n        value 40\n      - name A2\n        value 30\n      - name A3\n        value 30\n  - name B\n    value 80\n    children\n      - name B1\n        value 50\n      - name B2\n        value 30',
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
        title: '展示一组成绩分布。',
        description: '展示一组成绩分布。',
        code: 'vis boxplot\ndata\n  - category 班级A\n    value 15\n  - category 班级A\n    value 18\n  - category 班级A\n    value 22\n  - category 班级A\n    value 27\n  - category 班级A\n    value 35\n  - category 班级B\n    value 10\n  - category 班级B\n    value 14\n  - category 班级B\n    value 19\n  - category 班级B\n    value 23\n  - category 班级B\n    value 30\ntitle 成绩分布',
      },
      {
        title: '展示三组实验数据分布，主题为 dark。',
        description: '展示三组实验数据分布，主题为 dark。',
        code: 'vis boxplot\ndata\n  - category 实验组1\n    value 12\n  - category 实验组1\n    value 15\n  - category 实验组1\n    value 20\n  - category 实验组1\n    value 25\n  - category 实验组1\n    value 30\n  - category 实验组2\n    value 18\n  - category 实验组2\n    value 22\n  - category 实验组2\n    value 28\n  - category 实验组2\n    value 35\n  - category 实验组2\n    value 40\n  - category 实验组3\n    value 14\n  - category 实验组3\n    value 19\n  - category 实验组3\n    value 24\n  - category 实验组3\n    value 29\n  - category 实验组3\n    value 34\ntitle 实验数据分布\ntheme dark',
      },
      {
        title: '展示金融数据分布，自定义盒体和须线颜色。',
        description: '展示金融数据分布，自定义盒体和须线颜色。',
        code: 'vis boxplot\ndata\n  - category 股票A\n    value 50\n  - category 股票A\n    value 55\n  - category 股票A\n    value 60\n  - category 股票A\n    value 65\n  - category 股票A\n    value 70\n  - category 股票B\n    value 45\n  - category 股票B\n    value 50\n  - category 股票B\n    value 55\n  - category 股票B\n    value 60\n  - category 股票B\n    value 65\ntitle 金融数据分布\nstyle\n  boxColor #FF9800\n  whiskerColor #2196F3\n  backgroundColor #F5F5F5',
      },
    ],
  },
  {
    id: 'org-chart',
    name: 'Organization Chart',
    icon: '👔',
    description:
      '组织架构图，用于直观地展示组织内部的层级结构和部门关系。它通过节点和边表示不同的职位、部门及其上下级关系。每个节点代表一个职位或部门，边则表示上下级或平级关系。以树状结构呈现，顶层为最高管理层，逐层向下展开，直至各个部门和职位。',
    knowledge: {
      introduction:
        '组织架构图，用于直观地展示组织内部的层级结构和部门关系。它通过节点和边表示不同的职位、部门及其上下级关系。每个节点代表一个职位或部门，边则表示上下级或平级关系。以树状结构呈现，顶层为最高管理层，逐层向下展开，直至各个部门和职位。',
      useCases: [
        '想要展示公司或团队的层级结构，明确各个职位和部门的上下级关系',
        '展示员工的职位和部门分布',
        '项目管理时，明确项目团队的成员和职责分工',
        '用于股权穿透、投资上下游公司等依赖分析',
      ],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "organization-chart"',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，`OrganizationChartData`对象类型，包含以下字段：',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '节点的名称，表示职位或部门的名称，必须唯一，必填，字符串类型',
        },
        {
          property: 'data.description',
          type: 'optional',
          description: '节点的描述信息，可以包含职位职责或部门简介等，选填，字符串类型',
        },
        {
          property: 'data.children',
          type: 'optional',
          description:
            '节点数组，表示下级职位或部门。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `OrganizationChartData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构，选填，数组对象类型',
        },
      ],
    },
    examples: [
      {
        title:
          'Alice Johnson 是公司的首席技术官，她的团队包括资深软件工程师 Bob Smith 和 IT 支持部门负责人 Eve Black。Bob Smith 负责带领软件工程团队，团队成员包...',
        description:
          'Alice Johnson 是公司的首席技术官，她的团队包括资深软件工程师 Bob Smith 和 IT 支持部门负责人 Eve Black。Bob Smith 负责带领软件工程团队，团队成员包...',
        code: 'vis organization-chart\ndata\n  - name "Alice Johnson"\n    description "Chief Technology Officer"\n    children\n      - name "Bob Smith"\n        description "Senior Software Engineer"\n        children\n          - name "Charlie Brown"\n            description "Software Engineer"\n          - name "Diana White"\n            description "Software Engineer"\n      - name "Eve Black"\n        description "IT Support Department Head"\n        children\n          - name "Frank Green"\n            description "IT Support Specialist"\n          - name "Grace Blue"\n            description "IT Support Specialist"',
      },
      {
        title:
          '用组织机构图来可视化以下数据 `{"name":"Eric Joplin","description":"Chief Executive Officer","children":[{"name"...',
        description:
          '用组织机构图来可视化以下数据 `{"name":"Eric Joplin","description":"Chief Executive Officer","children":[{"name"...',
        code: 'vis organization-chart\ndata\n  - name "Eric Joplin"\n    description "Chief Executive Officer"\n    children\n      - name "Linda Newland"\n        description "Chief Executive Assistant"',
      },
    ],
  },
  {
    id: 'network-graph',
    name: 'Network Graph',
    icon: '🕸️',
    description:
      '网络图（Network Graph）是一种展示实体（节点）之间的关系（边）的图。通过节点和边的连接，直观地表示复杂的网络结构。每个节点代表一个实体，而每条边则表示两个节点之间的关系或连接。 网络图的关键就是展示“谁跟谁有联系”。比如，节点代表人，连线代表某两个人之间是否认识。',
    knowledge: {
      introduction:
        '网络图（Network Graph）是一种展示实体（节点）之间的关系（边）的图。通过节点和边的连接，直观地表示复杂的网络结构。每个节点代表一个实体，而每条边则表示两个节点之间的关系或连接。 网络图的关键就是展示“谁跟谁有联系”。比如，节点代表人，连线代表某两个人之间是否认识。',
      useCases: [
        '适用于展示实体之间的关系，例如社交网络中的人际关系。当文本中涉及多个实体（如人物、事件等）以及它们之间的关联时，并且关注这些复杂的关系。',
        '分析复杂网络结构中的模式和特性，例如通信网络中的节点连接情况。',
        '展示数据之间的关联性和依赖关系，例如知识图谱中的概念关联。',
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
          description: '图表的数据，必填，对象类型，包含以下字段：',
        },
        {
          property: 'data.nodes',
          type: 'required',
          description: '网络图中的节点数组，每个节点表示一个实体，必填，数组对象类型；',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '节点的名称，必须唯一，用于标识节点，必填，文本类型；',
        },
        {
          property: 'data.edges',
          type: 'required',
          description: '网络图中的边数组，每条边表示两个节点之间的关系，必填，数组对象类型；',
        },
        {
          property: 'data.source',
          type: 'required',
          description: '边的起始节点名称，指向节点的 `name` 属性，必填，文本类型；',
        },
        {
          property: 'data.target',
          type: 'required',
          description: '边的目标节点名称，指向节点的 `name` 属性，必填，文本类型；',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '边的名称，用于标识边，必填，文本类型；',
        },
      ],
    },
    examples: [
      {
        title:
          '在《哈利波特》系列中，有几个主要人物：哈利·波特、赫敏·格兰杰、罗恩·韦斯莱和伏地魔。哈利·波特是主角，他的两个最好的朋友是赫敏·格兰杰和罗恩·韦斯莱。伏地魔是哈利·波特的主要敌人，曾试图杀死哈...',
        description:
          '在《哈利波特》系列中，有几个主要人物：哈利·波特、赫敏·格兰杰、罗恩·韦斯莱和伏地魔。哈利·波特是主角，他的两个最好的朋友是赫敏·格兰杰和罗恩·韦斯莱。伏地魔是哈利·波特的主要敌人，曾试图杀死哈...',
        code: 'vis network-graph\ndata\n  - source 哈利·波特\n    target 赫敏·格兰杰\n    name 朋友\n  - source 哈利·波特\n    target 罗恩·韦斯莱\n    name 朋友\n  - source 哈利·波特\n    target 伏地魔\n    name 敌人\n  - source 伏地魔\n    target 哈利·波特\n    name 试图杀死',
      },
      {
        title:
          '用网络图来可视化我的数据 `[["哈利·波特", "朋友", "赫敏·格兰杰"], ["哈利·波特", "朋友", "罗恩·韦斯莱"], ["哈利·波特", "敌人", "伏地魔"], ["伏地...',
        description:
          '用网络图来可视化我的数据 `[["哈利·波特", "朋友", "赫敏·格兰杰"], ["哈利·波特", "朋友", "罗恩·韦斯莱"], ["哈利·波特", "敌人", "伏地魔"], ["伏地...',
        code: 'vis network-graph\ndata\n  - source 哈利·波特\n    target 赫敏·格兰杰\n    name 朋友\n  - source 哈利·波特\n    target 罗恩·韦斯莱\n    name 朋友\n  - source 哈利·波特\n    target 伏地魔\n    name 敌人\n  - source 伏地魔\n    target 哈利·波特\n    name 试图杀死',
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
        code: `vis summary
content
  # Q4 Sales Report
  
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
        code: `vis summary
content
  # Market Analysis Report
  
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
        code: `vis summary
content
  # Sales Performance
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
          '根据一篇关于环境保护的文章生成词云图，其中“环境”出现了 20 次，“保护”出现了 15 次，“可持续发展”出现了 10 次。',
        description:
          '根据一篇关于环境保护的文章生成词云图，其中“环境”出现了 20 次，“保护”出现了 15 次，“可持续发展”出现了 10 次。',
        code: 'vis word-cloud\ndata\n  - text 环境\n    value 20\n  - text 保护\n    value 15\n  - text 可持续发展\n    value 10',
      },
      {
        title:
          '从一系列产品评价中提取关键字并创建词云图，“质量好”被提到 30 次，“价格合理”被提到了 20 次，“服务差”被提及了 5 次。',
        description:
          '从一系列产品评价中提取关键字并创建词云图，“质量好”被提到 30 次，“价格合理”被提到了 20 次，“服务差”被提及了 5 次。',
        code: 'vis word-cloud\ndata\n  - text 质量好\n    value 30\n  - text 价格合理\n    value 20\n  - text 服务差\n    value 5',
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
          '每月的股票价格的变化，1 月份股票价格为 23.895，2 月份股票价格为 23.695，3 月份股票价格为 23.655。用面积图可视化。',
        description:
          '每月的股票价格的变化，1 月份股票价格为 23.895，2 月份股票价格为 23.695，3 月份股票价格为 23.655。用面积图可视化。',
        code: 'vis area\ndata\n  - time "1 月"\n    value 23.895\n  - time "2 月"\n    value 23.695\n  - time "3 月"\n    value 23.655\ntitle 1月到3月股票价格的变化\naxisXTitle 月份\naxisYTitle 价格',
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
        title: '展示两个集合的交集关系。',
        description: '展示两个集合的交集关系。',
        code: 'vis venn\ndata\n  - sets A\n    value 20\n    label 集合A\n  - sets B\n    value 15\n    label 集合B\n  - sets A,B\n    value 5\n    label 交集AB\ntitle 集合交集示例',
      },
      {
        title: '展示三个集合的交集和并集关系，主题为 dark。',
        description: '展示三个集合的交集和并集关系，主题为 dark。',
        code: 'vis venn\ndata\n  - sets A\n    value 10\n    label 集合A\n  - sets B\n    value 8\n    label 集合B\n  - sets C\n    value 6\n    label 集合C\n  - sets A,B\n    value 4\n  - sets A,C\n    value 2\n  - sets B,C\n    value 1\n  - sets A,B,C\n    value 1\ntitle 三集合关系\ntheme dark',
      },
      {
        title: '展示集合关系并自定义颜色和背景色。',
        description: '展示集合关系并自定义颜色和背景色。',
        code: 'vis venn\ndata\n  - sets A\n    value 30\n    label 购买手机\n  - sets B\n    value 25\n    label 购买耳机\n  - sets A,B\n    value 10\ntitle 标签交集\nstyle\n  palette #FFB6C1 #87CEFA\n  backgroundColor #F8F8FF',
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
    id: 'fishbone-diagram',
    name: 'Fishbone Diagram',
    icon: '🐟',
    description:
      '鱼骨图，是一种以核心问题为鱼头，通过鱼骨分支的形式分析和展示问题原因或结果的图表。它利用鱼骨的结构，将问题分解为多个类别，并在每个类别下进一步细分具体原因或结果，从而清晰地展现问题的全貌。 它以节点为单位，逐级深入，以便将问题、原因或结果分类。当问题复杂且涉及多个方面时，鱼骨图可以帮助梳理并结构化关键信息，明确主要问题与其背后的因果关系。',
    knowledge: {
      introduction:
        '鱼骨图，是一种以核心问题为鱼头，通过鱼骨分支的形式分析和展示问题原因或结果的图表。它利用鱼骨的结构，将问题分解为多个类别，并在每个类别下进一步细分具体原因或结果，从而清晰地展现问题的全貌。 它以节点为单位，逐级深入，以便将问题、原因或结果分类。当问题复杂且涉及多个方面时，鱼骨图可以帮助梳理并结构化关键信息，明确主要问题与其背后的因果关系。',
      useCases: ['问题具有明确的核心，且可以分解为多个相关的原因或结果'],
      config: [
        {
          property: 'type',
          type: 'required',
          description: '图表的类型，必填，文本类型，值必须为 "fishbone-diagram"。',
        },
        {
          property: 'data',
          type: 'required',
          description: '图表的数据，必填，`FishboneData` 对象类型，包含以下字段：',
        },
        {
          property: 'data.name',
          type: 'required',
          description: '节点的名称，用于显示在思维导图的节点，必填，字符串类型；',
        },
        {
          property: 'data.children',
          type: 'optional',
          description:
            '当前节点的子节点集合选填，数组对象类型。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `FishboneData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构；',
        },
      ],
    },
    examples: [
      {
        title:
          '我想分析产品销量下降的原因，可能涉及市场推广、产品质量、客户服务和价格策略四个方面。市场推广方面，可能是广告投入减少和促销活动不足；产品质量方面，可能是产品缺陷和品质不稳定；客户服务方面，可能是...',
        description:
          '我想分析产品销量下降的原因，可能涉及市场推广、产品质量、客户服务和价格策略四个方面。市场推广方面，可能是广告投入减少和促销活动不足；产品质量方面，可能是产品缺陷和品质不稳定；客户服务方面，可能是...',
        code: 'vis fishbone-diagram\ndata\n  - name 产品销量下降\n    children\n      - name 市场推广\n        children\n          - name 广告投入减少\n          - name 促销活动不足\n      - name 产品质量\n        children\n          - name 产品缺陷\n          - name 品质不稳定\n      - name 客户服务\n        children\n          - name 响应速度慢\n          - name 服务态度差\n      - name 价格策略\n        children\n          - name 定价过高\n          - name 竞争对手降价',
      },
      {
        title:
          '用鱼骨图来可视化一下我的数据：{"problem":"生产效率低","bones":[{"category":"设备问题","factors":["设备老化","维护不及时"]},{"categ...',
        description:
          '用鱼骨图来可视化一下我的数据：{"problem":"生产效率低","bones":[{"category":"设备问题","factors":["设备老化","维护不及时"]},{"categ...',
        code: 'vis fishbone-diagram\ndata\n  - name 生产效率低\n    children\n      - name 设备问题\n        children\n          - name 设备老化\n          - name 维护不及时\n      - name 员工问题\n        children\n          - name 技能不足\n          - name 工作态度差\n      - name 流程问题\n        children\n          - name 流程繁琐\n          - name 缺乏标准化',
      },
    ],
  },
];
