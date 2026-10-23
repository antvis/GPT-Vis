import { describe, expect, it } from 'vitest';
import { groupedExamplesData } from '../site/app/examples/examplesData';
import { THEME_EXAMPLES } from '../site/app/themes/examples';
import { THEME_PRESETS } from '../site/app/themes/presets';
import { decodeThemeHash, encodeThemeHash, parseThemeSpec } from '../site/app/themes/theme-utils';
import { isVisSyntax, parse } from '../src/syntax/parser';
import { CHART_TYPES } from '../src/types/chart';

type JsonConfig = Record<string, unknown>;

const charts = groupedExamplesData.flatMap((group) => group.charts);

function parseExample(source: string): JsonConfig {
  return isVisSyntax(source) ? parse(source) : { type: 'summary', content: source };
}

function expectRunnableConfig(config: JsonConfig, label: string) {
  expect(config, `${label} must survive JSON serialization`).toEqual(
    JSON.parse(JSON.stringify(config)),
  );
  expect(typeof config.type, `${label} must declare a chart type`).toBe('string');
}

describe('site example JSON and DSL', () => {
  it('stores runnable JSON beside every gallery DSL example', () => {
    for (const chart of charts) {
      const label = `${chart.id} gallery`;

      expect(chart.galleryJson, label).toEqual(parseExample(chart.galleryDsl));
      expectRunnableConfig(chart.galleryJson, label);
    }
  });

  it('stores runnable JSON beside every detail DSL example', () => {
    let exampleCount = 0;

    for (const chart of charts) {
      for (const example of chart.examples) {
        const label = `${chart.id} / ${example.title}`;

        expect(example.json, label).toEqual(parseExample(example.dsl));
        expectRunnableConfig(example.json, label);
        exampleCount += 1;
      }
    }

    expect(charts).toHaveLength(26);
    expect(exampleCount).toBe(85);
  });
});

describe('Theme Studio', () => {
  it('covers every chart once without local style or theme overrides', () => {
    expect(THEME_EXAMPLES.map((example) => example.type).sort()).toEqual([...CHART_TYPES].sort());
    for (const example of THEME_EXAMPLES) {
      if (typeof example.input === 'string') {
        expect(example.type).toBe('summary');
        expect(example.input).not.toMatch(/^theme\s/m);
      } else {
        expect(example.input.style).toBeUndefined();
        expect(example.input.theme).toBeUndefined();
        expectRunnableConfig(example.input, `theme gallery / ${example.type}`);
      }
    }
  });

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
    const minimal = { version: '1', id: 'custom', label: 'Custom' };
    expect(() => parseThemeSpec('{')).toThrow();
    expect(() => parseThemeSpec(JSON.stringify({ ...minimal, version: 1 }))).toThrow(/version/);
    expect(() =>
      parseThemeSpec(JSON.stringify({ ...minimal, tokens: { radius: 'large' } })),
    ).toThrow(/radius/);
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
