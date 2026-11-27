import type { ThemeSpec } from '../../../src';
import { getThemeObject } from '../../../src/theme/g2';
import { THEME_PRESETS as CURATED_THEMES } from '../../../src/theme/presets';
import { CHART_FONT_FAMILY } from '../../../src/util/tokens';

export { CURATED_THEMES };

// Keep base specs free of overrides: rendering and copied names match the SDK exactly.
export const BASE_THEMES: readonly ThemeSpec[] = [
  { id: 'default', label: 'Default theme', baseTheme: 'default' },
  { id: 'dark', label: 'Dark theme', baseTheme: 'dark' },
  { id: 'academy', label: 'Academic theme', baseTheme: 'academy' },
];
export const THEME_PRESETS: readonly ThemeSpec[] = [...BASE_THEMES, ...CURATED_THEMES];
export const DEFAULT_THEME = BASE_THEMES[0];

export function themeSwatch(theme: ThemeSpec) {
  const { theme: resolved } = getThemeObject('column', theme);
  return {
    palette: resolved.category10 as string[],
    background: resolved.view!.viewFill as string,
    foreground: resolved.label!.fill as string,
    fontFamily: (resolved.label?.fontFamily as string | undefined) ?? CHART_FONT_FAMILY,
    radius: theme.tokens?.radius ?? 0,
  };
}

export function themeDisplayName(theme: ThemeSpec, translate: (key: string) => string) {
  return BASE_THEMES.some((base) => JSON.stringify(base) === JSON.stringify(theme))
    ? translate(theme.label)
    : theme.label;
}
