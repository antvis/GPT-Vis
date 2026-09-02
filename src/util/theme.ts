import type { VisualizationTheme } from '../types';
import { getChartTitleStyle, getLegendCategoryStyle } from './chart-components';
import { CHART_FONT_FAMILY, CHART_STYLE_DEFAULTS, getChartVisualTokens } from './chart-tokens';

export const DEFAULT_COLOR_PALETTE = [
  '#5B6CFF',
  '#2DAF9E',
  '#F2B84B',
  '#EF6A6A',
  '#55A6D9',
  '#3AA76D',
  '#F58A57',
  '#8B6FD6',
  '#D96C9B',
];

export const ACADEMY_COLOR_PALETTE = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
];

type G2ThemeType = 'light' | 'dark' | 'academy';

const createTheme = (type: G2ThemeType) => {
  const tokens = getChartVisualTokens(type);
  const isDark = type === 'dark';

  return {
    type,
    view: {
      viewFill: tokens.background,
      plotFill: 'transparent',
      mainFill: 'transparent',
      contentFill: 'transparent',
    },
    interval: {
      rect: {
        fillOpacity: 0.96,
      },
    },
    line: {
      line: {
        lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
      },
    },
    area: {
      area: {
        fillOpacity: CHART_STYLE_DEFAULTS.areaOpacity,
      },
    },
    point: {
      point: {
        lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
        fillOpacity: 0.82,
      },
      hollow: {
        lineWidth: 2,
        strokeOpacity: 1,
      },
    },
    title: {
      ...getChartTitleStyle(type),
      subtitleFill: tokens.textSecondary,
      subtitleFontSize: 12,
      subtitleFontWeight: 400,
    },
    legendCategory: getLegendCategoryStyle(type),
    tooltip: {
      css: {
        '.g2-tooltip': {
          'background-color': tokens.tooltipBackground,
          border: `1px solid ${tokens.tooltipBorder}`,
          'border-radius': '10px',
          'box-shadow': tokens.tooltipShadow,
          color: tokens.textSecondary,
          padding: '10px 12px',
          'min-width': '164px',
          'max-width': '300px',
          overflow: 'hidden',
          'box-sizing': 'border-box',
          'backdrop-filter': 'blur(10px) saturate(1.08)',
          '-webkit-backdrop-filter': 'blur(10px) saturate(1.08)',
          'font-family': CHART_FONT_FAMILY,
          'font-size': '12px',
          'line-height': '18px',
          'font-variant-numeric': 'tabular-nums',
          'font-feature-settings': '"tnum" 1, "zero" 1',
          '-webkit-font-smoothing': 'antialiased',
          contain: 'layout paint style',
        },
        '.g2-tooltip-title': {
          color: tokens.textSecondary,
          'font-size': '11px',
          'font-weight': '500',
          'line-height': '16px',
          'letter-spacing': '0.01em',
          'margin-bottom': '6px',
          'padding-bottom': '7px',
          'border-bottom': `1px solid ${tokens.tooltipDivider}`,
          'max-width': '276px',
        },
        '.g2-tooltip-list': {
          display: 'grid',
          gap: '4px',
        },
        '.g2-tooltip-list-item': {
          display: 'grid',
          'grid-template-columns': 'minmax(0, 1fr) auto',
          'align-items': 'center',
          'column-gap': '18px',
          'min-height': '22px',
          'line-height': '22px',
        },
        '.g2-tooltip-list-item-name': {
          gap: '8px',
          'min-width': '0',
          'max-width': '208px',
          overflow: 'hidden',
          color: tokens.textSecondary,
        },
        '.g2-tooltip-list-item-name-label': {
          color: tokens.textSecondary,
          'font-weight': '400',
        },
        '.g2-tooltip-list-item-value': {
          color: tokens.textPrimary,
          'font-weight': '600',
          flex: '0 0 auto',
          'min-width': '40px',
          'margin-left': '0',
          'text-align': 'right',
          'letter-spacing': '-0.01em',
          'font-variant-numeric': 'tabular-nums',
          'font-feature-settings': '"tnum" 1, "zero" 1',
        },
        '.g2-tooltip-list-item-marker': {
          width: '7px',
          height: '7px',
          flex: '0 0 auto',
          'margin-right': '0',
          'border-radius': '999px',
          'box-shadow': tokens.tooltipMarkerShadow,
        },
        '.g2-tooltip-crosshair-x': {
          'background-color': isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(71, 84, 103, 0.16)',
        },
        '.g2-tooltip-crosshair-y': {
          'background-color': isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(71, 84, 103, 0.16)',
        },
      },
    },
  };
};

const LIGHT_THEME = createTheme('light');
const ACADEMY_THEME = createTheme('academy');
const DARK_THEME = createTheme('dark');

export const THEME_MAP: Record<VisualizationTheme, any> = {
  default: LIGHT_THEME,
  light: LIGHT_THEME,
  academy: ACADEMY_THEME,
  dark: DARK_THEME,
};

export const getTheme = (theme: VisualizationTheme): G2ThemeType =>
  theme === 'default' ? 'light' : theme;

export const getThemeObject = (theme: VisualizationTheme): any =>
  THEME_MAP[theme] || THEME_MAP.default;

export const getThemeColors = (theme: VisualizationTheme): string[] =>
  theme === 'academy' ? ACADEMY_COLOR_PALETTE : DEFAULT_COLOR_PALETTE;

export const getBackgroundColor = (theme: VisualizationTheme): string =>
  getChartVisualTokens(theme).background;

export const normalizePalette = (
  palette: string | string[] | undefined,
  theme: VisualizationTheme,
): string[] => {
  if (!palette || (Array.isArray(palette) && palette.length === 0)) {
    return getThemeColors(theme);
  }
  return Array.isArray(palette) ? palette : [palette];
};
