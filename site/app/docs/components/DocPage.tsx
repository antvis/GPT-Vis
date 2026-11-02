import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { content } from '../../../content/docs';
import { CopyAction } from '../../components/CopyAction';
import { docHref, docs, legacyDocLinks, type Doc } from '../../lib/docs';
import { docsMarkdown } from '../../lib/docs-markdown.mjs';
import { pageMetadata } from '../../lib/page-metadata';
import { SKILL_INSTALL_PROMPT } from '../../lib/skill-installation';
import { DocsToc } from './DocsToc';

export function docMetadata(doc: Doc) {
  return pageMetadata({
    title: `${doc.title} | GPT-Vis Docs`,
    description: doc.description,
    path: docHref(doc.slug),
    type: 'article',
  });
}
export default async function DocPage({ doc }: { doc: Doc }) {
  const [{ default: Content }, source] = await Promise.all([
    content[doc.slug](),
    readFile(join(process.cwd(), 'content/docs', `${doc.slug}.mdx`), 'utf8'),
  ]);
  const markdown = `# ${doc.title}\n\n${doc.description}\n\n${docsMarkdown(source, `\n\n\`\`\`text\n${SKILL_INSTALL_PROMPT}\n\`\`\`\n`)}`;
  const anchors = Object.entries(legacyDocLinks)
    .filter(([, target]) => target === docHref(doc.slug))
    .map(([id]) => id);
  const index = docs.findIndex((item) => item.slug === doc.slug);
  const previous = docs[index - 1];
  const next = docs[index + 1];
  return (
    <>
      <main className="docs-main" id="docs-content">
        <header className="docs-page-header">
          <div className="docs-page-toolbar">
            <span className="site-eyebrow">
              <BookOpen className="size-3.5" aria-hidden="true" />
              {doc.group}
            </span>
            <CopyAction text={markdown} label="Copy Markdown" />
          </div>
          {anchors.map((id) => (
            <span key={id} id={id} />
          ))}
          <h1>{doc.title}</h1>
          <p className="docs-description">{doc.description}</p>
        </header>
        <article
          className={doc.slug === 'introduction' ? 'docs-prose docs-introduction' : 'docs-prose'}
        >
          <Content />
        </article>
        <div className="docs-page-meta">
          <a
            href="https://github.com/antvis/GPT-Vis/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report a documentation issue ↗
          </a>
        </div>
        <nav className="docs-pagination" aria-label="Chapter navigation">
          {previous ? (
            <Link href={docHref(previous.slug)}>
              <span>← Previous</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={docHref(next.slug)}>
              <span>Next →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
        <footer className="docs-footer">GPT-Vis · An AntV project · MIT licensed</footer>
      </main>
      <DocsToc key={doc.slug} />
    </>
  );
}
