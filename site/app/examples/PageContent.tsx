import { ArrowDown, ArrowUpRight, Braces } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ChartPreview } from '../components/ChartPreview';
import Link from '../components/LocaleLink';
import { getTranslator, localeHref, type Locale } from '../lib/i18n';
import { pageMetadata } from '../lib/page-metadata';
import { ExampleCard } from './components/ExampleCard';
import { ExamplesHero } from './components/ExamplesHero';
import { LibraryNavigation } from './components/LibraryNavigation';
import { chartIcons } from './exampleIcons';
import { groupedExamplesData } from './examplesData';

export const pageMetadataFor = (locale: Locale) =>
  pageMetadata({
    locale,
    title: 'Chart examples | GPT-Vis',
    description:
      'Explore all 26 chart types with live previews, JSON and Syntax examples, and configuration guides.',
    path: '/examples',
  });

const groupDescriptions: Record<string, string> = {
  statistics: 'Compare values, follow trends, and see how your data is distributed.',
  relationship: 'Make connections, hierarchies, and processes easier to follow.',
  text: 'Keep the exact values and the written takeaway alongside your charts.',
};

export default function ExamplesGallery({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const total = groupedExamplesData.reduce((count, group) => count + group.charts.length, 0);
  return (
    <main className="examples-main" id="examples-content">
      <Breadcrumb items={[{ label: t('Examples') }]} />
      <LibraryNavigation active="charts" locale={locale} />
      <ExamplesHero kind="charts" locale={locale} count={total} />
      <nav className="examples-category-links" aria-label={t('Chart categories')}>
        {groupedExamplesData.map((group) => (
          <a key={group.id} href={`#${group.id}`}>
            {t(group.title)}
            <span>{group.charts.length}</span>
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        ))}
        <span className="examples-category-note">{t('LIVE PREVIEWS · READY TO REUSE')}</span>
      </nav>
      <div className="examples-groups">
        {groupedExamplesData.map((group, groupIndex) => (
          <section
            key={group.id}
            id={group.id}
            className="examples-group"
            aria-labelledby={`${group.id}-heading`}
          >
            <div className="examples-group-heading">
              <span className="examples-group-number">0{groupIndex + 1}</span>
              <div>
                <h2 id={`${group.id}-heading`}>
                  {t(group.title)}
                  <span>{group.charts.length}</span>
                </h2>
                <p>{t(groupDescriptions[group.id])}</p>
              </div>
            </div>
            <div className="examples-grid">
              {group.charts.map((chart) => {
                const Icon = chartIcons[chart.id];
                return (
                  <ExampleCard
                    key={chart.id}
                    id={chart.id}
                    href={localeHref(`/examples/${chart.id}`, locale)}
                    title={t(chart.name)}
                    description={t(chart.description)}
                    action={t('Explore examples')}
                    category={group.id}
                    icon={<Icon className="size-4" aria-hidden="true" />}
                    preview={
                      <ChartPreview
                        deferUntilVisible
                        dsl={chart.galleryDsl}
                        json={chart.galleryJson}
                        chartId={`${chart.id}-gallery`}
                        className="example-gallery-chart"
                      />
                    }
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <aside className="examples-next">
        <Braces className="size-5" aria-hidden="true" />
        <div>
          <h2>{t('Found your chart?')}</h2>
          <p>{t('Bring it into your agent or your application.')}</p>
        </div>
        <Link href="/docs/agent-skill">
          Agent Skill <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
        <Link href="/docs/quickstart">
          {t('SDK quickstart')} <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </aside>
    </main>
  );
}
