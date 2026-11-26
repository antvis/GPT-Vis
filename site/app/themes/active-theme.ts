'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';
import type { ThemeSpec } from '../../../src';
import { DEFAULT_THEME, THEME_PRESETS } from './presets';
import { parseThemeSpec } from './theme-utils';

export const ACTIVE_THEME_KEY = 'gpt-vis:active-theme:v1';
export const STUDIO_STORAGE_KEY = 'gpt-vis:theme-studio:v1';
let current = DEFAULT_THEME;
let initialized = false;
const listeners = new Set<() => void>();

function readTheme(): ThemeSpec {
  try {
    const saved = localStorage.getItem(ACTIVE_THEME_KEY);
    if (saved) return parseThemeSpec(saved);
    // Migrate the last valid theme, never the unfinished editor draft.
    const legacy = JSON.parse(localStorage.getItem(STUDIO_STORAGE_KEY) ?? 'null');
    if (legacy) {
      if (legacy.source === 'light')
        return { id: 'light', label: 'Light theme', baseTheme: 'light' };
      const preset = THEME_PRESETS.find((item) => item.id === legacy.source);
      return preset ?? parseThemeSpec(JSON.stringify(legacy.custom));
    }
  } catch {
    // Storage can be unavailable or contain an obsolete snapshot.
  }
  return DEFAULT_THEME;
}

export function getActiveTheme(): ThemeSpec {
  if (!initialized && typeof window !== 'undefined') {
    initialized = true;
    current = readTheme();
  }
  return current;
}

export function setActiveTheme(theme: ThemeSpec) {
  initialized = true;
  if (JSON.stringify(current) === JSON.stringify(theme)) return;
  current = theme;
  try {
    localStorage.setItem(ACTIVE_THEME_KEY, JSON.stringify(theme));
  } catch {
    // Navigation still shares the in-memory theme when storage is disabled.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== ACTIVE_THEME_KEY && event.key !== null) return;
    current = readTheme();
    listeners.forEach((listener) => listener());
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(notify);
    window.removeEventListener('storage', onStorage);
  };
}

export function useActiveTheme() {
  return useSyncExternalStore(subscribe, getActiveTheme, () => DEFAULT_THEME);
}

export const ExampleThemeContext = createContext<ThemeSpec | undefined>(undefined);
export const useExampleTheme = () => useContext(ExampleThemeContext);
