import { THEME_MAP } from '../../theme';
import { ACADEMY_COLOR_PALETTE, DEFAULT_COLOR_PALETTE } from '../../utils/palette';

/**
 * Get normalized theme name for G2.
 * Converts 'default' to 'light' for G2 compatibility.
 */
export const getTheme = (theme: string): string => {
  return theme === 'default' ? 'light' : theme;
};

/**
 * Get theme object from THEME_MAP.
 * This should be used for visualization components to properly support dark theme with multiple marks.
 */
export const getThemeObject = (theme: string): any => {
  return THEME_MAP[theme] || THEME_MAP.default;
};

/**
 * Get theme color palette based on theme name.
 */
export const getThemeColors = (theme: string): string[] => {
  switch (theme) {
    case 'academy':
      return ACADEMY_COLOR_PALETTE;
    case 'dark':
    case 'default':
    default:
      return DEFAULT_COLOR_PALETTE;
  }
};

/**
 * Get background color based on theme.
 */
export const getBackgroundColor = (theme: string): string => {
  switch (theme) {
    case 'dark':
      return '#000';
    case 'academy':
    case 'default':
    default:
      return '#FFF';
  }
};

/**
 * Get text color based on theme.
 */
export const getTextColor = (theme: string): string => {
  switch (theme) {
    case 'dark':
      return '#FFF';
    case 'academy':
    case 'default':
    default:
      return '#262626';
  }
};

/**
 * Get secondary background color based on theme.
 */
export const getSecondaryBackgroundColor = (theme: string): string => {
  switch (theme) {
    case 'dark':
      return '#1A1A1A';
    case 'academy':
    case 'default':
    default:
      return '#EFF0F0';
  }
};

/**
 * Get border color based on theme.
 */
export const getBorderColor = (theme: string): string => {
  switch (theme) {
    case 'dark':
      return '#4A4A4A';
    case 'academy':
    case 'default':
    default:
      return '#99ADD1';
  }
};
