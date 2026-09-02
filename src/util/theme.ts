import type { Theme } from '@antv/g2';
import type { VisualizationTheme } from '../types';
import { CHART_FONT_FAMILY, CHART_STYLE_DEFAULTS, getChartVisualTokens } from './tokens';

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

type ChartTheme = Theme & {
  enter?: { duration?: number; easing?: string };
  elementHighlightByColor?: Record<string, unknown>;
  elementHoverScale?: Record<string, unknown>;
};

const filterBaselineGrid = (_: unknown, index: number): boolean => index !== 0;

const createTheme = (type: G2ThemeType): ChartTheme => {
  const tokens = getChartVisualTokens(type);
  const isDark = type === 'dark';
  const isAcademy = type === 'academy';
  const colors = isAcademy ? ACADEMY_COLOR_PALETTE : DEFAULT_COLOR_PALETTE;

  return {
    type,
    color: colors[0],
    category10: colors,
    category20: colors,
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
    enter: {
      duration: CHART_STYLE_DEFAULTS.animationDuration,
      easing: 'ease-out',
    },
    axis: {
      labelAutoHide: { keepHeader: true, keepTail: true },
      titleOpacity: 1,
      titleFillOpacity: 1,
      labelOpacity: 1,
      labelFillOpacity: 1,
      line: true,
      lineLineWidth: 1,
      lineStroke: tokens.axisLine,
      lineStrokeOpacity: 1,
      tick: true,
      tickLineWidth: 1,
      tickStroke: tokens.axisTick,
      tickStrokeOpacity: 1,
      ...(isAcademy
        ? {
            titleFill: '#000000',
            titleStrokeOpacity: 1,
            titleFontSize: 11,
            titleFontWeight: 'bold',
            titleSpacing: 12,
            labelFill: '#000000',
            labelStrokeOpacity: 1,
            labelFontSize: 10,
            labelFontWeight: 'normal',
            labelSpacing: 4,
            tickLength: 5,
          }
        : {
            titleFill: tokens.textSecondary,
            titleFontFamily: CHART_FONT_FAMILY,
            titleFontSize: 12,
            titleFontWeight: 500,
            titleLineWidth: 0,
            titleSpacing: 16,
            labelFill: tokens.textSecondary,
            labelFontFamily: CHART_FONT_FAMILY,
            labelFontSize: 12,
            labelFontWeight: 400,
            labelLineWidth: 0,
            labelSpacing: 6,
            tickLength: 3,
            tickOpacity: 1,
          }),
    },
    axisX: {
      grid: isAcademy,
      labelAutoRotate: {
        optionalAngles: [0, 45, 90],
        recoverWhenFailed: true,
      },
      ...(isAcademy
        ? {
            gridStroke: tokens.axisGrid,
            gridStrokeOpacity: 1,
            gridLineWidth: 1,
            gridLineDash: [0, 0],
          }
        : {}),
    },
    axisY: {
      lineLineWidth: isAcademy ? 1 : 0.75,
      grid: true,
      gridStroke: tokens.axisGrid,
      gridStrokeOpacity: 1,
      gridLineWidth: isAcademy ? 1 : 0.5,
      gridLineDash: isAcademy ? [0, 0] : [2, 4],
      gridFilter: filterBaselineGrid,
    },
    axisRadar: {
      zIndex: 1,
      titleFill: isAcademy ? tokens.textPrimary : tokens.textSecondary,
      titleFontFamily: CHART_FONT_FAMILY,
      titleFontSize: isAcademy ? 10 : 12,
      titleFontWeight: isAcademy ? 600 : 500,
      titleSpacing: 10,
      labelFill: tokens.textSecondary,
      labelOpacity: 1,
      labelFontFamily: CHART_FONT_FAMILY,
      labelFontSize: isAcademy ? 10 : 11,
      line: true,
      lineStroke: tokens.axisLine,
      lineStrokeOpacity: isAcademy ? 1 : 0.64,
      lineLineWidth: isAcademy ? 1 : 0.75,
      tick: true,
      tickLength: isAcademy ? 4 : 2,
      tickStroke: tokens.axisTick,
      tickStrokeOpacity: isAcademy ? 1 : 0.68,
      tickCount: 4,
      gridStroke: tokens.axisGrid,
      gridStrokeOpacity: isAcademy ? 1 : 0.9,
      gridLineWidth: isAcademy ? 1 : 0.75,
      gridLineDash: [0, 0],
    },
    title: {
      spacing: 6,
      titleFill: tokens.textPrimary,
      titleFontSize: 16,
      titleFontWeight: 600,
      subtitleFill: tokens.textSecondary,
      subtitleFontSize: 12,
      subtitleFontWeight: 400,
    },
    legendCategory: {
      backgroundFill: 'transparent',
      padding: [5, 0, 10, 0],
      itemMarkerSize: 10,
      itemMarkerFillOpacity: 0.92,
      itemMarkerStrokeOpacity: 0.92,
      itemLabelFill: tokens.textPrimary,
      itemLabelFillOpacity: 0.78,
      itemLabelFontFamily: CHART_FONT_FAMILY,
      itemLabelFontSize: 12,
      itemLabelFontWeight: 400,
      itemLabelLineHeight: 16,
      itemLabelLetterSpacing: 0.1,
      itemLabelTextBaseline: 'middle',
      itemSpacing: [8, 0, 0],
      itemCursor: 'pointer',
      rowPadding: 8,
      colPadding: 22,
      navButtonFill: tokens.textSecondary,
      navButtonFillOpacity: 0.72,
      navButtonSize: 9,
      navPageNumFill: tokens.textSecondary,
      navPageNumFillOpacity: 0.72,
      navPageNumFontFamily: CHART_FONT_FAMILY,
      navPageNumFontSize: 11,
      navPageNumFontWeight: 400,
      navControllerPadding: 4,
      navControllerSpacing: 14,
    },
    tooltip: {
      shared: false,
      series: false,
      crosshairs: false,
      marker: true,
      markerR: 4,
      markerLineWidth: 2,
      markerStroke: tokens.background,
      crosshairsStroke: tokens.textSecondary,
      crosshairsStrokeOpacity: 0.18,
      crosshairsLineWidth: 1,
      crosshairsLineDash: [0, 0],
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
    elementHighlight: {
      delay: CHART_STYLE_DEFAULTS.interactionDelay,
    },
    elementHighlightByColor: {
      delay: CHART_STYLE_DEFAULTS.interactionDelay,
    },
    elementHoverScale: {
      delay: CHART_STYLE_DEFAULTS.interactionDelay,
      scale: 1.04,
      shadow: true,
      shadowBlur: isDark ? 7 : isAcademy ? 5 : 6,
      shadowColor: isDark
        ? 'rgba(226, 232, 240, 0.38)'
        : isAcademy
          ? 'rgba(63, 49, 38, 0.44)'
          : 'rgba(15, 23, 42, 0.46)',
      shadowOffsetX: 0,
      shadowOffsetY: isDark ? 0 : 3,
      zIndex: 10,
    },
  };
};

const LIGHT_THEME = createTheme('light');
const ACADEMY_THEME = createTheme('academy');
const DARK_THEME = createTheme('dark');

export const THEME_MAP: Record<VisualizationTheme, ChartTheme> = {
  default: LIGHT_THEME,
  light: LIGHT_THEME,
  academy: ACADEMY_THEME,
  dark: DARK_THEME,
};

export const getTheme = (theme: VisualizationTheme): G2ThemeType =>
  theme === 'default' ? 'light' : theme;

export const getThemeObject = (theme: VisualizationTheme): ChartTheme =>
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
