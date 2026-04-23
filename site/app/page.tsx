import Image from 'next/image';
import Link from 'next/link';
import { CodeBlock } from './components/CodeBlock';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#691eff]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#691eff]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#691eff]/10 rounded-full text-sm text-[#691eff] font-medium mb-6 border border-[#691eff]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#691eff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#691eff]"></span>
            </span>
            Version 1.0 Preview - Stable Release: May 1, 2026
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 via-[#691eff] to-gray-900 bg-clip-text text-transparent">
            AI-Native Visualization
            <br />
            for the LLM Era
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Framework-agnostic visualization library designed for AI-powered applications. Simple
            syntax that LLMs generate effortlessly. 25 chart types ready for your AI agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/docs"
              className="px-8 py-4 bg-[#691eff] text-white rounded-lg hover:bg-[#5517d8] transition-all shadow-xl shadow-[#691eff]/30 font-medium text-lg"
            >
              Get Started →
            </Link>
            <Link
              href="/examples"
              className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-all border-2 border-gray-200 font-medium text-lg"
            >
              View Examples
            </Link>
          </div>

          {/* Code Example */}
          <div className="max-w-3xl mx-auto">
            <CodeBlock
              code={`import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

// LLM generates this natural syntax
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
              lang="javascript"
              label="Quick Start"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Built for AI, Designed for Developers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every feature optimized for AI generation and human usability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-gray-200 hover:border-[#691eff]/30 hover:shadow-xl hover:shadow-[#691eff]/10 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#691eff] to-[#8e5aff] rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#691eff]/30">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Types Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#691eff]/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">25 AI-Friendly Chart Types</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From basic statistical charts to advanced visualizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {chartTypes.map((chart, index) => (
              <Link
                key={index}
                href={`/examples#${chart.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#691eff] hover:shadow-lg hover:shadow-[#691eff]/20 transition-all text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {getChartIcon(chart)}
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-[#691eff]">
                  {chart}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 px-6 py-3 text-[#691eff] font-medium hover:underline"
            >
              Explore All Examples →
            </Link>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Framework Agnostic</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Works seamlessly with any JavaScript framework or vanilla JS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {frameworks.map((framework, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-[#691eff] transition-all"
              >
                <div className="text-4xl mb-4">{framework.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{framework.name}</h3>
                <p className="text-gray-400 mb-4">{framework.description}</p>
                <code className="text-xs text-gray-500 bg-gray-900 p-2 rounded block overflow-x-auto">
                  {framework.install}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#691eff] to-[#8e5aff] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to Build AI-Powered Visualizations?</h2>
          <p className="text-xl mb-10 text-white/90">
            Start creating beautiful, AI-friendly charts in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs"
              className="px-8 py-4 bg-white text-[#691eff] rounded-lg hover:bg-gray-100 transition-all shadow-xl font-medium text-lg"
            >
              Read Documentation
            </Link>
            <a
              href="https://github.com/antvis/GPT-Vis"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent text-white rounded-lg hover:bg-white/10 transition-all border-2 border-white font-medium text-lg"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/gpt-vis-logo.png"
                  alt="GPT-Vis Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-semibold text-gray-900">GPT-Vis</span>
              </div>
              <p className="text-gray-600 text-sm">AI-Native Visualization for the LLM Era</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Documentation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs" className="text-gray-600 hover:text-[#691eff]">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link href="/docs#api-reference" className="text-gray-600 hover:text-[#691eff]">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/docs#visualization" className="text-gray-600 hover:text-[#691eff]">
                    Syntax Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/examples" className="text-gray-600 hover:text-[#691eff]">
                    Examples
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/antvis/GPT-Vis"
                    className="text-gray-600 hover:text-[#691eff]"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/antvis/GPT-Vis/issues"
                    className="text-gray-600 hover:text-[#691eff]"
                  >
                    Issues
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://antv.antgroup.com/"
                    className="text-gray-600 hover:text-[#691eff]"
                  >
                    AntV
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/antvis/GPT-Vis/blob/main/CONTRIBUTING.md"
                    className="text-gray-600 hover:text-[#691eff]"
                  >
                    Contributing
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>© 2024 AntV Team. Released under the MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: '🚀',
    title: 'Framework Agnostic',
    description:
      'Works with vanilla JavaScript, React, Vue, Angular, or any framework of your choice.',
  },
  {
    icon: '✍️',
    title: 'Natural Syntax',
    description:
      'Simple, markdown-like syntax that LLMs can generate effortlessly with high accuracy.',
  },
  {
    icon: '🌊',
    title: 'Streaming Support',
    description: 'Built-in support for streaming output from AI models with real-time rendering.',
  },
  {
    icon: '🛡️',
    title: 'Fault Tolerant',
    description: 'Gracefully handles incomplete or malformed data during AI generation.',
  },
  {
    icon: '🧠',
    title: 'Intelligent Defaults',
    description: 'Automatic data detection, smart color schemes, and adaptive layouts built-in.',
  },
  {
    icon: '⚡',
    title: 'High Performance',
    description: 'Optimized rendering engine for smooth animations and large datasets.',
  },
];

const chartTypes = [
  'Line',
  'Bar',
  'Area',
  'Pie',
  'Scatter',
  'Radar',
  'Column',
  'Funnel',
  'Waterfall',
  'Boxplot',
  'Violin',
  'Histogram',
  'Sankey',
  'Treemap',
  'Venn',
  'Table',
  'Dual Axes',
  'Liquid',
  'Word Cloud',
  'Flow Diagram',
  'Network Graph',
  'Mindmap',
  'Indented Tree',
  'Organization Chart',
  'Summary',
];

const frameworks = [
  {
    icon: '⚛️',
    name: 'React',
    description: 'Full support for React 18+ with hooks integration',
    install: 'npm install @antv/gpt-vis',
  },
  {
    icon: '🟢',
    name: 'Vue',
    description: 'Compatible with Vue 3 composition API',
    install: 'npm install @antv/gpt-vis',
  },
  {
    icon: '📦',
    name: 'Vanilla JS',
    description: 'Use with plain JavaScript, no framework required',
    install: 'npm install @antv/gpt-vis',
  },
];

function getChartIcon(chart: string): string {
  const icons: Record<string, string> = {
    Line: '📈',
    Bar: '📊',
    Area: '🌊',
    Pie: '🥧',
    Scatter: '⚫',
    Radar: '🎯',
    Column: '📊',
    Funnel: '🔻',
    Waterfall: '🌊',
    Boxplot: '📦',
    Violin: '🎻',
    Histogram: '📊',
    Sankey: '🌀',
    Treemap: '🗺️',
    Venn: '⭕',
    Table: '📋',
    'Dual Axes': '📉',
    Liquid: '💧',
    'Word Cloud': '☁️',
    'Flow Diagram': '🔄',
    'Network Graph': '🕸️',
    Mindmap: '🧠',
    'Indented Tree': '🌳',
    'Organization Chart': '🏢',
    Summary: '📝',
  };
  return icons[chart] || '📊';
}
