import type { ChartType, ThemeStyle } from '../types';

type ThemeComponent = 'title' | 'axis' | 'legend' | 'label' | 'table' | 'summary';
type ThemeMark = keyof NonNullable<ThemeStyle['mark']>;
type ThemeElement = 'node' | 'edge';
type ThemeStyleProperty = 'backgroundColor' | 'palette' | 'texture';

interface ChartThemeCapabilities {
  /** Direct chart-level visual properties. */
  properties: readonly ThemeStyleProperty[];
  /** Structured component style blocks. */
  components: readonly ThemeComponent[];
  /** G2 marks nested under `style.mark`. */
  marks: readonly ThemeMark[];
  /** G6 elements exposed as top-level node and edge styles. */
  elements: readonly ThemeElement[];
}

const BASE_PROPERTIES = ['backgroundColor', 'palette'] as const;
const CARTESIAN_COMPONENTS = ['title', 'axis', 'legend'] as const;
const INTERVAL_COMPONENTS = [...CARTESIAN_COMPONENTS, 'label'] as const;
const BASE_COMPONENTS = ['title'] as const;

const freezeCapabilityRegistry = (
  definitions: Record<ChartType, ChartThemeCapabilities>,
): Readonly<Record<ChartType, ChartThemeCapabilities>> => {
  const entries = Object.entries(definitions).map(([type, capability]) => [
    type,
    Object.freeze({
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
 * Recommended ThemeSpec surface for every chart type. Deprecated
 * compatibility fields are intentionally omitted from this runtime registry.
 */
const CAPABILITY_DEFINITIONS = {
  area: {
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['area', 'line', 'point'],
    elements: [],
  },
  bar: {
    properties: BASE_PROPERTIES,
    components: INTERVAL_COMPONENTS,
    marks: ['interval'],
    elements: [],
  },
  boxplot: {
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['box', 'point'],
    elements: [],
  },
  column: {
    properties: BASE_PROPERTIES,
    components: INTERVAL_COMPONENTS,
    marks: ['interval'],
    elements: [],
  },
  'dual-axes': {
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['interval', 'line'],
    elements: [],
  },
  'fishbone-diagram': {
    properties: [...BASE_PROPERTIES, 'texture'],
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  'flow-diagram': {
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['edge'],
  },
  funnel: {
    properties: BASE_PROPERTIES,
    components: ['title', 'label'],
    marks: ['interval', 'connector'],
    elements: [],
  },
  histogram: {
    properties: BASE_PROPERTIES,
    components: ['title', 'axis'],
    marks: ['interval'],
    elements: [],
  },
  'indented-tree': {
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  line: {
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['line', 'point'],
    elements: [],
  },
  liquid: {
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: ['liquid'],
    elements: [],
  },
  mindmap: {
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  'network-graph': {
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  'organization-chart': {
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: [],
    elements: ['node', 'edge'],
  },
  pie: {
    properties: BASE_PROPERTIES,
    components: ['title', 'legend', 'label'],
    marks: ['interval'],
    elements: [],
  },
  radar: {
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['line'],
    elements: [],
  },
  sankey: {
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: ['sankey'],
    elements: [],
  },
  scatter: {
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['point'],
    elements: [],
  },
  summary: {
    properties: ['backgroundColor'],
    components: ['summary'],
    marks: [],
    elements: [],
  },
  table: {
    properties: ['backgroundColor'],
    components: ['title', 'table'],
    marks: [],
    elements: [],
  },
  treemap: {
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: ['treemap'],
    elements: [],
  },
  venn: {
    properties: BASE_PROPERTIES,
    components: ['title', 'label'],
    marks: ['path'],
    elements: [],
  },
  violin: {
    properties: BASE_PROPERTIES,
    components: CARTESIAN_COMPONENTS,
    marks: ['density', 'box'],
    elements: [],
  },
  waterfall: {
    properties: BASE_PROPERTIES,
    components: ['title', 'axis', 'label'],
    marks: ['interval', 'link'],
    elements: [],
  },
  'word-cloud': {
    properties: BASE_PROPERTIES,
    components: BASE_COMPONENTS,
    marks: ['wordCloud'],
    elements: [],
  },
} as const satisfies Record<ChartType, ChartThemeCapabilities>;

/** Internal per-chart appearance capabilities consumed by the resolver. */
export const CHART_THEME_CAPABILITIES = freezeCapabilityRegistry(CAPABILITY_DEFINITIONS);

export const selectThemeStyleForChart = (type: ChartType, style: ThemeStyle): ThemeStyle => {
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

  return selected as ThemeStyle;
};
