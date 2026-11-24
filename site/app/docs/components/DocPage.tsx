import { BookOpen } from 'lucide-react';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chineseContent, content } from '../../../content/docs';
import { CopyAction } from '../../components/CopyAction';
import Link from '../../components/LocaleLink';
import { docHref, docs, legacyDocLinks, type Doc } from '../../lib/docs';
import { docsMarkdown } from '../../lib/docs-markdown.mjs';
import { getTranslator, type Locale } from '../../lib/i18n';
import { pageMetadata } from '../../lib/page-metadata';
import { SKILL_INSTALL_PROMPT } from '../../lib/skill-installation';
import { DocsToc } from './DocsToc';

export function docMetadata(doc: Doc, locale: Locale = 'en') {
  const t = getTranslator(locale);
  return pageMetadata({
    locale,
    title: `${t(doc.title)} | ${t('GPT-Vis Docs')}`,
    description: t(doc.description),
    path: docHref(doc.slug),
    type: 'article',
  });
}
export default async function DocPage({ doc, locale }: { doc: Doc; locale: Locale }) {
  const t = getTranslator(locale);
  const [{ default: Content }, source] = await Promise.all([
    (locale === 'zh' ? chineseContent : content)[doc.slug](),
    readFile(
      join(process.cwd(), 'content/docs', ...(locale === 'zh' ? ['zh'] : []), `${doc.slug}.mdx`),
      'utf8',
    ),
  ]);
  const markdown = `# ${t(doc.title)}\n\n${t(doc.description)}\n\n${docsMarkdown(source, `\n\n\`\`\`text\n${t(SKILL_INSTALL_PROMPT)}\n\`\`\`\n`)}`;
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
              {t(doc.group)}
            </span>
            <CopyAction text={markdown} label={t('Copy Markdown')} />
          </div>
          {anchors.map((id) => (
            <span key={id} id={id} />
          ))}
          <h1>{t(doc.title)}</h1>
          <p className="docs-description">{t(doc.description)}</p>
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
            {t('Report a documentation issue ↗')}{' '}
          </a>
        </div>
        <nav className="docs-pagination" aria-label={t('Chapter navigation')}>
          {previous ? (
            <Link href={docHref(previous.slug)}>
              <span>{t('← Previous')}</span>
              <strong>{t(previous.title)}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={docHref(next.slug)}>
              <span>{t('Next →')}</span>
              <strong>{t(next.title)}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
        <footer className="docs-footer">{t('GPT-Vis · An AntV project · MIT licensed')}</footer>
      </main>
      <DocsToc key={doc.slug} />
    </>
  );
}
