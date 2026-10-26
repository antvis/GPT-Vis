import { describe, expect, it } from 'vitest';
import { THEME_PRESETS } from '../../../../site/app/themes/presets';
import {
  decodeThemeHash,
  encodeThemeHash,
  parseThemeSpec,
} from '../../../../site/app/themes/theme-utils';

describe('Theme Studio utilities', () => {
  it('round-trips the complete Unicode ThemeSpec through a static share link', async () => {
    const theme = {
      ...THEME_PRESETS[1],
      label: '夜色 · 数据之美',
      description: 'A theme with spaces & symbols # / ?',
    };
    expect(await decodeThemeHash(await encodeThemeHash(theme))).toEqual(theme);
    expect(await decodeThemeHash('#other-section')).toBeNull();
    await expect(decodeThemeHash('#theme=broken')).rejects.toThrow();
  });

  it('accepts the presets and rejects incomplete editor input before rendering', () => {
    for (const theme of THEME_PRESETS) expect(parseThemeSpec(JSON.stringify(theme))).toEqual(theme);
    const minimal = { id: 'custom', label: 'Custom' };
    expect(parseThemeSpec(JSON.stringify(minimal))).toEqual(minimal);
    expect(() => parseThemeSpec('{')).toThrow();
    for (const field of ['id', 'label']) {
      expect(() => parseThemeSpec(JSON.stringify({ ...minimal, [field]: '' }))).toThrow(field);
    }
    for (const key of ['radius', 'spacingSmall', 'spacingMedium']) {
      expect(() =>
        parseThemeSpec(JSON.stringify({ ...minimal, tokens: { [key]: 'large' } })),
      ).toThrow(key);
    }
    expect(() =>
      parseThemeSpec(JSON.stringify({ ...minimal, style: { mark: { line: false } } })),
    ).toThrow(/mark.line/);
    expect(() => parseThemeSpec(JSON.stringify({ ...minimal, charts: [] }))).toThrow(/charts/);
    expect(parseThemeSpec(JSON.stringify({ ...minimal, aiExtra: true }))).toEqual({
      ...minimal,
      aiExtra: true,
    });
    const extraStyle = { mark: { aiExtra: false }, table: { aiExtra: 12 } };
    expect(parseThemeSpec(JSON.stringify({ ...minimal, style: extraStyle })).style).toEqual(
      extraStyle,
    );
  });
});
