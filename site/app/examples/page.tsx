import Link from "next/link";

export const metadata = {
  title: "Examples - GPT-Vis",
  description: "Explore 20+ visualization examples with GPT-Vis. Interactive demos and code snippets for every chart type.",
};

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#691eff] to-[#8e5aff] flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
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

      <div className="pt-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Examples Gallery</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our collection of 20+ AI-friendly chart types with interactive examples
          </p>
        </div>

        {/* Examples Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <div
                key={index}
                id={example.name.toLowerCase().replace(/\s+/g, "-")}
                className="bg-white rounded-2xl border border-gray-200 hover:border-[#691eff] hover:shadow-xl hover:shadow-[#691eff]/10 transition-all overflow-hidden group scroll-mt-24"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{example.icon}</div>
                    <h3 className="text-2xl font-semibold text-gray-900">{example.name}</h3>
                  </div>
                  <p className="text-gray-600">{example.description}</p>
                </div>

                {/* Preview Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#691eff]/5 to-transparent flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{example.icon}</div>
                    <p className="text-sm text-gray-500">Chart Preview Area</p>
                  </div>
                </div>

                {/* Code Examples */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Example Syntax:</h4>
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
                      <code>{example.syntax}</code>
                    </pre>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="text-xs px-3 py-1 bg-[#691eff]/10 text-[#691eff] rounded-full">
                      {example.category}
                    </span>
                    <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                      AI-Friendly
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-20 bg-gradient-to-br from-[#691eff] to-[#8e5aff] rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need More Examples?</h2>
            <p className="text-xl mb-8 text-white/90">
              Check out our comprehensive documentation for advanced usage and customization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="px-8 py-4 bg-white text-[#691eff] rounded-full hover:bg-gray-100 transition-all shadow-xl font-medium"
              >
                Read Documentation
              </Link>
              <a
                href="https://github.com/antvis/GPT-Vis/tree/main/knowledges"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent text-white rounded-full hover:bg-white/10 transition-all border-2 border-white font-medium"
              >
                View Knowledge Base
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const examples = [
  {
    name: "Line Chart",
    icon: "📈",
    description: "Perfect for time series and trend analysis",
    category: "Statistical",
    syntax: `vis line
title Sales Trend 2020-2023
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
  - time 2023
    value 180`,
  },
  {
    name: "Bar Chart",
    icon: "📊",
    description: "Compare values across categories",
    category: "Statistical",
    syntax: `vis bar
data
  - category Product A
    value 120
  - category Product B
    value 95
  - category Product C
    value 150`,
  },
  {
    name: "Area Chart",
    icon: "🌊",
    description: "Show volume and trend over time",
    category: "Statistical",
    syntax: `vis area
data
  - time Jan
    value 30
  - time Feb
    value 45
  - time Mar
    value 60
  - time Apr
    value 50`,
  },
  {
    name: "Pie Chart",
    icon: "🥧",
    description: "Display part-to-whole relationships",
    category: "Statistical",
    syntax: `vis pie
data
  - category Sales
    value 30
  - category Marketing
    value 25
  - category Engineering
    value 45
innerRadius 0.6`,
  },
  {
    name: "Scatter Plot",
    icon: "⚫",
    description: "Visualize correlation between variables",
    category: "Statistical",
    syntax: `vis scatter
data
  - x 10
    y 20
    size 5
  - x 15
    y 25
    size 8
  - x 20
    y 30
    size 6`,
  },
  {
    name: "Radar Chart",
    icon: "🎯",
    description: "Multi-dimensional data comparison",
    category: "Statistical",
    syntax: `vis radar
data
  - metric Speed
    value 80
  - metric Power
    value 90
  - metric Agility
    value 70
  - metric Defense
    value 85`,
  },
  {
    name: "Column Chart",
    icon: "📊",
    description: "Vertical comparison of values",
    category: "Statistical",
    syntax: `vis column
data
  - month Jan
    sales 1200
  - month Feb
    sales 1500
  - month Mar
    sales 1800`,
  },
  {
    name: "Funnel Chart",
    icon: "🔻",
    description: "Visualize process stages",
    category: "Statistical",
    syntax: `vis funnel
data
  - stage Visits
    value 10000
  - stage Sign Ups
    value 5000
  - stage Purchases
    value 2000`,
  },
  {
    name: "Waterfall Chart",
    icon: "🌊",
    description: "Show cumulative effect of values",
    category: "Statistical",
    syntax: `vis waterfall
data
  - category Start
    value 100
  - category Add
    value 50
  - category Subtract
    value -30
  - category Total
    value 120`,
  },
  {
    name: "Boxplot",
    icon: "📦",
    description: "Statistical distribution visualization",
    category: "Statistical",
    syntax: `vis boxplot
data
  - category Group A
    values 10 20 30 40 50
  - category Group B
    values 15 25 35 45 55`,
  },
  {
    name: "Violin Plot",
    icon: "🎻",
    description: "Distribution density visualization",
    category: "Statistical",
    syntax: `vis violin
data
  - category Dataset A
    values 10 15 20 25 30 35
  - category Dataset B
    values 12 18 24 30 36 42`,
  },
  {
    name: "Histogram",
    icon: "📊",
    description: "Frequency distribution of data",
    category: "Statistical",
    syntax: `vis histogram
data
  - value 10
  - value 15
  - value 20
  - value 25
  - value 30
binWidth 5`,
  },
  {
    name: "Sankey Diagram",
    icon: "🌀",
    description: "Flow and transition visualization",
    category: "Relationship",
    syntax: `vis sankey
data
  - source A
    target X
    value 10
  - source A
    target Y
    value 20
  - source B
    target Y
    value 15`,
  },
  {
    name: "Treemap",
    icon: "🗺️",
    description: "Hierarchical data with nested rectangles",
    category: "Relationship",
    syntax: `vis treemap
data
  - name Total
    value 100
    children
      - name Category A
        value 40
      - name Category B
        value 60`,
  },
  {
    name: "Venn Diagram",
    icon: "⭕",
    description: "Set relationships and intersections",
    category: "Relationship",
    syntax: `vis venn
data
  - sets A
    size 10
  - sets B
    size 12
  - sets A B
    size 5`,
  },
  {
    name: "Network Graph",
    icon: "🕸️",
    description: "Node and edge relationships",
    category: "Relationship",
    syntax: `vis network-graph
data
  nodes
    - id 1
      name Node A
    - id 2
      name Node B
  edges
    - source 1
      target 2`,
  },
  {
    name: "Mind Map",
    icon: "🧠",
    description: "Hierarchical thinking and brainstorming",
    category: "Relationship",
    syntax: `vis mind-map
data
  - name Project
    children
      - name Phase 1
        children
          - name Task A
          - name Task B
      - name Phase 2`,
  },
  {
    name: "Flow Diagram",
    icon: "➡️",
    description: "Process flow visualization",
    category: "Relationship",
    syntax: `vis flow-diagram
data
  - id 1
    name Start
    next 2
  - id 2
    name Process
    next 3
  - id 3
    name End`,
  },
  {
    name: "Organization Chart",
    icon: "🏢",
    description: "Organizational structure",
    category: "Relationship",
    syntax: `vis organization-chart
data
  - name CEO
    children
      - name CTO
      - name CFO
      - name CMO`,
  },
  {
    name: "Table",
    icon: "📋",
    description: "Structured data display",
    category: "Display",
    syntax: `vis table
data
  - name Product A
    price 100
    stock 50
  - name Product B
    price 150
    stock 30`,
  },
];
