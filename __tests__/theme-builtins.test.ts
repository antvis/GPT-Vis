import { describe, expect, it } from 'vitest';

import { getG2Theme, getG6Theme, normalizePalette } from '../src/theme/builtins';

describe('built-in theme adapters', () => {
  it('maps GPT-Vis theme names to themes registered by each renderer', () => {
    expect(getG2Theme('academy').type).toBe('academy');
    expect(getG6Theme('default')).toBe('light');
    expect(getG6Theme('light')).toBe('light');
    expect(getG6Theme('academy')).toBe('light');
    expect(getG6Theme('dark')).toBe('dark');
  });

  it('returns an owned palette array for renderer configuration', () => {
    const palette = ['#111111', '#222222'];
    const normalized = normalizePalette(palette, 'light');

    expect(normalized).toEqual(palette);
    expect(normalized).not.toBe(palette);
    expect(normalizePalette(undefined, 'academy')).toHaveLength(10);
  });
});
