"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
              Explore 20 AI-friendly chart types with comprehensive knowledge base and examples
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
                      <p className="text-gray-600 mt-1">{chart.description}</p>
                    </div>
                  </div>

                  {/* Knowledge Base */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-8 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Knowledge Base</h3>
                    
                    {/* Introduction */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Introduction</h4>
                      <p className="text-gray-700">{chart.knowledge.introduction}</p>
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
                            {chart.knowledge.config.map((config, idx) => (
                              <tr key={idx} className="border-t border-gray-200">
                                <td className="px-4 py-3 font-mono text-[#691eff]">{config.property}</td>
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
                      {chart.examples.map((example, exIdx) => (
                        <div key={exIdx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#691eff] transition-colors">
                          {/* Example Header */}
                          <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                            <h4 className="font-semibold text-gray-900">{example.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                          </div>

                          {/* Split View */}
                          <div className="grid md:grid-cols-2 divide-x divide-gray-200">
                            {/* Left: Preview */}
                            <div className="bg-gradient-to-br from-[#691eff]/5 to-transparent p-8 flex items-center justify-center min-h-[250px]">
                              <div className="text-center">
                                <div className="text-6xl mb-4">{chart.icon}</div>
                                <p className="text-sm text-gray-500">Chart Preview</p>
                              </div>
                            </div>

                            {/* Right: Code */}
                            <div className="relative bg-gray-900 p-6">
                              <button
                                onClick={() => copyCode(example.code, `${chart.id}-${exIdx}`)}
                                className="absolute top-4 right-4 px-3 py-1.5 bg-[#691eff] hover:bg-[#5517d8] text-white text-xs rounded-lg transition-colors"
                              >
                                {copiedIndex === `${chart.id}-${exIdx}` ? "Copied!" : "Copy"}
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
    id: "line-chart",
    name: "Line Chart",
    icon: "📈",
    description: "Perfect for time series and trend analysis",
    knowledge: {
      introduction: "Line charts connect data points with continuous lines, making them ideal for displaying trends over time. They excel at showing how values change across sequential intervals and help identify patterns, growth, or decline.",
      useCases: [
        "Tracking sales, revenue, or performance metrics over time",
        "Displaying stock prices and financial trends",
        "Monitoring website traffic or user engagement metrics",
        "Showing temperature changes or weather patterns"
      ],
      config: [
        { property: "title", type: "string", description: "Chart title displayed at the top" },
        { property: "xAxis", type: "string", description: "Label for the horizontal axis" },
        { property: "yAxis", type: "string", description: "Label for the vertical axis" },
        { property: "smooth", type: "boolean", description: "Enable smooth curve interpolation" },
        { property: "lineWidth", type: "number", description: "Width of the line in pixels" }
      ]
    },
    examples: [
      {
        title: "Basic Time Series",
        description: "Simple line chart showing quarterly revenue growth",
        code: `vis line
title Quarterly Revenue 2023
data
  - time Q1
    value 120
  - time Q2
    value 145
  - time Q3
    value 168
  - time Q4
    value 195`
      },
      {
        title: "Multi-Line Comparison",
        description: "Compare multiple data series on the same chart",
        code: `vis line
title Product Sales Comparison
data
  - time Jan
    product_a 80
    product_b 65
  - time Feb
    product_a 95
    product_b 72
  - time Mar
    product_a 110
    product_b 88`
      },
      {
        title: "Smooth Curve",
        description: "Line chart with smooth interpolation",
        code: `vis line
smooth true
data
  - time 2020
    value 100
  - time 2021
    value 125
  - time 2022
    value 150
  - time 2023
    value 180`
      }
    ]
  },
  {
    id: "bar-chart",
    name: "Bar Chart",
    icon: "📊",
    description: "Compare values across categories",
    knowledge: {
      introduction: "Bar charts display data using horizontal or vertical rectangular bars, with lengths proportional to the values they represent.",
      useCases: [
        "Comparing sales figures across different products",
        "Showing survey results or poll responses",
        "Displaying categorical data like market share",
        "Ranking items by performance"
      ],
      config: [
        { property: "orientation", type: "string", description: "Bar orientation: 'horizontal' or 'vertical'" },
        { property: "barWidth", type: "number", description: "Width of each bar" },
        { property: "color", type: "string", description: "Bar color (hex or named color)" },
        { property: "sorted", type: "boolean", description: "Sort bars by value" }
      ]
    },
    examples: [
      { 
        title: "Product Comparison", 
        description: "Compare sales across categories", 
        code: `vis bar
data
  - category Laptops
    value 1250
  - category Phones
    value 980
  - category Tablets
    value 675` 
      },
      { 
        title: "Sorted Rankings", 
        description: "Bar chart sorted by value", 
        code: `vis bar
sorted true
data
  - team Team A
    score 85
  - team Team B
    score 92
  - team Team C
    score 78` 
      },
      { 
        title: "Grouped Bars", 
        description: "Compare multiple metrics", 
        code: `vis bar
data
  - region North
    revenue 450
    expenses 320
  - region South
    revenue 380
    expenses 280` 
      }
    ]
  },
  {
    id: "area-chart",
    name: "Area Chart",
    icon: "🌊",
    description: "Show volume and trend over time",
    knowledge: {
      introduction: "Area charts fill the area beneath lines, emphasizing magnitude of change over time.",
      useCases: [
        "Visualizing cumulative sales over time",
        "Showing resource usage or capacity",
        "Displaying stacked data composition",
        "Highlighting volume trends"
      ],
      config: [
        { property: "stacked", type: "boolean", description: "Stack multiple areas" },
        { property: "opacity", type: "number", description: "Fill opacity (0 to 1)" },
        { property: "smooth", type: "boolean", description: "Enable smooth curves" },
        { property: "gradient", type: "boolean", description: "Use gradient fill" }
      ]
    },
    examples: [
      { 
        title: "Single Area", 
        description: "Website traffic over time", 
        code: `vis area
title Website Visitors
data
  - month Jan
    visitors 15000
  - month Feb
    visitors 18500
  - month Mar
    visitors 22000
  - month Apr
    visitors 25500` 
      },
      { 
        title: "Stacked Areas", 
        description: "Show composition of sources", 
        code: `vis area
stacked true
data
  - month Jan
    organic 8000
    paid 5000
    social 2000
  - month Feb
    organic 10000
    paid 6000
    social 2500` 
      },
      { 
        title: "Gradient Fill", 
        description: "Area with gradient effect", 
        code: `vis area
gradient true
opacity 0.6
data
  - time 9AM
    value 45
  - time 12PM
    value 78
  - time 3PM
    value 92
  - time 6PM
    value 68` 
      }
    ]
  },
  {
    id: "pie-chart",
    name: "Pie Chart",
    icon: "🥧",
    description: "Display part-to-whole relationships",
    knowledge: {
      introduction: "Pie charts divide a circle into slices to show proportions of a whole.",
      useCases: [
        "Showing market share distribution",
        "Displaying budget allocation",
        "Visualizing demographic breakdowns",
        "Illustrating survey proportions"
      ],
      config: [
        { property: "innerRadius", type: "number", description: "Create donut chart" },
        { property: "startAngle", type: "number", description: "Starting angle" },
        { property: "showLabels", type: "boolean", description: "Display labels" },
        { property: "showPercent", type: "boolean", description: "Show percentages" }
      ]
    },
    examples: [
      { 
        title: "Market Share", 
        description: "Market share distribution", 
        code: `vis pie
title Market Share 2023
data
  - company Company A
    value 35
  - company Company B
    value 28
  - company Company C
    value 22
  - company Others
    value 15` 
      },
      { 
        title: "Donut Chart", 
        description: "Pie with center hole", 
        code: `vis pie
innerRadius 0.6
data
  - category Design
    value 30
  - category Development
    value 45
  - category Marketing
    value 25` 
      },
      { 
        title: "Budget Breakdown", 
        description: "Department budgets", 
        code: `vis pie
showPercent true
data
  - dept Engineering
    budget 450000
  - dept Sales
    budget 320000
  - dept Marketing
    budget 280000
  - dept Operations
    budget 180000` 
      }
    ]
  },
  {
    id: "scatter-plot",
    name: "Scatter Plot",
    icon: "⚫",
    description: "Visualize correlation between variables",
    knowledge: {
      introduction: "Scatter plots use dots to represent values for two variables, revealing relationships and correlations.",
      useCases: [
        "Analyzing correlation between metrics",
        "Identifying outliers in datasets",
        "Showing distribution patterns",
        "Comparing performance dimensions"
      ],
      config: [
        { property: "pointSize", type: "number", description: "Size of points" },
        { property: "pointColor", type: "string", description: "Color of points" },
        { property: "showTrendLine", type: "boolean", description: "Display regression line" },
        { property: "xScale", type: "string", description: "X-axis scale type" }
      ]
    },
    examples: [
      { title: "Price vs Sales", description: "Price-sales correlation", code: `vis scatter\ndata\n  - price 25\n    sales 450\n  - price 30\n    sales 380` },
      { title: "Bubble Chart", description: "Scatter with variable sizes", code: `vis scatter\ndata\n  - x 10\n    y 20\n    size 15` },
      { title: "Multi-Category", description: "Color-coded categories", code: `vis scatter\ndata\n  - x 15\n    y 32\n    category Type A` }
    ]
  },
  {
    id: "radar-chart",
    name: "Radar Chart",
    icon: "🎯",
    description: "Multi-dimensional data comparison",
    knowledge: {
      introduction: "Radar charts display multivariate data on axes from a central point.",
      useCases: [
        "Comparing product features",
        "Performance evaluations across skills",
        "Competitive positioning analysis",
        "Balanced scorecards and KPIs"
      ],
      config: [
        { property: "fillOpacity", type: "number", description: "Fill transparency" },
        { property: "strokeWidth", type: "number", description: "Line thickness" },
        { property: "showPoints", type: "boolean", description: "Display data points" },
        { property: "levels", type: "number", description: "Number of grid levels" }
      ]
    },
    examples: [
      { title: "Product Comparison", description: "Compare features", code: `vis radar\ndata\n  - metric Performance\n    product_a 85\n    product_b 72` },
      { title: "Skill Assessment", description: "Employee skills", code: `vis radar\ndata\n  - skill Technical\n    score 85\n  - skill Communication\n    score 78` },
      { title: "Multi-Series", description: "Compare entities", code: `vis radar\ndata\n  - dimension Speed\n    team_a 80\n    team_b 70` }
    ]
  },
  {
    id: "column-chart",
    name: "Column Chart",
    icon: "📊",
    description: "Vertical comparison of values",
    knowledge: {
      introduction: "Column charts display data using vertical columns for time-based or categorical comparison.",
      useCases: [
        "Displaying monthly performance",
        "Showing year-over-year comparisons",
        "Comparing values across time periods",
        "Grouped categorical data"
      ],
      config: [
        { property: "columnWidth", type: "number", description: "Width of columns" },
        { property: "spacing", type: "number", description: "Space between columns" },
        { property: "grouped", type: "boolean", description: "Group columns" },
        { property: "stacked", type: "boolean", description: "Stack columns" }
      ]
    },
    examples: [
      { title: "Monthly Sales", description: "Track monthly performance", code: `vis column\ndata\n  - month Jan\n    sales 32000\n  - month Feb\n    sales 38000` },
      { title: "Grouped Columns", description: "Side-by-side metrics", code: `vis column\ngrouped true\ndata\n  - quarter Q1\n    revenue 450\n    expenses 320` },
      { title: "Stacked Columns", description: "Show composition", code: `vis column\nstacked true\ndata\n  - month Jan\n    online 15000\n    retail 12000` }
    ]
  },
  {
    id: "funnel-chart",
    name: "Funnel Chart",
    icon: "🔻",
    description: "Visualize process stages",
    knowledge: {
      introduction: "Funnel charts show values across process stages to identify bottlenecks and conversion rates.",
      useCases: [
        "Sales pipeline visualization",
        "Marketing funnel analysis",
        "User onboarding flow",
        "Approval process tracking"
      ],
      config: [
        { property: "shape", type: "string", description: "Funnel shape" },
        { property: "showPercent", type: "boolean", description: "Show percentage drops" },
        { property: "dynamicHeight", type: "boolean", description: "Adjust height by value" },
        { property: "gap", type: "number", description: "Spacing between stages" }
      ]
    },
    examples: [
      { title: "Sales Funnel", description: "Track leads through stages", code: `vis funnel\ndata\n  - stage Leads\n    value 10000\n  - stage Qualified\n    value 4500` },
      { title: "User Conversion", description: "Website conversion", code: `vis funnel\nshowPercent true\ndata\n  - stage Visitors\n    value 50000` },
      { title: "Application Process", description: "Job application funnel", code: `vis funnel\ndata\n  - stage Applications\n    value 1200` }
    ]
  },
  {
    id: "waterfall-chart",
    name: "Waterfall Chart",
    icon: "🌊",
    description: "Show cumulative effect of values",
    knowledge: {
      introduction: "Waterfall charts show how an initial value is affected by sequential positive and negative changes.",
      useCases: [
        "Financial profit/loss breakdown",
        "Budget variance analysis",
        "Inventory changes over time",
        "Revenue/expense analysis"
      ],
      config: [
        { property: "startLabel", type: "string", description: "Starting value label" },
        { property: "endLabel", type: "string", description: "Ending value label" },
        { property: "positiveColor", type: "string", description: "Color for increases" },
        { property: "negativeColor", type: "string", description: "Color for decreases" }
      ]
    },
    examples: [
      { title: "Profit Analysis", description: "Break down profit changes", code: `vis waterfall\ndata\n  - category Revenue\n    value 500000\n  - category Costs\n    value -180000` },
      { title: "Budget Variance", description: "Planned vs actual", code: `vis waterfall\ndata\n  - item Planned\n    value 100000\n  - item Savings\n    value 15000` },
      { title: "Cash Flow", description: "Monthly cash changes", code: `vis waterfall\ndata\n  - month Start\n    value 50000\n  - month Jan\n    value 12000` }
    ]
  },
  {
    id: "boxplot",
    name: "Boxplot",
    icon: "📦",
    description: "Statistical distribution visualization",
    knowledge: {
      introduction: "Boxplots display data distribution through quartiles, showing median, quartiles, and outliers.",
      useCases: [
        "Comparing distributions across categories",
        "Identifying outliers and spread",
        "Statistical analysis and quality control",
        "A/B test result visualization"
      ],
      config: [
        { property: "showOutliers", type: "boolean", description: "Display outlier points" },
        { property: "whiskerExtent", type: "number", description: "Whisker length multiplier" },
        { property: "boxWidth", type: "number", description: "Width of boxes" },
        { property: "orientation", type: "string", description: "Layout orientation" }
      ]
    },
    examples: [
      { title: "Test Scores", description: "Compare score distributions", code: `vis boxplot\ndata\n  - group Class A\n    values 65 72 78 82 85 88 90` },
      { title: "Response Times", description: "Analyze response times", code: `vis boxplot\nshowOutliers true\ndata\n  - server Server 1\n    values 120 145 160 175` },
      { title: "Price Analysis", description: "Compare price ranges", code: `vis boxplot\ndata\n  - category Budget\n    values 15 18 22 25 28` }
    ]
  },
  {
    id: "violin-plot",
    name: "Violin Plot",
    icon: "🎻",
    description: "Distribution density visualization",
    knowledge: {
      introduction: "Violin plots combine box plots with kernel density plots showing full distribution shape.",
      useCases: [
        "Comparing complex distributions",
        "Showing multimodal distributions",
        "Statistical analysis presentations",
        "Scientific data visualization"
      ],
      config: [
        { property: "showBox", type: "boolean", description: "Include box plot inside" },
        { property: "bandwidth", type: "number", description: "Kernel density bandwidth" },
        { property: "scale", type: "string", description: "Scale method" },
        { property: "split", type: "boolean", description: "Split violin for comparison" }
      ]
    },
    examples: [
      { title: "Age Distribution", description: "Age by department", code: `vis violin\ndata\n  - dept Engineering\n    values 24 26 28 29 31 32 34` },
      { title: "Performance Metrics", description: "Compare distributions", code: `vis violin\nshowBox true\ndata\n  - team Team A\n    values 68 72 75 78 80` },
      { title: "Split Violin", description: "Side-by-side comparison", code: `vis violin\nsplit true\ndata\n  - category Q1\n    group_a 45 48 52` }
    ]
  },
  {
    id: "histogram",
    name: "Histogram",
    icon: "📊",
    description: "Frequency distribution of data",
    knowledge: {
      introduction: "Histograms display data distribution by dividing into bins and showing frequency per bin.",
      useCases: [
        "Analyzing data distributions",
        "Quality control monitoring",
        "Understanding behavior patterns",
        "Statistical hypothesis testing"
      ],
      config: [
        { property: "binWidth", type: "number", description: "Width of each bin" },
        { property: "binCount", type: "number", description: "Number of bins" },
        { property: "showDensity", type: "boolean", description: "Show density curve" },
        { property: "cumulative", type: "boolean", description: "Display cumulative" }
      ]
    },
    examples: [
      { title: "Age Distribution", description: "Customer ages", code: `vis histogram\nbinWidth 5\ndata\n  - value 22\n  - value 25\n  - value 28` },
      { title: "Response Times", description: "API response times", code: `vis histogram\nbinWidth 50\ndata\n  - value 120\n  - value 145` },
      { title: "Score Distribution", description: "Test score frequency", code: `vis histogram\nbinCount 10\ndata\n  - value 65\n  - value 72` }
    ]
  },
  {
    id: "sankey-diagram",
    name: "Sankey Diagram",
    icon: "🌀",
    description: "Flow and transition visualization",
    knowledge: {
      introduction: "Sankey diagrams visualize flows between nodes with link widths proportional to flow quantities.",
      useCases: [
        "Energy flow and resource allocation",
        "Customer journey analysis",
        "Budget flow visualization",
        "Supply chain mapping"
      ],
      config: [
        { property: "nodeWidth", type: "number", description: "Width of nodes" },
        { property: "nodePadding", type: "number", description: "Vertical node spacing" },
        { property: "linkOpacity", type: "number", description: "Link transparency" },
        { property: "align", type: "string", description: "Node alignment" }
      ]
    },
    examples: [
      { title: "Traffic Sources", description: "Website traffic flow", code: `vis sankey\ndata\n  - source Organic\n    target Homepage\n    value 5000` },
      { title: "Energy Distribution", description: "Energy flow in system", code: `vis sankey\ndata\n  - source Production\n    target Residential\n    value 450` },
      { title: "Budget Allocation", description: "Department budget flow", code: `vis sankey\ndata\n  - source Total Budget\n    target Engineering\n    value 450` }
    ]
  },
  {
    id: "treemap",
    name: "Treemap",
    icon: "🗺️",
    description: "Hierarchical data with nested rectangles",
    knowledge: {
      introduction: "Treemaps display hierarchical data as nested rectangles with area proportional to value.",
      useCases: [
        "File system storage visualization",
        "Portfolio composition analysis",
        "Market cap by sector",
        "Revenue breakdown by category"
      ],
      config: [
        { property: "tile", type: "string", description: "Tiling algorithm" },
        { property: "padding", type: "number", description: "Rectangle padding" },
        { property: "showLabels", type: "boolean", description: "Display labels" },
        { property: "colorBy", type: "string", description: "Color encoding" }
      ]
    },
    examples: [
      { title: "Market Cap", description: "Market cap by sector", code: `vis treemap\ndata\n  - name Technology\n    value 5200` },
      { title: "Storage Usage", description: "Disk space by category", code: `vis treemap\ndata\n  - name Documents\n    value 450` },
      { title: "Sales Breakdown", description: "Revenue by category", code: `vis treemap\ncolorBy value\ndata\n  - name Electronics\n    value 4500` }
    ]
  },
  {
    id: "venn-diagram",
    name: "Venn Diagram",
    icon: "⭕",
    description: "Set relationships and intersections",
    knowledge: {
      introduction: "Venn diagrams use overlapping circles to show relationships between sets.",
      useCases: [
        "Showing common features",
        "Customer segment overlap",
        "Skill set comparisons",
        "Market overlap analysis"
      ],
      config: [
        { property: "opacity", type: "number", description: "Circle fill opacity" },
        { property: "strokeWidth", type: "number", description: "Border width" },
        { property: "showLabels", type: "boolean", description: "Display labels" },
        { property: "showValues", type: "boolean", description: "Show values" }
      ]
    },
    examples: [
      { title: "Feature Comparison", description: "Product feature overlap", code: `vis venn\ndata\n  - sets Product A\n    size 20\n  - sets Product B\n    size 18` },
      { title: "Customer Segments", description: "Segment overlap", code: `vis venn\ndata\n  - sets Online\n    size 5000\n  - sets In-Store\n    size 4200` },
      { title: "Skill Sets", description: "Employee skill overlap", code: `vis venn\nshowValues true\ndata\n  - sets Frontend\n    size 35` }
    ]
  },
  {
    id: "network-graph",
    name: "Network Graph",
    icon: "🕸️",
    description: "Node and edge relationships",
    knowledge: {
      introduction: "Network graphs visualize relationships using nodes and edges, revealing network structure.",
      useCases: [
        "Social network analysis",
        "Organizational relationships",
        "System architecture dependencies",
        "Knowledge graphs"
      ],
      config: [
        { property: "layout", type: "string", description: "Layout algorithm" },
        { property: "nodeSize", type: "number", description: "Default node size" },
        { property: "edgeWidth", type: "number", description: "Edge thickness" },
        { property: "directed", type: "boolean", description: "Show direction arrows" }
      ]
    },
    examples: [
      { 
        title: "Social Network", 
        description: "User connections", 
        code: `vis network-graph
title User Connections
data
  nodes
    - id 1
      name Alice
      size 15
    - id 2
      name Bob
      size 12
    - id 3
      name Carol
      size 18
    - id 4
      name David
      size 10
  edges
    - source 1
      target 2
    - source 1
      target 3
    - source 2
      target 3
    - source 3
      target 4` 
      },
      { 
        title: "Dependency Graph", 
        description: "Component dependencies", 
        code: `vis network-graph
directed true
data
  nodes
    - id frontend
      name Frontend
    - id api
      name API Server
    - id database
      name Database
    - id cache
      name Cache
  edges
    - source frontend
      target api
    - source api
      target database
    - source api
      target cache` 
      },
      { 
        title: "Team Collaboration", 
        description: "Collaboration network", 
        code: `vis network-graph
layout force
data
  nodes
    - id 1
      name Project A
    - id 2
      name Project B
    - id 3
      name Team 1
    - id 4
      name Team 2
  edges
    - source 3
      target 1
      weight 5
    - source 3
      target 2
      weight 3
    - source 4
      target 2
      weight 7` 
      }
    ]
  },
  {
    id: "mind-map",
    name: "Mind Map",
    icon: "🧠",
    description: "Hierarchical thinking and brainstorming",
    knowledge: {
      introduction: "Mind maps organize information hierarchically around a central concept with radiating branches.",
      useCases: [
        "Project planning and task breakdown",
        "Brainstorming and idea organization",
        "Learning and knowledge organization",
        "Strategic planning"
      ],
      config: [
        { property: "centerNode", type: "string", description: "Central node label" },
        { property: "branchStyle", type: "string", description: "Branch style" },
        { property: "colorByLevel", type: "boolean", description: "Color by hierarchy" },
        { property: "collapsible", type: "boolean", description: "Allow collapsing" }
      ]
    },
    examples: [
      { title: "Project Planning", description: "Project breakdown", code: `vis mind-map\ndata\n  - name Product Launch\n    children\n      - name Marketing` },
      { title: "Learning Topics", description: "Course content", code: `vis mind-map\ndata\n  - name Web Development\n    children\n      - name Frontend` },
      { title: "Business Strategy", description: "Strategic planning", code: `vis mind-map\ncolorByLevel true\ndata\n  - name Growth Strategy` }
    ]
  },
  {
    id: "flow-diagram",
    name: "Flow Diagram",
    icon: "➡️",
    description: "Process flow visualization",
    knowledge: {
      introduction: "Flow diagrams map processes and workflows using shapes connected by arrows.",
      useCases: [
        "Business process mapping",
        "Algorithm flow visualization",
        "User flow and journey mapping",
        "Decision trees and workflows"
      ],
      config: [
        { property: "direction", type: "string", description: "Flow direction" },
        { property: "nodeShape", type: "string", description: "Default node shape" },
        { property: "edgeType", type: "string", description: "Edge type" },
        { property: "rankSpacing", type: "number", description: "Rank spacing" }
      ]
    },
    examples: [
      { title: "User Registration", description: "Registration flow", code: `vis flow-diagram\ndata\n  - id start\n    name Start\n    next validate` },
      { title: "Order Processing", description: "Order flow", code: `vis flow-diagram\ndirection LR\ndata\n  - id receive\n    name Receive Order` },
      { title: "Approval Workflow", description: "Document approval", code: `vis flow-diagram\ndata\n  - id submit\n    name Submit Document` }
    ]
  },
  {
    id: "organization-chart",
    name: "Organization Chart",
    icon: "🏢",
    description: "Organizational structure",
    knowledge: {
      introduction: "Organization charts display hierarchical organizational structures and reporting relationships.",
      useCases: [
        "Company structure visualization",
        "Team hierarchy display",
        "Department structure documentation",
        "Project team organization"
      ],
      config: [
        { property: "direction", type: "string", description: "Layout direction" },
        { property: "nodeWidth", type: "number", description: "Node width" },
        { property: "nodeHeight", type: "number", description: "Node height" },
        { property: "levelSpacing", type: "number", description: "Vertical spacing" }
      ]
    },
    examples: [
      { title: "Company Structure", description: "Executive team", code: `vis organization-chart\ndata\n  - name CEO\n    children\n      - name CTO\n      - name CFO` },
      { title: "Department Structure", description: "Engineering hierarchy", code: `vis organization-chart\ndata\n  - name VP Engineering\n    children\n      - name Manager Frontend` },
      { title: "Project Team", description: "Project organization", code: `vis organization-chart\ndirection LR\ndata\n  - name Project Manager` }
    ]
  },
  {
    id: "table",
    name: "Table",
    icon: "📋",
    description: "Structured data display",
    knowledge: {
      introduction: "Tables organize data in rows and columns for structured information display and comparison.",
      useCases: [
        "Detailed data listings and reports",
        "Comparing items across attributes",
        "Financial statements and pricing",
        "Database query results"
      ],
      config: [
        { property: "sortable", type: "boolean", description: "Enable column sorting" },
        { property: "filterable", type: "boolean", description: "Enable filtering" },
        { property: "pagination", type: "boolean", description: "Enable pagination" },
        { property: "pageSize", type: "number", description: "Rows per page" }
      ]
    },
    examples: [
      { title: "Product Catalog", description: "Product listing", code: `vis table\ndata\n  - name Laptop Pro\n    category Electronics\n    price 1299\n    stock 45` },
      { title: "Sales Report", description: "Monthly sales by region", code: `vis table\nsortable true\ndata\n  - region North\n    jan 45000\n    total 145000` },
      { title: "Employee Directory", description: "Employee information", code: `vis table\nfilterable true\npagination true\ndata\n  - name Alice Johnson\n    department Engineering` }
    ]
  }
];

