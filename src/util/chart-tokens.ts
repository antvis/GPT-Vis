import type { VisualizationTheme } from '../types';

export const CHART_FONT_FAMILY =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const CHART_STYLE_DEFAULTS = {
  animationDuration: 260,
  interactionDelay: 40,
  lineWidth: 2.5,
  areaOpacity: 0.24,
  lineOpacity: 0.92,
  inactiveOpacity: 0.24,
  pointSize: 3.5,
  scatterPointSize: 5,
  pointLineWidth: 1.5,
  pointActiveLineWidth: 5,
  intervalWidthRatio: 0.64,
} as const;

export type ChartVisualTokens = {
  background: string;
  textPrimary: string;
  textSecondary: string;
  grid: string;
  axisGrid: string;
  axisLine: string;
  axisTick: string;
  separator: string;
  tooltipBackground: string;
  tooltipBorder: string;
  tooltipDivider: string;
  tooltipMarkerShadow: string;
  tooltipShadow: string;
};

const LIGHT_TOKENS: ChartVisualTokens = {
  background: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#667085',
  grid: '#E7EAF0',
  axisGrid: '#EAECF0',
  axisLine: '#D0D5DD',
  axisTick: '#98A2B3',
  separator: '#FFFFFF',
  tooltipBackground: 'rgba(255, 255, 255, 0.96)',
  tooltipBorder: 'rgba(15, 23, 42, 0.09)',
  tooltipDivider: 'rgba(15, 23, 42, 0.08)',
  tooltipMarkerShadow: '0 0 0 2px #FFFFFF, 0 1px 3px rgba(15, 23, 42, 0.20)',
  tooltipShadow:
    '0 12px 32px rgba(15, 23, 42, 0.12), 0 3px 8px rgba(15, 23, 42, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.82)',
};

const DARK_TOKENS: ChartVisualTokens = {
  background: '#141414',
  textPrimary: '#F3F4F6',
  textSecondary: '#A7AFBE',
  grid: '#343841',
  axisGrid: '#2B2F36',
  axisLine: '#454B56',
  axisTick: '#596170',
  separator: '#141414',
  tooltipBackground: 'rgba(26, 27, 31, 0.96)',
  tooltipBorder: 'rgba(255, 255, 255, 0.12)',
  tooltipDivider: 'rgba(255, 255, 255, 0.10)',
  tooltipMarkerShadow: '0 0 0 2px #1A1B1F, 0 1px 3px rgba(0, 0, 0, 0.42)',
  tooltipShadow:
    '0 14px 36px rgba(0, 0, 0, 0.34), 0 3px 10px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
};

const ACADEMY_TOKENS: ChartVisualTokens = {
  background: '#FFFFFF',
  textPrimary: '#23262D',
  textSecondary: '#626975',
  grid: '#DDDDDD',
  axisGrid: '#DDDDDD',
  axisLine: '#888888',
  axisTick: '#000000',
  separator: '#FFFFFF',
  tooltipBackground: 'rgba(255, 253, 249, 0.98)',
  tooltipBorder: 'rgba(83, 72, 60, 0.14)',
  tooltipDivider: 'rgba(83, 72, 60, 0.12)',
  tooltipMarkerShadow: '0 0 0 2px #FFFDF9, 0 1px 3px rgba(63, 49, 38, 0.20)',
  tooltipShadow:
    '0 12px 30px rgba(63, 49, 38, 0.11), 0 3px 8px rgba(63, 49, 38, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.88)',
};

export const getChartVisualTokens = (theme: VisualizationTheme): ChartVisualTokens => {
  if (theme === 'dark') return DARK_TOKENS;
  if (theme === 'academy') return ACADEMY_TOKENS;
  return LIGHT_TOKENS;
};
