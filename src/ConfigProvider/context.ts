import React from 'react';
import { DEFAULT_GLOBAL_CONFIG } from '../constants';
import type { GlobalConfig } from '../types';

export const ConfigContext = React.createContext<GlobalConfig>(DEFAULT_GLOBAL_CONFIG);
