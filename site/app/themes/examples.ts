import type { ChartType } from '../../../src';
import { groupedExamplesData } from '../examples/examplesData';

export interface ThemeExample {
  type: ChartType;
  name: string;
  input: string | Record<string, unknown>;
  height: number;
  description: string;
}

const featuredCharts: [ChartType, number][] = [
  ['line', 340],
  ['pie', 300],
  ['summary', 240],
  ['column', 360],
  ['mindmap', 350],
  ['liquid', 260],
  ['area', 320],
  ['bar', 300],
  ['network-graph', 360],
  ['table', 330],
  ['scatter', 320],
  ['treemap', 300],
  ['radar', 350],
  ['word-cloud', 280],
  ['waterfall', 350],
  ['flow-diagram', 420],
  ['boxplot', 340],
  ['sankey', 320],
  ['funnel', 300],
  ['histogram', 320],
  ['organization-chart', 320],
  ['venn', 300],
  ['violin', 360],
  ['dual-axes', 340],
  ['indented-tree', 380],
  ['fishbone-diagram', 320],
];

const entries = groupedExamplesData.flatMap((group) => group.charts);

export const THEME_EXAMPLES: ThemeExample[] = featuredCharts.map(([type, height]) => {
  const entry = entries.find((chart) => chart.galleryJson.type === type)!;
  const input: Record<string, unknown> = structuredClone(entry.galleryJson);
  delete input.style;
  delete input.theme;
  delete input.subtitle;

  if (type === 'line' || type === 'area') {
    input.title = type === 'line' ? 'Ideas gaining momentum' : 'A growing ecosystem';
    input.data = ['Cloud', 'AI', 'Open source'].flatMap((group, series) =>
      [32, 44, 39, 61, 58, 78, 92].map((value, i) => ({
        time: String(2019 + i),
        value: Math.round(value * (1 - series * 0.23) + series * i * 2),
        group,
      })),
    );
    input.axisXTitle = false;
    input.axisYTitle = false;
  }
  if (type === 'column') {
    input.title = 'A year of building';
    input.data = ['Q1', 'Q2', 'Q3', 'Q4'].flatMap((category, i) =>
      ['Product', 'Research', 'Community'].map((group, j) => ({
        category,
        group,
        value: [36, 52, 48, 68][i] - j * 9,
      })),
    );
    input.stack = true;
    input.axisXTitle = false;
    input.axisYTitle = false;
  }
  if (type === 'pie') {
    input.title = 'Where ideas begin';
    input.data = [
      { category: 'Design', value: 38 },
      { category: 'Engineering', value: 32 },
      { category: 'Research', value: 20 },
      { category: 'Other', value: 10 },
    ];
    input.innerRadius = 0.58;
  }
  if (type === 'liquid') {
    input.title = 'Almost there';
    input.percent = 0.736;
  }
  if (type === 'network-graph') input.layout = 'circular';
  if (type === 'table') {
    input.title = 'The next chapter';
    input.data = [
      { Team: 'Design', Projects: 12, Growth: '+24%' },
      { Team: 'Engineering', Projects: 28, Growth: '+38%' },
      { Team: 'Research', Projects: 9, Growth: '+18%' },
      { Team: 'Community', Projects: 16, Growth: '+32%' },
    ];
  }
  if (type === 'boxplot' && Array.isArray(input.data))
    input.data.push({ category: 'Math', value: 200 });

  return {
    type,
    name: entry.name.replace(' Chart', '').replace(' Diagram', ''),
    input:
      type === 'summary'
        ? '# A little perspective\n\n[Great ideas](metric_name) reached [26 visual forms](metric_value, origin=26). One shared theme brings them together.\n\nCommunity contributions grew [38%](ratio_value, origin=0.38, assessment="positive"), making room for what comes next.'
        : input,
    height,
    description: entry.description,
  };
});
