import type { ThemeSpec } from '../../../src';

export const THEME_CREATOR_PROMPT = `Help me create a custom ThemeSpec for GPT-Vis from the references I provide (websites, slides, brand guidelines, or visual examples).

First read and follow the self-contained Theme Creator reference bundled with the GPT-Vis chart-visualization skill:
https://raw.githubusercontent.com/antvis/GPT-Vis/ai/skills/chart-visualization/references/theme-creator.md

If that link is unavailable, use:
https://github.com/antvis/GPT-Vis/blob/ai/skills/chart-visualization/references/theme-creator.md

Ask only for missing information that materially changes the design. Follow the reference's configuration tables, visual-only boundaries, accessibility guidance, and validation checklist. Create a coherent style across statistical charts, relationship graphs, tables, and narrative summaries.

Return exactly one complete ThemeSpec JSON object, with id and label, ready to paste into GPT-Vis Theme Studio. Use tokens for shared decisions and style/charts for supported visual refinements. Do not include chart data, commentary, Markdown fences, or fields from other chart libraries.

My references and preferences:
[Add your references here]`;

const TOKEN_STRINGS = new Set([
  'colorDefault',
  'colorBackground',
  'colorSurface',
  'colorText',
  'colorTextSecondary',
  'colorTextInverse',
  'colorStroke',
  'colorPositive',
  'colorNegative',
  'colorNeutral',
  'fontFamily',
]);
const TOKEN_NUMBERS = new Set([
  'fontSize',
  'lineHeight',
  'spacingSmall',
  'spacingMedium',
  'lineWidth',
  'radius',
]);
const STYLE_BLOCKS = [
  'title',
  'axis',
  'legend',
  'label',
  'mark',
  'node',
  'edge',
  'table',
  'summary',
];
const MARK_BLOCKS = new Set([
  'line',
  'area',
  'point',
  'interval',
  'box',
  'connector',
  'path',
  'density',
  'link',
  'liquid',
  'treemap',
  'sankey',
  'wordCloud',
]);

function object(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error(`${path} must be a JSON object.`);
  return value as Record<string, unknown>;
}

function checkStyle(value: unknown, path: string) {
  const style = object(value, path);
  if (style.backgroundColor !== undefined && typeof style.backgroundColor !== 'string')
    throw new Error(`${path}.backgroundColor must be a color string.`);
  if (
    style.palette !== undefined &&
    (!Array.isArray(style.palette) || !style.palette.every((v) => typeof v === 'string'))
  )
    throw new Error(`${path}.palette must be an array of color strings.`);
  for (const key of STYLE_BLOCKS) {
    if (style[key] === undefined) continue;
    const block = object(style[key], `${path}.${key}`);
    if (key === 'mark' || key === 'table') {
      for (const [name, child] of Object.entries(block)) {
        const known =
          key === 'mark' ? MARK_BLOCKS.has(name) : ['header', 'cell', 'border'].includes(name);
        if (known) object(child, `${path}.${key}.${name}`);
      }
    }
  }
}

/** Editor-level shape checks; the rendering adapters remain the field whitelist. */
export function parseThemeSpec(source: string): ThemeSpec {
  const value = object(JSON.parse(source), 'ThemeSpec');
  for (const field of ['id', 'label'])
    if (typeof value[field] !== 'string' || !value[field].trim())
      throw new Error(`${field} must be a non-empty string.`);
  if (value.description !== undefined && typeof value.description !== 'string')
    throw new Error('description must be a string.');
  if (
    value.baseTheme !== undefined &&
    !['default', 'light', 'dark', 'academy'].includes(String(value.baseTheme))
  )
    throw new Error('baseTheme must be default, light, dark, or academy.');
  if (value.tokens !== undefined) {
    for (const [key, token] of Object.entries(object(value.tokens, 'tokens'))) {
      if (TOKEN_STRINGS.has(key) && typeof token !== 'string')
        throw new Error(`tokens.${key} must be a string.`);
      if (
        TOKEN_NUMBERS.has(key) &&
        (typeof token !== 'number' || !Number.isFinite(token) || token < 0)
      )
        throw new Error(`tokens.${key} must be a non-negative number.`);
      if (
        (key === 'category10' || key === 'category20') &&
        (!Array.isArray(token) || !token.every((v) => typeof v === 'string'))
      )
        throw new Error(`tokens.${key} must be an array of color strings.`);
      if (
        key === 'fontWeight' &&
        typeof token !== 'number' &&
        token !== 'normal' &&
        token !== 'bold'
      )
        throw new Error('tokens.fontWeight must be a number, "normal", or "bold".');
    }
  }
  if (value.style !== undefined) checkStyle(value.style, 'style');
  if (value.charts !== undefined)
    for (const [type, config] of Object.entries(object(value.charts, 'charts'))) {
      const chart = object(config, `charts.${type}`);
      if (chart.style !== undefined) checkStyle(chart.style, `charts.${type}.style`);
    }
  return value as unknown as ThemeSpec;
}

export const formatTheme = (theme: ThemeSpec) => JSON.stringify(theme, null, 2);

function toBase64(bytes: Uint8Array): string {
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '');
}

/** The complete theme lives in the URL fragment; GitHub Pages needs no server. */
export async function encodeThemeHash(theme: ThemeSpec): Promise<string> {
  const json = JSON.stringify(theme);
  const compressed = typeof CompressionStream !== 'undefined';
  const stream = new Blob([json]).stream();
  const bytes = new Uint8Array(
    await new Response(
      compressed ? stream.pipeThrough(new CompressionStream('deflate')) : stream,
    ).arrayBuffer(),
  );
  const hash = `#theme=${compressed ? 'z' : 'j'}.${toBase64(bytes)}`;
  if (hash.length > 20000)
    throw new Error('This theme is too large for a share link. Download the JSON file instead.');
  return hash;
}

export async function decodeThemeHash(hash: string): Promise<ThemeSpec | null> {
  if (!hash.startsWith('#theme=')) return null;
  const [format, data] = hash.slice(7).split('.');
  if (!data || (format !== 'z' && format !== 'j'))
    throw new Error('This theme link is incomplete or unsupported.');
  const bytes = Uint8Array.from(atob(data.replaceAll('-', '+').replaceAll('_', '/')), (c) =>
    c.charCodeAt(0),
  );
  const stream = new Blob([bytes]).stream();
  if (format === 'z' && typeof DecompressionStream === 'undefined')
    throw new Error(
      'Open this compressed theme link in a browser that supports DecompressionStream.',
    );
  const json = await new Response(
    format === 'z' ? stream.pipeThrough(new DecompressionStream('deflate')) : stream,
  ).text();
  return parseThemeSpec(json);
}

export function themeUsage(theme: ThemeSpec): string {
  return `import { GPTVis, type ThemeSpec } from '@antv/gpt-vis';\nimport theme from './${theme.id.replace(/[^a-z0-9-]/gi, '-')}.json';\n\nconst chart = new GPTVis({\n  container: '#chart',\n  theme: theme as ThemeSpec,\n});\n\nchart.render({\n  type: 'line',\n  data: [\n    { time: 'Q1', value: 32 },\n    { time: 'Q2', value: 48 },\n    { time: 'Q3', value: 61 },\n  ],\n});`;
}
