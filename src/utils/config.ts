import { isPlainObject, mergeWith } from 'lodash';
import { DEFAULT_GLOBAL_CONFIG } from '../constants';
import type { GlobalConfig } from '../types';

export const mergeGlobalConfig = (config: GlobalConfig) => {
  const globalConfig = mergeWith({}, DEFAULT_GLOBAL_CONFIG, config, (objValue) => {
    if (Array.isArray(objValue)) {
      return objValue;
    }
  });

  return globalConfig;
};

function mergeGraphFunctions(
  key: string,
  currValue: (value: any) => any,
  prevValue: (value: any) => any,
) {
  if (['plugins', 'behaviors', 'transforms'].includes(key)) {
    return (prev: any[]) => currValue(prev);
  } else {
    return function (datum: any) {
      // @ts-ignore this refers to the graph instance
      const value = currValue.call(this, datum);
      if (isPlainObject(value)) return mergeGraphOptions(prevValue, value);
      return value;
    };
  }
}

export function mergeGraphOptions(...options: Record<string, any>[]) {
  if (options.length === 0) return {};

  const merged = { ...options[0] };

  for (let i = 1; i < options.length; i++) {
    const currentOptions = options[i];

    for (const key in currentOptions) {
      if (currentOptions.hasOwnProperty(key)) {
        const currValue = currentOptions[key];
        const prevValue = merged[key];

        if (['component', 'data'].includes(key)) {
          merged[key] = currValue;
        } else if (typeof currValue === 'function') {
          merged[key] = mergeGraphFunctions(key, currValue, prevValue);
        } else if (isPlainObject(currValue) && isPlainObject(prevValue)) {
          merged[key] = mergeGraphOptions(prevValue, currValue);
        } else {
          merged[key] = currValue;
        }
      }
    }
  }

  return merged;
}
