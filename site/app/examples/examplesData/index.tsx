import { areaChartData } from './area-chart';
import { barChartData } from './bar-chart';
import { boxplotData } from './boxplot';
import { columnChartData } from './column-chart';
import { dualAxesData } from './dual-axes';
import { fishboneDiagramData } from './fishbone-diagram';
import { flowDiagramData } from './flow-diagram';
import { funnelChartData } from './funnel-chart';
import { histogramData } from './histogram';
import { indentedTreeData } from './indented-tree';
import { lineChartData } from './line-chart';
import { liquidChartData } from './liquid-chart';
import { mindmapData } from './mindmap';
import { networkGraphData } from './network-graph';
import { organizationChartData } from './organization-chart';
import { pieChartData } from './pie-chart';
import { radarChartData } from './radar-chart';
import { sankeyDiagramData } from './sankey-diagram';
import { scatterChartData } from './scatter-chart';
import { summaryData } from './summary';
import { tableData } from './table';
import { treemapData } from './treemap';
import { vennDiagramData } from './venn-diagram';
import { violinChartData } from './violin-chart';
import { waterfallChartData } from './waterfall-chart';
import { wordcloudData } from './wordcloud';

export type ChartEntry =
  | typeof lineChartData
  | typeof columnChartData
  | typeof pieChartData
  | typeof areaChartData
  | typeof barChartData
  | typeof histogramData
  | typeof scatterChartData
  | typeof wordcloudData
  | typeof treemapData
  | typeof dualAxesData
  | typeof radarChartData
  | typeof liquidChartData
  | typeof funnelChartData
  | typeof sankeyDiagramData
  | typeof vennDiagramData
  | typeof boxplotData
  | typeof violinChartData
  | typeof waterfallChartData
  | typeof tableData
  | typeof summaryData
  | typeof flowDiagramData
  | typeof networkGraphData
  | typeof organizationChartData
  | typeof indentedTreeData
  | typeof mindmapData
  | typeof fishboneDiagramData;

export const groupedExamplesData = [
  {
    id: 'statistics',
    title: 'Statistics',
    charts: [
      lineChartData,
      columnChartData,
      pieChartData,
      areaChartData,
      barChartData,
      histogramData,
      scatterChartData,
      wordcloudData,
      treemapData,
      dualAxesData,
      radarChartData,
      liquidChartData,
      funnelChartData,
      sankeyDiagramData,
      vennDiagramData,
      boxplotData,
      violinChartData,
      waterfallChartData,
    ] as ChartEntry[],
  },
  {
    id: 'relationship',
    title: 'Relationship',
    charts: [
      flowDiagramData,
      networkGraphData,
      organizationChartData,
      indentedTreeData,
      mindmapData,
      fishboneDiagramData,
    ] as ChartEntry[],
  },
  {
    id: 'text',
    title: 'Text',
    charts: [tableData, summaryData] as ChartEntry[],
  },
];
