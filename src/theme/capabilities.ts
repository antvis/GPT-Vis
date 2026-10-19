import type { ChartStyleMap, ChartType } from '../types/chart';
import type { ChartStyle } from '../types/style';
import type { ThemeChartExtraConfig } from '../types/theme';

type ThemeComponent = Exclude<
  keyof ChartStyle,
  'backgroundColor' | 'palette' | 'mark' | 'node' | 'edge'
>;
type ThemeMark = keyof NonNullable<ChartStyle['mark']>;
type ThemeElement = Extract<keyof ChartStyle, 'node' | 'edge'>;

type ThemeStylePropertyFor<T extends ChartType> = Exclude<
  keyof ChartStyleMap[T],
  ThemeComponent | 'mark' | 'node' | 'edge'
>;
type ThemeStyleProperty = {
  [T in ChartType]: ThemeStylePropertyFor<T>;
}[ChartType];

type ThemeComponentFor<T extends ChartType> = Extract<keyof ChartStyleMap[T], ThemeComponent>;
type ThemeMarkFor<T extends ChartType> = 'mark' extends keyof ChartStyleMap[T]
  ? Extract<keyof NonNullable<ChartStyleMap[T]['mark']>, ThemeMark>
  : never;
type ThemeElementFor<T extends ChartType> = Extract<keyof ChartStyleMap[T], ThemeElement>;
type ThemeConfigKeyFor<T extends ChartType> = keyof ThemeChartExtraConfig<T>;
type ThemeConfigKey = {
  [T in ChartType]: ThemeConfigKeyFor<T>;
}[ChartType];

interface ChartThemeCapabilities {
  /** Visual configuration outside the chart's `style` object. */
  config: readonly ThemeConfigKey[];
  /** Direct chart-level visual properties. */
  properties: readonly ThemeStyleProperty[];
  /** Structured component style blocks. */
  components: readonly ThemeComponent[];
  /** G2 marks nested under `style.mark`. */
  marks: readonly ThemeMark[];
  /** G6 elements exposed as top-level node and edge styles. */
  elements: readonly ThemeElement[];
}

type ChartThemeCapabilityDefinition<T extends ChartType> = {
  config: readonly ThemeConfigKeyFor<T>[];
  properties: readonly ThemeStylePropertyFor<T>[];
  components: readonly ThemeComponentFor<T>[];
  marks: readonly ThemeMarkFor<T>[];
  elements: readonly ThemeElementFor<T>[];
};

type ChartThemeCapabilityDefinitionMap = {
  [T in ChartType]: ChartThemeCapabilityDefinition<T>;
};

const BASE_PROPERTIES = ['backgroundColor', 'palette'] as const;
const CARTESIAN_COMPONENTS = ['title', 'axis', 'legend', 'label'] as const;
const BASE_COMPONENTS = ['title'] as const;

const freezeCapabilityRegistry = (
  definitions: ChartThemeCapabilityDefinitionMap,
): Readonly<Record<ChartType, ChartThemeCapabilities>> => {
  const entries = Object.entries(definitions).map(([type, capability]) => [
    type,
    Object.freeze({
      config: Object.freeze([...capability.config]),
      properties: Object.freeze([...capability.properties]),
      components: Object.freeze([...capability.components]),
      marks: Object.freeze([...capability.marks]),
      elements: Object.freeze([...capability.elements]),
    }),
  ]);

  return Object.freeze(Object.fromEntries(entries)) as Readonly<
    Record<ChartType, ChartThemeCapabilities>
  >;
};

/**
 * Recommended ThemeSpec V1 surface for every chart type. Deprecated
 * compatibility fields are intentionally omitted from this runtime registry.
 */
const CAPABILITY_DEFINITIONS = {
  area: {
    config: [],
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['area', 'line', 'point'],
    elements: [],
  },
  bar: {
    config: [],
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['interval'],
    elements: [],
  },
  boxplot: {
    config: [],
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['box', 'point'],
    elements: [],
  },
  column: {
    config: [],
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['interval'],
    elements: [],
  },
  'dual-axes': {
    config: [],
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['interval', 'line'],
    elements: [],
  },
  'fishbone-diagram': {
    config: [],
    properties: [...BASE_PROPERTIES, 'texture'],
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  'flow-diagram': {
    config: [],
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['edge'],
  },
  funnel: {
    config: [],
    properties: BASE_PROPERTIES,
    components: ['title', 'label'],
    marks: ['interval', 'connector'],
    elements: [],
  },
  histogram: {
    config: [],
    properties: BASE_PROPERTIES,
    components: ['title', 'axis'],
    marks: ['interval'],
    elements: [],
  },
  'indented-tree': {
    config: [],
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  line: {
    config: [],
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['line', 'point'],
    elements: [],
  },
  liquid: {
    config: [],
    properties: BASE_PROPERTIES,
    components: ['title', 'label'],
    marks: ['liquid'],
    elements: [],
  },
  mindmap: {
    config: [],
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  'network-graph': {
    config: [],
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  'organization-chart': {
    config: [],
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  pie: {
    config: ['innerRadius'],
    properties: BASE_PROPERTIES,
    components: ['title', 'legend', 'label'],
    marks: ['interval'],
    elements: [],
  },
  radar: {
    config: [],
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['line'],
    elements: [],
  },
  sankey: {
    config: [],
    properties: BASE_PROPERTIES,
    components: ['title', 'label'],
    marks: ['sankey'],
    elements: [],
  },
  scatter: {
    config: [],
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['point'],
    elements: [],
  },
  summary: {
    config: [],
    properties: ['backgroundColor'],
    components: ['summary'],
    marks: [],
    elements: [],
  },
  table: {
    config: [],
    properties: ['backgroundColor'],
    components: ['title', 'table'],
    marks: [],
    elements: [],
  },
  treemap: {
    config: ['layout'],
    properties: BASE_PROPERTIES,
    components: ['title', 'label'],
    marks: ['treemap'],
    elements: [],
  },
  venn: {
    config: [],
    properties: BASE_PROPERTIES,
    components: ['title', 'label'],
    marks: ['path'],
    elements: [],
  },
  violin: {
    config: [],
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['density', 'box'],
    elements: [],
  },
  waterfall: {
    config: [],
    properties: BASE_PROPERTIES,
    components: ['title', 'axis', 'label'],
    marks: ['interval', 'link'],
    elements: [],
  },
  'word-cloud': {
    config: ['layout'],
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: ['wordCloud'],
    elements: [],
  },
} as const satisfies ChartThemeCapabilityDefinitionMap;

/** Runtime counterpart of the ThemeSpec V1 chart-specific type boundaries. */
export const CHART_THEME_CAPABILITIES = freezeCapabilityRegistry(CAPABILITY_DEFINITIONS);

export const selectThemeStyleForChart = <T extends ChartType>(
  type: T,
  style: ChartStyle,
): ChartStyleMap[T] => {
  const capabilities = CHART_THEME_CAPABILITIES[type];
  const source = style as unknown as Record<string, unknown>;
  const selected: Record<string, unknown> = {};

  for (const property of capabilities.properties) {
    const value = source[property];
    if (value !== undefined) selected[property] = value;
  }

  for (const component of capabilities.components) {
    const value = style[component];
    if (value !== undefined) selected[component] = value;
  }

  if (style.mark && capabilities.marks.length > 0) {
    const marks: Record<string, unknown> = {};
    for (const mark of capabilities.marks) {
      const value = style.mark[mark];
      if (value !== undefined) marks[mark] = value;
    }
    if (Object.keys(marks).length > 0) selected.mark = marks;
  }

  for (const element of capabilities.elements) {
    const value = style[element];
    if (value !== undefined) selected[element] = value;
  }

  return selected as ChartStyleMap[T];
};
