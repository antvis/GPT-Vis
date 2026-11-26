import { ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ChartExample } from '../../components/ChartExample';
import Link from '../../components/LocaleLink';
import { getTranslator, type Locale } from '../../lib/i18n';
import { pageMetadata } from '../../lib/page-metadata';
import {
  ExampleDetailHeading,
  ExampleOptions,
  ExamplePagination,
  ExampleSectionHeading,
  ExampleUseCases,
} from '../components/ExampleGuide';
import { chartIcons } from '../exampleIcons';
import { groupedExamplesData } from '../examplesData';
import { annotationGroups, annotationHref, annotationsData } from '../examplesData/annotations';

const allCharts = groupedExamplesData.flatMap((group) => group.charts);

export function generateStaticParams() {
  return allCharts.map((chart) => ({ chart: chart.id }));
}

export async function pageMetadataFor(
  { params }: { params: Promise<{ chart: string }> },
  locale: Locale,
) {
  const { chart } = await params;
  const data = allCharts.find((item) => item.id === chart);
  if (!data) notFound();
  const t = getTranslator(locale);
  return pageMetadata({
    locale,
    title: `${t(data.name)} | GPT-Vis`,
    description: t(data.description).split(/(?<=\.)\s/)[0],
    path: `/examples/${chart}`,
    type: 'article',
  });
}

export default function ChartDocContent({
  params,
  locale,
}: {
  params: Promise<{ chart: string }>;
  locale: Locale;
}) {
  const t = getTranslator(locale);
  const { chart } = use(params);
  const chartData = allCharts.find((item) => item.id === chart);
  if (!chartData) notFound();
  const group = groupedExamplesData.find((item) => item.charts.some((item) => item.id === chart));
  const Icon = chartIcons[chart];
  const index = allCharts.findIndex((item) => item.id === chart);
  const previous = allCharts[index - 1];
  const next = allCharts[index + 1];
  const overview = t(chartData.description).split(/(?<=\.)\s/)[0];
  const annotationCharts: Record<string, string> = {
    'line-chart': 'line',
    'area-chart': 'area',
    'column-chart': 'column',
    'bar-chart': 'bar',
    'scatter-chart': 'scatter',
    'pie-chart': 'pie',
    table: 'table',
  };
  const annotationChart = annotationCharts[chart];
  const supportedAnnotations = annotationsData.examples.filter((example) =>
    (example.charts as readonly string[]).includes(annotationChart ?? ''),
  );
  const hasAnnotations =
    supportedAnnotations.length > 0 || chart === 'network-graph' || chart === 'summary';
  const configGroups = chartData.knowledge.config.map((group, index) => ({
    ...group,
    config: [
      ...group.config,
      ...(hasAnnotations && index === 0
        ? [
            {
              property: 'annotations',
              type: 'optional',
              valueType: 'Annotation[]',
              description:
                'Annotation configurations; see the annotation support matrix and examples.',
            },
          ]
        : []),
    ],
  }));

  return (
    <main className="examples-main example-detail" id="examples-content">
      <Breadcrumb
        items={[{ label: t('Examples'), href: '/examples' }, { label: t(chartData.name) }]}
      />
      <ExampleDetailHeading
        eyebrow={`${t(group?.title ?? '')} / ${t('CHART GUIDE')}`}
        title={t(chartData.name)}
        description={overview}
        icon={<Icon />}
      />
      <nav className="example-section-links" aria-label={t('In this chart guide')}>
        <a href="#visual-examples">
          {t('Live examples')} <span>{chartData.examples.length}</span>
        </a>
        <a href="#options">{t('Configuration')}</a>
        {hasAnnotations && <a href="#annotations">{t('Analysis annotations')}</a>}
        <Link href="/docs/syntax">
          {t('JSON & Syntax guide')} <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </nav>
      <ExampleUseCases items={chartData.knowledge.useCases} locale={locale} />
      <section
        id="visual-examples"
        className="example-detail-section"
        aria-labelledby="visual-examples-heading"
      >
        <ExampleSectionHeading
          id="visual-examples-heading"
          eyebrow={t('01 / EXPLORE')}
          title={t('See it in action.')}
          description={t('Switch to Code to copy an example.')}
        />
        <div className="example-live-list">
          {chartData.examples.map((example, exampleIndex) => (
            <ChartExample
              key={example.title}
              title={t(example.title)}
              dsl={example.dsl}
              json={example.json}
              chartId={`${chart}-${exampleIndex}`}
            />
          ))}
        </div>
      </section>
      <details className="example-about">
        <summary>
          {t('About')} {t(chartData.name)}
        </summary>
        <p>{t(chartData.description)}</p>
      </details>
      {hasAnnotations && (
        <section
          id="annotations"
          className="example-detail-section"
          aria-labelledby="annotations-heading"
        >
          <div className="example-section-heading">
            <div>
              <p className="site-eyebrow">{t('ANALYSIS IN YOUR CHARTS')}</p>
              <h2 id="annotations-heading" className="text-balance">
                {t('Bring the finding into focus.')}
              </h2>
            </div>
            <p>
              {supportedAnnotations.length > 0
                ? t('{count} capabilities available for this chart.', {
                    count: supportedAnnotations.length,
                  })
                : t('Add context directly to your visualization.')}
            </p>
          </div>
          <div className="chart-analysis-panel">
            <p>
              {supportedAnnotations.length > 0
                ? t(
                    'Choose a capability below to see a live example and its configuration. Add it with the annotations field in your chart JSON.',
                  )
                : t(
                    'Network graphs support node and edge annotations; summaries support semantic text entities. See the guide for their configuration.',
                  )}
            </p>
            {supportedAnnotations.length > 0 && (
              <div className="chart-analysis-groups">
                {annotationGroups.map((group) => {
                  const examples = supportedAnnotations.filter(({ type }) =>
                    (group.types as readonly string[]).includes(type),
                  );
                  if (!examples.length) return null;
                  return (
                    <div key={group.id}>
                      <h3>{t(group.name)}</h3>
                      <ul>
                        {examples.map(({ type }) => (
                          <li key={type}>
                            <Link href={annotationHref(type)}>
                              <span>{type}</span>
                              <ArrowUpRight className="size-3" aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
            <Link href="/docs/annotations" className="annotation-doc-link">
              {t('Configuration & support matrix')}{' '}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}
      <section id="options" className="example-detail-section" aria-labelledby="options-heading">
        <ExampleSectionHeading
          id="options-heading"
          eyebrow={t('02 / CONFIGURE')}
          title={t('Make it yours.')}
          description={t('The properties available for this chart.')}
        />
        <ExampleOptions groups={configGroups} locale={locale} />
      </section>
      <ExamplePagination
        locale={locale}
        previous={
          previous ? { href: `/examples/${previous.id}`, title: t(previous.name) } : undefined
        }
        next={next ? { href: `/examples/${next.id}`, title: t(next.name) } : undefined}
      />
    </main>
  );
}
