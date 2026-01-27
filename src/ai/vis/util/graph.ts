import { treeToGraphData as g6TreeToGraphData } from '@antv/g6';

/**
 * Tree data structure for hierarchical visualizations
 */
export interface TreeData {
  name: string;
  description?: string;
  children?: TreeData[];
  [key: string]: any;
}

/**
 * Convert tree data to G6 graph data format
 */
export function treeToGraphData(data: TreeData) {
  return g6TreeToGraphData(data, {
    getNodeData: (datum: any, depth: number) => {
      datum.id = datum.name;
      datum.depth = depth;
      if (!datum.children) return datum;
      const { children, ...restDatum } = datum;
      return {
        ...restDatum,
        children: children.map((child: any) => child.name),
      };
    },
    getEdgeData: (source, target) => ({
      source: source.name,
      target: target.name,
    }),
  });
}

/**
 * Get G6 theme configuration colors based on theme name
 */
export function getG6ThemeColors(theme: string): string[] {
  const ACADEMY_COLORS = [
    '#FF6B3B',
    '#626681',
    '#FFC100',
    '#9FB40F',
    '#76523B',
    '#DAD5B5',
    '#0E8E89',
    '#E19348',
    '#F383A2',
    '#247FEA',
  ];
  const DEFAULT_COLORS = [
    '#1783FF',
    '#00C9C9',
    '#F0884D',
    '#D580FF',
    '#7863FF',
    '#60C42D',
    '#BD8F24',
    '#FF80CA',
    '#2491B3',
    '#17C76F',
  ];

  switch (theme) {
    case 'academy':
      return ACADEMY_COLORS;
    case 'dark':
    case 'default':
    default:
      return DEFAULT_COLORS;
  }
}

/**
 * Get G6 theme transform configuration
 */
export function getG6ThemeTransform(theme: string) {
  return {
    type: 'assign-color-by-branch',
    colors: getG6ThemeColors(theme),
  };
}
