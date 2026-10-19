import type { VisualizationTheme } from '../../types';

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
] as const;

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
] as const;

const getThemeColors = (theme: VisualizationTheme): readonly string[] =>
  theme === 'academy' ? ACADEMY_COLOR_PALETTE : DEFAULT_COLOR_PALETTE;

export const normalizePalette = (
  palette: string | string[] | undefined,
  theme: VisualizationTheme,
): string[] => {
  if (!palette || (Array.isArray(palette) && palette.length === 0)) {
    return [...getThemeColors(theme)];
  }
  return Array.isArray(palette) ? [...palette] : [palette];
};
