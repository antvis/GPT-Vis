import type { VisualizationTheme } from '../types';
import { getChartVisualTokens } from '../util/tokens';
import type { AnnotationTone } from './types';

export interface ResolvedAnnotationTheme {
  tones: Record<AnnotationTone, string>;
  referenceLine: {
    lineWidth: number;
    lineDash: number[];
    opacity: number;
    labelFontSize: number;
    labelFontWeight: number;
    labelOffset: number;
  };
  referenceBand: {
    fillOpacity: number;
    labelFontSize: number;
    labelFontWeight: number;
    labelOffset: number;
  };
  highlight: {
    size: number;
    lineWidth: number;
    fillOpacity: number;
  };
  callout: {
    markerSize: number;
    markerLineWidth: number;
    labelFontSize: number;
    labelFontWeight: number;
    labelPadding: number[];
    labelRadius: number;
    offsetX: number;
    offsetY: number;
  };
  background: string;
  text: string;
}

const LIGHT_TONES: Record<AnnotationTone, string> = {
  neutral: '#667085',
  info: '#5B6CFF',
  positive: '#2DAF9E',
  warning: '#D97706',
  negative: '#DC2626',
};

const DARK_TONES: Record<AnnotationTone, string> = {
  neutral: '#A7AFBE',
  info: '#8B9AFF',
  positive: '#4AD7C3',
  warning: '#F2B84B',
  negative: '#FF8585',
};

const ACADEMY_TONES: Record<AnnotationTone, string> = {
  neutral: '#626975',
  info: '#4E79A7',
  positive: '#59A14F',
  warning: '#F28E2C',
  negative: '#E15759',
};

const getTones = (theme: VisualizationTheme): Record<AnnotationTone, string> => {
  if (theme === 'dark') return DARK_TONES;
  if (theme === 'academy') return ACADEMY_TONES;
  return LIGHT_TONES;
};

export const getAnnotationTheme = (theme: VisualizationTheme): ResolvedAnnotationTheme => {
  const tokens = getChartVisualTokens(theme);

  return {
    tones: getTones(theme),
    referenceLine: {
      lineWidth: 1.5,
      lineDash: [5, 4],
      opacity: 0.9,
      labelFontSize: 11,
      labelFontWeight: 500,
      labelOffset: 6,
    },
    referenceBand: {
      fillOpacity: theme === 'dark' ? 0.14 : 0.1,
      labelFontSize: 11,
      labelFontWeight: 500,
      labelOffset: 6,
    },
    highlight: {
      size: 8,
      lineWidth: 3,
      fillOpacity: 1,
    },
    callout: {
      markerSize: 6,
      markerLineWidth: 2.5,
      labelFontSize: 11,
      labelFontWeight: 500,
      labelPadding: [5, 8],
      labelRadius: theme === 'academy' ? 0 : 4,
      offsetX: 12,
      offsetY: -18,
    },
    background: tokens.background,
    text: tokens.textPrimary,
  };
};
