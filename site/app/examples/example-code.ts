import type { ThemeSpec } from '../../../src';
import { THEME_PRESETS } from '../themes/presets';

export function presetThemeId(theme: ThemeSpec) {
  return THEME_PRESETS.find((preset) => JSON.stringify(preset) === JSON.stringify(theme))?.id;
}

/** Keep theme objects out of sample localization and preserve edited presets as custom JSON. */
export function exampleCode(input: string | Record<string, unknown>, theme: ThemeSpec): string {
  const preset = presetThemeId(theme);
  if (typeof input !== 'string') {
    return JSON.stringify({ ...input, theme: preset ?? theme }, null, 2);
  }
  if (input.trimStart().startsWith('vis ') && preset) {
    return `${input.trimEnd()}\ntheme ${preset}`;
  }
  // T8 narratives take their theme from the constructor. Custom Syntax themes
  // use the same API so the snippet always reproduces what the reader sees.
  const literal = input.replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${');
  return `import { GPTVis } from '@antv/gpt-vis';\n\nconst chart = new GPTVis({\n  container: '#chart',\n  theme: ${preset ? JSON.stringify(preset) : JSON.stringify(theme, null, 2).replaceAll('\n', '\n  ')},\n});\n\nchart.render(\`${literal}\`);`;
}
