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

export const DEFAULT_COLOR_PALETEE = [
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

export const ACADEMY_COLOR_PALETEE = [
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

export const THEME_MAP: any = {
  default: DEFAULT_THEME,
  academy: ACADEMY_THEME,
};
