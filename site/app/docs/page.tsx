import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Documentation - GPT-Vis",
  description: "Complete documentation for GPT-Vis: API reference, component guides, syntax, and AI agent integration.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
            <Link href="/docs" className="text-[#691eff] font-medium">
              Documentation
            </Link>
            <Link href="/examples" className="text-gray-600 hover:text-[#691eff] transition-colors">
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

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#installation" className="text-gray-600 hover:text-[#691eff] block py-1">
                    Installation
                  </a>
                </li>
                <li>
                  <a href="#quick-start" className="text-gray-600 hover:text-[#691eff] block py-1">
                    Quick Start
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">API Reference</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#api" className="text-gray-600 hover:text-[#691eff] block py-1">
                    GPTVis API
                  </a>
                </li>
                <li>
                  <a href="#streaming" className="text-gray-600 hover:text-[#691eff] block py-1">
                    Streaming API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Visualization</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#syntax" className="text-gray-600 hover:text-[#691eff] block py-1">
                    Syntax Guide
                  </a>
                </li>
                <li>
                  <a href="#components" className="text-gray-600 hover:text-[#691eff] block py-1">
                    Components
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Integration</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#ai-agent" className="text-gray-600 hover:text-[#691eff] block py-1">
                    AI Agent Integration
                  </a>
                </li>
                <li>
                  <a href="#frameworks" className="text-gray-600 hover:text-[#691eff] block py-1">
                    Framework Integration
                  </a>
                </li>
              </ul>
            </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Documentation</h1>
          <p className="text-xl text-gray-600 mb-12">
            Everything you need to know about building AI-powered visualizations with GPT-Vis
          </p>

          {/* Installation */}
          <section id="installation" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
              Installation
            </h2>
            <p className="text-gray-600 mb-4">
              Install GPT-Vis using npm, yarn, or pnpm:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 mb-4">
              <pre className="text-gray-300 text-sm overflow-x-auto">
                <code>npm install @antv/gpt-vis</code>
              </pre>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 mb-4">
              <pre className="text-gray-300 text-sm overflow-x-auto">
                <code>yarn add @antv/gpt-vis</code>
              </pre>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <pre className="text-gray-300 text-sm overflow-x-auto">
                <code>pnpm add @antv/gpt-vis</code>
              </pre>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
              Quick Start
            </h2>
            <p className="text-gray-600 mb-4">
              Get started with GPT-Vis in just a few lines of code:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 mb-4">
              <pre className="text-gray-300 text-sm overflow-x-auto">
                <code>{`import { GPTVis } from '@antv/gpt-vis';

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

gptVis.render(visSyntax);`}</code>
              </pre>
            </div>
            <p className="text-gray-600">
              That's it! You've created your first AI-friendly chart.
            </p>
          </section>

          {/* API Reference */}
          <section id="api" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
              GPTVis API
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Constructor</h3>
                <div className="bg-white rounded p-4 mb-3 border border-gray-200">
                  <code className="text-sm text-[#691eff]">new GPTVis(config: GPTVisConfig)</code>
                </div>
                <p className="text-gray-600 mb-3">Creates a new GPTVis instance.</p>
                <h4 className="font-semibold text-gray-900 mb-2">Parameters:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li><code className="text-sm bg-gray-100 px-1 py-0.5 rounded">container</code>: string | HTMLElement - Container element or selector</li>
                  <li><code className="text-sm bg-gray-100 px-1 py-0.5 rounded">width</code>: number - Chart width in pixels</li>
                  <li><code className="text-sm bg-gray-100 px-1 py-0.5 rounded">height</code>: number - Chart height in pixels</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">render()</h3>
                <div className="bg-white rounded p-4 mb-3 border border-gray-200">
                  <code className="text-sm text-[#691eff]">gptVis.render(syntax: string): void</code>
                </div>
                <p className="text-gray-600 mb-3">Renders a visualization from syntax string.</p>
                <h4 className="font-semibold text-gray-900 mb-2">Parameters:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li><code className="text-sm bg-gray-100 px-1 py-0.5 rounded">syntax</code>: string - Visualization syntax to render</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">destroy()</h3>
                <div className="bg-white rounded p-4 mb-3 border border-gray-200">
                  <code className="text-sm text-[#691eff]">gptVis.destroy(): void</code>
                </div>
                <p className="text-gray-600">Destroys the GPTVis instance and cleans up resources.</p>
              </div>
            </div>
          </section>

          {/* Streaming API */}
          <section id="streaming" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
              Streaming Support
            </h2>
            <p className="text-gray-600 mb-4">
              GPT-Vis supports real-time rendering of streaming data from AI models:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 mb-4">
              <pre className="text-gray-300 text-sm overflow-x-auto">
                <code>{`import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

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
stream.on('token', onToken);`}</code>
              </pre>
            </div>
          </section>

          {/* Syntax Guide */}
          <section id="syntax" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
              Visualization Syntax
            </h2>
            <p className="text-gray-600 mb-4">
              GPT-Vis uses a simple, markdown-like syntax that's easy for LLMs to generate:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Basic Structure</h3>
              <div className="bg-white rounded p-4 border border-gray-200">
                <pre className="text-sm text-gray-700">
                  <code>{`vis [chart-type]
[property] [value]
data
  - [key] [value]
    [nested-key] [nested-value]`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Line Chart Example</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    <code>{`vis line
title Sales Trend
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
  - time 2023
    value 180`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Pie Chart Example</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    <code>{`vis pie
data
  - category Sales
    value 30
  - category Marketing
    value 25
  - category Engineering
    value 45
innerRadius 0.6`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Bar Chart with Style</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    <code>{`vis bar
data
  - category Product A
    value 120
  - category Product B
    value 95
  - category Product C
    value 150
style
  palette #691eff #8e5aff #b58fff`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Components */}
          <section id="components" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
              Components
            </h2>
            <p className="text-gray-600 mb-6">
              GPT-Vis provides 20+ chart types optimized for AI generation:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {components.map((component) => (
                <Link
                  key={component.name}
                  href={`/examples#${component.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-[#691eff] hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{component.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#691eff]">
                        {component.name}
                      </h3>
                      <p className="text-sm text-gray-600">{component.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* AI Agent Integration */}
          <section id="ai-agent" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
              AI Agent Integration
            </h2>
            <p className="text-gray-600 mb-6">
              Integrate GPT-Vis with your AI agents for automatic visualization generation:
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#691eff]/10 to-transparent rounded-lg p-6 border border-[#691eff]/30">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">🤖 OpenAI Integration</h3>
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <pre className="text-sm text-gray-700 overflow-x-auto">
                    <code>{`import OpenAI from 'openai';
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
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">💡 Best Practices</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Use the <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">isVisSyntax()</code> helper to detect valid syntax</li>
                  <li>Include GPT-Vis syntax examples in your system prompts</li>
                  <li>Leverage the knowledge base for chart type selection</li>
                  <li>Handle incomplete syntax gracefully during streaming</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Framework Integration */}
          <section id="frameworks" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
              Framework Integration
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">⚛️ React</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    <code>{`import { GPTVis } from '@antv/gpt-vis';
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
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">🟢 Vue</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    <code>{`<template>
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
</script>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Nav */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Link href="/" className="text-gray-600 hover:text-[#691eff] flex items-center gap-2">
              ← Back to Home
            </Link>
            <Link href="/examples" className="text-[#691eff] hover:text-[#5517d8] flex items-center gap-2">
              View Examples →
            </Link>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
}

const components = [
  { name: "Line", icon: "📈", description: "Time series and trend visualization" },
  { name: "Bar", icon: "📊", description: "Compare categorical data" },
  { name: "Area", icon: "🌊", description: "Filled line charts for volume" },
  { name: "Pie", icon: "🥧", description: "Part-to-whole relationships" },
  { name: "Scatter", icon: "⚫", description: "Correlation and distribution" },
  { name: "Radar", icon: "🎯", description: "Multi-dimensional comparison" },
  { name: "Column", icon: "📊", description: "Vertical bar comparisons" },
  { name: "Funnel", icon: "🔻", description: "Process flow visualization" },
  { name: "Waterfall", icon: "🌊", description: "Sequential value changes" },
  { name: "Boxplot", icon: "📦", description: "Statistical distribution" },
  { name: "Violin", icon: "🎻", description: "Distribution density" },
  { name: "Histogram", icon: "📊", description: "Frequency distribution" },
  { name: "Sankey", icon: "🌀", description: "Flow and transition" },
  { name: "Treemap", icon: "🗺️", description: "Hierarchical data" },
  { name: "Venn", icon: "⭕", description: "Set relationships" },
  { name: "Network", icon: "🕸️", description: "Node relationships" },
  { name: "Mind Map", icon: "🧠", description: "Hierarchical thinking" },
  { name: "Flow", icon: "➡️", description: "Process diagrams" },
  { name: "Org Chart", icon: "🏢", description: "Organizational structure" },
  { name: "Table", icon: "📋", description: "Structured data display" },
];
