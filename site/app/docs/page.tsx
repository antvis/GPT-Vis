import {
  Activity,
  AreaChart,
  BarChart2,
  BarChart3,
  BarChartHorizontal,
  Brain,
  CircleDot,
  Cloud,
  Droplets,
  FileText,
  Filter,
  GitBranch,
  LayoutGrid,
  LineChart,
  List,
  Network,
  PieChart,
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
import { CodeBlock } from '../components/CodeBlock';
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
];

export default function GettingStarted() {
  return (
    <div className="flex">
      <DocsSideBar />
      <div className="flex-1 ml-72">
        <div className="max-w-4xl mx-auto p-12">
          <header className="mb-12" id="getting-started">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
              Documentation
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Everything you need to know about building AI-powered visualizations with GPT-Vis.
            </p>
          </header>

          <section className="mb-16 scroll-mt-24" id="installation">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-on-surface">Installation</h2>
              <div className="h-[1px] flex-1 bg-surface-container ml-4" />
            </div>
            <p className="text-on-surface-variant mb-6">
              Install GPT-Vis using npm, yarn, or pnpm:
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'npm', cmd: 'npm install @antv/gpt-vis' },
                { label: 'yarn', cmd: 'yarn add @antv/gpt-vis' },
                { label: 'pnpm', cmd: 'pnpm add @antv/gpt-vis' },
              ].map(({ label, cmd }) => (
                <CodeBlock key={label} label={label} code={cmd} />
              ))}
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="quick-start">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-on-surface">Quick Start</h2>
              <div className="h-[1px] flex-1 bg-surface-container ml-4" />
            </div>
            <p className="text-on-surface-variant mb-6">
              Get started with GPT-Vis in just a few lines of code. Our API is designed to be
              declarative and intuitive.
            </p>
            <CodeBlock
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
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-on-surface">GPTVis API</h2>
              <div className="h-[1px] flex-1 bg-surface-container ml-4" />
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-xl border border-outline-variant hover:border-primary/30 transition-all group w-full bg-white">
                <h3 className="font-bold text-on-surface mb-2">Constructor</h3>
                <CodeBlock code="new GPTVis(config: GPTVisConfig)" theme="light" />
                <p className="text-on-surface-variant mb-2 mt-2">
                  Creates a new GPTVis instance. Parameters:
                </p>
                <ul className="text-on-surface-variant space-y-1 list-disc list-inside">
                  <li>
                    <span className="font-mono text-indigo-600">container</span>: string |
                    HTMLElement — container element or selector
                  </li>
                  <li>
                    <span className="font-mono text-indigo-600">width</span>: number — chart width
                    in pixels
                  </li>
                  <li>
                    <span className="font-mono text-indigo-600">height</span>: number — chart height
                    in pixels
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-outline-variant hover:border-primary/30 transition-all group w-full bg-white">
                <h3 className="font-bold text-on-surface mb-2">render()</h3>
                <CodeBlock code="gptVis.render(syntax: string): void" theme="light" />
                <p className="text-on-surface-variant mt-2">
                  Renders a visualization from a syntax string. Accepts the GPT-Vis markdown-like
                  visualization syntax and updates the chart in place.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-outline-variant hover:border-primary/30 transition-all group w-full bg-white">
                <h3 className="font-bold text-on-surface mb-2">destroy()</h3>
                <CodeBlock code="gptVis.destroy(): void" theme="light" />
                <p className="text-on-surface-variant mt-2">
                  Destroys the GPTVis instance and cleans up all allocated resources.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="streaming">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-on-surface">Streaming Support</h2>
              <div className="h-[1px] flex-1 bg-surface-container ml-4" />
            </div>
            <p className="text-on-surface-variant mb-6">
              GPT-Vis supports real-time rendering of streaming data from AI models using the
              <code className="text-indigo-600 mx-1">isVisSyntax()</code> helper to detect valid
              syntax as tokens arrive.
            </p>
            <CodeBlock
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
          </section>

          <section className="mb-16 scroll-mt-24" id="visualization">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-on-surface">Visualization Syntax</h2>
              <div className="h-[1px] flex-1 bg-surface-container ml-4" />
            </div>
            <p className="text-on-surface-variant mb-2">
              GPT-Vis uses a simple, markdown-like syntax that&apos;s easy for LLMs to generate:
            </p>
            <div className="mb-4">
              <CodeBlock
                label="Basic Structure"
                code={`vis [chart-type]
[property] [value]
data
  - [key] [value]
    [nested-key] [nested-value]`}
              />
            </div>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: 'Line Chart Example',
                  code: `vis line\ntitle Sales Trend\ndata\n  - time 2020\n    value 100\n  - time 2021\n    value 120\n  - time 2022\n    value 150\n  - time 2023\n    value 180`,
                },
                {
                  name: 'Pie Chart Example',
                  code: `vis pie\ndata\n  - category Sales\n    value 30\n  - category Marketing\n    value 25\n  - category Engineering\n    value 45\ninnerRadius 0.6`,
                },
                {
                  name: 'Bar Chart With Style Example',
                  code: `vis bar\ndata\n  - category Product A\n    value 120\n  - category Product B\n    value 95\n  - category Product C\n    value 150\nstyle\n  palette #691eff #8e5aff #b58fff`,
                },
              ].map(({ name, code }) => (
                <div key={name}>
                  <h3 className="font-bold text-on-surface mb-2">{name}</h3>
                  <CodeBlock code={code} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="components">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-on-surface">Components</h2>
              <div className="h-[1px] flex-1 bg-surface-container ml-4" />
            </div>
            <p className="text-on-surface-variant mb-8">
              GPT-Vis provides 20+ chart types optimized for AI generation. Each component is
              designed with an editorial aesthetic first.
            </p>
            <div className="bg-surface-container rounded-2xl p-8">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-6">
                AVAILABLE COMPONENTS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {components.map((comp) => (
                  <Link
                    key={comp.name}
                    href={`/examples/${comp.id}`}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-outline-variant/50 hover:border-primary/30 transition-all"
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

          <section className="mb-16 scroll-mt-24" id="integration">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-on-surface">AI Agent Integration</h2>
              <div className="h-[1px] flex-1 bg-surface-container ml-4" />
            </div>
            <div className="space-y-12">
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <Brain className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">OpenAI Integration</h3>
                </div>
                <div className="w-full">
                  <p className="text-on-surface-variant leading-relaxed mb-4">
                    Integrate GPT-Vis with OpenAI for automatic visualization generation from
                    natural language prompts.
                  </p>
                  <CodeBlock
                    code={`import OpenAI from 'openai';
import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

const openai = new OpenAI();
const gptVis = new GPTVis({ container: '#chart' });

const stream = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{
    role: 'user',
    content: 'Show sales trend for 2020-2023'
  }],
  stream: true,
});

let buffer = '';
for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  buffer += content;
  if (isVisSyntax(buffer)) {
    gptVis.render(buffer);
  }
}`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <Sparkles className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">Best Practices</h3>
                </div>
                <div>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    Follow these guidelines to get the best results when integrating GPT-Vis with AI
                    agents.
                  </p>
                  <div className="ml-4 space-y-2">
                    {[
                      'Use isVisSyntax() to detect valid syntax',
                      'Include GPT-Vis syntax examples in system prompts',
                      'Leverage the knowledge base for chart type selection',
                      'Handle incomplete syntax gracefully during streaming',
                    ].map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="framework">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-on-surface">Framework Integration</h2>
              <div className="h-[1px] flex-1 bg-surface-container ml-4" />
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-on-surface mb-2">Using in React</h3>
                    <p>In React, you can create an instance in useEffect and mount it to a ref:</p>
                  </div>
                </div>
                <div className="w-full">
                  <CodeBlock
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
                    <h3 className="text-lg font-bold text-on-surface mb-2">Using in Vue</h3>
                    <p>
                      In Vue 3, you can create an instance in the onMounted lifecycle hook and mount
                      it to a ref:
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <CodeBlock
                    label="Vue"
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
