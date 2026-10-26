import type { ThemeSpec } from '../../../src';

interface PresetColors {
  background: string;
  surface: string;
  text: string;
  secondary: string;
  stroke: string;
  palette: string[];
  positive: string;
  negative: string;
}

function createPreset(
  id: string,
  label: string,
  description: string,
  colors: PresetColors,
  options: { dark?: boolean; serif?: boolean; radius?: number; product?: boolean } = {},
): ThemeSpec {
  const { dark = false, serif = false, radius = 6, product = false } = options;
  const fontFamily = serif
    ? 'Georgia, "Times New Roman", serif'
    : product
      ? '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      : 'Alibaba PuHuiTi, sans-serif';
  const inverse = dark ? '#101827' : product ? colors.text : '#ffffff';
  return {
    id,
    label,
    description,
    baseTheme: dark ? 'dark' : serif ? 'academy' : 'default',
    tokens: {
      colorDefault: colors.palette[0],
      colorBackground: colors.background,
      colorSurface: colors.surface,
      colorText: colors.text,
      colorTextSecondary: colors.secondary,
      colorTextInverse: inverse,
      colorStroke: colors.stroke,
      colorPositive: colors.positive,
      colorNegative: colors.negative,
      colorNeutral: colors.secondary,
      category10: colors.palette,
      fontFamily,
      fontSize: 11,
      fontWeight: 400,
      lineHeight: 22,
      spacingSmall: 6,
      spacingMedium: 12,
      lineWidth: serif ? 1 : 2,
      radius,
    },
    style: {
      title: {
        titleFontSize: 16,
        titleFontWeight: serif ? 500 : product ? 600 : 700,
        spacing: 5,
      },
      axis: { line: serif, tick: serif, gridLineWidth: 0.5, gridLineDash: serif ? [2, 3] : [0, 0] },
      mark: {
        line: { lineCap: serif ? 'butt' : 'round' },
        area: { shape: serif ? 'area' : 'smooth', fillOpacity: serif ? 0.1 : product ? 0.12 : 0.2 },
        point: {
          size: serif ? 3 : 4,
          shape: serif ? 'hollow' : 'point',
          stroke: colors.background,
        },
        interval: { stroke: colors.background },
        treemap: { stroke: colors.background },
        liquid: {
          contentFontSize: 28,
        },
        sankey: { nodeStroke: colors.background, nodeLineWidth: 1, linkFillOpacity: 0.25 },
      },
      table: {
        header: {
          backgroundColor: product ? colors.surface : colors.palette[0],
          fill: product ? colors.text : inverse,
          fontWeight: 700,
        },
      },
      summary: { fontSize: 15, lineHeight: 27 },
    },
    charts: {
      line: { style: { mark: { line: { shape: serif ? 'line' : 'smooth' } } } },
      area: { style: { mark: { line: { shape: serif ? 'area' : 'smooth' } } } },
      pie: { style: { mark: { interval: { stroke: colors.background, lineWidth: 3 } } } },
      radar: { style: { mark: { line: { shape: 'line' } } } },
    },
  };
}

export const THEME_PRESETS: ThemeSpec[] = [
  createPreset('gpt-vis', 'GPT-Vis', 'Clear, expressive, and ready for your next idea.', {
    background: '#ffffff',
    surface: '#f5f3ff',
    text: '#23272f',
    secondary: '#626478',
    stroke: '#d9d7e6',
    palette: [
      '#7047eb',
      '#3b9bb7',
      '#f0af54',
      '#e87787',
      '#6baa8f',
      '#a68ae0',
      '#cf8253',
      '#6379b9',
      '#a99b53',
      '#8b94a5',
    ],
    positive: '#278160',
    negative: '#c64d64',
  }),
  createPreset(
    'midnight',
    'Midnight',
    'Luminous data. A quieter kind of dark.',
    {
      background: '#141b2b',
      surface: '#1d283b',
      text: '#edf2fa',
      secondary: '#a8b8d0',
      stroke: '#3b4a65',
      palette: [
        '#a99aff',
        '#6fd3de',
        '#edbd76',
        '#ee93ae',
        '#8bd3a8',
        '#77a8ef',
        '#d4a2e8',
        '#c7d989',
        '#f0a888',
        '#a6b9d0',
      ],
      positive: '#8bd3a8',
      negative: '#ee93ae',
    },
    { dark: true },
  ),
  createPreset(
    'academy',
    'Academy',
    'Thoughtful typography for considered research.',
    {
      background: '#fcfbf8',
      surface: '#f2efe8',
      text: '#302f2b',
      secondary: '#706b60',
      stroke: '#d8d2c6',
      palette: [
        '#486b86',
        '#a45e4a',
        '#819272',
        '#b89650',
        '#867394',
        '#5f9697',
        '#c08773',
        '#8b929c',
        '#aa8c7b',
        '#71875e',
      ],
      positive: '#547a4d',
      negative: '#ad4d47',
    },
    { serif: true, radius: 0 },
  ),
  createPreset(
    'product',
    'Product',
    'Fresh sky blue, soft surfaces, and a modern product feel.',
    {
      background: '#f8fcff',
      surface: '#e8f4fd',
      text: '#17324d',
      secondary: '#526e85',
      stroke: '#c8dfef',
      palette: [
        '#38bdf8',
        '#3b82f6',
        '#2dd4bf',
        '#818cf8',
        '#fbbf24',
        '#f472b6',
        '#4ade80',
        '#22d3ee',
        '#a5b4fc',
        '#94a3b8',
      ],
      positive: '#15803d',
      negative: '#be123c',
    },
    { product: true, radius: 12 },
  ),
  {
    id: 'neon-circuit',
    label: 'Neon Circuit',
    description: 'Midnight circuitry, electric cyan, hot magenta, and precise monospace type.',
    baseTheme: 'dark',
    tokens: {
      colorDefault: '#22d3ee',
      colorBackground: '#080d1a',
      colorSurface: '#111c30',
      colorText: '#e8f6ff',
      colorTextSecondary: '#a4b8d0',
      colorTextInverse: '#080d1a',
      colorStroke: '#415977',
      colorPositive: '#4ade80',
      colorNegative: '#fb7185',
      colorNeutral: '#a4b8d0',
      category10: [
        '#22d3ee',
        '#f472b6',
        '#a3e635',
        '#a78bfa',
        '#facc15',
        '#60a5fa',
        '#fb923c',
        '#2dd4bf',
        '#fb7185',
        '#c4b5fd',
      ],
      category20: [
        '#22d3ee',
        '#f472b6',
        '#a3e635',
        '#a78bfa',
        '#facc15',
        '#60a5fa',
        '#fb923c',
        '#2dd4bf',
        '#fb7185',
        '#c4b5fd',
        '#67e8f9',
        '#f9a8d4',
        '#bef264',
        '#c084fc',
        '#fde68a',
        '#93c5fd',
        '#fdba74',
        '#5eead4',
        '#fda4af',
        '#e9d5ff',
      ],
      fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
      fontSize: 11,
      fontWeight: 500,
      lineHeight: 20,
      spacingSmall: 6,
      spacingMedium: 12,
      lineWidth: 2,
      radius: 2,
    },
    style: {
      title: { titleFontWeight: 700, spacing: 6 },
      axis: { line: true, tick: false, gridLineWidth: 0.5, gridLineDash: [2, 4] },
      mark: {
        line: { shape: 'hv', lineCap: 'square' },
        area: { shape: 'hv', fillOpacity: 0.22 },
        point: { shape: 'diamond', size: 4, stroke: '#080d1a' },
        interval: { stroke: '#080d1a' },
        treemap: { stroke: '#080d1a' },
        liquid: { shape: 'rect', contentFontSize: 30, contentFontWeight: 700 },
        sankey: { linkFillOpacity: 0.35, nodeStroke: '#080d1a', linkLineWidth: 0 },
      },
      node: { fill: '#111c30', stroke: '#22d3ee', labelFill: '#e8f6ff' },
      edge: { stroke: '#7898bc', lineDash: [4, 3] },
      table: { header: { fill: '#22d3ee', backgroundColor: '#172640', fontWeight: 700 } },
      summary: {
        fontSize: 14,
        lineHeight: 25,
        colorHeadingBase: '#22d3ee',
        colorMetricValue: '#f472b6',
      },
    },
    charts: {
      area: { style: { mark: { line: { shape: 'hv' } } } },
      radar: { style: { mark: { line: { shape: 'line' } } } },
      pie: { style: { mark: { interval: { radius: 0, lineWidth: 3 } } } },
      'network-graph': { style: { node: { type: 'hexagon' }, edge: { type: 'line' } } },
    },
  },
];

export const DEFAULT_THEME = THEME_PRESETS[0];
