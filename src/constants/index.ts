import type { GlobalConfig } from '../types';

import { DEFAULT_VIS_TEXT_CONFIG } from '../Text';

export const DEFAULT_GLOBAL_CONFIG: GlobalConfig = {
  map: { style: 'light' },
  components: {
    VisText: DEFAULT_VIS_TEXT_CONFIG,
  },
};
