import { G6 } from '@antv/g6-ssr';
import { ACADEMY_COLOR_PALETTE, AssignColorByBranchTransform, DEFAULT_COLOR_PALETTE } from './util';

const { register, ExtensionCategory } = G6;
register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranchTransform);

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

export const THEME_MAP: any = {
  default: DEFAULT_THEME,
  academy: ACADEMY_THEME,
  dark: DARK_THEME,
};

export const G6THEME_MAP: any = {
  default: {
    type: 'assign-color-by-branch',
    colors: DEFAULT_COLOR_PALETTE,
  },
  academy: {
    type: 'assign-color-by-branch',
    colors: ACADEMY_COLOR_PALETTE,
  },
};
