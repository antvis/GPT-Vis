import { ArrowUpRight, BookOpen, ChevronDown, FileText, Menu } from 'lucide-react';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import Link from '../components/LocaleLink';
import { docs } from '../lib/docs';
import { getTranslator, type Locale } from '../lib/i18n';
import { DocsNavigation } from './components/DocsNavigation';
import './docs.css';

export default async function DocumentationLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const t = getTranslator(locale);
  const searchable = await Promise.all(
    docs.map(async (doc) => ({
      slug: doc.slug,
      text: await readFile(
        join(process.cwd(), 'content/docs', ...(locale === 'zh' ? ['zh'] : []), `${doc.slug}.mdx`),
        'utf8',
      ),
    })),
  );
  return (
    <div className="docs-site">
      <a href="#docs-content" className="docs-skip">
        {t('Skip to content')}{' '}
      </a>
      <details className="docs-mobile-chapters">
        <summary>
          <Menu className="size-4" aria-hidden="true" />
          {t('Browse documentation')} <ChevronDown className="size-4" aria-hidden="true" />
        </summary>
        <DocsNavigation searchable={searchable} />
      </details>
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <Link href="/docs" className="docs-sidebar-heading">
            <span className="docs-sidebar-mark">
              <BookOpen className="size-4" aria-hidden="true" />
            </span>
            <span>
              <strong>{t('Documentation')}</strong>
              <small>{t('{count} guides to get you started', { count: docs.length })}</small>
            </span>
          </Link>
          <DocsNavigation searchable={searchable} />
          <div className="docs-sidebar-footer">
            <FileText className="size-4" aria-hidden="true" />
            <strong>{t('Take the docs with you.')}</strong>
            <a href="/llms.txt">
              {t('AI documentation index')} <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
            <a href="https://gpt-vis-0.x-site.antv.vision/">
              {t('Previous version: 0.x')} <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </aside>
        {children}
      </div>
    </div>
  );
}
