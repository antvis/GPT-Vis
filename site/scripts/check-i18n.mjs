import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { docsMarkdown } from '../app/lib/docs-markdown.mjs';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(site, 'app/lib/i18n.ts');
const compiled = ts.transpileModule(readFileSync(source, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const evaluated = { exports: {} };
new Function('require', 'module', 'exports', compiled)(
  createRequire(source),
  evaluated,
  evaluated.exports,
);
const { localeHref, stripLocale, getLocale, getTranslator, localizeSample } = evaluated.exports;

for (const path of [
  '/',
  '/docs',
  '/docs/reference/api',
  '/examples/line-chart',
  '/themes?from=home#theme=j.test',
]) {
  const zh = localeHref(path, 'zh');
  assert.equal(localeHref(zh, 'en'), path);
  assert.equal(localeHref(zh, 'zh'), zh);
  assert.equal(getLocale(zh.split(/[?#]/)[0]), 'zh');
}
for (const path of [
  'https://example.com/docs',
  '//cdn.example.com/docs',
  '#chart',
  'mailto:team@example.com',
  '/downloads/chart-visualization.zip',
  '/gpt-vis-logo.png',
  '/llms.txt',
  '/docs-other',
])
  assert.equal(localeHref(path, 'zh'), path);
assert.equal(stripLocale('/zh'), '/');
assert.equal(localeHref('/zh?from=home#analysis', 'en'), '/?from=home#analysis');
assert.equal(localeHref('/zh#analysis', 'en'), '/#analysis');
assert.equal(getLocale('/zhang'), 'en');
assert.equal(getTranslator('en')('Explore {name}', { name: 'Line' }), 'Explore Line');
assert.equal(getTranslator('zh')('Explore {name}', { name: '折线图' }), '查看折线图示例');
const sample = { type: 'line', data: [{ time: 'Jan', value: 18 }], title: 'Monthly revenue' };
const original = JSON.stringify(sample);
assert.deepEqual(localizeSample(sample, 'zh'), {
  type: 'line',
  data: [{ time: '一月', value: 18 }],
  title: '月度收入',
});
assert.equal(JSON.stringify(sample), original, 'Translation must not mutate the shared fixtures');
assert.equal(
  localizeSample('vis line\ntitle "Monthly revenue"\ndata\n  - time Jan\n    value 18', 'zh'),
  'vis line\ntitle "月度收入"\ndata\n  - time "一月"\n    value 18',
);

// Narrative labels can change language; T8 entity semantics and statistics cannot.
const messages = JSON.parse(readFileSync(join(site, 'messages/zh.json'), 'utf8'));
for (const [english, chinese] of Object.entries(messages)) {
  if (!english.startsWith('# ') || !english.includes('](metric_name)')) continue;
  const entities = (text) => [...text.matchAll(/\]\(([^)]*)\)/g)].map((match) => match[1]);
  assert.deepEqual(entities(chinese), entities(english), 'Translation changed a T8 entity');
}

const docsDir = join(site, 'content/docs');
function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)],
  );
}
const docs = walk(docsDir).filter(
  (file) => file.endsWith('.mdx') && !file.startsWith(join(docsDir, 'zh')),
);
for (const file of docs) {
  const english = readFileSync(file, 'utf8');
  const chinese = readFileSync(join(docsDir, 'zh', file.slice(docsDir.length + 1)), 'utf8');
  assert.match(chinese, /[\u3400-\u9fff]/);
  // Documentation code remains runnable and identical in both languages.
  const fences = (text) =>
    [...text.matchAll(/^(`{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm)].map((match) => match[0]);
  assert.deepEqual(fences(chinese), fences(english), `Code changed while translating ${file}`);
  assert.doesNotMatch(docsMarkdown(chinese), /^<h[2-4]|^<span id=/m);
}
// Keep published analysis counts, type names, and translated guide copy in sync.
function readTsData(path) {
  const code = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  const evaluatedModule = { exports: {} };
  new Function('require', 'module', 'exports', code)(
    createRequire(path),
    evaluatedModule,
    evaluatedModule.exports,
  );
  return evaluatedModule.exports;
}
const { annotationsData, annotationGroups, annotationHref, annotationVariants } = readTsData(
  join(site, 'app/examples/examplesData/annotations.ts'),
);
const { annotationGuides, commonAnnotationOptions } = readTsData(
  join(site, 'app/examples/examplesData/annotationGuides.ts'),
);
const analysisTypes = annotationsData.examples.map(({ type }) => type);
const groupedTypes = annotationGroups.flatMap(({ types }) => types);
assert.equal(
  new Set(groupedTypes).size,
  groupedTypes.length,
  'Each analysis type belongs to exactly one group',
);
assert.deepEqual(
  [...groupedTypes].sort(),
  [...analysisTypes].sort(),
  'The taxonomy must cover every analysis example',
);
assert.deepEqual(
  Object.keys(annotationGuides).sort(),
  [...analysisTypes].sort(),
  'Every analysis type needs a guide',
);
const registryPath = join(site, '../src/annotation/registry.ts');
const registry = ts.createSourceFile(
  registryPath,
  readFileSync(registryPath, 'utf8'),
  ts.ScriptTarget.Latest,
  true,
);
let registeredTypes;
function inspectRegistry(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(registry) === 'components') {
    let value = node.initializer;
    while (ts.isAsExpression(value) || ts.isSatisfiesExpression(value)) value = value.expression;
    registeredTypes = value.properties.map((property) => property.name.getText(registry));
  }
  ts.forEachChild(node, inspectRegistry);
}
inspectRegistry(registry);
const primitives = ['path', 'range', 'connector', 'point', 'text', 'highlight'];
assert.deepEqual(
  registeredTypes.filter((type) => !primitives.includes(type)).sort(),
  [...analysisTypes].sort(),
  'The analysis catalog must match implemented types',
);
for (const text of [
  ...annotationGroups.flatMap((group) => [group.name, group.description, ...group.headline]),
  ...annotationsData.examples.map((example) => example.description),
  ...annotationsData.examples.flatMap((example) =>
    annotationVariants(example).map((variant) => variant.title),
  ),
  ...Object.values(annotationGuides).flatMap((guide) => [
    ...guide.useCases,
    ...guide.notes,
    ...guide.options.map((option) => option.description),
  ]),
  ...commonAnnotationOptions.map((option) => option.description),
])
  assert.ok(messages[text], `Missing Chinese annotation copy: ${text}`);
console.log(`Language URLs, sample integrity, and ${docs.length} bilingual guides passed.`);

if (process.argv.includes('--export')) {
  const out = join(site, 'out');
  assert.ok(existsSync(out), 'Run the site build first');
  const introduction = readFileSync(join(out, 'zh/docs.html'), 'utf8');
  for (const label of ['在 Agent 中使用', '开发应用', '查看效果']) {
    assert.ok(
      introduction.includes(`<strong>${label}：</strong>`),
      `Chinese introduction label did not render as bold: ${label}`,
    );
  }
  const htmlFiles = walk(out).filter((file) => file.endsWith('.html') && !file.includes('/_next/'));
  let checked = 0;
  for (const file of htmlFiles) {
    if (/\/(?:404|_not-found)(?:\.html|\/)/.test(file)) continue;
    const html = readFileSync(file, 'utf8');
    const zh = file.startsWith(join(out, 'zh'));
    assert.match(html, zh ? /<html[^>]+lang="zh-CN"/ : /<html[^>]+lang="en"/);
    assert.match(html, /rel="alternate" hrefLang="zh-CN"/);
    assert.match(html, /rel="canonical"/);
    const route =
      '/' +
      file
        .slice(out.length + 1)
        .replace(/\.html$/, '')
        .replace(/^index$/, '');
    const canonical = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)];
    assert.equal(canonical.length, 1, `Expected one canonical: ${file}`);
    assert.equal(
      canonical[0][1],
      `https://gpt-vis.antv.vision${route}`,
      `Incorrect canonical: ${file}`,
    );
    const meta = (name) => [
      ...html.matchAll(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`, 'g')),
    ];
    for (const name of [
      'description',
      'og:title',
      'og:description',
      'og:url',
      'twitter:title',
      'twitter:description',
    ]) {
      assert.equal(meta(name).length, 1, `Expected one ${name}: ${file}`);
      assert.ok(meta(name)[0][1], `Empty ${name}: ${file}`);
    }
    assert.equal(
      meta('og:url')[0][1],
      canonical[0][1],
      `Canonical and Open Graph URL disagree: ${file}`,
    );
    assert.equal(
      meta('description')[0][1],
      meta('og:description')[0][1],
      `Descriptions disagree: ${file}`,
    );
    for (const alternate of html.matchAll(
      /<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g,
    )) {
      const targetPath = new URL(alternate[2]).pathname;
      const target = join(out, targetPath === '/' ? 'index.html' : `${targetPath}.html`);
      assert.ok(existsSync(target), `Missing alternate ${alternate[2]} in ${file}`);
    }
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate anchors: ${file}`);
    assert.ok(!ids.includes(''), `Empty anchor: ${file}`);
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/g)) {
      const href = match[1].replaceAll('&amp;', '&');
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const path = decodeURI(href.split(/[?#]/)[0]);
      if (path.startsWith('/_next/')) continue;
      const target = join(out, path);
      assert.ok(
        existsSync(target) ||
          existsSync(`${target}.html`) ||
          existsSync(join(target, 'index.html')),
        `Broken link ${href} in ${file}`,
      );
      if (zh && /^\/(?:docs|examples|themes)(?:\/|$)/.test(path))
        assert.match(
          match[0],
          /(?:Switch to English|切换到中文)/,
          `Chinese page links to English: ${href}`,
        );
    }
    checked++;
  }
  const sitemap = readFileSync(join(out, 'sitemap.xml'), 'utf8');
  for (const locale of ['en', 'zh']) {
    const galleryPath = localeHref('/examples/annotations', locale);
    const gallery = readFileSync(join(out, `${galleryPath}.html`), 'utf8');
    const main = gallery.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
    assert.equal((main.match(/class="example-card-link"/g) ?? []).length, analysisTypes.length);
    assert.doesNotMatch(main, /role="combobox"|<select\b|data-tab="code"/);
    for (const type of analysisTypes) {
      const route = localeHref(annotationHref(type), locale);
      const html = readFileSync(join(out, `${route}.html`), 'utf8');
      assert.match(html, new RegExp(`<h1[^>]*>${type}<\\/h1>`));
      assert.ok(main.includes(`href="${route}"`), `Missing detail link: ${route}`);
      assert.ok(
        sitemap.includes(`https://gpt-vis.antv.vision${route}</loc>`),
        `Missing sitemap entry: ${route}`,
      );
    }
  }
  console.log(
    `Validated ${analysisTypes.length} bilingual annotation guides, taxonomy, gallery links, and sitemap entries.`,
  );
  console.log(
    `Validated language metadata, unique anchors, and internal links on ${checked} exported pages.`,
  );
}
