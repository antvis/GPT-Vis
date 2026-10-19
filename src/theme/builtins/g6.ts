import type { VisualizationTheme } from '../../types';

export type G6BuiltInTheme = 'light' | 'dark';

/** Map GPT-Vis themes to the built-in themes that G6 actually registers. */
export const getG6Theme = (theme: VisualizationTheme): G6BuiltInTheme =>
  theme === 'dark' ? 'dark' : 'light';
