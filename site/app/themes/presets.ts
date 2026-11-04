import type { ThemeSpec } from '../../../src';
import { THEME_PRESETS } from '../../../src/theme/presets';

export { THEME_PRESETS };

// The website starts with GPT-Vis; the SDK keeps its existing default theme.
export const DEFAULT_THEME: ThemeSpec = THEME_PRESETS[0];
