import { access, readFile } from 'node:fs/promises';

const source = await readFile('app/lib/docs.ts', 'utf8');
const entries = [
  ...source.matchAll(
    /\{\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)',\s*group:\s*'([^']+)',\s*description:\s*'([^']+)',?\s*\}/g,
  ),
].map(([, slug, title, group, description]) => ({ slug, title, group, description }));
if (!entries.length) throw new Error('Documentation manifest could not be read.');
const slugs = new Set(entries.map((entry) => entry.slug));
for (const entry of entries) {
  const mdx = await readFile(`content/docs/${entry.slug}.mdx`, 'utf8');
  for (const match of mdx.matchAll(/\]\((\/docs(?:\/[^)#\s]*)?)(?:#[^)]*)?\)/g)) {
    const slug = match[1].slice('/docs/'.length) || 'introduction';
    if (match[1] !== '/docs' && !slugs.has(slug))
      throw new Error(`Broken documentation link in ${entry.slug}: ${match[1]}`);
  }
  for (const match of mdx.matchAll(/\]\(\/examples\/([^)#\s]+)(?:#[^)]*)?\)/g)) {
    await access('app/examples/examplesData');
    // Example identifiers are checked against their source definitions.
    const example = await readFile(`app/examples/examplesData/${match[1]}.ts`, 'utf8');
    if (!example.includes(`id: '${match[1]}'`))
      throw new Error(`Unknown chart example: ${match[1]}`);
  }
}
console.log(`Validated links in ${entries.length} guides.`);
