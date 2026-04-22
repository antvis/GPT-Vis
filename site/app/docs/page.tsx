import {
  Activity,
  AreaChart,
  BarChart2,
  BarChart3,
  BarChartHorizontal,
  CircleDot,
  Cloud,
  Droplets,
  FileText,
  Filter,
  GitBranch,
  GitMerge,
  LayoutGrid,
  LineChart,
  List,
  Network,
  PieChart,
  Puzzle,
  Radar,
  ScatterChart,
  Share2,
  Sparkles,
  Table,
  TrendingDown,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';

import Link from 'next/link';
import { Breadcrumb } from '../components/Breadcrumb';
import { ChartPreview } from '../components/ChartPreview';
import { CodeBlock } from '../components/CodeBlock';
import { PageTitle } from '../components/PageTitle';
import { SectionHeading } from '../components/SectionHeading';
import StreamingChatRender from '../components/StreamingRender/chat';
import { DocsSideBar } from './components/DocsClient';

const components = [
  {
    id: 'line-chart',
    name: 'Line',
    icon: LineChart,
    description: 'Time series and trend visualization',
  },
  {
    id: 'bar-chart',
    name: 'Bar',
    icon: BarChartHorizontal,
    description: 'Compare categorical data',
  },
  { id: 'area-chart', name: 'Area', icon: AreaChart, description: 'Filled line charts for volume' },
  { id: 'pie-chart', name: 'Pie', icon: PieChart, description: 'Part-to-whole relationships' },
  {
    id: 'scatter-chart',
    name: 'Scatter',
    icon: ScatterChart,
    description: 'Correlation and distribution',
  },
  { id: 'radar-chart', name: 'Radar', icon: Radar, description: 'Multi-dimensional comparison' },
  { id: 'column-chart', name: 'Column', icon: BarChart2, description: 'Vertical bar comparisons' },
  { id: 'funnel-chart', name: 'Funnel', icon: Filter, description: 'Process flow visualization' },
  {
    id: 'waterfall-chart',
    name: 'Waterfall',
    icon: TrendingDown,
    description: 'Sequential value changes',
  },
  { id: 'boxplot', name: 'Boxplot', icon: BarChart3, description: 'Statistical distribution' },
  { id: 'violin-chart', name: 'Violin', icon: Activity, description: 'Distribution density' },
  { id: 'histogram', name: 'Histogram', icon: BarChart3, description: 'Frequency distribution' },
  { id: 'sankey-diagram', name: 'Sankey', icon: Workflow, description: 'Flow and transition' },
  { id: 'treemap', name: 'Treemap', icon: LayoutGrid, description: 'Hierarchical data' },
  { id: 'venn-diagram', name: 'Venn', icon: CircleDot, description: 'Set relationships' },
  { id: 'table', name: 'Table', icon: Table, description: 'Structured data display' },
  {
    id: 'dual-axes',
    name: 'Dual Axes',
    icon: TrendingUp,
    description: 'Two y-axes for mixed data series',
  },
  {
    id: 'liquid-chart',
    name: 'Liquid',
    icon: Droplets,
    description: 'Percentage fill gauge visualization',
  },
  { id: 'wordcloud', name: 'Word Cloud', icon: Cloud, description: 'Text frequency visualization' },
  { id: 'summary', name: 'Summary', icon: FileText, description: 'AI-generated text summary card' },
  {
    id: 'flow-diagram',
    name: 'Flow Diagram',
    icon: GitBranch,
    description: 'Process and workflow visualization',
  },
  {
    id: 'indented-tree',
    name: 'Indented Tree',
    icon: List,
    description: 'Hierarchical tree with indentation',
  },
  { id: 'mindmap', name: 'Mindmap', icon: Network, description: 'Radial mind map visualization' },
  {
    id: 'network-graph',
    name: 'Network Graph',
    icon: Share2,
    description: 'Node-link network relationships',
  },
  {
    id: 'organization-chart',
    name: 'Organization Chart',
    icon: Users,
    description: 'Org hierarchy visualization',
  },
  {
    id: 'fishbone-diagram',
    name: 'Fishbone Diagram',
    icon: GitMerge,
    description: 'Cause-and-effect root cause analysis',
  },
];

export default function GettingStarted() {
  return (
    <div className="max-w-screen-xl mx-auto flex">
      <DocsSideBar />
      <div className="flex-1 min-w-0">
        <div className="px-12 pt-6">
          <Breadcrumb items={[{ label: 'Documentation', href: '/docs' }]} />
        </div>
        <div className="max-w-4xl px-12 pb-10">
          <header className="mb-10" id="getting-started">
            <PageTitle title="Documentation" />
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Everything you need to know about building AI-powered visualizations with GPT-Vis.
            </p>
          </header>

          <section className="mb-16 scroll-mt-24" id="installation">
            <SectionHeading id="installation">Installation</SectionHeading>
            <p className="text-on-surface-variant mb-6">
              Install GPT-Vis using npm, yarn, or pnpm:
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'npm', cmd: 'npm install @antv/gpt-vis' },
                { label: 'yarn', cmd: 'yarn add @antv/gpt-vis' },
                { label: 'pnpm', cmd: 'pnpm add @antv/gpt-vis' },
              ].map(({ label, cmd }) => (
                <CodeBlock key={label} label={label} code={cmd} lang="bash" />
              ))}
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="quick-start">
            <SectionHeading id="quick-start">Quick Start</SectionHeading>
            <p className="text-on-surface-variant mb-6">
              Get started with GPT-Vis in just a few lines of code. Our API is designed to be
              declarative and intuitive.
            </p>
            <CodeBlock
              lang="js"
              code={`import { GPTVis } from '@antv/gpt-vis';

// Create a GPTVis instance
const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

// Render with natural syntax
const visSyntax = \`
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
\`;

gptVis.render(visSyntax);`}
            />
          </section>

          <section className="mb-16 scroll-mt-24" id="api-reference">
            <SectionHeading id="api-reference">GPTVis API</SectionHeading>
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-lg border border-outline-variant hover:border-primary/30 transition-all group w-full bg-white">
                <h3 className="text-2xl font-bold text-on-surface mb-2">Constructor</h3>
                <CodeBlock
                  lang="js"
                  code="new GPTVis(options: VisualizationOptions)"
                  theme="light"
                />
                <p className="text-on-surface-variant mb-2 mt-2">
                  Creates a new GPTVis instance. Parameters:
                </p>
                <ul className="text-on-surface-variant space-y-1 list-disc list-inside">
                  <li>
                    <span className="font-mono text-indigo-600">container</span>: string |
                    HTMLElement — container element or CSS selector (required)
                  </li>
                  <li>
                    <span className="font-mono text-indigo-600">width?</span>: number — chart width
                    in pixels (optional)
                  </li>
                  <li>
                    <span className="font-mono text-indigo-600">height?</span>: number — chart
                    height in pixels (optional)
                  </li>
                  <li>
                    <span className="font-mono text-indigo-600">theme?</span>:{' '}
                    <span className="font-mono">
                      &apos;default&apos; | &apos;light&apos; | &apos;dark&apos; |
                      &apos;academy&apos;
                    </span>{' '}
                    — visualization theme (optional)
                  </li>
                  <li>
                    <span className="font-mono text-indigo-600">wrapper?</span>: boolean — enable
                    wrapper UI with tabs, download and copy controls (default:{' '}
                    <span className="font-mono">false</span>)
                  </li>
                  <li>
                    <span className="font-mono text-indigo-600">locale?</span>: string — locale for
                    wrapper labels (default: <span className="font-mono">&apos;zh-CN&apos;</span>)
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-lg border border-outline-variant hover:border-primary/30 transition-all group w-full bg-white">
                <h3 className="text-2xl font-bold text-on-surface mb-2">render()</h3>
                <CodeBlock
                  lang="ts"
                  code="gptVis.render(config: string | GPTVisConfig): void"
                  theme="light"
                />
                <p className="text-on-surface-variant mt-2 mb-3">
                  Renders a visualization. Accepts either:
                </p>
                <ul className="text-on-surface-variant space-y-1 list-disc list-inside">
                  <li>
                    A <span className="font-mono text-indigo-600">string</span> — GPT-Vis
                    markdown-like syntax starting with{' '}
                    <span className="font-mono">vis [chart-type]</span>
                    {' · '}
                    <a href="#visualization" className="text-primary hover:underline text-xs">
                      Syntax Guide →
                    </a>
                  </li>
                  <li>
                    A <span className="font-mono text-indigo-600">GPTVisConfig</span> object — plain
                    config object with a <span className="font-mono">type</span> field and chart
                    data
                    {' · '}
                    <a href="#json-config" className="text-primary hover:underline text-xs">
                      JSON Config →
                    </a>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-lg border border-outline-variant hover:border-primary/30 transition-all group w-full bg-white">
                <h3 className="text-2xl font-bold text-on-surface mb-2">destroy()</h3>
                <CodeBlock lang="js" code="gptVis.destroy(): void" theme="light" />
                <p className="text-on-surface-variant mt-2">
                  Destroys the GPTVis instance and cleans up all allocated resources.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="streaming">
            <SectionHeading id="streaming">Streaming Support</SectionHeading>
            <p className="text-on-surface-variant mb-6">
              GPT-Vis 天然支持流式渲染场景。由于可视化语法是逐行累积的纯文本，当 AI 模型逐 token
              输出时，只需将已接收的内容直接传入{' '}
              <code className="text-indigo-600 mx-1">gptVis.render()</code>
              ——GPT-Vis
              会跳过尚不完整的语法片段，在检测到完整可解析的结构时立即渲染图表，随着输出的推进持续更新，最终呈现完整的可视化结果。
            </p>
            <div className="p-4 rounded-lg border border-outline-variant bg-white mb-6">
              <p className="text-sm font-mono text-on-surface mb-1">
                isVisSyntax(input: any): boolean
              </p>
              <p className="text-sm text-on-surface-variant">
                Returns <span className="font-mono text-indigo-600">true</span> if the input string
                starts with <span className="font-mono">vis </span> (after trimming). Use this to
                check whether a streaming buffer has accumulated enough content to attempt
                rendering.
              </p>
            </div>
            <CodeBlock
              lang="js"
              code={`import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400
});

let buffer = '';

// Handle streaming tokens
function onToken(token) {
  buffer += token;

  // Check if we have valid visualization syntax
  if (isVisSyntax(buffer)) {
    gptVis.render(buffer);
  }
}

// Use with your AI model's streaming API
stream.on('token', onToken);`}
            />
            <h3 className="text-lg font-bold text-on-surface mt-4 mb-2">Try it out</h3>
            <p className="text-on-surface-variant mb-4">
              Experience streaming rendering in action — type a message below and watch GPT-Vis
              render charts in real time as the response streams in.
            </p>
            <StreamingChatRender />
          </section>

          <section className="mb-16 scroll-mt-24" id="visualization">
            <SectionHeading id="visualization">Visualization Syntax</SectionHeading>
            <p className="text-on-surface-variant mb-2">
              GPT-Vis uses a simple, markdown-like syntax that&apos;s easy for LLMs to generate:
            </p>
            <div className="mb-6">
              <CodeBlock
                label="Basic Structure"
                code={`vis [chart-type]
[property] [value]
data
  - [key] [value]
    [nested-key] [nested-value]`}
              />
            </div>

            <h3 className="text-2xl font-bold text-on-surface mb-4">Syntax Rules</h3>
            <ul className="text-on-surface-variant space-y-2 list-disc list-inside mb-6">
              <li>
                First line must be{' '}
                <span className="font-mono text-indigo-600">vis [chart-type]</span>
              </li>
              <li>
                Top-level key-value pairs use either{' '}
                <span className="font-mono text-indigo-600">key value</span> or{' '}
                <span className="font-mono text-indigo-600">key: value</span> format
              </li>
              <li>
                <span className="font-mono text-indigo-600">data</span>,{' '}
                <span className="font-mono text-indigo-600">categories</span>,{' '}
                <span className="font-mono text-indigo-600">series</span>,{' '}
                <span className="font-mono text-indigo-600">nodes</span>,{' '}
                <span className="font-mono text-indigo-600">edges</span> sections use dash-prefixed
                array items (<span className="font-mono">- key value</span>)
              </li>
              <li>
                Values containing spaces must be quoted:{' '}
                <span className="font-mono text-indigo-600">&quot;North America&quot;</span> or{' '}
                <span className="font-mono text-indigo-600">&apos;North America&apos;</span> (quoted
                values are never coerced to numbers or booleans)
              </li>
              <li>
                <span className="font-mono text-indigo-600">children</span> inside a data item
                creates nested hierarchical data (used by mindmap, treemap, fishbone-diagram, etc.)
              </li>
              <li>
                <span className="font-mono text-indigo-600">style</span> section accepts key-value
                pairs and a <span className="font-mono text-indigo-600">palette</span> array
              </li>
            </ul>

            <div className="flex flex-col gap-4">
              {[
                {
                  name: 'Line Chart',
                  code: `vis line\ntitle Sales Trend\ndata\n  - time 2020\n    value 100\n  - time 2021\n    value 120\n  - time 2022\n    value 150\n  - time 2023\n    value 180`,
                },
                {
                  name: 'Pie Chart',
                  code: `vis pie\ndata\n  - category Sales\n    value 30\n  - category Marketing\n    value 25\n  - category Engineering\n    value 45\ninnerRadius 0.6`,
                },
                {
                  name: 'Bar Chart with Style',
                  code: `vis bar\ndata\n  - category "Product A"\n    value 120\n  - category "Product B"\n    value 95\n  - category "Product C"\n    value 150\nstyle\n  palette\n    - #691eff\n    - #8e5aff\n    - #b58fff`,
                },
                {
                  name: 'Hierarchical Data (Mindmap)',
                  code: `vis mindmap\ndata\n  - name Project Plan\n    children\n      - name Research\n        children\n          - name Market Analysis\n          - name Feasibility Study\n      - name Development`,
                },
                {
                  name: 'Quoted String Values (Dual Axes)',
                  code: `vis dual-axes\ncategories\n  - "North America"\n  - "Southeast Asia"\n  - Europe\nseries\n  - type line\n    name Revenue\n    data\n      - 100\n      - 120\n      - 90\n  - type column\n    name Units\n    data\n      - 50\n      - 60\n      - 45`,
                },
              ].map(({ name, code }) => (
                <div key={name}>
                  <h3 className="text-2xl font-bold text-on-surface mb-2">{name}</h3>
                  <CodeBlock code={code} lang="yaml" />
                </div>
              ))}
            </div>

            <h3
              className="text-2xl font-bold text-on-surface mt-10 mb-3 scroll-mt-24"
              id="json-config"
            >
              JSON Config Syntax
            </h3>
            <p className="text-on-surface-variant mb-6">
              As an alternative to the string syntax,{' '}
              <span className="font-mono text-indigo-600">render()</span> also accepts a plain
              JavaScript / JSON object directly. The object must include a{' '}
              <span className="font-mono text-indigo-600">type</span> field matching the chart type
              identifier. This is useful when the config is already structured in code or returned
              by an API.
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-xl font-bold text-on-surface mb-2">Line Chart</h4>
                <CodeBlock
                  lang="js"
                  code={`gptVis.render({
  type: 'line',
  title: 'Sales Trend',
   [
    { time: '2020', value: 100 },
    { time: '2021', value: 120 },
    { time: '2022', value: 150 },
    { time: '2023', value: 180 },
  ],
});`}
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-on-surface mb-2">Pie Chart</h4>
                <CodeBlock
                  lang="js"
                  code={`gptVis.render({
  type: 'pie',
  innerRadius: 0.6,
  data: [
    { category: 'Sales', value: 30 },
    { category: 'Marketing', value: 25 },
    { category: 'Engineering', value: 45 },
  ],
});`}
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-on-surface mb-2">Bar Chart with Style</h4>
                <CodeBlock
                  lang="js"
                  code={`gptVis.render({
  type: 'bar',
  data: [
    { category: 'Product A', value: 120 },
    { category: 'Product B', value: 95 },
    { category: 'Product C', value: 150 },
  ],
  style: {
    palette: ['#691eff', '#8e5aff', '#b58fff'],
  },
});`}
                />
              </div>
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="components">
            <SectionHeading id="components">Components</SectionHeading>
            <p className="text-on-surface-variant mb-8">
              GPT-Vis provides 26 chart types optimized for AI generation. Each component is
              designed with an editorial aesthetic first.
            </p>
            <div className="bg-surface-container rounded-lg p-8">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-6">
                AVAILABLE COMPONENTS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {components.map((comp) => (
                  <Link
                    key={comp.name}
                    href={`/examples/${comp.id}`}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-outline-variant/50 hover:border-primary/30 transition-all"
                  >
                    <div className="mt-1 shrink-0">
                      <comp.icon className="text-primary w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">{comp.name}</span>
                      <p className="text-xs text-on-surface-variant mt-1">{comp.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="style-config">
            <SectionHeading id="style-config">Style Configuration</SectionHeading>

            <h3 className="text-2xl font-bold text-on-surface mb-4" id="themes">
              Built-in Themes
            </h3>
            <p className="text-on-surface-variant mb-6">
              GPT-Vis provides four built-in themes:{' '}
              {['light', 'dark', 'academy', 'default'].map((t, i, arr) => (
                <span key={t}>
                  <span className="font-mono text-indigo-600">{t}</span>
                  {i < arr.length - 1 ? ', ' : ''}
                </span>
              ))}
              . Set the <span className="font-mono text-indigo-600">theme</span> field in vis syntax
              or JSON config to apply a theme globally to the chart.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { theme: 'light', label: 'light (default)' },
                { theme: 'dark', label: 'dark' },
                { theme: 'academy', label: 'academy' },
              ].map(({ theme, label }) => (
                <div key={theme} className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-on-surface">{label}</p>
                  <div className="rounded-lg overflow-hidden border border-outline-variant">
                    <ChartPreview
                      chartId={`theme-${theme}`}
                      className="min-h-[220px]"
                      visSyntax={`vis column\ntheme ${theme}\ndata\n  - category Q1\n    value 120\n  - category Q2\n    value 180\n  - category Q3\n    value 150\n  - category Q4\n    value 200`}
                    />
                  </div>
                  <CodeBlock lang="yaml" hideCopy code={`vis column\ntheme ${theme}\n...`} />
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-on-surface mb-4 scroll-mt-24" id="palette">
              Custom Palette
            </h3>
            <p className="text-on-surface-variant mb-6">
              Override the default color palette by setting{' '}
              <span className="font-mono text-indigo-600">style.palette</span> with an array of hex
              colors. Colors are assigned to data series in order.
            </p>
            <div className="flex flex-col gap-6">
              <ChartPreview
                chartId="custom-palette"
                className="min-h-[260px] rounded-lg border border-outline-variant"
                visSyntax={`vis bar\ndata\n  - category Design\n    value 30\n  - category Engineering\n    value 45\n  - category Marketing\n    value 25\n  - category Sales\n    value 38\nstyle\n  palette\n    - #691eff\n    - #8e5aff\n    - #b58fff\n    - #d4b0ff`}
              />
              <CodeBlock
                lang="yaml"
                code={`vis bar\ndata\n  - category Design\n    value 30\n  - category Engineering\n    value 45\n  - category Marketing\n    value 25\n  - category Sales\n    value 38\nstyle\n  palette\n    - #691eff\n    - #8e5aff\n    - #b58fff\n    - #d4b0ff`}
              />
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="integration">
            <SectionHeading id="integration">AI Agent Integration</SectionHeading>
            <div className="space-y-12">
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <Puzzle className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-2 scroll-mt-24" id="skill">
                    Chart Visualization Skill
                  </h3>
                </div>
                <div className="w-full">
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    GPT-Vis ships a{' '}
                    <span className="font-mono text-indigo-600">chart-visualization</span> skill for
                    AI agents (e.g. Claude Code). Copy the skill file into your project to enable
                    automatic chart type selection and GPT-Vis syntax generation from natural
                    language.
                  </p>
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-on-surface mb-2">Installation</p>
                    <CodeBlock
                      lang="bash"
                      code="npx skills add https://github.com/antvis/GPT-Vis"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-on-surface">Usage Examples</p>
                    {[
                      {
                        label: 'Generate vis syntax',
                        code: 'Show monthly sales from Jan to Jun as a line chart, output vis syntax',
                      },
                      {
                        label: 'Generate JSON config',
                        code: 'Show market share breakdown as a pie chart, output JSON config',
                      },
                      {
                        label: 'Generate full HTML',
                        code: 'Create a bar chart comparing Q1–Q4 revenue, give me a complete HTML file',
                      },
                      {
                        label: 'Generate React component',
                        code: 'Build a React component that renders a scatter plot of height vs weight',
                      },
                    ].map(({ label, code }) => (
                      <div key={label}>
                        <p className="text-xs text-on-surface-variant mb-1">{label}</p>
                        <CodeBlock lang="text" code={code} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <Sparkles className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-2">Best Practices</h3>
                </div>
                <div>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    Follow these guidelines to get the best results when integrating GPT-Vis with AI
                    agents.
                  </p>
                  <ul className="ml-4 space-y-2 list-disc">
                    {[
                      'Use the chart-visualization skill to handle chart type selection and syntax generation automatically',
                      'Use isVisSyntax() to detect valid syntax before calling render() in streaming scenarios',
                      'Handle incomplete syntax gracefully during streaming — render() is designed to be called repeatedly as tokens arrive',
                      'Prefer vis syntax format for streaming output; use JSON config for structured API responses',
                    ].map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="framework">
            <SectionHeading id="framework">Framework Integration</SectionHeading>
            <div className="space-y-6">
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-on-surface mb-2">Using in React</h3>
                    <p>In React, you can create an instance in useEffect and mount it to a ref:</p>
                  </div>
                </div>
                <div className="w-full">
                  <CodeBlock
                    lang="js"
                    label="React"
                    code={`import { GPTVis } from '@antv/gpt-vis';
import { useEffect, useRef } from 'react';

function ChartComponent({ visSyntax }) {
  const containerRef = useRef();
  const gptVisRef = useRef();

  useEffect(() => {
    gptVisRef.current = new GPTVis({
      container: containerRef.current,
      width: 600,
      height: 400
    });
    return () => gptVisRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (gptVisRef.current && visSyntax) {
      gptVisRef.current.render(visSyntax);
    }
  }, [visSyntax]);

  return <div ref={containerRef} />;
}`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-on-surface mb-2">Using in Vue</h3>
                    <p>
                      In Vue 3, you can create an instance in the onMounted lifecycle hook and mount
                      it to a ref:
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <CodeBlock
                    label="Vue"
                    lang="jsx"
                    code={`<template>
  <div ref="chartRef"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { GPTVis } from '@antv/gpt-vis';

const props = defineProps(['visSyntax']);
const chartRef = ref(null);
let gptVis = null;

onMounted(() => {
  gptVis = new GPTVis({
    container: chartRef.value,
    width: 600,
    height: 400
  });
  gptVis.render(props.visSyntax);
});

watch(
  () => props.visSyntax,
  (newSyntax) => {
    if (gptVis) gptVis.render(newSyntax);
  }
);

onUnmounted(() => gptVis?.destroy());
</script>`}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
