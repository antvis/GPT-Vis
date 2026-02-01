// Color palettes
export const DEFAULT_COLOR_PALETTE = [
  '#1783FF',
  '#F08F56',
  '#D580FF',
  '#00C9C9',
  '#7863FF',
  '#DB9D0D',
  '#60C42D',
  '#FF80CA',
  '#2491B3',
  '#17C76F',
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

// Theme definitions
const DEFAULT_THEME = {
  type: 'light',
  view: {
    viewFill: '#FFF',
    plotFill: 'transparent',
    mainFill: 'transparent',
    contentFill: 'transparent',
  },
  interval: {
    rect: {
      fillOpacity: 0.8,
    },
  },
  line: {
    line: {
      lineWidth: 2,
    },
  },
  area: {
    area: {
      fillOpacity: 0.6,
    },
  },
  point: {
    point: {
      lineWidth: 1,
    },
  },
};

const DARK_THEME = {
  type: 'dark',
  view: {
    viewFill: '#000',
    plotFill: 'transparent',
    mainFill: 'transparent',
    contentFill: 'transparent',
  },
  interval: {
    rect: {
      fillOpacity: 0.8,
    },
  },
  line: {
    line: {
      lineWidth: 2,
    },
  },
  area: {
    area: {
      fillOpacity: 0.6,
    },
  },
  point: {
    point: {
      lineWidth: 1,
    },
  },
};

const ACADEMY_THEME = {
  type: 'academy',
  view: {
    viewFill: '#FFF',
    plotFill: 'transparent',
    mainFill: 'transparent',
    contentFill: 'transparent',
  },
  interval: {
    rect: {
      fillOpacity: 0.8,
    },
  },
  line: {
    line: {
      lineWidth: 2,
    },
  },
  area: {
    area: {
      fillOpacity: 0.6,
    },
  },
  point: {
    point: {
      lineWidth: 1,
    },
  },
};

export const THEME_MAP: Record<string, any> = {
  default: DEFAULT_THEME,
  academy: ACADEMY_THEME,
  dark: DARK_THEME,
};

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
 * G6 theme map for graph components.
 * Used by MindMap, OrganizationChart, IndentedTree, FishboneDiagram, etc.
 */
export const G6THEME_MAP: Record<string, any> = {
  default: {
    type: 'assign-color-by-branch',
    colors: DEFAULT_COLOR_PALETTE,
  },
  academy: {
    type: 'assign-color-by-branch',
    colors: ACADEMY_COLOR_PALETTE,
  },
};
