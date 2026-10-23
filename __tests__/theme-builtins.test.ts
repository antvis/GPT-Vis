import { describe, expect, it } from 'vitest';
import { getThemeObject } from '../src/theme';

describe('built-in theme adapters', () => {
  it('maps GPT-Vis theme names to themes registered by each renderer', () => {
    expect(getThemeObject('line', 'academy').rendererTheme.type).toBe('academy');
    for (const name of ['default', 'light', 'academy'] as const) {
      expect(getThemeObject('network-graph', name).rendererTheme).toBe('light');
    }
    expect(getThemeObject('network-graph', 'dark').rendererTheme).toBe('dark');
  });

  it('returns an owned palette array for renderer configuration', () => {
    const palette = ['#111111', '#222222'];
    const normalized = getThemeObject('line', 'light', { style: { palette } }).colors;
    expect(normalized).toEqual(palette);
    expect(normalized).not.toBe(palette);
    expect(getThemeObject('line', 'academy').colors).toHaveLength(10);
  });
});
