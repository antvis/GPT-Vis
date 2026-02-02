'use client';

import { GPTVis } from '@antv/gpt-vis';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Chart Preview Component
function ChartPreview({ syntax, chartId }: { syntax: string; chartId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setError(null);

      // Clear container for re-render
      const container = containerRef.current;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      try {
        const gptVis = new GPTVis({ container });
        const data = JSON.parse(syntax);
        gptVis.render(data);
      } catch (err) {
        console.error(`Chart render error for ${chartId}:`, err);
        setError(err instanceof Error ? err.message : 'Failed to render chart');
      }
    }
  }, [syntax, chartId]);

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
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

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

                          {/* Split View */}
                          <div className="grid md:grid-cols-2 divide-x divide-gray-200">
                            {/* Left: Preview */}
                            <div
                              className="bg-gradient-to-br from-[#691eff]/5 to-transparent p-6 flex items-center justify-center"
                              style={{ minHeight: '400px' }}
                            >
                              <ChartPreview
                                syntax={example.code}
                                chartId={`${chart.id}-${exIdx}`}
                              />
                            </div>

                            {/* Right: Code */}
                            <div className="relative bg-gray-900 p-6">
                              <button
                                onClick={() => copyCode(example.code, `${chart.id}-${exIdx}`)}
                                className="absolute top-4 right-4 px-3 py-1.5 bg-[#691eff] hover:bg-[#5517d8] text-white text-xs rounded-lg transition-colors"
                              >
                                {copiedIndex === `${chart.id}-${exIdx}` ? 'Copied!' : 'Copy'}
                              </button>
                              <pre className="text-xs text-gray-300 overflow-x-auto pt-8">
                                <code>{example.code}</code>
                              </pre>
                            </div>
                          </div>
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
    id: 'line-chart',
    name: 'Line Chart',
    icon: '📈',
    description:
      '折线图是是一个由笛卡尔坐标系（直角坐标系），一些点和线组成的统计图表，常用来表示数值随连续时间间隔或有序类别的变化。在折线图中，x 轴通常用作连续时间间隔或有序类别。y 轴用于量化的数据，如果为负值则绘制于 y 轴下方。连线用于连接两个相邻的数据点。\n\n折线图用于分析事物随时间或有序类别而变化的趋势。从数据上来说，折线图需要一个连续时间字段或一个分类字段和至少一个连续数据字段。',
    knowledge: {
      introduction:
        '折线图是是一个由笛卡尔坐标系（直角坐标系），一些点和线组成的统计图表，常用来表示数值随连续时间间隔或有序类别的变化。在折线图中，x 轴通常用作连续时间间隔或有序类别。y 轴用于量化的数据，如果为负值则绘制于 y 轴下方。连线用于连接两个相邻的数据点。\n\n折线图用于分析事物随时间或有序类别而变化的趋势。从数据上来说，折线图需要一个连续时间字段或一个分类字段和至少一个连续数据字段。',
      useCases: [
        '同一变量随时间或有序类别的变化，比如 2000 到 2016 年苹果电脑销售额在苹果利润的占比的变化趋势。',
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
          property: 'time',
          type: 'required',
          description: '数据的时序名称 ，必填，文本或数值类型；',
        },
        {
          property: 'value',
          type: 'required',
          description: '数据的值，必填，数值类型；',
        },
        {
          property: 'group',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
        {
          property: 'lineWidth',
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
        code: '{\n  "type": "line",\n  "data": [\n    { "time": "2015 年", "value": 1700 },\n    { "time": "2016 年", "value": 1500 },\n    { "time": "2017 年", "value": 1200 }\n  ],\n  "title": "出生人口变化",\n  "axisXTitle": "年份",\n  "axisYTitle": "出生人口（万人）"\n}',
      },
      {
        title:
          '我国出生人口与死亡人口，2015 年分别是 1700 万人与 965 万人，2016 年分别是出生人口 1500 万人与 846 万人，2017 年分别是出生人口 1200 万人与 782 万人。用多...',
        description:
          '我国出生人口与死亡人口，2015 年分别是 1700 万人与 965 万人，2016 年分别是出生人口 1500 万人与 846 万人，2017 年分别是出生人口 1200 万人与 782 万人。用多折线图可视化。',
        code: '{\n  "type": "line",\n  "data": [\n    { "time": "2015 年", "value": 1700, "group": "出生人口" },\n    { "time": "2015 年", "value": 965, "group": "死亡人口" },\n    { "time": "2016 年", "value": 1500, "group": "出生人口" },\n    { "time": "2016 年", "value": 846, "group": "死亡人口" },\n    { "time": "2017 年", "value": 1200, "group": "出生人口" },\n    { "time": "2017 年", "value": 782, "group": "死亡人口" }\n  ],\n  "title": "出生人口与死亡人口变化",\n  "axisXTitle": "年份",\n  "axisYTitle": "人口（万人）"\n}',
      },
      {
        title:
          '用折线图可视化我的数据 [{ "year": 2015,"industrial": 7200.0 },{ "year": 2016, "industrial": 3660.0 },{ "year": ...',
        description:
          '用折线图可视化我的数据 [{ "year": 2015,"industrial": 7200.0 },{ "year": 2016, "industrial": 3660.0 },{ "year": 2017 ,"industrial": 4100.0 }]。',
        code: '{\n  "type": "line",\n  "data": [\n    { "time": 2015, "value": 7200.0 },\n    { "time": 2016, "value": 3660.0 },\n    { "time": 2017, "value": 4100.0 }\n  ],\n  "axisXTitle": "year",\n  "axisYTitle": "industrial"\n}',
      },
      {
        title:
          '用折线图可视化我的数据 [{"quarter":"Q1","sales":1540,"product":"家具"},{"quarter":"Q1","sales":2540,"product":"电子...',
        description:
          '用折线图可视化我的数据 [{"quarter":"Q1","sales":1540,"product":"家具"},{"quarter":"Q1","sales":2540,"product":"电子产品"},{"quarter":"Q1","sales":500,"product":"办公用品"},{"quarter":"Q2","sales":2000,"product":"家具"},{"quarter":"Q2","sales":3000,"product":"电子产品"},{"quarter":"Q2","sales":1000,"product":"办公用品"},{"quarter":"Q3","sales":4500,"product":"家具"},{"quarter":"Q3","sales":6500,"product":"电子产品"},{"quarter":"Q3","sales":2500,"product":"办公用品"}]。',
        code: '{\n  "type": "line",\n  "data": [\n    { "time": "Q1", "value": 1540.0, "group": "家具" },\n    { "time": "Q1", "value": 2540.0, "group": "电子产品" },\n    { "time": "Q1", "value": 500.0, "group": "办公用品" },\n    { "time": "Q2", "value": 2000.0, "group": "家具" },\n    { "time": "Q2", "value": 3000.0, "group": "电子产品" },\n    { "time": "Q2", "value": 1000.0, "group": "办公用品" },\n    { "time": "Q3", "value": 4500.0, "group": "家具" },\n    { "time": "Q3", "value": 6500.0, "group": "电子产品" },\n    { "time": "Q3", "value": 2500.0, "group": "办公用品" }\n  ],\n  "axisXTitle": "quarter",\n  "axisYTitle": "sales"\n}',
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
        '条形图适合对分类数据进行比较，尤其是在分类名称较长，或当分类项数量较多的情况下，由于条形图的水平排列更便于显示这些类别。此外，条形图也更适合横向对比。',
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
          property: 'category',
          type: 'required',
          description: '数据分类名称，必填，文本或数值类型；',
        },
        {
          property: 'value',
          type: 'required',
          description: '数据分类值，必填，数值类型；',
        },
        {
          property: 'group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型；',
        },
        {
          property: 'enableGrouping',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
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
        code: '{\n  "type": "bar",\n  "data": [\n    { "category": "2015 年", "value": 80 },\n    { "category": "2016 年", "value": 140 },\n    { "category": "2017 年", "value": 220 }\n  ],\n  "title": "海底捞公司外卖收入",\n  "axisXTitle": "年份",\n  "axisYTitle": "金额 （百万元）"\n}',
      },
      {
        title:
          '用条形图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "ti...',
        description:
          '用条形图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "title": "第三产业" ,"industrial": 41000.0 }]。',
        code: '{\n  "type": "bar",\n  "data": [\n    { "category": "第一产业", "value": 7200.0 },\n    { "category": "第二产业", "value": 36600.0 },\n    { "category": "第三产业", "value": 41000.0 }\n  ],\n  "axisXTitle": "name",\n  "axisYTitle": "industrial"\n}',
      },
      {
        title:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 ...',
        description:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用分组条形图可视化。',
        code: '{\n  "type": "bar",\n  "data": [\n    { "category": "北京", "value": 825.6, "group": "油车" },\n    { "category": "北京", "value": 60.2, "group": "新能源汽车" },\n    { "category": "上海", "value": 450, "group": "油车" },\n    { "category": "上海", "value": 95, "group": "新能源汽车" },\n    { "category": "深圳", "value": 506, "group": "油车" },\n    { "category": "深圳", "value": 76.7, "group": "新能源汽车" },\n    { "category": "广州", "value": 976.6, "group": "油车" },\n    { "category": "广州", "value": 97.2, "group": "新能源汽车" },\n    { "category": "杭州", "value": 651.2, "group": "油车" },\n    { "category": "杭州", "value": 62, "group": "新能源汽车" }\n  ],\n  "group": true,\n  "title": "油车与新能源汽车售卖量",\n  "axisXTitle": "城市",\n  "axisYTitle": "售卖量 （万辆）"\n}',
      },
      {
        title:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 ...',
        description:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用堆叠条形图可视化。',
        code: '{\n  "type": "bar",\n  "data": [\n    { "category": "北京", "value": 825.6, "group": "油车" },\n    { "category": "北京", "value": 60.2, "group": "新能源汽车" },\n    { "category": "上海", "value": 450, "group": "油车" },\n    { "category": "上海", "value": 95, "group": "新能源汽车" },\n    { "category": "深圳", "value": 506, "group": "油车" },\n    { "category": "深圳", "value": 76.7, "group": "新能源汽车" },\n    { "category": "广州", "value": 976.6, "group": "油车" },\n    { "category": "广州", "value": 97.2, "group": "新能源汽车" },\n    { "category": "杭州", "value": 651.2, "group": "油车" },\n    { "category": "杭州", "value": 62, "group": "新能源汽车" }\n  ],\n  "stack": true,\n  "title": "油车与新能源汽车售卖量",\n  "axisXTitle": "城市",\n  "axisYTitle": "售卖量 （万辆）"\n}',
      },
      {
        title:
          "用分组柱形图可视化我不同季度的销售数据，数据如下：{ 'Q1': { '2020': 10000, '2021': 12000 }, 'Q2': { '2020': 15000, '2021': 18...",
        description:
          "用分组柱形图可视化我不同季度的销售数据，数据如下：{ 'Q1': { '2020': 10000, '2021': 12000 }, 'Q2': { '2020': 15000, '2021': 18000 }, 'Q3': { '2020': 20000, '2021': 25000 }, 'Q4': { '2020': 25000, '2021': 30000 } }。",
        code: '{\n  "type": "bar",\n  "data": [\n    { "category": "2020", "value": 10000, "group": "Q1" },\n    { "category": "2021", "value": 12000, "group": "Q1" },\n    { "category": "2020", "value": 15000, "group": "Q2" },\n    { "category": "2021", "value": 18000, "group": "Q2" },\n    { "category": "2020", "value": 20000, "group": "Q3" },\n    { "category": "2021", "value": 25000, "group": "Q3" },\n    { "category": "2020", "value": 25000, "group": "Q4" },\n    { "category": "2021", "value": 30000, "group": "Q4" }\n  ],\n  "group": true,\n  "axisXTitle": "年份",\n  "axisYTitle": "售量"\n}',
      },
    ],
  },
  {
    id: 'area-chart',
    name: 'Area Chart',
    icon: '📉',
    description:
      '面积图，或称区域图，是一种随有序变量的变化，反映数值变化的统计图表，原理与折线图相似。而面积图的特点在于，折线与自变量坐标轴之间的区域，会由颜色填充。',
    knowledge: {
      introduction:
        '面积图，或称区域图，是一种随有序变量的变化，反映数值变化的统计图表，原理与折线图相似。而面积图的特点在于，折线与自变量坐标轴之间的区域，会由颜色填充。',
      useCases: [
        '想要体现在连续自变量下，数据的趋势变化，同时也能够观察到数据总量的变化趋势。',
        '例如，位移=速度（平均速度或微速度）x 时间：s=v\\*t; 那么如果我们的 x 轴是时间 t，y 轴是每个时刻的速度 v，使用面积图，不仅可以观察速度随时间变化的趋势，还可以根据面积大小来感受位移距离的长度变化。',
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
          property: 'time',
          type: 'required',
          description: '数据的时序名称，必填，文本或数值类型；',
        },
        {
          property: 'value',
          type: 'required',
          description: '数据的值，必填，数值类型；',
        },
        {
          property: 'group',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
        {
          property: 'lineWidth',
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
        code: '{\n  "type": "area",\n  "data": [\n    { "time": "1 月", "value": 23.895 },\n    { "time": "2 月", "value": 23.695 },\n    { "time": "3 月", "value": 23.655 }\n  ],\n  "title": "1月到3月股票价格的变化",\n  "axisXTitle": "月份",\n  "axisYTitle": "价格"\n}',
      },
      {
        title:
          '在某项研究中，2019 年到 2023 年中三个城市的空气污染指数变化如下：北京分别为 150，160，145，155，165；广州分别为 100，110，105，115，120；上海分别为 90，8...',
        description:
          '在某项研究中，2019 年到 2023 年中三个城市的空气污染指数变化如下：北京分别为 150，160，145，155，165；广州分别为 100，110，105，115，120；上海分别为 90，85，80，75，70。堆叠面积图可视化。',
        code: '{\n  "type": "area",\n  "data": [\n    { "time": "2019年", "value": 150, "group": "北京" },\n    { "time": "2020年", "value": 160, "group": "北京" },\n    { "time": "2021年", "value": 145, "group": "北京" },\n    { "time": "2022年", "value": 155, "group": "北京" },\n    { "time": "2023年", "value": 165, "group": "北京" },\n    { "time": "2019年", "value": 100, "group": "广州" },\n    { "time": "2020年", "value": 110, "group": "广州" },\n    { "time": "2021年", "value": 105, "group": "广州" },\n    { "time": "2022年", "value": 115, "group": "广州" },\n    { "time": "2023年", "value": 120, "group": "广州" },\n    { "time": "2019年", "value": 90, "group": "上海" },\n    { "time": "2020年", "value": 85, "group": "上海" },\n    { "time": "2021年", "value": 80, "group": "上海" },\n    { "time": "2022年", "value": 75, "group": "上海" },\n    { "time": "2023年", "value": 70, "group": "上海" }\n  ],\n  "stack": true,\n  "title": "城市空气污染指数变化",\n  "axisXTitle": "年份",\n  "axisYTitle": "空气污染指数"\n}',
      },
      {
        title:
          '用面积图可视化我的数据 [{ "year": 2015,"value": 7200.0 },{ "year": 2016, "value": 3660.0 },{ "year": 2017 ,"val...',
        description:
          '用面积图可视化我的数据 [{ "year": 2015,"value": 7200.0 },{ "year": 2016, "value": 3660.0 },{ "year": 2017 ,"value": 4100.0 }]。',
        code: '{\n  "type": "area",\n  "data": [\n    { "time": 2015, "value": 7200.0 },\n    { "time": 2016, "value": 3660.0 },\n    { "time": 2017, "value": 4100.0 }\n  ],\n  "axisXTitle": "year",\n  "axisYTitle": "value"\n}',
      },
      {
        title:
          '用堆叠面积图可视化我的数据 [{"year": "2018" , "value": 825.6, "country": "Asia" }, {"year": "2018" , "value": 60....',
        description:
          '用堆叠面积图可视化我的数据 [{"year": "2018" , "value": 825.6, "country": "Asia" }, {"year": "2018" , "value": 60.2, "country": "Europe" }, {"year": "2019" , "value": 450, "country": "Asia" }, {"year": "2019" , "value": 95, "country": "Europe" }, {"year": "2020" , "value": 506, "country": "Asia" }, {"year": "2020" , "value": 76.7, "country": "Europe" }, {"year": "2021" , "value": 976.6, "country": "Asia" }, {"year": "2021" , "value": 97.2, "country": "Europe" }]。',
        code: '{\n  "type": "area",\n  "data": [\n    { "time": 2018, "value": 825.6, "group": "Asia" },\n    { "time": 2018, "value": 60.2, "group": "Europe" },\n    { "time": 2019, "value": 450, "group": "Asia" },\n    { "time": 2019, "value": 95, "group": "Europe" },\n    { "time": 2020, "value": 506, "group": "Asia" },\n    { "time": 2020, "value": 76.7, "group": "Europe" },\n    { "time": 2021, "value": 976.6, "group": "Asia" },\n    { "time": 2021, "value": 97.2, "group": "Europe" }\n  ],\n  "stack": true,\n  "axisXTitle": "year",\n  "axisYTitle": "value"\n}',
      },
    ],
  },
  {
    id: 'pie-chart',
    name: 'Pie Chart',
    icon: '🥧',
    description:
      '饼图，是一个划分为几个扇形的圆形统计图表。在饼图中，每个扇形的弧长（以及圆心角和面积）大小，表示该种类占总体的比例，且这些扇形合在一起刚好是一个完全的圆形。\n\n饼图最显著的功能在于表现“占比”。习惯上，人们也用饼图来比较扇形的大小，从而获得对数据的认知。但是，由于人类对“角度”的感知力并不如“长度”，在需要准确的表达数值（尤其是当数值接近、或数值很多）时，饼图常常不能胜任，建议用柱状图代替。\n\n从...',
    knowledge: {
      introduction:
        '饼图，是一个划分为几个扇形的圆形统计图表。在饼图中，每个扇形的弧长（以及圆心角和面积）大小，表示该种类占总体的比例，且这些扇形合在一起刚好是一个完全的圆形。\n\n饼图最显著的功能在于表现“占比”。习惯上，人们也用饼图来比较扇形的大小，从而获得对数据的认知。但是，由于人类对“角度”的感知力并不如“长度”，在需要准确的表达数值（尤其是当数值接近、或数值很多）时，饼图常常不能胜任，建议用柱状图代替。\n\n从数据来看，饼图一般需要一个分类数据字段、一个连续数据字段。值得注意的是，分类字段的数据，在图表使用的语境下，应当构成一个整体（例如一班、二班、三班，构成了整个高一年级），而不能是独立、无关的。',
      useCases: [
        '用于显示组成部分的比例，如市场份额、预算分配等。想要突出表示某个部分在整体中所占比例。',
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
          property: 'category',
          type: 'required',
          description: '数据分类的名称，必填，文本类型；',
        },
        {
          property: 'value',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
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
        code: '{\n  "type": "pie",\n  "data": [\n    { "category": "火锅", "value": 22 },\n    { "category": "自助餐", "value": 12 },\n    { "category": "小吃快餐", "value": 8 },\n    { "category": "西餐", "value": 6 },\n    { "category": "其它", "value": 44 }\n  ],\n  "title": "餐饮业营收额占比"\n}',
      },
      {
        title:
          '全国人口中居住在城镇的人口占比为 63.89%，居住在乡村的人口占比为 36.11%。用环图可视化。',
        description:
          '全国人口中居住在城镇的人口占比为 63.89%，居住在乡村的人口占比为 36.11%。用环图可视化。',
        code: '{\n  "type": "pie",\n  "data": [\n    { "category": "城镇人口", "value": 63.89 },\n    { "category": "乡村人口", "value": 36.11 }\n  ],\n  "innerRadius": 0.6,\n  "title": "全国人口居住对比"\n}',
      },
      {
        title:
          '用饼图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "nam...',
        description:
          '用饼图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "name": "第三产业" ,"industrial": 41000.0 }]。',
        code: '{\n  "type": "pie",\n  "data": [\n    { "category": "第一产业", "value": 7200.0 },\n    { "category": "第二产业", "value": 36600.0 },\n    { "category": "第三产业", "value": 41000.0 }\n  ]\n}',
      },
    ],
  },
  {
    id: 'scatter-chart',
    name: 'Scatter Plot',
    icon: '⚡',
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
          property: 'x',
          type: 'required',
          description: 'X 轴上的数值变量，必填，数值类型。',
        },
        {
          property: 'y',
          type: 'required',
          description: 'Y 轴上的数值变量，必填，数值类型。',
        },
        {
          property: 'group',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
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
        code: '{\n  "type": "scatter",\n  "data": [\n    { "x": 10, "y": 15 },\n    { "x": 20, "y": 25 },\n    { "x": 30, "y": 35 },\n    { "x": 40, "y": 45 }\n  ]\n}',
      },
      {
        title:
          '用散点图可视化我的数据 [{ "age": 25, "income": 5000, "size": 55 }, { "age": 35, "income": 7000, "size": 65 }, {...',
        description:
          '用散点图可视化我的数据 [{ "age": 25, "income": 5000, "size": 55 }, { "age": 35, "income": 7000, "size": 65 }, { "age": 45, "income": 10000, "size": 64 }]。',
        code: '{\n  "type": "scatter",\n  "data": [\n    { "x": 25, "y": 5000 },\n    { "x": 35, "y": 7000 },\n    { "x": 45, "y": 10000 }\n  ]\n}',
      },
    ],
  },
  {
    id: 'radar-chart',
    name: 'Radar Chart',
    icon: '🎯',
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
          property: 'name',
          type: 'required',
          description: '数据分类名称，必填，文本类型；',
        },
        {
          property: 'value',
          type: 'required',
          description: '分类的数值大小，必填，数值类型；',
        },
        {
          property: 'group',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
          type: 'optional',
          description: '颜色映射，选填 ，数组类型，值为合法的颜色值数组。',
        },
        {
          property: 'lineWidth',
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
        code: '{\n  "type": "radar",\n  "data": [\n    { "name": "沟通能力", "value": 2 },\n    { "name": "协作能力", "value": 3 },\n    { "name": "领导能力", "value": 2 },\n    { "name": "学习能力", "value": 5 },\n    { "name": "创新能力", "value": 6 },\n    { "name": "技术能力", "value": 9 }\n  ]\n}',
      },
      {
        title:
          '某中学进行了第一次模拟考，三年级中 3 个班级的平均成绩为，一班语文 95，数学 96，外语 85，物理 63，化学 91；二班语文 75，数学 93，外语 66，物理 85，化学 88；三班语文 8...',
        description:
          '某中学进行了第一次模拟考，三年级中 3 个班级的平均成绩为，一班语文 95，数学 96，外语 85，物理 63，化学 91；二班语文 75，数学 93，外语 66，物理 85，化学 88；三班语文 86，数学 76，外语 96，物理 93，化学 67。要对这三个班级的整体成绩做出评估，为接下来的教学计划做出指导，用雷达图可视化：',
        code: '{\n  "type": "radar",\n  "data": [\n    {\n      "name": "语文",\n      "value": 95,\n      "group": "一班"\n    },\n    {\n      "name": "数学",\n      "value": 96,\n      "group": "一班"\n    },\n    {\n      "name": "外语",\n      "value": 85,\n      "group": "一班"\n    },\n    {\n      "name": "物理",\n      "value": 63,\n      "group": "一班"\n    },\n    {\n      "name": "化学",\n      "value": 91,\n      "group": "一班"\n    },\n    {\n      "name": "语文",\n      "value": 75,\n      "group": "二班"\n    },\n    {\n      "name": "数学",\n      "value": 93,\n      "group": "二班"\n    },\n    {\n      "name": "外语",\n      "value": 66,\n      "group": "二班"\n    },\n    {\n      "name": "物理",\n      "value": 85,\n      "group": "二班"\n    },\n    {\n      "name": "化学",\n      "value": 88,\n      "group": "二班"\n    },\n    {\n      "name": "语文",\n      "value": 86,\n      "group": "三班"\n    },\n    {\n      "name": "数学",\n      "value": 76,\n      "group": "三班"\n    },\n    {\n      "name": "外语",\n      "value": 96,\n      "group": "三班"\n    },\n    {\n      "name": "物理",\n      "value": 93,\n      "group": "三班"\n    },\n    {\n      "name": "化学",\n      "value": 67,\n      "group": "三班"\n    }\n  ]\n}',
      },
      {
        title:
          '用雷达图可视化我的数据 `[ { "nutrient": "Vitamin C", "score": 7 }, { "nutrient": "Fiber", "score": 6 }, { "nutr...',
        description:
          '用雷达图可视化我的数据 `[ { "nutrient": "Vitamin C", "score": 7 }, { "nutrient": "Fiber", "score": 6 }, { "nutrient": "Sugar", "score": 5 }, { "nutrient": "Protein", "score": 4 }, { "nutrient": "Iron", "score": 3 }, { "nutrient": "Calcium", "score": 2 } ]`',
        code: '{\n  "type": "radar",\n  "data": [\n    { "name": "Vitamin C", "value": 7 },\n    { "name": "Fiber", "value": 6 },\n    { "name": "Sugar", "value": 5 },\n    { "name": "Protein", "value": 4 },\n    { "name": "Iron", "value": 3 },\n    { "name": "Calcium", "value": 2 }\n  ]\n}',
      },
      {
        title:
          '用雷达图可视化我的数据 `[ { "fruit": "Apple", "nutrient": "Vitamin C", "score": 5 }, { "fruit": "Apple", "nutri...',
        description:
          '用雷达图可视化我的数据 `[ { "fruit": "Apple", "nutrient": "Vitamin C", "score": 5 }, { "fruit": "Apple", "nutrient": "Fiber", "score": 7 }, { "fruit": "Apple", "nutrient": "Sugar", "score": 6 }, { "fruit": "Apple", "nutrient": "Protein", "score": 2 }, { "fruit": "Apple", "nutrient": "Iron", "score": 3 }, { "fruit": "Apple", "nutrient": "Calcium", "score": 2 }, { "fruit": "Banana", "nutrient": "Vitamin C", "score": 4 }, { "fruit": "Banana", "nutrient": "Fiber", "score": 5 }, { "fruit": "Banana", "nutrient": "Sugar", "score": 7 }, { "fruit": "Banana", "nutrient": "Protein", "score": 3 }, { "fruit": "Banana", "nutrient": "Iron", "score": 2 }, { "fruit": "Banana", "nutrient": "Calcium", "score": 3 } ]`',
        code: '{\n  "type": "radar",\n  "data": [\n    { "group": "Apple", "name": "Vitamin C", "value": 5 },\n    { "group": "Apple", "name": "Fiber", "value": 7 },\n    { "group": "Apple", "name": "Sugar", "value": 6 },\n    { "group": "Apple", "name": "Protein", "value": 2 },\n    { "group": "Apple", "name": "Iron", "value": 3 },\n    { "group": "Apple", "name": "Calcium", "value": 2 },\n    { "group": "Banana", "name": "Vitamin C", "value": 4 },\n    { "group": "Banana", "name": "Fiber", "value": 5 },\n    { "group": "Banana", "name": "Sugar", "value": 7 },\n    { "group": "Banana", "name": "Protein", "value": 3 },\n    { "group": "Banana", "name": "Iron", "value": 2 },\n    { "group": "Banana", "name": "Calcium", "value": 3 }\n  ]\n}',
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
        '柱状图最适合对分类的数据进行比较。尤其是当数值比较接近时，由于人眼对于高度的感知优于其他视觉元素（如面积、角度等），因此，使用柱状图更加合适。',
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
          property: 'category',
          type: 'required',
          description: '数据分类名称，必填，文本类型；',
        },
        {
          property: 'value',
          type: 'required',
          description: '数据分类值，必填，数值类型；',
        },
        {
          property: 'group',
          type: 'optional',
          description: '数据分组名称，选填，文本类型；',
        },
        {
          property: 'enableGrouping',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
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
        code: '{\n  "type": "column",\n  "data": [\n    { "category": "2015 年", "value": 80 },\n    { "category": "2016 年", "value": 140 },\n    { "category": "2017 年", "value": 220 }\n  ],\n  "title": "海底捞公司外卖收入",\n  "axisXTitle": "年份",\n  "axisYTitle": "金额 （百万元）"\n}',
      },
      {
        title:
          '用柱形图可视化我的数据 [{ "title": "第一产业","industrial": 7200.0 },{ "title": "第二产业", "industrial": 36600.0 },{ "...',
        description:
          '用柱形图可视化我的数据 [{ "title": "第一产业","industrial": 7200.0 },{ "title": "第二产业", "industrial": 36600.0 },{ "title": "第三产业" ,"industrial": 41000.0 }]。',
        code: '{\n  "type": "column",\n  "data": [\n    { "category": "第一产业", "value": 7200.0 },\n    { "category": "第二产业", "value": 36600.0 },\n    { "category": "第三产业", "value": 41000.0 }\n  ],\n  "axisXTitle": "title",\n  "axisYTitle": "industrial"\n}',
      },
      {
        title:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 ...',
        description:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用分组柱形图可视化。',
        code: '{\n  "type": "column",\n  "data": [\n    { "category": "北京", "value": 825.6, "group": "油车" },\n    { "category": "北京", "value": 60.2, "group": "新能源汽车" },\n    { "category": "上海", "value": 450, "group": "油车" },\n    { "category": "上海", "value": 95, "group": "新能源汽车" },\n    { "category": "深圳", "value": 506, "group": "油车" },\n    { "category": "深圳", "value": 76.7, "group": "新能源汽车" },\n    { "category": "广州", "value": 976.6, "group": "油车" },\n    { "category": "广州", "value": 97.2, "group": "新能源汽车" },\n    { "category": "杭州", "value": 651.2, "group": "油车" },\n    { "category": "杭州", "value": 62, "group": "新能源汽车" }\n  ],\n  "group": true,\n  "title": "油车与新能源汽车售卖量",\n  "axisXTitle": "城市",\n  "axisYTitle": "售卖量 （万辆）"\n}',
      },
      {
        title:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 ...',
        description:
          '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用堆叠柱形图可视化。',
        code: '{\n  "type": "column",\n  "data": [\n    { "category": "北京", "value": 825.6, "group": "油车" },\n    { "category": "北京", "value": 60.2, "group": "新能源汽车" },\n    { "category": "上海", "value": 450, "group": "油车" },\n    { "category": "上海", "value": 95, "group": "新能源汽车" },\n    { "category": "深圳", "value": 506, "group": "油车" },\n    { "category": "深圳", "value": 76.7, "group": "新能源汽车" },\n    { "category": "广州", "value": 976.6, "group": "油车" },\n    { "category": "广州", "value": 97.2, "group": "新能源汽车" },\n    { "category": "杭州", "value": 651.2, "group": "油车" },\n    { "category": "杭州", "value": 62, "group": "新能源汽车" }\n  ],\n  "stack": true,\n  "title": "油车与新能源汽的售卖量",\n  "axisXTitle": "城市",\n  "axisYTitle": "售卖量 （万辆）"\n}',
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
        '用于展示销售流程、用户转化、活动参与等多阶段数据流失或转化情况。适合突出各阶段的数量分布和转化效率。',
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
          property: 'category',
          type: 'required',
          description: '数据名称，必填，文本类型。',
        },
        {
          property: 'value',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，合法颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title: '展示销售漏斗各阶段数据。',
        description: '展示销售漏斗各阶段数据。',
        code: '{\n  "type": "funnel",\n  "data": [\n    { "category": "访问", "value": 1000 },\n    { "category": "咨询", "value": 600 },\n    { "category": "下单", "value": 300 },\n    { "category": "成交", "value": 120 }\n  ],\n  "title": "销售漏斗"\n}',
      },
      {
        title: '展示用户转化流程，主题为 dark。',
        description: '展示用户转化流程，主题为 dark。',
        code: '{\n  "type": "funnel",\n  "data": [\n    { "category": "注册", "value": 800 },\n    { "category": "激活", "value": 500 },\n    { "category": "付费", "value": 200 }\n  ],\n  "title": "用户转化流程",\n  "theme": "dark"\n}',
      },
      {
        title: '展示活动参与漏斗，自定义颜色。',
        description: '展示活动参与漏斗，自定义颜色。',
        code: '{\n  "type": "funnel",\n  "data": [\n    { "category": "报名", "value": 1500 },\n    { "category": "签到", "value": 900 },\n    { "category": "参与", "value": 700 }\n  ],\n  "title": "活动参与漏斗",\n  "style": {\n    "palette": ["#FF7F50", "#87CEFA", "#32CD32"],\n    "backgroundColor": "#FFF8DC"\n  }\n}',
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
          property: 'category',
          type: 'required',
          description: '步骤名称或类别名称，必填，字符串类型',
        },
        {
          property: 'value',
          type: 'optional',
          description: '该步骤的增量或减量，选填，数值类型（正数表示增加，负数表示减少）',
        },
        {
          property: 'isIntermediateTotal',
          type: 'optional',
          description: '是否为中间总计栏，选填，布尔类型，默认为 false',
        },
        {
          property: 'isTotal',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
          type: 'optional',
          description: '颜色映射，选填，对象类型。',
        },
        {
          property: 'positiveColor',
          type: 'optional',
          description: '正向颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'negativeColor',
          type: 'optional',
          description: '负向颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'totalColor',
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
        code: '{\n  "type": "waterfall",\n  "data": [\n    { "category": "期初利润", "value": 100 },\n    { "category": "销售收入", "value": 80 },\n    { "category": "运营成本", "value": -50 },\n    { "category": "税费", "value": -20 },\n    { "category": "总计", "isTotal": true }\n  ]\n}',
      },
      {
        title:
          '展示预算执行情况：基础预算 500，市场投入增加 120，采购优化节省 -60，运营效率提升 -30，得到调整后预算。',
        description:
          '展示预算执行情况：基础预算 500，市场投入增加 120，采购优化节省 -60，运营效率提升 -30，得到调整后预算。',
        code: '{\n  "type": "waterfall",\n  "data": [\n    { "name": "基础预算", "value": 500 },\n    { "name": "市场投入", "value": 120 },\n    { "category": "总投入", "isIntermediateTotal": true },\n    { "name": "采购优化", "value": -60 },\n    { "name": "运营效率", "value": -30 },\n    { "category": "总利润", "isTotal": true }\n  ]\n}',
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
        '用于展示一组或多组数据的分布情况，如成绩分布、实验结果、金融数据等。适合突出数据的中位数、分布范围及异常值。',
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
          property: 'category',
          type: 'required',
          description: '数据分类名称，必填，文本类型。',
        },
        {
          property: 'value',
          type: 'required',
          description: '数据分类值，必填，数值类型。',
        },
        {
          property: 'group',
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
          property: 'boxColor',
          type: 'optional',
          description: '盒体颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'whiskerColor',
          type: 'optional',
          description: '须线颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'outlierColor',
          type: 'optional',
          description: '异常值颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
      ],
    },
    examples: [
      {
        title: '展示一组成绩分布。',
        description: '展示一组成绩分布。',
        code: '{\n  "type": "boxplot",\n  "data": [\n    { "category": "班级A", "value": 15 },\n    { "category": "班级A", "value": 18 },\n    { "category": "班级A", "value": 22 },\n    { "category": "班级A", "value": 27 },\n    { "category": "班级A", "value": 35 },\n    { "category": "班级B", "value": 10 },\n    { "category": "班级B", "value": 14 },\n    { "category": "班级B", "value": 19 },\n    { "category": "班级B", "value": 23 },\n    { "category": "班级B", "value": 30 }\n  ],\n  "title": "成绩分布"\n}',
      },
      {
        title: '展示三组实验数据分布，主题为 dark。',
        description: '展示三组实验数据分布，主题为 dark。',
        code: '{\n  "type": "boxplot",\n  "data": [\n    { "category": "实验组1", "value": 12 },\n    { "category": "实验组1", "value": 15 },\n    { "category": "实验组1", "value": 20 },\n    { "category": "实验组1", "value": 25 },\n    { "category": "实验组1", "value": 30 },\n    { "category": "实验组2", "value": 18 },\n    { "category": "实验组2", "value": 22 },\n    { "category": "实验组2", "value": 28 },\n    { "category": "实验组2", "value": 35 },\n    { "category": "实验组2", "value": 40 },\n    { "category": "实验组3", "value": 14 },\n    { "category": "实验组3", "value": 19 },\n    { "category": "实验组3", "value": 24 },\n    { "category": "实验组3", "value": 29 },\n    { "category": "实验组3", "value": 34 }\n  ],\n  "title": "实验数据分布",\n  "theme": "dark"\n}',
      },
      {
        title: '展示金融数据分布，自定义盒体和须线颜色。',
        description: '展示金融数据分布，自定义盒体和须线颜色。',
        code: '{\n  "type": "boxplot",\n  "data": [\n    { "category": "股票A", "value": 50 },\n    { "category": "股票A", "value": 55 },\n    { "category": "股票A", "value": 60 },\n    { "category": "股票A", "value": 65 },\n    { "category": "股票A", "value": 70 },\n    { "category": "股票B", "value": 45 },\n    { "category": "股票B", "value": 50 },\n    { "category": "股票B", "value": 55 },\n    { "category": "股票B", "value": 60 },\n    { "category": "股票B", "value": 65 }\n  ],\n  "title": "金融数据分布",\n  "style": {\n    "boxColor": "#FF9800",\n    "whiskerColor": "#2196F3",\n    "backgroundColor": "#F5F5F5"\n  }\n}',
      },
      {
        title: '多组数据对比，帕尔默企鹅三种群体身高性别差异。',
        description: '多组数据对比，帕尔默企鹅三种群体身高性别差异。',
        code: '{\n  "type": "boxplot",\n  "data": [\n    { "category": "Adelie", "group": "MALE", "value": 181 },\n    { "category": "Adelie", "group": "FEMALE", "value": 186 },\n    { "category": "Adelie", "group": "MALE", "value": 190 },\n    { "category": "Adelie", "group": "FEMALE", "value": 181 },\n    { "category": "Adelie", "group": "MALE", "value": 191 },\n    { "category": "Adelie", "group": "MALE", "value": 198 },\n    { "category": "Adelie", "group": "FEMALE", "value": 185 },\n    { "category": "Adelie", "group": "MALE", "value": 194 },\n    { "category": "Adelie", "group": "FEMALE", "value": 174 },\n    { "category": "Adelie", "group": "MALE", "value": 180 },\n    { "category": "Adelie", "group": "FEMALE", "value": 189 },\n    { "category": "Adelie", "group": "MALE", "value": 185 },\n    { "category": "Adelie", "group": "FEMALE", "value": 187 },\n    { "category": "Adelie", "group": "MALE", "value": 183 },\n    { "category": "Adelie", "group": "FEMALE", "value": 172 },\n    { "category": "Adelie", "group": "MALE", "value": 178 },\n    { "category": "Adelie", "group": "FEMALE", "value": 188 },\n    { "category": "Adelie", "group": "MALE", "value": 184 },\n    { "category": "Adelie", "group": "FEMALE", "value": 195 },\n    { "category": "Adelie", "group": "MALE", "value": 196 },\n    { "category": "Adelie", "group": "FEMALE", "value": 180 },\n    { "category": "Adelie", "group": "FEMALE", "value": 181 },\n    { "category": "Adelie", "group": "MALE", "value": 184 },\n    { "category": "Adelie", "group": "FEMALE", "value": 182 },\n    { "category": "Adelie", "group": "MALE", "value": 195 },\n    { "category": "Adelie", "group": "FEMALE", "value": 186 },\n    { "category": "Adelie", "group": "MALE", "value": 196 },\n    { "category": "Adelie", "group": "FEMALE", "value": 185 },\n    { "category": "Adelie", "group": "MALE", "value": 190 },\n    { "category": "Adelie", "group": "MALE", "value": 182 },\n    { "category": "Adelie", "group": "FEMALE", "value": 190 }\n  ],\n  "title": "帕尔默企鹅三种群体身高性别差异"\n}',
      },
    ],
  },
  {
    id: 'violin-chart',
    name: 'Violin Plot',
    icon: '🎻',
    description:
      '小提琴图是一种用于展示数据分布和概率密度的统计图表。通过对称的密度曲线展示数据的分布形态，同时可结合箱线图元素显示中位数和四分位数。适合直观比较不同组数据的分布和密度特征。',
    knowledge: {
      introduction:
        '小提琴图是一种用于展示数据分布和概率密度的统计图表。通过对称的密度曲线展示数据的分布形态，同时可结合箱线图元素显示中位数和四分位数。适合直观比较不同组数据的分布和密度特征。',
      useCases: [
        '用于展示一组或多组数据的分布和密度情况，如成绩分布、实验结果、金融数据等。适合突出数据的分布形态、集中趋势及异常值。',
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
          property: 'category',
          type: 'required',
          description: '数据分类名称，必填，文本类型。',
        },
        {
          property: 'value',
          type: 'required',
          description: '数据分类值，必填，数值类型。',
        },
        {
          property: 'group',
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
          property: 'palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，合法颜色值数组。',
        },
        {
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
      ],
    },
    examples: [
      {
        title: '展示一组成绩分布。',
        description: '展示一组成绩分布。',
        code: '{\n  "type": "violin",\n  "data": [\n    { "category": "班级A", "value": 15 },\n    { "category": "班级A", "value": 18 },\n    { "category": "班级A", "value": 22 },\n    { "category": "班级A", "value": 27 },\n    { "category": "班级A", "value": 35 },\n    { "category": "班级B", "value": 10 },\n    { "category": "班级B", "value": 14 },\n    { "category": "班级B", "value": 19 },\n    { "category": "班级B", "value": 23 },\n    { "category": "班级B", "value": 30 }\n  ],\n  "title": "成绩分布"\n}',
      },
      {
        title: '展示三组实验数据分布，主题为 dark。',
        description: '展示三组实验数据分布，主题为 dark。',
        code: '{\n  "type": "violin",\n  "data": [\n    { "category": "实验组1", "value": 12 },\n    { "category": "实验组1", "value": 15 },\n    { "category": "实验组1", "value": 20 },\n    { "category": "实验组1", "value": 25 },\n    { "category": "实验组1", "value": 30 },\n    { "category": "实验组2", "value": 18 },\n    { "category": "实验组2", "value": 22 },\n    { "category": "实验组2", "value": 28 },\n    { "category": "实验组2", "value": 35 },\n    { "category": "实验组2", "value": 40 },\n    { "category": "实验组3", "value": 14 },\n    { "category": "实验组3", "value": 19 },\n    { "category": "实验组3", "value": 24 },\n    { "category": "实验组3", "value": 29 },\n    { "category": "实验组3", "value": 34 }\n  ],\n  "title": "实验数据分布",\n  "theme": "dark"\n}',
      },
      {
        title: '展示金融数据分布，使用自定义调色板和背景色。',
        description: '展示金融数据分布，使用自定义调色板和背景色。',
        code: '{\n  "type": "violin",\n  "data": [\n    { "category": "股票A", "value": 50 },\n    { "category": "股票A", "value": 55 },\n    { "category": "股票A", "value": 60 },\n    { "category": "股票A", "value": 65 },\n    { "category": "股票A", "value": 70 },\n    { "category": "股票B", "value": 45 },\n    { "category": "股票B", "value": 50 },\n    { "category": "股票B", "value": 55 },\n    { "category": "股票B", "value": 60 },\n    { "category": "股票B", "value": 65 }\n  ],\n  "title": "金融数据分布",\n  "style": {\n    "palette": ["#FF9800", "#2196F3", "#F5F5F5"],\n    "backgroundColor": "#333333"\n  }\n}',
      },
      {
        title: '多组数据对比，展示不同品种的鸢尾花特征分布。',
        description: '多组数据对比，展示不同品种的鸢尾花特征分布。',
        code: '{\n  "type": "violin",\n  "data": [\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.2 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.4 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 3.5 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 5.1 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.2 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.5 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 3.1 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 4.6 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.4 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.7 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 3.9 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 5.4 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.2 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.5 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 3.5 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 5.2 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.2 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.2 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 3.2 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 5 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.1 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.5 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 4.1 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 5.2 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.2 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.4 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 4.2 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 5.5 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.2 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.5 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 3.1 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 4.9 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.2 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.2 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 3.2 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 5 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.2 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.3 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 3.5 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 5.5 },\n    { "group": "I. setosa", "category": "PetalWidth", "value": 0.1 },\n    { "group": "I. setosa", "category": "PetalLength", "value": 1.4 },\n    { "group": "I. setosa", "category": "SepalWidth", "value": 3.6 },\n    { "group": "I. setosa", "category": "SepalLength", "value": 4.9 },\n    { "group": "I. versicolor", "category": "PetalWidth", "value": 1.4 },\n    { "group": "I. versicolor", "category": "PetalLength", "value": 4.7 },\n    { "group": "I. versicolor", "category": "SepalWidth", "value": 3.2 },\n    { "group": "I. versicolor", "category": "SepalLength", "value": 7 },\n    { "group": "I. versicolor", "category": "PetalWidth", "value": 1.5 },\n    { "group": "I. versicolor", "category": "PetalLength", "value": 4.5 },\n    { "group": "I. versicolor", "category": "SepalWidth", "value": 3.2 },\n    { "group": "I. versicolor", "category": "SepalLength", "value": 6.4 },\n    { "group": "I. versicolor", "category": "PetalWidth", "value": 1.5 },\n    { "group": "I. versicolor", "category": "PetalLength", "value": 4.9 },\n    { "group": "I. versicolor", "category": "SepalWidth", "value": 3.1 },\n    { "group": "I. versicolor", "category": "SepalLength", "value": 6.9 },\n    { "group": "I. versicolor", "category": "PetalWidth", "value": 1.3 },\n    { "group": "I. versicolor", "category": "PetalLength", "value": 4 },\n    { "group": "I. versicolor", "category": "SepalWidth", "value": 2.3 },\n    { "group": "I. versicolor", "category": "SepalLength", "value": 5.5 },\n    { "group": "I. versicolor", "category": "PetalWidth", "value": 1.5 },\n    { "group": "I. versicolor", "category": "PetalLength", "value": 4.6 },\n    { "group": "I. versicolor", "category": "SepalWidth", "value": 2.8 },\n    { "group": "I. versicolor", "category": "SepalLength", "value": 6.5 }\n  ],\n  "title": "不同品种的鸢尾花特征分布"\n}',
      },
    ],
  },
  {
    id: 'histogram',
    name: 'Histogram',
    icon: '📏',
    description:
      '直方图是一种显示数据分布的图表，它通过柱形条表示某个范围内数据点的频率。每个柱形条的高度（或长度）表示数据点在特定区间内出现的次数，X 轴表示数据的取值范围，Y 轴表示频率或数量。直方图主要用于表示连续型变量的数据分布，并帮助分析数据的集中趋势、离散程度和形态。\n\n直方图与柱状图的区别，直方图反映数据分布情况，柱状图只能对数值进行比较。从数据结构来说，柱状图需要一个分类变量，是离散的（如一班、二班...',
    knowledge: {
      introduction:
        '直方图是一种显示数据分布的图表，它通过柱形条表示某个范围内数据点的频率。每个柱形条的高度（或长度）表示数据点在特定区间内出现的次数，X 轴表示数据的取值范围，Y 轴表示频率或数量。直方图主要用于表示连续型变量的数据分布，并帮助分析数据的集中趋势、离散程度和形态。\n\n直方图与柱状图的区别，直方图反映数据分布情况，柱状图只能对数值进行比较。从数据结构来说，柱状图需要一个分类变量，是离散的（如一班、二班、三班），因此柱子间有空隙。但直方图的数据均为连续的数值变量（如成绩），因此柱子间是没有空隙的。',
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
          property: 'axisYTitle',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
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
        code: '{\n  "type": "histogram",\n  "data": [78, 88, 60, 100, 95],\n  "binNumber": 5,\n  "title": "成绩分布"\n}',
      },
      {
        title:
          '用直方图可视化我的数据：[{ "value": 20 }, { "value": 25 }, { "value": 30 }, { "value": 35 }]',
        description:
          '用直方图可视化我的数据：[{ "value": 20 }, { "value": 25 }, { "value": 30 }, { "value": 35 }]',
        code: '{\n  "type": "histogram",\n  "data": [20, 25, 30, 35]\n}',
      },
      {
        title:
          '用直方图展示花瓣大小的分布情况，并显示 x 轴标题为“花瓣大小分布”，y 轴标题为“花瓣分布数量”数据如下：[',
        description:
          '用直方图展示花瓣大小的分布情况，并显示 x 轴标题为“花瓣大小分布”，y 轴标题为“花瓣分布数量”数据如下：[',
        code: '{\n  "type": "histogram",\n  "data": [\n    1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1, 6.5, 6.8, 7.1, 7.3, 7.7, 8.3, 8.6, 8.8, 9.1, 9.2, 9.4, 9.5,\n    9.7, 10.5, 10.7, 10.8, 11, 11, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12, 12.9, 12.9, 13.3, 13.7,\n    13.8, 13.9, 14, 14.2, 14.5, 15, 15.2, 15.6, 16, 16.3, 17.3, 17.5, 17.9, 18, 18, 20.6, 21, 23.4\n  ],\n  "axisXTitle": "花瓣大小分布",\n  "axisYTitle": "花瓣分布数量"\n}',
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
        '适合展示各类流量分布和流向关系，如能源流动、资金流转、用户行为路径、供应链流动等。突出流量的分布结构和流向路径。',
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
          property: 'source',
          type: 'required',
          description: '源节点名称，必填，文本类型。',
        },
        {
          property: 'target',
          type: 'required',
          description: '目标节点名称，必填，文本类型。',
        },
        {
          property: 'value',
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
          property: 'palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，合法颜色值数组。',
        },
        {
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
      ],
    },
    examples: [
      {
        title: '展示能源流动关系。',
        description: '展示能源流动关系。',
        code: '{\n  "type": "sankey",\n  "data": [\n    { "source": "煤炭", "target": "发电厂", "value": 120 },\n    { "source": "天然气", "target": "发电厂", "value": 80 },\n    { "source": "发电厂", "target": "工业", "value": 100 },\n    { "source": "发电厂", "target": "居民", "value": 60 },\n    { "source": "发电厂", "target": "商业", "value": 40 }\n  ],\n  "nodeAlign": "justify",\n  "title": "能源流动关系"\n}',
      },
      {
        title: '展示资金流转路径, 主题为 dark。',
        description: '展示资金流转路径, 主题为 dark。',
        code: '{\n  "type": "sankey",\n  "data": [\n    { "source": "投资人", "target": "创业公司", "value": 200 },\n    { "source": "创业公司", "target": "市场营销", "value": 80 },\n    { "source": "创业公司", "target": "研发", "value": 120 },\n    { "source": "市场营销", "target": "客户", "value": 70 },\n    { "source": "研发", "target": "客户", "value": 50 }\n  ],\n  "nodeAlign": "center",\n  "title": "资金流转路径",\n  "theme": "dark"\n}',
      },
      {
        title: '展示用户行为路径, 自定义配色。',
        description: '展示用户行为路径, 自定义配色。',
        code: '{\n  "type": "sankey",\n  "data": [\n    { "source": "首页", "target": "产品页", "value": 300 },\n    { "source": "产品页", "target": "购物车", "value": 150 },\n    { "source": "购物车", "target": "结算页", "value": 100 },\n    { "source": "结算页", "target": "支付成功", "value": 80 },\n    { "source": "结算页", "target": "支付失败", "value": 20 }\n  ],\n  "nodeAlign": "left",\n  "title": "用户行为路径",\n  "style": {\n    "palette": ["#5B8FF9", "#61DDAA", "#65789B", "#F6BD16", "#7262FD"],\n    "backgroundColor": "#f0f2f5"\n  }\n}',
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
          property: 'name',
          type: 'required',
          description: '分类名称，必填，文本类型；',
        },
        {
          property: 'value',
          type: 'required',
          description: '分类的数值大小，必填，数值类型；',
        },
        {
          property: 'children',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，值为合法的颜色值。',
        },
        {
          property: 'palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title:
          '用矩阵树图展示一个公司的部门及其员工人数，如公司有两个部门，A 部门 100 人，B 部门 80 人，A 部门分为 A1、A2、A3 三个小组，人数分别为 40、30 和 30；B 部门分为 B1、B...',
        description:
          '用矩阵树图展示一个公司的部门及其员工人数，如公司有两个部门，A 部门 100 人，B 部门 80 人，A 部门分为 A1、A2、A3 三个小组，人数分别为 40、30 和 30；B 部门分为 B1、B2 两个小组，人数分别为 50 和 30。',
        code: '{\n  "type": "treemap",\n  "data": [\n    {\n      "name": "A",\n      "value": 100,\n      "children": [\n        { "name": "A1", "value": 40 },\n        { "name": "A2", "value": 30 },\n        { "name": "A3", "value": 30 }\n      ]\n    },\n    {\n      "name": "B",\n      "value": 80,\n      "children": [\n        { "name": "B1", "value": 50 },\n        { "name": "B2", "value": 30 }\n      ]\n    }\n  ]\n}',
      },
      {
        title:
          '用矩阵树图展示产品销售情况的数据 [{ "name": "产品 A", "sales": 500, "children": [{ "name": "子产品 A1", "sales": 200 }, {...',
        description:
          '用矩阵树图展示产品销售情况的数据 [{ "name": "产品 A", "sales": 500, "children": [{ "name": "子产品 A1", "sales": 200 }, { "name": "子产品 A2", "sales": 300 }]}, { "name": "产品 B", "sales": 400 }]。',
        code: '{\n  "type": "treemap",\n  "data": [\n    {\n      "name": "产品A",\n      "value": 500,\n      "children": [\n        { "name": "子产品A1", "value": 200 },\n        { "name": "子产品A2", "value": 300 }\n      ]\n    },\n    { "name": "产品B", "value": 400 }\n  ]\n}',
      },
      {
        title:
          '采用矩阵树图展示各种水果销售量: [{ "苹果": 800, "children": [{ "红富士": 400 }, { "黄元帅": 400 }]}, { "橙子": 600 }, { "香蕉":...',
        description:
          '采用矩阵树图展示各种水果销售量: [{ "苹果": 800, "children": [{ "红富士": 400 }, { "黄元帅": 400 }]}, { "橙子": 600 }, { "香蕉": 500 }]。',
        code: '{\n  "type": "treemap",\n  "data": [\n    {\n      "name": "苹果",\n      "value": 800,\n      "children": [\n        {\n          "name": "红富士",\n          "value": 400\n        },\n        {\n          "name": "黄元帅",\n          "value": 400\n        }\n      ]\n    },\n    {\n      "name": "橙子",\n      "value": 600\n    },\n    {\n      "name": "香蕉",\n      "value": 500\n    }\n  ]\n}',
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
        '用于展示集合之间的关系，如数据分类、属性重叠、用户群体交集等。适合分析集合的交集、并集、补集等关系，常见于数学、统计、市场分析等领域。',
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
          property: 'sets',
          type: 'required',
          description:
            '集合标识，必填，字符串数组类型，表示该数据项所属的集合，可以是单个集合或多个集合的组合。',
        },
        {
          property: 'value',
          type: 'required',
          description: '集合大小，必填，数值类型，表示该集合或集合交集的大小。',
        },
        {
          property: 'label',
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
          property: 'backgroundColor',
          type: 'optional',
          description: '背景颜色，选填，文本类型，合法颜色值。',
        },
        {
          property: 'palette',
          type: 'optional',
          description: '颜色映射，选填，数组类型，合法颜色值数组。',
        },
      ],
    },
    examples: [
      {
        title: '展示两个集合的交集关系。',
        description: '展示两个集合的交集关系。',
        code: '{\n  "type": "venn",\n  "data": [\n    { "sets": ["A"], "value": 20, "label": "集合A" },\n    { "sets": ["B"], "value": 15, "label": "集合B" },\n    { "sets": ["A", "B"], "value": 5, "label": "交集AB" }\n  ],\n  "title": "集合交集示例"\n}',
      },
      {
        title: '展示三个集合的交集和并集关系，主题为 dark。',
        description: '展示三个集合的交集和并集关系，主题为 dark。',
        code: '{\n  "type": "venn",\n  "data": [\n    { "sets": ["A"], "value": 10, "label": "集合A" },\n    { "sets": ["B"], "value": 8, "label": "集合B" },\n    { "sets": ["C"], "value": 6, "label": "集合C" },\n    { "sets": ["A", "B"], "value": 4 },\n    { "sets": ["A", "C"], "value": 2 },\n    { "sets": ["B", "C"], "value": 1 },\n    { "sets": ["A", "B", "C"], "value": 1 }\n  ],\n  "title": "三集合关系",\n  "theme": "dark"\n}',
      },
      {
        title: '展示集合关系并自定义颜色和背景色。',
        description: '展示集合关系并自定义颜色和背景色。',
        code: '{\n  "type": "venn",\n  "data": [\n    { "sets": ["A"], "value": 30, "label": "购买手机" },\n    { "sets": ["B"], "value": 25, "label": "购买耳机" },\n    { "sets": ["A", "B"], "value": 10 }\n  ],\n  "title": "标签交集",\n  "style": {\n    "palette": ["#FFB6C1", "#87CEFA"],\n    "backgroundColor": "#F8F8FF"\n  }\n}',
      },
    ],
  },
  {
    id: 'network-graph',
    name: 'Network Graph',
    icon: '🕸️',
    description:
      '网络图（Network Graph）是一种展示实体（节点）之间的关系（边）的图。通过节点和边的连接，直观地表示复杂的网络结构。每个节点代表一个实体，而每条边则表示两个节点之间的关系或连接。\n\n网络图的关键就是展示“谁跟谁有联系”。比如，节点代表人，连线代表某两个人之间是否认识。',
    knowledge: {
      introduction:
        '网络图（Network Graph）是一种展示实体（节点）之间的关系（边）的图。通过节点和边的连接，直观地表示复杂的网络结构。每个节点代表一个实体，而每条边则表示两个节点之间的关系或连接。\n\n网络图的关键就是展示“谁跟谁有联系”。比如，节点代表人，连线代表某两个人之间是否认识。',
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
          property: 'nodes',
          type: 'required',
          description: '网络图中的节点数组，每个节点表示一个实体，必填，数组对象类型；',
        },
        {
          property: 'name',
          type: 'required',
          description: '节点的名称，必须唯一，用于标识节点，必填，文本类型；',
        },
        {
          property: 'edges',
          type: 'required',
          description: '网络图中的边数组，每条边表示两个节点之间的关系，必填，数组对象类型；',
        },
        {
          property: 'source',
          type: 'required',
          description: '边的起始节点名称，指向节点的 `name` 属性，必填，文本类型；',
        },
        {
          property: 'target',
          type: 'required',
          description: '边的目标节点名称，指向节点的 `name` 属性，必填，文本类型；',
        },
        {
          property: 'name',
          type: 'required',
          description: '边的名称，用于标识边，必填，文本类型；',
        },
      ],
    },
    examples: [
      {
        title:
          '在《哈利波特》系列中，有几个主要人物：哈利·波特、赫敏·格兰杰、罗恩·韦斯莱和伏地魔。哈利·波特是主角，他的两个最好的朋友是赫敏·格兰杰和罗恩·韦斯莱。伏地魔是哈利·波特的主要敌人，曾试图杀死哈利。用...',
        description:
          '在《哈利波特》系列中，有几个主要人物：哈利·波特、赫敏·格兰杰、罗恩·韦斯莱和伏地魔。哈利·波特是主角，他的两个最好的朋友是赫敏·格兰杰和罗恩·韦斯莱。伏地魔是哈利·波特的主要敌人，曾试图杀死哈利。用网络图可视化。',
        code: '{\n  "type": "network-graph",\n  "data": {\n    "nodes": [\n      { "name": "哈利·波特" },\n      { "name": "赫敏·格兰杰" },\n      { "name": "罗恩·韦斯莱" },\n      { "name": "伏地魔" }\n    ],\n    "edges": [\n      { "source": "哈利·波特", "target": "赫敏·格兰杰", "name": "朋友" },\n      { "source": "哈利·波特", "target": "罗恩·韦斯莱", "name": "朋友" },\n      { "source": "哈利·波特", "target": "伏地魔", "name": "敌人" },\n      { "source": "伏地魔", "target": "哈利·波特", "name": "试图杀死" }\n    ]\n  }\n}',
      },
      {
        title:
          '用网络图来可视化我的数据 `[["哈利·波特", "朋友", "赫敏·格兰杰"], ["哈利·波特", "朋友", "罗恩·韦斯莱"], ["哈利·波特", "敌人", "伏地魔"], ["伏地魔",...',
        description:
          '用网络图来可视化我的数据 `[["哈利·波特", "朋友", "赫敏·格兰杰"], ["哈利·波特", "朋友", "罗恩·韦斯莱"], ["哈利·波特", "敌人", "伏地魔"], ["伏地魔", "试图杀死", "哈利·波特"]]`。',
        code: '{\n  "type": "network-graph",\n  "data": {\n    "nodes": [\n      { "name": "哈利·波特" },\n      { "name": "赫敏·格兰杰" },\n      { "name": "罗恩·韦斯莱" },\n      { "name": "伏地魔" }\n    ],\n    "edges": [\n      { "source": "哈利·波特", "target": "赫敏·格兰杰", "name": "朋友" },\n      { "source": "哈利·波特", "target": "罗恩·韦斯莱", "name": "朋友" },\n      { "source": "哈利·波特", "target": "伏地魔", "name": "敌人" },\n      { "source": "伏地魔", "target": "哈利·波特", "name": "试图杀死" }\n    ]\n  }\n}',
      },
    ],
  },
  {
    id: 'mind-map',
    name: 'Mind Map',
    icon: '🧠',
    description:
      '思维导图，是一种以中心主题为核心，通过层级分支的形式组织和展示信息的图表。使用中心点两侧分布，合理利用空间，并能清晰呈现主干与分支的所属分层关系。\n\n它以节点为单位，逐层展开，以便将概念、任务或想法分类。当文本内容复杂时，思维导图可以帮助提取并结构化关键信息，明确主要主题与子主题之间的关系。',
    knowledge: {
      introduction:
        '思维导图，是一种以中心主题为核心，通过层级分支的形式组织和展示信息的图表。使用中心点两侧分布，合理利用空间，并能清晰呈现主干与分支的所属分层关系。\n\n它以节点为单位，逐层展开，以便将概念、任务或想法分类。当文本内容复杂时，思维导图可以帮助提取并结构化关键信息，明确主要主题与子主题之间的关系。',
      useCases: ['内容围绕一个核心主题展开，内容可以按照逻辑层次进行分解。'],
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
          property: 'name',
          type: 'required',
          description: '节点的名称，用于显示在思维导图的节点，必填，字符串类型；',
        },
        {
          property: 'children',
          type: 'optional',
          description:
            '当前节点的子节点集合选填，数组对象类型。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `MindMapData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构；',
        },
      ],
    },
    examples: [
      {
        title:
          '我想制定一个项目计划，分为几个阶段：研究、设计、开发和测试。在研究阶段，需要进行市场调研和技术可行性分析；设计阶段需要确定产品功能和 UI 设计；开发阶段要写代码并进行单元测试；测试阶段需要进行功能测...',
        description:
          '我想制定一个项目计划，分为几个阶段：研究、设计、开发和测试。在研究阶段，需要进行市场调研和技术可行性分析；设计阶段需要确定产品功能和 UI 设计；开发阶段要写代码并进行单元测试；测试阶段需要进行功能测试和性能测试。用思维导图可视化。',
        code: '{\n  "type": "mind-map",\n  "data": {\n    "name": "项目计划",\n    "children": [\n      {\n        "name": "研究阶段",\n        "children": [{ "name": "市场调研" }, { "name": "技术可行性分析" }]\n      },\n      {\n        "name": "设计阶段",\n        "children": [{ "name": "产品功能确定" }, { "name": "UI 设计" }]\n      },\n      {\n        "name": "开发阶段",\n        "children": [{ "name": "编写代码" }, { "name": "单元测试" }]\n      },\n      {\n        "id": "测试阶段",\n        "children": [{ "name": "功能测试" }, { "name": "性能测试" }]\n      }\n    ]\n  }\n}',
      },
      {
        title:
          '用思维导图来可视化我的数据 { "人工智能应用": ["智能家居", "自动驾驶", "医疗保健", "金融服务"], "医疗保健": ["精准医疗", "诊断辅助"] }。',
        description:
          '用思维导图来可视化我的数据 { "人工智能应用": ["智能家居", "自动驾驶", "医疗保健", "金融服务"], "医疗保健": ["精准医疗", "诊断辅助"] }。',
        code: '{\n  "type": "mind-map",\n  "data": {\n    "name": "人工智能应用",\n    "children": [\n      { "name": "智能家居" },\n      { "name": "自动驾驶" },\n      {\n        "name": "医疗保健",\n        "children": [{ "name": "精准医疗" }, { "name": "诊断辅助" }]\n      },\n      { "name": "金融服务" }\n    ]\n  }\n}',
      },
      {
        title:
          '用思维导图来可视化我的数据 [{ "id": 1, "name": "台风形成的因素", "parent": null },{ "id": 2, "name": "气象条件", "parent": 1...',
        description:
          '用思维导图来可视化我的数据 [{ "id": 1, "name": "台风形成的因素", "parent": null },{ "id": 2, "name": "气象条件", "parent": 1 },{ "id": 3, "name": "温暖的海水", "parent": 2 },{ "id": 4, "name": "气压分布", "parent": 2 },{ "id": 5, "name": "湿度水平", "parent": 2 },{ "id": 6, "name": "风的切变", "parent": 2 },{ "id": 7, "name": "地理环境", "parent": 1 },{ "id": 8, "name": "大陆架的形状与深度", "parent": 7 },{ "id": 9, "name": "海洋暖流的分布", "parent": 7 },{ "id": 10, "name": "热带地区的气候特征", "parent": 7 },{ "id": 11, "name": "岛屿的影响", "parent": 7 }]。',
        code: '{\n  "type": "mind-map",\n  "data": {\n    "name": "台风形成的因素",\n    "children": [\n      {\n        "name": "气象条件",\n        "children": [\n          { "name": "温暖的海水" },\n          { "name": "气压分布" },\n          { "name": "湿度水平" },\n          { "name": "风的切变" }\n        ]\n      },\n      {\n        "name": "地理环境",\n        "children": [\n          { "name": "大陆架的形状与深度" },\n          { "name": "海洋暖流的分布" },\n          { "name": "热带地区的气候特征" },\n          { "name": "岛屿的影响" }\n        ]\n      }\n    ]\n  }\n}',
      },
    ],
  },
  {
    id: 'flow-diagram',
    name: 'Flow Diagram',
    icon: '➡️',
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
          property: 'nodes',
          type: 'required',
          description: '网络图中的节点数组，每个节点表示一个实体，必填，数组对象类型；',
        },
        {
          property: 'name',
          type: 'required',
          description: '节点的名称，必须唯一，用于标识节点，必填，文本类型；',
        },
        {
          property: 'edges',
          type: 'required',
          description: '网络图中的边数组，每条边表示两个节点之间的关系，必填，数组对象类型；',
        },
        {
          property: 'source',
          type: 'required',
          description: '边的起始节点名称，指向节点的 `name` 属性，必填，文本类型；',
        },
        {
          property: 'target',
          type: 'required',
          description: '边的目标节点名称，指向节点的 `name` 属性，必填，文本类型；',
        },
        {
          property: 'name',
          type: 'optional',
          description: '边的名称，用于标识边，选填，文本类型；',
        },
      ],
    },
    examples: [
      {
        title:
          '用户注册流程包括以下步骤：用户访问注册页面，填写注册表单并提交，系统验证用户信息（无误则创建账户，有误则提示修改），系统发送验证邮件，用户点击邮件中的链接完成验证，系统提示注册成功并跳转到登录页面。用...',
        description:
          '用户注册流程包括以下步骤：用户访问注册页面，填写注册表单并提交，系统验证用户信息（无误则创建账户，有误则提示修改），系统发送验证邮件，用户点击邮件中的链接完成验证，系统提示注册成功并跳转到登录页面。用流程图可视化。',
        code: '{\n  "type": "flow-diagram",\n  "data": {\n    "nodes": [\n      { "name": "访问注册页面" },\n      { "name": "填写并提交注册表单" },\n      { "name": "验证用户信息" },\n      { "name": "创建新用户账户" },\n      { "name": "提示修改错误信息" },\n      { "name": "发送验证邮件" },\n      { "name": "点击验证链接" },\n      { "name": "注册成功，跳转到登录页面" }\n    ],\n    "edges": [\n      { "source": "访问注册页面", "target": "填写并提交注册表单" },\n      { "source": "填写并提交注册表单", "target": "验证用户信息" },\n      {\n        "source": "验证用户信息",\n        "target": "创建新用户账户",\n        "name": "信息无误"\n      },\n      {\n        "source": "验证用户信息",\n        "target": "提示修改错误信息",\n        "name": "信息有误"\n      },\n      { "source": "创建新用户账户", "target": "发送验证邮件" },\n      { "source": "发送验证邮件", "target": "点击验证链接" },\n      { "source": "点击验证链接", "target": "注册成功，跳转到登录页面" }\n    ]\n  }\n}',
      },
      {
        title:
          "用流程图来可视化一下我的数据 `['客户下单', '系统生成订单', '仓库拣货', '仓库打包', '物流配送', '客户收货']`。",
        description:
          "用流程图来可视化一下我的数据 `['客户下单', '系统生成订单', '仓库拣货', '仓库打包', '物流配送', '客户收货']`。",
        code: '{\n  "type": "flow-diagram",\n  "data": {\n    "nodes": [\n      { "name": "客户下单" },\n      { "name": "系统生成订单" },\n      { "name": "仓库拣货" },\n      { "name": "仓库打包" },\n      { "name": "物流配送" },\n      { "name": "客户收货" }\n    ],\n    "edges": [\n      { "source": "客户下单", "target": "系统生成订单" },\n      { "source": "系统生成订单", "target": "仓库拣货" },\n      { "source": "仓库拣货", "target": "仓库打包" },\n      { "source": "仓库打包", "target": "物流配送" },\n      { "source": "物流配送", "target": "客户收货" }\n    ]\n  }\n}',
      },
    ],
  },
  {
    id: 'org-chart',
    name: 'Organization Chart',
    icon: '🏢',
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
          property: 'name',
          type: 'required',
          description: '节点的名称，表示职位或部门的名称，必须唯一，必填，字符串类型',
        },
        {
          property: 'description',
          type: 'optional',
          description: '节点的描述信息，可以包含职位职责或部门简介等，选填，字符串类型',
        },
        {
          property: 'children',
          type: 'optional',
          description:
            '节点数组，表示下级职位或部门。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `OrganizationChartData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构，选填，数组对象类型',
        },
      ],
    },
    examples: [
      {
        title:
          'Alice Johnson 是公司的首席技术官，她的团队包括资深软件工程师 Bob Smith 和 IT 支持部门负责人 Eve Black。Bob Smith 负责带领软件工程团队，团队成员包括软件...',
        description:
          'Alice Johnson 是公司的首席技术官，她的团队包括资深软件工程师 Bob Smith 和 IT 支持部门负责人 Eve Black。Bob Smith 负责带领软件工程团队，团队成员包括软件工程师 Charlie Brown 和 Diana White。Eve Black 负责 IT 支持部门，团队成员包括 IT 支持专家 Frank Green 和 Grace Blue。',
        code: '{\n  "type": "organization-chart",\n  "data": {\n    "name": "Alice Johnson",\n    "description": "Chief Technology Officer",\n    "children": [\n      {\n        "name": "Bob Smith",\n        "description": "Senior Software Engineer",\n        "children": [\n          {\n            "name": "Charlie Brown",\n            "description": "Software Engineer"\n          },\n          {\n            "name": "Diana White",\n            "description": "Software Engineer"\n          }\n        ]\n      },\n      {\n        "name": "Eve Black",\n        "description": "IT Support Department Head",\n        "children": [\n          {\n            "name": "Frank Green",\n            "description": "IT Support Specialist"\n          },\n          {\n            "name": "Grace Blue",\n            "description": "IT Support Specialist"\n          }\n        ]\n      }\n    ]\n  }\n}',
      },
      {
        title:
          '用组织机构图来可视化以下数据 `{"name":"Eric Joplin","description":"Chief Executive Officer","children":[{"name":"L...',
        description:
          '用组织机构图来可视化以下数据 `{"name":"Eric Joplin","description":"Chief Executive Officer","children":[{"name":"Linda Newland","description":"Chief Executive Assistant"}]}`。',
        code: '{\n  "type": "organization-chart",\n  "data": {\n    "name": "Eric Joplin",\n    "description": "Chief Executive Officer",\n    "children": [\n      {\n        "name": "Linda Newland",\n        "description": "Chief Executive Assistant"\n      }\n    ]\n  }\n}',
      },
    ],
  },
  {
    id: 'table',
    name: 'Table',
    icon: '📋',
    description:
      '表格是一种以行和列组织数据的结构化展示方式。每一行代表一个数据实体，每一列代表一个属性或字段。表格能够清晰地展示大量数据，便于用户进行查找、比较和分析。表格通常用于展示结构化数据，如财务报表、成绩单、产品列表等。\n\n表格的核心优势在于对齐和比较。用户可以快速定位某一行或某一列的数据，进行横向或纵向的对比。表格也支持排序、筛选等操作，提升数据的可用性和交互性。',
    knowledge: {
      introduction:
        '表格是一种以行和列组织数据的结构化展示方式。每一行代表一个数据实体，每一列代表一个属性或字段。表格能够清晰地展示大量数据，便于用户进行查找、比较和分析。表格通常用于展示结构化数据，如财务报表、成绩单、产品列表等。\n\n表格的核心优势在于对齐和比较。用户可以快速定位某一行或某一列的数据，进行横向或纵向的对比。表格也支持排序、筛选等操作，提升数据的可用性和交互性。',
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
        code: '{\n  "type": "table",\n  "data": [\n    { "类别": "火锅", "营收额占比(%)": 22 },\n    { "类别": "自助餐", "营收额占比(%)": 12 },\n    { "类别": "小吃快餐", "营收额占比(%)": 8 },\n    { "类别": "西餐", "营收额占比(%)": 6 },\n    { "类别": "其它", "营收额占比(%)": 44 }\n  ],\n  "title": "餐饮业营收额数据表"\n}',
      },
      {
        title: '展示全国人口居住分布数据表。',
        description: '展示全国人口居住分布数据表。',
        code: '{\n  "type": "table",\n  "data": [\n    { "人口类型": "城镇人口", "数量(万人)": 63.89 },\n    { "人口类型": "乡村人口", "数量(万人)": 36.11 }\n  ],\n  "title": "全国人口居住分布"\n}',
      },
      {
        title: '展示产业结构数据表。',
        description: '展示产业结构数据表。',
        code: '{\n  "type": "table",\n  "data": [\n    { "产业类型": "第一产业", "产值(亿元)": 7200.0 },\n    { "产业类型": "第二产业", "产值(亿元)": 36600.0 },\n    { "产业类型": "第三产业", "产值(亿元)": 41000.0 }\n  ]\n}',
      },
    ],
  },
];
