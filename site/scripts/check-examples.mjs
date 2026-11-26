import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
// Load the same TypeScript fixtures used by static pages, without starting Next.
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, path) => {
    const { outputText } = ts.transpileModule(readFileSync(path, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    });
    module._compile(outputText, path);
  };
}
const { groupedExamplesData } = require(join(site, 'app/examples/examplesData/index.tsx'));
const { annotationsData, annotationVariants, annotationExample, annotationPreviewChart } = require(
  join(site, 'app/examples/examplesData/annotations.ts'),
);
const { BASE_THEMES, DEFAULT_THEME, THEME_PRESETS, themeSwatch, themeDisplayName } = require(
  join(site, 'app/themes/presets.ts'),
);
const { getThemeObject } = require(join(site, '../src/theme/g2.ts'));
const { exampleCode } = require(join(site, 'app/examples/example-code.ts'));
const { localizeSample } = require(join(site, 'app/lib/i18n.ts'));
const { parse } = require(join(site, '../src/syntax/parser.ts'));
const messages = JSON.parse(readFileSync(join(site, 'messages/zh.json'), 'utf8'));
const custom = {
  ...DEFAULT_THEME,
  label: 'Custom label stays untranslated',
  tokens: { ...DEFAULT_THEME.tokens, colorDefault: '#123456' },
};

function checkCode(input, theme) {
  const code = exampleCode(input, theme);
  const expectedTheme = THEME_PRESETS.some(
    (preset) => JSON.stringify(preset) === JSON.stringify(theme),
  )
    ? theme.id
    : theme;
  if (typeof input === 'object') {
    assert.deepEqual(JSON.parse(code), { ...input, theme: expectedTheme });
  } else if (code.startsWith('vis ')) {
    assert.deepEqual(parse(code), { ...parse(input), theme: expectedTheme });
  } else {
    let options;
    let rendered;
    const run = new Function('GPTVis', code.replace(/^import[^\n]+\n/, ''));
    run(
      class {
        constructor(value) {
          options = value;
        }
        render(value) {
          rendered = value;
        }
      },
    );
    assert.deepEqual(options, { container: '#chart', theme: expectedTheme });
    assert.equal(rendered, input, 'Constructor snippets must preserve the complete input');
  }
}

let chartCases = 0;
for (const chart of groupedExamplesData.flatMap((group) => group.charts)) {
  assert.ok(chart.examples.length, `${chart.id} needs a functional example`);
  for (const example of chart.examples) {
    chartCases++;
    assert.ok(messages[example.title], `Missing Chinese title: ${example.title}`);
    assert.equal(example.json.theme, undefined, 'Functional examples use the shared theme');
    assert.doesNotMatch(example.dsl, /^theme\s/m);
    if (example.json.type !== 'summary') {
      const parsed = parse(example.dsl);
      assert.equal(parsed.type, example.json.type);
      for (const key of [
        'data',
        'stack',
        'group',
        'innerRadius',
        'shape',
        'binNumber',
        'layout',
        'direction',
        'categories',
        'series',
      ]) {
        if (example.json[key] !== undefined)
          assert.deepEqual(parsed[key], example.json[key], `${chart.id}: JSON/Syntax ${key}`);
      }
    }
    for (const theme of [DEFAULT_THEME, custom]) {
      const inputs = example.json.type === 'summary' ? [example.dsl] : [example.json, example.dsl];
      for (const input of inputs) checkCode(localizeSample(input, 'zh'), theme);
    }
  }
}
// Template syntax inside narrative content must remain literal in copied JavaScript.
checkCode('# A `quoted` ${value} with \\ backslashes', custom);

assert.equal(DEFAULT_THEME.id, 'default');
assert.deepEqual(
  BASE_THEMES.map((theme) => theme.id),
  ['default', 'dark', 'academy'],
);
assert.deepEqual(
  JSON.parse(JSON.stringify(getThemeObject('column', 'light'))),
  JSON.parse(JSON.stringify(getThemeObject('column', 'default'))),
  'light remains a compatible alias of default',
);
for (const theme of BASE_THEMES) {
  assert.deepEqual(
    JSON.parse(JSON.stringify(getThemeObject('column', theme))),
    JSON.parse(JSON.stringify(getThemeObject('column', theme.id))),
    `${theme.id} must render identically to the SDK's built-in name`,
  );
  assert.ok(themeSwatch(theme).palette.length);
  assert.ok(themeSwatch(theme).background);
  assert.ok(messages[theme.label]);
  assert.equal(
    themeDisplayName(theme, (key) => messages[key]),
    messages[theme.label],
  );
  for (const input of [
    { type: 'column', data: [] },
    'vis column\ndata\n  - category A\n    value 1',
    '# Narrative',
  ])
    checkCode(input, theme);
}
assert.equal(
  themeDisplayName(custom, (key) => messages[key]),
  custom.label,
);

let annotationCases = 0;
for (const example of annotationsData.examples) {
  for (const variant of annotationVariants(example)) {
    assert.ok(messages[variant.title], `Missing Chinese variant: ${variant.title}`);
    const chart = variant.chart ?? annotationPreviewChart(example);
    assert.ok(example.charts.includes(chart), `Unsupported parameter preview: ${example.type}`);
    checkCode(localizeSample(annotationExample(example, chart, variant.variant), 'zh'), custom);
    annotationCases++;
  }
  for (const chart of example.charts) {
    checkCode(localizeSample(annotationExample(example, chart), 'zh'), DEFAULT_THEME);
    if (chart !== annotationPreviewChart(example)) annotationCases++;
  }
}

const storage = new Map();
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
};
globalThis.window = {};
const midnight = THEME_PRESETS.find((theme) => theme.id === 'midnight');
const activePath = require.resolve(join(site, 'app/themes/active-theme.ts'));
assert.deepEqual(require(activePath).getActiveTheme(), DEFAULT_THEME, 'Fresh browsers use default');
delete require.cache[activePath];
storage.set(
  'gpt-vis:theme-studio:v1',
  JSON.stringify({ source: midnight.id, custom: DEFAULT_THEME, draft: '{ unfinished' }),
);
const active = require(join(site, 'app/themes/active-theme.ts'));
assert.deepEqual(active.getActiveTheme(), midnight, 'Migrate valid themes, not unfinished drafts');
active.setActiveTheme(custom);
assert.deepEqual(active.getActiveTheme(), custom);
assert.deepEqual(JSON.parse(storage.get(active.ACTIVE_THEME_KEY)), custom);
active.setActiveTheme(DEFAULT_THEME);
assert.deepEqual(JSON.parse(storage.get(active.ACTIVE_THEME_KEY)), DEFAULT_THEME);
delete require.cache[activePath];
storage.delete(active.ACTIVE_THEME_KEY);
storage.set(active.STUDIO_STORAGE_KEY, JSON.stringify({ source: 'light' }));
assert.equal(require(activePath).getActiveTheme().baseTheme, 'light', 'Retain legacy light');

console.log(
  `Validated ${chartCases} functional cases, ${annotationCases} annotation cases, copied themes, and storage migration.`,
);
